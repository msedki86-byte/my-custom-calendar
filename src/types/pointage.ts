/**
 * Types for Module 2 – Conformité & Pointage (EDF CNPE Bugey)
 */

export type AstreinteType = 'PLANIFIEE_SANS' | 'INTERVENTION_PLANIFIEE' | 'INTERVENTION_APPEL' | 'HORS_TOUR' | null;

export type PosteType = 'AUCUN' | 'MATIN' | 'APRES_MIDI';

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
  // Habillage manuel optionnel (en minutes)
  habillageManuel?: boolean;
  habillageMinutes?: number;
  // Poste (matin / après-midi)
  poste?: PosteType;
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
  soldeRE: number;
  dateActivationRE: string;
  seuilAlerteRE: number;
  primeRepasValeur: number;
  alertesActives: boolean;
  communeDepart: string;
  soldeCongesAnnuels: number;
  regime: 'HABA' | 'NORMAL';
  soldeRC011: number;
  soldeRC012: number;
  montantPrimeHebdo: number;
  montantPrimeMensuelle: number;
  // Postes paramétrables
  posteMatinDebut: string;
  posteMatinFin: string;
  posteAMDebut: string;
  posteAMFin: string;
}

export const defaultPointageSettings: PointageSettings = {
  seuilOrangeHeures: 16,
  seuilRougeHeures: 8,
  soldeRE: 312,
  dateActivationRE: '2026-02-05',
  seuilAlerteRE: 14,
  primeRepasValeur: 9.26,
  alertesActives: true,
  communeDepart: 'DECINES CHARPIEU',
  soldeCongesAnnuels: 173,
  regime: 'HABA',
  soldeRC011: 0,
  soldeRC012: 0,
  montantPrimeHebdo: 0,
  montantPrimeMensuelle: 0,
  posteMatinDebut: '05:00',
  posteMatinFin: '13:00',
  posteAMDebut: '13:00',
  posteAMFin: '21:00',
};
