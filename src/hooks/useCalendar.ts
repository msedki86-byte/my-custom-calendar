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
  
  // Store cancelled dates instead of entire astreinte periods
  const [cancelledAstreinteDates, setCancelledAstreinteDates] = useState<CancelledAstreinteDate[]>([]);

  // Generate recurring astreintes
  const generateAstreintes = useCallback((startDate: Date, endDate: Date): Astreinte[] => {
    const astreintes: Astreinte[] = [];
    let currentStart = ASTREINTE_START_DATE;
    
    // Find the first Thursday before our start date that's in the cycle
    const weeksDiff = differenceInWeeks(startDate, ASTREINTE_START_DATE);
    const cyclesBefore = Math.floor(weeksDiff / ASTREINTE_CYCLE_WEEKS);
    if (cyclesBefore > 0) {
      currentStart = addWeeks(ASTREINTE_START_DATE, cyclesBefore * ASTREINTE_CYCLE_WEEKS);
    }
    
    // Go back one cycle to make sure we catch any that overlap
    currentStart = addWeeks(currentStart, -ASTREINTE_CYCLE_WEEKS);

    while (currentStart <= endDate) {
      const astreinteEnd = addDays(currentStart, 7); // Thursday to Thursday
      const id = `astreinte-${format(currentStart, 'yyyy-MM-dd')}`;
      
      astreintes.push({
        id,
        startDate: new Date(currentStart),
        endDate: astreinteEnd,
        isCancelled: false, // We check per-date now
        isPonctuelle: false,
      });
      
      currentStart = addWeeks(currentStart, ASTREINTE_CYCLE_WEEKS);
    }

    // Add ponctual astreintes
    ponctualAstreintes.forEach(pa => {
      if (pa.startDate <= endDate && pa.endDate >= startDate) {
        astreintes.push(pa);
      }
    });

    return astreintes;
  }, [ponctualAstreintes]);

  // Check if a date is during an astreinte period
  const isAstreinteDay = useCallback((date: Date, astreintes: Astreinte[]): Astreinte | null => {
    for (const astreinte of astreintes) {
      if (isWithinInterval(date, { start: astreinte.startDate, end: astreinte.endDate })) {
        return astreinte;
      }
    }
    return null;
  }, []);
  
  // Check if a specific date is cancelled
  const isDateCancelled = useCallback((date: Date): CancelledAstreinteDate | null => {
    return cancelledAstreinteDates.find(c => isSameDay(c.date, date)) || null;
  }, [cancelledAstreinteDates]);

  // Check for conflicts
  const hasConflict = useCallback((date: Date, astreintes: Astreinte[]): boolean => {
    const astreinte = isAstreinteDay(date, astreintes);
    if (!astreinte) return false;
    
    // Check if this specific date is cancelled
    if (isDateCancelled(date)) return false;
    
    // Check if there's an event on this day
    return events.some(event => 
      isWithinInterval(date, { start: event.startDate, end: event.endDate })
    );
  }, [events, isAstreinteDay, isDateCancelled]);

  // Check if date is a holiday
  const isHoliday = useCallback((date: Date): Holiday | null => {
    return holidays.find(h => isSameDay(h.date, date)) || null;
  }, [holidays]);

  // Check if date is during vacation
  const isVacationDay = useCallback((date: Date): Vacation | null => {
    return vacations.find(v => 
      isWithinInterval(date, { start: v.startDate, end: v.endDate })
    ) || null;
  }, [vacations]);

  // Check if date is during an arret
  const isArretDay = useCallback((date: Date): Arret | null => {
    return arrets.find(a => 
      isWithinInterval(date, { start: a.startDate, end: a.endDate })
    ) || null;
  }, [arrets]);

  // Get events for a specific date
  const getEventsForDate = useCallback((date: Date): CalendarEvent[] => {
    return events.filter(event => 
      isWithinInterval(date, { start: event.startDate, end: event.endDate })
    );
  }, [events]);

  // Check if date is a RE (repos/récupération) day
  const isREDay = useCallback((date: Date): CalendarEvent | null => {
    return events.find(event => 
      event.name === 'RE' && isWithinInterval(date, { start: event.startDate, end: event.endDate })
    ) || null;
  }, [events]);

  // Get non-RE events for a specific date
  const getNonREEventsForDate = useCallback((date: Date): CalendarEvent[] => {
    return events.filter(event => 
      event.name !== 'RE' && isWithinInterval(date, { start: event.startDate, end: event.endDate })
    );
  }, [events]);

  // Get conflict details for a date
  const getConflictDetails = useCallback((date: Date, astreintes: Astreinte[]): string[] => {
    const details: string[] = [];
    const astreinte = isAstreinteDay(date, astreintes);
    if (!astreinte) return details;
    
    // Check if this specific date is cancelled
    if (isDateCancelled(date)) return details;
    
    // Check for events
    const dateEvents = events.filter(event => 
      isWithinInterval(date, { start: event.startDate, end: event.endDate })
    );
    dateEvents.forEach(event => {
      details.push(`Événement "${event.name}" en conflit avec astreinte`);
    });
    
    // Check for vacations
    const vacation = isVacationDay(date);
    if (vacation) {
      details.push(`Vacances "${vacation.name}" pendant l'astreinte`);
    }
    
    // Check for holidays
    const holiday = isHoliday(date);
    if (holiday) {
      details.push(`Jour férié "${holiday.name}" pendant l'astreinte`);
    }
    
    return details;
  }, [events, isAstreinteDay, isDateCancelled, isVacationDay, isHoliday]);

  // Get arrets for display (for a month view)
  const getArretsForPeriod = useCallback((start: Date, end: Date): Arret[] => {
    return arrets.filter(arret => 
      arret.startDate <= end && arret.endDate >= start
    );
  }, [arrets]);

  // Add new event
  const addEvent = useCallback((event: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...event,
      id: `event-${Date.now()}`,
    };
    setEvents(prev => [...prev, newEvent]);
    return newEvent;
  }, []);

  // Cancel specific dates within an astreinte period
  const cancelAstreinteDates = useCallback((startDate: Date, endDate: Date, name: string) => {
    const dates = eachDayOfInterval({ start: startDate, end: endDate });
    const newCancellations: CancelledAstreinteDate[] = dates.map(date => ({
      id: `cancel-${format(date, 'yyyy-MM-dd')}-${Date.now()}`,
      date,
      name,
      astreinteId: `astreinte-${format(date, 'yyyy-MM-dd')}`,
    }));
    
    setCancelledAstreinteDates(prev => [...prev, ...newCancellations]);
  }, []);

  // Remove a cancelled date (restore)
  const restoreCancelledDate = useCallback((id: string) => {
    setCancelledAstreinteDates(prev => prev.filter(c => c.id !== id));
  }, []);
  
  // Get cancelled date info
  const getCancelledDateInfo = useCallback((date: Date) => {
    return cancelledAstreinteDates.find(c => isSameDay(c.date, date));
  }, [cancelledAstreinteDates]);

  // Add ponctual astreinte
  const addPonctualAstreinte = useCallback((startDate: Date, endDate: Date, name?: string) => {
    const newAstreinte: Astreinte = {
      id: `ponctual-${Date.now()}`,
      name: name || 'Astreinte ponctuelle',
      startDate,
      endDate,
      isCancelled: false,
      isPonctuelle: true,
    };
    setPonctualAstreintes(prev => [...prev, newAstreinte]);
  }, []);

  // Update ponctual astreinte
  const updatePonctualAstreinte = useCallback((id: string, updates: Partial<Astreinte>) => {
    setPonctualAstreintes(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  }, []);

  // Remove ponctual astreinte
  const removePonctualAstreinte = useCallback((id: string) => {
    setPonctualAstreintes(prev => prev.filter(a => a.id !== id));
  }, []);

  // Add arret
  const addArret = useCallback((arret: Omit<Arret, 'id'>) => {
    const newArret: Arret = {
      ...arret,
      id: `arret-${Date.now()}`,
    };
    setArrets(prev => [...prev, newArret]);
  }, []);

  // Update arret
  const updateArret = useCallback((id: string, updates: Partial<Arret>) => {
    setArrets(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  }, []);

  // Delete arret
  const deleteArret = useCallback((id: string) => {
    setArrets(prev => prev.filter(a => a.id !== id));
  }, []);

  // Remove event
  const removeEvent = useCallback((eventId: string) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
  }, []);

  // Update event
  const updateEvent = useCallback((id: string, updates: Partial<CalendarEvent>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  }, []);

  // Add vacation
  const addVacation = useCallback((vacation: Omit<Vacation, 'id'>) => {
    const newVacation: Vacation = {
      ...vacation,
      id: `vac-${Date.now()}`,
    };
    setVacations(prev => [...prev, newVacation]);
  }, []);

  // Update vacation
  const updateVacation = useCallback((id: string, updates: Partial<Vacation>) => {
    setVacations(prev => prev.map(v => v.id === id ? { ...v, ...updates } : v));
  }, []);

  // Delete vacation
  const deleteVacation = useCallback((id: string) => {
    setVacations(prev => prev.filter(v => v.id !== id));
  }, []);

  // Add holiday
  const addHoliday = useCallback((holiday: Holiday) => {
    setHolidays(prev => [...prev, holiday]);
  }, []);

  // Update holiday
  const updateHoliday = useCallback((originalDate: Date, updates: Partial<Holiday>) => {
    setHolidays(prev => prev.map(h => 
      h.date.getTime() === originalDate.getTime() ? { ...h, ...updates } : h
    ));
  }, []);

  // Delete holiday
  const deleteHoliday = useCallback((date: Date) => {
    setHolidays(prev => prev.filter(h => h.date.getTime() !== date.getTime()));
  }, []);

  // Update settings
  const updateSettings = useCallback((newSettings: Partial<CalendarSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  // Navigation
  const goToNextMonth = useCallback(() => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  const goToPrevMonth = useCallback(() => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  const goToDate = useCallback((date: Date) => {
    setCurrentDate(date);
  }, []);

  // Get days for current month view
  const monthDays = useMemo(() => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  // Get astreintes for current view
  const currentAstreintes = useMemo(() => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return generateAstreintes(start, end);
  }, [currentDate, generateAstreintes]);

  // Generate astreintes for year
  const getAstreintesForYear = useCallback((year: number) => {
    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31);
    return generateAstreintes(start, end);
  }, [generateAstreintes]);

  // Import functions
  const importEvents = useCallback((data: any[]) => {
    data.forEach(item => {
      if (item.startDate && item.endDate) {
        addEvent(item);
      }
    });
  }, [addEvent]);

  const importVacations = useCallback((data: any[]) => {
    data.forEach(item => {
      if (item.startDate && item.endDate) {
        addVacation(item);
      }
    });
  }, [addVacation]);

  const importArrets = useCallback((data: any[]) => {
    data.forEach(item => {
      if (item.startDate && item.endDate) {
        addArret(item);
      }
    });
  }, [addArret]);

  const importHolidays = useCallback((data: any[]) => {
    data.forEach(item => {
      if (item.date) {
        addHoliday(item);
      }
    });
  }, [addHoliday]);

  return {
    currentDate,
    settings,
    events,
    vacations,
    holidays,
    arrets,
    monthDays,
    currentAstreintes,
    ponctualAstreintes,
    cancelledAstreinteDates,
    goToNextMonth,
    goToPrevMonth,
    goToToday,
    goToDate,
    updateSettings,
    addEvent,
    updateEvent,
    removeEvent,
    cancelAstreinteDates,
    restoreCancelledDate,
    addPonctualAstreinte,
    updatePonctualAstreinte,
    removePonctualAstreinte,
    addArret,
    updateArret,
    deleteArret,
    addVacation,
    updateVacation,
    deleteVacation,
    addHoliday,
    updateHoliday,
    deleteHoliday,
    isAstreinteDay,
    isDateCancelled,
    getCancelledDateInfo,
    hasConflict,
    getConflictDetails,
    isHoliday,
    isVacationDay,
    isArretDay,
    isREDay,
    getEventsForDate,
    getNonREEventsForDate,
    getArretsForPeriod,
    getAstreintesForYear,
    importEvents,
    importVacations,
    importArrets,
    importHolidays,
  };
}
