import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarEvent, Vacation, Arret, Holiday, Astreinte, CancelledAstreinteDate, PatternType } from '@/types/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { isWeekend, eachDayOfInterval } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Trash2, X, Check, Plus, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sort types
type SortField = 'date' | 'name' | 'tranche' | 'module';
type SortDirection = 'asc' | 'desc';

type NewEventType = 'event' | 're' | 'cp';

const patterns: { value: PatternType; label: string }[] = [
  { value: 'none', label: 'Aucun' },
  { value: 'stripes', label: 'Rayures' },
  { value: 'dots', label: 'Points' },
  { value: 'crosshatch', label: 'Croisillons' },
  { value: 'waves', label: 'Lignes' },
  { value: 'diagonal', label: 'Diagonales' },
  { value: 'grid', label: 'Grille' },
  { value: 'zigzag', label: 'Zigzag' },
];

const patternClasses: Record<PatternType, string> = {
  none: '',
  stripes: 'pattern-stripes',
  dots: 'pattern-dots',
  crosshatch: 'pattern-crosshatch',
  waves: 'pattern-waves',
  diagonal: 'pattern-diagonal',
  grid: 'pattern-grid',
  zigzag: 'pattern-zigzag',
};

interface EventsManagerProps {
  events: CalendarEvent[];
  vacations: Vacation[];
  arrets: Arret[];
  holidays: Holiday[];
  ponctualAstreintes: Astreinte[];
  cancelledAstreinteDates: CancelledAstreinteDate[];
  onUpdateEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  onDeleteEvent: (id: string) => void;
  onUpdateVacation: (id: string, updates: Partial<Vacation>) => void;
  onDeleteVacation: (id: string) => void;
  onUpdateArret: (id: string, updates: Partial<Arret>) => void;
  onDeleteArret: (id: string) => void;
  onUpdateHoliday: (date: Date, updates: Partial<Holiday>) => void;
  onDeleteHoliday: (date: Date) => void;
  onRemovePonctualAstreinte: (id: string) => void;
  onUpdatePonctualAstreinte: (id: string, updates: Partial<Astreinte>) => void;
  onRestoreCancelledDate: (id: string) => void;
  onAddVacation: (vacation: Omit<Vacation, 'id'>) => void;
  onAddArret: (arret: Omit<Arret, 'id'>) => void;
  onAddHoliday: (holiday: Holiday) => void;
  onAddPonctualAstreinte: (startDate: Date, endDate: Date, name?: string) => void;
  onCancelAstreinteDates: (startDate: Date, endDate: Date, name: string, startTime?: string, endTime?: string) => void;
  onAddEvent?: (event: Omit<CalendarEvent, 'id'>) => void;
}

interface EditingState {
  id: string;
  field: string;
  value: any;
}

