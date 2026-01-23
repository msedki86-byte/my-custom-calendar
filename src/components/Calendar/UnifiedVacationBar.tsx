import { useMemo } from 'react';
import { Vacation, CalendarSettings } from '@/types/calendar';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfYear,
  endOfYear,
  eachDayOfInterval, 
  eachMonthOfInterval,
  differenceInDays,
  format,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { CollapsibleSection } from './CollapsibleSection';

interface UnifiedVacationBarProps {
  vacations: Vacation[];
  currentDate: Date;
  settings: CalendarSettings;
  viewMode: 'year' | 'month';
  defaultExpanded?: boolean;
}

export function UnifiedVacationBar({ 
  vacations, 
  currentDate, 
  settings, 
  viewMode,
  defaultExpanded = true 
}: UnifiedVacationBarProps) {
  const { periodStart, periodEnd, totalDays } = useMemo(() => {
    if (viewMode === 'year') {
      const start = startOfYear(currentDate);
      const end = endOfYear(currentDate);
      return { periodStart: start, periodEnd: end, totalDays: differenceInDays(end, start) + 1 };
    } else {
      const start = startOfMonth(currentDate);
      const end = endOfMonth(currentDate);
      return { periodStart: start, periodEnd: end, totalDays: differenceInDays(end, start) + 1 };
    }
  }, [currentDate, viewMode]);

  const daysInPeriod = useMemo(() => 
    eachDayOfInterval({ start: periodStart, end: periodEnd }), 
    [periodStart, periodEnd]
  );

  const vacationBars = useMemo(() => {
    return vacations
      .filter(vac => vac.startDate <= periodEnd && vac.endDate >= periodStart)
      .map(vac => {
        const displayStart = vac.startDate < periodStart ? periodStart : vac.startDate;
        const displayEnd = vac.endDate > periodEnd ? periodEnd : vac.endDate;
        
        const startDayIndex = differenceInDays(displayStart, periodStart);
        const width = differenceInDays(displayEnd, displayStart) + 1;
        
        return {
          ...vac,
          startIndex: startDayIndex,
          width,
        };
      });
  }, [vacations, periodStart, periodEnd]);

  if (vacationBars.length === 0) return null;

  return (
    <CollapsibleSection 
      title="Vacances Scolaires" 
      icon="🏖️"
      defaultExpanded={defaultExpanded}
      className="mb-3"
    >
      <div className="p-3 sm:p-4">
        <div className="relative">
          {/* Grid background with day/month markers */}
          {viewMode === 'year' ? (
            <div className="flex mb-1">
              {eachMonthOfInterval({ start: periodStart, end: periodEnd }).map((month, index) => (
                <div 
                  key={index} 
                  className="flex-1 text-[8px] sm:text-[10px] text-muted-foreground text-center border-r border-border/30 last:border-r-0"
                >
                  {format(month, 'MMM', { locale: fr })}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-px" style={{ gridTemplateColumns: `repeat(${daysInPeriod.length}, 1fr)` }}>
              {daysInPeriod.map((day, index) => (
                <div 
                  key={index} 
                  className="h-4 bg-muted/30 text-[7px] sm:text-[8px] text-muted-foreground text-center"
                >
                  {format(day, 'd')}
                </div>
              ))}
            </div>
          )}

          {/* Vacation bars */}
          <div className="mt-2 space-y-1">
            {vacationBars.map(vac => (
              <div key={vac.id} className="relative h-6 sm:h-7">
                <div
                  className="absolute h-full rounded-full flex items-center justify-center px-2 sm:px-3 text-[10px] sm:text-xs font-medium text-white shadow-sm overflow-hidden"
                  style={{
                    left: `${(vac.startIndex / totalDays) * 100}%`,
                    width: `${(vac.width / totalDays) * 100}%`,
                    backgroundColor: settings.vacationColor,
                    minWidth: '20px',
                  }}
                  title={vac.name}
                >
                  <span className="truncate">{vac.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
}
