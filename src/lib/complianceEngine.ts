/**
 * Moteur de conformité EDF CNPE Bugey – Refonte complète
 * Semaine : Dimanche 00h00 → Samedi 24h00
 */

import { TimeEntry, ComplianceAlert, DaySummary, WeekSummary, AlertLevel, PointageSettings, defaultPointageSettings } from '@/types/pointage';
import { format, addDays, parseISO, startOfWeek } from 'date-fns';

// ---- Helpers ----

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

/** Check if a time range covers 12:00-12:45 */
export function coversMidi(startTime: string, endTime: string): boolean {
  const start = timeToMinutes(startTime);
  let end = timeToMinutes(endTime);
  if (end <= start) end += 24 * 60;
  return start <= 12 * 60 && end >= 12 * 60 + 45;
}

function getEffectiveMinutes(entry: TimeEntry): number {
  if (entry.isAstreinteSansIntervention) return 0;
  const start = timeToMinutes(entry.startTime);
  let end = timeToMinutes(entry.endTime);
  if (end <= start) end += 24 * 60;
  let minutes = end - start;
  // Suppression midi: remove 45min if covers 12:00-12:45 and option is checked
  if (entry.suppressionMidi && coversMidi(entry.startTime, entry.endTime)) {
    minutes -= 45;
  }
  return Math.max(0, minutes);
}

/** Auto-comments for an entry */
export function computeAutoComments(entry: TimeEntry, primeRepasValeur: number): string[] {
  const comments: string[] = [];
  if (entry.isAstreinteSansIntervention) return comments;

  // Prime repas: if covers midi and suppression is OFF
  if (!entry.suppressionMidi && coversMidi(entry.startTime, entry.endTime)) {
    comments.push(`Prime : repas sans dép (${primeRepasValeur.toFixed(2)} €)`);
  }

  // IK: if start < 08:00 or end > 16:45
  const start = timeToMinutes(entry.startTime);
  const end = timeToMinutes(entry.endTime);
  if (start < 8 * 60 || end > 16 * 60 + 45) {
    comments.push('Prime IK à vérifier');
  }

  return comments;
}

// ---- Day Summary ----

export function computeDaySummary(entries: TimeEntry[], date: string): DaySummary {
  const dayEntries = entries.filter(e => e.date === date);
  let effectiveMinutes = 0;
  let habillageMinutes = 0;
  let primeRepas = false;
  let ikAlert = false;

  for (const entry of dayEntries) {
    effectiveMinutes += getEffectiveMinutes(entry);
    habillageMinutes += entry.habillage;
    if (!entry.suppressionMidi && coversMidi(entry.startTime, entry.endTime) && !entry.isAstreinteSansIntervention) {
      primeRepas = true;
    }
    const start = timeToMinutes(entry.startTime);
    const end = timeToMinutes(entry.endTime);
    if (!entry.isAstreinteSansIntervention && (start < 8 * 60 || end > 16 * 60 + 45)) {
      ikAlert = true;
    }
  }

  const hoursWorked = effectiveMinutes / 60;
  const habillageHours = habillageMinutes / 60;
  const totalHours = hoursWorked + habillageHours;
  const hasNote = dayEntries.some(e => !!e.note);
  const alerts: ComplianceAlert[] = [];

  // Rule: 10h effective max per day
  if (hoursWorked > 10) {
    alerts.push({
      rule: 'R_JOUR',
      level: 'rouge',
      message: `Dépassement journalier : ${hoursWorked.toFixed(1)}h effectives > 10h`,
      date,
    });
  }

  return { date, hoursWorked, habillageHours, totalHours, hasNote, alerts, primeRepas, ikAlert };
}

// ---- Week calculations ----

export function getWeekSunday(dateStr: string): Date {
  return startOfWeek(parseISO(dateStr), { weekStartsOn: 0 });
}

export function getWeekDates(weekSunday: Date): string[] {
  return Array.from({ length: 7 }, (_, i) => format(addDays(weekSunday, i), 'yyyy-MM-dd'));
}

// ---- Compliance Rules ----

function checkReposQuotidien(
  entries: TimeEntry[],
  weekDates: string[]
): { alerts: ComplianceAlert[]; ok: boolean } {
  const alerts: ComplianceAlert[] = [];
  let ok = true;

  for (let i = 0; i < weekDates.length - 1; i++) {
    const dayEntries = entries.filter(e => e.date === weekDates[i] && !e.isAstreinteSansIntervention);
    const nextDayEntries = entries.filter(e => e.date === weekDates[i + 1] && !e.isAstreinteSansIntervention);
    if (dayEntries.length === 0 || nextDayEntries.length === 0) continue;

    let latestEnd = 0;
    for (const e of dayEntries) {
      let end = timeToMinutes(e.endTime);
      if (end <= timeToMinutes(e.startTime)) end += 24 * 60;
      if (end > latestEnd) latestEnd = end;
    }

    let earliestStart = 24 * 60;
    for (const e of nextDayEntries) {
      const start = timeToMinutes(e.startTime);
      if (start < earliestStart) earliestStart = start;
    }

    const restMinutes = (24 * 60 - latestEnd) + earliestStart;
    if (restMinutes < 11 * 60) {
      ok = false;
      alerts.push({
        rule: 'R2',
        level: 'orange',
        message: `Repos quotidien insuffisant entre ${weekDates[i]} et ${weekDates[i + 1]} : ${(restMinutes / 60).toFixed(1)}h < 11h`,
        date: weekDates[i],
      });
    }
  }
  return { alerts, ok };
}

