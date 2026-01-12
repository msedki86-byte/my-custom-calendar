import { useState, useCallback } from 'react';
import { useCalendar } from '@/hooks/useCalendar';
import { CalendarHeader } from '@/components/Calendar/CalendarHeader';
import { CalendarGrid } from '@/components/Calendar/CalendarGrid';
import { VacationBar } from '@/components/Calendar/VacationBar';
import { ArretBar } from '@/components/Calendar/ArretBar';
import { YearView } from '@/components/Calendar/YearView';
import { Legend } from '@/components/Calendar/Legend';
import { SettingsPanel } from '@/components/Settings/SettingsPanel';
import { Toolbar } from '@/components/Toolbar/Toolbar';
import { AddEventDialog } from '@/components/Dialogs/AddEventDialog';
import { EventsManager } from '@/components/Events/EventsManager';
import { startOfMonth, endOfMonth } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarIcon, List } from 'lucide-react';

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
    isHoliday,
    isVacationDay,
    getEventsForDate,
    getArretsForPeriod,
    getAstreintesForYear,
  } = useCalendar();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [addEventOpen, setAddEventOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [viewMode, setViewMode] = useState<'year' | 'month'>('year');

  const currentMonthArrets = getArretsForPeriod(
    startOfMonth(currentDate),
    endOfMonth(currentDate)
  );

  const yearAstreintes = getAstreintesForYear(currentDate.getFullYear());

  const handleDayClick = useCallback((date: Date) => {
    setSelectedDate(date);
    setAddEventOpen(true);
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
      // Cancel only the specific dates selected
      cancelAstreinteDates(eventData.startDate, eventData.endDate, eventData.name);
    }
  }, [addEvent, addPonctualAstreinte, cancelAstreinteDates]);

  const handleYearChange = useCallback((year: number) => {
    goToDate(new Date(year, currentDate.getMonth(), 1));
  }, [currentDate, goToDate]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-6 max-w-7xl mx-auto px-4">
        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="calendar" className="gap-2">
              <CalendarIcon className="h-4 w-4" />
              Calendrier
            </TabsTrigger>
            <TabsTrigger value="events" className="gap-2">
              <List className="h-4 w-4" />
              Gestion des événements
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

            {/* Toolbar */}
            <Toolbar
              currentYear={currentDate.getFullYear()}
              onOpenSettings={() => setSettingsOpen(true)}
              onAddEvent={() => {
                setSelectedDate(new Date());
                setAddEventOpen(true);
              }}
              onYearChange={handleYearChange}
            />

            {viewMode === 'year' ? (
              /* Year View */
              <YearView
                year={currentDate.getFullYear()}
                settings={settings}
                astreintes={yearAstreintes}
                holidays={holidays}
                vacations={vacations}
                arrets={arrets}
                onMonthClick={handleMonthClick}
                isAstreinteDay={isAstreinteDay}
                isHoliday={isHoliday}
                isVacationDay={isVacationDay}
              />
            ) : (
              <>
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
                  isAstreinteDay={isAstreinteDay}
                  isDateCancelled={isDateCancelled}
                  hasConflict={hasConflict}
                  isHoliday={isHoliday}
                  isVacationDay={isVacationDay}
                  getEventsForDate={getEventsForDate}
                  onDayClick={handleDayClick}
                />
              </>
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
