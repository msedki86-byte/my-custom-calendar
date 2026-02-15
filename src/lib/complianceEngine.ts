/**
 * Moteur de conformité EDF CNPE Bugey – Refonte Phase 2
 * Semaine : Dimanche 00h00 → Samedi 24h00
 * Habillage = optionnel manuel (plus automatique)
 * Heures supplémentaires avec majorations IEG
 */

import { TimeEntry, ComplianceAlert, DaySummary, WeekSummary, AlertLevel, PointageSettings, defaultPointageSettings, OvertimeDetail } from '@/types/pointage';
import { format, addDays, parseISO, startOfWeek } from 'date-fns';
import { computeTrajetValorisation } from '@/lib/communeService';

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
  if (entry.suppressionMidi && coversMidi(entry.startTime, entry.endTime)) {
    minutes -= 45;
  }
  return Math.max(0, minutes);
}

/** Auto-comments for an entry */
export function computeAutoComments(entry: TimeEntry, primeRepasValeur: number, communeDepart?: string): string[] {
  const comments: string[] = [];
  if (entry.isAstreinteSansIntervention) return comments;

  if (!entry.suppressionMidi && coversMidi(entry.startTime, entry.endTime)) {
    comments.push(`Prime : repas sans dép (${primeRepasValeur.toFixed(2)} €)`);
  }

  const start = timeToMinutes(entry.startTime);
  const end = timeToMinutes(entry.endTime);
  if (start < 8 * 60 || end > 16 * 60 + 45) {
    comments.push('Prime IK à vérifier');
  }

  // Travel valorisation comment
  if (communeDepart) {
    const trajet = computeTrajetValorisation(communeDepart, entry.date, entry.startTime);
    if (trajet) {
      if (trajet.isZoneImmediate) {
        comments.push(`⚠️ Zone immédiate CNPE — Pas de plafond trajet`);
      } else {
        comments.push(`🚗 Trajet : ${trajet.commune.localite}`);
        comments.push(`Distance A/R : ${trajet.commune.distanceAR_km ?? '—'} km | Plaf : ${trajet.commune.trajetPlafonne_km ?? '—'} km`);
        comments.push(`Temps simple : ${trajet.commune.tempsSimple_min ?? '—'} min`);
        comments.push(`Valorisé (${trajet.valorisationLabel}) : ${trajet.valorisationHeures.toFixed(2)} h`);
      }
    }
  }

  return comments;
}

// ---- Overtime / Heures supplémentaires ----

/** Get the day of week index for a date (0=Sunday, 6=Saturday) */
function getDayOfWeek(dateStr: string): number {
  return parseISO(dateStr).getDay();
}

/** 
 * Compute overtime details for the week.
 * Rules:
 * - 36th-43rd hour: +25%
 * - 44th+ hour: +50%
 * - Saturday: +25%
 * - Sunday: +100%
 * - Holiday: +100%
 * - Night (21h-6h): +40%
 * - Apply the MOST FAVORABLE single rate (no cumul)
 */
