/**
 * Module 2 – Day Entry Form (CNPE Bugey)
 * Saisie journée : heures, suppression midi, formation, FPC, astreinte différenciée, notes.
 * Habillage fixe 1h/jour travaillé (automatique, pas de saisie).
 */

import { useState } from 'react';
import { TimeEntry, NoteTag, NOTE_TAG_LABELS, AstreinteType } from '@/types/pointage';
import { coversMidi } from '@/lib/complianceEngine';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Check, MessageSquare, Utensils, Car } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

interface DayEntryFormProps {
  date: string;
  entries: TimeEntry[];
  onAdd: (entry: Omit<TimeEntry, 'id' | 'autoComments'>) => void;
  onUpdate: (id: string, patch: Partial<TimeEntry>) => void;
  onDelete: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function DayEntryForm({ date, entries, onAdd, onUpdate, onDelete, isOpen, onClose }: DayEntryFormProps) {
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('16:45');
  const [isFormation, setIsFormation] = useState(false);
  const [isFPC, setIsFPC] = useState(false);
  const [fpcHeures, setFpcHeures] = useState<7 | 8>(7);
  const [isIntervention, setIsIntervention] = useState(false);
  const [isAstreinteSans, setIsAstreinteSans] = useState(false);
  const [typeAstreinte, setTypeAstreinte] = useState<AstreinteType>(null);
  const [suppressionMidi, setSuppressionMidi] = useState(true);
  const [noteEntryId, setNoteEntryId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [noteTags, setNoteTags] = useState<NoteTag[]>([]);

  const dayLabel = (() => {
    try { return format(parseISO(date), 'EEEE d MMMM yyyy', { locale: fr }); }
    catch { return date; }
  })();

  const showMidiOption = coversMidi(startTime, endTime);

  const handleAdd = () => {
    onAdd({
      date,
      startTime: isFPC ? '08:00' : startTime,
      endTime: isFPC ? (fpcHeures === 7 ? '15:00' : '16:00') : endTime,
      isFormation: isFormation || isFPC,
      isInterventionAstreinte: isIntervention,
      isAstreinteSansIntervention: isAstreinteSans,
      suppressionMidi: isFPC ? true : (showMidiOption ? suppressionMidi : false),
      isFPC,
      fpcHeures: isFPC ? fpcHeures : undefined,
      estAstreinte: isIntervention || isAstreinteSans,
      typeAstreinte: isIntervention ? (typeAstreinte || 'PROGRAMMEE') : null,
    });
    setStartTime('08:00');
    setEndTime('16:45');
    setIsFormation(false);
    setIsFPC(false);
    setIsIntervention(false);
    setIsAstreinteSans(false);
    setTypeAstreinte(null);
    setSuppressionMidi(true);
  };

  const openNote = (entry: TimeEntry) => {
    setNoteEntryId(entry.id);
    setNoteText(entry.note || '');
    setNoteTags(entry.noteTags || []);
  };

  const saveNote = () => {
    if (noteEntryId) {
      onUpdate(noteEntryId, { note: noteText || undefined, noteTags: noteTags.length > 0 ? noteTags : undefined });
      setNoteEntryId(null);
    }
  };

  const toggleTag = (tag: NoteTag) => {
    setNoteTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const getAstreinteBadge = (entry: TimeEntry) => {
    if (entry.isAstreinteSansIntervention) {
      return <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-blue-400 text-blue-700 bg-blue-50">🔵 Astreinte seule</Badge>;
    }
    if (entry.isInterventionAstreinte) {
      if (entry.typeAstreinte === 'NON_PROGRAMMEE') {
        return <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-orange-200 text-orange-900">🟠 Intervention non programmée</Badge>;
      }
      return <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-amber-100 text-amber-800">🟠 Intervention programmée</Badge>;
    }
    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="capitalize text-sm">{dayLabel}</DialogTitle>
        </DialogHeader>

        {/* Info habillage fixe */}
        <p className="text-[10px] text-muted-foreground bg-muted/50 px-2 py-1 rounded">
          Habillage : 1h automatique par jour travaillé
        </p>

        {/* Existing entries */}
        {entries.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Saisies existantes</p>
            {entries.map(entry => (
              <div key={entry.id} className="p-2 rounded-lg border border-border bg-card text-xs space-y-1">
                <div className="flex items-center gap-2">
                  <div className="flex-1 min-w-0">
                    <span className="font-mono font-medium">{entry.startTime} – {entry.endTime}</span>
                    {entry.suppressionMidi && <span className="ml-1 text-muted-foreground">(-45min midi)</span>}
                  </div>
                  <button
                    onClick={() => openNote(entry)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      entry.note
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'border-primary/40 text-primary/40 hover:border-primary hover:text-primary'
                    }`}
                    title="Note / Prime"
                  >
                    {entry.note ? <Check className="w-3 h-3" /> : <MessageSquare className="w-3 h-3" />}
                  </button>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => onDelete(entry.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {entry.isFPC && <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-indigo-100 text-indigo-800">FPC {entry.fpcHeures}h</Badge>}
                  {entry.isFormation && !entry.isFPC && <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Formation</Badge>}
                  {getAstreinteBadge(entry)}
                  {entry.noteTags?.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">{NOTE_TAG_LABELS[tag]}</Badge>
                  ))}
                </div>
                {/* Auto-comments */}
                {entry.autoComments && entry.autoComments.length > 0 && (
                  <div className="flex gap-1 flex-wrap">
                    {entry.autoComments.map((c, i) => (
                      <Badge key={i} variant="outline" className="text-[10px] px-1.5 py-0 border-amber-400 text-amber-700">
                        {c.includes('repas') ? <Utensils className="w-2.5 h-2.5 mr-0.5" /> : <Car className="w-2.5 h-2.5 mr-0.5" />}
                        {c}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Note editing */}
        {noteEntryId && (
          <div className="p-3 rounded-lg border border-primary/20 bg-primary/5 space-y-2">
            <p className="text-xs font-medium">Note / Commentaire</p>
            <Textarea
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              placeholder="Commentaire libre…"
              className="text-xs min-h-[60px]"
            />
            <div className="flex gap-1 flex-wrap">
              {(Object.keys(NOTE_TAG_LABELS) as NoteTag[]).map(tag => (
                <Badge
                  key={tag}
                  variant={noteTags.includes(tag) ? 'default' : 'outline'}
                  className="text-[10px] cursor-pointer select-none"
                  onClick={() => toggleTag(tag)}
                >
                  {NOTE_TAG_LABELS[tag]}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="h-7 text-xs" onClick={saveNote}>Enregistrer</Button>
              <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setNoteEntryId(null)}>Annuler</Button>
            </div>
          </div>
        )}

        {/* New entry form */}
        <div className="space-y-3 pt-2 border-t border-border">
          <p className="text-xs font-medium text-muted-foreground">Nouvelle saisie</p>
          
          {!isFPC && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Début</Label>
                <Input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="h-8 text-xs" />
              </div>
              <div>
                <Label className="text-xs">Fin</Label>
                <Input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="h-8 text-xs" />
              </div>
            </div>
          )}

          {/* Suppression midi */}
          {!isFPC && showMidiOption && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-50 border border-amber-200">
              <Checkbox
                id="suppressionMidi"
                checked={suppressionMidi}
                onCheckedChange={v => setSuppressionMidi(!!v)}
              />
              <Label htmlFor="suppressionMidi" className="text-xs cursor-pointer text-amber-800">
                Suppression travaux midi (retire 45 min)
              </Label>
            </div>
          )}
          {!isFPC && showMidiOption && !suppressionMidi && (
            <p className="text-[10px] text-amber-700 flex items-center gap-1">
              <Utensils className="w-3 h-3" />
              Repas sans déplacement
            </p>
          )}

          <div className="space-y-2">
            {/* FPC */}
            <div className="flex items-center gap-2">
              <Checkbox id="fpc" checked={isFPC} onCheckedChange={v => { 
                setIsFPC(!!v); 
                if (v) { setIsFormation(false); setIsIntervention(false); setIsAstreinteSans(false); }
              }} />
              <Label htmlFor="fpc" className="text-xs cursor-pointer">FPC (Formation Professionnelle Continue)</Label>
            </div>
            {isFPC && (
              <div className="ml-6">
                <Select value={fpcHeures.toString()} onValueChange={v => setFpcHeures(parseInt(v) as 7 | 8)}>
                  <SelectTrigger className="h-7 text-xs w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="7" className="text-xs">7h / jour</SelectItem>
                    <SelectItem value="8" className="text-xs">8h / jour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Checkbox id="formation" checked={isFormation} onCheckedChange={v => { setIsFormation(!!v); if (v) { setIsAstreinteSans(false); setIsFPC(false); } }} />
              <Label htmlFor="formation" className="text-xs cursor-pointer">Formation (= travail effectif)</Label>
            </div>
            
            {/* Intervention astreinte with type selection */}
            <div className="flex items-center gap-2">
              <Checkbox id="intervention" checked={isIntervention} onCheckedChange={v => { setIsIntervention(!!v); if (v) { setIsAstreinteSans(false); setIsFPC(false); } else { setTypeAstreinte(null); } }} />
              <Label htmlFor="intervention" className="text-xs cursor-pointer">Intervention astreinte</Label>
            </div>
            {isIntervention && (
              <div className="ml-6 space-y-1">
                <Select value={typeAstreinte || 'PROGRAMMEE'} onValueChange={v => setTypeAstreinte(v as AstreinteType)}>
                  <SelectTrigger className="h-7 text-xs w-56">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="PROGRAMMEE" className="text-xs">🟠 Programmée (période planifiée)</SelectItem>
                    <SelectItem value="NON_PROGRAMMEE" className="text-xs">🟠 Non programmée (hors planning)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Checkbox id="astreinteSans" checked={isAstreinteSans} onCheckedChange={v => { setIsAstreinteSans(!!v); if (v) { setIsFormation(false); setIsIntervention(false); setIsFPC(false); setTypeAstreinte(null); } }} />
              <Label htmlFor="astreinteSans" className="text-xs cursor-pointer">🔵 Astreinte sans intervention (indemnité seule)</Label>
            </div>
          </div>
          <Button onClick={handleAdd} size="sm" className="h-8 text-xs gap-1">
            <Plus className="w-3 h-3" />
            Ajouter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
