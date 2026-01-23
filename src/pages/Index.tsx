import { useState, useCallback } from 'react';
import { useCalendar } from '@/hooks/useCalendar';
import { UnifiedToolbar } from '@/components/Calendar/UnifiedToolbar';
import { UnifiedCalendarGrid } from '@/components/Calendar/UnifiedCalendarGrid';
import { UnifiedYearView } from '@/components/Calendar/UnifiedYearView';
import { UnifiedVacationBar } from '@/components/Calendar/UnifiedVacationBar';
import { UnifiedArretBar } from '@/components/Calendar/UnifiedArretBar';
import { UnifiedLegend } from '@/components/Calendar/UnifiedLegend';
import { DayDetails } from '@/components/Calendar/DayDetails';
import { SettingsPanel } from '@/components/Settings/SettingsPanel';
import { AddEventDialog } from '@/components/Dialogs/AddEventDialog';
import { EventsManager } from '@/components/Events/EventsManager';
import { ConflictsList } from '@/components/Conflicts/ConflictsList';
import { ExportPDF } from '@/components/Export/ExportPDF';
import { ExcelImport } from '@/components/Import/ExcelImport';
import { startOfMonth, endOfMonth } from 'date-fns';
import { useIsMobile } from '@/hooks/use-mobile';

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
    isREDay,
    getEventsForDate,
    getNonREEventsForDate,
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
  const [activeTab, setActiveTab] = useState('calendar');

  // State for collapsible sections - shared between views
  const [sectionsExpanded, setSectionsExpanded] = useState({
    vacations: !isMobile,
    arrets: !isMobile,
    legend: !isMobile,
  });

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
    setDayDetailsOpen(true);
  }, []);

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

  // Unified Layout - Same features on all screen sizes
  return (
    <div className="min-h-screen bg-background">
      <div className="px-2 sm:px-4 lg:px-6 py-2 sm:py-4 max-w-7xl mx-auto">
        {/* Unified Toolbar - Same options everywhere */}
        <UnifiedToolbar
          currentDate={currentDate}
          currentYear={currentDate.getFullYear()}
          viewMode={viewMode}
          activeTab={activeTab}
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
          onTabChange={setActiveTab}
        />

        {/* Calendar Tab Content */}
        {activeTab === 'calendar' && (
          <div className="mt-3 sm:mt-4">
            {/* Export/Import buttons */}
            <div className="flex items-center justify-end gap-2 mb-3">
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

            {/* Collapsible Info Bars - Same in both views */}
            <div className="space-y-2 sm:space-y-3">
              <UnifiedVacationBar
                vacations={vacations}
                currentDate={currentDate}
                settings={settings}
                viewMode={viewMode}
                defaultExpanded={sectionsExpanded.vacations}
              />
              <UnifiedArretBar
                arrets={arrets}
                currentDate={currentDate}
                settings={settings}
                viewMode={viewMode}
                defaultExpanded={sectionsExpanded.arrets}
              />
            </div>

            {/* Calendar View - Year or Month */}
            <div className="mt-3 sm:mt-4" data-calendar-print>
              {viewMode === 'year' ? (
                <UnifiedYearView
                  year={currentDate.getFullYear()}
                  settings={settings}
                  astreintes={yearAstreintes}
                  vacations={vacations}
                  arrets={arrets}
                  isAstreinteDay={isAstreinteDay}
                  hasConflict={hasConflict}
                  isHoliday={isHoliday}
                  isVacationDay={isVacationDay}
                  isArretDay={isArretDay}
                  isREDay={isREDay}
                  getEventsForDate={getEventsForDate}
                  getNonREEventsForDate={getNonREEventsForDate}
                  isDateCancelled={isDateCancelled}
                  onMonthClick={handleMonthClick}
                  onDayClick={handleDayClick}
                />
              ) : (
                <UnifiedCalendarGrid
                  currentDate={currentDate}
                  settings={settings}
                  astreintes={currentAstreintes}
                  vacations={vacations}
                  arrets={arrets}
                  isAstreinteDay={isAstreinteDay}
                  hasConflict={hasConflict}
                  getConflictDetails={getConflictDetails}
                  isHoliday={isHoliday}
                  isVacationDay={isVacationDay}
                  isArretDay={isArretDay}
                  isREDay={isREDay}
                  getEventsForDate={getEventsForDate}
                  getNonREEventsForDate={getNonREEventsForDate}
                  isDateCancelled={isDateCancelled}
                  onDayClick={handleDayClick}
                  showWeekNumbers={true}
                />
              )}
            </div>

            {/* Collapsible Legend */}
            <div className="mt-3 sm:mt-4">
              <UnifiedLegend 
                settings={settings} 
                defaultExpanded={sectionsExpanded.legend}
              />
            </div>
          </div>
        )}

        {/* Events Management Tab */}
        {activeTab === 'events' && (
          <div className="mt-3 sm:mt-4">
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
          </div>
        )}

        {/* Conflicts Tab */}
        {activeTab === 'conflicts' && (
          <div className="mt-3 sm:mt-4">
            <ConflictsList
              events={events}
              astreintes={yearAstreintes}
              settings={settings}
              year={currentDate.getFullYear()}
            />
          </div>
        )}
      </div>

      {/* Day Details Drawer - Works on all screen sizes */}
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

      {/* Settings Panel - Full functionality */}
      <SettingsPanel
        settings={settings}
        onUpdateSettings={updateSettings}
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      {/* Add Event Dialog - Full functionality */}
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
