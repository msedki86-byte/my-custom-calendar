import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, AlertTriangle } from 'lucide-react';
import { parseICSToEvents, mergeICSEvents } from '@/lib/icsUtils';
import { CalendarEvent } from '@/types/calendar';
import { toast } from 'sonner';

interface ICSImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  existingEvents: CalendarEvent[];
  onImportEvents: (events: CalendarEvent[]) => void;
  onUpdateEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  onDeleteEvent: (id: string) => void;
}

export function ICSImportDialog({
  open,
  onOpenChange,
  existingEvents,
  onImportEvents,
  onUpdateEvent,
  onDeleteEvent,
}: ICSImportDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [parsedEvents, setParsedEvents] = useState<CalendarEvent[]>([]);
  const [fileName, setFileName] = useState('');
  const [removeAbsent, setRemoveAbsent] = useState(false);
  const [preview, setPreview] = useState<{
    toAdd: number;
    toUpdate: number;
    toRemove: number;
  } | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const text = await file.text();
    
    try {
      const events = parseICSToEvents(text);
      setParsedEvents(events);
      
      const { toAdd, toUpdate, toRemove } = mergeICSEvents(existingEvents, events, removeAbsent);
      setPreview({
        toAdd: toAdd.length,
        toUpdate: toUpdate.length,
        toRemove: toRemove.length,
      });
    } catch (err) {
      toast.error('Erreur lors de la lecture du fichier ICS');
      setParsedEvents([]);
      setPreview(null);
    }
  };

  const handleImport = () => {
    if (parsedEvents.length === 0) return;

    const { toAdd, toUpdate, toRemove } = mergeICSEvents(existingEvents, parsedEvents, removeAbsent);

    // Add new events
    if (toAdd.length > 0) onImportEvents(toAdd);

    // Update existing events
    for (const { id, updates } of toUpdate) {
      onUpdateEvent(id, updates);
    }

    // Remove absent events
    for (const id of toRemove) {
      onDeleteEvent(id);
    }

    const parts: string[] = [];
    if (toAdd.length) parts.push(`${toAdd.length} ajouté(s)`);
    if (toUpdate.length) parts.push(`${toUpdate.length} mis à jour`);
    if (toRemove.length) parts.push(`${toRemove.length} supprimé(s)`);

    toast.success(`Import ICS : ${parts.join(', ')}`);
    handleClose();
  };

  const handleClose = () => {
    setParsedEvents([]);
    setFileName('');
    setPreview(null);
    setRemoveAbsent(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Importer un calendrier externe (ICS)
          </DialogTitle>
          <DialogDescription>
            Importez un fichier .ics depuis Outlook, Apple Calendar ou tout autre calendrier compatible.
            Les événements importés seront en lecture seule.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* File input */}
          <div
            className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".ics,.ical"
              onChange={handleFileSelect}
              className="hidden"
            />
            {fileName ? (
              <div className="flex items-center justify-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{fileName}</span>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Cliquez pour sélectionner un fichier .ics
                </p>
              </div>
            )}
          </div>

          {/* Preview */}
          {preview && (
            <div className="bg-muted/50 rounded-lg p-3 space-y-2">
              <p className="text-sm font-medium">Aperçu de l'import :</p>
              <div className="flex flex-wrap gap-2">
                {preview.toAdd > 0 && (
                  <Badge variant="default" className="bg-green-600">
                    +{preview.toAdd} nouveau(x)
                  </Badge>
                )}
                {preview.toUpdate > 0 && (
                  <Badge variant="secondary">
                    ↻ {preview.toUpdate} mis à jour
                  </Badge>
                )}
                {removeAbsent && preview.toRemove > 0 && (
                  <Badge variant="destructive">
                    −{preview.toRemove} supprimé(s)
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Remove absent option */}
          {parsedEvents.length > 0 && (
            <div className="flex items-start gap-2">
              <Checkbox
                id="remove-absent"
                checked={removeAbsent}
                onCheckedChange={(checked) => {
                  setRemoveAbsent(!!checked);
                  if (parsedEvents.length > 0) {
                    const { toAdd, toUpdate, toRemove } = mergeICSEvents(existingEvents, parsedEvents, !!checked);
                    setPreview({ toAdd: toAdd.length, toUpdate: toUpdate.length, toRemove: toRemove.length });
                  }
                }}
              />
              <label htmlFor="remove-absent" className="text-sm text-muted-foreground cursor-pointer leading-tight">
                <AlertTriangle className="h-3 w-3 inline mr-1 text-orange-500" />
                Supprimer les événements ICS absents du fichier
              </label>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Annuler</Button>
          <Button onClick={handleImport} disabled={parsedEvents.length === 0}>
            Importer {parsedEvents.length > 0 && `(${parsedEvents.length})`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
