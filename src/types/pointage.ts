/**
 * Types for Module 2 – Conformité & Pointage (EDF CNPE Bugey)
 */

export interface TimeEntry {
  id: string;
  date: string; // ISO date YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  isFormation: boolean;
  isInterventionAstreinte: boolean;
  isAstreinteSansIntervention: boolean;
  suppressionMidi: boolean; // default true if covers 12:00-12:45
  note?: string;
  noteTags?: NoteTag[];
  autoComments?: string[]; // auto-generated comments (IK, prime repas, HS, etc.)
  // Legacy field - no longer used (habillage is now fixed 1h/worked day)
  habillage?: number;
}

export type NoteTag = 'prime' | 'ecart' | 'observation' | 'validation-n1';

export const NOTE_TAG_LABELS: Record<NoteTag, string> = {
  prime: 'Prime',
  ecart: 'Écart',
  observation: 'Observation',
  'validation-n1': 'Validation N+1',
};

export type AlertLevel = 'vert' | 'orange' | 'rouge';

export interface ComplianceAlert {
  rule: string;
  level: AlertLevel;
  message: string;
  date?: string; // ISO date
}

export interface DaySummary {
  date: string;
  hoursWorked: number; // effective work hours (after midi deduction)
  habillageHours: number; // fixed 1h if worked, 0 otherwise
  totalHours: number; // worked + habillage
  hasNote: boolean;
  alerts: ComplianceAlert[];
  primeRepas: boolean;
  ikAlert: boolean;
}

export interface OvertimeDetail {
  date: string;
  hours: number;
  rate: number; // percentage (25, 40, 50, 100)
  label: string;
}

export interface WeekSummary {
  weekStart: string;
  weekEnd: string;
  totalHours: number;
  plafondAutorise: number;
  heuresRestantes: number;
  reposQuotidienOk: boolean;
  reposHebdoOk: boolean;
  overallStatus: AlertLevel;
  days: DaySummary[];
  alerts: ComplianceAlert[];
  daysWorkedCount: number;
  overtimeDetails: OvertimeDetail[];
}

export interface PointageSettings {
  seuilOrangeHeures: number;
  seuilRougeHeures: number;
  potREAnnuel: number;
  soldeRE: number;
  dateActivationRE: string;
  seuilAlerteRE: number;
  primeRepasValeur: number;
  alertesActives: boolean;
}

export const defaultPointageSettings: PointageSettings = {
  seuilOrangeHeures: 16,
  seuilRougeHeures: 8,
  potREAnnuel: 312,
  soldeRE: 312,
  dateActivationRE: '2026-02-05',
  seuilAlerteRE: 14,
  primeRepasValeur: 9.26,
  alertesActives: true,
};
