import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  viewMode?: 'year' | 'month';
  onViewModeChange?: (mode: 'year' | 'month') => void;
}

export function CalendarHeader({ 
  currentDate, 
  onPrevMonth, 
  onNextMonth, 
  onToday,
  viewMode = 'year',
  onViewModeChange,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <CalendarIcon className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground capitalize">
            {viewMode === 'year' 
              ? currentDate.getFullYear()
              : format(currentDate, 'MMMM yyyy', { locale: fr })
            }
          </h1>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {/* View mode toggle */}
        {onViewModeChange && (
          <div className="flex items-center rounded-lg border border-border bg-card mr-2">
            <Button 
              variant={viewMode === 'year' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => onViewModeChange('year')}
              className="rounded-r-none gap-1"
            >
              <LayoutGrid className="w-4 h-4" />
              Année
            </Button>
            <Button 
              variant={viewMode === 'month' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => onViewModeChange('month')}
              className="rounded-l-none gap-1"
            >
              <CalendarIcon className="w-4 h-4" />
              Mois
            </Button>
          </div>
        )}
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onToday}
          className="text-sm font-medium"
        >
          Aujourd'hui
        </Button>
        <div className="flex items-center rounded-lg border border-border bg-card">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onPrevMonth}
            className="rounded-r-none"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onNextMonth}
            className="rounded-l-none"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}