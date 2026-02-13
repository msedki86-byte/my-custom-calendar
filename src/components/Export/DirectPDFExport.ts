/**
 * Direct jsPDF rendering — no HTML, no html2canvas.
 * Draws calendar grids natively for instant PDF generation.
 */
import jsPDF from 'jspdf';
import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, format, isWeekend, isSameMonth, getWeek, isSameDay,
  startOfDay,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  CalendarSettings, CalendarEvent, Astreinte, Vacation, Arret,
  Holiday, CancelledAstreinteDate,
} from '@/types/calendar';
import { getArretColor } from '@/lib/trancheColors';

// ─── Shared helpers ───

function isHolidayDate(date: Date, holidays: Holiday[]): Holiday | null {
  return holidays.find(h => isSameDay(startOfDay(new Date(h.date)), startOfDay(date))) || null;
}

function isAstreinteDate(date: Date, astreintes: Astreinte[]): Astreinte | null {
  const d = startOfDay(date);
  return astreintes.find(a => {
    if (a.isCancelled) return false;
    return d >= startOfDay(new Date(a.startDate)) && d <= startOfDay(new Date(a.endDate));
  }) || null;
}

function isCancelledDate(date: Date, cancelled: CancelledAstreinteDate[]): boolean {
  return cancelled.some(c => isSameDay(new Date(c.date), date));
}

function getEventsOnDate(date: Date, events: CalendarEvent[]): CalendarEvent[] {
  const d = startOfDay(date);
  return events.filter(ev => d >= startOfDay(new Date(ev.startDate)) && d <= startOfDay(new Date(ev.endDate)));
}

function hexToRGB(hex: string): [number, number, number] {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  return [parseInt(hex.substring(0,2),16), parseInt(hex.substring(2,4),16), parseInt(hex.substring(4,6),16)];
}

function textColor(hex: string): [number, number, number] {
  const [r,g,b] = hexToRGB(hex);
  const lum = (0.299*r + 0.587*g + 0.114*b);
  return lum > 160 ? [0,0,0] : [255,255,255];
}

export interface PDFExportData {
  year: number;
  month?: number;
  settings: CalendarSettings;
  events: CalendarEvent[];
  astreintes: Astreinte[];
  vacations: Vacation[];
  arrets: Arret[];
  holidays: Holiday[];
  cancelledDates: CancelledAstreinteDate[];
}

// ─── ANNUAL PDF ───

export function generateAnnualPDFDirect(data: PDFExportData) {
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const s = data.settings;
  const W = 297, H = 210;
  const margin = 5;

  // Watermark - simple centered text with low opacity
  const cx = W/2, cy = H/2;
  pdf.setTextColor(0, 58, 143);
  pdf.setFontSize(80);
  // Use GState for opacity
  try {
    // @ts-ignore
    const gState = new (pdf as any).GState({ opacity: 0.07 });
    pdf.saveGraphicsState();
    // @ts-ignore
    pdf.setGState(gState);
    pdf.text('W planner', cx, cy, { align: 'center', baseline: 'middle', angle: 35 });
    pdf.restoreGraphicsState();
  } catch {
    // Fallback: skip watermark if GState not available
  }

  // Title
  pdf.setTextColor(17, 17, 17);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`Calendrier ${data.year}`, W/2, margin + 3, { align: 'center' });

  // Legend
  const legendY = margin + 7;
  drawLegend(pdf, data, W/2, legendY);

  // Grid 4×3
  const gridTop = legendY + 5;
  const gridLeft = margin;
  const gridW = W - 2*margin;
  const gridH = H - gridTop - 12; // leave room for footer
  const cols = 4, rows = 3;
  const gapX = 2.5, gapY = 2;
  const cellW = (gridW - (cols-1)*gapX) / cols;
  const cellH = (gridH - (rows-1)*gapY) / rows;

  for (let m = 0; m < 12; m++) {
    const col = m % 4;
    const row = Math.floor(m / 4);
    const x = gridLeft + col * (cellW + gapX);
    const y = gridTop + row * (cellH + gapY);
    drawMonth(pdf, data, data.year, m, x, y, cellW, cellH);
  }

  // Arret bar
  if (data.arrets.length > 0) {
    drawArretBar(pdf, data, margin, H - 11, gridW);
  }

  // Footer
  pdf.setFontSize(5);
  pdf.setTextColor(120, 120, 120);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`W Planner • Planning professionnel • ${data.year}`, W/2, H - 3, { align: 'center' });

  pdf.save(`Calendrier_${data.year}.pdf`);
}

