export type EventType = 
  | 'astreinte'
  | 'astreinte-cancelled'
  | 'astreinte-ponctuelle'
  | 'event'
  | 'vacation'
  | 'holiday'
  | 'arret'
  | 'arret-prepa';

export type PatternType = 
  | 'none'
  | 'stripes'
  | 'dots'
  | 'crosshatch'
  | 'waves';

export interface CalendarEvent {
  id: string;
  type: EventType;
  name: string;
  startDate: Date;
  endDate: Date;
  color: string;
  pattern?: PatternType;
  isRecurring?: boolean;
  recurringWeeks?: number;
}

export interface Astreinte {
  id: string;
  startDate: Date; // Thursday
  endDate: Date; // Following Thursday
  isCancelled: boolean;
  isPonctuelle: boolean;
}

export interface Vacation {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  color: string;
}

export interface Holiday {
  date: Date;
  name: string;
}

export interface Arret {
  id: string;
  type: 'arret' | 'prepa';
  name: string;
  startDate: Date;
  endDate: Date;
  color: string;
  tranche: string;
}

export interface CalendarSettings {
  titleWeekColor: string;
  titleWeekendColor: string;
  weekNumbersColor: string;
  weekdaysColor: string;
  weekendDaysColor: string;
  emptyCellsColor: string;
  holidayPattern: PatternType;
  astreinteColor: string;
  astreinteCancelledColor: string;
  astreinteCancelledPattern: PatternType;
  astreintePonctuelleColor: string;
  eventColor: string;
  vacationColor: string;
  arretColor: string;
  arretPrepaColor: string;
  arretPrepaPattern: PatternType;
}

export const defaultSettings: CalendarSettings = {
  titleWeekColor: '#3b82f6',
  titleWeekendColor: '#6366f1',
  weekNumbersColor: '#64748b',
  weekdaysColor: '#1e293b',
  weekendDaysColor: '#94a3b8',
  emptyCellsColor: '#f8fafc',
  holidayPattern: 'stripes',
  astreinteColor: '#f59e0b',
  astreinteCancelledColor: '#9ca3af',
  astreinteCancelledPattern: 'crosshatch',
  astreintePonctuelleColor: '#ea580c',
  eventColor: '#0ea5e9',
  vacationColor: '#a855f7',
  arretColor: '#22c55e',
  arretPrepaColor: '#86efac',
  arretPrepaPattern: 'dots',
};
