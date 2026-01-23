import { useMemo } from 'react';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isWeekend,
  format,
  getWeek,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarSettings, Astreinte, Holiday, Vacation, CalendarEvent, CancelledAstreinteDate, Arret } from '@/types/calendar';
import { cn } from '@/lib/utils';

interface UnifiedCalendarGridProps {
  currentDate: Date;
  settings: CalendarSettings;
  astreintes: Astreinte[];
  isAstreinteDay: (date: Date, astreintes: Astreinte[]) => Astreinte | null;
  hasConflict: (date: Date, astreintes: Astreinte[]) => boolean;
  isHoliday: (date: Date) => Holiday | null;
  isVacationDay: (date: Date) => Vacation | null;
  isArretDay: (date: Date) => Arret | null;
  getEventsForDate: (date: Date) => CalendarEvent[];
  isDateCancelled: (date: Date) => CancelledAstreinteDate | null;
  onDayClick?: (date: Date) => void;
  showWeekNumbers?: boolean;
}

const WEEKDAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

export function UnifiedCalendarGrid({
  currentDate,
  settings,
  astreintes,
  isAstreinteDay,
  hasConflict,
  isHoliday,
  isVacationDay,
  isArretDay,
  getEventsForDate,
  isDateCancelled,
  onDayClick,
  showWeekNumbers = true,
}: UnifiedCalendarGridProps) {
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart, { locale: fr, weekStartsOn: 1 });
    const calendarEnd = endOfWeek(monthEnd, { locale: fr, weekStartsOn: 1 });
    
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [currentDate]);

  // Group days by weeks
  const weeks = useMemo(() => {
    const result: Date[][] = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      result.push(calendarDays.slice(i, i + 7));
    }
    return result;
  }, [calendarDays]);

  return (
    <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
      {/* Weekday Headers */}
      <div className={cn(
        "grid bg-muted/50",
        showWeekNumbers ? "grid-cols-8" : "grid-cols-7"
      )}>
        {showWeekNumbers && (
          <div className="py-2 sm:py-3 text-center text-[10px] sm:text-xs font-semibold text-muted-foreground border-r border-border">
            S.
          </div>
        )}
        {WEEKDAYS.map((day, index) => (
          <div 
            key={day} 
            className={cn(
              "py-2 sm:py-3 text-center text-[10px] sm:text-xs font-semibold text-muted-foreground",
              index >= 5 && "text-primary/70"
            )}
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Days */}
      <div className="divide-y divide-border/50">
        {weeks.map((week, weekIndex) => {
          const weekNumber = getWeek(week[0], { locale: fr, weekStartsOn: 1 });
          
          return (
            <div 
              key={weekIndex} 
              className={cn(
                "grid",
                showWeekNumbers ? "grid-cols-8" : "grid-cols-7"
              )}
            >
              {/* Week number */}
              {showWeekNumbers && (
                <div className="flex items-center justify-center text-[10px] sm:text-xs font-medium text-muted-foreground bg-muted/30 border-r border-border">
                  {weekNumber}
                </div>
              )}
              
              {week.map((day, dayIndex) => {
                const isCurrentMonth = isSameMonth(day, currentDate);
                const isTodayDate = isToday(day);
                const isWeekendDay = isWeekend(day);
                const astreinte = isAstreinteDay(day, astreintes);
                const holiday = isHoliday(day);
                const vacation = isVacationDay(day);
                const arret = isArretDay(day);
                const events = getEventsForDate(day);
                const cancelled = isDateCancelled(day);
                const conflict = hasConflict(day, astreintes);
                
                const hasIndicator = astreinte || holiday || vacation || arret || events.length > 0;

                return (
                  <button
                    key={dayIndex}
                    onClick={() => isCurrentMonth && onDayClick?.(day)}
                    disabled={!isCurrentMonth}
                    className={cn(
                      "relative aspect-square sm:aspect-[4/3] flex flex-col items-center justify-center p-0.5 sm:p-1 transition-all duration-200",
                      "active:scale-95 touch-manipulation",
                      !isCurrentMonth && "opacity-30",
                      isCurrentMonth && "hover:bg-accent/50",
                      isWeekendDay && isCurrentMonth && "bg-muted/30",
                      isTodayDate && "ring-2 ring-primary ring-inset bg-primary/10"
                    )}
                  >
                    {/* Day Number */}
                    <span className={cn(
                      "text-xs sm:text-sm font-medium z-10",
                      isTodayDate && "text-primary font-bold",
                      holiday && "text-destructive font-bold",
                      !isTodayDate && !holiday && isWeekendDay && "text-muted-foreground",
                      astreinte && !astreinte.isCancelled && !cancelled && "text-white"
                    )}>
                      {format(day, 'd')}
                    </span>

                    {/* Indicators */}
                    {isCurrentMonth && hasIndicator && (
                      <div className="flex gap-0.5 mt-0.5 flex-wrap justify-center max-w-full">
                        {/* Astreinte indicator */}
                        {astreinte && !astreinte.isCancelled && !cancelled && (
                          <div 
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: astreinte.isPonctuelle ? settings.astreintePonctuelleColor : settings.astreinteColor }}
                          />
                        )}
                        {/* Cancelled indicator */}
                        {(cancelled || astreinte?.isCancelled) && (
                          <div 
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: settings.astreinteCancelledColor }}
                          />
                        )}
                        {/* Event indicator */}
                        {events.length > 0 && (
                          <div 
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: events[0].color }}
                          />
                        )}
                        {/* Vacation indicator */}
                        {vacation && (
                          <div 
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: settings.vacationColor }}
                          />
                        )}
                        {/* Arret indicator */}
                        {arret && (
                          <div 
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: arret.color || '#22c55e' }}
                          />
                        )}
                      </div>
                    )}

                    {/* Holiday indicator - subtle background */}
                    {holiday && isCurrentMonth && (
                      <div className="absolute inset-0.5 rounded-lg opacity-20 bg-destructive" />
                    )}

                    {/* Astreinte background */}
                    {astreinte && !astreinte.isCancelled && !cancelled && isCurrentMonth && (
                      <div 
                        className="absolute inset-0.5 rounded-lg opacity-80"
                        style={{ backgroundColor: astreinte.isPonctuelle ? settings.astreintePonctuelleColor : settings.astreinteColor }}
                      />
                    )}

                    {/* Conflict badge */}
                    {conflict && isCurrentMonth && (
                      <div className="absolute top-0.5 right-0.5 w-2 h-2 bg-destructive rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
