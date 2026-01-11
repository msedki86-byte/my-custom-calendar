import { CalendarSettings } from '@/types/calendar';
import { ColorPicker } from './ColorPicker';
import { PatternPicker } from './PatternPicker';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Settings, X } from 'lucide-react';

interface SettingsPanelProps {
  settings: CalendarSettings;
  onUpdateSettings: (settings: Partial<CalendarSettings>) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ settings, onUpdateSettings, isOpen, onClose }: SettingsPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-card border-l border-border shadow-card-elevated z-50 animate-slide-in">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">Paramètres</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <ScrollArea className="h-[calc(100vh-65px)]">
        <div className="p-4 space-y-6">
          {/* Calendar Base Colors */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3">Base du calendrier</h3>
            <div className="space-y-3">
              <ColorPicker
                label="Titre semaine"
                value={settings.titleWeekColor}
                onChange={(v) => onUpdateSettings({ titleWeekColor: v })}
              />
              <ColorPicker
                label="Titre week-end"
                value={settings.titleWeekendColor}
                onChange={(v) => onUpdateSettings({ titleWeekendColor: v })}
              />
              <ColorPicker
                label="N° semaines"
                value={settings.weekNumbersColor}
                onChange={(v) => onUpdateSettings({ weekNumbersColor: v })}
              />
              <ColorPicker
                label="Jours semaine"
                value={settings.weekdaysColor}
                onChange={(v) => onUpdateSettings({ weekdaysColor: v })}
              />
              <ColorPicker
                label="Jours week-end"
                value={settings.weekendDaysColor}
                onChange={(v) => onUpdateSettings({ weekendDaysColor: v })}
              />
              <ColorPicker
                label="Cellules vides"
                value={settings.emptyCellsColor}
                onChange={(v) => onUpdateSettings({ emptyCellsColor: v })}
              />
            </div>
          </section>

          {/* Astreintes */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3">Astreintes</h3>
            <div className="space-y-3">
              <ColorPicker
                label="Astreinte"
                value={settings.astreinteColor}
                onChange={(v) => onUpdateSettings({ astreinteColor: v })}
              />
              <ColorPicker
                label="Astreinte ponctuelle"
                value={settings.astreintePonctuelleColor}
                onChange={(v) => onUpdateSettings({ astreintePonctuelleColor: v })}
              />
              <ColorPicker
                label="Annulation"
                value={settings.astreinteCancelledColor}
                onChange={(v) => onUpdateSettings({ astreinteCancelledColor: v })}
              />
              <PatternPicker
                label="Motif annulation"
                value={settings.astreinteCancelledPattern}
                onChange={(v) => onUpdateSettings({ astreinteCancelledPattern: v })}
              />
            </div>
          </section>

          {/* Events */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3">Événements</h3>
            <div className="space-y-3">
              <ColorPicker
                label="Événement par défaut"
                value={settings.eventColor}
                onChange={(v) => onUpdateSettings({ eventColor: v })}
              />
              <ColorPicker
                label="Vacances scolaires"
                value={settings.vacationColor}
                onChange={(v) => onUpdateSettings({ vacationColor: v })}
              />
              <PatternPicker
                label="Motif jours fériés"
                value={settings.holidayPattern}
                onChange={(v) => onUpdateSettings({ holidayPattern: v })}
              />
            </div>
          </section>

          {/* Arrets */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3">Arrêts de tranches</h3>
            <div className="space-y-3">
              <ColorPicker
                label="Arrêt"
                value={settings.arretColor}
                onChange={(v) => onUpdateSettings({ arretColor: v })}
              />
              <ColorPicker
                label="Préparation"
                value={settings.arretPrepaColor}
                onChange={(v) => onUpdateSettings({ arretPrepaColor: v })}
              />
              <PatternPicker
                label="Motif préparation"
                value={settings.arretPrepaPattern}
                onChange={(v) => onUpdateSettings({ arretPrepaPattern: v })}
              />
            </div>
          </section>
        </div>
      </ScrollArea>
    </div>
  );
}
