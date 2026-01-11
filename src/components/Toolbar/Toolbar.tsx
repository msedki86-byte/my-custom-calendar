import { Button } from '@/components/ui/button';
import { Settings, Plus, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ToolbarProps {
  currentYear: number;
  onOpenSettings: () => void;
  onAddEvent: () => void;
  onYearChange: (year: number) => void;
}

const years = Array.from({ length: 10 }, (_, i) => 2025 + i);

export function Toolbar({ currentYear, onOpenSettings, onAddEvent, onYearChange }: ToolbarProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <Select 
          value={currentYear.toString()} 
          onValueChange={(v) => onYearChange(parseInt(v))}
        >
          <SelectTrigger className="w-28">
            <Calendar className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {years.map(year => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center gap-2">
        <Button onClick={onAddEvent} className="gap-2">
          <Plus className="w-4 h-4" />
          Ajouter
        </Button>
        <Button variant="outline" size="icon" onClick={onOpenSettings}>
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