function drawMonth(pdf: jsPDF, data: PDFExportData, year: number, month: number, x: number, y: number, w: number, h: number) {
  const s = data.settings;
  const monthDate = new Date(year, month, 1);
  const monthStart = startOfMonth(monthDate);
  const monthEnd = endOfMonth(monthDate);
  const calStart = startOfWeek(monthStart, { locale: fr, weekStartsOn: 1 });
  const calEnd = endOfWeek(monthEnd, { locale: fr, weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: calStart, end: calEnd });
  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  // Border
  pdf.setDrawColor(216, 216, 216);
  pdf.setLineWidth(0.2);
  pdf.roundedRect(x, y, w, h, 1, 1, 'S');

  // Month title bar
  const titleH = 4;
  pdf.setFillColor(...hexToRGB(s.yearMonthBgColor));
  pdf.rect(x, y, w, titleH, 'F');
  pdf.setFontSize(6);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...hexToRGB(s.yearMonthTextColor));
  const monthName = format(monthDate, 'MMMM', { locale: fr });
  pdf.text(monthName.charAt(0).toUpperCase() + monthName.slice(1), x + w/2, y + titleH/2, { align: 'center', baseline: 'middle' });

  // Header row
  const headerY = y + titleH;
  const wkW = 4;
  const dayW = (w - wkW) / 7;
  const rowH = (h - titleH - 3) / (weeks.length + 1); // +1 for header
  const headerH = Math.min(rowH, 3);

  // Week col header
  pdf.setFillColor(...hexToRGB(s.weekNumberBgColor));
  pdf.rect(x, headerY, wkW, headerH, 'F');
  pdf.setFontSize(4);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...hexToRGB(s.weekNumberTextColor));
  pdf.text('S', x + wkW/2, headerY + headerH/2, { align: 'center', baseline: 'middle' });

  // Day headers
  const dayLabels = ['L','M','M','J','V','S','D'];
  pdf.setFillColor(...hexToRGB(s.monthHeaderBgColor));
  pdf.rect(x + wkW, headerY, w - wkW, headerH, 'F');
  pdf.setTextColor(...hexToRGB(s.monthHeaderTextColor));
  pdf.setFontSize(4);
  for (let d = 0; d < 7; d++) {
    pdf.text(dayLabels[d], x + wkW + d*dayW + dayW/2, headerY + headerH/2, { align: 'center', baseline: 'middle' });
  }

  // Week rows
  const dataRowH = (h - titleH - headerH) / weeks.length;
  for (let wi = 0; wi < weeks.length; wi++) {
    const week = weeks[wi];
    const ry = headerY + headerH + wi * dataRowH;
    const wn = getWeek(week[0], { locale: fr, weekStartsOn: 1 });

    // Week number
    pdf.setFillColor(...hexToRGB(s.weekNumberBgColor));
    pdf.rect(x, ry, wkW, dataRowH, 'F');
    pdf.setFontSize(4);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...hexToRGB(s.weekNumberTextColor));
    pdf.text(String(wn), x + wkW/2, ry + dataRowH/2, { align: 'center', baseline: 'middle' });

    for (let di = 0; di < 7; di++) {
      const day = week[di];
      const dx = x + wkW + di * dayW;

      if (!isSameMonth(day, monthDate)) {
        pdf.setFillColor(...hexToRGB(s.weekNumberBgColor));
        pdf.rect(dx, ry, dayW, dataRowH, 'F');
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
      if (we || hol) bg = s.weekendDaysBgColor;
      if (reEvt) bg = s.reColor;
      if (cpEvt) bg = s.cpColor;
      if (ast && !cancelled) bg = s.astreinteColor;

      pdf.setFillColor(...hexToRGB(bg));
      pdf.rect(dx, ry, dayW, dataRowH, 'F');

      // Border
      pdf.setDrawColor(...hexToRGB(s.weekNumberBgColor));
      pdf.setLineWidth(0.1);
      pdf.rect(dx, ry, dayW, dataRowH, 'S');

      // Day number
      const tc = textColor(bg);
      pdf.setTextColor(...tc);
      pdf.setFontSize(5);
      pdf.setFont('helvetica', 'bold');
      pdf.text(String(day.getDate()), dx + dayW/2, ry + dataRowH/2 - 0.5, { align: 'center', baseline: 'middle' });

      // Event lines (max 2)
      const otherEvts = evts.filter(e => e.type !== 're' && e.type !== 'cp');
      for (let ei = 0; ei < Math.min(otherEvts.length, 2); ei++) {
        const evt = otherEvts[ei];
        pdf.setFillColor(...hexToRGB(evt.color));
        const lineY = ry + dataRowH - 1.5 - ei * 1;
        pdf.rect(dx + dayW*0.15, lineY, dayW*0.7, 0.6, 'F');
      }
    }
  }
}

