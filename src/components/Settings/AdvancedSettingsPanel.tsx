/**
 * Advanced settings panel — hidden from UI for now.
 * Will be surfaced when the feature is ready.
 */

import { AdvancedSettings } from '@/types/advancedSettings';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Settings, X, RotateCcw } from 'lucide-react';

interface AdvancedSettingsPanelProps {
  settings: AdvancedSettings;
  onUpdate: (patch: Partial<AdvancedSettings>) => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
}

interface FieldDef {
  key: keyof AdvancedSettings;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
}

const FIELDS: FieldDef[] = [
  { key: 'compteurREHeures', label: 'Compteur RE', unit: 'heures', min: 0, max: 9999, step: 0.5 },
  { key: 'compteurCPJours', label: 'Compteur CP', unit: 'jours', min: 0, max: 365, step: 0.5 },
  { key: 'nombreSemainesHautesObligatoires', label: 'Semaines hautes obligatoires', unit: 'semaines', min: 0, max: 52, step: 1 },
  { key: 'limiteHebdo5j', label: 'Limite hebdo (5j)', unit: 'heures', min: 0, max: 168, step: 0.5 },
  { key: 'limiteHebdo6j', label: 'Limite hebdo (6j)', unit: 'heures', min: 0, max: 168, step: 0.5 },
  { key: 'limiteJour', label: 'Limite journalière', unit: 'heures', min: 0, max: 24, step: 0.5 },
  { key: 'reposMinimumHeures', label: 'Repos minimum inter-poste', unit: 'heures', min: 0, max: 48, step: 0.5 },
];

export function AdvancedSettingsPanel({ settings, onUpdate, onReset, isOpen, onClose }: AdvancedSettingsPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-80 max-w-[90vw] bg-card border-l border-border shadow-card-elevated z-50 animate-slide-in">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">Paramètres avancés</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-65px)]">
        <div className="p-4 space-y-4">
          {FIELDS.map(({ key, label, unit, min, max, step }) => (
            <div key={key} className="space-y-1">
              <Label className="text-sm">{label}</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={min}
                  max={max}
                  step={step}
                  value={settings[key]}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    if (!isNaN(v)) onUpdate({ [key]: v });
                  }}
                  className="h-8 text-sm flex-1"
                />
                <span className="text-xs text-muted-foreground w-16">{unit}</span>
              </div>
            </div>
          ))}

          <Button variant="outline" size="sm" className="w-full mt-4" onClick={onReset}>
            <RotateCcw className="w-3 h-3 mr-1" /> Réinitialiser
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
}
