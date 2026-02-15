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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Settings, X, Lock, Unlock, KeyRound, ChevronDown, Users, Clock, Zap, Coins, Shield } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface SettingsPanelProps {
  settings: CalendarSettings;
  onUpdateSettings: (settings: Partial<CalendarSettings>) => void;
  isOpen: boolean;
  onClose: () => void;
}

function SectionHeader({ icon, label, color, open, onToggle }: { icon: React.ReactNode; label: string; color: string; open: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className={`flex items-center justify-between w-full p-2.5 rounded-lg border transition-colors ${open ? 'bg-accent/50 border-border' : 'bg-muted/30 border-transparent hover:bg-muted/50'}`}>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        {icon}
        <span className="text-xs font-semibold text-foreground">{label}</span>
      </div>
      <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
    </button>
  );
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

  // All sections collapsed by default
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const toggleSection = (key: string) => setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

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
    <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
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
        <div className="p-4 space-y-2">

          {/* PIN Lock - always visible at top */}
          {!pinUnlocked && pinLockUI}
          {pinUnlocked && (
            <div className="p-2 bg-primary/5 rounded-lg border border-primary/20 flex items-center gap-2">
              <Unlock className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-primary font-medium">Déverrouillé</span>
            </div>
          )}

          {/* ====== 🔵 RH ====== */}
          <Collapsible open={openSections['rh']} onOpenChange={() => toggleSection('rh')}>
            <CollapsibleTrigger asChild>
              <div><SectionHeader icon={<Users className="w-3.5 h-3.5 text-muted-foreground" />} label="RH" color="bg-blue-500" open={!!openSections['rh']} onToggle={() => {}} /></div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-3 space-y-3 border border-border rounded-b-lg -mt-0.5">
                {/* 21 (Congés annuels) */}
                <div>
                  <Label className="text-xs font-semibold" translate="no">21 (Congés annuels)</Label>
                  <p className="text-[10px] text-muted-foreground">Dotation annuelle : 189h</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Label className="text-[10px] w-16">Solde (h)</Label>
                    <Input
                      type="number"
                      min={0}
                      value={pointageSettings.soldeCongesAnnuels ?? 173}
                      onChange={e => onUpdatePointageSettings({ soldeCongesAnnuels: parseFloat(e.target.value) || 0 })}
                      className="h-7 text-xs w-20"
                    />
                    <span className="text-[10px] text-muted-foreground">= {((pointageSettings.soldeCongesAnnuels ?? 173) / 8).toFixed(1)}j</span>
                  </div>
                </div>

                {/* RE */}
                <div>
                  <Label className="text-xs font-semibold">RE (Repos Équivalent)</Label>
                  <p className="text-[10px] text-muted-foreground">Dotation fixe : 312h (39j × 8h)</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Label className="text-[10px] w-16">Solde (h)</Label>
                    <Input
                      type="number"
                      min={0}
                      value={pointageSettings.soldeRE}
                      onChange={e => onUpdatePointageSettings({ soldeRE: parseFloat(e.target.value) || 0 })}
                      className="h-7 text-xs w-20"
                    />
                    <span className="text-[10px] text-muted-foreground">= {(pointageSettings.soldeRE / 8).toFixed(1)}j</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Label className="text-[10px] w-16">Seuil alerte</Label>
                    <Input
                      type="number"
                      min={0}
                      value={pointageSettings.seuilAlerteRE}
                      onChange={e => onUpdatePointageSettings({ seuilAlerteRE: parseInt(e.target.value) || 14 })}
                      className="h-7 text-xs w-20"
                    />
                    <span className="text-[10px] text-muted-foreground">h</span>
                  </div>
                </div>

                {/* RC 011 */}
                <div>
                  <Label className="text-xs font-semibold">RC 011 (RC-HS)</Label>
                  <p className="text-[10px] text-muted-foreground">926 (RC-HS 25%), 935 (RC-HS 50%)</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Label className="text-[10px] w-16">Solde (h)</Label>
                    <Input
                      type="number"
                      min={0}
                      value={pointageSettings.soldeRC011 ?? 0}
                      onChange={e => onUpdatePointageSettings({ soldeRC011: parseFloat(e.target.value) || 0 })}
                      className="h-7 text-xs w-20"
                    />
                    <span className="text-[10px] text-muted-foreground">= {((pointageSettings.soldeRC011 ?? 0) / 8).toFixed(1)}j</span>
                  </div>
                </div>
                {/* RC 012 + RCO */}
                <div>
                  <Label className="text-xs font-semibold">RC 012 (RC-Autres + RCO)</Label>
                  <p className="text-[10px] text-muted-foreground">817, 934, 980, 968 · RCO inclus (obligatoire, non perdable)</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Label className="text-[10px] w-16">Solde (h)</Label>
                    <Input
                      type="number"
                      min={0}
                      value={pointageSettings.soldeRC012 ?? 0}
                      onChange={e => onUpdatePointageSettings({ soldeRC012: parseFloat(e.target.value) || 0 })}
                      className="h-7 text-xs w-20"
                    />
                    <span className="text-[10px] text-muted-foreground">= {((pointageSettings.soldeRC012 ?? 0) / 8).toFixed(1)}j</span>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* ====== 🟠 Temps de travail ====== */}
          <Collapsible open={openSections['temps']} onOpenChange={() => toggleSection('temps')}>
            <CollapsibleTrigger asChild>
              <div><SectionHeader icon={<Clock className="w-3.5 h-3.5 text-muted-foreground" />} label="Temps de travail" color="bg-orange-500" open={!!openSections['temps']} onToggle={() => {}} /></div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-3 space-y-3 border border-border rounded-b-lg -mt-0.5">
                <div>
                  <Label className="text-xs font-semibold">Régime</Label>
                  <Select
                    value={pointageSettings.regime || 'HABA'}
                    onValueChange={v => onUpdatePointageSettings({ regime: v as 'HABA' | 'NORMAL' })}
                  >
                    <SelectTrigger className="h-7 text-xs mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50">
                      <SelectItem value="HABA" className="text-xs">HABA (40h haute / 32h basse)</SelectItem>
                      <SelectItem value="NORMAL" className="text-xs">Normal</SelectItem>
                    </SelectContent>
                  </Select>
                  {pointageSettings.regime === 'HABA' && (
                    <p className="text-[10px] text-muted-foreground mt-1">40h semaines hautes, 32h semaines basses, RE fixe 312h</p>
                  )}
                </div>
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
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* ====== 🟣 Astreintes ====== */}
          <Collapsible open={openSections['astreintes']} onOpenChange={() => toggleSection('astreintes')}>
            <CollapsibleTrigger asChild>
              <div><SectionHeader icon={<Zap className="w-3.5 h-3.5 text-muted-foreground" />} label="Astreintes" color="bg-purple-500" open={!!openSections['astreintes']} onToggle={() => {}} /></div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-3 space-y-3 border border-border rounded-b-lg -mt-0.5">
                {!pinUnlocked ? (
                  <p className="text-xs text-muted-foreground italic">Déverrouillez le PIN pour modifier</p>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">Récurrence</Label>
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
                      <div className="flex gap-2 items-end">
                        <div className="flex-1">
                          <Label className="text-xs">Nouvelle date</Label>
                          <Input type="date" value={newStartDate} onChange={(e) => setNewStartDate(e.target.value)} className="h-8 text-sm" />
                        </div>
                        <Button size="sm" className="h-8" onClick={handleDateChange}>OK</Button>
                      </div>
                      <div className="flex gap-2 items-end">
                        <div className="flex-1">
                          <Label className="text-xs">Cycle (semaines)</Label>
                          <Input type="number" min={1} max={52} value={newCycleWeeks} onChange={(e) => { const v = parseInt(e.target.value, 10); if (!isNaN(v) && v >= 1 && v <= 52) setNewCycleWeeks(v); }} className="h-8 text-sm" />
                        </div>
                        <Button size="sm" className="h-8" onClick={() => onUpdateSettings({ astreinteCycleWeeks: newCycleWeeks })}>OK</Button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold">Couleurs</Label>
                      <ColorPicker label="Astreinte" value={settings.astreinteColor} onChange={(v) => onUpdateSettings({ astreinteColor: v })} />
                      <ColorPicker label="Astreinte ponctuelle" value={settings.astreintePonctuelleColor} onChange={(v) => onUpdateSettings({ astreintePonctuelleColor: v })} />
                      <ColorPicker label="Annulation" value={settings.astreinteCancelledColor} onChange={(v) => onUpdateSettings({ astreinteCancelledColor: v })} />
                      <PatternPicker label="Motif annulation" value={settings.astreinteCancelledPattern} onChange={(v) => onUpdateSettings({ astreinteCancelledPattern: v })} />
                    </div>
                  </>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* ====== 🟢 Indemnités ====== */}
          <Collapsible open={openSections['indemnites']} onOpenChange={() => toggleSection('indemnites')}>
            <CollapsibleTrigger asChild>
              <div><SectionHeader icon={<Coins className="w-3.5 h-3.5 text-muted-foreground" />} label="Indemnités" color="bg-green-500" open={!!openSections['indemnites']} onToggle={() => {}} /></div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-3 space-y-3 border border-border rounded-b-lg -mt-0.5">
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
            </CollapsibleContent>
          </Collapsible>

          {/* ====== 🔴 Sécurité ====== */}
          <Collapsible open={openSections['securite']} onOpenChange={() => toggleSection('securite')}>
            <CollapsibleTrigger asChild>
              <div><SectionHeader icon={<Shield className="w-3.5 h-3.5 text-muted-foreground" />} label="Sécurité" color="bg-red-500" open={!!openSections['securite']} onToggle={() => {}} /></div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-3 space-y-3 border border-border rounded-b-lg -mt-0.5">
                {!pinUnlocked ? (
                  <p className="text-xs text-muted-foreground italic">Déverrouillez le PIN pour modifier</p>
                ) : (
                  <>
                    {!showPinChange ? (
                      <Button variant="outline" size="sm" className="w-full h-7 text-xs" onClick={() => setShowPinChange(true)}>
                        <KeyRound className="w-3 h-3 mr-1" /> Changer le code PIN
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Input type="password" maxLength={4} placeholder="Nouveau PIN" value={newPin} onChange={(e) => setNewPin(e.target.value.replace(/\D/g, '').slice(0, 4))} className="h-8 text-sm flex-1" />
                        <Button size="sm" className="h-8" onClick={handlePinChange} disabled={newPin.length !== 4}>OK</Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* ====== Apparence (non protégé, replié) ====== */}
          <Collapsible open={openSections['apparence']} onOpenChange={() => toggleSection('apparence')}>
            <CollapsibleTrigger asChild>
              <div><SectionHeader icon={<Settings className="w-3.5 h-3.5 text-muted-foreground" />} label="Apparence" color="bg-gray-400" open={!!openSections['apparence']} onToggle={() => {}} /></div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-3 space-y-4 border border-border rounded-b-lg -mt-0.5">
                <section>
                  <h4 className="text-xs font-semibold mb-2">Vue annuelle — Bandeau mois</h4>
                  <div className="space-y-2">
                    <ColorPicker label="Fond" value={settings.yearMonthBgColor} onChange={(v) => onUpdateSettings({ yearMonthBgColor: v })} />
                    <ColorPicker label="Texte" value={settings.yearMonthTextColor} onChange={(v) => onUpdateSettings({ yearMonthTextColor: v })} />
                  </div>
                </section>
                <section>
                  <h4 className="text-xs font-semibold mb-2">Vue mensuelle — Bandeau Lun-Dim</h4>
                  <div className="space-y-2">
                    <ColorPicker label="Fond" value={settings.monthHeaderBgColor} onChange={(v) => onUpdateSettings({ monthHeaderBgColor: v })} />
                    <ColorPicker label="Texte" value={settings.monthHeaderTextColor} onChange={(v) => onUpdateSettings({ monthHeaderTextColor: v })} />
                  </div>
                </section>
                <section>
                  <h4 className="text-xs font-semibold mb-2">Vue mensuelle — N° semaine</h4>
                  <div className="space-y-2">
                    <ColorPicker label="Fond" value={settings.weekNumberBgColor} onChange={(v) => onUpdateSettings({ weekNumberBgColor: v })} />
                    <ColorPicker label="Texte" value={settings.weekNumberTextColor} onChange={(v) => onUpdateSettings({ weekNumberTextColor: v })} />
                  </div>
                </section>
                <section>
                  <h4 className="text-xs font-semibold mb-2">Vue mensuelle — Cases jours</h4>
                  <div className="space-y-2">
                    <ColorPicker label="Fond semaine" value={settings.dayCellBgColor} onChange={(v) => onUpdateSettings({ dayCellBgColor: v })} />
                    <ColorPicker label="Texte semaine" value={settings.dayCellTextColor} onChange={(v) => onUpdateSettings({ dayCellTextColor: v })} />
                    <ColorPicker label="Fond week-end" value={settings.weekendDaysBgColor} onChange={(v) => onUpdateSettings({ weekendDaysBgColor: v })} />
                    <ColorPicker label="Texte week-end" value={settings.weekendDaysTextColor} onChange={(v) => onUpdateSettings({ weekendDaysTextColor: v })} />
                  </div>
                </section>
                <section>
                  <h4 className="text-xs font-semibold mb-2">Événements & états</h4>
                  <div className="space-y-2">
                    <ColorPicker label="RE (Repos)" value={settings.reColor} onChange={(v) => onUpdateSettings({ reColor: v })} />
                    <ColorPicker label="21 (Congés annuels)" value={settings.cpColor} onChange={(v) => onUpdateSettings({ cpColor: v })} />
                    <ColorPicker label="Vacances scolaires (fond)" value={settings.vacationColor} onChange={(v) => onUpdateSettings({ vacationColor: v })} />
                    <ColorPicker label="Vacances scolaires (texte)" value={settings.vacationTextColor} onChange={(v) => onUpdateSettings({ vacationTextColor: v })} />
                  </div>
                </section>
                {pinUnlocked && (
                  <section>
                    <h4 className="text-xs font-semibold mb-2">Arrêts par tranche</h4>
                    <div className="space-y-2">
                      <ColorPicker label="Arrêt Tr2" value={settings.arretTr2Color} onChange={(v) => onUpdateSettings({ arretTr2Color: v })} />
                      <ColorPicker label="Arrêt Tr3" value={settings.arretTr3Color} onChange={(v) => onUpdateSettings({ arretTr3Color: v })} />
                      <ColorPicker label="Arrêt Tr4" value={settings.arretTr4Color} onChange={(v) => onUpdateSettings({ arretTr4Color: v })} />
                      <ColorPicker label="Arrêt Tr5" value={settings.arretTr5Color} onChange={(v) => onUpdateSettings({ arretTr5Color: v })} />
                    </div>
                  </section>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Info */}
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">
              <strong>RE</strong> et <strong>21 (Congés annuels)</strong> grisent la case jour entière. 
              Les astreintes actives restent prioritaires sur le grisage.
            </p>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
