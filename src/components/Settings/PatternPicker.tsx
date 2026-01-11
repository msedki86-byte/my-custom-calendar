import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PatternType } from '@/types/calendar';
import { cn } from '@/lib/utils';

interface PatternPickerProps {
  label: string;
  value: PatternType;
  onChange: (value: PatternType) => void;
}

const patterns: { value: PatternType; label: string }[] = [
  { value: 'none', label: 'Aucun' },
  { value: 'stripes', label: 'Rayures' },
  { value: 'dots', label: 'Points' },
  { value: 'crosshatch', label: 'Croisillons' },
  { value: 'waves', label: 'Lignes' },
];

const patternClasses: Record<PatternType, string> = {
  none: '',
  stripes: 'pattern-stripes',
  dots: 'pattern-dots',
  crosshatch: 'pattern-crosshatch',
  waves: 'pattern-waves',
};

export function PatternPicker({ label, value, onChange }: PatternPickerProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Label className="text-sm text-foreground">{label}</Label>
      <Select value={value} onValueChange={(v) => onChange(v as PatternType)}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {patterns.map(pattern => (
            <SelectItem key={pattern.value} value={pattern.value}>
              <div className="flex items-center gap-2">
                <div 
                  className={cn(
                    'w-4 h-4 rounded bg-muted-foreground/60',
                    patternClasses[pattern.value]
                  )}
                />
                <span>{pattern.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
