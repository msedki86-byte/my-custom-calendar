import { CalendarSettings, modulePatterns, PatternType } from '@/types/calendar';
import { CollapsibleSection } from './CollapsibleSection';
import { cn } from '@/lib/utils';

interface UnifiedLegendProps {
  settings: CalendarSettings;
  defaultExpanded?: boolean;
}

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

export function UnifiedLegend({ settings, defaultExpanded = true }: UnifiedLegendProps) {
  // Main event types
  const mainItems = [
    { label: 'Astreinte', color: settings.astreinteColor, pattern: 'none' as PatternType },
    { label: 'Astr. ponctuelle', color: settings.astreintePonctuelleColor, pattern: 'none' as PatternType },
    { label: 'Astr. annulée', color: settings.astreinteCancelledColor, pattern: 'crosshatch' as PatternType },
    { label: 'Événement', color: settings.eventColor, pattern: 'none' as PatternType },
    { label: 'RE (Repos)', color: settings.reColor, pattern: 'none' as PatternType },
    { label: 'CP (Congés)', color: settings.cpColor, pattern: 'none' as PatternType },
    { label: 'Vacances', color: settings.vacationColor, pattern: 'none' as PatternType },
    { label: 'Jour férié', color: '#ef4444', pattern: 'stripes' as PatternType },
  ];

  // Tranche colors (AT uses solid colors)
  const trancheItems = [
    { label: 'AT Tr2', color: settings.arretTr2Color },
    { label: 'AT Tr3', color: settings.arretTr3Color },
    { label: 'AT Tr4', color: settings.arretTr4Color },
    { label: 'AT Tr5', color: settings.arretTr5Color },
  ];

  // Module patterns (for preparations)
  const moduleItems = [
    { label: 'M0', pattern: modulePatterns.M0 },
    { label: 'M1', pattern: modulePatterns.M1 },
    { label: 'M2A', pattern: modulePatterns.M2A },
    { label: 'M2B', pattern: modulePatterns.M2B },
    { label: 'M3', pattern: modulePatterns.M3 },
    { label: 'M4', pattern: modulePatterns.M4 },
  ];

  return (
    <CollapsibleSection 
      title="Légende" 
      icon="📋"
      defaultExpanded={defaultExpanded}
    >
      <div className="p-3 sm:p-4 space-y-3">
        {/* Main event types */}
        <div>
          <h4 className="text-[10px] sm:text-xs font-medium text-muted-foreground mb-2">Événements</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
            {mainItems.map(item => (
              <div key={item.label} className="flex items-center gap-2">
                <div 
                  className={cn(
                    "w-3 h-3 sm:w-4 sm:h-4 rounded flex-shrink-0",
                    item.pattern !== 'none' && patternClasses[item.pattern]
                  )}
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[10px] sm:text-xs text-muted-foreground truncate">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tranche colors */}
        <div>
          <h4 className="text-[10px] sm:text-xs font-medium text-muted-foreground mb-2">Arrêts de Tranches (couleurs)</h4>
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {trancheItems.map(item => (
              <div key={item.label} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[10px] sm:text-xs text-muted-foreground truncate">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Module patterns */}
        <div>
          <h4 className="text-[10px] sm:text-xs font-medium text-muted-foreground mb-2">Modules de préparation (patterns)</h4>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
            {moduleItems.map(item => (
              <div key={item.label} className="flex items-center gap-2">
                <div 
                  className={cn(
                    "w-3 h-3 sm:w-4 sm:h-4 rounded-md flex-shrink-0 bg-muted-foreground/60",
                    patternClasses[item.pattern]
                  )}
                />
                <span className="text-[10px] sm:text-xs text-muted-foreground truncate">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
}