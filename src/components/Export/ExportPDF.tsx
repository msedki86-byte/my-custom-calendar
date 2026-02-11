import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import { generateMonthlyPrintHTML } from './MonthlyPrintLayout';
import { generateAnnualPrintHTML } from './AnnualPrintLayout';
import { CalendarSettings, CalendarEvent, Astreinte, Vacation, Arret, Holiday, CancelledAstreinteDate } from '@/types/calendar';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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

/** Render HTML string in a hidden container, capture with html2canvas, export as PDF */
async function generateAndDownloadPDF(rawHTML: string, filename: string, orientation: 'landscape' | 'portrait') {
  // Replace logo src with base64
  const logoBase64 = await getLogoBase64();
  let html = rawHTML;
  if (logoBase64) {
    html = html.replace(/src="\/images\/logo-calendar\.png"/g, `src="${logoBase64}"`);
  }

  // Remove print buttons from the HTML
  html = html.replace(/<button[^>]*onclick="window\.print\(\)"[^>]*>[\s\S]*?<\/button>/gi, '');
  html = html.replace(/<div class="print-btn-bar"[\s\S]*?<\/div>\s*<\/div>/gi, '');

  // Create hidden iframe
  const iframe = document.createElement('iframe');
  iframe.style.cssText = 'position:fixed;top:-10000px;left:-10000px;width:1122px;height:793px;border:none;visibility:hidden;';
  if (orientation === 'portrait') {
    iframe.style.width = '793px';
    iframe.style.height = '1122px';
  }
  document.body.appendChild(iframe);

  try {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) throw new Error('Cannot access iframe document');

    iframeDoc.open();
    iframeDoc.write(html);
    iframeDoc.close();

    // Wait for images and rendering
    await new Promise(resolve => setTimeout(resolve, 800));

    // Wait for all images to load
    const images = iframeDoc.querySelectorAll('img');
    await Promise.all(Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    }));

    await new Promise(resolve => setTimeout(resolve, 200));

    const body = iframeDoc.body;
    const canvas = await html2canvas(body, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: parseInt(iframe.style.width),
      height: parseInt(iframe.style.height),
      windowWidth: parseInt(iframe.style.width),
      windowHeight: parseInt(iframe.style.height),
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = orientation === 'landscape' ? 297 : 210;
    const pdfHeight = orientation === 'landscape' ? 210 : 297;

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
  } finally {
    document.body.removeChild(iframe);
  }
}

// Annual PDF
export function exportAnnualPDF(data: AnnualExportData) {
  generateAndDownloadPDF(
    generateAnnualPrintHTML(data),
    `Calendrier_${data.year}.pdf`,
    'landscape'
  );
}

// Monthly PDF
export function exportMonthlyPDF(data: MonthlyExportData) {
  const monthNames = ['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'];
  generateAndDownloadPDF(
    generateMonthlyPrintHTML(data),
    `${monthNames[data.month]}_${data.year}.pdf`,
    'portrait'
  );
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
