import { useMemo } from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarEvent, Astreinte, Holiday, CalendarSettings, CancelledAstreinteDate } from '@/types/calendar';
import { cn } from '@/lib/utils';

interface WeekTimelineProps {
  weekStartDate: Date;
  settings: CalendarSettings;
  astreintes: Astreinte[];
  isAstreinteDay: (date: Date, astreintes: Astreinte[]) => Astreinte | null;
  isHoliday: (date: Date) => Holiday | null;
  getEventsForDate: (date: Date) => CalendarEvent[];
  isDateCancelled: (date: Date) => CancelledAstreinteDate | null;
  onDayClick?: (date: Date) => void;
}

const START_HOUR = 5;
const END_HOUR = 21;
const TOTAL_HOURS = END_HOUR - START_HOUR;
const HOUR_HEIGHT = 40;

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + (m || 0);
}

function getTopAndHeight(startTime?: string, endTime?: string): { top: number; height: number } {
  const startMinutes = startTime ? timeToMinutes(startTime) : START_HOUR * 60;
  const endMinutes = endTime ? timeToMinutes(endTime) : END_HOUR * 60;
  const clampedStart = Math.max(startMinutes, START_HOUR * 60);
  const clampedEnd = Math.min(endMinutes, END_HOUR * 60);
  const top = ((clampedStart - START_HOUR * 60) / (TOTAL_HOURS * 60)) * (TOTAL_HOURS * HOUR_HEIGHT);
  const height = Math.max(((clampedEnd - clampedStart) / (TOTAL_HOURS * 60)) * (TOTAL_HOURS * HOUR_HEIGHT), HOUR_HEIGHT / 2);
  return { top, height };
}

export function WeekTimeline({
  weekStartDate,
  settings,
  astreintes,
  isAstreinteDay,
  isHoliday,
  getEventsForDate,
  isDateCancelled,
  onDayClick,
}: WeekTimelineProps) {
  const weekStart = useMemo(() => startOfWeek(weekStartDate, { weekStartsOn: 1 }), [weekStartDate]);
  const weekDays = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)), [weekStart]);
  const hours = useMemo(() => Array.from({ length: TOTAL_HOURS + 1 }, (_, i) => START_HOUR + i), []);

  return (
    <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">
      {/* Week header with day names */}
      <div className="grid grid-cols-[50px_repeat(7,1fr)] border-b border-border" style={{ backgroundColor: settings.monthHeaderBgColor }}>
        <div className="py-2 text-center text-xs font-medium" style={{ color: settings.monthHeaderTextColor }}>
          H.
        </div>
        {weekDays.map((day, i) => {
          const holiday = isHoliday(day);
          return (
            <button
              key={i}
              onClick={() => onDayClick?.(day)}
              className={cn(
                "py-2 text-center text-xs font-semibold hover:opacity-80 transition-opacity",
                holiday && "underline"
              )}
              style={{ color: settings.monthHeaderTextColor }}
            >
              <div>{format(day, 'EEE', { locale: fr })}</div>
              <div className="text-sm">{format(day, 'd')}</div>
              {holiday && <div className="text-[9px] opacity-75">{holiday.name}</div>}
            </button>
          );
        })}
      </div>

      {/* Time grid */}
      <div className="grid grid-cols-[50px_repeat(7,1fr)]" style={{ height: TOTAL_HOURS * HOUR_HEIGHT }}>
        {/* Hour labels column */}
        <div className="relative border-r border-border">
          {hours.map((hour, i) => (
            <div
              key={hour}
              className="absolute left-0 right-0 text-[10px] text-muted-foreground font-mono text-right pr-1"
              style={{ top: i * HOUR_HEIGHT - 7 }}
            >
              {String(hour).padStart(2, '0')}:00
            </div>
          ))}
        </div>

        {/* Day columns */}
        {weekDays.map((day, dayIdx) => {
          const dayEvents = getEventsForDate(day);
          const astreinte = isAstreinteDay(day, astreintes);
          const cancelled = isDateCancelled(day);
          const hasActiveAstreinte = astreinte && !astreinte.isCancelled && !cancelled;

          return (
            <div
              key={dayIdx}
              className={cn(
                "relative border-r border-border/30 last:border-r-0",
                dayIdx >= 5 && "bg-muted/20"
              )}
              onClick={() => onDayClick?.(day)}
            >
              {/* Hour grid lines */}
              {hours.map((hour, i) => (
                <div
                  key={hour}
                  className="absolute left-0 right-0 border-t border-border/20"
                  style={{ top: i * HOUR_HEIGHT }}
                />
              ))}

              {/* Astreinte background */}
              {hasActiveAstreinte && (() => {
                const pos = getTopAndHeight('08:00', '21:00');
                return (
                  <div
                    className="absolute inset-x-0.5 rounded-sm opacity-15"
                    style={{
                      top: pos.top,
                      height: pos.height,
                      backgroundColor: astreinte.isPonctuelle
                        ? settings.astreintePonctuelleColor
                        : settings.astreinteColor,
                    }}
                  />
                );
              })()}

              {/* Cancelled background */}
              {cancelled && !hasActiveAstreinte && (() => {
                const pos = getTopAndHeight('08:00', '21:00');
                return (
                  <div
                    className="absolute inset-x-0.5 rounded-sm opacity-20 pattern-crosshatch"
                    style={{
                      top: pos.top,
                      height: pos.height,
                      backgroundColor: settings.astreinteCancelledColor,
                    }}
                  />
                );
              })()}

              {/* Events */}
              {dayEvents.filter(e => e.type !== 're' && e.type !== 'cp').map((event, idx) => {
                const pos = getTopAndHeight(event.startTime, event.endTime);
                return (
                  <div
                    key={event.id || idx}
                    className="absolute left-0.5 right-0.5 rounded text-[9px] text-white font-medium px-1 truncate shadow-sm flex items-center"
                    style={{
                      top: pos.top + 1,
                      height: Math.max(pos.height - 2, 16),
                      backgroundColor: event.color,
                      zIndex: 10 + idx,
                    }}
                    title={`${event.name}${event.startTime ? ` (${event.startTime}-${event.endTime})` : ''}`}
                  >
                    {event.name}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