function drawLegend(pdf: jsPDF, data: PDFExportData, cx: number, y: number) {
  const s = data.settings;
  const items: { label: string; color: string }[] = [
    { label: 'Astreinte', color: s.astreinteColor },
    { label: 'RE', color: s.reColor },
    { label: 'CP', color: s.cpColor },
  ];
  if (data.vacations.length > 0) items.push({ label: 'Vacances scolaires', color: s.vacationColor });

  // Unique events
  const seen = new Set<string>();
  for (const evt of data.events) {
    if (evt.type === 're' || evt.type === 'cp') continue;
    const key = evt.name || evt.type;
    if (!seen.has(key)) { seen.add(key); items.push({ label: key, color: evt.color }); }
  }

  const swatchW = 3, swatchH = 2, gap = 1.5, itemGap = 4;
  pdf.setFontSize(5);
  pdf.setFont('helvetica', 'normal');

  // Measure total width
  let totalW = 0;
  for (const it of items) {
    totalW += swatchW + gap + pdf.getTextWidth(it.label) + itemGap;
  }
  totalW -= itemGap;

  let ix = cx - totalW/2;
  for (const it of items) {
    pdf.setFillColor(...hexToRGB(it.color));
    pdf.rect(ix, y - swatchH/2, swatchW, swatchH, 'F');
    ix += swatchW + gap;
    pdf.setTextColor(60, 60, 60);
    pdf.text(it.label, ix, y, { baseline: 'middle' });
    ix += pdf.getTextWidth(it.label) + itemGap;
  }
}

