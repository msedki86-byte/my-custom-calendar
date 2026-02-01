import { useState, useCallback, useMemo } from 'react';
import { 
  CalendarEvent, 
  Vacation, 
  Holiday, 
  Arret, 
  CalendarSettings,
  defaultSettings,
  Astreinte,
  CancelledAstreinteDate
} from '@/types/calendar';
import {
  initialVacations,
  initialHolidays,
  initialArrets,
  initialEvents,
  ASTREINTE_START_DATE,
  ASTREINTE_CYCLE_WEEKS,
} from '@/data/initialData';
import { 
  addDays, 
  addWeeks, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval,
  isSameDay,
  isWithinInterval,
  differenceInWeeks,
  format,
} from 'date-fns';

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));
  const [settings, setSettings] = useState<CalendarSettings>(defaultSettings);
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [vacations, setVacations] = useState<Vacation[]>(initialVacations);
  const [holidays, setHolidays] = useState<Holiday[]>(initialHolidays);
  const [arrets, setArrets] = useState<Arret[]>(initialArrets);
  const [ponctualAstreintes, setPonctualAstreintes] = useState<Astreinte[]>([]);
  const [cancelledAstreinteDates, setCancelledAstreinteDates] = useState<CancelledAstreinteDate[]>([]);

  /* 🔒 Sécurisation centrale des dates */
  const safeSetDate = useCallback((date: Date) => {
    if (!(date instanceof Date)) return;
    if (isNaN(date.getTime())) return;
    setCurrentDate(date);
  }, []);

  /* ================= ASTREINTES ================= */

  const generateAstreintes = useCallback((startDate: Date, endDate: Date): Astreinte[] => {
    const astreintes: Astreinte[] = [];
    let currentStart = ASTREINTE_START_DATE;

    const weeksDiff = differenceInWeeks(startDate, ASTREINTE_START_DATE);
    const cyclesBefore = Math.floor(weeksDiff / ASTREINTE_CYCLE_WEEKS);
    if (cyclesBefore > 0) {
      currentStart = addWeeks(ASTREINTE_START_DATE, cyclesBefore * ASTREINTE_CYCLE_WEEKS);
    }

    currentStart = addWeeks(currentStart, -ASTREINTE_CYCLE_WEEKS);

    while (currentStart <= endDate) {
      const astreinteEnd = addDays(currentStart, 7);
      astreintes.push({
        id: `astreinte-${format(currentStart, 'yyyy-MM-dd')}`,
        startDate: new Date(currentStart),
        endDate: astreinteEnd,
        isCancelled: false,
        isPonctuelle: false,
      });
      currentStart = addWeeks(currentStart, ASTREINTE_CYCLE_WEEKS);
    }

    ponctualAstreintes.forEach(pa => {
      if (pa.startDate <= endDate && pa.endDate >= startDate) {
        astreintes.push(pa);
      }
    });

    return astreintes;
  }, [ponctualAstreintes]);

  /* ================= NAVIGATION ================= */

  const goToNextMonth = useCallback(() => {
    safeSetDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  }, [currentDate, safeSetDate]);

  const goToPrevMonth = useCallback(() => {
    safeSetDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  }, [currentDate, safeSetDate]);

  const goToToday = useCallback(() => {
    safeSetDate(new Date());
  }, [safeSetDate]);

  const goToDate = useCallback((date: Date) => {
    safeSetDate(date);
  }, [safeSetDate]);

  const goToYear = useCallback((year: number) => {
    if (isNaN(year)) return;
    const month = Math.min(Math.max(currentDate.getMonth(), 0), 11);
    safeSetDate(new Date(year, month, 1));
  }, [currentDate, safeSetDate]);

  /* ================= COMPUTED ================= */

  const monthDays = useMemo(() => {
    return eachDayOfInterval({
      start: startOfMonth(currentDate),
      end: endOfMonth(currentDate),
    });
  }, [currentDate]);

  const currentAstreintes = useMemo(() => {
    return generateAstreintes(startOfMonth(currentDate), endOfMonth(currentDate));
  }, [currentDate, generateAstreintes]);

  const getAstreintesForYear = useCallback((year: number) => {
    return generateAstreintes(new Date(year, 0, 1), new Date(year, 11, 31));
  }, [generateAstreintes]);

  /* ================= RETURN ================= */

  return {
    currentDate,
    settings,
    events,
    vacations,
    holidays,
    arrets,
    ponctualAstreintes,
    cancelledAstreinteDates,
    monthDays,
    currentAstreintes,
    goToNextMonth,
    goToPrevMonth,
    goToToday,
    goToDate,
    goToYear,
    updateSettings: (s: Partial<CalendarSettings>) => setSettings(p => ({ ...p, ...s })),
    /* … le reste de tes méthodes métier inchangées … */
    generateAstreintes,
    getAstreintesForYear,
  };
}
