import { useMemo } from 'react';
import { format, eachDayOfInterval } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarEvent, Astreinte, Vacation, Holiday, CalendarSettings } from '@/types/calendar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

interface ConflictsListProps {
  events: CalendarEvent[];
  vacations: Vacation[];
  holidays: Holiday[];
  astreintes: Astreinte[];
  settings: CalendarSettings;
  year: number;
}

interface ConflictItem {
  date: Date;
  astreinte: Astreinte;
  conflictType: 'event' | 'vacation' | 'holiday';
  conflictName: string;
}

export function ConflictsList({
  events,
  vacations,
  holidays,
  astreintes,
  settings,
  year,
}: ConflictsListProps) {
  const conflicts = useMemo(() => {
    const result: ConflictItem[] = [];
    const yearStart = new Date(year, 0, 1);
    const yearEnd = new Date(year, 11, 31);

    // For each astreinte period
    astreintes.forEach(astreinte => {
      if (astreinte.isCancelled) return;
      
      const astreinteStart = astreinte.startDate < yearStart ? yearStart : astreinte.startDate;
      const astreinteEnd = astreinte.endDate > yearEnd ? yearEnd : astreinte.endDate;
      
      if (astreinteStart > yearEnd || astreinteEnd < yearStart) return;

      const days = eachDayOfInterval({ start: astreinteStart, end: astreinteEnd });

      days.forEach(day => {
        // Check events
        events.forEach(event => {
          if (day >= event.startDate && day <= event.endDate) {
            result.push({
              date: day,
              astreinte,
              conflictType: 'event',
              conflictName: event.name,
            });
          }
        });

        // Check vacations
        vacations.forEach(vacation => {
          if (day >= vacation.startDate && day <= vacation.endDate) {
            result.push({
              date: day,
              astreinte,
              conflictType: 'vacation',
              conflictName: vacation.name,
            });
          }
        });

        // Check holidays
        holidays.forEach(holiday => {
          if (
            day.getFullYear() === holiday.date.getFullYear() &&
            day.getMonth() === holiday.date.getMonth() &&
            day.getDate() === holiday.date.getDate()
          ) {
            result.push({
              date: day,
              astreinte,
              conflictType: 'holiday',
              conflictName: holiday.name,
            });
          }
        });
      });
    });

    // Sort by date
    return result.sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [events, vacations, holidays, astreintes, year]);

  const getConflictTypeBadge = (type: 'event' | 'vacation' | 'holiday') => {
    switch (type) {
      case 'event':
        return <Badge variant="default">Événement</Badge>;
      case 'vacation':
        return <Badge variant="secondary" style={{ backgroundColor: settings.vacationColor, color: '#fff' }}>Vacances</Badge>;
      case 'holiday':
        return <Badge variant="outline">Férié</Badge>;
    }
  };

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
            <TableHead>Période d'astreinte</TableHead>
            <TableHead>Type de conflit</TableHead>
            <TableHead>Élément en conflit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {conflicts.map((conflict, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {format(conflict.date, 'EEEE d MMMM yyyy', { locale: fr })}
              </TableCell>
              <TableCell>
                {format(conflict.astreinte.startDate, 'dd/MM')} - {format(conflict.astreinte.endDate, 'dd/MM')}
                {conflict.astreinte.isPonctuelle && (
                  <Badge variant="outline" className="ml-2">Ponctuelle</Badge>
                )}
              </TableCell>
              <TableCell>
                {getConflictTypeBadge(conflict.conflictType)}
              </TableCell>
              <TableCell>{conflict.conflictName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