function drawArretBar(pdf: jsPDF, data: PDFExportData, x: number, y: number, w: number) {
  const s = data.settings;
  pdf.setFontSize(5);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(40, 40, 40);
  pdf.text('Planning Arrêts', x, y);

  const byTranche = new Map<string, Arret[]>();
  data.arrets.forEach(a => {
    const list = byTranche.get(a.tranche) || [];
    list.push(a);
    byTranche.set(a.tranche, list);
  });

  let cx = x;
  const chipY = y + 2;
  pdf.setFontSize(4);
  byTranche.forEach((arretList, tranche) => {
    const color = getArretColor(arretList[0], s);
    // Tranche label
    pdf.setFillColor(...hexToRGB(color));
    const labelW = pdf.getTextWidth(tranche) + 2;
    pdf.roundedRect(cx, chipY, labelW, 3, 0.5, 0.5, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.text(tranche, cx + labelW/2, chipY + 1.5, { align: 'center', baseline: 'middle' });
    cx += labelW + 1;

    // Chips
    pdf.setFont('helvetica', 'normal');
    for (const a of arretList) {
      const start = format(new Date(a.startDate), 'dd/MM', { locale: fr });
      const end = format(new Date(a.endDate), 'dd/MM', { locale: fr });
      const label = a.type === 'prepa' && a.module ? a.module : 'AT';
      const txt = `${label}: ${start}–${end}`;
      const tw = pdf.getTextWidth(txt) + 2;
      pdf.setDrawColor(...hexToRGB(color));
      pdf.setLineWidth(0.2);
      pdf.roundedRect(cx, chipY, tw, 3, 0.5, 0.5, 'S');
      pdf.setTextColor(60, 60, 60);
      pdf.text(txt, cx + tw/2, chipY + 1.5, { align: 'center', baseline: 'middle' });
      cx += tw + 1;
      if (cx > x + w - 10) { cx = x; /* wrap would need new line - simplified */ }
    }
    cx += 2;
  });
}

// ─── MONTHLY PDF ───

export function generateMonthlyPDFDirect(data: PDFExportData) {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const s = data.settings;
  const W = 210, H = 297;
  const margin = 6;
  const month = data.month ?? 0;

  // Title
  const m1Name = format(new Date(data.year, month, 1), 'MMMM yyyy', { locale: fr });
  const nextM = month + 1 > 11 ? 0 : month + 1;
  const nextY = month + 1 > 11 ? data.year + 1 : data.year;
  const m2Name = format(new Date(nextY, nextM, 1), 'MMMM yyyy', { locale: fr });
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(17, 17, 17);
  pdf.text(`${cap(m1Name)} — ${cap(m2Name)}`, W/2, margin + 4, { align: 'center' });

  // Legend
  drawLegend(pdf, data, W/2, margin + 9);

  // Draw two months
  const tableTop = margin + 14;
  const tableH = (H - tableTop - 15) / 2 - 3;
  drawMonthlyTable(pdf, data, data.year, month, margin, tableTop, W - 2*margin, tableH);
  drawMonthlyTable(pdf, data, nextY, nextM, margin, tableTop + tableH + 6, W - 2*margin, tableH);

  // Arret bar
  if (data.arrets.length > 0) {
    drawArretBar(pdf, data, margin, H - 12, W - 2*margin);
  }

  // Footer
  pdf.setFontSize(5);
  pdf.setTextColor(120, 120, 120);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`W Planner • Planning professionnel • ${data.year}`, W/2, H - 4, { align: 'center' });

  const monthNames = ['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'];
  pdf.save(`${monthNames[month]}_${data.year}.pdf`);
}

