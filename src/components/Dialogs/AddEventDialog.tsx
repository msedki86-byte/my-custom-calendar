import React, { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type EventTypeOption = 'event' | 'astreinte-ponctuelle' | 'astreinte-cancelled' | 're' | 'cp';

interface AddEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (event: {
    type: EventTypeOption;
    name: string;
    startDate: Date;
    endDate: Date;
    startTime?: string;
    endTime?: string;
    color: string;
    excludeWeekends?: boolean;
  }) => void;
  initialDate?: Date;
  existingEvents?: Array<{ name: string; startDate: Date; endDate: Date }>;
}

export function AddEventDialog({ isOpen, onClose, onAdd, initialDate, existingEvents = [] }: AddEventDialogProps) {
  const [type, setType] = useState<EventTypeOption>('event');
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(initialDate || new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(initialDate || new Date());
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('17:00');
  const [color, setColor] = useState('#00AEEF');
  const [startPopoverOpen, setStartPopoverOpen] = useState(false);
  const [endPopoverOpen, setEndPopoverOpen] = useState(false);
  const [excludeWeekends, setExcludeWeekends] = useState(false);

  // Synchronize dates when initialDate changes or dialog opens
  useEffect(() => {
    if (isOpen && initialDate) {
      setStartDate(initialDate);
      setEndDate(initialDate);
    }
  }, [isOpen, initialDate]);

  // Auto-fill end date when start date changes
  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date);
    // Auto-fill end date with start date (user can still modify it)
    if (date) {
      setEndDate(date);
    }
    setStartPopoverOpen(false);
  };

  const handleEndDateChange = (date: Date | undefined) => {
    setEndDate(date);
    setEndPopoverOpen(false);
  };

  // Auto-set name and times for specific types
  useEffect(() => {
    if (type === 're' && name === '') {
      setName('RE');
    } else if (type === 'cp' && name === '') {
      setName('21 (Congés annuels)');
    }
    // Default times for cancellations
    if (type === 'astreinte-cancelled') {
      setStartTime('00:00');
      setEndTime('23:59');
    } else if (type === 'event' || type === 'astreinte-ponctuelle') {
      setStartTime('08:00');
      setEndTime('17:00');
    }
  }, [type]);

  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);

  const checkForDuplicates = (): boolean => {
    if (!startDate || !endDate) return false;
    return existingEvents.some(e => {
      const overlap = e.startDate <= endDate && e.endDate >= startDate;
      return overlap;
    });
  };

  const handleSubmit = () => {
    if (!startDate || !endDate || !name.trim()) return;
    
    if (!showDuplicateWarning && checkForDuplicates()) {
      setShowDuplicateWarning(true);
      return;
    }
    
    onAdd({
      type,
      name: name.trim(),
      startDate,
      endDate,
      startTime: showTimePicker ? startTime : undefined,
      endTime: showTimePicker ? endTime : undefined,
      color,
      excludeWeekends: excludeWeekends || undefined,
    });
    
    // Reset form
    setName('');
    setType('event');
    setColor('#00AEEF');
    setStartTime('08:00');
    setEndTime('17:00');
    setShowDuplicateWarning(false);
    setExcludeWeekends(false);
    onClose();
  };

  const getTypeDescription = () => {
    switch (type) {
      case 'event':
        return 'Créez un nouvel événement sur le calendrier.';
      case 'astreinte-ponctuelle':
        return 'Ajoutez une astreinte supplémentaire pour les dates sélectionnées.';
      case 'astreinte-cancelled':
        return 'Annulez votre astreinte UNIQUEMENT pour les jours sélectionnés (le remplaçant prend ces jours).';
      case 're':
        return 'Marquez les jours comme RE (Repos/Récupération). La case sera grisée.';
      case 'cp':
        return 'Marquez les jours comme 21 (Congés annuels). La case sera grisée (plus foncée que RE).';
    }
  };

  // RE and CP don't need color picker - they use settings colors
  const showColorPicker = type === 'event';
  // Show time picker for events, astreintes, and cancellations
  const showTimePicker = type === 'event' || type === 'astreinte-ponctuelle' || type === 'astreinte-cancelled';
  // Show exclude weekends for multi-day events
  const isMultiDay = startDate && endDate && startDate.getTime() !== endDate.getTime();
  const showExcludeWeekends = isMultiDay && (type === 'event' || type === 're' || type === 'cp');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter un événement</DialogTitle>
          <DialogDescription>
            {getTypeDescription()}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="type">Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as EventTypeOption)}>
              <SelectTrigger className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background z-50" position="popper" sideOffset={4}>
                <SelectItem value="event">Événement</SelectItem>
                <SelectItem value="re">RE (Repos/Récupération)</SelectItem>
                <SelectItem value="cp">21 (Congés annuels)</SelectItem>
                <SelectItem value="astreinte-ponctuelle">Astreinte ponctuelle</SelectItem>
                <SelectItem value="astreinte-cancelled">Annulation d'astreinte (jours spécifiques)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="name">
              {type === 'astreinte-cancelled' ? 'Nom du remplaçant' : 'Nom'}
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={
                type === 'astreinte-cancelled' 
                  ? 'Nom du remplaçant' 
                  : type === 're' 
                    ? 'RE' 
                    : type === 'cp' 
                      ? '21 (Congés annuels)' 
                      : "Nom de l'événement"
              }
            />
          </div>
          
          {showDuplicateWarning && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-sm text-destructive">
              ⚠️ Un événement existe déjà sur cette période. Voulez-vous quand même ajouter ?
              <div className="flex gap-2 mt-2">
                <Button size="sm" variant="destructive" onClick={() => {
                  setShowDuplicateWarning(false);
                  if (startDate && endDate && name.trim()) {
                    onAdd({ type, name: name.trim(), startDate, endDate, color });
                    setName(''); setType('event'); setColor('#00AEEF'); setShowDuplicateWarning(false); onClose();
                  }
                }}>Valider quand même</Button>
                <Button size="sm" variant="outline" onClick={() => setShowDuplicateWarning(false)}>Modifier</Button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="hidden sm:block">{"Date de début"}</Label>
              <Label className="sm:hidden">Début</Label>
              <Popover open={startPopoverOpen} onOpenChange={setStartPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'justify-start text-left font-normal',
                      !startDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, 'dd/MM/yyyy', { locale: fr }) : "Sélectionner"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50 bg-background" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={handleStartDateChange}
                    initialFocus
                    locale={fr}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid gap-2">
              <Label className="hidden sm:block">{"Date de fin"}</Label>
              <Label className="sm:hidden">Fin</Label>
              <Popover open={endPopoverOpen} onOpenChange={setEndPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'justify-start text-left font-normal',
                      !endDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, 'dd/MM/yyyy', { locale: fr }) : "Sélectionner"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50 bg-background" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={handleEndDateChange}
                    initialFocus
                    locale={fr}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          {showTimePicker && (
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Heure début</Label>
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  min={type === 'astreinte-cancelled' ? '00:00' : '05:00'}
                  max={type === 'astreinte-cancelled' ? '23:59' : '21:00'}
                  className="h-9"
                />
              </div>
              <div className="grid gap-2">
                <Label>Heure fin</Label>
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  min={type === 'astreinte-cancelled' ? '00:00' : '05:00'}
                  max={type === 'astreinte-cancelled' ? '23:59' : '21:00'}
                  className="h-9"
                />
              </div>
            </div>
          )}

          {showExcludeWeekends && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="excludeWeekends"
                checked={excludeWeekends}
                onCheckedChange={(checked) => setExcludeWeekends(checked === true)}
              />
              <Label htmlFor="excludeWeekends" className="text-sm cursor-pointer">
                Exclure les week-ends (sam/dim)
              </Label>
            </div>
          )}
          
          {showColorPicker && (
            <div className="grid gap-2">
              <Label htmlFor="color">Couleur</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-12 h-10 p-1 cursor-pointer"
                />
                <Input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="flex-1 font-mono text-sm"
                />
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} disabled={!name.trim() || !startDate || !endDate}>
            Ajouter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
