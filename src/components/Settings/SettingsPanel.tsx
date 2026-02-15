import { useState } from 'react';
import { CalendarSettings } from '@/types/calendar';
import { PointageSettings, defaultPointageSettings } from '@/types/pointage';
import { usePointage } from '@/hooks/usePointage';
import { useRHStore, RHBalanceType } from '@/stores/rhStore';
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
import { Settings, X, Lock, Unlock, KeyRound, ChevronDown, Users, Clock, Zap, Coins, Shield, Palette } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface SettingsPanelProps {
  settings: CalendarSettings;
  onUpdateSettings: (settings: Partial<CalendarSettings>) => void;
  isOpen: boolean;
  onClose: () => void;
}

function SectionHeader({ icon, label, color, open, onToggle, locked }: { icon: React.ReactNode; label: string; color: string; open: boolean; onToggle: () => void; locked?: boolean }) {
  return (
    <button onClick={onToggle} className={`flex items-center justify-between w-full p-2.5 rounded-lg border transition-colors ${open ? 'bg-accent/50 border-border' : 'bg-muted/30 border-transparent hover:bg-muted/50'}`}>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        {icon}
        <span className="text-xs font-semibold text-foreground">{label}</span>
        {locked && <Lock className="w-3 h-3 text-muted-foreground" />}
      </div>
      <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
    </button>
  );
}

