/**
 * Module system types for W Planner.
 * Each module represents a self-contained functional unit of the application.
 */

export type ModuleId = 'planning' | 'timeTracking';

export interface ModuleDefinition {
  id: ModuleId;
  label: string;
  description: string;
  enabled: boolean;
  /** Future: version for migrations */
  version: number;
}

/** Registry of all available modules */
export const MODULE_REGISTRY: Record<ModuleId, ModuleDefinition> = {
  planning: {
    id: 'planning',
    label: 'Planning',
    description: 'Calendrier, astreintes, arrêts de tranche, événements',
    enabled: true,
    version: 1,
  },
  timeTracking: {
    id: 'timeTracking',
    label: 'Suivi du temps',
    description: 'Compteurs horaires, suivi RE/CP, limites réglementaires',
    enabled: false, // Future module
    version: 0,
  },
};

/** Returns all enabled modules */
export function getEnabledModules(): ModuleDefinition[] {
  return Object.values(MODULE_REGISTRY).filter((m) => m.enabled);
}

/** Check if a specific module is enabled */
export function isModuleEnabled(id: ModuleId): boolean {
  return MODULE_REGISTRY[id]?.enabled ?? false;
}
