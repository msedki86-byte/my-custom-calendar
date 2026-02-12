import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, format, isWeekend, isSameMonth, getWeek, isSameDay,
  startOfDay,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  CalendarSettings, CalendarEvent, Astreinte, Vacation, Arret,
  Holiday, CancelledAstreinteDate, PatternType,
} from '@/types/calendar';
import { getArretColor, getArretPattern } from '@/lib/trancheColors';

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
  return holidays.find(h => isSameDay(startOfDay(new Date(h.date)), startOfDay(date))) || null;
}

function isVacationDate(date: Date, vacations: Vacation[]): Vacation | null {
  const d = startOfDay(date);
  return vacations.find(v => {
    const s = startOfDay(new Date(v.startDate));
    const e = startOfDay(new Date(v.endDate));
    return d >= s && d <= e;
  }) || null;
}

function isAstreinteDate(date: Date, astreintes: Astreinte[]): Astreinte | null {
  const d = startOfDay(date);
  return astreintes.find(a => {
    if (a.isCancelled) return false;
    const s = startOfDay(new Date(a.startDate));
    const e = startOfDay(new Date(a.endDate));
    return d >= s && d <= e;
  }) || null;
}

function getEventsOnDate(date: Date, events: CalendarEvent[]): CalendarEvent[] {
  const d = startOfDay(date);
  return events.filter(ev => {
    const s = startOfDay(new Date(ev.startDate));
    const e = startOfDay(new Date(ev.endDate));
    return d >= s && d <= e;
  });
}

function isCancelledDate(date: Date, cancelled: CancelledAstreinteDate[]): boolean {
  return cancelled.some(c => isSameDay(startOfDay(new Date(c.date)), startOfDay(date)));
}

function getPatternSVG(pattern: PatternType, color: string, id: string): string {
  switch (pattern) {
    case 'stripes':
      return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="6" height="6"><rect width="6" height="6" fill="${color}"/><line x1="0" y1="0" x2="6" y2="6" stroke="#fff" stroke-width="1" opacity="0.6"/></pattern>`;
    case 'dots':
      return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="6" height="6"><rect width="6" height="6" fill="${color}"/><circle cx="3" cy="3" r="1.2" fill="#fff" opacity="0.6"/></pattern>`;
    case 'crosshatch':
      return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="6" height="6"><rect width="6" height="6" fill="${color}"/><line x1="0" y1="0" x2="6" y2="6" stroke="#fff" stroke-width="0.8" opacity="0.5"/><line x1="6" y1="0" x2="0" y2="6" stroke="#fff" stroke-width="0.8" opacity="0.5"/></pattern>`;
    case 'diagonal':
      return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="6" height="6"><rect width="6" height="6" fill="${color}"/><line x1="0" y1="6" x2="6" y2="0" stroke="#fff" stroke-width="1" opacity="0.6"/></pattern>`;
    case 'waves':
      return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="10" height="6"><rect width="10" height="6" fill="${color}"/><path d="M0 3 Q2.5 0 5 3 Q7.5 6 10 3" stroke="#fff" stroke-width="0.8" fill="none" opacity="0.6"/></pattern>`;
    case 'grid':
      return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="6" height="6"><rect width="6" height="6" fill="${color}"/><line x1="3" y1="0" x2="3" y2="6" stroke="#fff" stroke-width="0.6" opacity="0.5"/><line x1="0" y1="3" x2="6" y2="3" stroke="#fff" stroke-width="0.6" opacity="0.5"/></pattern>`;
    default:
      return '';
  }
}

