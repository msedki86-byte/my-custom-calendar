/**
 * Types for Module 2 – Conformité & Pointage (EDF CNPE Bugey)
 */

export type AstreinteType = 'PLANIFIEE_SANS' | 'INTERVENTION_PLANIFIEE' | 'INTERVENTION_APPEL' | 'HORS_TOUR' | null;

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
  // Astreinte differentiation
  estAstreinte?: boolean;
  typeAstreinte?: AstreinteType;
  isJourFerie?: boolean; // pour RCO automatique JF
  astreinteCompensee?: boolean; // RCA compensée → génère RCO
  // FPC (Formation Professionnelle Continue)
  isFPC?: boolean;
  fpcHeures?: 7 | 8; // 7h or 8h daily
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
  trajetHeures: number; // travel valorisation hours
  totalHours: number; // worked + habillage + trajet
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
  soldeRE: number; // RE fixe annuel 312h (39j x 8h) — kept for backward compat, rhStore is source of truth
  dateActivationRE: string;
  seuilAlerteRE: number;
  primeRepasValeur: number;
  alertesActives: boolean;
  communeDepart: string;
  soldeCongesAnnuels: number; // 21 (Congés annuels) — kept for backward compat
  regime: 'HABA' | 'NORMAL';
  // RC counters (grouped) — kept for backward compat
  soldeRC011: number; // RC-HS (compte 011)
  soldeRC012: number; // RC-Autres + RCO (compte 012)
  // Stage long primes
  montantPrimeHebdo: number;
  montantPrimeMensuelle: number;
}

export const defaultPointageSettings: PointageSettings = {
  seuilOrangeHeures: 16,
  seuilRougeHeures: 8,
  soldeRE: 312, // 39 jours x 8h
  dateActivationRE: '2026-02-05',
  seuilAlerteRE: 14,
  primeRepasValeur: 9.26,
  alertesActives: true,
  communeDepart: 'DECINES CHARPIEU',
  soldeCongesAnnuels: 173, // 189h - 16h (situation au 5 février)
  regime: 'HABA',
  soldeRC011: 0,
  soldeRC012: 0,
  montantPrimeHebdo: 0,
  montantPrimeMensuelle: 0,
};
