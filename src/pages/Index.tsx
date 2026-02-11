import { useState, useCallback, useEffect } from 'react';
import { isWeekend, eachDayOfInterval } from 'date-fns';
import { useCalendar } from '@/hooks/useCalendar';
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation';
import { UnifiedToolbar } from '@/components/Calendar/UnifiedToolbar';
import { UnifiedCalendarGrid } from '@/components/Calendar/UnifiedCalendarGrid';
import { UnifiedYearView } from '@/components/Calendar/UnifiedYearView';
import { UnifiedArretBar } from '@/components/Calendar/UnifiedArretBar';
import { UnifiedLegend } from '@/components/Calendar/UnifiedLegend';
import { DayDetails } from '@/components/Calendar/DayDetails';
import { WeekTimeline } from '@/components/Calendar/WeekTimeline';
import { SettingsPanel } from '@/components/Settings/SettingsPanel';
import { AddEventDialog } from '@/components/Dialogs/AddEventDialog';
import { EventsManager } from '@/components/Events/EventsManager';
import { ConflictsList } from '@/components/Conflicts/ConflictsList';
import { exportPDF, exportAnnualPDF, exportMonthlyPDF } from '@/components/Export/ExportPDF';
import { ExcelImport } from '@/components/Import/ExcelImport';
import { ICSImportDialog } from '@/components/Import/ICSImportDialog';
import { ICSExportDialog } from '@/components/Export/ICSExportDialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { startOfWeek, getWeek } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';

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
    isCPDay,
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
  const [importOpen, setImportOpen] = useState(false);
  const [icsImportOpen, setIcsImportOpen] = useState(false);
  const [icsExportOpen, setIcsExportOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [dayDetailsOpen, setDayDetailsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'year' | 'month' | 'week'>('month');
  const [activeTab, setActiveTab] = useState('calendar');
  const [weekViewDate, setWeekViewDate] = useState<Date>(new Date());
  useEffect(() => {
    const handleRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled rejection:", event.reason);
      toast.error("Une erreur inattendue s'est produite.");
      event.preventDefault();
    };
    window.addEventListener("unhandledrejection", handleRejection);
    return () => window.removeEventListener("unhandledrejection", handleRejection);
  }, []);

  const defaultSectionsExpanded = !isMobile;
  const yearAstreintes = getAstreintesForYear(currentDate.getFullYear());

  // Swipe navigation
  const handleSwipeNext = useCallback(() => {
    try {
      if (viewMode === 'year') {
        const nextYear = currentDate.getFullYear() + 1;
        if (isNaN(nextYear) || nextYear < 1900 || nextYear > 2100) return;
        goToDate(new Date(nextYear, 0, 1));
      } else {
        if (currentDate.getMonth() === 11) {
          const nextYear = currentDate.getFullYear() + 1;
          if (isNaN(nextYear) || nextYear < 1900 || nextYear > 2100) return;
          goToDate(new Date(nextYear, 0, 1));
        } else {
          goToNextMonth();
        }
      }
    } catch (error) {
      console.error("Navigation error:", error);
    }
  }, [viewMode, currentDate, goToDate, goToNextMonth]);

  const handleSwipePrev = useCallback(() => {
    try {
      if (viewMode === 'year') {
        const prevYear = currentDate.getFullYear() - 1;
        if (isNaN(prevYear) || prevYear < 1900 || prevYear > 2100) return;
        goToDate(new Date(prevYear, 0, 1));
      } else {
        if (currentDate.getMonth() === 0) {
          const prevYear = currentDate.getFullYear() - 1;
          if (isNaN(prevYear) || prevYear < 1900 || prevYear > 2100) return;
          goToDate(new Date(prevYear, 11, 1));
        } else {
          goToPrevMonth();
        }
      }
    } catch (error) {
      console.error("Navigation error:", error);
    }
  }, [viewMode, currentDate, goToDate, goToPrevMonth]);

  const swipeHandlers = useSwipeNavigation(handleSwipeNext, handleSwipePrev);

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
    if (!(date instanceof Date) || isNaN(date.getTime())) return;
    goToDate(date);
    setViewMode('month');
  }, [goToDate]);

  const handleAddEvent = useCallback((eventData: {
    type: 'event' | 'astreinte-ponctuelle' | 'astreinte-cancelled' | 're' | 'cp';
    name: string;
    startDate: Date;
    endDate: Date;
    startTime?: string;
    endTime?: string;
    color: string;
    excludeWeekends?: boolean;
  }) => {
    const shouldExcludeWeekends = eventData.excludeWeekends;
    
    if (eventData.type === 'event' || eventData.type === 're' || eventData.type === 'cp') {
      const eventColor = eventData.type === 're' ? settings.reColor : eventData.type === 'cp' ? settings.cpColor : eventData.color;
      const eventType = eventData.type;
      const eventName = eventData.type === 're' ? (eventData.name || 'RE') : eventData.type === 'cp' ? (eventData.name || 'CP') : eventData.name;
      
      if (shouldExcludeWeekends) {
        // Create individual events for each non-weekend day
        const days = eachDayOfInterval({ start: eventData.startDate, end: eventData.endDate });
        const weekdays = days.filter(d => !isWeekend(d));
        // Group consecutive weekdays into ranges
        let rangeStart: Date | null = null;
        let rangeEnd: Date | null = null;
        weekdays.forEach((day, i) => {
          if (!rangeStart) { rangeStart = day; rangeEnd = day; return; }
          const prevDay = weekdays[i - 1];
          const diff = (day.getTime() - prevDay.getTime()) / (1000 * 60 * 60 * 24);
          if (diff === 1) {
            rangeEnd = day;
          } else {
            addEvent({ type: eventType, name: eventName, startDate: rangeStart, endDate: rangeEnd!, startTime: eventData.startTime, endTime: eventData.endTime, color: eventColor });
            rangeStart = day;
            rangeEnd = day;
          }
        });
        if (rangeStart && rangeEnd) {
          addEvent({ type: eventType, name: eventName, startDate: rangeStart, endDate: rangeEnd, startTime: eventData.startTime, endTime: eventData.endTime, color: eventColor });
        }
      } else {
        addEvent({ type: eventType, name: eventName, startDate: eventData.startDate, endDate: eventData.endDate, startTime: eventData.startTime, endTime: eventData.endTime, color: eventColor });
      }
    } else if (eventData.type === 'astreinte-ponctuelle') {
      addPonctualAstreinte(eventData.startDate, eventData.endDate, eventData.name);
    } else if (eventData.type === 'astreinte-cancelled') {
      cancelAstreinteDates(eventData.startDate, eventData.endDate, eventData.name, eventData.startTime, eventData.endTime);
    }
  }, [addEvent, addPonctualAstreinte, cancelAstreinteDates, settings.reColor, settings.cpColor]);

  const handleYearChange = useCallback((year: number) => {
    const numericYear = typeof year === 'string' ? parseInt(year, 10) : year;
    if (isNaN(numericYear) || numericYear < 1900 || numericYear > 2100) return;
    const safeMonth = Math.min(Math.max(currentDate.getMonth(), 0), 11);
    const safeDate = new Date(numericYear, safeMonth, 1);
    if (!isNaN(safeDate.getTime())) goToDate(safeDate);
  }, [currentDate, goToDate]);

  const openAddEventFromDetails = useCallback(() => {
    setDayDetailsOpen(false);
    setAddEventOpen(true);
  }, []);

  if (!(currentDate instanceof Date) || isNaN(currentDate.getTime())) {
    return <div className="p-4 text-center text-muted-foreground">Chargement du calendrier…</div>;
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background watermark logo - full page at 15% opacity */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img src="/images/logo-calendar.png" alt="" className="w-full h-full object-contain opacity-[0.15]" />
      </div>
      <div className="px-2 sm:px-4 lg:px-6 py-2 sm:py-4 max-w-7xl mx-auto relative z-10">
        <UnifiedToolbar
          currentDate={currentDate}
          currentYear={currentDate.getFullYear()}
          viewMode={viewMode}
          activeTab={activeTab}
          onPrevMonth={viewMode === 'year' 
            ? () => { const y = currentDate.getFullYear() - 1; if (y >= 1900 && y <= 2100) goToDate(new Date(y, 0, 1)); }
            : goToPrevMonth
          }
          onNextMonth={viewMode === 'year'
            ? () => { const y = currentDate.getFullYear() + 1; if (y >= 1900 && y <= 2100) goToDate(new Date(y, 0, 1)); }
            : goToNextMonth
          }
          onToday={goToToday}
          onAddEvent={() => { setSelectedDate(new Date()); setAddEventOpen(true); }}
          onOpenSettings={() => setSettingsOpen(true)}
          onViewModeChange={setViewMode}
          onYearChange={handleYearChange}
          onTabChange={setActiveTab}
          onExportPDF={() => {
            if (viewMode === 'year') {
              exportAnnualPDF({
                year: currentDate.getFullYear(),
                settings,
                events,
                astreintes: yearAstreintes,
                vacations,
                arrets,
                holidays,
                cancelledDates: cancelledAstreinteDates,
              });
            } else if (viewMode === 'month') {
              exportMonthlyPDF({
                year: currentDate.getFullYear(),
                month: currentDate.getMonth(),
                settings,
                events,
                astreintes: yearAstreintes,
                vacations,
                arrets,
                holidays,
                cancelledDates: cancelledAstreinteDates,
              });
            } else {
              exportPDF(viewMode);
            }
          }}
          onImport={() => setImportOpen(true)}
          onICSImport={() => setIcsImportOpen(true)}
          onICSExport={() => setIcsExportOpen(true)}
        />

        {activeTab === 'calendar' && (
          <div className="mt-2 sm:mt-3">
            <div className="mb-2 sm:mb-3" data-legend-print>
              <UnifiedLegend 
                settings={settings} 
                defaultExpanded={defaultSectionsExpanded}
                viewMode={viewMode}
                currentDate={currentDate}
                arrets={arrets}
                vacations={vacations}
                events={events}
                holidays={holidays}
                astreintes={yearAstreintes}
                ponctualAstreintes={ponctualAstreintes}
                cancelledAstreinteDates={cancelledAstreinteDates}
              />
            </div>

            {/* Calendar View with swipe */}
            <div className="mt-3 sm:mt-4" data-calendar-print {...swipeHandlers}>
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
                  isCPDay={isCPDay}
                  getEventsForDate={getEventsForDate}
                  getNonREEventsForDate={getNonREEventsForDate}
                  isDateCancelled={isDateCancelled}
                  onMonthClick={handleMonthClick}
                  onDayClick={handleDayClick}
                />
              ) : viewMode === 'week' ? (
                <WeekTimeline
                  weekStartDate={weekViewDate}
                  settings={settings}
                  astreintes={currentAstreintes}
                  isAstreinteDay={isAstreinteDay}
                  isHoliday={isHoliday}
                  getEventsForDate={getEventsForDate}
                  isDateCancelled={isDateCancelled}
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
                  isCPDay={isCPDay}
                  getEventsForDate={getEventsForDate}
                  getNonREEventsForDate={getNonREEventsForDate}
                  isDateCancelled={isDateCancelled}
                  onDayClick={handleDayClick}
                  onWeekNumberClick={(weekDate: Date) => {
                    setWeekViewDate(weekDate);
                    setViewMode('week');
                  }}
                  showWeekNumbers={true}
                />
              )}
            </div>

            {/* Collapsible Arrêts - BELOW calendar */}
            <div className="mt-2 sm:mt-3" data-arret-print>
              <UnifiedArretBar
                arrets={arrets}
                currentDate={currentDate}
                settings={settings}
                viewMode={viewMode}
                defaultExpanded={defaultSectionsExpanded}
              />
            </div>



          </div>
        )}

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
              onAddEvent={addEvent}
            />
          </div>
        )}

        {activeTab === 'conflicts' && (
          <div className="mt-3 sm:mt-4">
            <ConflictsList
              events={events}
              astreintes={yearAstreintes}
              settings={settings}
              year={currentDate.getFullYear()}
              cancelledDates={cancelledAstreinteDates}
            />
          </div>
        )}
      </div>

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
        arrets={arrets}
        cancelled={selectedDayData?.cancelled || null}
        settings={settings}
      />

      <SettingsPanel
        settings={settings}
        onUpdateSettings={updateSettings}
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      <AddEventDialog
        isOpen={addEventOpen}
        onClose={() => setAddEventOpen(false)}
        onAdd={handleAddEvent}
        initialDate={selectedDate}
        existingEvents={events.map(e => ({ name: e.name, startDate: e.startDate, endDate: e.endDate }))}
      />

      <ExcelImport
        open={importOpen}
        onOpenChange={setImportOpen}
        onImportEvents={importEvents}
        onImportVacations={importVacations}
        onImportArrets={importArrets}
        onImportHolidays={importHolidays}
      />

      <ICSImportDialog
        open={icsImportOpen}
        onOpenChange={setIcsImportOpen}
        existingEvents={events}
        onImportEvents={importEvents}
        onUpdateEvent={updateEvent}
        onDeleteEvent={removeEvent}
      />

      <ICSExportDialog
        open={icsExportOpen}
        onOpenChange={setIcsExportOpen}
        events={events}
      />

      {settingsOpen && (
        <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setSettingsOpen(false)} />
      )}
    </div>
  );
};

export default Index;