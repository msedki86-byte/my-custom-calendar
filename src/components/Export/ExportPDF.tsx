import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import DOMPurify from 'dompurify';
import { generateMonthlyPrintHTML } from './MonthlyPrintLayout';
import { CalendarSettings, CalendarEvent, Astreinte, Vacation, Arret, Holiday, CancelledAstreinteDate } from '@/types/calendar';

export interface AnnualExportData {
  year: number;
  settings: CalendarSettings;
  events: CalendarEvent[];
  astreintes: Astreinte[];
  vacations: Vacation[];
  arrets: Arret[];
  holidays: Holiday[];
  cancelledDates: CancelledAstreinteDate[];
}

export interface MonthlyExportData {
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

function openPrintWindow(rawHTML: string) {
  const cleanHTML = DOMPurify.sanitize(rawHTML, { WHOLE_DOCUMENT: true, ADD_TAGS: ['style', 'meta'], ADD_ATTR: ['onload', 'onclick'] });
  const printWindow = window.open('', '_blank');
  if (!printWindow) { alert('Popup bloquée. Autorisez les popups pour exporter.'); return; }
  printWindow.document.write(cleanHTML);
  printWindow.document.close();
}

const PRINT_BTN_HTML = `
<button class="print-btn" onclick="window.print()">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
  Imprimer
</button>`;

const PRINT_BTN_CSS = `
.print-btn {
  position: fixed; top: 12px; right: 12px; z-index: 9999;
  padding: 10px 22px; background: #111; color: #fff; border: none; border-radius: 8px;
  font-size: 14px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  transition: background 0.2s;
}
.print-btn:hover { background: #333; }
@media print { .print-btn { display: none !important; } }`;

// Annual PDF: DOM cloning for pixel-perfect A4 landscape output
export function exportAnnualPDF(_data: AnnualExportData) {
  const calendar = document.querySelector('[data-calendar-print]') as HTMLElement | null;
  const legend = document.querySelector('[data-legend-print]') as HTMLElement | null;
  const arretBar = document.querySelector('[data-arret-print]') as HTMLElement | null;
  if (!calendar) { alert('Calendrier introuvable pour export PDF.'); return; }

  const printWindow = window.open('', '_blank');
  if (!printWindow) { alert('Popup bloquée. Autorisez les popups pour exporter.'); return; }

  // Collect all stylesheets
  const stylesheets = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
    .map(el => el.outerHTML).join('\n');

  // Measure DOM to calculate exact scale
  const calendarWidth = calendar.offsetWidth;
  const calendarHeight = calendar.offsetHeight;
  const legendHeight = legend ? legend.offsetHeight : 0;
  const arretHeight = arretBar ? arretBar.offsetHeight : 0;
  const totalContentHeight = legendHeight + calendarHeight + arretHeight + 50; // 50px for title + gaps

  // A4 landscape in px at 96dpi: 1123 x 794, minus margins (5mm = ~19px each side)
  const pageW = 1085;
  const pageH = 756;
  const scaleX = pageW / calendarWidth;
  const scaleY = pageH / totalContentHeight;
  const scale = Math.min(scaleX, scaleY, 1);

  const doc = printWindow.document;
  doc.write(`<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"/>
<title>Calendrier Annuel ${_data.year}</title>
${stylesheets}
<style>
  @page { size: A4 landscape; margin: 5mm; }
  *, *::before, *::after { box-sizing: border-box; }
  html, body {
    margin: 0; padding: 0;
    background: #ffffff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    overflow: hidden;
    width: 297mm; height: 210mm;
  }

  /* Premium watermark */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background: url('/images/logo-calendar.png') center/50% no-repeat;
    opacity: 0.04;
    pointer-events: none;
    z-index: 0;
  }

  /* Subtle radial glow */
  body::after {
    content: '';
    position: fixed;
    inset: 0;
    background: radial-gradient(ellipse at center, rgba(0,58,143,0.015) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .print-page {
    position: relative;
    z-index: 1;
    width: 287mm;
    height: 200mm;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2mm 3mm;
  }

  .print-title {
    font-size: 14pt;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: #111;
    text-align: center;
    margin-bottom: 2mm;
  }

  .print-content {
    transform: scale(${scale});
    transform-origin: top center;
    width: ${calendarWidth}px;
    position: relative;
    z-index: 1;
  }

  /* Override overflow for print */
  .print-content [style*="overflow"] { overflow: visible !important; }
  .print-content button,
  .print-content [data-toolbar],
  .print-content [role="toolbar"] { display: none !important; }

  /* Premium month blocks: subtle shadow + rounded */
  .print-content [class*="month"] {
    border-radius: 3px;
  }

  ${PRINT_BTN_CSS}
</style>
</head><body>
  ${PRINT_BTN_HTML}
  <div class="print-page">
    <div class="print-title">Calendrier ${_data.year}</div>
    <div class="print-content">
      ${legend ? legend.outerHTML : ''}
      ${calendar.outerHTML}
      ${arretBar ? arretBar.outerHTML : ''}
    </div>
  </div>
</body></html>`);
  doc.close();
}

// Monthly PDF: dedicated layout
export function exportMonthlyPDF(data: MonthlyExportData) {
  openPrintWindow(generateMonthlyPrintHTML(data));
}

// Week PDF: clone screen (fallback)
export function exportPDF(viewMode: 'year' | 'month' | 'week') {
  const calendar = document.querySelector('[data-calendar-print]');
  const legend = document.querySelector('[data-legend-print]');
  const arretBar = document.querySelector('[data-arret-print]');
  if (!calendar) { alert('Calendrier introuvable pour export PDF.'); return; }

  const title = `Calendrier`;
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.write(`<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"/><title>${title}</title>
    <style>
      @page { size: A4 landscape; margin: 8mm; }
      body { font-family: system-ui, sans-serif; background: white; color: #111; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      h1 { text-align: center; margin-bottom: 8px; font-size: 16px; }
      .print-wrapper { display: flex; flex-direction: column; gap: 8px; }
      * { box-sizing: border-box; }
      [style*="overflow"] { overflow: visible !important; }
    </style></head><body>
    <h1>${title}</h1>
    <div class="print-wrapper">
      ${legend ? legend.outerHTML : ''}
      ${calendar.outerHTML}
      ${arretBar ? arretBar.outerHTML : ''}
    </div>
    <script>window.onload=()=>{setTimeout(()=>{window.print();window.close();},300);};<\/script>
    </body></html>`);
  printWindow.document.close();
}

// Component version (kept for compatibility)
interface ExportPDFProps {
  viewMode: 'year' | 'month';
  year: number;
  month?: number;
}

export function ExportPDF({ viewMode }: ExportPDFProps) {
  return (
    <Button variant="outline" size="sm" onClick={() => exportPDF(viewMode)}>
      <FileDown className="h-4 w-4 mr-2" />
      Exporter PDF
    </Button>
  );
}
