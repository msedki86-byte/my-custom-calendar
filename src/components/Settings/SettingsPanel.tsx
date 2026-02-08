import { useState } from 'react';
import { CalendarSettings } from '@/types/calendar';
import { ColorPicker } from './ColorPicker';
import { PatternPicker } from './PatternPicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Settings, X, Lock, Unlock, KeyRound } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface SettingsPanelProps {
  settings: CalendarSettings;
  onUpdateSettings: (settings: Partial<CalendarSettings>) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ settings, onUpdateSettings, isOpen, onClose }: SettingsPanelProps) {
  const [pinInput, setPinInput] = useState('');
  const [pinUnlocked, setPinUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [showPinChange, setShowPinChange] = useState(false);
  const [newStartDate, setNewStartDate] = useState('');

  if (!isOpen) return null;

  const handlePinSubmit = () => {
    if (pinInput === (settings.settingsPin || '0000')) {
      setPinUnlocked(true);
      setPinError(false);
      // Pre-fill date input
      const d = new Date(settings.astreinteStartDate);
      setNewStartDate(format(d, 'yyyy-MM-dd'));
    } else {
      setPinError(true);
    }
  };

  const handleDateChange = () => {
    if (!newStartDate) return;
    const d = new Date(newStartDate);
    if (!isNaN(d.getTime())) {
      onUpdateSettings({ astreinteStartDate: d.toISOString() });
    }
  };

  const handlePinChange = () => {
    if (newPin.length === 4) {
      onUpdateSettings({ settingsPin: newPin });
      setShowPinChange(false);
      setNewPin('');
    }
  };

  const astreinteDate = new Date(settings.astreinteStartDate || '2026-02-05T00:00:00.000Z');
  const isValidDate = !isNaN(astreinteDate.getTime());

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
          {/* Vue annuelle */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3">Vue annuelle — Bandeau mois</h3>
            <div className="space-y-3">
              <ColorPicker label="Fond" value={settings.yearMonthBgColor} onChange={(v) => onUpdateSettings({ yearMonthBgColor: v })} />
              <ColorPicker label="Texte" value={settings.yearMonthTextColor} onChange={(v) => onUpdateSettings({ yearMonthTextColor: v })} />
            </div>
          </section>

          {/* Vue mensuelle - header */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3">Vue mensuelle — Bandeau Lun-Dim</h3>
            <div className="space-y-3">
              <ColorPicker label="Fond" value={settings.monthHeaderBgColor} onChange={(v) => onUpdateSettings({ monthHeaderBgColor: v })} />
              <ColorPicker label="Texte" value={settings.monthHeaderTextColor} onChange={(v) => onUpdateSettings({ monthHeaderTextColor: v })} />
            </div>
          </section>

          {/* Vue mensuelle - n° semaine */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3">Vue mensuelle — N° semaine</h3>
            <div className="space-y-3">
              <ColorPicker label="Fond" value={settings.weekNumberBgColor} onChange={(v) => onUpdateSettings({ weekNumberBgColor: v })} />
              <ColorPicker label="Texte" value={settings.weekNumberTextColor} onChange={(v) => onUpdateSettings({ weekNumberTextColor: v })} />
            </div>
          </section>

          {/* Vue mensuelle - cases jours */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3">Vue mensuelle — Cases jours</h3>
            <div className="space-y-3">
              <ColorPicker label="Fond semaine" value={settings.dayCellBgColor} onChange={(v) => onUpdateSettings({ dayCellBgColor: v })} />
              <ColorPicker label="Texte semaine" value={settings.dayCellTextColor} onChange={(v) => onUpdateSettings({ dayCellTextColor: v })} />
              <ColorPicker label="Fond week-end" value={settings.weekendDaysBgColor} onChange={(v) => onUpdateSettings({ weekendDaysBgColor: v })} />
              <ColorPicker label="Texte week-end" value={settings.weekendDaysTextColor} onChange={(v) => onUpdateSettings({ weekendDaysTextColor: v })} />
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
                  {isValidDate ? format(astreinteDate, 'dd/MM/yyyy', { locale: fr }) : '05/02/2026'}
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
                <div className="mt-2 space-y-3">
                  <div className="p-2 bg-primary/5 rounded border border-primary/20 space-y-2">
                    <p className="text-xs text-primary">🔓 Déverrouillé</p>
                    <div className="flex gap-2 items-end">
                      <div className="flex-1">
                        <Label className="text-xs">Nouvelle date</Label>
                        <Input
                          type="date"
                          value={newStartDate}
                          onChange={(e) => setNewStartDate(e.target.value)}
                          className="h-8 text-sm"
                        />
                      </div>
                      <Button size="sm" className="h-8" onClick={handleDateChange}>OK</Button>
                    </div>
                  </div>
                  
                  {!showPinChange ? (
                    <Button variant="outline" size="sm" className="w-full h-7 text-xs" onClick={() => setShowPinChange(true)}>
                      <KeyRound className="w-3 h-3 mr-1" /> Changer le code PIN
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        type="password"
                        maxLength={4}
                        placeholder="Nouveau PIN"
                        value={newPin}
                        onChange={(e) => setNewPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        className="h-8 text-sm flex-1"
                      />
                      <Button size="sm" className="h-8" onClick={handlePinChange} disabled={newPin.length !== 4}>OK</Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* Événements & états */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3">Événements & états</h3>
            <div className="space-y-3">
              <ColorPicker label="RE (Repos)" value={settings.reColor} onChange={(v) => onUpdateSettings({ reColor: v })} />
              <ColorPicker label="CP (Congés Payés)" value={settings.cpColor} onChange={(v) => onUpdateSettings({ cpColor: v })} />
              <ColorPicker label="Vacances scolaires" value={settings.vacationColor} onChange={(v) => onUpdateSettings({ vacationColor: v })} />
              
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
            </p>
          </section>
        </div>
      </ScrollArea>
    </div>
  );
}
