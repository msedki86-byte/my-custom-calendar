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
  differenceInDays,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarSettings, Astreinte, Holiday, Vacation, Arret, CancelledAstreinteDate, PatternType } from '@/types/calendar';
import { cn } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';

const patternClasses: Record<PatternType, string> = {
  none: '',
  stripes: 'pattern-stripes-mini',
  dots: 'pattern-dots-mini',
  crosshatch: 'pattern-crosshatch-mini',
  waves: 'pattern-waves-mini',
};

interface YearViewProps {
  year: number;
  settings: CalendarSettings;
  astreintes: Astreinte[];
  holidays: Holiday[];
  vacations: Vacation[];
  arrets: Arret[];
  onMonthClick: (date: Date) => void;
  onDayClick: (date: Date) => void;
  isAstreinteDay: (date: Date, astreintes: Astreinte[]) => Astreinte | null;
  isDateCancelled: (date: Date) => CancelledAstreinteDate | null;
  isHoliday: (date: Date) => Holiday | null;
  isVacationDay: (date: Date) => Vacation | null;
  isArretDay: (date: Date) => Arret | null;
  hasConflict: (date: Date, astreintes: Astreinte[]) => boolean;
}

const MONTHS = Array.from({ length: 12 }, (_, i) => i);
const WEEKDAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

