/**
 * Time-tracking store — placeholder for the future timeTracking module.
 * Currently a no-op; will be implemented when the module is enabled.
 */

export interface TimeEntry {
  id: string;
  userId: string;
  date: string; // ISO date
  hoursWorked: number;
  category: string;
  note?: string;
}

export interface TimeStoreState {
  entries: TimeEntry[];
}

const INITIAL_STATE: TimeStoreState = {
  entries: [],
};

/**
 * Placeholder hook — returns an empty state.
 * Will be fully implemented when timeTracking module is activated.
 */
export function useTimeStore() {
  return {
    ...INITIAL_STATE,
    // Future: addEntry, updateEntry, deleteEntry, getWeekTotal, etc.
  };
}
