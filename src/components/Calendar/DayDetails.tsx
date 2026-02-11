import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { X, Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { CalendarEvent, Astreinte, Holiday, Vacation, Arret, CalendarSettings, CancelledAstreinteDate } from '@/types/calendar';
import { DayTimeline } from './DayTimeline';

interface DayDetailsProps {
  date: Date | null;
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: () => void;
  events: CalendarEvent[];
  astreinte: Astreinte | null;
  holiday: Holiday | null;
  vacation: Vacation | null;
  arret: Arret | null;
  arrets?: Arret[];
  cancelled: CancelledAstreinteDate | null;
  settings: CalendarSettings;
  reDay?: CalendarEvent | null;
}

export function DayDetails({
  date,
  isOpen,
  onClose,
  onAddEvent,
  events,
  astreinte,
  holiday,
  vacation,
  arret,
  arrets,
  cancelled,
  settings,
}: DayDetailsProps) {
  if (!date) return null;

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="border-b border-border pb-3">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-lg capitalize">
              {format(date, 'EEEE d MMMM yyyy', { locale: fr })}
            </DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <X className="w-5 h-5" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="p-3 overflow-y-auto flex-1">
          {/* Timeline view 5h-21h */}
          <DayTimeline
            date={date}
            events={events}
            astreinte={astreinte}
            holiday={holiday}
            vacation={vacation}
            arret={arret}
            arrets={arrets}
            cancelled={cancelled}
            settings={settings}
          />

          {/* Add Event Button */}
          <Button 
            onClick={onAddEvent}
            className="w-full h-11 rounded-xl text-base font-medium mt-4"
          >
            Ajouter un événement
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