function buildContextBarsForWeek(week: Date[], monthDate: Date, data: MonthlyPrintData): string {
  const s = data.settings;
  const bars: string[] = [];
  let patternCounter = 0;

  // Vacation bars
  for (const vac of data.vacations) {
    const vacStart = startOfDay(new Date(vac.startDate));
    const vacEnd = startOfDay(new Date(vac.endDate));
    let firstCol = -1, lastCol = -1;
    for (let i = 0; i < 7; i++) {
      const day = week[i];
      if (!isSameMonth(day, monthDate)) continue;
      const d = startOfDay(day);
      if (d >= vacStart && d <= vacEnd) {
        if (firstCol === -1) firstCol = i;
        lastCol = i;
      }
    }
    if (firstCol !== -1) {
      const left = ((firstCol + 1) / 8 * 100);
      const width = ((lastCol - firstCol + 1) / 8 * 100);
      bars.push(`<div style="position:absolute;top:0;left:${left}%;width:${width}%;height:4px;background:${s.vacationColor};border-radius:1px;z-index:1;"></div>`);
    }
  }

  // AT bars
  const arretSlots: { arret: Arret; firstCol: number; lastCol: number }[] = [];
  const processedArrets = new Set<string>();
  for (const arret of data.arrets) {
    if (arret.type !== 'arret') continue;
    if (processedArrets.has(arret.id)) continue;
    const arretStart = startOfDay(new Date(arret.startDate));
    const arretEnd = startOfDay(new Date(arret.endDate));
    let firstCol = -1, lastCol = -1;
    for (let i = 0; i < 7; i++) {
      const day = week[i];
      if (!isSameMonth(day, monthDate)) continue;
      const d = startOfDay(day);
      if (d >= arretStart && d <= arretEnd) {
        if (firstCol === -1) firstCol = i;
        lastCol = i;
      }
    }
    if (firstCol !== -1) {
      processedArrets.add(arret.id);
      arretSlots.push({ arret, firstCol, lastCol });
    }
  }

  // Prépa bars (half-width centered)
  const prepaSlots: { arret: Arret; firstCol: number; lastCol: number }[] = [];
  const processedPrepas = new Set<string>();
  for (const arret of data.arrets) {
    if (arret.type !== 'prepa') continue;
    if (processedPrepas.has(arret.id)) continue;
    const arretStart = startOfDay(new Date(arret.startDate));
    const arretEnd = startOfDay(new Date(arret.endDate));
    let firstCol = -1, lastCol = -1;
    for (let i = 0; i < 7; i++) {
      const day = week[i];
      if (!isSameMonth(day, monthDate)) continue;
      const d = startOfDay(day);
      if (d >= arretStart && d <= arretEnd) {
        if (firstCol === -1) firstCol = i;
        lastCol = i;
      }
    }
    if (firstCol !== -1) {
      processedPrepas.add(arret.id);
      prepaSlots.push({ arret, firstCol, lastCol });
    }
  }

  const arretBarHeight = 4;
  const arretStartY = 5;
  for (let idx = 0; idx < arretSlots.length; idx++) {
    const { arret, firstCol, lastCol } = arretSlots[idx];
    const color = getArretColor(arret, s);
    const pattern = getArretPattern(arret);
    const left = ((firstCol + 1) / 8 * 100);
    const width = ((lastCol - firstCol + 1) / 8 * 100);
    const top = arretStartY + idx * (arretBarHeight + 1);
    if (pattern !== 'none') {
      const patId = `mp_${monthDate.getMonth()}_a${patternCounter++}`;
      const patSvg = getPatternSVG(pattern, color, patId);
      if (patSvg) {
        bars.push(`<svg style="position:absolute;top:${top}px;left:${left}%;width:${width}%;height:${arretBarHeight}px;z-index:2;"><defs>${patSvg}</defs><rect width="100%" height="100%" fill="url(#${patId})" rx="1"/></svg>`);
        continue;
      }
    }
    bars.push(`<div style="position:absolute;top:${top}px;left:${left}%;width:${width}%;height:${arretBarHeight}px;background:${color};border-radius:1px;z-index:2;"></div>`);
  }

  const prepaStartY = arretSlots.length > 0 ? arretStartY + arretSlots.length * (arretBarHeight + 1) : arretStartY;
  const prepaBarHeight = 4;
  for (let idx = 0; idx < prepaSlots.length; idx++) {
    const { arret, firstCol, lastCol } = prepaSlots[idx];
    const color = getArretColor(arret, s);
    const pattern = getArretPattern(arret);
    const top = prepaStartY + idx * (prepaBarHeight + 1);

    // Individual half-width centered line per day cell
    for (let col = firstCol; col <= lastCol; col++) {
      const cellLeft = ((col + 1) / 8 * 100);
      const cellWidth = (1 / 8 * 100);
      const left = cellLeft + cellWidth * 0.25;
      const width = cellWidth * 0.5;

      if (pattern !== 'none') {
        const patId = `mp_${monthDate.getMonth()}_p${patternCounter++}`;
        const patSvg = getPatternSVG(pattern, color, patId);
        if (patSvg) {
          bars.push(`<svg style="position:absolute;top:${top}px;left:${left}%;width:${width}%;height:${prepaBarHeight}px;z-index:2;"><defs>${patSvg}</defs><rect width="100%" height="100%" fill="url(#${patId})" rx="1"/></svg>`);
          continue;
        }
      }
      bars.push(`<div style="position:absolute;top:${top}px;left:${left}%;width:${width}%;height:${prepaBarHeight}px;background:${color};border-radius:1px;z-index:2;"></div>`);
    }
  }

  if (bars.length === 0) return '';
  const allSlots = arretSlots.length + prepaSlots.length;
  const totalHeight = allSlots > 0 ? prepaStartY + prepaSlots.length * (prepaBarHeight + 1) : 5;
  return `<tr><td colspan="8" style="position:relative;height:${totalHeight}px;padding:0;border:none;">${bars.join('')}</td></tr>`;
}

