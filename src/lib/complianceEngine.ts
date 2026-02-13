/**
 * Moteur de conformité EDF / IEG – 6 règles automatiques
 */

import { TimeEntry, ComplianceAlert, DaySummary, WeekSummary, AlertLevel } from '@/types/pointage';
import { format, addDays, parseISO, differenceInMinutes, startOfWeek, endOfWeek } from 'date-fns';

// ---- Helpers ----

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function getEffectiveMinutes(entry: TimeEntry): number {
  if (entry.isAstreinteSansIntervention) return 0;
  const start = timeToMinutes(entry.startTime);
  let end = timeToMinutes(entry.endTime);
  if (end <= start) end += 24 * 60; // overnight
  return end - start;
}

function getTotalMinutes(entry: TimeEntry): number {
  return getEffectiveMinutes(entry) + entry.habillage;
}

// ---- Day Summary ----

export function computeDaySummary(entries: TimeEntry[], date: string): DaySummary {
  const dayEntries = entries.filter(e => e.date === date);
  let effectiveMinutes = 0;
  let habillageMinutes = 0;

  for (const entry of dayEntries) {
    effectiveMinutes += getEffectiveMinutes(entry);
    habillageMinutes += entry.habillage;
  }

  const hoursWorked = effectiveMinutes / 60;
  const habillageHours = habillageMinutes / 60;
  const totalHours = hoursWorked + habillageHours;
  const hasNote = dayEntries.some(e => !!e.note);

  return {
    date,
    hoursWorked,
    habillageHours,
    totalHours,
    hasNote,
    alerts: [],
  };
}

// ---- Week calculations ----

/** Get Sunday-based week start for a given date */
export function getWeekSunday(dateStr: string): Date {
  return startOfWeek(parseISO(dateStr), { weekStartsOn: 0 });
}

export function getWeekDates(weekSunday: Date): string[] {
  return Array.from({ length: 7 }, (_, i) => format(addDays(weekSunday, i), 'yyyy-MM-dd'));
}

// ---- Compliance Rules ----

function checkRule1_PlafondHebdo(
  totalHoursWeek: number,
  daysWorked: number
): ComplianceAlert[] {
  const alerts: ComplianceAlert[] = [];
  
  if (totalHoursWeek > 53) {
    alerts.push({
      rule: 'R1',
      level: 'rouge',
      message: `Plafond hebdomadaire dépassé : ${totalHoursWeek.toFixed(1)}h > 53h`,
    });
  }

  if (daysWorked >= 6 && totalHoursWeek > 54) {
    alerts.push({
      rule: 'R1b',
      level: 'rouge',
      message: `Plafond 6 jours dépassé : ${totalHoursWeek.toFixed(1)}h > 54h (${daysWorked} jours consécutifs)`,
    });
  }

  return alerts;
}

