/**
 * Types for Module 2 – Conformité & Pointage (EDF / IEG)
 */

export interface TimeEntry {
  id: string;
  date: string; // ISO date YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  habillage: number; // minutes (0-60)
  isFormation: boolean;
  isInterventionAstreinte: boolean;
  isAstreinteSansIntervention: boolean;
  note?: string;
  noteTags?: NoteTag[];
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
  hoursWorked: number; // effective work hours
  habillageHours: number;
  totalHours: number; // worked + habillage
  hasNote: boolean;
  alerts: ComplianceAlert[];
}

export interface WeekSummary {
  weekStart: string; // ISO date (Sunday)
  weekEnd: string; // ISO date (Saturday)
  totalHours: number;
  plafondAutorise: number;
  reposQuotidienOk: boolean;
  reposHebdoOk: boolean;
  overallStatus: AlertLevel;
  days: DaySummary[];
  alerts: ComplianceAlert[];
  daysWorkedCount: number;
}
