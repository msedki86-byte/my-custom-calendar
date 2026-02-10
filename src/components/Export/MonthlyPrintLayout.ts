import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, format, isWeekend, isSameMonth, getWeek, isSameDay,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  CalendarSettings, CalendarEvent, Astreinte, Vacation, Arret,
  Holiday, CancelledAstreinteDate,
} from '@/types/calendar';
import { getArretColor } from '@/lib/trancheColors';

interface MonthlyPrintData {
  year: number;
  month: number;
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

function buildContextBarsForWeek(week: Date[], monthDate: Date, data: MonthlyPrintData): string {
  const s = data.settings;
  const bars: string[] = [];

  // Vacation bars
  for (const vac of data.vacations) {
    const vacStart = new Date(vac.startDate);
    const vacEnd = new Date(vac.endDate);
    let firstCol = -1, lastCol = -1;
    for (let i = 0; i < 7; i++) {
      const day = week[i];
      if (!isSameMonth(day, monthDate)) continue;
      const d = new Date(day.getFullYear(), day.getMonth(), day.getDate());
      if (d >= new Date(vacStart.getFullYear(), vacStart.getMonth(), vacStart.getDate()) &&
          d <= new Date(vacEnd.getFullYear(), vacEnd.getMonth(), vacEnd.getDate())) {
        if (firstCol === -1) firstCol = i;
        lastCol = i;
      }
    }
    if (firstCol !== -1) {
      const left = ((firstCol + 1) / 8 * 100);
      const width = ((lastCol - firstCol + 1) / 8 * 100);
      bars.push(`<div style="position:absolute;top:0;left:${left}%;width:${width}%;height:3px;background:${vac.color || s.vacationColor};border-radius:1px;z-index:1;"></div>`);
    }
  }

  // Arret bars
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
      const left = ((firstCol + 1) / 8 * 100);
      const width = ((lastCol - firstCol + 1) / 8 * 100);
      bars.push(`<div style="position:absolute;top:3px;left:${left}%;width:${width}%;height:3px;background:${color};border-radius:1px;z-index:2;"></div>`);
    }
  }

  if (bars.length === 0) return '';
  return `<tr><td colspan="8" style="position:relative;height:8px;padding:0;border:none;">${bars.join('')}</td></tr>`;
}

function buildLegendHTML(data: MonthlyPrintData): string {
  const s = data.settings;
  const items: { label: string; bg: string; border?: string }[] = [
    { label: 'Astreinte', bg: s.astreinteColor },
    { label: 'RE', bg: s.reColor, border: '#999' },
    { label: 'CP', bg: s.cpColor },
  ];
  if (data.vacations.length > 0) {
    items.push({ label: 'Vacances scolaires', bg: s.vacationColor });
  }

  let html = `<div class="legend">`;
  items.forEach(it => {
    html += `<div class="legend-item"><span class="legend-swatch" style="background:${it.bg};${it.border ? `border:1px solid ${it.border}` : ''}"></span><span class="legend-label">${it.label}</span></div>`;
  });
  html += `</div>`;
  return html;
}

function buildArretBarHTML(data: MonthlyPrintData): string {
  if (data.arrets.length === 0) return '';
  const s = data.settings;

  const byTranche = new Map<string, Arret[]>();
  data.arrets.forEach(a => {
    const list = byTranche.get(a.tranche) || [];
    list.push(a);
    byTranche.set(a.tranche, list);
  });

  // Tranche legend line
  const trancheSwatches: string[] = [];
  byTranche.forEach((arretList, tranche) => {
    const color = getArretColor(arretList[0], s);
    trancheSwatches.push(`<div class="legend-item"><span class="legend-swatch" style="background:${color}"></span><span class="legend-label">${tranche}</span></div>`);
  });

  let html = `<div class="arret-bar"><div class="arret-bar-title">Planning Arrêts</div><div class="arret-items">`;
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

  return `<div class="arret-legend-line">${trancheSwatches.join('')}</div>${html}`;
}

