import { useMemo } from 'react';
import { Arret, CalendarSettings } from '@/types/calendar';
import { 
  startOfMonth, 
  endOfMonth, 
  differenceInDays,
  format,
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { getArretColor } from '@/lib/trancheColors';

interface MobileArretBarProps {
  arrets: Arret[];
  currentDate: Date;
  settings: CalendarSettings;
  viewMode: 'year' | 'month';
}

export function MobileArretBar({ arrets, currentDate, settings, viewMode }: MobileArretBarProps) {
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
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="px-3 py-1.5 bg-muted/50 border-b border-border flex items-center gap-2">
        <span className="text-sm">🔧</span>
        <h3 className="text-xs font-semibold text-foreground">Arrêts</h3>
      </div>
      
      <div className="p-2">
        <div className="relative">
          {/* Month markers for year view */}
          {viewMode === 'year' && (
            <div className="flex mb-1">
              {eachMonthOfInterval({ start: periodStart, end: periodEnd }).map((month, index) => (
                <div 
                  key={index} 
                  className="flex-1 text-[8px] text-muted-foreground text-center border-r border-border/30 last:border-r-0"
                >
                  {format(month, 'MMM', { locale: fr })}
                </div>
              ))}
            </div>
          )}

          {/* Arret bars */}
          <div className="space-y-1">
            {arretBars.map(arret => (
              <div
                key={arret.id}
                className="relative h-5"
              >
                <div
                  className={cn(
                    "absolute h-full rounded-full flex items-center justify-center px-2 text-[10px] font-medium text-white shadow-sm overflow-hidden",
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
    </div>
  );
}
