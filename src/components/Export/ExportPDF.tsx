import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import DOMPurify from 'dompurify';
import { generateMonthlyPrintHTML } from './MonthlyPrintLayout';
import { generateAnnualPrintHTML } from './AnnualPrintLayout';
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

function downloadPDF(rawHTML: string, filename: string) {
  const cleanHTML = DOMPurify.sanitize(rawHTML, { WHOLE_DOCUMENT: true, ADD_TAGS: ['style', 'meta'], ADD_ATTR: ['onload', 'onclick'] });
  const blob = new Blob([cleanHTML], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
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

// Annual PDF: uses generateAnnualPrintHTML for mm-based A4 landscape layout
export function exportAnnualPDF(data: AnnualExportData) {
  downloadPDF(generateAnnualPrintHTML(data), `Calendrier_${data.year}.html`);
}

// Monthly PDF: dedicated layout
export function exportMonthlyPDF(data: MonthlyExportData) {
  const monthNames = ['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'];
  downloadPDF(generateMonthlyPrintHTML(data), `${monthNames[data.month]}_${data.year}.html`);
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
