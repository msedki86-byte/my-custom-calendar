/**
 * Hook for Module 2 – Conformité & Pointage (CNPE Bugey)
 * Manages time entries + pointage settings with localStorage persistence.
 * Habillage fixe = 1h/jour travaillé (auto, not per-entry).
 */

import { useState, useCallback, useEffect, useMemo } from 'react';
import { TimeEntry, PointageSettings, defaultPointageSettings } from '@/types/pointage';
import { computeWeekSummary, getWeekSunday, computeAutoComments } from '@/lib/complianceEngine';
import { addDays, format } from 'date-fns';

const ENTRIES_KEY = 'wplanner-pointage-entries';
const SETTINGS_KEY = 'wplanner-pointage-settings';

function loadEntries(): TimeEntry[] {
  try {
    const raw = localStorage.getItem(ENTRIES_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return [];
}

function saveEntries(entries: TimeEntry[]) {
  localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
}

function loadPointageSettings(): PointageSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) return { ...defaultPointageSettings, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return { ...defaultPointageSettings };
}

function savePointageSettings(s: PointageSettings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
}

let idCounter = Date.now();
function newId(): string {
  return (idCounter++).toString(36);
}

export function usePointage() {
  const [entries, setEntries] = useState<TimeEntry[]>(loadEntries);
  const [pointageSettings, setPointageSettings] = useState<PointageSettings>(loadPointageSettings);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => getWeekSunday(format(new Date(), 'yyyy-MM-dd')));

  useEffect(() => { saveEntries(entries); }, [entries]);
  useEffect(() => { savePointageSettings(pointageSettings); }, [pointageSettings]);

  const addEntry = useCallback((entry: Omit<TimeEntry, 'id' | 'autoComments'>) => {
    const autoComments = computeAutoComments(entry as TimeEntry, pointageSettings.primeRepasValeur, pointageSettings.communeDepart);
    setEntries(prev => [...prev, { ...entry, id: newId(), autoComments }]);
  }, [pointageSettings.primeRepasValeur, pointageSettings.communeDepart]);

  const updateEntry = useCallback((id: string, patch: Partial<TimeEntry>) => {
    setEntries(prev => prev.map(e => {
      if (e.id !== id) return e;
      const updated = { ...e, ...patch };
      updated.autoComments = computeAutoComments(updated, pointageSettings.primeRepasValeur, pointageSettings.communeDepart);
      return updated;
    }));
  }, [pointageSettings.primeRepasValeur, pointageSettings.communeDepart]);

  const deleteEntry = useCallback((id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  }, []);

  const deleteWeekEntries = useCallback((weekDates: string[]) => {
    setEntries(prev => prev.filter(e => !weekDates.includes(e.date)));
  }, []);

  const getEntriesForDate = useCallback((date: string) => {
    return entries.filter(e => e.date === date);
  }, [entries]);

  const weekSummary = useMemo(() => {
    return computeWeekSummary(entries, currentWeekStart, pointageSettings);
  }, [entries, currentWeekStart, pointageSettings]);

  const goToNextWeek = useCallback(() => setCurrentWeekStart(prev => addDays(prev, 7)), []);
  const goToPrevWeek = useCallback(() => setCurrentWeekStart(prev => addDays(prev, -7)), []);
  const goToCurrentWeek = useCallback(() => setCurrentWeekStart(getWeekSunday(format(new Date(), 'yyyy-MM-dd'))), []);

  const updatePointageSettings = useCallback((patch: Partial<PointageSettings>) => {
    setPointageSettings(prev => ({ ...prev, ...patch }));
  }, []);

  return {
    entries,
    currentWeekStart,
    weekSummary,
    pointageSettings,
    addEntry,
    updateEntry,
    deleteEntry,
    deleteWeekEntries,
    getEntriesForDate,
    goToNextWeek,
    goToPrevWeek,
    goToCurrentWeek,
    updatePointageSettings,
  };
}
