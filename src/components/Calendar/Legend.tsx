import { CalendarSettings } from '@/types/calendar';

interface LegendProps {
  settings: CalendarSettings;
}

export function Legend({ settings }: LegendProps) {
  const items = [
    { label: 'Astreinte', color: settings.astreinteColor, pattern: false },
    { label: 'Astreinte ponctuelle', color: settings.astreintePonctuelleColor, pattern: false },
    { label: 'Astreinte annulée', color: settings.astreinteCancelledColor, pattern: true, patternClass: 'pattern-crosshatch' },
    { label: 'Événement', color: '#00AEEF', pattern: false },
    { label: 'Vacances scolaires', color: settings.vacationColor, pattern: false },
    { label: 'Jour férié', color: settings.holidayPattern === 'none' ? '#ef4444' : '#ef4444', pattern: true, patternClass: 'pattern-stripes' },
    { label: 'Arrêt Tr2', color: settings.arretTr2Color, pattern: false },
    { label: 'Arrêt Tr3', color: settings.arretTr3Color, pattern: false },
    { label: 'Arrêt Tr4', color: settings.arretTr4Color, pattern: false },
    { label: 'Arrêt Tr5', color: settings.arretTr5Color, pattern: false },
    { label: 'Prépa', color: settings.prepaTr2Color, pattern: true, patternClass: 'pattern-dots' },
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-4 shadow-calendar">
      <h3 className="text-sm font-semibold text-foreground mb-3">Légende</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map(item => (
          <div key={item.label} className="flex items-center gap-2">
            <div 
              className={`w-4 h-4 rounded ${item.pattern ? item.patternClass : ''}`}
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
