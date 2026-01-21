import { useMemo } from 'react';
import { format, eachDayOfInterval } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarEvent, Astreinte, CalendarSettings } from '@/types/calendar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle } from 'lucide-react';

interface ConflictsListProps {
  events: CalendarEvent[];
  astreintes: Astreinte[];
  settings: CalendarSettings;
  year: number;
}

interface ConflictItem {
  date: Date;
  astreinte: Astreinte;
  eventName: string;
}

export function ConflictsList({
  events,
  astreintes,
  year,
}: ConflictsListProps) {
  const conflicts = useMemo(() => {
    const result: ConflictItem[] = [];
    const yearStart = new Date(year, 0, 1);
    const yearEnd = new Date(year, 11, 31);

    // For each astreinte period - only check events (not vacations, holidays, or arrets)
    astreintes.forEach(astreinte => {
      if (astreinte.isCancelled) return;
      
      const astreinteStart = astreinte.startDate < yearStart ? yearStart : astreinte.startDate;
      const astreinteEnd = astreinte.endDate > yearEnd ? yearEnd : astreinte.endDate;
      
      if (astreinteStart > yearEnd || astreinteEnd < yearStart) return;

      const days = eachDayOfInterval({ start: astreinteStart, end: astreinteEnd });

      days.forEach(day => {
        // Check events only (not vacations, holidays, or arrets)
        events.forEach(event => {
          if (day >= event.startDate && day <= event.endDate) {
            result.push({
              date: day,
              astreinte,
              eventName: event.name,
            });
          }
        });
      });
    });

    // Sort by date
    return result.sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [events, astreintes, year]);

  if (conflicts.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-30" />
        <p className="text-lg font-medium">Aucun conflit détecté</p>
        <p className="text-sm">Tous les événements sont compatibles avec les astreintes.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-destructive">
        <AlertTriangle className="w-5 h-5" />
        <h3 className="font-semibold">{conflicts.length} conflit(s) détecté(s) en {year}</h3>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Conflit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {conflicts.map((conflict, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {format(conflict.date, 'd MMMM yyyy', { locale: fr })}
              </TableCell>
              <TableCell>
                <span className="text-primary font-medium">{conflict.eventName}</span>
                <span className="text-muted-foreground mx-2">/</span>
                <span className="text-orange-600 font-medium">Astreinte</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
