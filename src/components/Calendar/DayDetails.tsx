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
import { cn } from '@/lib/utils';

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
  cancelled,
  settings,
}: DayDetailsProps) {
  if (!date) return null;

  const hasContent = events.length > 0 || astreinte || holiday || vacation || arret;

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="border-b border-border pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle className="text-xl capitalize">
                {format(date, 'EEEE d MMMM', { locale: fr })}
              </DrawerTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {format(date, 'yyyy', { locale: fr })}
              </p>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <X className="w-5 h-5" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="p-4 space-y-4 overflow-y-auto">
          {/* Holiday */}
          {holiday && (
            <div 
              className="p-4 rounded-xl bg-destructive/10"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-destructive"
                >
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{holiday.name}</p>
                  <p className="text-sm text-muted-foreground">Jour férié</p>
                </div>
              </div>
            </div>
          )}

          {/* Vacation */}
          {vacation && (
            <div 
              className="p-4 rounded-xl"
              style={{ backgroundColor: `${settings.vacationColor}20` }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: settings.vacationColor }}
                >
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{vacation.name}</p>
                  <p className="text-sm text-muted-foreground">Vacances scolaires</p>
                </div>
              </div>
            </div>
          )}

          {/* Astreinte */}
          {astreinte && !astreinte.isCancelled && !cancelled && (
            <div 
              className="p-4 rounded-xl"
              style={{ backgroundColor: `${astreinte.isPonctuelle ? settings.astreintePonctuelleColor : settings.astreinteColor}20` }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: astreinte.isPonctuelle ? settings.astreintePonctuelleColor : settings.astreinteColor }}
                >
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {astreinte.isPonctuelle ? astreinte.name || 'Astreinte ponctuelle' : 'Astreinte'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {astreinte.isPonctuelle ? 'Ponctuelle' : 'Récurrente'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Cancelled Astreinte */}
          {(cancelled || astreinte?.isCancelled) && (
            <div 
              className="p-4 rounded-xl"
              style={{ backgroundColor: `${settings.astreinteCancelledColor}20` }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center opacity-60"
                  style={{ backgroundColor: settings.astreinteCancelledColor }}
                >
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground line-through">
                    {cancelled?.name || astreinte?.name || 'Astreinte annulée'}
                  </p>
                  <p className="text-sm text-muted-foreground">Annulée</p>
                </div>
              </div>
            </div>
          )}

          {/* Arret */}
          {arret && (
            <div 
              className="p-4 rounded-xl"
              style={{ backgroundColor: `${arret.color || '#22c55e'}20` }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: arret.color || '#22c55e' }}
                >
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{arret.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {arret.type === 'prepa' ? 'Préparation' : 'Arrêt'} - {arret.tranche}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Events */}
          {events.map(event => {
            const isRE = event.name === 'RE';
            return (
              <div 
                key={event.id}
                className="p-4 rounded-xl"
                style={{ backgroundColor: isRE ? `${settings.reColor}40` : `${event.color}20` }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: isRE ? settings.reColor : event.color }}
                  >
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{event.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {isRE ? 'Repos / Récupération' : 'Événement'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Empty state */}
          {!hasContent && (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Calendar className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-4">Aucun événement ce jour</p>
            </div>
          )}

          {/* Add Event Button */}
          <Button 
            onClick={onAddEvent}
            className="w-full h-12 rounded-xl text-base font-medium"
          >
            Ajouter un événement
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