export function SettingsPanel({ settings, onUpdateSettings, isOpen, onClose }: SettingsPanelProps) {
  const { pointageSettings, updatePointageSettings: onUpdatePointageSettings } = usePointage();
  const { rhState, setRHBalance } = useRHStore();
  const [pinInput, setPinInput] = useState('');
  const [pinUnlocked, setPinUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [showPinChange, setShowPinChange] = useState(false);
  const [newStartDate, setNewStartDate] = useState('');
  const [newCycleWeeks, setNewCycleWeeks] = useState<number>(6);
  const [rhDates, setRhDates] = useState<Record<string, string>>({});
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const toggleSection = (key: string) => setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

  const getRHDate = (type: RHBalanceType) => rhDates[type] || '';
  const setRHDate = (type: RHBalanceType, date: string) => setRhDates(prev => ({ ...prev, [type]: date }));

  const handleRHChange = (type: RHBalanceType, valeur: number) => {
    const dateEffet = getRHDate(type);
    if (!dateEffet) return;
    setRHBalance(type, valeur, dateEffet);
  };

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
        <span className="text-xs text-muted-foreground">Sections protégées par code PIN</span>
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

  const lockedMessage = <p className="text-xs text-muted-foreground italic p-2">Déverrouillez le PIN pour modifier</p>;

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

          {/* PIN Lock */}
          {!pinUnlocked && pinLockUI}
          {pinUnlocked && (
            <div className="p-2 bg-primary/5 rounded-lg border border-primary/20 flex items-center gap-2">
              <Unlock className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-primary font-medium">Déverrouillé</span>
            </div>
          )}

          {/* ====== 1. 🎨 Apparence (NON protégé) ====== */}
          <Collapsible open={openSections['apparence']} onOpenChange={() => toggleSection('apparence')}>
            <CollapsibleTrigger asChild>
              <div><SectionHeader icon={<Palette className="w-3.5 h-3.5 text-muted-foreground" />} label="Apparence" color="bg-gray-400" open={!!openSections['apparence']} onToggle={() => {}} /></div>
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

          {/* ====== 2. 🔵 RH (protégé) ====== */}
          <Collapsible open={openSections['rh']} onOpenChange={() => toggleSection('rh')}>
            <CollapsibleTrigger asChild>
              <div><SectionHeader icon={<Users className="w-3.5 h-3.5 text-muted-foreground" />} label="RH" color="bg-blue-500" open={!!openSections['rh']} onToggle={() => {}} locked={!pinUnlocked} /></div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-3 space-y-3 border border-border rounded-b-lg -mt-0.5">
                {!pinUnlocked ? lockedMessage : (
                  <>
                    {/* 21 (Congés annuels) */}
                    <div>
                      <Label className="text-xs font-semibold" translate="no">21 (Congés annuels)</Label>
                      <p className="text-[10px] text-muted-foreground">Dotation annuelle : 189h · Actuel : {rhState.solde21.toFixed(0)}h ({(rhState.solde21 / 8).toFixed(1)}j)</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Label className="text-[10px] w-16">Date effet</Label>
                        <Input type="date" value={getRHDate('21')} onChange={e => setRHDate('21', e.target.value)} className="h-7 text-xs flex-1" />
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Label className="text-[10px] w-16">Solde (h)</Label>
                        <Input type="number" min={0} value={rhState.solde21} onChange={e => { const v = parseFloat(e.target.value) || 0; if (getRHDate('21')) handleRHChange('21', v); }} className="h-7 text-xs w-20" disabled={!getRHDate('21')} />
                        <span className="text-[10px] text-muted-foreground">= {(rhState.solde21 / 8).toFixed(1)}j</span>
                      </div>
                      {!getRHDate('21') && <p className="text-[10px] text-destructive">Date d'effet obligatoire pour modifier</p>}
                    </div>

                    {/* RE */}
                    <div>
                      <Label className="text-xs font-semibold">RE (Repos Équivalent)</Label>
                      <p className="text-[10px] text-muted-foreground">Dotation fixe : 312h (39j × 8h) · Actuel : {rhState.soldeRE.toFixed(0)}h ({(rhState.soldeRE / 8).toFixed(1)}j)</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Label className="text-[10px] w-16">Date effet</Label>
                        <Input type="date" value={getRHDate('RE')} onChange={e => setRHDate('RE', e.target.value)} className="h-7 text-xs flex-1" />
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Label className="text-[10px] w-16">Solde (h)</Label>
                        <Input type="number" min={0} value={rhState.soldeRE} onChange={e => { const v = parseFloat(e.target.value) || 0; if (getRHDate('RE')) handleRHChange('RE', v); }} className="h-7 text-xs w-20" disabled={!getRHDate('RE')} />
                        <span className="text-[10px] text-muted-foreground">= {(rhState.soldeRE / 8).toFixed(1)}j</span>
                      </div>
                      {!getRHDate('RE') && <p className="text-[10px] text-destructive">Date d'effet obligatoire pour modifier</p>}
                      <div className="flex items-center gap-2 mt-1">
                        <Label className="text-[10px] w-16">Seuil alerte</Label>
                        <Input type="number" min={0} value={pointageSettings.seuilAlerteRE} onChange={e => onUpdatePointageSettings({ seuilAlerteRE: parseInt(e.target.value) || 14 })} className="h-7 text-xs w-20" />
                        <span className="text-[10px] text-muted-foreground">h</span>
                      </div>
                    </div>

                    {/* RC 011 */}
                    <div>
                      <Label className="text-xs font-semibold">RC 011 (RC-HS)</Label>
                      <p className="text-[10px] text-muted-foreground">Comptes 926 / 935 / 9S0T–9S4T · Actuel : {rhState.soldeRC011.toFixed(0)}h ({(rhState.soldeRC011 / 8).toFixed(1)}j)</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Label className="text-[10px] w-16">Date effet</Label>
                        <Input type="date" value={getRHDate('RC011')} onChange={e => setRHDate('RC011', e.target.value)} className="h-7 text-xs flex-1" />
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Label className="text-[10px] w-16">Solde (h)</Label>
                        <Input type="number" min={0} value={rhState.soldeRC011} onChange={e => { const v = parseFloat(e.target.value) || 0; if (getRHDate('RC011')) handleRHChange('RC011', v); }} className="h-7 text-xs w-20" disabled={!getRHDate('RC011')} />
                        <span className="text-[10px] text-muted-foreground">= {(rhState.soldeRC011 / 8).toFixed(1)}j</span>
                      </div>
                      {!getRHDate('RC011') && <p className="text-[10px] text-destructive">Date d'effet obligatoire</p>}
                    </div>

                    {/* RC 012 + RCO */}
                    <div>
                      <Label className="text-xs font-semibold">RC 012 (RC-Autres + RCO)</Label>
                      <p className="text-[10px] text-muted-foreground">Comptes 817 / 934 / 980 / 968 · RCO obligatoire (JF, non perdable) · Actuel : {rhState.soldeRC012.toFixed(0)}h ({(rhState.soldeRC012 / 8).toFixed(1)}j)</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Label className="text-[10px] w-16">Date effet</Label>
                        <Input type="date" value={getRHDate('RC012')} onChange={e => setRHDate('RC012', e.target.value)} className="h-7 text-xs flex-1" />
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Label className="text-[10px] w-16">Solde (h)</Label>
                        <Input type="number" min={0} value={rhState.soldeRC012} onChange={e => { const v = parseFloat(e.target.value) || 0; if (getRHDate('RC012')) handleRHChange('RC012', v); }} className="h-7 text-xs w-20" disabled={!getRHDate('RC012')} />
                        <span className="text-[10px] text-muted-foreground">= {(rhState.soldeRC012 / 8).toFixed(1)}j</span>
                      </div>
                      {!getRHDate('RC012') && <p className="text-[10px] text-destructive">Date d'effet obligatoire</p>}
                    </div>

                    {/* RC Total summary */}
                    <div className="p-2 rounded-lg bg-muted/50 border border-border">
                      <p className="text-xs font-semibold">RC total : {(rhState.soldeRC011 + rhState.soldeRC012).toFixed(0)}h ({((rhState.soldeRC011 + rhState.soldeRC012) / 8).toFixed(1)}j)</p>
                      <div className="text-[10px] text-muted-foreground space-y-0.5 mt-1">
                        <p>RC-HS (011) : {rhState.soldeRC011.toFixed(0)}h</p>
                        <p>RC-Autres + RCO (012) : {rhState.soldeRC012.toFixed(0)}h</p>
                      </div>
                    </div>

                    {/* Stage long primes */}
                    <div>
                      <Label className="text-xs font-semibold">Stage long (FPC multi-jours)</Label>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <div>
                          <Label className="text-[10px]">Prime hebdo (€)</Label>
                          <Input type="number" min={0} step={0.01} value={pointageSettings.montantPrimeHebdo ?? 0} onChange={e => onUpdatePointageSettings({ montantPrimeHebdo: parseFloat(e.target.value) || 0 })} className="h-7 text-xs" />
                        </div>
                        <div>
                          <Label className="text-[10px]">Prime mensuelle (€)</Label>
                          <Input type="number" min={0} step={0.01} value={pointageSettings.montantPrimeMensuelle ?? 0} onChange={e => onUpdatePointageSettings({ montantPrimeMensuelle: parseFloat(e.target.value) || 0 })} className="h-7 text-xs" />
                        </div>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1">{'≤ 3 mois → prime hebdo · > 3 mois → prime mensuelle'}</p>
                    </div>
                  </>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* ====== 3. 🟠 Temps de travail (protégé) ====== */}
          <Collapsible open={openSections['temps']} onOpenChange={() => toggleSection('temps')}>
            <CollapsibleTrigger asChild>
              <div><SectionHeader icon={<Clock className="w-3.5 h-3.5 text-muted-foreground" />} label="Temps de travail" color="bg-orange-500" open={!!openSections['temps']} onToggle={() => {}} locked={!pinUnlocked} /></div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-3 space-y-3 border border-border rounded-b-lg -mt-0.5">
                {!pinUnlocked ? lockedMessage : (
                  <>
                    <div>
                      <Label className="text-xs font-semibold">Régime</Label>
                      <Select value={pointageSettings.regime || 'HABA'} onValueChange={v => onUpdatePointageSettings({ regime: v as 'HABA' | 'NORMAL' })}>
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

                    {/* Postes */}
                    <div>
                      <Label className="text-xs font-semibold">Postes</Label>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <div>
                          <Label className="text-[10px]">Matin début</Label>
                          <Input type="time" value={pointageSettings.posteMatinDebut || '05:00'} onChange={e => onUpdatePointageSettings({ posteMatinDebut: e.target.value })} className="h-7 text-xs" />
                        </div>
                        <div>
                          <Label className="text-[10px]">Matin fin</Label>
                          <Input type="time" value={pointageSettings.posteMatinFin || '13:00'} onChange={e => onUpdatePointageSettings({ posteMatinFin: e.target.value })} className="h-7 text-xs" />
                        </div>
                        <div>
                          <Label className="text-[10px]">AM début</Label>
                          <Input type="time" value={pointageSettings.posteAMDebut || '13:00'} onChange={e => onUpdatePointageSettings({ posteAMDebut: e.target.value })} className="h-7 text-xs" />
                        </div>
                        <div>
                          <Label className="text-[10px]">AM fin</Label>
                          <Input type="time" value={pointageSettings.posteAMFin || '21:00'} onChange={e => onUpdatePointageSettings({ posteAMFin: e.target.value })} className="h-7 text-xs" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Alertes activées</Label>
                      <Switch checked={pointageSettings.alertesActives} onCheckedChange={v => onUpdatePointageSettings({ alertesActives: v })} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-[10px]">Seuil orange (h)</Label>
                        <Input type="number" min={1} max={30} value={pointageSettings.seuilOrangeHeures} onChange={e => onUpdatePointageSettings({ seuilOrangeHeures: parseInt(e.target.value) || 16 })} className="h-7 text-xs" />
                      </div>
                      <div>
                        <Label className="text-[10px]">Seuil rouge (h)</Label>
                        <Input type="number" min={1} max={20} value={pointageSettings.seuilRougeHeures} onChange={e => onUpdatePointageSettings({ seuilRougeHeures: parseInt(e.target.value) || 8 })} className="h-7 text-xs" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* ====== 4. 🟣 Astreintes (protégé) ====== */}
          <Collapsible open={openSections['astreintes']} onOpenChange={() => toggleSection('astreintes')}>
            <CollapsibleTrigger asChild>
              <div><SectionHeader icon={<Zap className="w-3.5 h-3.5 text-muted-foreground" />} label="Astreintes" color="bg-purple-500" open={!!openSections['astreintes']} onToggle={() => {}} locked={!pinUnlocked} /></div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-3 space-y-3 border border-border rounded-b-lg -mt-0.5">
                {!pinUnlocked ? lockedMessage : (
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

          {/* ====== 5. 🟢 Indemnités (protégé) ====== */}
          <Collapsible open={openSections['indemnites']} onOpenChange={() => toggleSection('indemnites')}>
            <CollapsibleTrigger asChild>
              <div><SectionHeader icon={<Coins className="w-3.5 h-3.5 text-muted-foreground" />} label="Indemnités" color="bg-green-500" open={!!openSections['indemnites']} onToggle={() => {}} locked={!pinUnlocked} /></div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-3 space-y-3 border border-border rounded-b-lg -mt-0.5">
                {!pinUnlocked ? lockedMessage : (
                  <>
                    <div>
                      <Label className="text-[10px]">Prime repas (€)</Label>
                      <Input type="number" min={0} step={0.01} value={pointageSettings.primeRepasValeur} onChange={e => onUpdatePointageSettings({ primeRepasValeur: parseFloat(e.target.value) || 9.26 })} className="h-7 text-xs w-24" />
                    </div>
                    <div>
                      <Label className="text-[10px]">Commune de départ (IK)</Label>
                      <Select value={pointageSettings.communeDepart} onValueChange={v => onUpdatePointageSettings({ communeDepart: v })}>
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
                  </>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* ====== 6. 🔴 Sécurité (NON protégé) ====== */}
          <Collapsible open={openSections['securite']} onOpenChange={() => toggleSection('securite')}>
            <CollapsibleTrigger asChild>
              <div><SectionHeader icon={<Shield className="w-3.5 h-3.5 text-muted-foreground" />} label="Sécurité" color="bg-red-500" open={!!openSections['securite']} onToggle={() => {}} /></div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-3 space-y-3 border border-border rounded-b-lg -mt-0.5">
                {!pinUnlocked ? (
                  <p className="text-xs text-muted-foreground italic">Déverrouillez le PIN ci-dessus pour changer le code</p>
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
