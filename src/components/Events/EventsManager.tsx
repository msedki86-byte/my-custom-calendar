import { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarEvent, Vacation, Arret, Holiday, Astreinte, CancelledAstreinteDate, PatternType } from '@/types/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Trash2, X, Check, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const patterns: { value: PatternType; label: string }[] = [
  { value: 'none', label: 'Aucun' },
  { value: 'stripes', label: 'Rayures' },
  { value: 'dots', label: 'Points' },
  { value: 'crosshatch', label: 'Croisillons' },
  { value: 'waves', label: 'Lignes' },
];

const patternClasses: Record<PatternType, string> = {
  none: '',
  stripes: 'pattern-stripes',
  dots: 'pattern-dots',
  crosshatch: 'pattern-crosshatch',
  waves: 'pattern-waves',
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
  onCancelAstreinteDates: (startDate: Date, endDate: Date, name: string) => void;
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
}: EventsManagerProps) {
  const [editing, setEditing] = useState<EditingState | null>(null);
  const [addingNew, setAddingNew] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<any>({});

  const formatDate = (date: Date) => format(date, 'dd/MM/yyyy', { locale: fr });

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
        color: newItem.color || '#22c55e',
        pattern: newItem.pattern || 'none',
        tranche: newItem.tranche || 'Tr1',
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
        onCancelAstreinteDates(newItem.startDate, newItem.endDate, newItem.name);
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
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="events">Événements</TabsTrigger>
          <TabsTrigger value="astreintes">Astreintes</TabsTrigger>
          <TabsTrigger value="vacations">Vacances</TabsTrigger>
          <TabsTrigger value="arrets">Arrêts</TabsTrigger>
          <TabsTrigger value="holidays">Fériés</TabsTrigger>
        </TabsList>

        {/* Events Tab */}
        <TabsContent value="events" className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Début</TableHead>
                <TableHead>Fin</TableHead>
                <TableHead>Couleur</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map(event => (
                <TableRow key={event.id}>
                  <TableCell>
                    <EditableText
                      value={event.name}
                      onSave={(name) => onUpdateEvent(event.id, { name })}
                    />
                  </TableCell>
                  <TableCell>
                    <DateEditor
                      date={event.startDate}
                      onSave={(date) => onUpdateEvent(event.id, { startDate: date })}
                    />
                  </TableCell>
                  <TableCell>
                    <DateEditor
                      date={event.endDate}
                      onSave={(date) => onUpdateEvent(event.id, { endDate: date })}
                    />
                  </TableCell>
                  <TableCell>
                    <div 
                      className="w-6 h-6 rounded-full border cursor-pointer"
                      style={{ backgroundColor: event.color }}
                      onClick={() => {
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
              {events.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Aucun événement
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
                        <Button size="sm" variant="ghost" onClick={() => onRemovePonctualAstreinte(astreinte.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {ponctualAstreintes.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
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
                    <Button size="sm" onClick={() => handleAddNew('cancelled')}>Annuler ces jours</Button>
                    <Button size="sm" variant="outline" onClick={() => { setAddingNew(null); setNewItem({}); }}>Annuler</Button>
                  </div>
                </div>
              )}
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Remplaçant</TableHead>
                    <TableHead>Date(s)</TableHead>
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
                          <Check className="h-4 w-4 text-green-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {cancelledAstreinteDates.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground">
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
          <div className="mb-4">
            <Button size="sm" onClick={() => setAddingNew('vacation')}>
              <Plus className="h-4 w-4 mr-2" /> Ajouter une période
            </Button>
          </div>
          {addingNew === 'vacation' && (
            <div className="mb-4 p-4 border rounded-lg bg-muted/50 space-y-3">
              <Input
                placeholder="Nom de la période"
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
                <Button size="sm" onClick={() => handleAddNew('vacation')}>Ajouter</Button>
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
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vacations.map(vacation => (
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
          <div className="mb-4">
            <Button size="sm" onClick={() => setAddingNew('arret')}>
              <Plus className="h-4 w-4 mr-2" /> Ajouter un arrêt
            </Button>
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
                <Input
                  placeholder="Tranche (ex: Tr1)"
                  value={newItem.tranche || ''}
                  onChange={(e) => setNewItem({ ...newItem, tranche: e.target.value })}
                  className="w-32"
                />
              </div>
              <div className="flex gap-4 flex-wrap">
                <select 
                  className="px-3 py-2 border rounded-md bg-background"
                  value={newItem.arretType || 'arret'}
                  onChange={(e) => setNewItem({ ...newItem, arretType: e.target.value })}
                >
                  <option value="arret">Arrêt</option>
                  <option value="prepa">Préparation</option>
                </select>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Couleur:</span>
                  <Input
                    type="color"
                    value={newItem.color || '#22c55e'}
                    onChange={(e) => setNewItem({ ...newItem, color: e.target.value })}
                    className="w-10 h-8 p-1 cursor-pointer"
                  />
                </div>
                <Select 
                  value={newItem.pattern || 'none'} 
                  onValueChange={(v) => setNewItem({ ...newItem, pattern: v })}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Motif" />
                  </SelectTrigger>
                  <SelectContent>
                    {patterns.map(pattern => (
                      <SelectItem key={pattern.value} value={pattern.value}>
                        <div className="flex items-center gap-2">
                          <div 
                            className={cn(
                              'w-4 h-4 rounded bg-muted-foreground/60',
                              patternClasses[pattern.value]
                            )}
                          />
                          <span>{pattern.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
                <Button size="sm" onClick={() => handleAddNew('arret')}>Ajouter</Button>
                <Button size="sm" variant="outline" onClick={() => { setAddingNew(null); setNewItem({}); }}>Annuler</Button>
              </div>
            </div>
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Tranche</TableHead>
                <TableHead>Début</TableHead>
                <TableHead>Fin</TableHead>
                <TableHead>Couleur</TableHead>
                <TableHead>Motif</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {arrets.map(arret => (
                <TableRow key={arret.id}>
                  <TableCell>
                    <Badge variant={arret.type === 'prepa' ? 'secondary' : 'default'}>
                      {arret.type === 'prepa' ? 'Prépa' : 'Arrêt'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <EditableText
                      value={arret.name}
                      onSave={(name) => onUpdateArret(arret.id, { name })}
                    />
                  </TableCell>
                  <TableCell>
                    <EditableText
                      value={arret.tranche}
                      onSave={(tranche) => onUpdateArret(arret.id, { tranche })}
                    />
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
                    <div 
                      className="w-6 h-6 rounded-full border cursor-pointer"
                      style={{ backgroundColor: arret.color }}
                      onClick={() => {
                        const color = prompt('Nouvelle couleur (hex):', arret.color);
                        if (color) onUpdateArret(arret.id, { color });
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={arret.pattern || 'none'} 
                      onValueChange={(v) => onUpdateArret(arret.id, { pattern: v as PatternType })}
                    >
                      <SelectTrigger className="w-28 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {patterns.map(pattern => (
                          <SelectItem key={pattern.value} value={pattern.value}>
                            <div className="flex items-center gap-2">
                              <div 
                                className={cn(
                                  'w-3 h-3 rounded bg-muted-foreground/60',
                                  patternClasses[pattern.value]
                                )}
                              />
                              <span className="text-xs">{pattern.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                  <Button variant="outline" size="sm">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {newItem.date ? formatDate(newItem.date) : 'Date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newItem.date}
                    onSelect={(date) => setNewItem({ ...newItem, date })}
                  />
                </PopoverContent>
              </Popover>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleAddNew('holiday')}>Ajouter</Button>
                <Button size="sm" variant="outline" onClick={() => { setAddingNew(null); setNewItem({}); }}>Annuler</Button>
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
        <Button variant="ghost" size="sm" className="h-8 px-2 font-normal">
          {format(date, 'dd/MM/yyyy', { locale: fr })}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
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
