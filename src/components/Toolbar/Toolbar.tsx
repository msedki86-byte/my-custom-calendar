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
    <div className="flex items-center justify-between mb-2 sm:mb-4 flex-wrap gap-2">
      <div className="flex items-center gap-2 sm:gap-3">
        <Select 
          value={currentYear.toString()} 
          onValueChange={(v) => onYearChange(parseInt(v))}
        >
          <SelectTrigger className="w-20 sm:w-28 h-8 text-xs sm:text-sm">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
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
      
      <div className="flex items-center gap-1 sm:gap-2">
        <Button onClick={onAddEvent} className="gap-1 sm:gap-2 h-8 text-xs sm:text-sm px-2 sm:px-3">
          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Ajouter</span>
        </Button>
        <Button variant="outline" size="icon" onClick={onOpenSettings} className="h-8 w-8">
          <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>
      </div>
    </div>
  );
}
