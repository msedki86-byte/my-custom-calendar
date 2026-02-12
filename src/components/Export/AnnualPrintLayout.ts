import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, format, isWeekend, isSameMonth, getWeek, isSameDay,
  isWithinInterval, startOfDay,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  CalendarSettings, CalendarEvent, Astreinte, Vacation, Arret,
  Holiday, CancelledAstreinteDate, PatternType, modulePatterns,
} from '@/types/calendar';
import { getArretColor, getArretPattern } from '@/lib/trancheColors';

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

function isPrepaOnDate(date: Date, arrets: Arret[]): Arret | null {
  const d = startOfDay(date);
  return arrets.find(a => {
    if (a.type !== 'prepa') return false;
    const s = startOfDay(new Date(a.startDate));
    const e = startOfDay(new Date(a.endDate));
    return d >= s && d <= e;
  }) || null;
}

function isCancelledDate(date: Date, cancelled: CancelledAstreinteDate[]): boolean {
  return cancelled.some(c => isSameDay(new Date(c.date), date));
}

/** Generate an SVG pattern fill for arrêt bars */
function getPatternSVG(pattern: PatternType, color: string, id: string): string {
  switch (pattern) {
    case 'stripes':
      return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="4" height="4"><rect width="4" height="4" fill="${color}"/><line x1="0" y1="0" x2="4" y2="4" stroke="#fff" stroke-width="0.8" opacity="0.6"/></pattern>`;
    case 'dots':
      return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="4" height="4"><rect width="4" height="4" fill="${color}"/><circle cx="2" cy="2" r="0.8" fill="#fff" opacity="0.6"/></pattern>`;
    case 'crosshatch':
      return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="4" height="4"><rect width="4" height="4" fill="${color}"/><line x1="0" y1="0" x2="4" y2="4" stroke="#fff" stroke-width="0.6" opacity="0.5"/><line x1="4" y1="0" x2="0" y2="4" stroke="#fff" stroke-width="0.6" opacity="0.5"/></pattern>`;
    case 'diagonal':
      return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="4" height="4"><rect width="4" height="4" fill="${color}"/><line x1="0" y1="4" x2="4" y2="0" stroke="#fff" stroke-width="0.8" opacity="0.6"/></pattern>`;
    case 'waves':
      return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="8" height="4"><rect width="8" height="4" fill="${color}"/><path d="M0 2 Q2 0 4 2 Q6 4 8 2" stroke="#fff" stroke-width="0.6" fill="none" opacity="0.6"/></pattern>`;
    case 'grid':
      return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="4" height="4"><rect width="4" height="4" fill="${color}"/><line x1="2" y1="0" x2="2" y2="4" stroke="#fff" stroke-width="0.5" opacity="0.5"/><line x1="0" y1="2" x2="4" y2="2" stroke="#fff" stroke-width="0.5" opacity="0.5"/></pattern>`;
    default:
      return '';
  }
}

