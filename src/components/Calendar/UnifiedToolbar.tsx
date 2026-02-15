import { ChevronLeft, ChevronRight, Plus, Settings, LayoutGrid, Calendar as CalendarIcon, List, AlertTriangle, MoreVertical, FileText, Sheet, CalendarPlus, CalendarMinus, ClipboardCheck } from 'lucide-react';
import { useOrientation } from '@/hooks/useOrientation';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { format, getWeek, endOfMonth } from 'date-fns';
import { fr } from 'date-fns/locale';

type ViewMode = 'year' | 'month' | 'week';

interface UnifiedToolbarProps {
  currentDate: Date;
  currentYear: number;
  viewMode: ViewMode;
  activeTab: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onAddEvent: () => void;
  onOpenSettings: () => void;
  onViewModeChange: (mode: ViewMode) => void;
  onYearChange: (year: number) => void;
  onTabChange: (tab: string) => void;
  onExportPDF?: () => void;
  onImport?: () => void;
  onICSImport?: () => void;
  onICSExport?: () => void;
}

const years = Array.from({ length: 10 }, (_, i) => 2025 + i);

export function UnifiedToolbar({ 
  currentDate,
  currentYear,
  viewMode,
  activeTab,
  onPrevMonth, 
  onNextMonth, 
  onToday,
  onAddEvent,
  onOpenSettings,
  onViewModeChange,
  onYearChange,
  onTabChange,
  onExportPDF,
  onImport,
  onICSImport,
  onICSExport,
}: UnifiedToolbarProps) {
  const { isLandscape } = useOrientation();
  const weekNumberStart = getWeek(currentDate, { locale: fr, weekStartsOn: 1 });
  const monthEnd = endOfMonth(currentDate);
  const weekNumberEnd = getWeek(monthEnd, { locale: fr, weekStartsOn: 1 });

  // Always show all 4 tabs
  const showConflitsTab = true;

  return (
    <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border pb-2 space-y-1.5">
      {/* Title Row with Year Selector */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <img src="/images/logo-wplanner.png" alt="W Planner" className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-contain flex-shrink-0" />
          <div className="min-w-0">
            <h1 className="text-base sm:text-xl font-bold text-foreground capitalize truncate">
              {viewMode === 'year' 
                ? currentYear
                : format(currentDate, 'MMMM yyyy', { locale: fr })
              }
            </h1>
            {viewMode === 'month' && (
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                {weekNumberStart === weekNumberEnd
                  ? `Semaine ${weekNumberStart}`
                  : `Semaines ${weekNumberStart} – ${weekNumberEnd}`
                }
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {/* Mobile: Add Event button at top */}
          <Button onClick={onAddEvent} size="sm" className="sm:hidden h-8 gap-1 rounded-lg shadow-sm text-xs">
            <Plus className="w-3 h-3" />
          </Button>
          <Select 
            value={currentYear.toString()} 
            onValueChange={(v) => onYearChange(parseInt(v))}
          >
            <SelectTrigger className="w-20 sm:w-24 h-8 text-sm font-semibold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {years.map(year => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* Desktop: Show all buttons */}
          <div className="hidden sm:flex items-center gap-1">
            {onExportPDF && (
              <Button variant="ghost" size="icon" onClick={onExportPDF} className="h-8 w-8" title="Exporter PDF">
                <FileText className="w-4 h-4 text-red-600" />
              </Button>
            )}
            {onImport && (
              <Button variant="ghost" size="icon" onClick={onImport} className="h-8 w-8" title="Importer Excel/CSV">
                <Sheet className="w-4 h-4 text-green-600" />
              </Button>
            )}
            {onICSImport && (
              <Button variant="ghost" size="icon" onClick={onICSImport} className="h-8 w-8" title="Importer ICS">
                <CalendarPlus className="w-4 h-4 text-blue-600" />
              </Button>
            )}
            {onICSExport && (
              <Button variant="ghost" size="icon" onClick={onICSExport} className="h-8 w-8" title="Exporter ICS">
                <CalendarMinus className="w-4 h-4 text-orange-600" />
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={onOpenSettings} className="h-8 w-8" title="Paramètres">
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile: Show menu button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="sm:hidden">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-popover z-50">
              <DropdownMenuItem onClick={() => onTabChange('events')}>
                <List className="w-4 h-4 mr-2" />
                Gestion
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onTabChange('conflicts')}>
                <AlertTriangle className="w-4 h-4 mr-2" />
                Conflits
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onTabChange('pointage')}>
                <ClipboardCheck className="w-4 h-4 mr-2" />
                Pointage
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onExportPDF}>
                <FileText className="w-4 h-4 mr-2 text-red-600" />
                Exporter PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onImport}>
                <Sheet className="w-4 h-4 mr-2 text-green-600" />
                Importer Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onICSImport}>
                <CalendarPlus className="w-4 h-4 mr-2 text-blue-600" />
                Importer ICS
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onICSExport}>
                <CalendarMinus className="w-4 h-4 mr-2 text-orange-600" />
                Exporter ICS
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onOpenSettings}>
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Tabs - Desktop */}
      <div className="hidden sm:block overflow-x-auto -mx-3 px-3">
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList className={`h-9 w-full grid ${showConflitsTab ? 'grid-cols-4' : 'grid-cols-3'} sm:w-auto sm:inline-flex`}>
            <TabsTrigger value="calendar" className="gap-1 text-xs px-2 sm:px-3 h-7">
              <CalendarIcon className="h-3 w-3" />
              Calendrier
            </TabsTrigger>
            <TabsTrigger value="pointage" className="gap-1 text-xs px-2 sm:px-3 h-7">
              <ClipboardCheck className="h-3 w-3" />
              Pointage
            </TabsTrigger>
            {showConflitsTab && (
              <TabsTrigger value="conflicts" className="gap-1 text-xs px-2 sm:px-3 h-7">
                <AlertTriangle className="h-3 w-3" />
                Conflits
              </TabsTrigger>
            )}
            <TabsTrigger value="events" className="gap-1 text-xs px-2 sm:px-3 h-7">
              <List className="h-3 w-3" />
              Gestion
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Mobile: 4 tabs always visible */}
      <div className="sm:hidden flex items-center justify-center">
        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => onTabChange('calendar')}
            className={`px-2.5 py-1.5 rounded-full transition-colors ${
              activeTab === 'calendar' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}
          >
            <CalendarIcon className="h-3 w-3 inline mr-0.5" />
            <span translate="no">Calendrier</span>
          </button>
          <button
            onClick={() => onTabChange('pointage')}
            className={`px-2.5 py-1.5 rounded-full transition-colors ${
              activeTab === 'pointage' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}
          >
            <ClipboardCheck className="h-3 w-3 inline mr-0.5" />
            Pointage
          </button>
          <button
            onClick={() => onTabChange('conflicts')}
            className={`px-2.5 py-1.5 rounded-full transition-colors ${
              activeTab === 'conflicts' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}
          >
            <AlertTriangle className="h-3 w-3 inline mr-0.5" />
            Conflits
          </button>
          <button
            onClick={() => onTabChange('events')}
            className={`px-2.5 py-1.5 rounded-full transition-colors ${
              activeTab === 'events' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}
          >
            <List className="h-3 w-3 inline mr-0.5" />
            Gestion
          </button>
        </div>
      </div>

      {/* View Mode Toggle + Navigation */}
      {activeTab === 'calendar' && (
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center rounded-lg border border-border bg-muted/50 p-0.5">
            <Button 
              variant={viewMode === 'year' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => onViewModeChange('year')}
              className="h-7 px-2 text-xs rounded-md gap-1"
            >
              <LayoutGrid className="w-3 h-3" />
              <span translate="no">Année</span>
            </Button>
            <Button 
              variant={viewMode === 'month' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => onViewModeChange('month')}
              className="h-7 px-2 text-xs rounded-md gap-1"
            >
              <CalendarIcon className="w-3 h-3" />
              Mois
            </Button>
            <Button 
              variant={viewMode === 'week' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => onViewModeChange('week')}
              className="h-7 px-2 text-xs rounded-md gap-1"
            >
              <List className="w-3 h-3" />
              Sem.
            </Button>
          </div>

          <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
            <Button variant="ghost" size="icon" onClick={onPrevMonth} className="h-8 w-8 rounded-md">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onToday} className="h-8 px-2 rounded-md text-xs font-medium">
              <span className="hidden sm:inline">Aujourd'hui</span>
              <span className="sm:hidden">Auj.</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={onNextMonth} className="h-8 w-8 rounded-md">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <Button onClick={onAddEvent} size="sm" className="hidden sm:flex h-8 gap-1 rounded-lg shadow-sm text-xs">
            <Plus className="w-3 h-3" />
            <span>Ajouter</span>
          </Button>
        </div>
      )}
    </div>
  );
}