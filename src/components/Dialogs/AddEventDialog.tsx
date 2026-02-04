import React, { useState, useEffect } from 'react';
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
    color: string;
  }) => void;
  initialDate?: Date;
}

export function AddEventDialog({ isOpen, onClose, onAdd, initialDate }: AddEventDialogProps) {
  const [type, setType] = useState<EventTypeOption>('event');
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(initialDate || new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(initialDate || new Date());
  const [color, setColor] = useState('#0ea5e9');

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
  };

  // Auto-set name for RE/CP types
  useEffect(() => {
    if (type === 're' && name === '') {
      setName('RE');
    } else if (type === 'cp' && name === '') {
      setName('CP');
    }
  }, [type]);

  const handleSubmit = () => {
    if (!startDate || !endDate || !name.trim()) return;
    
    onAdd({
      type,
      name: name.trim(),
      startDate,
      endDate,
      color,
    });
    
    // Reset form
    setName('');
    setType('event');
    setColor('#0ea5e9');
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
        return 'Marquez les jours comme CP (Congés Payés). La case sera grisée (plus foncée que RE).';
    }
  };

  // RE and CP don't need color picker - they use settings colors
  const showColorPicker = type === 'event';

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
              <SelectContent className="bg-background z-50">
                <SelectItem value="event">Événement</SelectItem>
                <SelectItem value="re">RE (Repos/Récupération)</SelectItem>
                <SelectItem value="cp">CP (Congés Payés)</SelectItem>
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
                      ? 'CP' 
                      : "Nom de l'événement"
              }
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Date de début</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'justify-start text-left font-normal',
                      !startDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, 'dd/MM/yyyy', { locale: fr }) : 'Sélectionner'}
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
              <Label>Date de fin</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'justify-start text-left font-normal',
                      !endDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, 'dd/MM/yyyy', { locale: fr }) : 'Sélectionner'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50 bg-background" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    locale={fr}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
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