export function YearView({
  year,
  settings,
  astreintes,
  holidays,
  vacations,
  arrets,
  onMonthClick,
  onDayClick,
  isAstreinteDay,
  isDateCancelled,
  isHoliday,
  isVacationDay,
  isArretDay,
  hasConflict,
}: YearViewProps) {
  const monthsData = useMemo(() => {
    return MONTHS.map(month => {
      const date = new Date(year, month, 1);
      const monthStart = startOfMonth(date);
      const monthEnd = endOfMonth(date);
      const calendarStart = startOfWeek(monthStart, { locale: fr, weekStartsOn: 1 });
      const calendarEnd = endOfWeek(monthEnd, { locale: fr, weekStartsOn: 1 });
      const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
      
      // Get arrets for this month
      const monthArrets = arrets.filter(
        arret => arret.startDate <= monthEnd && arret.endDate >= monthStart
      );
      
      // Get vacations for this month
      const monthVacations = vacations.filter(
        vac => vac.startDate <= monthEnd && vac.endDate >= monthStart
      );
      
      return { date, days, monthArrets, monthVacations, monthStart, monthEnd };
    });
  }, [year, arrets, vacations]);

  const getAstreinteForDate = (date: Date) => {
    const yearStart = new Date(year, 0, 1);
    const yearEnd = new Date(year, 11, 31);
    
    // Filter relevant astreintes
    const relevantAstreintes = astreintes.filter(a => 
      a.startDate <= yearEnd && a.endDate >= yearStart
    );
    
    return isAstreinteDay(date, relevantAstreintes);
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {monthsData.map(({ date, days, monthArrets, monthVacations, monthStart, monthEnd }) => {
        // Calculate vacation bars for mini display
        const vacationBars = monthVacations.map(vac => {
          const displayStart = vac.startDate < monthStart ? monthStart : vac.startDate;
          const displayEnd = vac.endDate > monthEnd ? monthEnd : vac.endDate;
          const daysInMonth = differenceInDays(monthEnd, monthStart) + 1;
          const startDayIndex = differenceInDays(displayStart, monthStart);
          const width = differenceInDays(displayEnd, displayStart) + 1;
          
          return {
            ...vac,
            left: (startDayIndex / daysInMonth) * 100,
            width: (width / daysInMonth) * 100,
          };
        });
        
        // Calculate arret bars for mini display
        const arretBars = monthArrets.map(arret => {
          const displayStart = arret.startDate < monthStart ? monthStart : arret.startDate;
          const displayEnd = arret.endDate > monthEnd ? monthEnd : arret.endDate;
          const daysInMonth = differenceInDays(monthEnd, monthStart) + 1;
          const startDayIndex = differenceInDays(displayStart, monthStart);
          const width = differenceInDays(displayEnd, displayStart) + 1;
          
          return {
            ...arret,
            left: (startDayIndex / daysInMonth) * 100,
            width: (width / daysInMonth) * 100,
          };
        });
        
        return (
          <div
            key={date.getMonth()}
            className="bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
            onClick={() => onMonthClick(date)}
          >
            {/* Month header */}
            <div 
              className="px-3 py-2 text-center font-semibold text-white text-sm"
              style={{ backgroundColor: settings.titleWeekColor }}
            >
              {format(date, 'MMMM', { locale: fr })}
            </div>
            
            {/* Vacation indicator bar */}
            {vacationBars.length > 0 && (
              <div className="relative h-2 bg-muted/30">
                {vacationBars.map(vac => (
                  <div
                    key={vac.id}
                    className="absolute h-full"
                    style={{ 
                      left: `${vac.left}%`,
                      width: `${vac.width}%`,
                      backgroundColor: settings.vacationColor,
                    }}
                    title={vac.name}
                  />
                ))}
              </div>
            )}
            
            {/* Arret indicator bar */}
            {arretBars.length > 0 && (
              <div className="relative h-2 bg-muted/30">
                {arretBars.map(arret => (
                  <div
                    key={arret.id}
                    className={cn(
                      "absolute h-full",
                      arret.type === 'prepa' && 'opacity-70'
                    )}
                    style={{ 
                      left: `${arret.left}%`,
                      width: `${arret.width}%`,
                      backgroundColor: arret.type === 'prepa' ? settings.arretPrepaColor : settings.arretColor,
                    }}
                    title={`${arret.name} (${arret.tranche})`}
                  />
                ))}
              </div>
            )}
            
            {/* Weekday headers */}
            <div className="grid grid-cols-7 bg-muted/30">
              {WEEKDAYS.map((day, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "text-[10px] text-center py-0.5 font-medium",
                    i >= 5 ? "text-muted-foreground" : "text-foreground/70"
                  )}
                >
                  {day}
                </div>
              ))}
            </div>
            
            {/* Days grid */}
            <div className="grid grid-cols-7 gap-px p-1">
              {days.map((day, index) => {
                const inMonth = isSameMonth(day, date);
                const todayDate = isToday(day);
                const weekend = isWeekend(day);
                const astreinte = inMonth ? getAstreinteForDate(day) : null;
                const cancelledInfo = inMonth ? isDateCancelled(day) : null;
                const holiday = inMonth ? isHoliday(day) : null;
                const vacation = inMonth ? isVacationDay(day) : null;
                const arret = inMonth ? isArretDay(day) : null;
                const conflict = inMonth && astreinte ? hasConflict(day, astreintes) : false;
                
                // Determine background color and pattern
                let bgColor: string | undefined;
                let patternClass = '';
                
                if (cancelledInfo) {
                  bgColor = settings.astreinteCancelledColor;
                  patternClass = patternClasses[settings.astreinteCancelledPattern];
                } else if (astreinte && !astreinte.isCancelled) {
                  bgColor = astreinte.isPonctuelle 
                    ? settings.astreintePonctuelleColor 
                    : settings.astreinteColor;
                }
                
                return (
                  <div
                    key={index}
                    className={cn(
                      "relative text-[9px] h-6 flex flex-col items-center justify-end rounded-sm cursor-pointer hover:ring-1 hover:ring-primary/50 overflow-hidden",
                      !inMonth && "text-muted-foreground/30 pointer-events-none",
                      inMonth && weekend && "text-muted-foreground bg-muted/30",
                      inMonth && todayDate && "ring-1 ring-primary font-bold",
                      inMonth && holiday && !todayDate && "text-holiday font-bold",
                      patternClass
                    )}
                    style={
                      inMonth && bgColor && !todayDate
                        ? { backgroundColor: bgColor, color: '#fff' }
                        : undefined
                    }
                    onClick={(e) => {
                      if (inMonth) {
                        e.stopPropagation();
                        onDayClick(day);
                      }
                    }}
                  >
                    {/* Vacation bar - top */}
                    {vacation && inMonth && (
                      <div 
                        className="absolute top-0 left-0 right-0 h-[2px]"
                        style={{ backgroundColor: settings.vacationColor }}
                      />
                    )}
                    
                    {/* Arret bar - below vacation */}
                    {arret && inMonth && (
                      <div 
                        className={cn(
                          "absolute left-0 right-0 h-[2px]",
                          arret.type === 'prepa' && 'opacity-70'
                        )}
                        style={{ 
                          top: vacation ? '2px' : '0px',
                          backgroundColor: arret.type === 'prepa' ? settings.arretPrepaColor : settings.arretColor 
                        }}
                      />
                    )}
                    
                    {/* Conflict indicator */}
                    {conflict && inMonth && (
                      <div className="absolute top-0 right-0">
                        <AlertTriangle className="w-2 h-2 text-destructive" />
                      </div>
                    )}
                    
                    {/* Day number */}
                    <span className={cn(
                      (vacation || arret) && "mt-1"
                    )}>
                      {inMonth ? format(day, 'd') : ''}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
