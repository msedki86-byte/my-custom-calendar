/**
 * Module 2 – Conformité & Pointage : Main weekly view
 * Vue calendrier hebdomadaire dimanche–samedi avec saisie, conformité et notes.
 */

import { useState, useCallback } from 'react';
import { usePointage } from '@/hooks/usePointage';
import { WeeklySummaryTable } from './WeeklySummary';
import { DayEntryForm } from './DayEntryForm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, MessageSquare, Check, Clock } from 'lucide-react';
import { format, parseISO, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getWeekDates } from '@/lib/complianceEngine';

export function PointageModule() {
  const {
    entries,
    currentWeekStart,
    weekSummary,
    addEntry,
    updateEntry,
    deleteEntry,
    getEntriesForDate,
    goToNextWeek,
    goToPrevWeek,
    goToCurrentWeek,
  } = usePointage();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const weekDates = getWeekDates(currentWeekStart);

  const handleDayClick = useCallback((date: string) => {
    setSelectedDate(date);
  }, []);

  const weekLabel = `${format(currentWeekStart, 'd MMM', { locale: fr })} – ${format(addDays(currentWeekStart, 6), 'd MMM yyyy', { locale: fr })}`;

  return (
    <div className="space-y-4">
      {/* Week Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
          <Button variant="ghost" size="icon" onClick={goToPrevWeek} className="h-8 w-8 rounded-md">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={goToCurrentWeek} className="h-8 px-2 rounded-md text-xs font-medium">
            Cette semaine
          </Button>
          <Button variant="ghost" size="icon" onClick={goToNextWeek} className="h-8 w-8 rounded-md">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <span className="text-xs sm:text-sm font-medium text-muted-foreground">{weekLabel}</span>
      </div>

      {/* Weekly Summary */}
      <WeeklySummaryTable summary={weekSummary} />

      {/* Day cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-7 gap-2">
        {weekDates.map((dateStr, index) => {
          const daySummary = weekSummary.days[index];
          const dayEntries = getEntriesForDate(dateStr);
          const isToday = dateStr === format(new Date(), 'yyyy-MM-dd');
          const hasAlerts = daySummary.alerts.length > 0;
          const hasNote = dayEntries.some(e => !!e.note);

          return (
            <button
              key={dateStr}
              onClick={() => handleDayClick(dateStr)}
              className={`relative p-2 sm:p-3 rounded-lg border text-left transition-all hover:shadow-md ${
                isToday
                  ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                  : hasAlerts
                    ? 'border-red-300 bg-red-50/50'
                    : 'border-border bg-card hover:bg-accent/30'
              }`}
            >
              {/* Day header */}
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] sm:text-xs font-medium text-muted-foreground capitalize">
                  {format(parseISO(dateStr), 'EEE', { locale: fr })}
                </span>
                <span className={`text-xs sm:text-sm font-bold ${isToday ? 'text-primary' : 'text-foreground'}`}>
                  {format(parseISO(dateStr), 'd')}
                </span>
              </div>

              {/* Hours */}
              {daySummary.totalHours > 0 ? (
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs font-mono font-semibold">{daySummary.totalHours.toFixed(1)}h</span>
                </div>
              ) : (
                <p className="text-[10px] text-muted-foreground mt-1">—</p>
              )}

              {/* Entries preview */}
              {dayEntries.length > 0 && (
                <div className="mt-1 space-y-0.5">
                  {dayEntries.slice(0, 2).map(e => (
                    <p key={e.id} className="text-[9px] sm:text-[10px] text-muted-foreground font-mono truncate">
                      {e.startTime}–{e.endTime}
                      {e.isFormation && ' 📚'}
                      {e.isInterventionAstreinte && ' ⚡'}
                    </p>
                  ))}
                  {dayEntries.length > 2 && (
                    <p className="text-[9px] text-muted-foreground">+{dayEntries.length - 2} autre(s)</p>
                  )}
                </div>
              )}

              {/* Note indicator */}
              {hasNote && (
                <div className="absolute top-1 right-1">
                  <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-primary-foreground" />
                  </div>
                </div>
              )}

              {/* Alert dot */}
              {hasAlerts && (
                <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-red-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Real-time counters */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground p-2 rounded-lg bg-muted/50 border border-border">
        <span>Travail effectif : <strong className="text-foreground">{weekSummary.days.reduce((s, d) => s + d.hoursWorked, 0).toFixed(1)}h</strong></span>
        <span>Habillage : <strong className="text-foreground">{weekSummary.days.reduce((s, d) => s + d.habillageHours, 0).toFixed(1)}h</strong></span>
        <span>Total cumulé : <strong className="text-foreground">{weekSummary.totalHours.toFixed(1)}h</strong></span>
      </div>

      {/* Day Entry Dialog */}
      {selectedDate && (
        <DayEntryForm
          date={selectedDate}
          entries={getEntriesForDate(selectedDate)}
          onAdd={addEntry}
          onUpdate={updateEntry}
          onDelete={deleteEntry}
          isOpen={!!selectedDate}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
}
