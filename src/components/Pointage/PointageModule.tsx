/**
 * Module 2 – Conformité & Pointage CNPE Bugey
 * Vue calendrier hebdomadaire dimanche–samedi avec saisie, conformité, HS et notes.
 */

import { useState, useCallback } from 'react';
import { usePointage } from '@/hooks/usePointage';
import { WeeklySummaryTable } from './WeeklySummary';
import { DayEntryForm } from './DayEntryForm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, Check, Clock, Utensils, Car, RotateCcw } from 'lucide-react';
import { format, parseISO, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getWeekDates } from '@/lib/complianceEngine';

export function PointageModule() {
  const {
    entries,
    currentWeekStart,
    weekSummary,
    pointageSettings,
    addEntry,
    updateEntry,
    deleteEntry,
    deleteWeekEntries,
    getEntriesForDate,
    goToNextWeek,
    goToPrevWeek,
    goToCurrentWeek,
  } = usePointage();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showRAZConfirm, setShowRAZConfirm] = useState(false);
  const weekDates = getWeekDates(currentWeekStart);

  const handleDayClick = useCallback((date: string) => {
    setSelectedDate(date);
  }, []);

  const handleRAZ = () => {
    deleteWeekEntries(weekDates);
    setShowRAZConfirm(false);
  };

  const weekLabel = `${format(currentWeekStart, 'd MMM', { locale: fr })} – ${format(addDays(currentWeekStart, 6), 'd MMM yyyy', { locale: fr })}`;
  const weekHasEntries = weekDates.some(d => getEntriesForDate(d).length > 0);

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
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-medium text-muted-foreground">{weekLabel}</span>
          {weekHasEntries && (
            <Button variant="ghost" size="icon" onClick={() => setShowRAZConfirm(true)} className="h-7 w-7 text-destructive" title="RAZ semaine">
              <RotateCcw className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </div>

      {/* Weekly Summary */}
      <WeeklySummaryTable summary={weekSummary} pointageSettings={pointageSettings} />

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
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] sm:text-xs font-medium text-muted-foreground capitalize">
                  {format(parseISO(dateStr), 'EEE', { locale: fr })}
                </span>
                <span className={`text-xs sm:text-sm font-bold ${isToday ? 'text-primary' : 'text-foreground'}`}>
                  {format(parseISO(dateStr), 'd')}
                </span>
              </div>

              {daySummary.totalHours > 0 ? (
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs font-mono font-semibold">{daySummary.totalHours.toFixed(2)}h</span>
                </div>
              ) : (
                <p className="text-[10px] text-muted-foreground mt-1">—</p>
              )}

              {dayEntries.length > 0 && (
                <div className="mt-1 space-y-0.5">
                  {dayEntries.slice(0, 2).map(e => (
                    <p key={e.id} className="text-[9px] sm:text-[10px] text-muted-foreground font-mono truncate">
                      {e.startTime}–{e.endTime}
                      {e.isFPC && ` FPC${e.fpcHeures}h`}
                      {e.isFormation && !e.isFPC && ' 📚'}
                      {e.typeAstreinte === 'PLANIFIEE_SANS' && ' 🔵'}
                      {e.typeAstreinte === 'INTERVENTION_PLANIFIEE' && ' 🟠'}
                      {e.typeAstreinte === 'INTERVENTION_APPEL' && ' 🟣'}
                      {e.typeAstreinte === 'HORS_TOUR' && ' ⚫'}
                      {!e.typeAstreinte && e.isInterventionAstreinte && ' ⚡'}
                    </p>
                  ))}
                  {dayEntries.length > 2 && (
                    <p className="text-[9px] text-muted-foreground">+{dayEntries.length - 2}</p>
                  )}
                </div>
              )}

              {/* Indicators */}
              <div className="absolute top-1 right-1 flex gap-0.5">
                {hasNote && (
                  <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-primary-foreground" />
                  </div>
                )}
                {daySummary.primeRepas && (
                  <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center" title="Prime repas">
                    <Utensils className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
                {daySummary.ikAlert && (
                  <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center" title="IK à vérifier">
                    <Car className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
              </div>

              {hasAlerts && (
                <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-red-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Real-time counters */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground p-2 rounded-lg bg-muted/50 border border-border flex-wrap">
        <span>Effectif : <strong className="text-foreground">{weekSummary.days.reduce((s, d) => s + d.hoursWorked, 0).toFixed(2)}h</strong></span>
        <span>Habillage : <strong className="text-foreground">{weekSummary.days.reduce((s, d) => s + d.habillageHours, 0).toFixed(2)}h</strong></span>
        <span>Trajet : <strong className="text-foreground">{weekSummary.days.reduce((s, d) => s + d.trajetHeures, 0).toFixed(2)}h</strong></span>
        <span>Total pointé : <strong className="text-foreground">{weekSummary.totalHours.toFixed(2)}h</strong></span>
        <span>Restant : <strong className={weekSummary.heuresRestantes <= 8 ? 'text-destructive' : weekSummary.heuresRestantes <= 16 ? 'text-amber-600' : 'text-emerald-600'}>{weekSummary.heuresRestantes.toFixed(2)}h</strong></span>
      </div>

      {/* Overtime details */}
      {weekSummary.overtimeDetails.length > 0 && (
        <div className="space-y-1 p-2 rounded-lg border border-border bg-card">
          <p className="text-xs font-medium text-muted-foreground">Heures supplémentaires</p>
          {weekSummary.overtimeDetails.map((ot, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{format(parseISO(ot.date), 'EEE d', { locale: fr })}</span>
              <span className="font-mono">{ot.hours.toFixed(2)}h</span>
              <span className="font-medium text-amber-700">{ot.label}</span>
            </div>
          ))}
        </div>
      )}

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
          posteMatinDebut={pointageSettings.posteMatinDebut}
          posteMatinFin={pointageSettings.posteMatinFin}
          posteAMDebut={pointageSettings.posteAMDebut}
          posteAMFin={pointageSettings.posteAMFin}
        />
      )}

      {/* RAZ Confirmation */}
      <Dialog open={showRAZConfirm} onOpenChange={setShowRAZConfirm}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-sm">Réinitialiser la semaine ?</DialogTitle>
          </DialogHeader>
          <p className="text-xs text-muted-foreground">
            Toutes les saisies de la semaine ({weekLabel}) seront supprimées définitivement.
          </p>
          <DialogFooter className="gap-2">
            <Button variant="ghost" size="sm" onClick={() => setShowRAZConfirm(false)}>Annuler</Button>
            <Button variant="destructive" size="sm" onClick={handleRAZ}>Supprimer tout</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
