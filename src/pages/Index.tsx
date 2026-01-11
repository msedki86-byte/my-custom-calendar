import { useState, useCallback } from 'react';
import { useCalendar } from '@/hooks/useCalendar';
import { CalendarHeader } from '@/components/Calendar/CalendarHeader';
import { CalendarGrid } from '@/components/Calendar/CalendarGrid';
import { VacationBar } from '@/components/Calendar/VacationBar';
import { ArretRow } from '@/components/Calendar/ArretRow';
import { Legend } from '@/components/Calendar/Legend';
import { SettingsPanel } from '@/components/Settings/SettingsPanel';
import { Toolbar } from '@/components/Toolbar/Toolbar';
import { AddEventDialog } from '@/components/Dialogs/AddEventDialog';
import { startOfMonth, endOfMonth, addDays } from 'date-fns';

const Index = () => {
  const {
    currentDate,
    settings,
    events,
    vacations,
    arrets,
    currentAstreintes,
    goToNextMonth,
    goToPrevMonth,
    goToToday,
    goToDate,
    updateSettings,
    addEvent,
    cancelAstreinte,
    addPonctualAstreinte,
    isAstreinteDay,
    hasConflict,
    isHoliday,
    isVacationDay,
    getEventsForDate,
    getArretsForPeriod,
  } = useCalendar();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [addEventOpen, setAddEventOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const currentMonthArrets = getArretsForPeriod(
    startOfMonth(currentDate),
    endOfMonth(currentDate)
  );

  const handleDayClick = useCallback((date: Date) => {
    setSelectedDate(date);
    setAddEventOpen(true);
  }, []);

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
      addPonctualAstreinte(eventData.startDate, eventData.endDate);
    } else if (eventData.type === 'astreinte-cancelled') {
      // Find the astreinte that covers this date and cancel it
      const astreinte = isAstreinteDay(eventData.startDate, currentAstreintes);
      if (astreinte) {
        cancelAstreinte(astreinte.id);
      }
    }
  }, [addEvent, addPonctualAstreinte, cancelAstreinte, isAstreinteDay, currentAstreintes]);

  const handleYearChange = useCallback((year: number) => {
    goToDate(new Date(year, currentDate.getMonth(), 1));
  }, [currentDate, goToDate]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-6 max-w-7xl mx-auto px-4">
        {/* Header */}
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={goToPrevMonth}
          onNextMonth={goToNextMonth}
          onToday={goToToday}
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

        {/* Vacation Bar */}
        <VacationBar
          vacations={vacations}
          currentDate={currentDate}
          settings={settings}
        />

        {/* Calendar Grid */}
        <CalendarGrid
          currentDate={currentDate}
          settings={settings}
          astreintes={currentAstreintes}
          isAstreinteDay={isAstreinteDay}
          hasConflict={hasConflict}
          isHoliday={isHoliday}
          isVacationDay={isVacationDay}
          getEventsForDate={getEventsForDate}
          onDayClick={handleDayClick}
        />

        {/* Arret Row */}
        <ArretRow
          arrets={currentMonthArrets}
          currentDate={currentDate}
          settings={settings}
        />

        {/* Legend */}
        <div className="mt-6">
          <Legend settings={settings} />
        </div>
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
