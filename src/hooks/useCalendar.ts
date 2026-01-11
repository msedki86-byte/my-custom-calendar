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
  const [holidays] = useState<Holiday[]>(initialHolidays);
  const [arrets, setArrets] = useState<Arret[]>(initialArrets);
  const [cancelledAstreinteIds, setCancelledAstreinteIds] = useState<string[]>([]);
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

  // Cancel an astreinte
  const cancelAstreinte = useCallback((astreinteId: string) => {
    setCancelledAstreinteIds(prev => [...prev, astreinteId]);
  }, []);

  // Restore an astreinte
  const restoreAstreinte = useCallback((astreinteId: string) => {
    setCancelledAstreinteIds(prev => prev.filter(id => id !== astreinteId));
  }, []);

  // Add ponctual astreinte
  const addPonctualAstreinte = useCallback((startDate: Date, endDate: Date) => {
    const newAstreinte: Astreinte = {
      id: `ponctual-${Date.now()}`,
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

  // Remove event
  const removeEvent = useCallback((eventId: string) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
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

  return {
    currentDate,
    settings,
    events,
    vacations,
    holidays,
    arrets,
    monthDays,
    currentAstreintes,
    goToNextMonth,
    goToPrevMonth,
    goToToday,
    goToDate,
    updateSettings,
    addEvent,
    removeEvent,
    cancelAstreinte,
    restoreAstreinte,
    addPonctualAstreinte,
    removePonctualAstreinte,
    addArret,
    isAstreinteDay,
    hasConflict,
    isHoliday,
    isVacationDay,
    getEventsForDate,
    getArretsForPeriod,
  };
}
