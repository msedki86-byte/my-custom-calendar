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
    <div className="fixed inset-y-0 right-0 w-full sm:w-80 max-w-[90vw] bg-card border-l border-border shadow-card-elevated z-50 animate-slide-in">
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

          {/* Arrets par tranche */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3">Arrêts par tranche</h3>
            <div className="space-y-3">
              <ColorPicker
                label="Arrêt Tr2"
                value={settings.arretTr2Color}
                onChange={(v) => onUpdateSettings({ arretTr2Color: v })}
              />
              <ColorPicker
                label="Arrêt Tr3"
                value={settings.arretTr3Color}
                onChange={(v) => onUpdateSettings({ arretTr3Color: v })}
              />
              <ColorPicker
                label="Arrêt Tr4"
                value={settings.arretTr4Color}
                onChange={(v) => onUpdateSettings({ arretTr4Color: v })}
              />
              <ColorPicker
                label="Arrêt Tr5"
                value={settings.arretTr5Color}
                onChange={(v) => onUpdateSettings({ arretTr5Color: v })}
              />
            </div>
          </section>

          {/* Préparations par tranche */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3">Préparations par tranche</h3>
            <div className="space-y-3">
              <ColorPicker
                label="Prépa Tr2"
                value={settings.prepaTr2Color}
                onChange={(v) => onUpdateSettings({ prepaTr2Color: v })}
              />
              <ColorPicker
                label="Prépa Tr3"
                value={settings.prepaTr3Color}
                onChange={(v) => onUpdateSettings({ prepaTr3Color: v })}
              />
              <ColorPicker
                label="Prépa Tr4"
                value={settings.prepaTr4Color}
                onChange={(v) => onUpdateSettings({ prepaTr4Color: v })}
              />
              <ColorPicker
                label="Prépa Tr5"
                value={settings.prepaTr5Color}
                onChange={(v) => onUpdateSettings({ prepaTr5Color: v })}
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
