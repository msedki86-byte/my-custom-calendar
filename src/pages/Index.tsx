import { useState, useCallback } from 'react';
import { useCalendar } from '@/hooks/useCalendar';
import { useIsMobile } from '@/hooks/use-mobile';
import { CalendarHeader } from '@/components/Calendar/CalendarHeader';
import { CalendarGrid } from '@/components/Calendar/CalendarGrid';
import { MobileCalendarGrid } from '@/components/Calendar/MobileCalendarGrid';
import { MobileToolbar } from '@/components/Calendar/MobileToolbar';
import { MobileYearView } from '@/components/Calendar/MobileYearView';
import { MobileVacationBar } from '@/components/Calendar/MobileVacationBar';
import { MobileArretBar } from '@/components/Calendar/MobileArretBar';
import { MobileLegend } from '@/components/Calendar/MobileLegend';
import { DayDetails } from '@/components/Calendar/DayDetails';
import { VacationBar } from '@/components/Calendar/VacationBar';
import { ArretBar } from '@/components/Calendar/ArretBar';
import { YearView } from '@/components/Calendar/YearView';
import { Legend } from '@/components/Calendar/Legend';
import { SettingsPanel } from '@/components/Settings/SettingsPanel';
import { Toolbar } from '@/components/Toolbar/Toolbar';
import { AddEventDialog } from '@/components/Dialogs/AddEventDialog';
import { EventsManager } from '@/components/Events/EventsManager';
import { ConflictsList } from '@/components/Conflicts/ConflictsList';
import { ExportPDF } from '@/components/Export/ExportPDF';
import { ExcelImport } from '@/components/Import/ExcelImport';
import { startOfMonth, endOfMonth } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarIcon, List, AlertTriangle } from 'lucide-react';