function drawMonthlyTable(pdf: jsPDF, data: PDFExportData, year: number, month: number, x: number, y: number, w: number, h: number) {
  const s = data.settings;
  const monthDate = new Date(year, month, 1);
  const monthStart = startOfMonth(monthDate);
  const monthEnd = endOfMonth(monthDate);
  const calStart = startOfWeek(monthStart, { locale: fr, weekStartsOn: 1 });
  const calEnd = endOfWeek(monthEnd, { locale: fr, weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: calStart, end: calEnd });
  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  // Title bar
  const titleH = 5;
  pdf.setFillColor(...hexToRGB(s.yearMonthBgColor));
  pdf.roundedRect(x, y, w, titleH, 1, 1, 'F');
  // Fill bottom corners
  pdf.rect(x, y + titleH - 1, w, 1, 'F');
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...hexToRGB(s.yearMonthTextColor));
  const mName = format(monthDate, 'MMMM yyyy', { locale: fr });
  pdf.text(mName.charAt(0).toUpperCase() + mName.slice(1), x + w/2, y + titleH/2, { align: 'center', baseline: 'middle' });

  // Header row
  const headerY = y + titleH;
  const wkW = 7;
  const dayW = (w - wkW) / 7;
  const headerH = 4;

  pdf.setFillColor(...hexToRGB(s.weekNumberBgColor));
  pdf.rect(x, headerY, wkW, headerH, 'F');
  pdf.setFontSize(5);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...hexToRGB(s.weekNumberTextColor));
  pdf.text('Sem', x + wkW/2, headerY + headerH/2, { align: 'center', baseline: 'middle' });

  const dayLabels = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];
  pdf.setFillColor(...hexToRGB(s.monthHeaderBgColor));
  pdf.rect(x + wkW, headerY, w - wkW, headerH, 'F');
  pdf.setTextColor(...hexToRGB(s.monthHeaderTextColor));
  for (let d = 0; d < 7; d++) {
    pdf.text(dayLabels[d], x + wkW + d*dayW + dayW/2, headerY + headerH/2, { align: 'center', baseline: 'middle' });
  }

  // Data rows
  const dataH = h - titleH - headerH;
  const rowH = dataH / weeks.length;

  for (let wi = 0; wi < weeks.length; wi++) {
    const week = weeks[wi];
    const ry = headerY + headerH + wi * rowH;
    const wn = getWeek(week[0], { locale: fr, weekStartsOn: 1 });

    // Week number
    pdf.setFillColor(...hexToRGB(s.weekNumberBgColor));
    pdf.rect(x, ry, wkW, rowH, 'F');
    pdf.setFontSize(5);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...hexToRGB(s.weekNumberTextColor));
    pdf.text(String(wn), x + wkW/2, ry + rowH/2, { align: 'center', baseline: 'middle' });

    for (let di = 0; di < 7; di++) {
      const day = week[di];
      const dx = x + wkW + di * dayW;

      if (!isSameMonth(day, monthDate)) {
        pdf.setFillColor(...hexToRGB(s.weekNumberBgColor));
        pdf.rect(dx, ry, dayW, rowH, 'F');
        pdf.setDrawColor(220, 220, 220);
        pdf.setLineWidth(0.1);
        pdf.rect(dx, ry, dayW, rowH, 'S');
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
      if (we || hol) bg = s.weekendDaysBgColor;
      if (reEvt) bg = s.reColor;
      if (cpEvt) bg = s.cpColor;
      if (ast && !cancelled) bg = s.astreinteColor;

      pdf.setFillColor(...hexToRGB(bg));
      pdf.rect(dx, ry, dayW, rowH, 'F');
      pdf.setDrawColor(220, 220, 220);
      pdf.setLineWidth(0.1);
      pdf.rect(dx, ry, dayW, rowH, 'S');

      // Day number
      const tc = textColor(bg);
      pdf.setTextColor(...tc);
      pdf.setFontSize(6);
      pdf.setFont('helvetica', 'bold');
      pdf.text(String(day.getDate()), dx + 1.5, ry + 3.5);

      // State label
      if (cpEvt) {
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text('CP', dx + dayW/2, ry + rowH/2 + 1, { align: 'center', baseline: 'middle' });
      } else if (reEvt) {
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text('RE', dx + dayW/2, ry + rowH/2 + 1, { align: 'center', baseline: 'middle' });
      } else if (hol) {
        pdf.setFontSize(4);
        pdf.setFont('helvetica', 'normal');
        pdf.text(hol.name, dx + dayW/2, ry + rowH/2 + 1, { align: 'center', baseline: 'middle', maxWidth: dayW - 1 });
      }

      // Event blocks (max 3)
      const otherEvts = evts.filter(e => e.type !== 're' && e.type !== 'cp');
      for (let ei = 0; ei < Math.min(otherEvts.length, 3); ei++) {
        const evt = otherEvts[ei];
        const blockH = Math.min(rowH * 0.2, 3);
        const blockY = ry + rowH - 2 - ei * (blockH + 0.5);
        pdf.setFillColor(...hexToRGB(evt.color));
        pdf.roundedRect(dx + 0.5, blockY, dayW - 1, blockH, 0.3, 0.3, 'F');
        pdf.setFontSize(3.5);
        pdf.setTextColor(255, 255, 255);
        pdf.setFont('helvetica', 'bold');
        const evtName = (evt.name || '').substring(0, 12);
        pdf.text(evtName, dx + dayW/2, blockY + blockH/2, { align: 'center', baseline: 'middle' });
      }
    }
  }
}
