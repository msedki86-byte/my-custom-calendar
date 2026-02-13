/**
 * Hook for Module 2 – Conformité & Pointage
 * Manages time entries with localStorage persistence.
 */

import { useState, useCallback, useEffect, useMemo } from 'react';
import { TimeEntry, NoteTag } from '@/types/pointage';
import { computeWeekSummary, getWeekSunday, getWeekDates } from '@/lib/complianceEngine';
import { addDays, format } from 'date-fns';

const STORAGE_KEY = 'wplanner-pointage-entries';

function loadEntries(): TimeEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return [];
}

function saveEntries(entries: TimeEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

let idCounter = Date.now();
function newId(): string {
  return (idCounter++).toString(36);
}

export function usePointage() {
  const [entries, setEntries] = useState<TimeEntry[]>(loadEntries);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => getWeekSunday(format(new Date(), 'yyyy-MM-dd')));

  useEffect(() => {
    saveEntries(entries);
  }, [entries]);

  const addEntry = useCallback((entry: Omit<TimeEntry, 'id'>) => {
    setEntries(prev => [...prev, { ...entry, id: newId() }]);
  }, []);

  const updateEntry = useCallback((id: string, patch: Partial<TimeEntry>) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, ...patch } : e));
  }, []);

  const deleteEntry = useCallback((id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  }, []);

  const getEntriesForDate = useCallback((date: string) => {
    return entries.filter(e => e.date === date);
  }, [entries]);

  const weekSummary = useMemo(() => {
    return computeWeekSummary(entries, currentWeekStart);
  }, [entries, currentWeekStart]);

  const goToNextWeek = useCallback(() => {
    setCurrentWeekStart(prev => addDays(prev, 7));
  }, []);

  const goToPrevWeek = useCallback(() => {
    setCurrentWeekStart(prev => addDays(prev, -7));
  }, []);

  const goToCurrentWeek = useCallback(() => {
    setCurrentWeekStart(getWeekSunday(format(new Date(), 'yyyy-MM-dd')));
  }, []);

  return {
    entries,
    currentWeekStart,
    weekSummary,
    addEntry,
    updateEntry,
    deleteEntry,
    getEntriesForDate,
    goToNextWeek,
    goToPrevWeek,
    goToCurrentWeek,
  };
}