export function computeOvertimeDetails(
  entries: TimeEntry[],
  weekDates: string[],
  holidays: string[] = []
): OvertimeDetail[] {
  const details: OvertimeDetail[] = [];
  
  // Calculate total effective hours to determine base overtime bracket
  let totalEffectiveMinutes = 0;
  const dailyMinutes: { date: string; minutes: number; entries: TimeEntry[] }[] = [];
  
  for (const dateStr of weekDates) {
    const dayEntries = entries.filter(e => e.date === dateStr && !e.isAstreinteSansIntervention);
    let dayMinutes = 0;
    for (const entry of dayEntries) {
      dayMinutes += getEffectiveMinutes(entry);
    }
    dailyMinutes.push({ date: dateStr, minutes: dayMinutes, entries: dayEntries });
    totalEffectiveMinutes += dayMinutes;
  }
  
  const totalEffectiveHours = totalEffectiveMinutes / 60;
  
  // Only compute if we have overtime (>35h base)
  if (totalEffectiveHours <= 35) return details;
  
  // Process each worked day
  let cumulHours = 0;
  for (const day of dailyMinutes) {
    if (day.minutes === 0) continue;
    
    const dayHours = day.minutes / 60;
    const dow = getDayOfWeek(day.date);
    const isSaturday = dow === 6;
    const isSunday = dow === 0;
    const isHoliday = holidays.includes(day.date);
    
    // Determine day-based rate
    let dayRate = 0;
    if (isSunday || isHoliday) dayRate = 100;
    else if (isSaturday) dayRate = 25;
    
    // Check night hours for this day's entries
    let nightMinutes = 0;
    for (const entry of day.entries) {
      nightMinutes += getNightMinutes(entry);
    }
    const nightRate = nightMinutes > 0 ? 40 : 0;
    
    // Bracket-based rate for hours in the 36-43 and 44+ ranges
    const prevCumul = cumulHours;
    cumulHours += dayHours;
    
    let bracketRate = 0;
    if (cumulHours > 43) {
      // Some hours at 25%, some at 50%
      const hoursAt50 = Math.min(dayHours, cumulHours - 43);
      const hoursAt25 = dayHours - hoursAt50;
      // Use weighted average for bracket rate or just report the highest
      bracketRate = hoursAt50 > 0 ? 50 : (prevCumul >= 35 ? 25 : 0);
    } else if (cumulHours > 35) {
      bracketRate = 25;
    }
    
    // Apply MOST FAVORABLE single rate (no cumul)
    const bestRate = Math.max(dayRate, nightRate, bracketRate);
    
    if (bestRate > 0 && prevCumul >= 35) {
      // Only the overtime portion
      const overtimeHours = Math.min(dayHours, cumulHours - 35);
      if (overtimeHours > 0) {
        let rateLabel = '';
        if (bestRate === dayRate) {
          rateLabel = isSunday ? 'Dimanche' : isHoliday ? 'Férié' : 'Samedi';
        } else if (bestRate === nightRate) {
          rateLabel = 'Nuit (21h-6h)';
        } else {
          rateLabel = cumulHours > 43 ? '44e heure+' : '36e-43e heure';
        }
        
        details.push({
          date: day.date,
          hours: parseFloat(overtimeHours.toFixed(2)),
          rate: bestRate,
          label: `HS +${bestRate}% (${rateLabel})`,
        });
      }
    } else if (prevCumul < 35 && cumulHours > 35) {
      // Partial overtime day
      const overtimeHours = cumulHours - 35;
      const bestOvertimeRate = Math.max(dayRate, nightRate, 25);
      let rateLabel = '';
      if (bestOvertimeRate === dayRate && dayRate > 0) {
        rateLabel = isSunday ? 'Dimanche' : isHoliday ? 'Férié' : 'Samedi';
      } else if (bestOvertimeRate === nightRate && nightRate > 0) {
        rateLabel = 'Nuit (21h-6h)';
      } else {
        rateLabel = '36e-43e heure';
      }
      
      details.push({
        date: day.date,
        hours: parseFloat(overtimeHours.toFixed(2)),
        rate: bestOvertimeRate,
        label: `HS +${bestOvertimeRate}% (${rateLabel})`,
      });
    }
  }
  
  return details;
}

/** Calculate night minutes (21h-6h) for an entry */
function getNightMinutes(entry: TimeEntry): number {
  if (entry.isAstreinteSansIntervention) return 0;
  const start = timeToMinutes(entry.startTime);
  let end = timeToMinutes(entry.endTime);
  if (end <= start) end += 24 * 60;
  
  let nightMin = 0;
  // Night = 21:00 (1260) to 30:00 (next day 6:00 = 1800)
  // Also 0:00 to 6:00 (0-360)
  for (let m = start; m < end; m++) {
    const normalizedM = m % (24 * 60);
    if (normalizedM >= 21 * 60 || normalizedM < 6 * 60) {
      nightMin++;
    }
  }
  return nightMin;
}

// ---- Day Summary ----

export function computeDaySummary(entries: TimeEntry[], date: string, communeDepart?: string): DaySummary {
  const dayEntries = entries.filter(e => e.date === date);
  let effectiveMinutes = 0;
  let primeRepas = false;
  let ikAlert = false;
  let trajetHeures = 0;
  let habillageMinutesTotal = 0;

  for (const entry of dayEntries) {
    effectiveMinutes += getEffectiveMinutes(entry);
    if (!entry.suppressionMidi && coversMidi(entry.startTime, entry.endTime) && !entry.isAstreinteSansIntervention) {
      primeRepas = true;
    }
    const start = timeToMinutes(entry.startTime);
    const end = timeToMinutes(entry.endTime);
    if (!entry.isAstreinteSansIntervention && (start < 8 * 60 || end > 16 * 60 + 45)) {
      ikAlert = true;
    }
    // Habillage manuel optionnel
    if (entry.habillageManuel && entry.habillageMinutes && entry.habillageMinutes > 0) {
      habillageMinutesTotal += entry.habillageMinutes;
    }
  }

  const hoursWorked = effectiveMinutes / 60;
  const habillageHours = habillageMinutesTotal / 60;

  // Travel valorisation: apply once per worked day
  if (hoursWorked > 0 && communeDepart) {
    const firstEntry = dayEntries.find(e => !e.isAstreinteSansIntervention);
    if (firstEntry) {
      const trajet = computeTrajetValorisation(communeDepart, date, firstEntry.startTime);
      if (trajet && !trajet.isZoneImmediate) {
        trajetHeures = trajet.valorisationHeures;
      }
    }
  }

  const totalHours = hoursWorked + habillageHours + trajetHeures;
  const hasNote = dayEntries.some(e => !!e.note);
  const alerts: ComplianceAlert[] = [];

  if (hoursWorked > 10) {
    alerts.push({
      rule: 'R_JOUR',
      level: 'rouge',
      message: `Dépassement journalier : ${hoursWorked.toFixed(2)}h effectives > 10h`,
      date,
    });
  }

  return { date, hoursWorked, habillageHours, totalHours, hasNote, alerts, primeRepas, ikAlert, trajetHeures };
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
        message: `Repos quotidien insuffisant entre ${weekDates[i]} et ${weekDates[i + 1]} : ${(restMinutes / 60).toFixed(2)}h < 11h`,
        date: weekDates[i],
      });
    }
  }
  return { alerts, ok };
}

