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
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarSettings, Astreinte, Holiday, Vacation, CalendarEvent, CancelledAstreinteDate, Arret } from '@/types/calendar';
import { cn } from '@/lib/utils';
import { useOrientation } from '@/hooks/useOrientation';

interface UnifiedYearViewProps {
  year: number;
  settings: CalendarSettings;
  astreintes: Astreinte[];
  vacations: Vacation[];
  arrets: Arret[];
  isAstreinteDay: (date: Date, astreintes: Astreinte[]) => Astreinte | null;
  hasConflict: (date: Date, astreintes: Astreinte[]) => boolean;
  isHoliday: (date: Date) => Holiday | null;
  isVacationDay: (date: Date) => Vacation | null;
  isArretDay: (date: Date) => Arret | null;
  isREDay: (date: Date) => CalendarEvent | null;
  isCPDay: (date: Date) => CalendarEvent | null;
  getEventsForDate: (date: Date) => CalendarEvent[];
  getNonREEventsForDate: (date: Date) => CalendarEvent[];
  isDateCancelled: (date: Date) => CancelledAstreinteDate | null;
  onMonthClick?: (date: Date) => void;
  onDayClick?: (date: Date) => void;
}

// French weekday abbreviations - explicit to avoid localization issues
const WEEKDAYS_SHORT = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

export function UnifiedYearView({
  year,
  settings,
  astreintes,
  vacations,
  arrets,
  isAstreinteDay,
  hasConflict,
  isHoliday,
  isVacationDay,
  isArretDay,
  isREDay,
  isCPDay,
  getEventsForDate,
  getNonREEventsForDate,
  isDateCancelled,
  onMonthClick,
  onDayClick,
}: UnifiedYearViewProps) {
  const { isMobileLandscape } = useOrientation();

  const months = useMemo(() => {
    const yearStart = startOfYear(new Date(year, 0, 1));
    const yearEnd = endOfYear(yearStart);
    return eachMonthOfInterval({ start: yearStart, end: yearEnd });
  }, [year]);

  // In mobile landscape mode, show 3 months per row
  const gridCols = isMobileLandscape 
    ? 'grid-cols-3' 
    : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4';

  return (
    <div className={cn("grid gap-2 sm:gap-3 lg:gap-4", gridCols)}>
      {months.map((month) => {
        const monthStart = startOfMonth(month);
        const monthEnd = endOfMonth(month);
        const calendarStart = startOfWeek(monthStart, { locale: fr, weekStartsOn: 1 });
        const calendarEnd = endOfWeek(monthEnd, { locale: fr, weekStartsOn: 1 });
        const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

        // Get context info for the month header
        const monthVacations = vacations.filter(v => 
          v.startDate <= monthEnd && v.endDate >= monthStart
        );
        const monthArrets = arrets.filter(a => 
          a.startDate <= monthEnd && a.endDate >= monthStart
        );

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

            {/* Context bars */}
            {(monthVacations.length > 0 || monthArrets.length > 0) && (
              <div className="px-1 py-0.5 bg-muted/30 space-y-0.5">
                {monthVacations.slice(0, 2).map((v, idx) => (
                  <div
                    key={`vac-${idx}`}
                    className="h-2 rounded text-[6px] text-white flex items-center justify-center truncate"
                    style={{ backgroundColor: v.color || settings.vacationColor }}
                    title={v.name}
                  >
                    {v.name}
                  </div>
                ))}
                {monthArrets.slice(0, 2).map((a, idx) => (
                  <div
                    key={`arret-${idx}`}
                    className="h-2 rounded text-[6px] text-white flex items-center justify-center truncate"
                    style={{ backgroundColor: a.color }}
                    title={a.name}
                  >
                    {a.name}
                  </div>
                ))}
              </div>
            )}

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
                const cancelled = isDateCancelled(day);
                const conflict = hasConflict(day, astreintes);
                const reDay = isREDay(day);
                const cpDay = isCPDay(day);
                const events = getNonREEventsForDate(day);
                
                // Visual priority logic
                const hasActiveAstreinte = astreinte && !astreinte.isCancelled && !cancelled;
                const showCPBackground = cpDay && !hasActiveAstreinte;
                const showREBackground = reDay && !hasActiveAstreinte && !showCPBackground;
                const hasEvents = events.length > 0;

                // Determine background color
                let cellBgColor = undefined;
                if (hasActiveAstreinte && isCurrentMonth) {
                  cellBgColor = astreinte.isPonctuelle 
                    ? settings.astreintePonctuelleColor 
                    : settings.astreinteColor;
                } else if (showCPBackground && isCurrentMonth) {
                  cellBgColor = settings.cpColor;
                } else if (showREBackground && isCurrentMonth) {
                  cellBgColor = settings.reColor;
                }

                return (
                  <button
                    key={dayIndex}
                    onClick={() => isCurrentMonth && onDayClick?.(day)}
                    disabled={!isCurrentMonth}
                    className={cn(
                      "relative aspect-square flex flex-col items-center justify-center text-[9px] sm:text-[10px] rounded-sm transition-all",
                      "touch-manipulation active:scale-95",
                      !isCurrentMonth && "opacity-20",
                      isCurrentMonth && !showREBackground && !showCPBackground && !hasActiveAstreinte && "hover:bg-accent/50",
                      isWeekendDay && isCurrentMonth && !showREBackground && !showCPBackground && !hasActiveAstreinte && "bg-muted/40",
                      isTodayDate && "ring-1 ring-primary font-bold",
                      holiday && isCurrentMonth && !hasActiveAstreinte && "text-destructive",
                      hasActiveAstreinte && isCurrentMonth && "text-white"
                    )}
                    style={cellBgColor ? { backgroundColor: cellBgColor } : undefined}
                  >
                    {format(day, 'd')}
                    
                    {/* Indicators row */}
                    {isCurrentMonth && (
                      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-px pb-0.5">
                        {/* Event indicator bar */}
                        {hasEvents && !hasActiveAstreinte && (
                          <div 
                            className="w-2 h-0.5 rounded-full"
                            style={{ backgroundColor: events[0].color }}
                          />
                        )}
                        {/* Cancelled indicator */}
                        {cancelled && (
                          <div 
                            className="w-2 h-0.5 rounded-full"
                            style={{ backgroundColor: settings.astreinteCancelledColor }}
                          />
                        )}
                      </div>
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