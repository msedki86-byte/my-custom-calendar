import { CalendarSettings } from '@/types/calendar';

interface MobileLegendProps {
  settings: CalendarSettings;
}

export function MobileLegend({ settings }: MobileLegendProps) {
  const items = [
    { label: 'Astreinte', color: settings.astreinteColor },
    { label: 'Ponctuelle', color: settings.astreintePonctuelleColor },
    { label: 'Annulée', color: settings.astreinteCancelledColor },
    { label: 'Vacances', color: settings.vacationColor },
    { label: 'Férié', color: 'hsl(0 72% 55%)' },
    { label: 'Arrêt', color: settings.arretTr2Color },
  ];

  return (
    <div className="bg-card rounded-2xl border border-border p-4">
      <h3 className="text-sm font-semibold text-muted-foreground mb-3">Légende</h3>
      <div className="grid grid-cols-3 gap-3">
        {items.map(({ label, color }) => (
          <div key={label} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-muted-foreground truncate">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
