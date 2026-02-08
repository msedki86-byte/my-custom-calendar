import { useState } from 'react';
import { CalendarSettings } from '@/types/calendar';
import { ColorPicker } from './ColorPicker';
import { PatternPicker } from './PatternPicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Settings, X, Lock, Unlock } from 'lucide-react';
import { ASTREINTE_START_DATE } from '@/data/initialData';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface SettingsPanelProps {
  settings: CalendarSettings;
  onUpdateSettings: (settings: Partial<CalendarSettings>) => void;
  isOpen: boolean;
  onClose: () => void;
}

const SETTINGS_PIN = '1234';

export function SettingsPanel({ settings, onUpdateSettings, isOpen, onClose }: SettingsPanelProps) {
  const [pinInput, setPinInput] = useState('');
  const [pinUnlocked, setPinUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);

  if (!isOpen) return null;

  const handlePinSubmit = () => {
    if (pinInput === SETTINGS_PIN) {
      setPinUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

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
          {/* En-tête mois */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3">En-tête mois</h3>
            <div className="space-y-3">
              <ColorPicker label="Fond mois" value={settings.titleWeekColor} onChange={(v) => onUpdateSettings({ titleWeekColor: v })} />
              <ColorPicker label="Texte mois" value={settings.weekNumbersColor} onChange={(v) => onUpdateSettings({ weekNumbersColor: v })} />
            </div>
          </section>

          {/* Jours de la semaine (lun-dim header) */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3">Jours de la semaine</h3>
            <div className="space-y-3">
              <ColorPicker label="Titre semaine (Lun-Ven)" value={settings.weekdaysColor} onChange={(v) => onUpdateSettings({ weekdaysColor: v })} />
              <ColorPicker label="Titre week-end (Sam-Dim)" value={settings.titleWeekendColor} onChange={(v) => onUpdateSettings({ titleWeekendColor: v })} />
            </div>
          </section>

          {/* Cases jours */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3">Cases jours</h3>
            <div className="space-y-3">
              <ColorPicker label="Fond semaine" value={settings.emptyCellsColor} onChange={(v) => onUpdateSettings({ emptyCellsColor: v })} />
              <ColorPicker label="Fond week-end" value={settings.weekendDaysColor} onChange={(v) => onUpdateSettings({ weekendDaysColor: v })} />
              <ColorPicker label="N° semaines" value={settings.weekNumbersColor} onChange={(v) => onUpdateSettings({ weekNumbersColor: v })} />
            </div>
          </section>

          {/* Astreintes */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3">Astreintes</h3>
            <div className="space-y-3">
              <ColorPicker label="Astreinte" value={settings.astreinteColor} onChange={(v) => onUpdateSettings({ astreinteColor: v })} />
              <ColorPicker label="Astreinte ponctuelle" value={settings.astreintePonctuelleColor} onChange={(v) => onUpdateSettings({ astreintePonctuelleColor: v })} />
              <ColorPicker label="Annulation" value={settings.astreinteCancelledColor} onChange={(v) => onUpdateSettings({ astreinteCancelledColor: v })} />
              <PatternPicker label="Motif annulation" value={settings.astreinteCancelledPattern} onChange={(v) => onUpdateSettings({ astreinteCancelledPattern: v })} />
            </div>
          </section>

          {/* Date récurrence astreinte */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3">Récurrence astreinte</h3>
            <div className="bg-muted/50 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Date initiale</Label>
                <span className="text-sm font-mono text-muted-foreground">
                  {format(ASTREINTE_START_DATE, 'dd/MM/yyyy', { locale: fr })}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Cycle de 6 semaines à partir de cette date.</p>
              
              {!pinUnlocked ? (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Protégé par code PIN</span>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      maxLength={4}
                      placeholder="Code PIN (4 chiffres)"
                      value={pinInput}
                      onChange={(e) => { setPinInput(e.target.value.replace(/\D/g, '').slice(0, 4)); setPinError(false); }}
                      className="h-8 text-sm flex-1"
                    />
                    <Button size="sm" className="h-8" onClick={handlePinSubmit}>
                      <Unlock className="w-3 h-3" />
                    </Button>
                  </div>
                  {pinError && <p className="text-xs text-destructive">Code incorrect</p>}
                </div>
              ) : (
                <div className="mt-2 p-2 bg-primary/5 rounded border border-primary/20">
                  <p className="text-xs text-primary mb-1">🔓 Déverrouillé — Modification possible dans les données initiales.</p>
                </div>
              )}
            </div>
          </section>

          {/* Événements et états */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3">Événements & états</h3>
            <div className="space-y-3">
              <ColorPicker label="Événement par défaut" value={settings.eventColor} onChange={(v) => onUpdateSettings({ eventColor: v })} />
              <ColorPicker label="RE (Repos)" value={settings.reColor} onChange={(v) => onUpdateSettings({ reColor: v })} />
              <ColorPicker label="CP (Congés Payés)" value={settings.cpColor} onChange={(v) => onUpdateSettings({ cpColor: v })} />
              <ColorPicker label="Vacances scolaires" value={settings.vacationColor} onChange={(v) => onUpdateSettings({ vacationColor: v })} />
              <PatternPicker label="Motif jours fériés" value={settings.holidayPattern} onChange={(v) => onUpdateSettings({ holidayPattern: v })} />
            </div>
          </section>

          {/* Arrêts par tranche */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3">Arrêts par tranche</h3>
            <div className="space-y-3">
              <ColorPicker label="Arrêt Tr2" value={settings.arretTr2Color} onChange={(v) => onUpdateSettings({ arretTr2Color: v })} />
              <ColorPicker label="Arrêt Tr3" value={settings.arretTr3Color} onChange={(v) => onUpdateSettings({ arretTr3Color: v })} />
              <ColorPicker label="Arrêt Tr4" value={settings.arretTr4Color} onChange={(v) => onUpdateSettings({ arretTr4Color: v })} />
              <ColorPicker label="Arrêt Tr5" value={settings.arretTr5Color} onChange={(v) => onUpdateSettings({ arretTr5Color: v })} />
            </div>
          </section>

          {/* Info */}
          <section className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">
              <strong>RE</strong> et <strong>CP</strong> grisent la case jour entière. 
              Les astreintes actives restent prioritaires sur le grisage.
              Les patterns de préparation (M0-M4) sont définis en dur.
            </p>
          </section>
        </div>
      </ScrollArea>
    </div>
  );
}