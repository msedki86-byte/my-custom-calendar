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
  isSameDay,
  differenceInDays,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarSettings, Astreinte, Holiday, Vacation, CalendarEvent, CancelledAstreinteDate, Arret } from '@/types/calendar';
import { cn } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface UnifiedCalendarGridProps {
  currentDate: Date;
  settings: CalendarSettings;
  astreintes: Astreinte[];
  vacations: Vacation[];
  arrets: Arret[];
  isAstreinteDay: (date: Date, astreintes: Astreinte[]) => Astreinte | null;
  hasConflict: (date: Date, astreintes: Astreinte[]) => boolean;
  getConflictDetails: (date: Date, astreintes: Astreinte[]) => string[];
  isHoliday: (date: Date) => Holiday | null;
  isVacationDay: (date: Date) => Vacation | null;
  isArretDay: (date: Date) => Arret | null;
  isREDay: (date: Date) => CalendarEvent | null;
  isCPDay: (date: Date) => CalendarEvent | null;
  getEventsForDate: (date: Date) => CalendarEvent[];
  getNonREEventsForDate: (date: Date) => CalendarEvent[];
  isDateCancelled: (date: Date) => CancelledAstreinteDate | null;
  onDayClick?: (date: Date) => void;
  showWeekNumbers?: boolean;
}

const WEEKDAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

// Helper to compute bar spans for a week
function computeBarSpans(
  items: Array<{ startDate: Date; endDate: Date; name: string; color: string; id?: string }>,
  weekDays: Date[]
): Array<{ startCol: number; span: number; item: typeof items[0] }> {
  const bars: Array<{ startCol: number; span: number; item: typeof items[0] }> = [];
  
  items.forEach(item => {
    let startCol = -1;
    let span = 0;
    
    weekDays.forEach((day, index) => {
      const isWithin = day >= item.startDate && day <= item.endDate;
      if (isWithin) {
        if (startCol === -1) startCol = index;
        span++;
      }
    });
    
    if (startCol !== -1 && span > 0) {
      bars.push({ startCol, span, item });
    }
  });
  
  return bars;
}

