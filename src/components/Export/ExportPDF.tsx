import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
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

/** Convert logo to base64 data URL for embedding in offline HTML */
async function getLogoBase64(): Promise<string> {
  try {
    const response = await fetch('/images/logo-calendar.png');
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve('');
      reader.readAsDataURL(blob);
    });
  } catch {
    return '';
  }
}

/** Open HTML in a new window for native print-to-PDF (fast, no canvas) */
async function openPrintWindow(rawHTML: string) {
  const logoBase64 = await getLogoBase64();
  let html = rawHTML;
  if (logoBase64) {
    html = html.replace(/src="\/images\/logo-calendar\.png"/g, `src="${logoBase64}"`);
  }

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Veuillez autoriser les popups pour exporter le PDF.');
    return;
  }
  printWindow.document.write(html);
  printWindow.document.close();
}

// Annual PDF
export function exportAnnualPDF(data: AnnualExportData) {
  openPrintWindow(generateAnnualPrintHTML(data));
}

// Monthly PDF
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
