import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarEvent, Vacation, Arret, Holiday, Astreinte } from '@/types/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Pencil, Trash2, X, Check, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EventsManagerProps {
  events: CalendarEvent[];
  vacations: Vacation[];
  arrets: Arret[];
  holidays: Holiday[];
  ponctualAstreintes: Astreinte[];
  cancelledAstreinteIds: string[];
  onUpdateEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  onDeleteEvent: (id: string) => void;
  onUpdateVacation: (id: string, updates: Partial<Vacation>) => void;
  onDeleteVacation: (id: string) => void;
  onUpdateArret: (id: string, updates: Partial<Arret>) => void;
  onDeleteArret: (id: string) => void;
  onUpdateHoliday: (date: Date, updates: Partial<Holiday>) => void;
  onDeleteHoliday: (date: Date) => void;
  onRemovePonctualAstreinte: (id: string) => void;
  onRestoreAstreinte: (id: string) => void;
  onAddVacation: (vacation: Omit<Vacation, 'id'>) => void;
  onAddArret: (arret: Omit<Arret, 'id'>) => void;
  onAddHoliday: (holiday: Holiday) => void;
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
  cancelledAstreinteIds,
  onUpdateEvent,
  onDeleteEvent,
  onUpdateVacation,
  onDeleteVacation,
  onUpdateArret,
  onDeleteArret,
  onUpdateHoliday,
  onDeleteHoliday,
  onRemovePonctualAstreinte,
  onRestoreAstreinte,
  onAddVacation,
  onAddArret,
  onAddHoliday,
}: EventsManagerProps) {
  const [editing, setEditing] = useState<EditingState | null>(null);
  const [addingNew, setAddingNew] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<any>({});

  const formatDate = (date: Date) => format(date, 'dd/MM/yyyy', { locale: fr });

  const handleSaveEdit = () => {
    if (!editing) return;
    setEditing(null);
  };

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
        tranche: newItem.tranche || 'Tr1',
      });
    } else if (type === 'holiday') {
      onAddHoliday({
        date: newItem.date || new Date(),
        name: newItem.name || 'Nouveau férié',
      });
    }
    setAddingNew(null);
    setNewItem({});
  };

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
                    {editing?.id === event.id && editing.field === 'name' ? (
                      <div className="flex gap-2">
                        <Input
                          value={editing.value}
                          onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                          className="h-8"
                        />
                        <Button size="sm" variant="ghost" onClick={() => {
                          onUpdateEvent(event.id, { name: editing.value });
                          setEditing(null);
                        }}>
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditing(null)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <span 
                        className="cursor-pointer hover:underline"
                        onClick={() => setEditing({ id: event.id, field: 'name', value: event.name })}
                      >
                        {event.name}
                      </span>
                    )}
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
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-muted-foreground">Astreintes ponctuelles</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Début</TableHead>
                  <TableHead>Fin</TableHead>
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ponctualAstreintes.map(astreinte => (
                  <TableRow key={astreinte.id}>
                    <TableCell>{formatDate(astreinte.startDate)}</TableCell>
                    <TableCell>{formatDate(astreinte.endDate)}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost" onClick={() => onRemovePonctualAstreinte(astreinte.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {ponctualAstreintes.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">
                      Aucune astreinte ponctuelle
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <h3 className="font-semibold text-sm text-muted-foreground mt-6">Astreintes annulées</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cancelledAstreinteIds.map(id => (
                  <TableRow key={id}>
                    <TableCell>{id}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost" onClick={() => onRestoreAstreinte(id)}>
                        <Check className="h-4 w-4 text-green-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {cancelledAstreinteIds.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center text-muted-foreground">
                      Aucune astreinte annulée
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
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
              <div className="flex gap-4">
                <select 
                  className="px-3 py-2 border rounded-md bg-background"
                  value={newItem.arretType || 'arret'}
                  onChange={(e) => setNewItem({ ...newItem, arretType: e.target.value })}
                >
                  <option value="arret">Arrêt</option>
                  <option value="prepa">Préparation</option>
                </select>
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