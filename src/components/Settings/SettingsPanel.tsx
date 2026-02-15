import { useState } from 'react';
import { CalendarSettings } from '@/types/calendar';
import { PointageSettings, defaultPointageSettings } from '@/types/pointage';
import { usePointage } from '@/hooks/usePointage';
import { getAllCommuneNames } from '@/lib/communeService';
import { ColorPicker } from './ColorPicker';
import { PatternPicker } from './PatternPicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  const { pointageSettings, updatePointageSettings: onUpdatePointageSettings } = usePointage();
  const [pinInput, setPinInput] = useState('');
  const [pinUnlocked, setPinUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [showPinChange, setShowPinChange] = useState(false);
  const [newStartDate, setNewStartDate] = useState('');
  const [newCycleWeeks, setNewCycleWeeks] = useState<number>(6);

  if (!isOpen) return null;

  const handlePinSubmit = () => {
    if (pinInput === (settings.settingsPin || '0000')) {
      setPinUnlocked(true);
      setPinError(false);
      const d = new Date(settings.astreinteStartDate);
      setNewStartDate(format(d, 'yyyy-MM-dd'));
      setNewCycleWeeks(settings.astreinteCycleWeeks || 6);
    } else {
      setPinError(true);
    }
  };

  const handleDateChange = () => {
    if (!newStartDate) return;
    const d = new Date(newStartDate);
    if (!isNaN(d.getTime())) {
      onUpdateSettings({ astreinteStartDate: d.toISOString() });
      setPinUnlocked(false);
      setPinInput('');
    }
  };

  const handlePinChange = () => {
    if (newPin.length === 4) {
      onUpdateSettings({ settingsPin: newPin });
      setShowPinChange(false);
      setNewPin('');
      setPinUnlocked(false);
      setPinInput('');
    }
  };

  const astreinteDate = new Date(settings.astreinteStartDate || '2026-02-05T00:00:00.000Z');
  const isValidDate = !isNaN(astreinteDate.getTime());

  const pinLockUI = (
    <div className="space-y-2">
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
          onKeyDown={(e) => { if (e.key === 'Enter') handlePinSubmit(); }}
          className="h-8 text-sm flex-1"
        />
        <Button size="sm" className="h-8" onClick={handlePinSubmit}>
          <Unlock className="w-3 h-3" />
        </Button>
      </div>
      {pinError && <p className="text-xs text-destructive">Code incorrect</p>}
    </div>
  );

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

          {/* Astreintes (couleurs libres) */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3">Astreintes</h3>
            <div className="space-y-3">
              <ColorPicker label="Astreinte" value={settings.astreinteColor} onChange={(v) => onUpdateSettings({ astreinteColor: v })} />
              <ColorPicker label="Astreinte ponctuelle" value={settings.astreintePonctuelleColor} onChange={(v) => onUpdateSettings({ astreintePonctuelleColor: v })} />
              <ColorPicker label="Annulation" value={settings.astreinteCancelledColor} onChange={(v) => onUpdateSettings({ astreinteCancelledColor: v })} />
              <PatternPicker label="Motif annulation" value={settings.astreinteCancelledPattern} onChange={(v) => onUpdateSettings({ astreinteCancelledPattern: v })} />
            </div>
          </section>

          {/* Événements & états */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3">Événements & états</h3>
            <div className="space-y-3">
              <ColorPicker label="RE (Repos)" value={settings.reColor} onChange={(v) => onUpdateSettings({ reColor: v })} />
              <ColorPicker label="CP (Congés Payés)" value={settings.cpColor} onChange={(v) => onUpdateSettings({ cpColor: v })} />
              <ColorPicker label="Vacances scolaires (fond)" value={settings.vacationColor} onChange={(v) => onUpdateSettings({ vacationColor: v })} />
              <ColorPicker label="Vacances scolaires (texte)" value={settings.vacationTextColor} onChange={(v) => onUpdateSettings({ vacationTextColor: v })} />
            </div>
          </section>

          {/* ====== SECTION PIN-PROTECTED ====== */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Lock className="w-4 h-4" /> Paramètres protégés par PIN
            </h3>
            
            {!pinUnlocked ? (
              <div className="bg-muted/50 rounded-lg p-3">
                {pinLockUI}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-2 bg-primary/5 rounded border border-primary/20">
                  <p className="text-xs text-primary mb-3">🔓 Déverrouillé</p>

                  {/* Récurrence astreinte */}
                  <div className="space-y-2 mb-4">
                    <Label className="text-sm font-semibold">Récurrence astreinte</Label>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Date initiale</Label>
                      <span className="text-xs font-mono text-muted-foreground">
                        {isValidDate ? format(astreinteDate, 'dd/MM/yyyy', { locale: fr }) : '05/02/2026'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Cycle actuel</Label>
                      <span className="text-xs font-mono text-muted-foreground">
                        {settings.astreinteCycleWeeks || 6} semaines
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Cycle à partir de la date initiale.</p>
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
                    <div className="flex gap-2 items-end">
                      <div className="flex-1">
                        <Label className="text-xs">Cycle (semaines)</Label>
                        <Input
                          type="number"
                          min={1}
                          max={52}
                          value={newCycleWeeks}
                          onChange={(e) => {
                            const v = parseInt(e.target.value, 10);
                            if (!isNaN(v) && v >= 1 && v <= 52) setNewCycleWeeks(v);
                          }}
                          className="h-8 text-sm"
                        />
                      </div>
                      <Button size="sm" className="h-8" onClick={() => {
                        onUpdateSettings({ astreinteCycleWeeks: newCycleWeeks });
                        setPinUnlocked(false);
                        setPinInput('');
                      }}>OK</Button>
                    </div>
                  </div>

                  {/* Arrêts par tranche */}
                  <div className="space-y-2 mb-4">
                    <Label className="text-sm font-semibold">Arrêts par tranche</Label>
                    <div className="space-y-3">
                      <ColorPicker label="Arrêt Tr2" value={settings.arretTr2Color} onChange={(v) => onUpdateSettings({ arretTr2Color: v })} />
                      <ColorPicker label="Arrêt Tr3" value={settings.arretTr3Color} onChange={(v) => onUpdateSettings({ arretTr3Color: v })} />
                      <ColorPicker label="Arrêt Tr4" value={settings.arretTr4Color} onChange={(v) => onUpdateSettings({ arretTr4Color: v })} />
                      <ColorPicker label="Arrêt Tr5" value={settings.arretTr5Color} onChange={(v) => onUpdateSettings({ arretTr5Color: v })} />
                    </div>
                  </div>

                  {/* Paramètres Conformité & Pointage */}
                  {pointageSettings && onUpdatePointageSettings && (
                    <div className="space-y-2 mb-4">
                      <Label className="text-sm font-semibold">Conformité & Pointage</Label>
                      <div className="flex items-center justify-between">
                        <Label className="text-xs">Alertes activées</Label>
                        <Switch
                          checked={pointageSettings.alertesActives}
                          onCheckedChange={v => onUpdatePointageSettings({ alertesActives: v })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label className="text-[10px]">Seuil orange (h)</Label>
                          <Input
                            type="number"
                            min={1}
                            max={30}
                            value={pointageSettings.seuilOrangeHeures}
                            onChange={e => onUpdatePointageSettings({ seuilOrangeHeures: parseInt(e.target.value) || 16 })}
                            className="h-7 text-xs"
                          />
                        </div>
                        <div>
                          <Label className="text-[10px]">Seuil rouge (h)</Label>
                          <Input
                            type="number"
                            min={1}
                            max={20}
                            value={pointageSettings.seuilRougeHeures}
                            onChange={e => onUpdatePointageSettings({ seuilRougeHeures: parseInt(e.target.value) || 8 })}
                            className="h-7 text-xs"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label className="text-[10px]">Pot RE annuel (h)</Label>
                          <Input
                            type="number"
                            min={0}
                            value={pointageSettings.potREAnnuel}
                            onChange={e => onUpdatePointageSettings({ potREAnnuel: parseInt(e.target.value) || 312 })}
                            className="h-7 text-xs"
                          />
                        </div>
                        <div>
                          <Label className="text-[10px]">Solde RE (h)</Label>
                          <Input
                            type="number"
                            min={0}
                            value={pointageSettings.soldeRE}
                            onChange={e => onUpdatePointageSettings({ soldeRE: parseFloat(e.target.value) || 0 })}
                            className="h-7 text-xs"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label className="text-[10px]">Date activation RE</Label>
                          <Input
                            type="date"
                            value={pointageSettings.dateActivationRE}
                            onChange={e => onUpdatePointageSettings({ dateActivationRE: e.target.value })}
                            className="h-7 text-xs"
                          />
                        </div>
                        <div>
                          <Label className="text-[10px]">Seuil alerte RE (h)</Label>
                          <Input
                            type="number"
                            min={0}
                            value={pointageSettings.seuilAlerteRE}
                            onChange={e => onUpdatePointageSettings({ seuilAlerteRE: parseInt(e.target.value) || 14 })}
                            className="h-7 text-xs"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-[10px]">Prime repas (€)</Label>
                        <Input
                          type="number"
                          min={0}
                          step={0.01}
                          value={pointageSettings.primeRepasValeur}
                          onChange={e => onUpdatePointageSettings({ primeRepasValeur: parseFloat(e.target.value) || 9.26 })}
                          className="h-7 text-xs w-24"
                        />
                      </div>
                      {/* Commune de départ */}
                      <div>
                        <Label className="text-[10px]">Commune de départ (IK)</Label>
                        <Select
                          value={pointageSettings.communeDepart}
                          onValueChange={v => onUpdatePointageSettings({ communeDepart: v })}
                        >
                          <SelectTrigger className="h-7 text-xs">
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent className="max-h-60 bg-popover z-50">
                            {getAllCommuneNames().map(name => (
                              <SelectItem key={name} value={name} className="text-xs">{name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                  {/* Changer le PIN */}
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
              </div>
            )}
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
