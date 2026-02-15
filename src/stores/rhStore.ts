/**
 * Store RH central unique — W Planner
 * Gère tous les soldes RH avec historique daté.
 * Source unique de vérité pour 21, RE, RC011, RC012.
 */

import { useState, useCallback, useEffect, useMemo } from 'react';

const RH_KEY = 'wplanner-rh-state';

export type RHBalanceType = '21' | 'RE' | 'RC011' | 'RC012';

export interface RHAdjustment {
  id: string;
  type: RHBalanceType;
  delta: number; // positive = credit, negative = debit
  dateEffet: string; // ISO date YYYY-MM-DD
  motif: string;
  timestamp: string; // ISO datetime
}

export interface RHState {
  solde21: number;
  soldeRE: number;
  soldeRC011: number;
  soldeRC012: number;
  dateSolde21: string; // ISO date of last update
  dateSoldeRE: string;
  dateSoldeRC011: string;
  dateSoldeRC012: string;
  historiqueAjustements: RHAdjustment[];
}

const DEFAULT_RH_STATE: RHState = {
  solde21: 173,
  soldeRE: 312,
  soldeRC011: 0,
  soldeRC012: 0,
  dateSolde21: '2026-02-05',
  dateSoldeRE: '2026-02-05',
  dateSoldeRC011: '2026-02-05',
  dateSoldeRC012: '2026-02-05',
  historiqueAjustements: [],
};

function loadRHState(): RHState {
  try {
    const raw = localStorage.getItem(RH_KEY);
    if (raw) return { ...DEFAULT_RH_STATE, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return { ...DEFAULT_RH_STATE };
}

function saveRHState(state: RHState) {
  localStorage.setItem(RH_KEY, JSON.stringify(state));
}

let idCounter = Date.now();
function newId(): string {
  return (idCounter++).toString(36);
}

export function useRHStore() {
  const [state, setState] = useState<RHState>(loadRHState);

  useEffect(() => { saveRHState(state); }, [state]);

  /**
   * Update a balance with mandatory date.
   * delta < 0 = debit (pose), delta > 0 = credit (ajout/correction)
   */
  const updateRHBalance = useCallback((
    type: RHBalanceType,
    delta: number,
    dateEffet: string,
    motif: string
  ) => {
    if (!dateEffet) {
      console.error('updateRHBalance: dateEffet is required');
      return;
    }
    setState(prev => {
      const adjustment: RHAdjustment = {
        id: newId(),
        type,
        delta,
        dateEffet,
        motif,
        timestamp: new Date().toISOString(),
      };

      const next = { ...prev, historiqueAjustements: [...prev.historiqueAjustements, adjustment] };

      switch (type) {
        case '21':
          next.solde21 = Math.max(0, prev.solde21 + delta);
          next.dateSolde21 = dateEffet;
          break;
        case 'RE':
          next.soldeRE = Math.max(0, prev.soldeRE + delta);
          next.dateSoldeRE = dateEffet;
          break;
        case 'RC011':
          next.soldeRC011 = Math.max(0, prev.soldeRC011 + delta);
          next.dateSoldeRC011 = dateEffet;
          break;
        case 'RC012':
          next.soldeRC012 = Math.max(0, prev.soldeRC012 + delta);
          next.dateSoldeRC012 = dateEffet;
          break;
      }
      return next;
    });
  }, []);

  /** Set balance directly (for manual corrections in settings) */
  const setRHBalance = useCallback((
    type: RHBalanceType,
    valeur: number,
    dateEffet: string
  ) => {
    if (!dateEffet) {
      console.error('setRHBalance: dateEffet is required');
      return;
    }
    setState(prev => {
      const currentValue = type === '21' ? prev.solde21 : type === 'RE' ? prev.soldeRE : type === 'RC011' ? prev.soldeRC011 : prev.soldeRC012;
      const delta = valeur - currentValue;
      const adjustment: RHAdjustment = {
        id: newId(),
        type,
        delta,
        dateEffet,
        motif: 'Correction manuelle',
        timestamp: new Date().toISOString(),
      };
      const next = { ...prev, historiqueAjustements: [...prev.historiqueAjustements, adjustment] };
      switch (type) {
        case '21': next.solde21 = valeur; next.dateSolde21 = dateEffet; break;
        case 'RE': next.soldeRE = valeur; next.dateSoldeRE = dateEffet; break;
        case 'RC011': next.soldeRC011 = valeur; next.dateSoldeRC011 = dateEffet; break;
        case 'RC012': next.soldeRC012 = valeur; next.dateSoldeRC012 = dateEffet; break;
      }
      return next;
    });
  }, []);

  return {
    rhState: state,
    updateRHBalance,
    setRHBalance,
  };
}
