/**
 * ICS (iCalendar) import/export utilities.
 * Handles parsing .ics files into CalendarEvents and generating .ics from internal events.
 */
import { CalendarEvent, EventSource } from '@/types/calendar';
import { format, parse } from 'date-fns';

// ============= ICS PARSING =============

interface ICSVEvent {
  uid: string;
  summary: string;
  dtstart: string;
  dtend: string;
  description?: string;
}

function parseICSDate(value: string): Date {
  // Handle YYYYMMDD format
  if (/^\d{8}$/.test(value)) {
    return new Date(
      parseInt(value.slice(0, 4)),
      parseInt(value.slice(4, 6)) - 1,
      parseInt(value.slice(6, 8))
    );
  }
  // Handle YYYYMMDDTHHMMSS or YYYYMMDDTHHMMSSZ
  const cleaned = value.replace(/Z$/, '');
  if (/^\d{8}T\d{6}$/.test(cleaned)) {
    return new Date(
      parseInt(cleaned.slice(0, 4)),
      parseInt(cleaned.slice(4, 6)) - 1,
      parseInt(cleaned.slice(6, 8)),
      parseInt(cleaned.slice(9, 11)),
      parseInt(cleaned.slice(11, 13)),
      parseInt(cleaned.slice(13, 15))
    );
  }
  return new Date(value);
}

function extractTimeFromICSDate(value: string): string | undefined {
  const cleaned = value.replace(/Z$/, '');
  if (/^\d{8}T\d{6}$/.test(cleaned)) {
    return `${cleaned.slice(9, 11)}:${cleaned.slice(11, 13)}`;
  }
  return undefined;
}

function parseVEvents(icsContent: string): ICSVEvent[] {
  const events: ICSVEvent[] = [];
  const lines = icsContent.replace(/\r\n /g, '').replace(/\r/g, '').split('\n');

  let inEvent = false;
  let current: Partial<ICSVEvent> = {};

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === 'BEGIN:VEVENT') {
      inEvent = true;
      current = {};
    } else if (trimmed === 'END:VEVENT') {
      inEvent = false;
      if (current.uid && current.summary && current.dtstart) {
        events.push(current as ICSVEvent);
      }
    } else if (inEvent) {
      // Handle properties with parameters like DTSTART;VALUE=DATE:20260101
      const colonIdx = trimmed.indexOf(':');
      if (colonIdx === -1) continue;
      const key = trimmed.slice(0, colonIdx).split(';')[0].toUpperCase();
      const value = trimmed.slice(colonIdx + 1);

      switch (key) {
        case 'UID': current.uid = value; break;
        case 'SUMMARY': current.summary = value; break;
        case 'DTSTART': current.dtstart = value; break;
        case 'DTEND': current.dtend = value; break;
        case 'DESCRIPTION': current.description = value; break;
      }
    }
  }

  return events;
}

/**
 * Parse an ICS file content and return CalendarEvents.
 * Events are marked as external (readonly, source='ics').
 */
export function parseICSToEvents(icsContent: string, source: EventSource = 'ics'): CalendarEvent[] {
  const vevents = parseVEvents(icsContent);

  return vevents.map((ve) => {
    const startDate = parseICSDate(ve.dtstart);
    const endDate = ve.dtend ? parseICSDate(ve.dtend) : startDate;
    const startTime = extractTimeFromICSDate(ve.dtstart);
    const endTime = ve.dtend ? extractTimeFromICSDate(ve.dtend) : undefined;

    return {
      id: `ics-${ve.uid}-${Date.now()}`,
      type: 'event' as const,
      name: ve.summary,
      startDate,
      endDate: endDate < startDate ? startDate : endDate,
      startTime,
      endTime,
      color: '#6366f1', // Default indigo for external events
      source,
      externalId: ve.uid,
      readonly: true,
    };
  });
}

/**
 * Merge imported ICS events with existing events.
 * - New UIDs are added
 * - Existing UIDs are updated (name, dates)
 * - UIDs not in the new import can optionally be removed
 */
export function mergeICSEvents(
  existing: CalendarEvent[],
  incoming: CalendarEvent[],
  removeAbsent: boolean = false
): { toAdd: CalendarEvent[]; toUpdate: { id: string; updates: Partial<CalendarEvent> }[]; toRemove: string[] } {
  const existingByExternalId = new Map<string, CalendarEvent>();
  const internalEvents: CalendarEvent[] = [];

  for (const e of existing) {
    if (e.externalId && e.source === 'ics') {
      existingByExternalId.set(e.externalId, e);
    } else {
      internalEvents.push(e);
    }
  }

  const toAdd: CalendarEvent[] = [];
  const toUpdate: { id: string; updates: Partial<CalendarEvent> }[] = [];
  const incomingUIDs = new Set<string>();

  for (const inc of incoming) {
    if (!inc.externalId) { toAdd.push(inc); continue; }
    incomingUIDs.add(inc.externalId);

    const match = existingByExternalId.get(inc.externalId);
    if (match) {
      toUpdate.push({
        id: match.id,
        updates: {
          name: inc.name,
          startDate: inc.startDate,
          endDate: inc.endDate,
          startTime: inc.startTime,
          endTime: inc.endTime,
        },
      });
    } else {
      toAdd.push(inc);
    }
  }

  const toRemove: string[] = [];
  if (removeAbsent) {
    for (const [uid, evt] of existingByExternalId) {
      if (!incomingUIDs.has(uid)) {
        toRemove.push(evt.id);
      }
    }
  }

  return { toAdd, toUpdate, toRemove };
}

// ============= ICS EXPORT =============

function formatICSDate(date: Date, time?: string): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');

  if (time) {
    const [h, min] = time.split(':');
    return `${y}${m}${d}T${h.padStart(2, '0')}${min.padStart(2, '0')}00`;
  }
  return `${y}${m}${d}`;
}

function escapeICSText(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

/**
 * Generate an ICS file content from a list of CalendarEvents.
 */
export function eventsToICS(events: CalendarEvent[]): string {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CalendrierTAF//FR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];

  for (const event of events) {
    const uid = event.externalId || `${event.id}@calendriertaf`;
    const hasTime = !!event.startTime;

    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${uid}`);
    lines.push(`SUMMARY:${escapeICSText(event.name)}`);

    if (hasTime) {
      lines.push(`DTSTART:${formatICSDate(event.startDate, event.startTime)}`);
      lines.push(`DTEND:${formatICSDate(event.endDate, event.endTime || event.startTime)}`);
    } else {
      lines.push(`DTSTART;VALUE=DATE:${formatICSDate(event.startDate)}`);
      lines.push(`DTEND;VALUE=DATE:${formatICSDate(event.endDate)}`);
    }

    lines.push(`DTSTAMP:${formatICSDate(new Date(), format(new Date(), 'HH:mm'))}Z`);
    lines.push('END:VEVENT');
  }

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

/**
 * Trigger download of an ICS file.
 */
export function downloadICS(events: CalendarEvent[], filename: string = 'calendrier.ics') {
  const content = eventsToICS(events);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
