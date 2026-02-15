export type EventType = 
  | 'astreinte'
  | 'astreinte-cancelled'
  | 'astreinte-ponctuelle'
  | 'event'
  | 'vacation'
  | 'holiday'
  | 'arret'
  | 'arret-prepa'
  | 're'  // Repos / Récupération
  | 'cp'; // 21 (Congés annuels)

// Source of an event (for future external calendar sync)
export type EventSource = 'internal' | 'outlook' | 'ios' | 'ics';

export type PatternType = 
  | 'none'
  | 'stripes'
  | 'dots'
  | 'crosshatch'
  | 'waves'
  | 'diagonal'
  | 'grid'
  | 'zigzag';

// Module types for AT preparation phases
export type PrepaModuleType = 'M0' | 'M1' | 'M2A' | 'M2B' | 'M3' | 'M4';

// Pattern mapping for each preparation module
export const modulePatterns: Record<PrepaModuleType, PatternType> = {
  'M0': 'dots',
  'M1': 'stripes',
  'M2A': 'diagonal',
  'M2B': 'crosshatch',
  'M3': 'waves',
  'M4': 'grid',
};
export interface CalendarEvent {
  id: string;
  type: EventType;
  name: string;
  startDate: Date;
  endDate: Date;
  startTime?: string; // HH:mm format, e.g. "05:00"
  endTime?: string;   // HH:mm format, e.g. "21:00"
  color: string;
  pattern?: PatternType;
  isRecurring?: boolean;
  recurringWeeks?: number;
  source?: EventSource; // Origin of the event (default: 'internal')
  externalId?: string;  // UID from external calendar (ICS VEVENT UID)
  readonly?: boolean;   // If true, event cannot be edited (external events)
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
  startTime?: string; // HH:mm format, e.g. "00:00"
  endTime?: string;   // HH:mm format, e.g. "23:59"
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
  color?: string; // Optional - will use tranche color by default
  pattern?: PatternType;
  tranche: 'Tr2' | 'Tr3' | 'Tr4' | 'Tr5';
  module?: PrepaModuleType; // For prepa types: M0, M1, M2A, M2B, M3, M4
  parentArretId?: string; // Reference to the parent AT for preparations
}

export interface CalendarSettings {
  // Vue annuelle - Bandeau mois
  yearMonthBgColor: string;
  yearMonthTextColor: string;
  // Vue mensuelle - Bandeau supérieur (Lun-Dim)
  monthHeaderBgColor: string;
  monthHeaderTextColor: string;
  // Vue mensuelle - Bandeau gauche (n° semaine)
  weekNumberBgColor: string;
  weekNumberTextColor: string;
  // Vue mensuelle - Cases jours
  dayCellBgColor: string;
  dayCellTextColor: string;
  weekendDaysBgColor: string;
  weekendDaysTextColor: string;
  // Jours fériés
  holidayPattern: PatternType;
  // Astreintes
  astreinteColor: string;
  astreinteCancelledColor: string;
  astreinteCancelledPattern: PatternType;
  astreintePonctuelleColor: string;
  // Vacances scolaires
  vacationColor: string;
  vacationTextColor: string;
  // RE / 21 (Congés annuels)
  reColor: string;
  cpColor: string; // 21 (Congés annuels)
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
  // Astreinte start date, cycle & PIN
  astreinteStartDate: string; // ISO string
  astreinteCycleWeeks: number; // Cycle length in weeks (default 6)
  settingsPin: string;
}

// Mandatory tranche colors as per specification
export const TRANCHE_COLORS = {
  Tr2: '#3C9453',
  Tr3: '#CC6600',
  Tr4: '#558ED5',
  Tr5: '#FF0000',
} as const;

export const defaultSettings: CalendarSettings = {
  // Vue annuelle
  yearMonthBgColor: '#003A8F',
  yearMonthTextColor: '#FFFFFF',
  // Vue mensuelle - header
  monthHeaderBgColor: '#003A8F',
  monthHeaderTextColor: '#FFFFFF',
  // Vue mensuelle - n° semaine
  weekNumberBgColor: '#E6E6E6',
  weekNumberTextColor: '#4A4A4A',
  // Vue mensuelle - cases jours
  dayCellBgColor: '#FFFFFF',
  dayCellTextColor: '#333333',
  weekendDaysBgColor: '#E6E6E6',
  weekendDaysTextColor: '#4A4A4A',
  // Jours fériés
  holidayPattern: 'stripes',
  // Astreintes
  astreinteColor: '#FFCC00',
  astreinteCancelledColor: '#4A4A4A',
  astreinteCancelledPattern: 'crosshatch',
  astreintePonctuelleColor: '#E30613',
  // Vacances
  vacationColor: '#4CAF50',
  vacationTextColor: '#2D2A00',
  // RE / 21 (Congés annuels)
  reColor: '#E6E6E6',
  cpColor: '#4A4A4A', // 21 (Congés annuels)
  // Tranches
  arretTr2Color: TRANCHE_COLORS.Tr2,
  arretTr3Color: TRANCHE_COLORS.Tr3,
  arretTr4Color: TRANCHE_COLORS.Tr4,
  arretTr5Color: TRANCHE_COLORS.Tr5,
  prepaTr2Color: TRANCHE_COLORS.Tr2,
  prepaTr3Color: TRANCHE_COLORS.Tr3,
  prepaTr4Color: TRANCHE_COLORS.Tr4,
  prepaTr5Color: TRANCHE_COLORS.Tr5,
  // Astreinte
  astreinteStartDate: new Date(2026, 1, 5).toISOString(),
  astreinteCycleWeeks: 6,
  settingsPin: '0000',
};
