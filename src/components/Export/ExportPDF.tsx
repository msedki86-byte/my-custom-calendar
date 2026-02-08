import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ExportPDFProps {
  viewMode: 'year' | 'month';
}

export function ExportPDF({ viewMode }: ExportPDFProps) {
  const handleExport = async () => {
    const content = document.querySelector('[data-calendar-print]');
    if (!content) return alert('Calendrier non visible');

    const legendSection = document.querySelector('[data-legend-print]');

    try {
      // Create a temporary container at full width
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.style.width = viewMode === 'year' ? '1800px' : '1600px';
      container.style.background = 'white';
      container.style.padding = '16px';

      // Clone calendar
      const calClone = content.cloneNode(true) as HTMLElement;

      // For year view: force 3 cols x 4 rows grid
      if (viewMode === 'year') {
        // The year view root is a grid div
        calClone.style.display = 'grid';
        calClone.style.gridTemplateColumns = 'repeat(4, 1fr)';
        calClone.style.gap = '12px';
        // Remove any grid class overrides
        calClone.className = calClone.className
          .replace(/grid-cols-\d/g, '')
          .replace(/sm:grid-cols-\d/g, '')
          .replace(/lg:grid-cols-\d/g, '');
      }

      // Legend clone - force expanded
      if (legendSection) {
        const legendClone = legendSection.cloneNode(true) as HTMLElement;
        legendClone.style.marginBottom = '16px';
        // Force expand all collapsed sections
        legendClone.querySelectorAll('[data-state="closed"]').forEach(el => {
          (el as HTMLElement).setAttribute('data-state', 'open');
        });
        legendClone.querySelectorAll('*').forEach(el => {
          const htmlEl = el as HTMLElement;
          const style = getComputedStyle(htmlEl);
          if (style.maxHeight === '0px' || style.display === 'none' || style.height === '0px') {
            htmlEl.style.maxHeight = '2000px';
            htmlEl.style.height = 'auto';
            htmlEl.style.display = 'block';
            htmlEl.style.opacity = '1';
            htmlEl.style.overflow = 'visible';
          }
          if (htmlEl.classList.contains('hidden')) {
            htmlEl.classList.remove('hidden');
            htmlEl.style.display = 'block';
          }
        });
        container.appendChild(legendClone);
      }

      container.appendChild(calClone);
      document.body.appendChild(container);

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: viewMode === 'year' ? 1800 : 1600,
      });

      document.body.removeChild(container);

      // A4 landscape
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const pageWidth = 297;
      const pageHeight = 210;
      const margin = 4;
      const availableWidth = pageWidth - margin * 2;
      const availableHeight = pageHeight - margin * 2;

      const imgRatio = canvas.height / canvas.width;
      let imgWidth = availableWidth;
      let imgHeight = imgWidth * imgRatio;

      if (imgHeight > availableHeight) {
        imgHeight = availableHeight;
        imgWidth = imgHeight / imgRatio;
      }

      const xOffset = margin + (availableWidth - imgWidth) / 2;
      const yOffset = margin;

      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);
      
      const suffix = viewMode === 'year' ? 'annuel' : 'mensuel';
      pdf.save(`calendrier-${suffix}-${new Date().getFullYear()}.pdf`);
    } catch (err) {
      console.error('PDF export error:', err);
      alert("Erreur lors de l'export PDF. Veuillez réessayer.");
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleExport} className="gap-1 h-8 text-xs sm:text-sm px-2 sm:px-3">
      <FileDown className="h-3 w-3 sm:h-4 sm:w-4" />
      PDF
    </Button>
  );
}