function checkReposHebdo(
  entries: TimeEntry[],
  weekDates: string[],
  allEntries?: TimeEntry[]
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
    // Consider rest carried from prior week (Saturday/Sunday before this week's Sunday)
    // If no entries exist on the Saturday before this week, add that day's rest
    const priorSatDate = format(addDays(parseISO(weekDates[0]), -1), 'yyyy-MM-dd');
    const priorFriDate = format(addDays(parseISO(weekDates[0]), -2), 'yyyy-MM-dd');
    const source = allEntries || entries;
    const priorSatWorked = source.some(e => e.date === priorSatDate && !e.isAstreinteSansIntervention);
    const priorFriWorked = source.some(e => e.date === priorFriDate && !e.isAstreinteSansIntervention);

    // If prior Saturday was free, we get at least 24h rest leading into this week
    let leadingRest = workedSlots[0].start; // minutes from Sunday 00:00
    if (!priorSatWorked) leadingRest += 24 * 60; // Saturday free
    if (!priorFriWorked && !priorSatWorked) leadingRest += 24 * 60; // Friday also free

    maxGap = leadingRest;
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
      message: `Repos hebdomadaire insuffisant : ${(maxGap / 60).toFixed(2)}h < 35h`,
    });
  }

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
  pointageSettings?: PointageSettings,
  holidays: string[] = []
): WeekSummary {
  const ps = pointageSettings || defaultPointageSettings;
  const weekDates = getWeekDates(weekSunday);
  const allAlerts: ComplianceAlert[] = [];

  const daySummaries = weekDates.map(d => computeDaySummary(entries, d, ps.communeDepart));

  const totalHours = daySummaries.reduce((sum, d) => sum + d.totalHours, 0);
  const daysWorked = daySummaries.filter(d => d.hoursWorked > 0).length;

  // 6 CONSECUTIVE worked days check (not just count)
  let has6Consecutive = false;
  let consecutiveCount = 0;
  for (let i = 0; i < 7; i++) {
    if (daySummaries[i].hoursWorked > 0) {
      consecutiveCount++;
      if (consecutiveCount >= 6) { has6Consecutive = true; break; }
    } else {
      consecutiveCount = 0;
    }
  }
  const plafond = has6Consecutive ? 54 : 53;
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
      message: `Plafond hebdomadaire dépassé : ${totalHours.toFixed(2)}h > ${plafond}h`,
    });
  }

  // Progressive weekly alerts
  if (ps.alertesActives) {
    if (heuresRestantes <= ps.seuilRougeHeures && heuresRestantes > 0) {
      allAlerts.push({
        rule: 'R1_SEUIL',
        level: 'rouge',
        message: `Heures restantes avant seuil critique : ${heuresRestantes.toFixed(2)}h`,
      });
    } else if (heuresRestantes <= ps.seuilOrangeHeures && heuresRestantes > ps.seuilRougeHeures) {
      allAlerts.push({
        rule: 'R1_SEUIL',
        level: 'orange',
        message: `Heures restantes avant seuil critique : ${heuresRestantes.toFixed(2)}h`,
      });
    }
  }

  // Rule 2 – Repos quotidien
  const r2 = checkReposQuotidien(entries, weekDates);
  allAlerts.push(...r2.alerts);

  // Rule 3 – Repos hebdo (pass all entries for prior-week check)
  const weekEntries = entries.filter(e => weekDates.includes(e.date));
  const r3 = checkReposHebdo(weekEntries, weekDates, entries);
  allAlerts.push(...r3.alerts);

  // RE pot alert
  if (ps.alertesActives && ps.soldeRE <= ps.seuilAlerteRE) {
    allAlerts.push({
      rule: 'RE',
      level: 'rouge',
      message: `RE critique : ${ps.soldeRE.toFixed(2)}h restantes sur 312h (seuil : ${ps.seuilAlerteRE}h)`,
    });
  }

  // Overtime details
  const overtimeDetails = computeOvertimeDetails(entries, weekDates, holidays);

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
    overtimeDetails,
  };
}
