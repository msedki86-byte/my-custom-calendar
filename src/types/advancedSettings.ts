/**
 * Advanced work-regulation settings for W Planner.
 * These parameters govern RE/CP counters and legal working-time limits.
 */

export interface AdvancedSettings {
  /** Compteur RE en heures (solde disponible) */
  compteurREHeures: number;
  /** Compteur CP en jours (solde disponible) */
  compteurCPJours: number;
  /** Nombre de semaines hautes obligatoires par cycle */
  nombreSemainesHautesObligatoires: number;
  /** Limite hebdomadaire sur 5 jours (heures) */
  limiteHebdo5j: number;
  /** Limite hebdomadaire sur 6 jours (heures) */
  limiteHebdo6j: number;
  /** Limite journalière (heures) */
  limiteJour: number;
  /** Repos minimum entre deux postes (heures) */
  reposMinimumHeures: number;
}

export const defaultAdvancedSettings: AdvancedSettings = {
  compteurREHeures: 0,
  compteurCPJours: 25,
  nombreSemainesHautesObligatoires: 13,
  limiteHebdo5j: 40,
  limiteHebdo6j: 48,
  limiteJour: 10,
  reposMinimumHeures: 11,
};
