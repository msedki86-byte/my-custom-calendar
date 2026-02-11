import { useMemo } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarEvent, Astreinte, Holiday, Vacation, Arret, CalendarSettings, CancelledAstreinteDate } from '@/types/calendar';
import { getArretColor } from '@/lib/trancheColors';
import { isSameDay, isWithinInterval } from 'date-fns';
import { cn } from '@/lib/utils';

interface DayTimelineProps {
  date: Date;
  events: CalendarEvent[];
  astreinte: Astreinte | null;
  holiday: Holiday | null;
  vacation: Vacation | null;
  arret: Arret | null;
  arrets?: Arret[];
  cancelled: CancelledAstreinteDate | null;
  settings: CalendarSettings;
}

const START_HOUR = 5;
const END_HOUR = 21;
const TOTAL_HOURS = END_HOUR - START_HOUR; // 16 hours
const HOUR_HEIGHT = 48; // px per hour

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

export function DayTimeline({
  date,
  events,
  astreinte,
  holiday,
  vacation,
  arret,
  arrets = [],
  cancelled,
  settings,
}: DayTimelineProps) {
  const hours = useMemo(() => {
    return Array.from({ length: TOTAL_HOURS + 1 }, (_, i) => START_HOUR + i);
  }, []);

  const hasActiveAstreinte = astreinte && !astreinte.isCancelled && !cancelled;

  // Find prépa modules active on this day
  const prepaModules = useMemo(() => {
    return arrets.filter(a => 
      a.type === 'prepa' && (
        isSameDay(date, a.startDate) || isSameDay(date, a.endDate) ||
        isWithinInterval(date, { start: a.startDate, end: a.endDate })
      )
    );
  }, [arrets, date]);

  // Astreinte positioning (default 8h-8h but clamped to view)
  const astreintePosition = useMemo(() => {
    if (!hasActiveAstreinte) return null;
    // Astreintes run 24h (jeudi 8h → jeudi suivant 7h59), so cover full visible range
    return getTopAndHeight('05:00', '21:00');
  }, [hasActiveAstreinte]);

  return (
    <div className="relative">
      {/* Day header */}
      <div className="flex items-center gap-2 mb-3 px-2">
        <span className="text-lg font-bold text-foreground">
          {format(date, 'EEEE d MMMM yyyy', { locale: fr })}
        </span>
        {holiday && (
          <span className="text-xs px-2 py-0.5 rounded bg-destructive/10 text-destructive font-medium">
            {holiday.name}
          </span>
        )}
      </div>

      {/* Context badges */}
      <div className="flex gap-2 mb-3 px-2">
        {vacation && (
          <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ backgroundColor: settings.vacationColor, color: settings.vacationTextColor || '#2D2A00' }}>
            {vacation.name}
          </span>
        )}
        {arret && (
          <span className="text-xs px-2 py-0.5 rounded text-white font-medium" style={{ backgroundColor: arret.color || settings.arretTr2Color }}>
            {arret.name} ({arret.tranche})
          </span>
        )}
        {prepaModules.map(prepa => (
          <span key={prepa.id} className="text-xs px-2 py-0.5 rounded text-white font-medium" style={{ backgroundColor: getArretColor(prepa, settings) }}>
            {prepa.module || prepa.name} ({prepa.tranche})
          </span>
        ))}
        {cancelled && (
          <span className="text-xs px-2 py-0.5 rounded text-white font-medium" style={{ backgroundColor: settings.astreinteCancelledColor }}>
            Annulée — {cancelled.name}
          </span>
        )}
      </div>

      {/* Timeline grid */}
      <div className="relative border border-border rounded-lg overflow-hidden bg-card" style={{ height: TOTAL_HOURS * HOUR_HEIGHT }}>
        {/* Hour lines */}
        {hours.map((hour, i) => (
          <div
            key={hour}
            className="absolute left-0 right-0 border-t border-border/40 flex items-start"
            style={{ top: i * HOUR_HEIGHT }}
          >
            <span className="text-[10px] text-muted-foreground font-mono w-10 text-right pr-1 -mt-[7px] bg-card">
              {String(hour).padStart(2, '0')}:00
            </span>
          </div>
        ))}

        {/* Separator lines at 8h, 12h, 12h45, 16h45 */}
        {[
          { time: '08:00', label: '8h', color: 'hsl(var(--primary))', width: 2 },
          { time: '12:00', label: '12h', color: 'hsl(var(--destructive))', width: 1.5 },
          { time: '12:45', label: '12h45', color: 'hsl(var(--destructive))', width: 1.5 },
          { time: '16:45', label: '16h45', color: 'hsl(var(--primary))', width: 2 },
        ].map(({ time, label, color, width }) => {
          const minutes = parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1]);
          const top = ((minutes - START_HOUR * 60) / (TOTAL_HOURS * 60)) * (TOTAL_HOURS * HOUR_HEIGHT);
          return (
            <div
              key={time}
              className="absolute left-10 right-0 z-[5] flex items-center"
              style={{ top }}
            >
              <div className="flex-1" style={{ height: width, backgroundColor: color, opacity: 0.5 }} />
              <span className="text-[8px] font-mono ml-1 -mt-[6px]" style={{ color }}>{label}</span>
            </div>
          );
        })}

        {/* Astreinte background band */}
        {astreintePosition && (
          <div
            className="absolute left-10 right-1 rounded opacity-20 border border-current"
            style={{
              top: astreintePosition.top,
              height: astreintePosition.height,
              backgroundColor: astreinte!.isPonctuelle 
                ? settings.astreintePonctuelleColor 
                : settings.astreinteColor,
            }}
          />
        )}

        {/* Events positioned by time */}
        {events.map((event, idx) => {
          const pos = getTopAndHeight(event.startTime, event.endTime);
          const hasTime = event.startTime || event.endTime;
          return (
            <div
              key={event.id || idx}
              className={cn(
                "absolute left-12 right-2 rounded-md px-2 py-1 text-white text-xs font-medium shadow-sm flex flex-col justify-center",
                !hasTime && "border-l-4 border-white/50"
              )}
              style={{
                top: pos.top + 1,
                height: pos.height - 2,
                backgroundColor: event.color,
                zIndex: 10 + idx,
              }}
            >
              <span className="truncate font-semibold">{event.name}</span>
              {hasTime && (
                <span className="text-[10px] opacity-80">
                  {event.startTime || '05:00'} — {event.endTime || '21:00'}
                </span>
              )}
            </div>
          );
        })}

        {/* Active astreinte label */}
        {hasActiveAstreinte && astreintePosition && (
          <div
            className="absolute left-12 text-[10px] font-semibold px-1 rounded"
            style={{
              top: astreintePosition.top + 2,
              color: astreinte!.isPonctuelle ? settings.astreintePonctuelleColor : settings.astreinteColor,
            }}
          >
            {astreinte!.isPonctuelle ? 'Astreinte ponctuelle' : 'Astreinte'}
          </div>
        )}
      </div>
    </div>
  );
}