export function UnifiedCalendarGrid({
  currentDate,
  settings,
  astreintes,
  vacations,
  arrets,
  isAstreinteDay,
  hasConflict,
  getConflictDetails,
  isHoliday,
  isVacationDay,
  isArretDay,
  isREDay,
  isCPDay,
  getEventsForDate,
  getNonREEventsForDate,
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

  // Compute vacation bars for header
  const vacationBars = useMemo(() => {
    return weeks.map(week => computeBarSpans(
      vacations.map(v => ({ ...v, color: v.color || settings.vacationColor })),
      week
    ));
  }, [weeks, vacations, settings.vacationColor]);

  // Compute arret bars for header
  const arretBars = useMemo(() => {
    return weeks.map(week => computeBarSpans(
      arrets.map(a => ({ ...a, color: a.color })),
      week
    ));
  }, [weeks, arrets]);

  // RE/CP are day states, NOT events - they should NOT have header bars
  // They only gray out the day cells (handled below in day rendering)

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
      
      {/* Calendar Weeks */}
      <div className="divide-y divide-border/50">
        {weeks.map((week, weekIndex) => {
          const weekNumber = getWeek(week[0], { locale: fr, weekStartsOn: 1 });
          const weekVacationBars = vacationBars[weekIndex] || [];
          const weekArretBars = arretBars[weekIndex] || [];
          
          // RE/CP are NOT shown as bars - they gray out day cells only
          const hasContextBars = weekVacationBars.length > 0 || weekArretBars.length > 0;
          
          return (
            <div key={weekIndex}>
              {/* Context bars above day cells */}
              {hasContextBars && (
                <div className={cn(
                  "grid bg-muted/20",
                  showWeekNumbers ? "grid-cols-8" : "grid-cols-7"
                )}>
                  {showWeekNumbers && <div className="border-r border-border" />}
                  <div className="col-span-7 relative py-1 px-0.5 space-y-0.5">
                    {/* Vacation bars */}
                    {weekVacationBars.map((bar, idx) => (
                      <div
                        key={`vac-${idx}`}
                        className="h-3 sm:h-4 rounded text-[8px] sm:text-[10px] text-white font-medium flex items-center justify-center truncate shadow-sm"
                        style={{
                          backgroundColor: bar.item.color,
                          marginLeft: `${(bar.startCol / 7) * 100}%`,
                          width: `${(bar.span / 7) * 100}%`,
                        }}
                        title={bar.item.name}
                      >
                        {bar.span >= 2 && bar.item.name}
                      </div>
                    ))}
                    {/* Arret bars */}
                    {weekArretBars.map((bar, idx) => (
                      <div
                        key={`arret-${idx}`}
                        className="h-3 sm:h-4 rounded text-[8px] sm:text-[10px] text-white font-medium flex items-center justify-center truncate shadow-sm"
                        style={{
                          backgroundColor: bar.item.color,
                          marginLeft: `${(bar.startCol / 7) * 100}%`,
                          width: `${(bar.span / 7) * 100}%`,
                        }}
                        title={bar.item.name}
                      >
                        {bar.span >= 2 && bar.item.name}
                      </div>
                    ))}
                    {/* RE/CP are NOT displayed as bars - they gray out day cells only */}
                  </div>
                </div>
              )}
              
              {/* Day cells */}
              <div className={cn(
                "grid",
                showWeekNumbers ? "grid-cols-8" : "grid-cols-7"
              )}>
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
                  const cancelled = isDateCancelled(day);
                  const conflict = hasConflict(day, astreintes);
                  const conflictDetails = conflict ? getConflictDetails(day, astreintes) : [];
                  const reDay = isREDay(day);
                  const cpDay = isCPDay(day);
                  const events = getNonREEventsForDate(day);
                  
                  // Determine visual priority:
                  // 1. Astreinte (normal or ponctuelle) takes visual priority
                  // 2. If astreinte is cancelled, show RE/CP gray if applicable
                  // 3. Otherwise RE/CP grays out the cell (CP darker than RE)
                  const hasActiveAstreinte = astreinte && !astreinte.isCancelled && !cancelled;
                  const showCPBackground = cpDay && !hasActiveAstreinte;
                  const showREBackground = reDay && !hasActiveAstreinte && !showCPBackground;

                  // Determine background color
                  let cellBgColor = undefined;
                  if (showCPBackground && isCurrentMonth) {
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
                        "relative min-h-[60px] sm:min-h-[80px] flex flex-col p-0.5 sm:p-1 transition-all duration-200 border-r border-border/30 last:border-r-0",
                        "active:scale-[0.98] touch-manipulation",
                        !isCurrentMonth && "opacity-30 bg-muted/20",
                        isCurrentMonth && !showREBackground && !showCPBackground && "hover:bg-accent/30",
                        isWeekendDay && isCurrentMonth && !showREBackground && !showCPBackground && "bg-muted/20",
                        isTodayDate && "ring-2 ring-primary ring-inset"
                      )}
                      style={cellBgColor ? { backgroundColor: cellBgColor } : undefined}
                    >
                      {/* Day Number Header */}
                      <div className="flex items-center justify-between w-full mb-0.5">
                        <span className={cn(
                          "text-[10px] sm:text-xs font-medium",
                          isTodayDate && "text-primary font-bold bg-primary/20 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center",
                          holiday && !isTodayDate && "text-destructive font-bold",
                          !isTodayDate && !holiday && isWeekendDay && "text-muted-foreground"
                        )}>
                          {format(day, 'd')}
                        </span>
                        
                        {/* Conflict indicator */}
                        {conflict && isCurrentMonth && (
                          <Popover>
                            <PopoverTrigger asChild>
                              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-destructive rounded-full flex items-center justify-center cursor-pointer animate-pulse">
                                <AlertTriangle className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" />
                              </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-64 p-3">
                              <div className="text-sm font-semibold text-destructive mb-2">Conflits détectés</div>
                              <ul className="text-xs space-y-1">
                                {conflictDetails.map((detail, i) => (
                                  <li key={i} className="text-muted-foreground">• {detail}</li>
                                ))}
                              </ul>
                            </PopoverContent>
                          </Popover>
                        )}
                      </div>

                      {/* Holiday name */}
                      {holiday && isCurrentMonth && (
                        <div className="text-[8px] sm:text-[10px] text-destructive font-medium truncate w-full mb-0.5">
                          {holiday.name}
                        </div>
                      )}

                      {/* Full cell for astreintes, otherwise event bars */}
                      <div className="flex-1 w-full flex flex-col overflow-hidden">
                        {/* Astreinte - takes full cell */}
                        {hasActiveAstreinte && isCurrentMonth && (
                          <div 
                            className="flex-1 rounded text-[7px] sm:text-[9px] text-white font-medium flex items-center justify-center truncate min-h-[24px] sm:min-h-[32px]"
                            style={{ 
                              backgroundColor: astreinte.isPonctuelle 
                                ? settings.astreintePonctuelleColor 
                                : settings.astreinteColor 
                            }}
                          >
                            {astreinte.isPonctuelle ? 'Ponct.' : 'Astreinte'}
                          </div>
                        )}
                        
                        {/* Cancelled astreinte - with pattern */}
                        {cancelled && isCurrentMonth && !hasActiveAstreinte && (
                          <div 
                            className="flex-1 rounded text-[7px] sm:text-[9px] text-white font-medium flex items-center justify-center truncate min-h-[24px] sm:min-h-[32px] pattern-crosshatch"
                            style={{ backgroundColor: settings.astreinteCancelledColor }}
                          >
                            {cancelled.name}
                          </div>
                        )}
                        
                        {/* Event bars (non-RE/CP) - only if no full-cell astreinte */}
                        {!hasActiveAstreinte && !cancelled && (
                          <div className="space-y-0.5">
                            {events.slice(0, 2).map((event, idx) => (
                              <div 
                                key={event.id || idx}
                                className="h-3 sm:h-4 rounded text-[7px] sm:text-[9px] text-white font-medium flex items-center px-1 truncate"
                                style={{ backgroundColor: event.color }}
                              >
                                {event.name}
                              </div>
                            ))}
                            
                            {/* More events indicator */}
                            {events.length > 2 && isCurrentMonth && (
                              <div className="text-[8px] text-muted-foreground">
                                +{events.length - 2} autres
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}