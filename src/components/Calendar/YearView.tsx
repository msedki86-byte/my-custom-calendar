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
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarSettings, Astreinte, Holiday, Vacation, Arret } from '@/types/calendar';
import { cn } from '@/lib/utils';

interface YearViewProps {
  year: number;
  settings: CalendarSettings;
  astreintes: Astreinte[];
  holidays: Holiday[];
  vacations: Vacation[];
  arrets: Arret[];
  onMonthClick: (date: Date) => void;
  isAstreinteDay: (date: Date, astreintes: Astreinte[]) => Astreinte | null;
  isHoliday: (date: Date) => Holiday | null;
  isVacationDay: (date: Date) => Vacation | null;
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
  isAstreinteDay,
  isHoliday,
  isVacationDay,
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
      
      return { date, days, monthArrets };
    });
  }, [year, arrets]);

  const getAstreinteForDate = (date: Date) => {
    const monthDate = new Date(date.getFullYear(), date.getMonth(), 1);
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
      {monthsData.map(({ date, days, monthArrets }) => (
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
          
          {/* Arret indicator bar */}
          {monthArrets.length > 0 && (
            <div className="flex gap-0.5 px-1 py-0.5 bg-muted/50">
              {monthArrets.slice(0, 3).map(arret => (
                <div
                  key={arret.id}
                  className="flex-1 h-1 rounded-full"
                  style={{ backgroundColor: arret.type === 'prepa' ? settings.arretPrepaColor : settings.arretColor }}
                  title={arret.name}
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
              const holiday = inMonth ? isHoliday(day) : null;
              const vacation = inMonth ? isVacationDay(day) : null;
              
              return (
                <div
                  key={index}
                  className={cn(
                    "text-[9px] h-5 flex items-center justify-center rounded-sm",
                    !inMonth && "text-muted-foreground/30",
                    inMonth && weekend && "text-muted-foreground",
                    inMonth && todayDate && "bg-primary text-primary-foreground font-bold",
                    inMonth && holiday && !todayDate && "text-holiday font-bold",
                  )}
                  style={
                    inMonth && astreinte && !astreinte.isCancelled && !todayDate
                      ? { 
                          backgroundColor: astreinte.isPonctuelle 
                            ? settings.astreintePonctuelleColor 
                            : settings.astreinteColor,
                          color: '#fff',
                        }
                      : inMonth && vacation && !todayDate && !astreinte
                        ? { backgroundColor: `${settings.vacationColor}30` }
                        : undefined
                  }
                >
                  {inMonth ? format(day, 'd') : ''}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}