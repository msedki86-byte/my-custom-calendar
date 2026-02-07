import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileSpreadsheet, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

type ImportType = 'events' | 'vacations' | 'arrets' | 'holidays';

interface ExcelImportProps {
  onImportEvents: (data: any[]) => void;
  onImportVacations: (data: any[]) => void;
  onImportArrets: (data: any[]) => void;
  onImportHolidays: (data: any[]) => void;
}

export function ExcelImport({
  onImportEvents,
  onImportVacations,
  onImportArrets,
  onImportHolidays,
}: ExcelImportProps) {
  const [open, setOpen] = useState(false);
  const [importType, setImportType] = useState<ImportType>('events');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseDate = (value: any): Date | null => {
    if (!value) return null;
    
    // If it's already a Date
    if (value instanceof Date) return value;
    
    // If it's a number (Excel serial date)
    if (typeof value === 'number') {
      const excelEpoch = new Date(1899, 11, 30);
      return new Date(excelEpoch.getTime() + value * 86400000);
    }
    
    // If it's a string, try parsing
    if (typeof value === 'string') {
      // Try DD/MM/YYYY format
      const parts = value.split('/');
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
      }
      
      // Try standard date parsing
      const parsed = new Date(value);
      if (!isNaN(parsed.getTime())) return parsed;
    }
    
    return null;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setSuccess(null);

    try {
      // Read file as text (CSV) or use FileReader for Excel
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        setError('Le fichier est vide ou ne contient pas de données.');
        return;
      }

      const headers = lines[0].split(/[,;\t]/).map(h => h.trim().toLowerCase());
      const data: any[] = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(/[,;\t]/).map(v => v.trim());
        const row: Record<string, any> = {};
        
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });

        // Parse based on import type
        switch (importType) {
          case 'events':
            if (row.nom || row.name) {
              data.push({
                type: 'event',
                name: row.nom || row.name || 'Événement',
                startDate: parseDate(row.debut || row.start || row.datedebut),
                endDate: parseDate(row.fin || row.end || row.datefin),
                color: row.couleur || row.color || '#0ea5e9',
              });
            }
            break;
            
          case 'vacations':
            if (row.nom || row.name) {
              data.push({
                name: row.nom || row.name || 'Vacances',
                startDate: parseDate(row.debut || row.start || row.datedebut),
                endDate: parseDate(row.fin || row.end || row.datefin),
                color: row.couleur || row.color || '#a855f7',
              });
            }
            break;
            
          case 'arrets':
            if (row.nom || row.name) {
              data.push({
                type: row.type === 'prepa' ? 'prepa' : 'arret',
                name: row.nom || row.name || 'Arrêt',
                startDate: parseDate(row.debut || row.start || row.datedebut),
                endDate: parseDate(row.fin || row.end || row.datefin),
                color: row.couleur || row.color || '#22c55e',
                pattern: row.motif || row.pattern || 'none',
                tranche: row.tranche || 'Tr2',
              });
            }
            break;
            
          case 'holidays':
            if (row.nom || row.name) {
              data.push({
                name: row.nom || row.name || 'Férié',
                date: parseDate(row.date),
              });
            }
            break;
        }
      }

      // Filter out invalid entries
      const validData = data.filter(item => {
        if (importType === 'holidays') {
          return item.date !== null;
        }
        return item.startDate !== null && item.endDate !== null;
      });

      if (validData.length === 0) {
        setError('Aucune donnée valide trouvée. Vérifiez le format du fichier.');
        return;
      }

      // Call appropriate import function
      switch (importType) {
        case 'events':
          onImportEvents(validData);
          break;
        case 'vacations':
          onImportVacations(validData);
          break;
        case 'arrets':
          onImportArrets(validData);
          break;
        case 'holidays':
          onImportHolidays(validData);
          break;
      }

      setSuccess(`${validData.length} élément(s) importé(s) avec succès.`);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError('Erreur lors de la lecture du fichier. Utilisez un fichier CSV.');
    }
  };

  const getExpectedFormat = () => {
    switch (importType) {
      case 'events':
        return 'nom; debut; fin; couleur';
      case 'vacations':
        return 'nom; debut; fin; couleur';
      case 'arrets':
        return 'nom; type; tranche; debut; fin; couleur; motif';
      case 'holidays':
        return 'nom; date';
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1 sm:gap-2 h-8 text-xs sm:text-sm px-2 sm:px-3">
          <Upload className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Importer Excel/CSV</span>
          <span className="sm:hidden">Import</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Importer des données
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Type de données à importer</label>
            <Select value={importType} onValueChange={(v) => setImportType(v as ImportType)}>
              <SelectTrigger className="bg-background" onPointerDown={(e) => e.stopPropagation()}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover z-[100]" position="popper" sideOffset={4}>
                <SelectItem value="events">Événements</SelectItem>
                <SelectItem value="vacations">Vacances scolaires</SelectItem>
                <SelectItem value="arrets">Arrêts de tranches</SelectItem>
                <SelectItem value="holidays">Jours fériés</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
            <p className="font-medium mb-1">Format attendu (CSV avec séparateur ; ou ,):</p>
            <code className="text-xs">{getExpectedFormat()}</code>
            <p className="mt-2 text-xs">Dates au format DD/MM/YYYY</p>
          </div>

          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.txt,.xls,.xlsx"
              onChange={handleFileChange}
              className="block w-full text-sm text-muted-foreground
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-primary file:text-primary-foreground
                hover:file:bg-primary/90
                cursor-pointer"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <AlertDescription className="text-green-600">{success}</AlertDescription>
            </Alert>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
