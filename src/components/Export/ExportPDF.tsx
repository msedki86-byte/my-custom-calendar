import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import DOMPurify from 'dompurify';
import { generateAnnualPrintHTML } from './AnnualPrintLayout';
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

// Annual PDF: clone DOM approach for pixel-perfect output
export function exportAnnualPDF(_data: AnnualExportData) {
  const calendar = document.querySelector('[data-calendar-print]') as HTMLElement | null;
  const legend = document.querySelector('[data-legend-print]') as HTMLElement | null;
  const arretBar = document.querySelector('[data-arret-print]') as HTMLElement | null;
  if (!calendar) { alert('Calendrier introuvable pour export PDF.'); return; }

  const printWindow = window.open('', '_blank');
  if (!printWindow) { alert('Popup bloquée. Autorisez les popups pour exporter.'); return; }

  // Collect all stylesheets from the current document
  const stylesheets = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
    .map(el => el.outerHTML).join('\n');

  // Calculate scale to fit A4 landscape (297mm ≈ 1123px at 96dpi, minus 10mm margins)
  const availableWidth = 1083; // 297mm - 10mm margins in px approx
  const calendarWidth = calendar.offsetWidth;
  const scale = Math.min(availableWidth / calendarWidth, 1);

  const doc = printWindow.document;
  doc.write(`<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"/><title>Calendrier Annuel ${_data.year}</title>
    ${stylesheets}
    <style>
      @page { size: A4 landscape; margin: 5mm; }
      *, *::before, *::after { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      body { position: relative; overflow: hidden; }
      body::before {
        content: '';
        position: fixed;
        inset: 0;
        background: url('/images/logo-calendar.png') center/60% no-repeat;
        opacity: 0.05;
        pointer-events: none;
        z-index: 0;
      }
      .print-container {
        transform: scale(${scale});
        transform-origin: top left;
        width: ${calendarWidth}px;
        position: relative;
        z-index: 1;
        padding: 2mm;
      }
      .print-container [style*="overflow"] { overflow: visible !important; }
      .print-container button { pointer-events: none; }
      /* Hide interactive elements */
      .print-container [data-toolbar], .print-container [role="toolbar"] { display: none !important; }
      .print-btn {
        position: fixed; top: 10px; right: 10px; z-index: 9999;
        padding: 8px 18px; background: #111; color: #fff; border: none; border-radius: 6px;
        font-size: 14px; cursor: pointer; display: flex; align-items: center; gap: 6px;
      }
      .print-btn:hover { background: #333; }
      @media print { .print-btn { display: none !important; } }
    </style>
  </head><body>
    <button class="print-btn" onclick="window.print()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
      Imprimer
    </button>
    <div class="print-container">
      ${legend ? legend.outerHTML : ''}
      ${calendar.outerHTML}
      ${arretBar ? arretBar.outerHTML : ''}
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
