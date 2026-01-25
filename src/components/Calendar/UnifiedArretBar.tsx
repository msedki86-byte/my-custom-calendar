import { useMemo } from 'react';
import { Arret, CalendarSettings, PatternType } from '@/types/calendar';
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
import { getArretColor, getArretPattern, getModuleLabel } from '@/lib/trancheColors';
import { CollapsibleSection } from './CollapsibleSection';

interface UnifiedArretBarProps {
  arrets: Arret[];
  currentDate: Date;
  settings: CalendarSettings;
  viewMode: 'year' | 'month';
  defaultExpanded?: boolean;
}

// Pattern class mappings
const patternClasses: Record<PatternType, string> = {
  none: '',
  stripes: 'pattern-stripes-light',
  dots: 'pattern-dots',
  crosshatch: 'pattern-crosshatch',
  waves: 'pattern-waves',
  diagonal: 'pattern-diagonal',
  grid: 'pattern-grid',
  zigzag: 'pattern-zigzag',
};

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

  // Sort arrets: preparations first, then arrêts, grouped by tranche
  const arretBars = useMemo(() => {
    return arrets
      .filter(arret => arret.startDate <= periodEnd && arret.endDate >= periodStart)
      .sort((a, b) => {
        // Sort by tranche first
        if (a.tranche !== b.tranche) {
          return a.tranche.localeCompare(b.tranche);
        }
        // Then by type (prepa before arret)
        if (a.type !== b.type) {
          return a.type === 'prepa' ? -1 : 1;
        }
        // Then by start date
        return a.startDate.getTime() - b.startDate.getTime();
      })
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

          {/* Arret bars - grouped by tranche */}
          <div className="mt-2 space-y-1">
            {arretBars.map(arret => {
              const pattern = getArretPattern(arret);
              const moduleLabel = arret.module ? getModuleLabel(arret.module) : '';
              const isPrepa = arret.type === 'prepa';
              
              return (
                <div key={arret.id} className="relative h-6 sm:h-7">
                  <div
                    className={cn(
                      "absolute h-full flex items-center justify-center px-2 sm:px-3 text-[10px] sm:text-xs font-medium text-white shadow-sm overflow-hidden transition-transform hover:scale-[1.02]",
                      isPrepa ? 'rounded-md border-2 border-white/30' : 'rounded-full',
                      patternClasses[pattern]
                    )}
                    style={{
                      left: `${(arret.startIndex / totalDays) * 100}%`,
                      width: `${(arret.width / totalDays) * 100}%`,
                      backgroundColor: getArretColor(arret, settings),
                      minWidth: '24px',
                    }}
                    title={`${arret.name} (${arret.tranche})${moduleLabel ? ` - ${moduleLabel}` : ''}`}
                  >
                    <span className="truncate flex items-center gap-1">
                      {isPrepa && arret.module && (
                        <span className="bg-white/20 rounded px-1 text-[8px] sm:text-[9px]">
                          {arret.module}
                        </span>
                      )}
                      <span>{arret.name}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend for tranches */}
          <div className="mt-3 flex flex-wrap gap-2 text-[10px] sm:text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: settings.arretTr2Color }} />
              <span className="text-muted-foreground">Tr2</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: settings.arretTr3Color }} />
              <span className="text-muted-foreground">Tr3</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: settings.arretTr4Color }} />
              <span className="text-muted-foreground">Tr4</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: settings.arretTr5Color }} />
              <span className="text-muted-foreground">Tr5</span>
            </div>
            <div className="border-l border-border pl-2 flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-muted-foreground/50" />
              <span className="text-muted-foreground">AT</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-md bg-muted-foreground/50 pattern-dots" />
              <span className="text-muted-foreground">Prépa</span>
            </div>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
}