function checkRule2_ReposQuotidien(
  entries: TimeEntry[],
  weekDates: string[]
): { alerts: ComplianceAlert[]; ok: boolean } {
  const alerts: ComplianceAlert[] = [];
  let ok = true;

  for (let i = 0; i < weekDates.length - 1; i++) {
    const dayEntries = entries.filter(e => e.date === weekDates[i]);
    const nextDayEntries = entries.filter(e => e.date === weekDates[i + 1]);

    if (dayEntries.length === 0 || nextDayEntries.length === 0) continue;

    // Get latest end time of current day
    let latestEnd = 0;
    for (const e of dayEntries) {
      let end = timeToMinutes(e.endTime);
      if (end <= timeToMinutes(e.startTime)) end += 24 * 60;
      if (end > latestEnd) latestEnd = end;
    }

    // Get earliest start time of next day
    let earliestStart = 24 * 60;
    for (const e of nextDayEntries) {
      const start = timeToMinutes(e.startTime);
      if (start < earliestStart) earliestStart = start;
    }

    // Calculate rest: from latestEnd to earliestStart next day
    // latestEnd is in minutes from midnight of current day
    // earliestStart is in minutes from midnight of next day
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

function checkRule3_ReposHebdo(
  entries: TimeEntry[],
  weekDates: string[]
): { alerts: ComplianceAlert[]; ok: boolean } {
  const alerts: ComplianceAlert[] = [];
  let ok = true;

  // Check if there's a continuous 35h rest period in the week
  // Build a worked-hours timeline for the week (in minutes from Sunday 00:00)
  const workedSlots: Array<{ start: number; end: number }> = [];

  for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
    const dayEntries = entries.filter(e => e.date === weekDates[dayIndex]);
    for (const entry of dayEntries) {
      if (entry.isAstreinteSansIntervention) continue;
      const dayOffset = dayIndex * 24 * 60;
      const start = dayOffset + timeToMinutes(entry.startTime);
      let end = dayOffset + timeToMinutes(entry.endTime);
      if (end <= start) end += 24 * 60;
      workedSlots.push({ start, end });
    }
  }

  // Sort by start
  workedSlots.sort((a, b) => a.start - b.start);

  // Find longest gap
  let maxGap = 0;
  const weekMinutes = 7 * 24 * 60;

  if (workedSlots.length === 0) {
    maxGap = weekMinutes;
  } else {
    // Gap before first slot
    maxGap = workedSlots[0].start;
    // Gaps between slots
    for (let i = 1; i < workedSlots.length; i++) {
      const gap = workedSlots[i].start - workedSlots[i - 1].end;
      if (gap > maxGap) maxGap = gap;
    }
    // Gap after last slot
    const gapEnd = weekMinutes - workedSlots[workedSlots.length - 1].end;
    if (gapEnd > maxGap) maxGap = gapEnd;
  }

  if (maxGap < 35 * 60) {
    ok = false;
    alerts.push({
      rule: 'R3',
      level: 'rouge',
      message: `Repos hebdomadaire insuffisant : plus longue période de repos = ${(maxGap / 60).toFixed(1)}h < 35h`,
    });
  }

  // Also check for 24h civil continuous rest (midnight to midnight of any day)
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
  weekSunday: Date
): WeekSummary {
  const weekDates = getWeekDates(weekSunday);
  const allAlerts: ComplianceAlert[] = [];

  // Compute daily summaries
  const daySummaries = weekDates.map(d => computeDaySummary(entries, d));

  // Week totals
  const totalHours = daySummaries.reduce((sum, d) => sum + d.totalHours, 0);
  const daysWorked = daySummaries.filter(d => d.hoursWorked > 0).length;

  // Rule 1 – Plafond hebdo
  const r1 = checkRule1_PlafondHebdo(totalHours, daysWorked);
  allAlerts.push(...r1);

  // Rule 2 – Repos quotidien
  const r2 = checkRule2_ReposQuotidien(entries, weekDates);
  allAlerts.push(...r2.alerts);

  // Rule 3 – Repos hebdo
  const r3 = checkRule3_ReposHebdo(entries, weekDates);
  allAlerts.push(...r3.alerts);

  // Plafond autorisé
  const plafond = daysWorked >= 6 ? 54 : 53;

  // Overall status
  let overallStatus: AlertLevel = 'vert';
  if (allAlerts.some(a => a.level === 'orange')) overallStatus = 'orange';
  if (allAlerts.some(a => a.level === 'rouge')) overallStatus = 'rouge';

  // Inject alerts into day summaries
  for (const alert of allAlerts) {
    if (alert.date) {
      const daySummary = daySummaries.find(d => d.date === alert.date);
      if (daySummary) daySummary.alerts.push(alert);
    }
  }

  return {
    weekStart: weekDates[0],
    weekEnd: weekDates[6],
    totalHours,
    plafondAutorise: plafond,
    reposQuotidienOk: r2.ok,
    reposHebdoOk: r3.ok,
    overallStatus,
    days: daySummaries,
    alerts: allAlerts,
    daysWorkedCount: daysWorked,
  };
}