function checkReposHebdo(
  entries: TimeEntry[],
  weekDates: string[]
): { alerts: ComplianceAlert[]; ok: boolean } {
  const alerts: ComplianceAlert[] = [];
  let ok = true;

  const workedSlots: Array<{ start: number; end: number }> = [];
  for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
    const dayEntries = entries.filter(e => e.date === weekDates[dayIndex] && !e.isAstreinteSansIntervention);
    for (const entry of dayEntries) {
      const dayOffset = dayIndex * 24 * 60;
      const start = dayOffset + timeToMinutes(entry.startTime);
      let end = dayOffset + timeToMinutes(entry.endTime);
      if (end <= start) end += 24 * 60;
      workedSlots.push({ start, end });
    }
  }

  workedSlots.sort((a, b) => a.start - b.start);
  const weekMinutes = 7 * 24 * 60;
  let maxGap = 0;

  if (workedSlots.length === 0) {
    maxGap = weekMinutes;
  } else {
    maxGap = workedSlots[0].start;
    for (let i = 1; i < workedSlots.length; i++) {
      const gap = workedSlots[i].start - workedSlots[i - 1].end;
      if (gap > maxGap) maxGap = gap;
    }
    const gapEnd = weekMinutes - workedSlots[workedSlots.length - 1].end;
    if (gapEnd > maxGap) maxGap = gapEnd;
  }

  if (maxGap < 35 * 60) {
    ok = false;
    alerts.push({
      rule: 'R3',
      level: 'rouge',
      message: `Repos hebdomadaire insuffisant : ${(maxGap / 60).toFixed(1)}h < 35h`,
    });
  }

  // Check 24h civil continuous rest
  let has24hCivilRest = false;
  for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
    const dayEntries = entries.filter(e => e.date === weekDates[dayIndex] && !e.isAstreinteSansIntervention);
    if (dayEntries.length === 0) {
      has24hCivilRest = true;
      break;
    }
  }

  if (!has24hCivilRest && workedSlots.length > 0) {
    ok = false;
    alerts.push({
      rule: 'R3b',
      level: 'rouge',
      message: 'Aucune période de repos civil de 24h (journée complète sans travail)',
    });
  }

  return { alerts, ok };
}

// ---- Main computation ----

export function computeWeekSummary(
  entries: TimeEntry[],
  weekSunday: Date,
  pointageSettings?: PointageSettings
): WeekSummary {
  const ps = pointageSettings || defaultPointageSettings;
  const weekDates = getWeekDates(weekSunday);
  const allAlerts: ComplianceAlert[] = [];

  const daySummaries = weekDates.map(d => computeDaySummary(entries, d));

  const totalHours = daySummaries.reduce((sum, d) => sum + d.totalHours, 0);
  const daysWorked = daySummaries.filter(d => d.hoursWorked > 0).length;
  const plafond = daysWorked >= 6 ? 54 : 53;
  const heuresRestantes = Math.max(0, plafond - totalHours);

  // Day-level alerts (10h)
  for (const ds of daySummaries) {
    allAlerts.push(...ds.alerts);
  }

  // Rule 1 – Plafond hebdo
  if (totalHours > plafond) {
    allAlerts.push({
      rule: 'R1',
      level: 'rouge',
      message: `Plafond hebdomadaire dépassé : ${totalHours.toFixed(1)}h > ${plafond}h`,
    });
  }

  // Progressive weekly alerts based on remaining hours
  if (ps.alertesActives) {
    if (heuresRestantes <= ps.seuilRougeHeures && heuresRestantes > 0) {
      allAlerts.push({
        rule: 'R1_SEUIL',
        level: 'rouge',
        message: `Attention : seulement ${heuresRestantes.toFixed(1)}h restantes avant plafond`,
      });
    } else if (heuresRestantes <= ps.seuilOrangeHeures && heuresRestantes > ps.seuilRougeHeures) {
      allAlerts.push({
        rule: 'R1_SEUIL',
        level: 'orange',
        message: `Vigilance : ${heuresRestantes.toFixed(1)}h restantes avant plafond`,
      });
    }
  }

  // Rule 2 – Repos quotidien
  const r2 = checkReposQuotidien(entries, weekDates);
  allAlerts.push(...r2.alerts);

  // Rule 3 – Repos hebdo
  const r3 = checkReposHebdo(entries, weekDates);
  allAlerts.push(...r3.alerts);

  // RE pot alert
  if (ps.alertesActives && ps.soldeRE <= ps.seuilAlerteRE) {
    allAlerts.push({
      rule: 'RE',
      level: 'rouge',
      message: `Pot RE critique : ${ps.soldeRE.toFixed(1)}h restantes (seuil : ${ps.seuilAlerteRE}h)`,
    });
  }

  // Overall status
  let overallStatus: AlertLevel = 'vert';
  if (allAlerts.some(a => a.level === 'orange')) overallStatus = 'orange';
  if (allAlerts.some(a => a.level === 'rouge')) overallStatus = 'rouge';

  // Inject alerts into day summaries
  for (const alert of allAlerts) {
    if (alert.date) {
      const ds = daySummaries.find(d => d.date === alert.date);
      if (ds) ds.alerts.push(alert);
    }
  }

  return {
    weekStart: weekDates[0],
    weekEnd: weekDates[6],
    totalHours,
    plafondAutorise: plafond,
    heuresRestantes,
    reposQuotidienOk: r2.ok,
    reposHebdoOk: r3.ok,
    overallStatus,
    days: daySummaries,
    alerts: allAlerts,
    daysWorkedCount: daysWorked,
  };
}
