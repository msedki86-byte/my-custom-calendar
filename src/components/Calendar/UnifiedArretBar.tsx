import { useMemo } from 'react';
import { Arret, CalendarSettings } from '@/types/calendar';
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
import { cn } from '@/lib/utils';
import { getArretColor } from '@/lib/trancheColors';
import { CollapsibleSection } from './CollapsibleSection';

interface UnifiedArretBarProps {
  arrets: Arret[];
  currentDate: Date;
  settings: CalendarSettings;
  viewMode: 'year' | 'month';
  defaultExpanded?: boolean;
}

export function UnifiedArretBar({ 
  arrets, 
  currentDate, 
  settings, 
  viewMode,
  defaultExpanded = true 
}: UnifiedArretBarProps) {
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

  const arretBars = useMemo(() => {
    return arrets
      .filter(arret => arret.startDate <= periodEnd && arret.endDate >= periodStart)
      .map(arret => {
        const displayStart = arret.startDate < periodStart ? periodStart : arret.startDate;
        const displayEnd = arret.endDate > periodEnd ? periodEnd : arret.endDate;
        
        const startDayIndex = differenceInDays(displayStart, periodStart);
        const width = differenceInDays(displayEnd, displayStart) + 1;
        
        return {
          ...arret,
          startIndex: startDayIndex,
          width,
        };
      });
  }, [arrets, periodStart, periodEnd]);

  if (arretBars.length === 0) return null;

  return (
    <CollapsibleSection 
      title="Arrêts de Tranches" 
      icon="🔧"
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

          {/* Arret bars */}
          <div className="mt-2 space-y-1">
            {arretBars.map(arret => (
              <div key={arret.id} className="relative h-6 sm:h-7">
                <div
                  className={cn(
                    "absolute h-full rounded-full flex items-center justify-center px-2 sm:px-3 text-[10px] sm:text-xs font-medium text-white shadow-sm overflow-hidden",
                    arret.type === 'prepa' && 'pattern-dots'
                  )}
                  style={{
                    left: `${(arret.startIndex / totalDays) * 100}%`,
                    width: `${(arret.width / totalDays) * 100}%`,
                    backgroundColor: arret.color || getArretColor(arret, settings),
                    minWidth: '20px',
                  }}
                  title={`${arret.name} (${arret.tranche})`}
                >
                  <span className="truncate">
                    {arret.type === 'prepa' ? '⚙️ ' : ''}{arret.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
}