const Index = () => {
  const {
    currentDate,
    settings,
    events,
    vacations,
    holidays,
    arrets,
    currentAstreintes,
    ponctualAstreintes,
    cancelledAstreinteDates,
    goToNextMonth,
    goToPrevMonth,
    goToToday,
    goToDate,
    updateSettings,
    addEvent,
    updateEvent,
    removeEvent,
    cancelAstreinteDates,
    restoreCancelledDate,
    addPonctualAstreinte,
    updatePonctualAstreinte,
    removePonctualAstreinte,
    addArret,
    updateArret,
    deleteArret,
    addVacation,
    updateVacation,
    deleteVacation,
    addHoliday,
    updateHoliday,
    deleteHoliday,
    isAstreinteDay,
    isDateCancelled,
    hasConflict,
    getConflictDetails,
    isHoliday,
    isVacationDay,
    isArretDay,
    getEventsForDate,
    getArretsForPeriod,
    getAstreintesForYear,
    importEvents,
    importVacations,
    importArrets,
    importHolidays,
  } = useCalendar();

  const isMobile = useIsMobile();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [addEventOpen, setAddEventOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [dayDetailsOpen, setDayDetailsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'year' | 'month'>('month');

  const currentMonthArrets = getArretsForPeriod(
    startOfMonth(currentDate),
    endOfMonth(currentDate)
  );

  const yearAstreintes = getAstreintesForYear(currentDate.getFullYear());

  // Get data for selected day
  const selectedDayData = selectedDate ? {
    events: getEventsForDate(selectedDate),
    astreinte: isAstreinteDay(selectedDate, currentAstreintes),
    holiday: isHoliday(selectedDate),
    vacation: isVacationDay(selectedDate),
    arret: isArretDay(selectedDate),
    cancelled: isDateCancelled(selectedDate),
  } : null;

  const handleDayClick = useCallback((date: Date) => {
    setSelectedDate(date);
    if (isMobile) {
      setDayDetailsOpen(true);
    } else {
      setAddEventOpen(true);
    }
  }, [isMobile]);

  const handleMonthClick = useCallback((date: Date) => {
    goToDate(date);
    setViewMode('month');
  }, [goToDate]);

  const handleAddEvent = useCallback((eventData: {
    type: 'event' | 'astreinte-ponctuelle' | 'astreinte-cancelled';
    name: string;
    startDate: Date;
    endDate: Date;
    color: string;
  }) => {
    if (eventData.type === 'event') {
      addEvent({
        type: 'event',
        name: eventData.name,
        startDate: eventData.startDate,
        endDate: eventData.endDate,
        color: eventData.color,
      });
    } else if (eventData.type === 'astreinte-ponctuelle') {
      addPonctualAstreinte(eventData.startDate, eventData.endDate, eventData.name);
    } else if (eventData.type === 'astreinte-cancelled') {
      cancelAstreinteDates(eventData.startDate, eventData.endDate, eventData.name);
    }
  }, [addEvent, addPonctualAstreinte, cancelAstreinteDates]);

  const handleYearChange = useCallback((year: number) => {
    goToDate(new Date(year, currentDate.getMonth(), 1));
  }, [currentDate, goToDate]);

  const openAddEventFromDetails = useCallback(() => {
    setDayDetailsOpen(false);
    setAddEventOpen(true);
  }, []);

  // Mobile Layout - Unified with same options as desktop
  if (isMobile) {
    return (
      <div className="min-h-screen bg-background">
        <div className="px-3 py-2 max-w-lg mx-auto">
          {/* Mobile Toolbar - Same options as desktop */}
          <MobileToolbar
            currentDate={currentDate}
            currentYear={currentDate.getFullYear()}
            viewMode={viewMode}
            onPrevMonth={viewMode === 'year' 
              ? () => goToDate(new Date(currentDate.getFullYear() - 1, 0, 1))
              : goToPrevMonth
            }
            onNextMonth={viewMode === 'year'
              ? () => goToDate(new Date(currentDate.getFullYear() + 1, 0, 1))
              : goToNextMonth
            }
            onToday={goToToday}
            onAddEvent={() => {
              setSelectedDate(new Date());
              setAddEventOpen(true);
            }}
            onOpenSettings={() => setSettingsOpen(true)}
            onViewModeChange={setViewMode}
            onYearChange={handleYearChange}
          />

          {/* Info Bars - Same in both views */}
          <div className="mt-3 space-y-2">
            <MobileVacationBar
              vacations={vacations}
              currentDate={currentDate}
              settings={settings}
              viewMode={viewMode}
            />
            <MobileArretBar
              arrets={arrets}
              currentDate={currentDate}
              settings={settings}
              viewMode={viewMode}
            />
          </div>

          {/* Calendar View - Year or Month */}
          <div className="mt-3">
            {viewMode === 'year' ? (
              <MobileYearView
                year={currentDate.getFullYear()}
                settings={settings}
                astreintes={yearAstreintes}
                isAstreinteDay={isAstreinteDay}
                hasConflict={hasConflict}
                isHoliday={isHoliday}
                isVacationDay={isVacationDay}
                isArretDay={isArretDay}
                getEventsForDate={getEventsForDate}
                isDateCancelled={isDateCancelled}
                onMonthClick={handleMonthClick}
              />
            ) : (
              <MobileCalendarGrid
                currentDate={currentDate}
                settings={settings}
                astreintes={currentAstreintes}
                isAstreinteDay={isAstreinteDay}
                hasConflict={hasConflict}
                isHoliday={isHoliday}
                isVacationDay={isVacationDay}
                isArretDay={isArretDay}
                getEventsForDate={getEventsForDate}
                isDateCancelled={isDateCancelled}
                onDayClick={handleDayClick}
              />
            )}
          </div>

          {/* Legend - Same complete legend in both views */}
          <div className="mt-3">
            <MobileLegend settings={settings} expanded={false} />
          </div>
        </div>

        {/* Day Details Drawer */}
        <DayDetails
          date={selectedDate || null}
          isOpen={dayDetailsOpen}
          onClose={() => setDayDetailsOpen(false)}
          onAddEvent={openAddEventFromDetails}
          events={selectedDayData?.events || []}
          astreinte={selectedDayData?.astreinte || null}
          holiday={selectedDayData?.holiday || null}
          vacation={selectedDayData?.vacation || null}
          arret={selectedDayData?.arret || null}
          cancelled={selectedDayData?.cancelled || null}
          settings={settings}
        />

        {/* Settings Panel */}
        <SettingsPanel
          settings={settings}
          onUpdateSettings={updateSettings}
          isOpen={settingsOpen}
          onClose={() => setSettingsOpen(false)}
        />

        {/* Add Event Dialog */}
        <AddEventDialog
          isOpen={addEventOpen}
          onClose={() => setAddEventOpen(false)}
          onAdd={handleAddEvent}
          initialDate={selectedDate}
        />

        {/* Backdrop for settings */}
        {settingsOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setSettingsOpen(false)}
          />
        )}
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="container py-2 sm:py-4 lg:py-6 max-w-7xl mx-auto px-2 sm:px-4">
        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="mb-2 sm:mb-4 lg:mb-6 flex-wrap h-auto gap-1">
            <TabsTrigger value="calendar" className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3">
              <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Calendrier</span>
              <span className="xs:hidden">Cal.</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3">
              <List className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Gestion des événements</span>
              <span className="sm:hidden">Événements</span>
            </TabsTrigger>
            <TabsTrigger value="conflicts" className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3">
              <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4" />
              Conflits
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar">
            {/* Header */}
            <CalendarHeader
              currentDate={currentDate}
              onPrevMonth={goToPrevMonth}
              onNextMonth={goToNextMonth}
              onToday={goToToday}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />

            {/* Toolbar with PDF Export */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <Toolbar
                currentYear={currentDate.getFullYear()}
                onOpenSettings={() => setSettingsOpen(true)}
                onAddEvent={() => {
                  setSelectedDate(new Date());
                  setAddEventOpen(true);
                }}
                onYearChange={handleYearChange}
              />
              <div className="flex items-center gap-2">
                <ExportPDF 
                  viewMode={viewMode} 
                  year={currentDate.getFullYear()} 
                  month={currentDate.getMonth()} 
                />
                <ExcelImport
                  onImportEvents={importEvents}
                  onImportVacations={importVacations}
                  onImportArrets={importArrets}
                  onImportHolidays={importHolidays}
                />
              </div>
            </div>

            {viewMode === 'year' ? (
              /* Year View */
              <div data-calendar-print>
                <YearView
                  year={currentDate.getFullYear()}
                  settings={settings}
                  astreintes={yearAstreintes}
                  holidays={holidays}
                  vacations={vacations}
                  arrets={arrets}
                  onMonthClick={handleMonthClick}
                  onDayClick={handleDayClick}
                  isAstreinteDay={isAstreinteDay}
                  isDateCancelled={isDateCancelled}
                  isHoliday={isHoliday}
                  isVacationDay={isVacationDay}
                  isArretDay={isArretDay}
                  getEventsForDate={getEventsForDate}
                  hasConflict={hasConflict}
                  getConflictDetails={getConflictDetails}
                />
              </div>
            ) : (
              <div data-calendar-print>
                {/* Vacation Bar */}
                <VacationBar
                  vacations={vacations}
                  currentDate={currentDate}
                  settings={settings}
                />

                {/* Arret Bar - like vacations */}
                <ArretBar
                  arrets={arrets}
                  currentDate={currentDate}
                  settings={settings}
                />

                {/* Calendar Grid */}
                <CalendarGrid
                  currentDate={currentDate}
                  settings={settings}
                  astreintes={currentAstreintes}
                  arrets={arrets}
                  isAstreinteDay={isAstreinteDay}
                  isDateCancelled={isDateCancelled}
                  hasConflict={hasConflict}
                  getConflictDetails={getConflictDetails}
                  isHoliday={isHoliday}
                  isVacationDay={isVacationDay}
                  isArretDay={isArretDay}
                  getEventsForDate={getEventsForDate}
                  onDayClick={handleDayClick}
                />
              </div>
            )}

            {/* Legend */}
            <div className="mt-6">
              <Legend settings={settings} />
            </div>
          </TabsContent>

          <TabsContent value="events">
            <EventsManager
              events={events}
              vacations={vacations}
              arrets={arrets}
              holidays={holidays}
              ponctualAstreintes={ponctualAstreintes}
              cancelledAstreinteDates={cancelledAstreinteDates}
              onUpdateEvent={updateEvent}
              onDeleteEvent={removeEvent}
              onUpdateVacation={updateVacation}
              onDeleteVacation={deleteVacation}
              onUpdateArret={updateArret}
              onDeleteArret={deleteArret}
              onUpdateHoliday={updateHoliday}
              onDeleteHoliday={deleteHoliday}
              onRemovePonctualAstreinte={removePonctualAstreinte}
              onUpdatePonctualAstreinte={updatePonctualAstreinte}
              onRestoreCancelledDate={restoreCancelledDate}
              onAddVacation={addVacation}
              onAddArret={addArret}
              onAddHoliday={addHoliday}
              onAddPonctualAstreinte={addPonctualAstreinte}
              onCancelAstreinteDates={cancelAstreinteDates}
            />
          </TabsContent>

          <TabsContent value="conflicts">
            <ConflictsList
              events={events}
              astreintes={yearAstreintes}
              settings={settings}
              year={currentDate.getFullYear()}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Settings Panel */}
      <SettingsPanel
        settings={settings}
        onUpdateSettings={updateSettings}
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      {/* Add Event Dialog */}
      <AddEventDialog
        isOpen={addEventOpen}
        onClose={() => setAddEventOpen(false)}
        onAdd={handleAddEvent}
        initialDate={selectedDate}
      />

      {/* Backdrop for settings */}
      {settingsOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setSettingsOpen(false)}
        />
      )}
    </div>
  );
};

export default Index;
