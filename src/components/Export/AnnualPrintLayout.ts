import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, format, isWeekend, isSameMonth, getWeek, isSameDay,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  CalendarSettings, CalendarEvent, Astreinte, Vacation, Arret,
  Holiday, CancelledAstreinteDate, modulePatterns, PatternType,
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

function patternSVG(pattern: PatternType, color: string, id: string): string {
  const c = color;
  switch (pattern) {
    case 'stripes':
      return `<pattern id="${id}" width="4" height="4" patternUnits="userSpaceOnUse"><line x1="0" y1="0" x2="0" y2="4" stroke="${c}" stroke-width="1.5"/></pattern>`;
    case 'dots':
      return `<pattern id="${id}" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="${c}"/></pattern>`;
    case 'crosshatch':
      return `<pattern id="${id}" width="4" height="4" patternUnits="userSpaceOnUse"><line x1="0" y1="0" x2="4" y2="4" stroke="${c}" stroke-width="0.7"/><line x1="4" y1="0" x2="0" y2="4" stroke="${c}" stroke-width="0.7"/></pattern>`;
    case 'diagonal':
      return `<pattern id="${id}" width="4" height="4" patternUnits="userSpaceOnUse"><line x1="0" y1="4" x2="4" y2="0" stroke="${c}" stroke-width="1"/></pattern>`;
    case 'waves':
      return `<pattern id="${id}" width="8" height="4" patternUnits="userSpaceOnUse"><path d="M0 2 Q2 0 4 2 Q6 4 8 2" fill="none" stroke="${c}" stroke-width="0.8"/></pattern>`;
    case 'grid':
      return `<pattern id="${id}" width="4" height="4" patternUnits="userSpaceOnUse"><line x1="2" y1="0" x2="2" y2="4" stroke="${c}" stroke-width="0.5"/><line x1="0" y1="2" x2="4" y2="2" stroke="${c}" stroke-width="0.5"/></pattern>`;
    case 'zigzag':
      return `<pattern id="${id}" width="6" height="4" patternUnits="userSpaceOnUse"><polyline points="0,4 3,0 6,4" fill="none" stroke="${c}" stroke-width="0.8"/></pattern>`;
    default:
      return '';
  }
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
      const arret = isArretDate(day, data.arrets);
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

      let classes = 'day';
      let extraStyle = '';
      let dotHTML = '';

      // Arret indicator
      if (arret) {
        const arretColor = getArretColor(arret, s);
        dotHTML += `<span class="dot" style="background:${arretColor}"></span>`;
      }

      // Vacation indicator
      if (vac) {
        dotHTML += `<span class="dot" style="background:${s.vacationColor}"></span>`;
      }

      // Regular events indicator
      const otherEvts = evts.filter(e => e.type !== 're' && e.type !== 'cp');
      if (otherEvts.length > 0) {
        dotHTML += `<span class="dot" style="background:${otherEvts[0].color}"></span>`;
      }

      html += `<td class="${classes}" style="background:${bg};color:${fg};${extraStyle}"><span class="day-num">${day.getDate()}</span>${dotHTML ? `<div class="dots">${dotHTML}</div>` : ''}</td>`;
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

  // Vacations
  const uniqueVacs = new Map<string, Vacation>();
  data.vacations.forEach(v => uniqueVacs.set(v.name, v));
  uniqueVacs.forEach(v => items.push({ label: v.name, bg: v.color || s.vacationColor }));

  // Tranches
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
  
  // Group by tranche
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

  /* Title */
  .page-title { text-align: center; font-size: 11pt; font-weight: 700; margin-bottom: 2mm; }

  /* Legend */
  .legend { display: flex; flex-wrap: wrap; gap: 2mm 4mm; justify-content: center; margin-bottom: 2mm; }
  .legend-item { display: flex; align-items: center; gap: 1mm; font-size: 6pt; }
  .legend-swatch { width: 8px; height: 8px; border-radius: 1px; flex-shrink: 0; }
  .legend-label { white-space: nowrap; }

  /* Grid 4x3 */
  .months-grid { display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(3, 1fr);
    gap: 2mm; flex: 1; min-height: 0; }

  /* Month block */
  .month-block { display: flex; flex-direction: column; min-height: 0; }
  .month-title { text-align: center; font-size: 7pt; font-weight: 700; padding: 1px 0;
    text-transform: capitalize; border-radius: 2px 2px 0 0; }

  /* Table */
  .month-table { width: 100%; border-collapse: collapse; table-layout: fixed; flex: 1; }
  .month-table th, .month-table td { font-size: 5.5pt; text-align: center; padding: 0; line-height: 1; height: 12px; }
  .month-table th { font-weight: 600; font-size: 5pt; }
  .wk-col { width: 14px; font-size: 5pt !important; }

  /* Day cells */
  .day { position: relative; vertical-align: middle; }
  .day.empty { background: #f5f5f5 !important; }
  .day-num { position: relative; z-index: 1; }
  .dots { position: absolute; bottom: 0; left: 0; right: 0; display: flex; justify-content: center; gap: 1px; }
  .dot { width: 3px; height: 3px; border-radius: 50%; }

  /* Arret bar */
  .arret-bar { margin-top: 2mm; border: 0.5px solid #ccc; border-radius: 2px; padding: 1mm 2mm; }
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
