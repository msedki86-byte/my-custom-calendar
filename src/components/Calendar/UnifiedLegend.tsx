import { CalendarSettings } from '@/types/calendar';
import { CollapsibleSection } from './CollapsibleSection';
import { cn } from '@/lib/utils';

interface UnifiedLegendProps {
  settings: CalendarSettings;
  defaultExpanded?: boolean;
}

export function UnifiedLegend({ settings, defaultExpanded = true }: UnifiedLegendProps) {
  const items = [
    { label: 'Astreinte', color: settings.astreinteColor, pattern: false },
    { label: 'Astr. ponctuelle', color: settings.astreintePonctuelleColor, pattern: false },
    { label: 'Astr. annulée', color: settings.astreinteCancelledColor, pattern: true, patternClass: 'pattern-crosshatch' },
    { label: 'Événement', color: settings.eventColor, pattern: false },
    { label: 'RE (Repos)', color: settings.reColor, pattern: false },
    { label: 'Vacances', color: settings.vacationColor, pattern: false },
    { label: 'Jour férié', color: '#ef4444', pattern: true, patternClass: 'pattern-stripes' },
    { label: 'Arrêt Tr2', color: settings.arretTr2Color, pattern: false },
    { label: 'Arrêt Tr3', color: settings.arretTr3Color, pattern: false },
    { label: 'Arrêt Tr4', color: settings.arretTr4Color, pattern: false },
    { label: 'Arrêt Tr5', color: settings.arretTr5Color, pattern: false },
    { label: 'Prépa', color: settings.prepaTr2Color, pattern: true, patternClass: 'pattern-dots' },
  ];

  return (
    <CollapsibleSection 
      title="Légende" 
      icon="📋"
      defaultExpanded={defaultExpanded}
    >
      <div className="p-3 sm:p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
          {items.map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <div 
                className={cn(
                  "w-3 h-3 sm:w-4 sm:h-4 rounded flex-shrink-0",
                  item.pattern && item.patternClass
                )}
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[10px] sm:text-xs text-muted-foreground truncate">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </CollapsibleSection>
  );
}