function collectEventLegendItems(data: MonthlyPrintData): { label: string; bg: string }[] {
  const seen = new Map<string, string>();
  for (const evt of data.events) {
    if (evt.type === 're' || evt.type === 'cp') continue;
    const key = evt.name || evt.type;
    if (!seen.has(key)) seen.set(key, evt.color);
  }
  return Array.from(seen.entries()).map(([label, bg]) => ({ label, bg }));
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
  const eventItems = collectEventLegendItems(data);
  for (const ei of eventItems) {
    items.push({ label: ei.label, bg: ei.bg });
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

function buildMonthTableHTML(year: number, month: number, data: MonthlyPrintData): { monthName: string; tableHTML: string } {
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

  // Build data object scoped to this month for context bars
  const monthData: MonthlyPrintData = { ...data, year, month };

  let tableHTML = `<div class="month-section"><div class="month-section-title">${monthName}</div>`;
  tableHTML += `<table class="month-table"><thead><tr>
    <th class="wk-col" style="background:${s.weekNumberBgColor};color:${s.weekNumberTextColor}">Sem</th>`;
  ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'].forEach(d => {
    tableHTML += `<th style="background:${s.monthHeaderBgColor};color:${s.monthHeaderTextColor}">${d}</th>`;
  });
  tableHTML += `</tr></thead><tbody>`;

  const cellHeight = 70;

  for (const week of weeks) {
    tableHTML += buildContextBarsForWeek(week, monthDate, monthData);

    const wn = getWeek(week[0], { locale: fr, weekStartsOn: 1 });
    tableHTML += `<tr><td class="wk-col" style="background:${s.weekNumberBgColor};color:${s.weekNumberTextColor}">${wn}</td>`;

    for (const day of week) {
      if (!isSameMonth(day, monthDate)) {
        tableHTML += `<td class="day empty" style="background:${s.weekNumberBgColor};height:${cellHeight}px"></td>`;
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

      // State labels (CP, RE, holiday) - big, bold, centered
      let stateLabel = '';
      if (cpEvt) {
        stateLabel = `<div class="state-label">CP</div>`;
      } else if (reEvt) {
        stateLabel = `<div class="state-label">RE</div>`;
      } else if (hol) {
        stateLabel = `<div class="state-label">${hol.name}</div>`;
      }

      // Timed events positioned vertically
      const otherEvts = evts.filter(e => e.type !== 're' && e.type !== 'cp');
      let eventsHTML = '';
      for (const evt of otherEvts.slice(0, 3)) {
        const startMinutes = evt.startTime ? (parseInt(evt.startTime.split(':')[0]) * 60 + parseInt(evt.startTime.split(':')[1] || '0')) : 5 * 60;
        const endMinutes = evt.endTime ? (parseInt(evt.endTime.split(':')[0]) * 60 + parseInt(evt.endTime.split(':')[1] || '0')) : 21 * 60;
        const clampedStart = Math.max(startMinutes, 5 * 60);
        const clampedEnd = Math.min(endMinutes, 21 * 60);
        const topPct = ((clampedStart - 5 * 60) / (16 * 60)) * 100;
        const heightPct = Math.max(((clampedEnd - clampedStart) / (16 * 60)) * 100, 12);
        eventsHTML += `<div class="ev-block" style="top:${16 + topPct * 0.64}%;height:${heightPct * 0.64}%;background:${evt.color}">
          <span class="ev-name">${evt.name}</span>
          ${evt.startTime ? `<span class="ev-time">${evt.startTime}</span>` : ''}
        </div>`;
      }

      tableHTML += `<td class="day" style="background:${bg};color:${fg};height:${cellHeight}px">
        <span class="day-num">${day.getDate()}</span>
        ${stateLabel}
        ${eventsHTML}
      </td>`;
    }
    tableHTML += `</tr>`;
  }
  tableHTML += `</tbody></table></div>`;

  return { monthName, tableHTML };
}

export function generateMonthlyPrintHTML(data: MonthlyPrintData): string {
  const { year, month } = data;
  const s = data.settings;
  
  // Build 2 months: current + next
  const month1 = buildMonthTableHTML(year, month, data);
  const nextMonth = month + 1;
  const nextYear = nextMonth > 11 ? year + 1 : year;
  const nextMonthIdx = nextMonth > 11 ? 0 : nextMonth;
  const month2 = buildMonthTableHTML(nextYear, nextMonthIdx, data);

  const legend = buildLegendHTML(data);
  const arretSection = buildArretBarHTML(data);

  const title = `${month1.monthName} — ${month2.monthName}`;

  return `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"/>
<title>${title}</title>
<style>
  @page { size: A4 portrait; margin: 6mm; }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    width: 210mm; height: 297mm;
    font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    background: #ffffff; color: #111;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
    overflow: hidden;
  }

  .page {
    position: relative; z-index: 1;
    width: 198mm; margin: 0 auto;
    padding: 3mm 4mm;
    display: flex; flex-direction: column; align-items: center;
    transform: scale(0.87); transform-origin: top center;
  }

  /* Watermark */
  .watermark {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-35deg);
    font-size: 64pt; font-weight: 900; color: #003A8F; opacity: 0.10;
    letter-spacing: 10px; white-space: nowrap; z-index: 0; pointer-events: none;
    text-transform: uppercase;
  }

  .header-logo {
    position: absolute; top: 3mm; right: 4mm;
    width: 18mm; height: auto; opacity: 0.7;
    z-index: 2;
  }

  /* Footer signature */
  .footer-signature { position: absolute; bottom: 3mm; left: 0; width: 100%; text-align: center;
    font-size: 5pt; color: rgba(0,0,0,0.45); letter-spacing: 1px; font-weight: 500; }
  .footer-signature .separator { margin: 0 4px; opacity: 0.4; }

  .page-title {
    text-align: center;
    font-size: 13pt; font-weight: 600;
    letter-spacing: 0.4px; color: #111;
    margin-bottom: 2mm;
    text-transform: capitalize;
    width: 100%;
  }

  /* Legend */
  .legend { display: flex; flex-wrap: wrap; gap: 1mm 3mm; justify-content: center; margin-bottom: 1.5mm; width: 100%; }
  .legend-item { display: flex; align-items: center; gap: 1mm; font-size: 5.5pt; }
  .legend-swatch { width: 12px; height: 7px; border-radius: 1px; flex-shrink: 0; }
  .legend-label { white-space: nowrap; }

  .arret-legend-line { display: flex; flex-wrap: wrap; gap: 1mm 3mm; justify-content: center; margin-bottom: 1.5mm; width: 100%; }
  .arret-legend-line .legend-item { display: flex; align-items: center; gap: 1mm; font-size: 5.5pt; }
  .arret-legend-line .legend-swatch { width: 12px; height: 7px; border-radius: 1px; flex-shrink: 0; }

  /* Month sections - premium card style */
  .month-section {
    width: 100%; margin-bottom: 5mm;
    border: 1px solid #d0d0d0; border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  }
  .month-section-title {
    text-align: center; font-size: 10pt; font-weight: 700;
    text-transform: capitalize; margin-bottom: 0;
    padding: 4px 0;
    background: #111 !important; color: #fff !important;
    letter-spacing: 0.3px;
  }

  /* Table */
  .month-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
  .month-table th, .month-table td { text-align: center; padding: 0.5px; line-height: 1.1; border: 0.5px solid ${s.weekNumberBgColor}; }
  .month-table th { font-size: 5.5pt; font-weight: 600; padding: 2px 0; }
  .month-table td { font-size: 7pt; }
  .wk-col { width: 18px; font-size: 5.5pt !important; font-weight: 600; }

  .day { position: relative; vertical-align: top; padding-top: 0.5px !important; }
  .day-num { position: relative; z-index: 1; font-size: 6.5pt; font-weight: 600; }
  .state-label { font-size: 12pt; font-weight: 800; text-align: center; width: 100%; margin-top: 2px; line-height: 1; }

  .ev-block { position: absolute; left: 1px; right: 1px; border-radius: 1.5px; color: #fff; overflow: hidden; z-index: 2; display: flex; flex-direction: column; align-items: center; padding-top: 1px; }
  .ev-name { font-size: 7pt; font-weight: 800; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%; }
  .ev-time { font-size: 5pt; opacity: 0.8; }

  /* Arret bar */
  .arret-bar { margin-top: 1.5mm; border: 0.5px solid #d0d0d0; border-radius: 3px; padding: 1.5mm 2mm; width: 100%; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
  .arret-bar-title { font-size: 6pt; font-weight: 700; margin-bottom: 0.5mm; }
  .arret-items { display: flex; flex-wrap: wrap; gap: 0.5mm 2mm; }
  .arret-tranche { display: flex; align-items: center; gap: 0.5mm; }
  .arret-tranche-label { font-size: 5pt; font-weight: 700; padding: 0.3mm 1mm; border-radius: 2px; }
  .arret-chip { font-size: 4.5pt; border: 0.5px solid; border-radius: 2px; padding: 0.2mm 0.8mm; white-space: nowrap; }

  /* Print button */
  .print-btn {
    position: fixed; top: 12px; right: 12px; z-index: 9999;
    padding: 10px 22px; background: #111; color: #fff; border: none; border-radius: 8px;
    font-size: 14px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }
  .print-btn:hover { background: #333; }
  @media print { .print-btn { display: none !important; } }
</style>
</head><body>
<button class="print-btn" onclick="window.print()">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
  Imprimer
</button>
<div class="page">
  <div class="watermark">W Planner</div>
  <img src="/images/logo-calendar.png" class="header-logo" alt="" />
  <div class="page-title">${title}</div>
  ${legend}
  ${arretSection}
  ${month1.tableHTML}
  ${month2.tableHTML}
  <div class="footer-signature">
    <span>W Planner</span>
    <span class="separator">•</span>
    <span>Planning professionnel</span>
    <span class="separator">•</span>
    <span>${year}</span>
  </div>
</div>
</body></html>`
}
