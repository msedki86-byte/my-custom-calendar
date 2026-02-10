import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, format, isWeekend, isSameMonth, getWeek, isSameDay,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  CalendarSettings, CalendarEvent, Astreinte, Vacation, Arret,
  Holiday, CancelledAstreinteDate, PatternType,
} from '@/types/calendar';
import { getArretColor } from '@/lib/trancheColors';

interface AnnualPrintData {
  year: number;
  settings: CalendarSettings;
  events: CalendarEvent[];
  astreintes: Astreinte[];
  vacations: Vacation[];
  arrets: Arret[];
  holidays: Holiday[];
  cancelledDates: CancelledAstreinteDate[];
}

function isHolidayDate(date: Date, holidays: Holiday[]): Holiday | null {
  return holidays.find(h => isSameDay(new Date(h.date), date)) || null;
}

function isVacationDate(date: Date, vacations: Vacation[]): Vacation | null {
  return vacations.find(v => {
    const s = new Date(v.startDate); const e = new Date(v.endDate);
    return date >= new Date(s.getFullYear(), s.getMonth(), s.getDate()) &&
           date <= new Date(e.getFullYear(), e.getMonth(), e.getDate());
  }) || null;
}

function isArretDate(date: Date, arrets: Arret[]): Arret | null {
  return arrets.find(a => {
    const s = new Date(a.startDate); const e = new Date(a.endDate);
    return date >= new Date(s.getFullYear(), s.getMonth(), s.getDate()) &&
           date <= new Date(e.getFullYear(), e.getMonth(), e.getDate());
  }) || null;
}

function isAstreinteDate(date: Date, astreintes: Astreinte[]): Astreinte | null {
  return astreintes.find(a => {
    if (a.isCancelled) return false;
    const s = new Date(a.startDate); const e = new Date(a.endDate);
    return date >= new Date(s.getFullYear(), s.getMonth(), s.getDate()) &&
           date <= new Date(e.getFullYear(), e.getMonth(), e.getDate());
  }) || null;
}

function getEventsOnDate(date: Date, events: CalendarEvent[]): CalendarEvent[] {
  return events.filter(ev => {
    const s = new Date(ev.startDate); const e = new Date(ev.endDate);
    return date >= new Date(s.getFullYear(), s.getMonth(), s.getDate()) &&
           date <= new Date(e.getFullYear(), e.getMonth(), e.getDate());
  });
}

function isCancelledDate(date: Date, cancelled: CancelledAstreinteDate[]): boolean {
  return cancelled.some(c => isSameDay(new Date(c.date), date));
}

// Build arret context bars for a given week row
function buildArretBarsForWeek(week: Date[], monthDate: Date, data: AnnualPrintData): string {
  const s = data.settings;
  if (data.arrets.length === 0) return '';

  // For each arret, find which columns of this week it covers
  const bars: string[] = [];
  const processedArrets = new Set<string>();

  for (const arret of data.arrets) {
    if (processedArrets.has(arret.id)) continue;
    const arretStart = new Date(arret.startDate);
    const arretEnd = new Date(arret.endDate);
    const color = getArretColor(arret, s);

    let firstCol = -1, lastCol = -1;
    for (let i = 0; i < 7; i++) {
      const day = week[i];
      if (!isSameMonth(day, monthDate)) continue;
      const d = new Date(day.getFullYear(), day.getMonth(), day.getDate());
      if (d >= new Date(arretStart.getFullYear(), arretStart.getMonth(), arretStart.getDate()) &&
          d <= new Date(arretEnd.getFullYear(), arretEnd.getMonth(), arretEnd.getDate())) {
        if (firstCol === -1) firstCol = i;
        lastCol = i;
      }
    }

    if (firstCol !== -1) {
      processedArrets.add(arret.id);
      // +1 col offset for week number column
      const left = ((firstCol + 1) / 8 * 100);
      const width = ((lastCol - firstCol + 1) / 8 * 100);
      bars.push(`<div style="position:absolute;top:0;left:${left}%;width:${width}%;height:3px;background:${color};border-radius:1px;z-index:2;"></div>`);
    }
  }

  if (bars.length === 0) return '';
  return `<tr><td colspan="8" style="position:relative;height:4px;padding:0;border:none;">${bars.join('')}</td></tr>`;
}

