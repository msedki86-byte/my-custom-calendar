import { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Download } from 'lucide-react';
import { CalendarEvent } from '@/types/calendar';
import { downloadICS } from '@/lib/icsUtils';

interface ICSExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  events: CalendarEvent[];
}

export function ICSExportDialog({ open, onOpenChange, events }: ICSExportDialogProps) {
  const [includeExternal, setIncludeExternal] = useState(false);

  const internalEvents = useMemo(() => events.filter(e => !e.source || e.source === 'internal'), [events]);
  const externalEvents = useMemo(() => events.filter(e => e.source && e.source !== 'internal'), [events]);

  const eventsToExport = includeExternal ? events : internalEvents;

  const handleExport = () => {
    downloadICS(eventsToExport, 'calendrier.ics');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Exporter vers calendrier externe
          </DialogTitle>
          <DialogDescription>
            Génère un fichier .ics importable dans Outlook, Apple Calendar, Google Calendar, etc.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="bg-muted/50 rounded-lg p-3 space-y-2">
            <p className="text-sm font-medium">Événements à exporter :</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">{internalEvents.length} interne(s)</Badge>
              {externalEvents.length > 0 && (
                <Badge variant="secondary">{externalEvents.length} externe(s)</Badge>
              )}
            </div>
          </div>

          {externalEvents.length > 0 && (
            <div className="flex items-center gap-2">
              <Checkbox
                id="include-external"
                checked={includeExternal}
                onCheckedChange={(checked) => setIncludeExternal(!!checked)}
              />
              <label htmlFor="include-external" className="text-sm text-muted-foreground cursor-pointer">
                Inclure les événements externes
              </label>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
          <Button onClick={handleExport} disabled={eventsToExport.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            Exporter ({eventsToExport.length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
