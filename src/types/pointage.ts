/**
 * Types for Module 2 – Conformité & Pointage (EDF CNPE Bugey)
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
  suppressionMidi: boolean; // default true if covers 12:00-12:45
  note?: string;
  noteTags?: NoteTag[];
  autoComments?: string[]; // auto-generated comments (IK, prime repas, etc.)
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
  habillageHours: number;
  totalHours: number; // worked + habillage
  hasNote: boolean;
  alerts: ComplianceAlert[];
  primeRepas: boolean; // prime repas sans déplacement
  ikAlert: boolean; // IK à vérifier
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
}

export interface PointageSettings {
  /** Seuil orange: alerte si heures restantes <= ce seuil */
  seuilOrangeHeures: number;
  /** Seuil rouge: alerte si heures restantes <= ce seuil */
  seuilRougeHeures: number;
  /** Pot RE annuel (heures) */
  potREAnnuel: number;
  /** Solde RE courant (heures) */
  soldeRE: number;
  /** Date activation pot RE (ISO string) */
  dateActivationRE: string;
  /** Seuil alerte RE (heures restantes) */
  seuilAlerteRE: number;
  /** Prime repas valeur € */
  primeRepasValeur: number;
  /** Alertes activées */
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