// Build context bars (vacations + arrets) for a given week row
function buildContextBarsForWeek(week: Date[], monthDate: Date, data: AnnualPrintData): string {
  const s = data.settings;
  const bars: string[] = [];
  const svgDefs: string[] = [];
  let patternCounter = 0;

  // Vacation bars - always use settings.vacationColor to match legend
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
      bars.push(`<div style="position:absolute;top:0;left:${left}%;width:${width}%;height:2px;background:${s.vacationColor};border-radius:1px;z-index:1;"></div>`);
    }
  }

  // Arret bars (AT only) - each on its own vertical slot to avoid overlap
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

  // Prépa module bars - half-width, centered, with patterns
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

  // Each arrêt gets its own row offset: vacation=0-2px, then gap 1px, then arrêts stack at 3px each
  const arretBarHeight = 3;
  const arretStartY = 3; // after vacation bar (2px) + 1px gap
  for (let idx = 0; idx < arretSlots.length; idx++) {
    const { arret, firstCol, lastCol } = arretSlots[idx];
    const color = getArretColor(arret, s);
    const pattern = getArretPattern(arret);
    const left = ((firstCol + 1) / 8 * 100);
    const width = ((lastCol - firstCol + 1) / 8 * 100);
    const top = arretStartY + idx * (arretBarHeight + 1);

    if (pattern !== 'none') {
      const patId = `ap_${monthDate.getMonth()}_${patternCounter++}`;
      const patSvg = getPatternSVG(pattern, color, patId);
      if (patSvg) {
        svgDefs.push(patSvg);
        bars.push(`<svg style="position:absolute;top:${top}px;left:${left}%;width:${width}%;height:${arretBarHeight}px;z-index:2;"><defs>${patSvg}</defs><rect width="100%" height="100%" fill="url(#${patId})" rx="1"/></svg>`);
        continue;
      }
    }
    bars.push(`<div style="position:absolute;top:${top}px;left:${left}%;width:${width}%;height:${arretBarHeight}px;background:${color};border-radius:1px;z-index:2;"></div>`);
  }

  // Prépa modules: individual half-width centered lines per day cell (not continuous bars)
  // Group prepas by their id to stack different modules
  const prepaStartY = arretSlots.length > 0 ? arretStartY + arretSlots.length * (arretBarHeight + 1) : arretStartY;
  const prepaBarHeight = 3;
  for (let idx = 0; idx < prepaSlots.length; idx++) {
    const { arret, firstCol, lastCol } = prepaSlots[idx];
    const color = getArretColor(arret, s);
    const pattern = getArretPattern(arret);
    const top = prepaStartY + idx * (prepaBarHeight + 1);

    // Render individual half-width centered line per day cell
    for (let col = firstCol; col <= lastCol; col++) {
      const cellLeft = ((col + 1) / 8 * 100);
      const cellWidth = (1 / 8 * 100);
      const left = cellLeft + cellWidth * 0.25;
      const width = cellWidth * 0.5;

      if (pattern !== 'none') {
        const patId = `pp_${monthDate.getMonth()}_${patternCounter++}`;
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
  const totalHeight = allSlots > 0 ? prepaStartY + prepaSlots.length * (prepaBarHeight + 1) : 3;
  return `<tr><td class="wk-col" style="background:${s.weekNumberBgColor};padding:0;border:none;"></td><td colspan="7" style="position:relative;height:${totalHeight}px;padding:0;border:none;">${bars.join('')}</td></tr>`;
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
  html += `<div class="month-title">${monthName}</div>`;
  html += `<table class="month-table"><thead><tr><th class="wk-col" style="background:${s.weekNumberBgColor};color:${s.weekNumberTextColor}">S</th>`;
  ['L','M','M','J','V','S','D'].forEach(d => {
    html += `<th style="background:${s.monthHeaderBgColor};color:${s.monthHeaderTextColor}">${d}</th>`;
  });
  html += `</tr></thead><tbody>`;

  for (const week of weeks) {
    html += buildContextBarsForWeek(week, monthDate, data);

    const wn = getWeek(week[0], { locale: fr, weekStartsOn: 1 });
    html += `<tr><td class="wk-col" style="background:${s.weekNumberBgColor};color:${s.weekNumberTextColor}">${wn}</td>`;

    for (const day of week) {
      if (!isSameMonth(day, monthDate)) {
        html += `<td class="day empty" style="background:${s.weekNumberBgColor}"></td>`;
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
      for (const evt of otherEvts.slice(0, 2)) {
        // Calculate dynamic width based on event duration relative to cell
        const evtStart = startOfDay(new Date(evt.startDate));
        const evtEnd = startOfDay(new Date(evt.endDate));
        const totalDays = Math.max(1, Math.round((evtEnd.getTime() - evtStart.getTime()) / (1000 * 60 * 60 * 24)) + 1);
        const widthPct = Math.min(100, Math.max(30, totalDays <= 1 ? 40 : totalDays <= 3 ? 60 : totalDays <= 7 ? 80 : 100));
        const safeName = (evt.name || '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        linesHTML += `<span class="ev-line" style="background:${evt.color};width:${widthPct}%" title="${safeName}"></span>`;
      }

      const safeDay = day.getDate();
      html += `<td class="day" style="background:${bg};color:${fg}"><span class="day-num">${safeDay}</span>${linesHTML ? `<div class="ev-lines">${linesHTML}</div>` : ''}</td>`;
    }
    html += `</tr>`;
  }
  html += `</tbody></table></div>`;
  return html;
}

/** Collect unique event types for legend (excluding RE/CP which are already listed) */
function collectEventLegendItems(data: AnnualPrintData): { label: string; bg: string }[] {
  const seen = new Map<string, string>();
  for (const evt of data.events) {
    if (evt.type === 're' || evt.type === 'cp') continue;
    const key = evt.name || evt.type;
    if (!seen.has(key)) seen.set(key, evt.color);
  }
  return Array.from(seen.entries()).map(([label, bg]) => ({ label, bg }));
}

function buildLegendHTML(data: AnnualPrintData): string {
  const s = data.settings;
  const items: { label: string; bg: string; border?: string }[] = [
    { label: 'Astreinte', bg: s.astreinteColor },
    { label: 'RE', bg: s.reColor, border: '#999' },
    { label: 'CP', bg: s.cpColor },
  ];

  if (data.vacations.length > 0) {
    items.push({ label: 'Vacances scolaires', bg: s.vacationColor });
  }

  // Add event types
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

  const trancheSwatches: string[] = [];
  byTranche.forEach((arretList, tranche) => {
    const color = getArretColor(arretList[0], s);
    trancheSwatches.push(`<div class="legend-item"><span class="legend-swatch" style="background:${color}"></span><span class="legend-label">${tranche}</span></div>`);
  });

  const chips: string[] = [];
  byTranche.forEach((arretList, tranche) => {
    const color = getArretColor(arretList[0], s);
    let trancheHTML = `<div class="arret-tranche"><span class="arret-tranche-label" style="background:${color};color:#FFF">${tranche}</span>`;
    arretList.forEach(a => {
      const start = format(new Date(a.startDate), 'dd/MM', { locale: fr });
      const end = format(new Date(a.endDate), 'dd/MM', { locale: fr });
      const label = a.type === 'prepa' && a.module ? `${a.module}` : 'AT';
      trancheHTML += `<span class="arret-chip" style="border-color:${color}">${label}: ${start}–${end}</span>`;
    });
    trancheHTML += `</div>`;
    chips.push(trancheHTML);
  });

  html += chips.join('');
  html += `</div></div>`;

  return `<div class="arret-legend-line">${trancheSwatches.join('')}</div>${html}`;
}

export function generateAnnualPrintHTML(data: AnnualPrintData): string {
  const { year } = data;
  let months = '';
  for (let m = 0; m < 12; m++) months += buildMonthHTML(year, m, data);

  const legend = buildLegendHTML(data);
  const arretSection = buildArretBarHTML(data);

  return `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"/>
<title>Calendrier ${year}</title>
<style>
  @page { size: A4 landscape; margin: 5mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 297mm; height: 210mm; overflow: hidden; font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; background: #fff; color: #111;
    font-weight: 400; letter-spacing: 0.2px;
    -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .page { position: relative; width: 297mm; height: 210mm; padding: 3mm; display: flex; flex-direction: column; transform: scale(0.95); transform-origin: top center; margin: 0 auto; }

  /* Watermark */
  .watermark {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-35deg);
    font-size: 110pt; font-weight: 900; color: #003A8F; opacity: 0.10;
    letter-spacing: 14px; white-space: nowrap; z-index: 0; pointer-events: none;
  }

  .header-logo {
    position: absolute; top: 2mm; right: 3mm;
    width: 20mm; height: auto; opacity: 0.7;
    z-index: 2;
  }

  .page-title { text-align: center; font-size: 11pt; font-weight: 600; letter-spacing: 0.8px; margin-bottom: 1mm; }

  /* Legend */
  .legend { display: flex; flex-wrap: wrap; gap: 1.5mm 4mm; justify-content: center; margin-bottom: 1mm; }
  .legend-item { display: flex; align-items: center; gap: 1mm; font-size: 6pt; }
  .legend-swatch { width: 12px; height: 8px; border-radius: 1px; flex-shrink: 0; }
  .legend-label { white-space: nowrap; font-weight: 500; }

  /* Arret legend line */
  .arret-legend-line { display: flex; flex-wrap: wrap; gap: 1.5mm 4mm; justify-content: center; margin-bottom: 1mm; }
  .arret-legend-line .legend-item { display: flex; align-items: center; gap: 1mm; font-size: 6pt; }
  .arret-legend-line .legend-swatch { width: 12px; height: 8px; border-radius: 1px; flex-shrink: 0; }

  /* Grid 4x3 */
  .months-grid { display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(3, 1fr);
    gap: 3.5mm; flex: 1; min-height: 0; }

  /* Month block premium */
  .month-block { display: flex; flex-direction: column; min-height: 0;
    border: 0.6px solid #d8d8d8; border-radius: 4px; background: #ffffff; box-shadow: 0 0.5px 2px rgba(0,0,0,0.04); overflow: hidden; }
  .month-title { text-align: center; font-size: 8pt; font-weight: 700; letter-spacing: 0.6px; padding: 2px 0;
    text-transform: capitalize; background: #111 !important; color: #fff !important; }

  /* Table */
  .month-table { width: 100%; border-collapse: collapse; table-layout: fixed; flex: 1; }
  .month-table th, .month-table td { font-size: 6pt; text-align: center; padding: 0; line-height: 14px; height: 14px; vertical-align: middle; border: 0.3px solid ${data.settings.weekNumberBgColor}; }
  .month-table th { font-weight: 600; font-size: 5pt; }
  .wk-col { width: 14px; font-size: 5pt !important; }

   /* Day cells */
   .day { position: relative; vertical-align: middle; }
   .day.empty { }
   .day-num { position: relative; z-index: 1; font-weight: 600; display: inline-block; vertical-align: middle; }

  /* Footer signature */
  .footer-signature { position: absolute; bottom: 3mm; left: 0; width: 100%; text-align: center;
    font-size: 5pt; color: rgba(0,0,0,0.45); letter-spacing: 1px; font-weight: 500; }
  .footer-signature .separator { margin: 0 4px; opacity: 0.4; }

  /* Prépa module: centered half-width line */
  .prepa-line { position: absolute; top: 50%; left: 25%; width: 50%; height: 2px; border-radius: 1px; transform: translateY(2px); z-index: 1; }

   /* Event lines centered in cell */
   .ev-lines { position: absolute; bottom: 1px; left: 1px; right: 1px; display: flex; flex-direction: column; align-items: center; gap: 1px; }
   .ev-line { display: block; height: 2px; border-radius: 0.5px; }

  /* Arret bar */
  .arret-bar { margin-top: 1mm; border: 0.5px solid #ccc; border-radius: 2px; padding: 1mm 2mm; }
  .arret-bar-title { font-size: 6.5pt; font-weight: 700; margin-bottom: 1mm; }
  .arret-items { display: flex; flex-wrap: wrap; gap: 1mm 3mm; }
  .arret-tranche { display: flex; align-items: center; gap: 1mm; }
  .arret-tranche-label { font-size: 5.5pt; font-weight: 700; padding: 0.5mm 1.5mm; border-radius: 2px; }
  .arret-chip { font-size: 5pt; border: 0.5px solid; border-radius: 2px; padding: 0.3mm 1mm; white-space: nowrap; }
</style>
</head><body>
<div class="page">
  <div class="watermark">W planner</div>
  <img src="/images/logo-calendar.png" class="header-logo" alt="" />
  <div class="page-title">Calendrier ${year}</div>
  ${legend}
  ${arretSection}
  <div class="months-grid">${months}</div>
  <div class="footer-signature">
    <span>W Planner</span>
    <span class="separator">•</span>
    <span>Planning professionnel</span>
    <span class="separator">•</span>
    <span>${year}</span>
  </div>
</div>
<div class="print-btn-bar" style="position:fixed;top:8px;right:8px;z-index:999;display:flex;gap:6px;">
  <button onclick="window.print()" style="display:flex;align-items:center;gap:4px;padding:6px 14px;background:#111;color:#fff;border:none;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
    Imprimer
  </button>
</div>
<style>@media print { .print-btn-bar { display: none !important; } }</style>
</body></html>`;
}
