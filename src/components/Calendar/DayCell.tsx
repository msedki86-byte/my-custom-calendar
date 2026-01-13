import { useMemo } from 'react';
import { format, isToday, isWeekend, getDay } from 'date-fns';
import { CalendarEvent, Holiday, Vacation, Astreinte, CalendarSettings, PatternType, CancelledAstreinteDate } from '@/types/calendar';
import { cn } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface DayCellProps {
  date: Date;
  events: CalendarEvent[];
  astreinte: Astreinte | null;
  holiday: Holiday | null;
  vacation: Vacation | null;
  hasConflict: boolean;
  cancelledInfo: CancelledAstreinteDate | null;
  settings: CalendarSettings;
  onClick?: () => void;
}

const patternClasses: Record<PatternType, string> = {
  none: '',
  stripes: 'pattern-stripes',
  dots: 'pattern-dots',
  crosshatch: 'pattern-crosshatch',
  waves: 'pattern-waves',
};

export function DayCell({
  date,
  events,
  astreinte,
  holiday,
  vacation,
  hasConflict,
  cancelledInfo,
  settings,
  onClick,
}: DayCellProps) {
  const isWeekendDay = isWeekend(date);
  const isTodayDate = isToday(date);
  const dayNumber = format(date, 'd');

  const cellStyle = useMemo(() => {
    // Si la date est annulée spécifiquement
    if (cancelledInfo) {
      return {
        backgroundColor: settings.astreinteCancelledColor,
        color: '#fff',
      };
    }
    if (astreinte && !astreinte.isCancelled) {
      return {
        backgroundColor: astreinte.isPonctuelle 
          ? settings.astreintePonctuelleColor 
          : settings.astreinteColor,
        color: '#fff',
      };
    }
    if (astreinte && astreinte.isCancelled) {
      return {
        backgroundColor: settings.astreinteCancelledColor,
        color: '#fff',
      };
    }
    return {};
  }, [astreinte, cancelledInfo, settings]);

  const patternClass = useMemo(() => {
    if (cancelledInfo || astreinte?.isCancelled) {
      return patternClasses[settings.astreinteCancelledPattern];
    }
    if (holiday) {
      return patternClasses[settings.holidayPattern];
    }
    return '';
  }, [astreinte, cancelledInfo, holiday, settings]);

  return (
    <div
      onClick={onClick}
      className={cn(
        'relative min-h-[100px] p-2 border-r border-b border-calendar-grid cursor-pointer transition-all duration-200',
        'hover:shadow-calendar-hover hover:z-10',
        isWeekendDay && 'bg-calendar-weekend',
        isTodayDate && 'bg-calendar-today ring-2 ring-primary ring-inset',
        patternClass
      )}
      style={cellStyle}
    >
      {/* Vacation indicator - top banner */}
      {vacation && (
        <div 
          className="absolute top-0 left-0 right-0 h-1.5 rounded-b-sm"
          style={{ backgroundColor: settings.vacationColor }}
          title={vacation.name}
        />
      )}

      {/* Day number */}
      <div className={cn(
        'flex items-center justify-between mb-1',
        holiday && 'font-bold'
      )}>
        <span className={cn(
          'text-sm font-medium',
          isTodayDate && 'text-primary',
          holiday && 'text-holiday font-bold',
          astreinte && !astreinte.isCancelled && 'text-white',
          astreinte?.isCancelled && 'text-white/80'
        )}>
          {dayNumber}
        </span>
        
        {/* Conflict warning */}
        {hasConflict && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="animate-pulse-soft">
                <AlertTriangle className="w-4 h-4 text-destructive" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-medium">⚠️ Conflit avec l'astreinte !</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      {/* Holiday name */}
      {holiday && (
        <div className={cn(
          'text-xs font-semibold text-holiday mb-1 truncate',
          astreinte && !astreinte.isCancelled && 'text-white/90'
        )}>
          {holiday.name}
        </div>
      )}

      {/* Events */}
      <div className="space-y-1">
        {events.slice(0, 3).map(event => (
          <div
            key={event.id}
            className="text-xs px-1.5 py-0.5 rounded truncate font-medium"
            style={{ 
              backgroundColor: event.color,
              color: '#fff',
            }}
            title={event.name}
          >
            {event.name}
          </div>
        ))}
        {events.length > 3 && (
          <div className="text-xs text-muted-foreground">
            +{events.length - 3} autres
          </div>
        )}
      </div>

      {/* Astreinte indicator */}
      {astreinte && !astreinte.isCancelled && (
        <div className={cn(
          'absolute bottom-1 right-1 text-[10px] font-semibold px-1 rounded',
          astreinte.isPonctuelle ? 'bg-white/20' : 'bg-white/20'
        )}>
          {astreinte.isPonctuelle 
            ? (astreinte.name || 'AST.') 
            : 'Astreinte'}
        </div>
      )}

      {/* Cancelled date info */}
      {cancelledInfo && (
        <div className="absolute bottom-1 left-1 right-1 text-[9px] font-semibold px-1 rounded bg-white/20">
          <span className="line-through">Annulée</span>
          {cancelledInfo.name && (
            <span className="block truncate opacity-80">{cancelledInfo.name}</span>
          )}
        </div>
      )}

      {astreinte?.isCancelled && !cancelledInfo && (
        <div className="absolute bottom-1 left-1 right-1 text-[9px] font-semibold px-1 rounded bg-white/20">
          <span className="line-through">Annulée</span>
          {astreinte.name && (
            <span className="block truncate opacity-80">{astreinte.name}</span>
          )}
        </div>
      )}
    </div>
  );
}
