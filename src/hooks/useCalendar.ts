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

  /* ================= EVENTS ================= */

  const addEvent = useCallback((eventData: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: `event-${Date.now()}`,
    };
    setEvents(prev => [...prev, newEvent]);
  }, []);

  const updateEvent = useCallback((id: string, updates: Partial<CalendarEvent>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  }, []);

  const removeEvent = useCallback((id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  }, []);

  const getEventsForDate = useCallback((date: Date): CalendarEvent[] => {
    return events.filter(event => 
      isWithinInterval(date, { start: event.startDate, end: event.endDate }) ||
      isSameDay(date, event.startDate) ||
      isSameDay(date, event.endDate)
    );
  }, [events]);

  const getNonRECPEventsForDate = useCallback((date: Date): CalendarEvent[] => {
    return getEventsForDate(date).filter(e => e.type !== 're' && e.type !== 'cp');
  }, [getEventsForDate]);

  // Alias for backwards compatibility
  const getNonREEventsForDate = getNonRECPEventsForDate;

  const isREDay = useCallback((date: Date): CalendarEvent | null => {
    const reEvents = events.filter(e => 
      e.type === 're' && (
        isWithinInterval(date, { start: e.startDate, end: e.endDate }) ||
        isSameDay(date, e.startDate) ||
        isSameDay(date, e.endDate)
      )
    );
    return reEvents.length > 0 ? reEvents[0] : null;
  }, [events]);

  const isCPDay = useCallback((date: Date): CalendarEvent | null => {
    const cpEvents = events.filter(e => 
      e.type === 'cp' && (
        isWithinInterval(date, { start: e.startDate, end: e.endDate }) ||
        isSameDay(date, e.startDate) ||
        isSameDay(date, e.endDate)
      )
    );
    return cpEvents.length > 0 ? cpEvents[0] : null;
  }, [events]);

  /* ================= ASTREINTE MANAGEMENT ================= */

  const isAstreinteDay = useCallback((date: Date, astreintes: Astreinte[]): Astreinte | null => {
    for (const astreinte of astreintes) {
      if (
        isWithinInterval(date, { start: astreinte.startDate, end: astreinte.endDate }) ||
        isSameDay(date, astreinte.startDate) ||
        isSameDay(date, astreinte.endDate)
      ) {
        return astreinte;
      }
    }
    return null;
  }, []);

  const isDateCancelled = useCallback((date: Date): CancelledAstreinteDate | null => {
    for (const cancelled of cancelledAstreinteDates) {
      if (isSameDay(date, cancelled.date)) {
        return cancelled;
      }
    }
    return null;
  }, [cancelledAstreinteDates]);

  const hasConflict = useCallback((date: Date, astreintes: Astreinte[]): boolean => {
    const activeAstreintes = astreintes.filter(a => 
      !a.isCancelled && (
        isWithinInterval(date, { start: a.startDate, end: a.endDate }) ||
        isSameDay(date, a.startDate) ||
        isSameDay(date, a.endDate)
      )
    );
    return activeAstreintes.length > 1;
  }, []);

  const getConflictDetails = useCallback((date: Date, astreintes: Astreinte[]): string[] => {
    const conflicting = astreintes.filter(a => 
      !a.isCancelled && (
        isWithinInterval(date, { start: a.startDate, end: a.endDate }) ||
        isSameDay(date, a.startDate) ||
        isSameDay(date, a.endDate)
      )
    );
    return conflicting.map(a => a.name || `Astreinte ${format(a.startDate, 'dd/MM')}`);
  }, []);

  const cancelAstreinteDates = useCallback((startDate: Date, endDate: Date, name: string) => {
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    const newCancellations: CancelledAstreinteDate[] = days.map((day, index) => ({
      id: `cancelled-${Date.now()}-${index}`,
      date: day,
      name,
      astreinteId: '',
    }));
    setCancelledAstreinteDates(prev => [...prev, ...newCancellations]);
  }, []);

  const restoreCancelledDate = useCallback((id: string) => {
    setCancelledAstreinteDates(prev => prev.filter(c => c.id !== id));
  }, []);

  const addPonctualAstreinte = useCallback((startDate: Date, endDate: Date, name?: string) => {
    const newAstreinte: Astreinte = {
      id: `ponctual-${Date.now()}`,
      name,
      startDate,
      endDate,
      isCancelled: false,
      isPonctuelle: true,
    };
    setPonctualAstreintes(prev => [...prev, newAstreinte]);
  }, []);

  const updatePonctualAstreinte = useCallback((id: string, updates: Partial<Astreinte>) => {
    setPonctualAstreintes(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  }, []);

  const removePonctualAstreinte = useCallback((id: string) => {
    setPonctualAstreintes(prev => prev.filter(a => a.id !== id));
  }, []);

  /* ================= HOLIDAYS ================= */

  const isHoliday = useCallback((date: Date): Holiday | null => {
    for (const holiday of holidays) {
      if (isSameDay(date, holiday.date)) {
        return holiday;
      }
    }
    return null;
  }, [holidays]);

  const addHoliday = useCallback((holiday: Omit<Holiday, 'id'>) => {
    setHolidays(prev => [...prev, holiday as Holiday]);
  }, []);

  const updateHoliday = useCallback((date: Date, updates: Partial<Holiday>) => {
    setHolidays(prev => prev.map(h => 
      isSameDay(h.date, date) ? { ...h, ...updates } : h
    ));
  }, []);

  const deleteHoliday = useCallback((date: Date) => {
    setHolidays(prev => prev.filter(h => !isSameDay(h.date, date)));
  }, []);

  /* ================= VACATIONS ================= */

  const isVacationDay = useCallback((date: Date): Vacation | null => {
    for (const vacation of vacations) {
      if (
        isWithinInterval(date, { start: vacation.startDate, end: vacation.endDate }) ||
        isSameDay(date, vacation.startDate) ||
        isSameDay(date, vacation.endDate)
      ) {
        return vacation;
      }
    }
    return null;
  }, [vacations]);

  const addVacation = useCallback((vacation: Omit<Vacation, 'id'>) => {
    const newVacation: Vacation = {
      ...vacation,
      id: `vacation-${Date.now()}`,
    };
    setVacations(prev => [...prev, newVacation]);
  }, []);

  const updateVacation = useCallback((id: string, updates: Partial<Vacation>) => {
    setVacations(prev => prev.map(v => v.id === id ? { ...v, ...updates } : v));
  }, []);

  const deleteVacation = useCallback((id: string) => {
    setVacations(prev => prev.filter(v => v.id !== id));
  }, []);

  /* ================= ARRETS ================= */

  const isArretDay = useCallback((date: Date): Arret | null => {
    for (const arret of arrets) {
      if (
        isWithinInterval(date, { start: arret.startDate, end: arret.endDate }) ||
        isSameDay(date, arret.startDate) ||
        isSameDay(date, arret.endDate)
      ) {
        return arret;
      }
    }
    return null;
  }, [arrets]);

  const addArret = useCallback((arret: Omit<Arret, 'id'>) => {
    const newArret: Arret = {
      ...arret,
      id: `arret-${Date.now()}`,
    };
    setArrets(prev => [...prev, newArret]);
  }, []);

  const updateArret = useCallback((id: string, updates: Partial<Arret>) => {
    setArrets(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  }, []);

  const deleteArret = useCallback((id: string) => {
    setArrets(prev => prev.filter(a => a.id !== id));
  }, []);

  const getArretsForPeriod = useCallback((start: Date, end: Date): Arret[] => {
    return arrets.filter(a => 
      (a.startDate <= end && a.endDate >= start)
    );
  }, [arrets]);

  /* ================= IMPORT ================= */

  const importEvents = useCallback((newEvents: CalendarEvent[]) => {
    setEvents(prev => [...prev, ...newEvents]);
  }, []);

  const importVacations = useCallback((newVacations: Vacation[]) => {
    setVacations(prev => [...prev, ...newVacations]);
  }, []);

  const importArrets = useCallback((newArrets: Arret[]) => {
    setArrets(prev => [...prev, ...newArrets]);
  }, []);

  const importHolidays = useCallback((newHolidays: Holiday[]) => {
    setHolidays(prev => [...prev, ...newHolidays]);
  }, []);

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
    generateAstreintes,
    getAstreintesForYear,
    // Events
    addEvent,
    updateEvent,
    removeEvent,
    getEventsForDate,
    getNonREEventsForDate,
    getNonRECPEventsForDate,
    isREDay,
    isCPDay,
    // Astreintes
    isAstreinteDay,
    isDateCancelled,
    hasConflict,
    getConflictDetails,
    cancelAstreinteDates,
    restoreCancelledDate,
    addPonctualAstreinte,
    updatePonctualAstreinte,
    removePonctualAstreinte,
    // Holidays
    isHoliday,
    addHoliday,
    updateHoliday,
    deleteHoliday,
    // Vacations
    isVacationDay,
    addVacation,
    updateVacation,
    deleteVacation,
    // Arrets
    isArretDay,
    addArret,
    updateArret,
    deleteArret,
    getArretsForPeriod,
    // Import
    importEvents,
    importVacations,
    importArrets,
    importHolidays,
  };
}
