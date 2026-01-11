import { useState, useCallback, useMemo } from 'react';
import { 
  CalendarEvent, 
  Vacation, 
  Holiday, 
  Arret, 
  CalendarSettings,
  defaultSettings,
  Astreinte
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
  getDay,
  format,
} from 'date-fns';

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));
  const [settings, setSettings] = useState<CalendarSettings>(defaultSettings);
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [vacations, setVacations] = useState<Vacation[]>(initialVacations);
  const [holidays, setHolidays] = useState<Holiday[]>(initialHolidays);
  const [arrets, setArrets] = useState<Arret[]>(initialArrets);
  const [cancelledAstreinteIds, setCancelledAstreinteIds] = useState<string[]>([]);
  const [cancelledAstreinteNames, setCancelledAstreinteNames] = useState<Record<string, string>>({});
  const [ponctualAstreintes, setPonctualAstreintes] = useState<Astreinte[]>([]);

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
        isCancelled: cancelledAstreinteIds.includes(id),
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
  }, [cancelledAstreinteIds, ponctualAstreintes]);

  // Check if a date is during an astreinte period
  const isAstreinteDay = useCallback((date: Date, astreintes: Astreinte[]): Astreinte | null => {
    for (const astreinte of astreintes) {
      if (isWithinInterval(date, { start: astreinte.startDate, end: astreinte.endDate })) {
        return astreinte;
      }
    }
    return null;
  }, []);

  // Check for conflicts
  const hasConflict = useCallback((date: Date, astreintes: Astreinte[]): boolean => {
    const astreinte = isAstreinteDay(date, astreintes);
    if (!astreinte || astreinte.isCancelled) return false;
    
    // Check if there's an event on this day
    return events.some(event => 
      isWithinInterval(date, { start: event.startDate, end: event.endDate })
    );
  }, [events, isAstreinteDay]);

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

  // Get events for a specific date
  const getEventsForDate = useCallback((date: Date): CalendarEvent[] => {
    return events.filter(event => 
      isWithinInterval(date, { start: event.startDate, end: event.endDate })
    );
  }, [events]);

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

  // Cancel an astreinte with a name
  const cancelAstreinte = useCallback((astreinteId: string, name?: string) => {
    setCancelledAstreinteIds(prev => [...prev, astreinteId]);
    if (name) {
      setCancelledAstreinteNames(prev => ({ ...prev, [astreinteId]: name }));
    }
  }, []);

  // Restore an astreinte
  const restoreAstreinte = useCallback((astreinteId: string) => {
    setCancelledAstreinteIds(prev => prev.filter(id => id !== astreinteId));
    setCancelledAstreinteNames(prev => {
      const newNames = { ...prev };
      delete newNames[astreinteId];
      return newNames;
    });
  }, []);
  
  // Get cancelled astreinte name
  const getCancelledAstreinteName = useCallback((astreinteId: string) => {
    return cancelledAstreinteNames[astreinteId] || '';
  }, [cancelledAstreinteNames]);

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
    cancelledAstreinteIds,
    cancelledAstreinteNames,
    goToNextMonth,
    goToPrevMonth,
    goToToday,
    goToDate,
    updateSettings,
    addEvent,
    updateEvent,
    removeEvent,
    cancelAstreinte,
    restoreAstreinte,
    addPonctualAstreinte,
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
    hasConflict,
    isHoliday,
    isVacationDay,
    getEventsForDate,
    getArretsForPeriod,
    getAstreintesForYear,
    getCancelledAstreinteName,
  };
}
