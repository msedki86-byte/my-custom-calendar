/**
 * Module 2 – Day Entry Form (CNPE Bugey)
 * Saisie journée : heures, suppression midi, formation, FPC, astreinte 4 types, notes.
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

const ASTREINTE_OPTIONS: { value: AstreinteType; label: string; badge: string }[] = [
  { value: 'PLANIFIEE_SANS', label: 'Astreinte planifiée sans intervention', badge: '🔵' },
  { value: 'INTERVENTION_PLANIFIEE', label: 'Intervention astreinte planifiée', badge: '🟠' },
  { value: 'INTERVENTION_APPEL', label: 'Intervention sur appel (pendant tour)', badge: '🟣' },
  { value: 'HORS_TOUR', label: 'Intervention hors tour d\'astreinte', badge: '⚫' },
];

export function DayEntryForm({ date, entries, onAdd, onUpdate, onDelete, isOpen, onClose }: DayEntryFormProps) {
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('16:45');
  const [isFormation, setIsFormation] = useState(false);
  const [isFPC, setIsFPC] = useState(false);
  const [fpcHeures, setFpcHeures] = useState<7 | 8>(7);
  const [typeAstreinte, setTypeAstreinte] = useState<AstreinteType>(null);
  const [isJourFerie, setIsJourFerie] = useState(false);
  const [astreinteCompensee, setAstreinteCompensee] = useState(false);
  const [suppressionMidi, setSuppressionMidi] = useState(true);
  const [noteEntryId, setNoteEntryId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [noteTags, setNoteTags] = useState<NoteTag[]>([]);

  const dayLabel = (() => {
    try { return format(parseISO(date), 'EEEE d MMMM yyyy', { locale: fr }); }
    catch { return date; }
  })();

  const showMidiOption = !isFPC && coversMidi(startTime, endTime);
  const isAstreinte = typeAstreinte !== null;
  const isIntervention = typeAstreinte === 'INTERVENTION_PLANIFIEE' || typeAstreinte === 'INTERVENTION_APPEL' || typeAstreinte === 'HORS_TOUR';
  const isSansIntervention = typeAstreinte === 'PLANIFIEE_SANS';

  const handleAdd = () => {
    onAdd({
      date,
      startTime: isFPC ? '08:00' : startTime,
      endTime: isFPC ? (fpcHeures === 7 ? '15:00' : '16:00') : endTime,
      isFormation: isFormation || isFPC,
      isInterventionAstreinte: isIntervention,
      isAstreinteSansIntervention: isSansIntervention,
      suppressionMidi: isFPC ? true : (showMidiOption ? suppressionMidi : false),
      isFPC,
      fpcHeures: isFPC ? fpcHeures : undefined,
      estAstreinte: isAstreinte,
      typeAstreinte,
      isJourFerie: isAstreinte ? isJourFerie : undefined,
      astreinteCompensee: isAstreinte && isJourFerie ? astreinteCompensee : undefined,
    });
    // Reset
    setStartTime('08:00');
    setEndTime('16:45');
    setIsFormation(false);
    setIsFPC(false);
    setTypeAstreinte(null);
    setIsJourFerie(false);
    setAstreinteCompensee(false);
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
    if (!entry.estAstreinte && !entry.isAstreinteSansIntervention && !entry.isInterventionAstreinte) return null;
    
    const t = entry.typeAstreinte;
    if (t === 'PLANIFIEE_SANS' || entry.isAstreinteSansIntervention) {
      return <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-blue-400 text-blue-700 bg-blue-50">🔵 Planifiée</Badge>;
    }
    if (t === 'INTERVENTION_PLANIFIEE') {
      return <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-amber-100 text-amber-800">🟠 Intervention planifiée</Badge>;
    }
    if (t === 'INTERVENTION_APPEL') {
      return <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-purple-100 text-purple-800">🟣 Intervention sur appel</Badge>;
    }
    if (t === 'HORS_TOUR') {
      return <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-gray-200 text-gray-800">⚫ Hors tour</Badge>;
    }
    // Legacy fallback
    if (entry.isInterventionAstreinte) {
      return <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-amber-100 text-amber-800">🟠 Intervention</Badge>;
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
                  {entry.isJourFerie && <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-red-300 text-red-700">Jour férié</Badge>}
                  {entry.astreinteCompensee && <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-green-400 text-green-700">RCA → RCO 012</Badge>}
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
          {showMidiOption && (
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
          {showMidiOption && !suppressionMidi && (
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
                if (v) { setIsFormation(false); setTypeAstreinte(null); }
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
                <p className="text-[10px] text-muted-foreground mt-1">Travail effectif, pas de HS, pas de RE généré</p>
              </div>
            )}

            {!isFPC && (
              <>
                <div className="flex items-center gap-2">
                  <Checkbox id="formation" checked={isFormation} onCheckedChange={v => { setIsFormation(!!v); if (v) setTypeAstreinte(null); }} />
                  <Label htmlFor="formation" className="text-xs cursor-pointer">Formation (= travail effectif)</Label>
                </div>
                
                {/* Type d'astreinte — 4 options */}
                <div className="space-y-1">
                  <Label className="text-xs font-medium">Type d'astreinte</Label>
                  <Select value={typeAstreinte || 'AUCUNE'} onValueChange={v => {
                    const val = v === 'AUCUNE' ? null : v as AstreinteType;
                    setTypeAstreinte(val);
                    if (val) { setIsFormation(false); setIsFPC(false); }
                    if (!val) { setIsJourFerie(false); setAstreinteCompensee(false); }
                  }}>
                    <SelectTrigger className="h-7 text-xs">
                      <SelectValue placeholder="Aucune" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50">
                      <SelectItem value="AUCUNE" className="text-xs">Aucune</SelectItem>
                      {ASTREINTE_OPTIONS.map(opt => (
                        <SelectItem key={opt.value!} value={opt.value!} className="text-xs">
                          {opt.badge} {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Jour férié + compensation (RCO) — uniquement si astreinte */}
                {isAstreinte && (
                  <div className="ml-4 space-y-2 p-2 rounded-lg border border-border bg-muted/30">
                    <div className="flex items-center gap-2">
                      <Checkbox id="jourFerie" checked={isJourFerie} onCheckedChange={v => { setIsJourFerie(!!v); if (!v) setAstreinteCompensee(false); }} />
                      <Label htmlFor="jourFerie" className="text-xs cursor-pointer">Jour férié</Label>
                    </div>
                    {isJourFerie && (
                      <div className="flex items-center gap-2 ml-4">
                        <Checkbox id="compensee" checked={astreinteCompensee} onCheckedChange={v => setAstreinteCompensee(!!v)} />
                        <Label htmlFor="compensee" className="text-xs cursor-pointer">Astreinte compensée (RCA → RCO 012)</Label>
                      </div>
                    )}
                    {!isJourFerie && (
                      <p className="text-[10px] text-muted-foreground">Pas de RCO si repos 11h respecté (règle locale)</p>
                    )}
                  </div>
                )}
              </>
            )}
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