export function EventsManager({
  events,
  vacations,
  arrets,
  holidays,
  ponctualAstreintes,
  cancelledAstreinteDates,
  onUpdateEvent,
  onDeleteEvent,
  onUpdateVacation,
  onDeleteVacation,
  onUpdateArret,
  onDeleteArret,
  onUpdateHoliday,
  onDeleteHoliday,
  onRemovePonctualAstreinte,
  onUpdatePonctualAstreinte,
  onRestoreCancelledDate,
  onAddVacation,
  onAddArret,
  onAddHoliday,
  onAddPonctualAstreinte,
  onCancelAstreinteDates,
  onAddEvent,
}: EventsManagerProps) {
  const [editing, setEditing] = useState<EditingState | null>(null);
  const [addingNew, setAddingNew] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<any>({});
  
  // Sorting states for different tabs
  const [arretSort, setArretSort] = useState<{ field: SortField; direction: SortDirection }>({ field: 'date', direction: 'asc' });
  const [eventSort, setEventSort] = useState<{ field: SortField; direction: SortDirection }>({ field: 'date', direction: 'asc' });
  const [vacationSort, setVacationSort] = useState<{ field: SortField; direction: SortDirection }>({ field: 'date', direction: 'asc' });

  const formatDate = (date: Date) => format(date, 'dd/MM/yyyy', { locale: fr });

  // Sorted arrets
  const sortedArrets = useMemo(() => {
    return [...arrets].sort((a, b) => {
      const direction = arretSort.direction === 'asc' ? 1 : -1;
      switch (arretSort.field) {
        case 'date':
          return direction * (a.startDate.getTime() - b.startDate.getTime());
        case 'name':
          return direction * a.name.localeCompare(b.name);
        case 'tranche':
          return direction * a.tranche.localeCompare(b.tranche);
        case 'module':
          return direction * (a.module || '').localeCompare(b.module || '');
        default:
          return 0;
      }
    });
  }, [arrets, arretSort]);

  // Sorted events (excluding RE/CP)
  const sortedEvents = useMemo(() => {
    const filteredEvents = events.filter(e => e.type !== 're' && e.type !== 'cp');
    return [...filteredEvents].sort((a, b) => {
      const direction = eventSort.direction === 'asc' ? 1 : -1;
      switch (eventSort.field) {
        case 'date':
          return direction * (a.startDate.getTime() - b.startDate.getTime());
        case 'name':
          return direction * a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [events, eventSort]);

  // Sorted vacations
  const sortedVacations = useMemo(() => {
    return [...vacations].sort((a, b) => {
      const direction = vacationSort.direction === 'asc' ? 1 : -1;
      switch (vacationSort.field) {
        case 'date':
          return direction * (a.startDate.getTime() - b.startDate.getTime());
        case 'name':
          return direction * a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [vacations, vacationSort]);

  // Sorted absences (RE + CP)
  const [absenceSort, setAbsenceSort] = useState<{ field: SortField; direction: SortDirection }>({ field: 'date', direction: 'asc' });
  const sortedAbsences = useMemo(() => {
    return events.filter(e => e.type === 're' || e.type === 'cp').sort((a, b) => {
      const direction = absenceSort.direction === 'asc' ? 1 : -1;
      switch (absenceSort.field) {
        case 'date':
          return direction * (a.startDate.getTime() - b.startDate.getTime());
        case 'name':
          return direction * a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [events, absenceSort]);

  // Toggle sort helper
  const toggleSort = (
    currentSort: { field: SortField; direction: SortDirection },
    setSort: (s: { field: SortField; direction: SortDirection }) => void,
    field: SortField
  ) => {
    if (currentSort.field === field) {
      setSort({ field, direction: currentSort.direction === 'asc' ? 'desc' : 'asc' });
    } else {
      setSort({ field, direction: 'asc' });
    }
  };

  // Sort button component
  const SortButton = ({ 
    field, 
    label, 
    currentSort, 
    setSort 
  }: { 
    field: SortField; 
    label: string; 
    currentSort: { field: SortField; direction: SortDirection };
    setSort: (s: { field: SortField; direction: SortDirection }) => void;
  }) => (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "h-8 px-2 text-xs font-medium",
        currentSort.field === field && "text-primary"
      )}
      onClick={() => toggleSort(currentSort, setSort, field)}
    >
      {label}
      <ArrowUpDown className="ml-1 h-3 w-3" />
      {currentSort.field === field && (
        <span className="ml-1 text-[10px]">
          {currentSort.direction === 'asc' ? '↑' : '↓'}
        </span>
      )}
    </Button>
  );

  const handleAddNew = (type: string) => {
    if (type === 'vacation') {
      onAddVacation({
        name: newItem.name || 'Nouvelle période',
        startDate: newItem.startDate || new Date(),
        endDate: newItem.endDate || new Date(),
        color: newItem.color || '#a855f7',
      });
    } else if (type === 'arret') {
      onAddArret({
        type: newItem.arretType || 'arret',
        name: newItem.name || 'Nouvel arrêt',
        startDate: newItem.startDate || new Date(),
        endDate: newItem.endDate || new Date(),
        pattern: newItem.pattern || 'none',
        tranche: newItem.tranche || 'Tr2',
        module: newItem.module,
      });
    } else if (type === 'holiday') {
      onAddHoliday({
        date: newItem.date || new Date(),
        name: newItem.name || 'Nouveau férié',
      });
    } else if (type === 'ponctual') {
      onAddPonctualAstreinte(
        newItem.startDate || new Date(),
        newItem.endDate || new Date(),
        newItem.name || 'Astreinte ponctuelle'
      );
    } else if (type === 'cancelled') {
      if (newItem.startDate && newItem.endDate && newItem.name) {
        onCancelAstreinteDates(newItem.startDate, newItem.endDate, newItem.name, newItem.startTime || '00:00', newItem.endTime || '23:59');
      }
    } else if (type === 'event' && onAddEvent) {
      const eventType = (newItem.eventType as 'event' | 're' | 'cp') || 'event';
      const eventName = newItem.name || 'Nouvel événement';
      const startDate = newItem.startDate || new Date();
      const endDate = newItem.endDate || new Date();
      const color = newItem.color || '#0ea5e9';
      
      if (newItem.excludeWeekends && startDate.getTime() !== endDate.getTime()) {
        const days = eachDayOfInterval({ start: startDate, end: endDate });
        const weekdays = days.filter(d => !isWeekend(d));
        let rangeStart: Date | null = null;
        let rangeEnd: Date | null = null;
        weekdays.forEach((day, i) => {
          if (!rangeStart) { rangeStart = day; rangeEnd = day; return; }
          const prevDay = weekdays[i - 1];
          const diff = (day.getTime() - prevDay.getTime()) / (1000 * 60 * 60 * 24);
          if (diff === 1) { rangeEnd = day; } else {
            onAddEvent({ type: eventType, name: eventName, startDate: rangeStart, endDate: rangeEnd!, color, startTime: newItem.startTime, endTime: newItem.endTime });
            rangeStart = day; rangeEnd = day;
          }
        });
        if (rangeStart && rangeEnd) {
          onAddEvent({ type: eventType, name: eventName, startDate: rangeStart, endDate: rangeEnd, color, startTime: newItem.startTime, endTime: newItem.endTime });
        }
      } else {
        onAddEvent({ type: eventType, name: eventName, startDate, endDate, color, startTime: newItem.startTime, endTime: newItem.endTime });
      }
    }
    setAddingNew(null);
    setNewItem({});
  };

  // Group cancelled dates by name for display
  const groupedCancelledDates = cancelledAstreinteDates.reduce((acc, item) => {
    const key = item.name;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<string, CancelledAstreinteDate[]>);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground">Gestion des Événements</h2>
      
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="events" className="text-xs sm:text-sm">Événements</TabsTrigger>
          <TabsTrigger value="absences" className="text-xs sm:text-sm">Absences</TabsTrigger>
          <TabsTrigger value="astreintes" className="text-xs sm:text-sm">Astreintes</TabsTrigger>
          <TabsTrigger value="vacations" className="text-xs sm:text-sm">Vacances</TabsTrigger>
          <TabsTrigger value="arrets" className="text-xs sm:text-sm">Arrêts</TabsTrigger>
          <TabsTrigger value="holidays" className="text-xs sm:text-sm">Fériés</TabsTrigger>
        </TabsList>

        {/* Events Tab */}
        <TabsContent value="events" className="mt-4">
          {/* Add event button */}
          {onAddEvent && (
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <Button size="sm" onClick={() => setAddingNew('event')}>
                <Plus className="h-4 w-4 mr-2" /> {"Ajouter un événement"}
              </Button>
            </div>
          )}
          
          {addingNew === 'event' && onAddEvent && (
            <div className="mb-4 p-4 border rounded-lg bg-muted/50 space-y-3">
              <div className="flex gap-4 flex-wrap">
                <Input
                  placeholder="Nom de l'événement"
                  value={newItem.name || ''}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="flex-1 min-w-[200px]"
                />
                <Select 
                  value={newItem.eventType || 'event'} 
                  onValueChange={(v) => setNewItem({ ...newItem, eventType: v })}
                >
                  <SelectTrigger className="w-32 bg-background">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-background">
                    <SelectItem value="event">{"Événement"}</SelectItem>
                    <SelectItem value="re">RE</SelectItem>
                    <SelectItem value="cp">21 (Congés annuels)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-4 flex-wrap">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-background">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {newItem.startDate ? formatDate(newItem.startDate) : "Début"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-50 bg-background">
                    <Calendar
                      mode="single"
                      selected={newItem.startDate}
                      onSelect={(date) => setNewItem({ ...newItem, startDate: date, endDate: date })}
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-background">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {newItem.endDate ? formatDate(newItem.endDate) : "Fin"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-50 bg-background">
                    <Calendar
                      mode="single"
                      selected={newItem.endDate}
                      onSelect={(date) => setNewItem({ ...newItem, endDate: date })}
                    />
                  </PopoverContent>
                </Popover>
                {newItem.eventType !== 're' && newItem.eventType !== 'cp' && (
                  <Input
                    type="color"
                    value={newItem.color || '#0ea5e9'}
                    onChange={(e) => setNewItem({ ...newItem, color: e.target.value })}
                    className="w-12 h-9 p-1 cursor-pointer"
                  />
                )}
              </div>
              {newItem.eventType !== 're' && newItem.eventType !== 'cp' && (
                <div className="flex gap-4 flex-wrap items-center">
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-muted-foreground whitespace-nowrap">Début</label>
                    <Input
                      type="time"
                      value={newItem.startTime || ''}
                      onChange={(e) => setNewItem({ ...newItem, startTime: e.target.value })}
                      className="w-28 h-8 text-sm"
                      placeholder="HH:mm"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-muted-foreground whitespace-nowrap">Fin</label>
                    <Input
                      type="time"
                      value={newItem.endTime || ''}
                      onChange={(e) => setNewItem({ ...newItem, endTime: e.target.value })}
                      className="w-28 h-8 text-sm"
                      placeholder="HH:mm"
                    />
                  </div>
                </div>
              )}
              {/* Weekend exclusion checkbox */}
              {newItem.startDate && newItem.endDate && newItem.startDate.getTime() !== newItem.endDate.getTime() && (
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="exclude-weekends-event"
                    checked={newItem.excludeWeekends || false}
                    onCheckedChange={(checked) => setNewItem({ ...newItem, excludeWeekends: !!checked })}
                  />
                  <label htmlFor="exclude-weekends-event" className="text-sm text-muted-foreground cursor-pointer">
                    Exclure les week-ends
                  </label>
                </div>
              )}
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleAddNew('event')}>{"Ajouter"}</Button>
                <Button size="sm" variant="outline" onClick={() => { setAddingNew(null); setNewItem({}); }}>{"Annuler"}</Button>
              </div>
            </div>
          )}
          
          {/* Sort controls */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-xs text-muted-foreground">{"Trier par:"}</span>
            <SortButton field="date" label="Date" currentSort={eventSort} setSort={setEventSort} />
            <SortButton field="name" label="Nom" currentSort={eventSort} setSort={setEventSort} />
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Début</TableHead>
                <TableHead>Fin</TableHead>
                <TableHead>Horaires</TableHead>
                <TableHead>Couleur</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedEvents.map(event => (
                <TableRow key={event.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {event.readonly ? (
                        <>
                          <span>{event.name}</span>
                          <Badge variant="outline" className="text-[10px] px-1 py-0">
                            {event.source || 'ext'}
                          </Badge>
                        </>
                      ) : (
                        <EditableText
                          value={event.name}
                          onSave={(name) => onUpdateEvent(event.id, { name })}
                        />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {event.readonly ? (
                      formatDate(event.startDate)
                    ) : (
                      <DateEditor
                        date={event.startDate}
                        onSave={(date) => onUpdateEvent(event.id, { startDate: date })}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {event.readonly ? (
                      formatDate(event.endDate)
                    ) : (
                      <DateEditor
                        date={event.endDate}
                        onSave={(date) => onUpdateEvent(event.id, { endDate: date })}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {event.readonly ? (
                      <span className="text-xs text-muted-foreground">
                        {event.startTime && event.endTime ? `${event.startTime} — ${event.endTime}` : '—'}
                      </span>
                    ) : (
                      <div className="flex items-center gap-1">
                        <Input
                          type="time"
                          value={event.startTime || ''}
                          onChange={(e) => onUpdateEvent(event.id, { startTime: e.target.value || undefined })}
                          className="w-24 h-7 text-xs"
                        />
                        <span className="text-xs text-muted-foreground">—</span>
                        <Input
                          type="time"
                          value={event.endTime || ''}
                          onChange={(e) => onUpdateEvent(event.id, { endTime: e.target.value || undefined })}
                          className="w-24 h-7 text-xs"
                        />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div 
                      className="w-6 h-6 rounded-full border cursor-pointer"
                      style={{ backgroundColor: event.color }}
                      onClick={() => {
                        if (event.readonly) return;
                        const color = prompt('Nouvelle couleur (hex):', event.color);
                        if (color) onUpdateEvent(event.id, { color });
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost" onClick={() => onDeleteEvent(event.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {sortedEvents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    Aucun événement (RE et CP sont gérés dans les paramètres)
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Absences Tab (RE/CP) */}
        <TabsContent value="absences" className="mt-4">
          {onAddEvent && (
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <Button size="sm" onClick={() => setAddingNew('absence')}>
                <Plus className="h-4 w-4 mr-2" /> Ajouter une absence
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Trier par:</span>
                <SortButton field="date" label="Date" currentSort={absenceSort} setSort={setAbsenceSort} />
                <SortButton field="name" label="Nom" currentSort={absenceSort} setSort={setAbsenceSort} />
              </div>
            </div>
          )}
          
          {addingNew === 'absence' && onAddEvent && (
            <div className="mb-4 p-4 border rounded-lg bg-muted/50 space-y-3">
              <div className="flex gap-4 flex-wrap">
                <Input
                  placeholder="Nom (optionnel)"
                  value={newItem.name || ''}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="flex-1 min-w-[200px]"
                />
                <Select value={newItem.absenceType || 're'} onValueChange={(v) => setNewItem({ ...newItem, absenceType: v })}>
                  <SelectTrigger className="w-32 bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-background">
                    <SelectItem value="re">RE (Repos)</SelectItem>
                    <SelectItem value="cp">21 (Congés annuels)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-4 flex-wrap">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-background">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {newItem.startDate ? formatDate(newItem.startDate) : "Début"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-50 bg-background">
                    <Calendar mode="single" selected={newItem.startDate} onSelect={(date) => setNewItem({ ...newItem, startDate: date, endDate: date })} />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-background">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {newItem.endDate ? formatDate(newItem.endDate) : "Fin"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-50 bg-background">
                    <Calendar mode="single" selected={newItem.endDate} onSelect={(date) => setNewItem({ ...newItem, endDate: date })} />
                  </PopoverContent>
                </Popover>
              </div>
              {/* Weekend exclusion for absences */}
              {newItem.startDate && newItem.endDate && newItem.startDate.getTime() !== newItem.endDate.getTime() && (
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="exclude-weekends-absence"
                    checked={newItem.excludeWeekends || false}
                    onCheckedChange={(checked) => setNewItem({ ...newItem, excludeWeekends: !!checked })}
                  />
                  <label htmlFor="exclude-weekends-absence" className="text-sm text-muted-foreground cursor-pointer">
                    Exclure les week-ends
                  </label>
                </div>
              )}
              <div className="flex gap-2">
                <Button size="sm" onClick={() => {
                  if (onAddEvent) {
                    const type = (newItem.absenceType || 're') as 're' | 'cp';
                    const name = newItem.name || (type === 're' ? 'RE' : '21 (Congés annuels)');
                    const startDate = newItem.startDate || new Date();
                    const endDate = newItem.endDate || new Date();
                    const color = type === 're' ? '#d1d5db' : '#9ca3af';
                    
                    if (newItem.excludeWeekends && startDate.getTime() !== endDate.getTime()) {
                      const days = eachDayOfInterval({ start: startDate, end: endDate });
                      const weekdays = days.filter(d => !isWeekend(d));
                      let rangeStart: Date | null = null;
                      let rangeEnd: Date | null = null;
                      weekdays.forEach((day, i) => {
                        if (!rangeStart) { rangeStart = day; rangeEnd = day; return; }
                        const prevDay = weekdays[i - 1];
                        const diff = (day.getTime() - prevDay.getTime()) / (1000 * 60 * 60 * 24);
                        if (diff === 1) { rangeEnd = day; } else {
                          onAddEvent({ type, name, startDate: rangeStart, endDate: rangeEnd!, color });
                          rangeStart = day; rangeEnd = day;
                        }
                      });
                      if (rangeStart && rangeEnd) {
                        onAddEvent({ type, name, startDate: rangeStart, endDate: rangeEnd, color });
                      }
                    } else {
                      onAddEvent({ type, name, startDate, endDate, color });
                    }
                    setAddingNew(null);
                    setNewItem({});
                  }
                }}>Ajouter</Button>
                <Button size="sm" variant="outline" onClick={() => { setAddingNew(null); setNewItem({}); }}>Annuler</Button>
              </div>
            </div>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Début</TableHead>
                <TableHead>Fin</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedAbsences.map(absence => (
                <TableRow key={absence.id}>
                  <TableCell>
                    <Badge variant={absence.type === 'cp' ? 'default' : 'secondary'}>
                      {absence.type === 'cp' ? '21 (Congés)' : 'RE'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <EditableText value={absence.name} onSave={(name) => onUpdateEvent(absence.id, { name })} />
                  </TableCell>
                  <TableCell>
                    <DateEditor date={absence.startDate} onSave={(date) => onUpdateEvent(absence.id, { startDate: date })} />
                  </TableCell>
                  <TableCell>
                    <DateEditor date={absence.endDate} onSave={(date) => onUpdateEvent(absence.id, { endDate: date })} />
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost" onClick={() => onDeleteEvent(absence.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {sortedAbsences.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Aucune absence (RE ou CP)
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Astreintes Tab */}
        <TabsContent value="astreintes" className="mt-4">
          <div className="space-y-6">
            {/* Ponctual Astreintes */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm text-muted-foreground">Astreintes ponctuelles</h3>
                <Button size="sm" onClick={() => setAddingNew('ponctual')}>
                  <Plus className="h-4 w-4 mr-2" /> Ajouter
                </Button>
              </div>
              
              {addingNew === 'ponctual' && (
                <div className="mb-4 p-4 border rounded-lg bg-muted/50 space-y-3">
                  <Input
                    placeholder="Nom (ex: Remplacement Jean)"
                    value={newItem.name || ''}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  />
                  <div className="flex gap-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {newItem.startDate ? formatDate(newItem.startDate) : 'Début'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newItem.startDate}
                          onSelect={(date) => setNewItem({ ...newItem, startDate: date })}
                        />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {newItem.endDate ? formatDate(newItem.endDate) : 'Fin'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newItem.endDate}
                          onSelect={(date) => setNewItem({ ...newItem, endDate: date })}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleAddNew('ponctual')}>Ajouter</Button>
                    <Button size="sm" variant="outline" onClick={() => { setAddingNew(null); setNewItem({}); }}>Annuler</Button>
                  </div>
                </div>
              )}
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Début</TableHead>
                    <TableHead>Fin</TableHead>
                    <TableHead>Horaires</TableHead>
                    <TableHead className="w-20">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ponctualAstreintes.map(astreinte => (
                    <TableRow key={astreinte.id}>
                      <TableCell>
                        <EditableText
                          value={astreinte.name || 'Astreinte ponctuelle'}
                          onSave={(name) => onUpdatePonctualAstreinte(astreinte.id, { name })}
                        />
                      </TableCell>
                      <TableCell>
                        <DateEditor
                          date={astreinte.startDate}
                          onSave={(date) => onUpdatePonctualAstreinte(astreinte.id, { startDate: date })}
                        />
                      </TableCell>
                      <TableCell>
                        <DateEditor
                          date={astreinte.endDate}
                          onSave={(date) => onUpdatePonctualAstreinte(astreinte.id, { endDate: date })}
                        />
                      </TableCell>
                      <TableCell>
                        <span className="text-xs text-muted-foreground font-mono">
                          {format(astreinte.startDate, 'EEEE', { locale: fr })} 08:00 → {format(astreinte.endDate, 'EEEE', { locale: fr })} 07:59
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost" onClick={() => onRemovePonctualAstreinte(astreinte.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {ponctualAstreintes.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        Aucune astreinte ponctuelle
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Cancelled Dates */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm text-muted-foreground">Jours d'astreinte annulés</h3>
                <Button size="sm" onClick={() => setAddingNew('cancelled')}>
                  <Plus className="h-4 w-4 mr-2" /> Annuler des jours
                </Button>
              </div>
              
              {addingNew === 'cancelled' && (
                <div className="mb-4 p-4 border rounded-lg bg-muted/50 space-y-3">
                  <Input
                    placeholder="Nom du remplaçant"
                    value={newItem.name || ''}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  />
                  <div className="flex gap-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="bg-background">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {newItem.startDate ? formatDate(newItem.startDate) : "Début"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 z-50 bg-background">
                        <Calendar
                          mode="single"
                          selected={newItem.startDate}
                          onSelect={(date) => setNewItem({ ...newItem, startDate: date, endDate: date })}
                        />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="bg-background">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {newItem.endDate ? formatDate(newItem.endDate) : "Fin"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 z-50 bg-background">
                        <Calendar
                          mode="single"
                          selected={newItem.endDate}
                          onSelect={(date) => setNewItem({ ...newItem, endDate: date })}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex gap-4 flex-wrap items-center">
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-muted-foreground whitespace-nowrap">De</label>
                      <Input
                        type="time"
                        value={newItem.startTime ?? '00:00'}
                        onChange={(e) => setNewItem({ ...newItem, startTime: e.target.value })}
                        className="w-28 h-8 text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-muted-foreground whitespace-nowrap">À</label>
                      <Input
                        type="time"
                        value={newItem.endTime ?? '23:59'}
                        onChange={(e) => setNewItem({ ...newItem, endTime: e.target.value })}
                        className="w-28 h-8 text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleAddNew('cancelled')}>{"Annuler ces jours"}</Button>
                    <Button size="sm" variant="outline" onClick={() => { setAddingNew(null); setNewItem({}); }}>{"Annuler"}</Button>
                  </div>
                </div>
              )}
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Remplaçant</TableHead>
                    <TableHead>Date(s)</TableHead>
                    <TableHead>Horaires</TableHead>
                    <TableHead className="w-20">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(groupedCancelledDates).map(([name, dates]) => (
                    <TableRow key={name}>
                      <TableCell>
                        <Badge variant="secondary">{name}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs font-mono text-muted-foreground">
                          {dates[0]?.startTime || '00:00'} — {dates[0]?.endTime || '23:59'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {dates.map(d => (
                            <span key={d.id} className="text-sm bg-muted px-2 py-0.5 rounded">
                              {formatDate(d.date)}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => dates.forEach(d => onRestoreCancelledDate(d.id))}
                          title="Restaurer ces jours"
                        >
                          <Check className="h-4 w-4 text-primary" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {cancelledAstreinteDates.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        Aucun jour annulé
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        {/* Vacations Tab */}
        <TabsContent value="vacations" className="mt-4">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <Button size="sm" onClick={() => setAddingNew('vacation')}>
              <Plus className="h-4 w-4 mr-2" /> {"Ajouter une période"}
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{"Trier par:"}</span>
              <SortButton field="date" label="Date" currentSort={vacationSort} setSort={setVacationSort} />
              <SortButton field="name" label="Nom" currentSort={vacationSort} setSort={setVacationSort} />
            </div>
          </div>
          {addingNew === 'vacation' && (
            <div className="mb-4 p-4 border rounded-lg bg-muted/50 space-y-3">
              <Input
                placeholder={"Nom de la période"}
                value={newItem.name || ''}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
              <div className="flex gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-background">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {newItem.startDate ? formatDate(newItem.startDate) : "Début"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-50 bg-background">
                    <Calendar
                      mode="single"
                      selected={newItem.startDate}
                      onSelect={(date) => setNewItem({ ...newItem, startDate: date, endDate: date })}
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-background">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {newItem.endDate ? formatDate(newItem.endDate) : "Fin"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-50 bg-background">
                    <Calendar
                      mode="single"
                      selected={newItem.endDate}
                      onSelect={(date) => setNewItem({ ...newItem, endDate: date })}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleAddNew('vacation')}>{"Ajouter"}</Button>
                <Button size="sm" variant="outline" onClick={() => { setAddingNew(null); setNewItem({}); }}>{"Annuler"}</Button>
              </div>
            </div>
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Début</TableHead>
                <TableHead>Fin</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedVacations.map(vacation => (
                <TableRow key={vacation.id}>
                  <TableCell>
                    <EditableText
                      value={vacation.name}
                      onSave={(name) => onUpdateVacation(vacation.id, { name })}
                    />
                  </TableCell>
                  <TableCell>
                    <DateEditor
                      date={vacation.startDate}
                      onSave={(date) => onUpdateVacation(vacation.id, { startDate: date })}
                    />
                  </TableCell>
                  <TableCell>
                    <DateEditor
                      date={vacation.endDate}
                      onSave={(date) => onUpdateVacation(vacation.id, { endDate: date })}
                    />
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost" onClick={() => onDeleteVacation(vacation.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Arrets Tab */}
        <TabsContent value="arrets" className="mt-4">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <Button size="sm" onClick={() => setAddingNew('arret')}>
              <Plus className="h-4 w-4 mr-2" /> Ajouter un arrêt
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Trier par:</span>
              <SortButton field="date" label="Date" currentSort={arretSort} setSort={setArretSort} />
              <SortButton field="name" label="Nom" currentSort={arretSort} setSort={setArretSort} />
              <SortButton field="tranche" label="Tranche" currentSort={arretSort} setSort={setArretSort} />
              <SortButton field="module" label="Module" currentSort={arretSort} setSort={setArretSort} />
            </div>
          </div>
          {addingNew === 'arret' && (
            <div className="mb-4 p-4 border rounded-lg bg-muted/50 space-y-3">
              <div className="flex gap-4">
                <Input
                  placeholder="Nom"
                  value={newItem.name || ''}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="flex-1"
                />
                <Select 
                  value={newItem.tranche || 'Tr2'} 
                  onValueChange={(v) => setNewItem({ ...newItem, tranche: v })}
                >
                  <SelectTrigger className="w-24 bg-background">
                    <SelectValue placeholder={"Tranche"} />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-background">
                    <SelectItem value="Tr2">{"Tr2"}</SelectItem>
                    <SelectItem value="Tr3">{"Tr3"}</SelectItem>
                    <SelectItem value="Tr4">{"Tr4"}</SelectItem>
                    <SelectItem value="Tr5">{"Tr5"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-4 flex-wrap items-center">
                <select
                  className="px-3 py-2 border rounded-md bg-background text-sm"
                  value={newItem.arretType || 'arret'}
                  onChange={(e) => setNewItem({ ...newItem, arretType: e.target.value })}
                >
                  <option value="arret">{"Arrêt (AT)"}</option>
                  <option value="prepa">{"Préparation"}</option>
                </select>
                {newItem.arretType === 'prepa' && (
                  <Select 
                    value={newItem.module || 'M0'} 
                    onValueChange={(v) => setNewItem({ ...newItem, module: v })}
                  >
                    <SelectTrigger className="w-24 bg-background">
                      <SelectValue placeholder={"Module"} />
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-background">
                      <SelectItem value="M0">{"M0"}</SelectItem>
                      <SelectItem value="M1">{"M1"}</SelectItem>
                      <SelectItem value="M2A">{"M2A"}</SelectItem>
                      <SelectItem value="M2B">{"M2B"}</SelectItem>
                      <SelectItem value="M3">{"M3"}</SelectItem>
                      <SelectItem value="M4">{"M4"}</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
              <div className="flex gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-background">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {newItem.startDate ? formatDate(newItem.startDate) : "Début"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-50 bg-background">
                    <Calendar
                      mode="single"
                      selected={newItem.startDate}
                      onSelect={(date) => setNewItem({ ...newItem, startDate: date, endDate: date })}
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-background">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {newItem.endDate ? formatDate(newItem.endDate) : "Fin"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-50 bg-background">
                    <Calendar
                      mode="single"
                      selected={newItem.endDate}
                      onSelect={(date) => setNewItem({ ...newItem, endDate: date })}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleAddNew('arret')}>{"Ajouter"}</Button>
                <Button size="sm" variant="outline" onClick={() => { setAddingNew(null); setNewItem({}); }}>{"Annuler"}</Button>
              </div>
            </div>
          )}
          
          {/* Info about patterns */}
          <div className="mb-3 p-2 bg-muted/50 rounded text-xs text-muted-foreground">
            Les patterns de préparation (M0-M4) sont définis automatiquement selon le module.
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Tranche</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Début</TableHead>
                <TableHead>Fin</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedArrets.map(arret => (
                <TableRow key={arret.id}>
                  <TableCell>
                    <Badge variant={arret.type === 'prepa' ? 'secondary' : 'default'}>
                      {arret.type === 'prepa' ? 'Prépa' : 'AT'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <EditableText
                      value={arret.name}
                      onSave={(name) => onUpdateArret(arret.id, { name })}
                    />
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={arret.tranche} 
                      onValueChange={(v) => onUpdateArret(arret.id, { tranche: v as 'Tr2' | 'Tr3' | 'Tr4' | 'Tr5' })}
                    >
                      <SelectTrigger className="w-20 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tr2">Tr2</SelectItem>
                        <SelectItem value="Tr3">Tr3</SelectItem>
                        <SelectItem value="Tr4">Tr4</SelectItem>
                        <SelectItem value="Tr5">Tr5</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {arret.type === 'prepa' ? (
                      <Badge variant="outline" className="text-xs">
                        {arret.module || '-'}
                      </Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <DateEditor
                      date={arret.startDate}
                      onSave={(date) => onUpdateArret(arret.id, { startDate: date })}
                    />
                  </TableCell>
                  <TableCell>
                    <DateEditor
                      date={arret.endDate}
                      onSave={(date) => onUpdateArret(arret.id, { endDate: date })}
                    />
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost" onClick={() => onDeleteArret(arret.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Holidays Tab */}
        <TabsContent value="holidays" className="mt-4">
          <div className="mb-4">
            <Button size="sm" onClick={() => setAddingNew('holiday')}>
              <Plus className="h-4 w-4 mr-2" /> Ajouter un jour férié
            </Button>
          </div>
          {addingNew === 'holiday' && (
            <div className="mb-4 p-4 border rounded-lg bg-muted/50 space-y-3">
              <Input
                placeholder="Nom du jour férié"
                value={newItem.name || ''}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-background">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {newItem.date ? formatDate(newItem.date) : "Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50 bg-background">
                  <Calendar
                    mode="single"
                    selected={newItem.date}
                    onSelect={(date) => setNewItem({ ...newItem, date })}
                  />
                </PopoverContent>
              </Popover>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleAddNew('holiday')}>{"Ajouter"}</Button>
                <Button size="sm" variant="outline" onClick={() => { setAddingNew(null); setNewItem({}); }}>{"Annuler"}</Button>
              </div>
            </div>
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holidays.map((holiday, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <DateEditor
                      date={holiday.date}
                      onSave={(date) => onUpdateHoliday(holiday.date, { date })}
                    />
                  </TableCell>
                  <TableCell>
                    <EditableText
                      value={holiday.name}
                      onSave={(name) => onUpdateHoliday(holiday.date, { name })}
                    />
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost" onClick={() => onDeleteHoliday(holiday.date)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper components
function EditableText({ value, onSave }: { value: string; onSave: (value: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value);

  if (editing) {
    return (
      <div className="flex gap-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="h-8"
          autoFocus
        />
        <Button size="sm" variant="ghost" onClick={() => { onSave(text); setEditing(false); }}>
          <Check className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => { setText(value); setEditing(false); }}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <span 
      className="cursor-pointer hover:underline"
      onClick={() => setEditing(true)}
    >
      {value}
    </span>
  );
}

function DateEditor({ date, onSave }: { date: Date; onSave: (date: Date) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 px-2 font-normal bg-background">
          {format(date, 'dd/MM/yyyy', { locale: fr })}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-50 bg-background" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            if (newDate) {
              onSave(newDate);
              setIsOpen(false);
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