export function generateMonthlyPrintHTML(data: MonthlyPrintData): string {
  const { year, month } = data;
  const monthDate = new Date(year, month, 1);
  const monthStart = startOfMonth(monthDate);
  const monthEnd = endOfMonth(monthDate);
  const calStart = startOfWeek(monthStart, { locale: fr, weekStartsOn: 1 });
  const calEnd = endOfWeek(monthEnd, { locale: fr, weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: calStart, end: calEnd });
  const s = data.settings;

  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  const monthName = format(monthDate, 'MMMM yyyy', { locale: fr });
  const legend = buildLegendHTML(data);
  const arretSection = buildArretBarHTML(data);

  let tableHTML = `<table class="month-table"><thead><tr>
    <th class="wk-col" style="background:${s.weekNumberBgColor};color:${s.weekNumberTextColor}">Sem</th>`;
  ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'].forEach(d => {
    tableHTML += `<th style="background:${s.monthHeaderBgColor};color:${s.monthHeaderTextColor}">${d}</th>`;
  });
  tableHTML += `</tr></thead><tbody>`;

  for (const week of weeks) {
    tableHTML += buildContextBarsForWeek(week, monthDate, data);

    const wn = getWeek(week[0], { locale: fr, weekStartsOn: 1 });
    tableHTML += `<tr><td class="wk-col" style="background:${s.weekNumberBgColor};color:${s.weekNumberTextColor}">${wn}</td>`;

    for (const day of week) {
      if (!isSameMonth(day, monthDate)) {
        tableHTML += `<td class="day empty" style="background:${s.weekNumberBgColor}"></td>`;
        continue;
      }

      const we = isWeekend(day);
      const hol = isHolidayDate(day, data.holidays);
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

      let linesHTML = '';
      const otherEvts = evts.filter(e => e.type !== 're' && e.type !== 'cp');
      for (const evt of otherEvts.slice(0, 3)) {
        linesHTML += `<span class="ev-line" style="background:${evt.color}"></span>`;
      }

      tableHTML += `<td class="day" style="background:${bg};color:${fg}">
        <span class="day-num">${day.getDate()}</span>
        ${linesHTML ? `<div class="ev-lines">${linesHTML}</div>` : ''}
      </td>`;
    }
    tableHTML += `</tr>`;
  }
  tableHTML += `</tbody></table>`;

  return `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"/>
<title>${monthName}</title>
<style>
  @page { size: A4 landscape; margin: 8mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 297mm; height: 210mm; overflow: hidden; font-family: Arial, Helvetica, sans-serif; background: #fff; color: #111;
    -webkit-print-color-adjust: exact; print-color-adjust: exact; }

  .page { width: 297mm; height: 210mm; padding: 5mm; display: flex; flex-direction: column; }
  .page-title { text-align: center; font-size: 16pt; font-weight: 700; margin-bottom: 3mm; text-transform: capitalize; }

  .legend { display: flex; flex-wrap: wrap; gap: 2mm 6mm; justify-content: center; margin-bottom: 2mm; }
  .legend-item { display: flex; align-items: center; gap: 1.5mm; font-size: 8pt; }
  .legend-swatch { width: 16px; height: 10px; border-radius: 2px; flex-shrink: 0; }
  .legend-label { white-space: nowrap; }

  .arret-legend-line { display: flex; flex-wrap: wrap; gap: 2mm 6mm; justify-content: center; margin-bottom: 2mm; }
  .arret-legend-line .legend-item { display: flex; align-items: center; gap: 1.5mm; font-size: 8pt; }
  .arret-legend-line .legend-swatch { width: 16px; height: 10px; border-radius: 2px; flex-shrink: 0; }

  .month-table { width: 100%; border-collapse: collapse; table-layout: fixed; flex: 1; border: 1px solid #ccc; border-radius: 4px; overflow: hidden; }
  .month-table th, .month-table td { text-align: center; padding: 2px; line-height: 1.3; border: 0.5px solid #e0e0e0; }
  .month-table th { font-size: 9pt; font-weight: 600; padding: 4px 2px; }
  .month-table td { font-size: 11pt; height: 28px; }
  .wk-col { width: 36px; font-size: 8pt !important; font-weight: 600; }

  .day { position: relative; vertical-align: middle; }
  .day.empty { }
  .day-num { position: relative; z-index: 1; }

  .ev-lines { position: absolute; top: 50%; left: 2px; right: 2px; transform: translateY(-50%); display: flex; flex-direction: column; gap: 1px; margin-top: 6px; }
  .ev-line { display: block; height: 3px; width: 100%; border-radius: 1px; }

  .arret-bar { margin-top: 2mm; border: 0.5px solid #ccc; border-radius: 3px; padding: 2mm 3mm; }
  .arret-bar-title { font-size: 9pt; font-weight: 700; margin-bottom: 1.5mm; }
  .arret-items { display: flex; flex-wrap: wrap; gap: 1.5mm 4mm; }
  .arret-tranche { display: flex; align-items: center; gap: 1.5mm; }
  .arret-tranche-label { font-size: 7pt; font-weight: 700; padding: 1mm 2mm; border-radius: 2px; }
  .arret-chip { font-size: 7pt; border: 0.5px solid; border-radius: 2px; padding: 0.5mm 1.5mm; white-space: nowrap; }
</style>
</head><body>
<div class="page">
  <div class="page-title">${monthName}</div>
  ${legend}
  ${arretSection}
  ${tableHTML}
</div>
<script>window.onload=()=>{setTimeout(()=>{window.print();window.close();},400);};<\/script>
</body></html>`;
}