function buildMonthHTML(year: number, month: number, data: AnnualPrintData): string {
  const monthDate = new Date(year, month, 1);
  const monthStart = startOfMonth(monthDate);
  const monthEnd = endOfMonth(monthDate);
  const calStart = startOfWeek(monthStart, { locale: fr, weekStartsOn: 1 });
  const calEnd = endOfWeek(monthEnd, { locale: fr, weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: calStart, end: calEnd });
  const s = data.settings;

  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  const monthName = format(monthDate, 'MMMM', { locale: fr });

  let html = `<div class="month-block">`;
  html += `<div class="month-title" style="background:${s.yearMonthBgColor};color:${s.yearMonthTextColor}">${monthName}</div>`;
  html += `<table class="month-table"><thead><tr><th class="wk-col" style="background:${s.weekNumberBgColor};color:${s.weekNumberTextColor}">S</th>`;
  ['L','M','M','J','V','S','D'].forEach(d => {
    html += `<th style="background:${s.monthHeaderBgColor};color:${s.monthHeaderTextColor}">${d}</th>`;
  });
  html += `</tr></thead><tbody>`;

  for (const week of weeks) {
    // Arret context bars above the week
    html += buildArretBarsForWeek(week, monthDate, data);

    const wn = getWeek(week[0], { locale: fr, weekStartsOn: 1 });
    html += `<tr><td class="wk-col" style="background:${s.weekNumberBgColor};color:${s.weekNumberTextColor}">${wn}</td>`;

    for (const day of week) {
      if (!isSameMonth(day, monthDate)) {
        html += `<td class="day empty"></td>`;
        continue;
      }

      const we = isWeekend(day);
      const hol = isHolidayDate(day, data.holidays);
      const vac = isVacationDate(day, data.vacations);
      const ast = isAstreinteDate(day, data.astreintes);
      const cancelled = isCancelledDate(day, data.cancelledDates);
      const evts = getEventsOnDate(day, data.events);
      const reEvt = evts.find(e => e.type === 're');
      const cpEvt = evts.find(e => e.type === 'cp');

      let bg = s.dayCellBgColor;
      let fg = s.dayCellTextColor;

      if (we || hol) { bg = s.weekendDaysBgColor; fg = s.weekendDaysTextColor; }
      if (reEvt) { bg = s.reColor; fg = '#333'; }
      if (cpEvt) { bg = s.cpColor; fg = '#FFF'; }
      if (ast && !cancelled) { bg = s.astreinteColor; fg = '#333'; }

      // Event lines (bars instead of dots)
      let linesHTML = '';

      if (vac) {
        linesHTML += `<span class="ev-line" style="background:${s.vacationColor}"></span>`;
      }
      const otherEvts = evts.filter(e => e.type !== 're' && e.type !== 'cp');
      for (const evt of otherEvts.slice(0, 2)) {
        linesHTML += `<span class="ev-line" style="background:${evt.color}"></span>`;
      }

      html += `<td class="day" style="background:${bg};color:${fg}"><span class="day-num">${day.getDate()}</span>${linesHTML ? `<div class="ev-lines">${linesHTML}</div>` : ''}</td>`;
    }
    html += `</tr>`;
  }
  html += `</tbody></table></div>`;
  return html;
}

function buildLegendHTML(data: AnnualPrintData): string {
  const s = data.settings;
  const items: { label: string; bg: string; border?: string }[] = [
    { label: 'Astreinte', bg: s.astreinteColor },
    { label: 'RE', bg: s.reColor, border: '#999' },
    { label: 'CP', bg: s.cpColor },
  ];

  const uniqueVacs = new Map<string, Vacation>();
  data.vacations.forEach(v => uniqueVacs.set(v.name, v));
  uniqueVacs.forEach(v => items.push({ label: v.name, bg: v.color || s.vacationColor }));

  const tranches = new Set(data.arrets.map(a => a.tranche));
  tranches.forEach(tr => {
    const color = s[`arretTr${tr.replace('Tr', '')}Color` as keyof CalendarSettings] as string;
    items.push({ label: `AT ${tr}`, bg: color });
  });

  let html = `<div class="legend">`;
  items.forEach(it => {
    html += `<div class="legend-item"><span class="legend-swatch" style="background:${it.bg};${it.border ? `border:1px solid ${it.border}` : ''}"></span><span class="legend-label">${it.label}</span></div>`;
  });
  html += `</div>`;
  return html;
}

