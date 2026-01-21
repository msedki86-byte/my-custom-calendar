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
  | 'waves'
  | 'diagonal'
  | 'grid'
  | 'zigzag';

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
  name?: string; // Name for display (for cancellation or ponctuelle)
  startDate: Date; // Thursday
  endDate: Date; // Following Thursday
  isCancelled: boolean;
  isPonctuelle: boolean;
}

// Cancelled dates for specific days (not entire astreinte periods)
export interface CancelledAstreinteDate {
  id: string;
  date: Date;
  name: string;
  astreinteId: string; // Reference to the parent astreinte
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
  pattern?: PatternType;
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
  // Couleurs par tranche - Arrêts
  arretTr2Color: string;
  arretTr3Color: string;
  arretTr4Color: string;
  arretTr5Color: string;
  // Couleurs par tranche - Préparations
  prepaTr2Color: string;
  prepaTr3Color: string;
  prepaTr4Color: string;
  prepaTr5Color: string;
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
  // Couleurs par tranche - Arrêts
  arretTr2Color: '#22c55e',
  arretTr3Color: '#3b82f6',
  arretTr4Color: '#ef4444',
  arretTr5Color: '#f59e0b',
  // Couleurs par tranche - Préparations
  prepaTr2Color: '#86efac',
  prepaTr3Color: '#93c5fd',
  prepaTr4Color: '#fca5a5',
  prepaTr5Color: '#fcd34d',
  arretPrepaPattern: 'dots',
};
