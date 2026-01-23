import { useMemo } from 'react';
import { 
  startOfYear,
  endOfYear,
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  eachMonthOfInterval,
  isSameMonth,
  isToday,
  isWeekend,
  format,
  getWeek,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarSettings, Astreinte, Holiday, Vacation, CalendarEvent, CancelledAstreinteDate, Arret } from '@/types/calendar';
import { cn } from '@/lib/utils';

interface UnifiedYearViewProps {
  year: number;
  settings: CalendarSettings;
  astreintes: Astreinte[];
  isAstreinteDay: (date: Date, astreintes: Astreinte[]) => Astreinte | null;
  hasConflict: (date: Date, astreintes: Astreinte[]) => boolean;
  isHoliday: (date: Date) => Holiday | null;
  isVacationDay: (date: Date) => Vacation | null;
  isArretDay: (date: Date) => Arret | null;
  getEventsForDate: (date: Date) => CalendarEvent[];
  isDateCancelled: (date: Date) => CancelledAstreinteDate | null;
  onMonthClick?: (date: Date) => void;
  onDayClick?: (date: Date) => void;
}

const WEEKDAYS_SHORT = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

export function UnifiedYearView({
  year,
  settings,
  astreintes,
  isAstreinteDay,
  hasConflict,
  isHoliday,
  isVacationDay,
  isArretDay,
  getEventsForDate,
  isDateCancelled,
  onMonthClick,
  onDayClick,
}: UnifiedYearViewProps) {
  const months = useMemo(() => {
    const yearStart = startOfYear(new Date(year, 0, 1));
    const yearEnd = endOfYear(yearStart);
    return eachMonthOfInterval({ start: yearStart, end: yearEnd });
  }, [year]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
      {months.map((month) => {
        const monthStart = startOfMonth(month);
        const monthEnd = endOfMonth(month);
        const calendarStart = startOfWeek(monthStart, { locale: fr, weekStartsOn: 1 });
        const calendarEnd = endOfWeek(monthEnd, { locale: fr, weekStartsOn: 1 });
        const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

        return (
          <div 
            key={month.toString()} 
            className="bg-card rounded-xl border border-border shadow-sm overflow-hidden"
          >
            {/* Month Header */}
            <button
              onClick={() => onMonthClick?.(month)}
              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-primary/10 hover:bg-primary/20 transition-colors text-center touch-manipulation"
            >
              <span className="text-xs sm:text-sm font-semibold text-primary capitalize">
                {format(month, 'MMMM', { locale: fr })}
              </span>
            </button>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 bg-muted/30">
              {WEEKDAYS_SHORT.map((day, index) => (
                <div 
                  key={`${month}-${day}-${index}`}
                  className={cn(
                    "py-0.5 text-center text-[8px] sm:text-[10px] font-medium text-muted-foreground",
                    index >= 5 && "text-primary/60"
                  )}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-px p-0.5 sm:p-1">
              {days.map((day, dayIndex) => {
                const isCurrentMonth = isSameMonth(day, month);
                const isTodayDate = isToday(day);
                const isWeekendDay = isWeekend(day);
                const astreinte = isAstreinteDay(day, astreintes);
                const holiday = isHoliday(day);
                const vacation = isVacationDay(day);
                const arret = isArretDay(day);
                const events = getEventsForDate(day);
                const cancelled = isDateCancelled(day);
                const conflict = hasConflict(day, astreintes);
                
                const hasEvent = events.length > 0 || astreinte || vacation || arret;

                return (
                  <button
                    key={dayIndex}
                    onClick={() => isCurrentMonth && onDayClick?.(day)}
                    disabled={!isCurrentMonth}
                    className={cn(
                      "relative aspect-square flex items-center justify-center text-[9px] sm:text-[10px] rounded-sm transition-all",
                      "touch-manipulation active:scale-95",
                      !isCurrentMonth && "opacity-20",
                      isCurrentMonth && "hover:bg-accent/50",
                      isWeekendDay && isCurrentMonth && "bg-muted/40",
                      isTodayDate && "ring-1 ring-primary bg-primary/20 font-bold",
                      holiday && isCurrentMonth && "bg-destructive/20 text-destructive",
                      astreinte && !astreinte.isCancelled && !cancelled && isCurrentMonth && "bg-orange-500/80 text-white",
                    )}
                  >
                    {format(day, 'd')}
                    
                    {/* Event dot */}
                    {hasEvent && isCurrentMonth && !astreinte && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                    )}
                    
                    {/* Conflict indicator */}
                    {conflict && isCurrentMonth && (
                      <div className="absolute top-0 right-0 w-1 h-1 rounded-full bg-destructive" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
