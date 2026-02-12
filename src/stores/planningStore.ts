/**
 * Planning store — thin wrapper that re-exports useCalendar.
 * This exists to formalise the module boundary and will be the
 * future migration point when planning data moves to IndexedDB.
 */

export { useCalendar as usePlanningStore } from '@/hooks/useCalendar';