function buildArretBarHTML(data: AnnualPrintData): string {
  if (data.arrets.length === 0) return '';
  const s = data.settings;

  let html = `<div class="arret-bar"><div class="arret-bar-title">Planning Arrêts</div><div class="arret-items">`;

  const byTranche = new Map<string, Arret[]>();
  data.arrets.forEach(a => {
    const list = byTranche.get(a.tranche) || [];
    list.push(a);
    byTranche.set(a.tranche, list);
  });

  byTranche.forEach((arretList, tranche) => {
    const color = getArretColor(arretList[0], s);
    html += `<div class="arret-tranche"><span class="arret-tranche-label" style="background:${color};color:#FFF">${tranche}</span>`;
    arretList.forEach(a => {
      const start = format(new Date(a.startDate), 'dd/MM', { locale: fr });
      const end = format(new Date(a.endDate), 'dd/MM', { locale: fr });
      const label = a.type === 'prepa' && a.module ? `${a.module}` : 'AT';
      html += `<span class="arret-chip" style="border-color:${color}">${label}: ${start}–${end}</span>`;
    });
    html += `</div>`;
  });

  html += `</div></div>`;
  return html;
}

export function generateAnnualPrintHTML(data: AnnualPrintData): string {
  const { year } = data;
  let months = '';
  for (let m = 0; m < 12; m++) months += buildMonthHTML(year, m, data);

  const legend = buildLegendHTML(data);
  const arretBar = buildArretBarHTML(data);

  return `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"/>
<title>Calendrier ${year}</title>
<style>
  @page { size: A4 landscape; margin: 5mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 297mm; height: 210mm; overflow: hidden; font-family: Arial, Helvetica, sans-serif; background: #fff; color: #111;
    -webkit-print-color-adjust: exact; print-color-adjust: exact; }

  .page { width: 297mm; height: 210mm; padding: 3mm; display: flex; flex-direction: column; }

  .page-title { text-align: center; font-size: 11pt; font-weight: 700; margin-bottom: 1.5mm; }

  /* Legend */
  .legend { display: flex; flex-wrap: wrap; gap: 1.5mm 4mm; justify-content: center; margin-bottom: 1.5mm; }
  .legend-item { display: flex; align-items: center; gap: 1mm; font-size: 6pt; }
  .legend-swatch { width: 10px; height: 4px; border-radius: 1px; flex-shrink: 0; }
  .legend-label { white-space: nowrap; }

  /* Grid 4x3 with gaps */
  .months-grid { display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(3, 1fr);
    gap: 2.5mm; flex: 1; min-height: 0; }

  /* Month block with rounded border */
  .month-block { display: flex; flex-direction: column; min-height: 0;
    border: 0.5px solid #ccc; border-radius: 3px; overflow: hidden; }
  .month-title { text-align: center; font-size: 7pt; font-weight: 700; padding: 1px 0;
    text-transform: capitalize; }

  /* Table */
  .month-table { width: 100%; border-collapse: collapse; table-layout: fixed; flex: 1; }
  .month-table th, .month-table td { font-size: 5.5pt; text-align: center; padding: 0; line-height: 1; height: 12px; }
  .month-table th { font-weight: 600; font-size: 5pt; }
  .wk-col { width: 14px; font-size: 5pt !important; }

  /* Day cells */
  .day { position: relative; vertical-align: middle; }
  .day.empty { background: #f9f9f9 !important; }
  .day-num { position: relative; z-index: 1; }

  /* Event lines (bars) */
  .ev-lines { position: absolute; bottom: 0; left: 1px; right: 1px; display: flex; flex-direction: column; gap: 0; }
  .ev-line { display: block; height: 2px; width: 100%; border-radius: 0.5px; }

  /* Arret bar */
  .arret-bar { margin-top: 1.5mm; border: 0.5px solid #ccc; border-radius: 2px; padding: 1mm 2mm; }
  .arret-bar-title { font-size: 6.5pt; font-weight: 700; margin-bottom: 1mm; }
  .arret-items { display: flex; flex-wrap: wrap; gap: 1mm 3mm; }
  .arret-tranche { display: flex; align-items: center; gap: 1mm; }
  .arret-tranche-label { font-size: 5.5pt; font-weight: 700; padding: 0.5mm 1.5mm; border-radius: 2px; }
  .arret-chip { font-size: 5pt; border: 0.5px solid; border-radius: 2px; padding: 0.3mm 1mm; white-space: nowrap; }
</style>
</head><body>
<div class="page">
  <div class="page-title">Calendrier ${year}</div>
  ${legend}
  <div class="months-grid">${months}</div>
  ${arretBar}
</div>
<script>window.onload=()=>{setTimeout(()=>{window.print();window.close();},400);};<\/script>
</body></html>`;
}
