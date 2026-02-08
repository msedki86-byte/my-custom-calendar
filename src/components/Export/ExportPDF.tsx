import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ExportPDFProps {
  viewMode: 'year' | 'month' | 'week';
}

export function ExportPDF({ viewMode }: ExportPDFProps) {
  const handleExport = async () => {
    const content = document.querySelector('[data-calendar-print]');
    if (!content) return alert('Calendrier non visible');

    const legendSection = document.querySelector('[data-legend-print]');
    const arretSection = document.querySelector('[data-arret-print]');

    try {
      // Container width adapted to view
      const containerWidth = viewMode === 'year' ? 2800 : 2200;

      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.style.width = `${containerWidth}px`;
      container.style.background = 'white';
      container.style.padding = '16px';
      container.style.fontFamily = 'Arial, Helvetica, sans-serif';

      // Clone calendar
      const calClone = content.cloneNode(true) as HTMLElement;

      // Force print color accuracy
      calClone.style.setProperty('print-color-adjust', 'exact');
      calClone.style.setProperty('-webkit-print-color-adjust', 'exact');

      // Force all text to be readable
      calClone.querySelectorAll('*').forEach(el => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.setProperty('print-color-adjust', 'exact');
        htmlEl.style.setProperty('-webkit-print-color-adjust', 'exact');
        const computed = getComputedStyle(htmlEl);
        const fontSize = parseFloat(computed.fontSize);
        if (fontSize < 10) {
          htmlEl.style.fontSize = viewMode === 'year' ? '10px' : '12px';
        }
      });

      // For year view: force 4 cols x 3 rows grid
      if (viewMode === 'year') {
        calClone.style.display = 'grid';
        calClone.style.gridTemplateColumns = 'repeat(4, 1fr)';
        calClone.style.gap = '12px';
        calClone.className = calClone.className
          .replace(/grid-cols-\d/g, '')
          .replace(/sm:grid-cols-\d/g, '')
          .replace(/lg:grid-cols-\d/g, '');
      }

      // Legend clone - force expanded
      if (legendSection) {
        const legendClone = legendSection.cloneNode(true) as HTMLElement;
        legendClone.style.marginBottom = '12px';
        forceExpandClone(legendClone);
        container.appendChild(legendClone);
      }

      container.appendChild(calClone);

      // Arret bar clone
      if (arretSection) {
        const arretClone = arretSection.cloneNode(true) as HTMLElement;
        arretClone.style.marginTop = '12px';
        forceExpandClone(arretClone);
        container.appendChild(arretClone);
      }

      document.body.appendChild(container);

      // Wait for layout
      await new Promise(r => setTimeout(r, 300));

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: containerWidth,
        logging: false,
      });

      document.body.removeChild(container);

      // A4 landscape: 297 x 210 mm — FIT EVERYTHING ON ONE PAGE
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const pageWidth = 297;
      const pageHeight = 210;
      const margin = 4;
      const availableWidth = pageWidth - margin * 2;
      const availableHeight = pageHeight - margin * 2;

      const imgRatio = canvas.height / canvas.width;
      let imgWidth = availableWidth;
      let imgHeight = imgWidth * imgRatio;

      // Scale down to fit on single page if needed
      if (imgHeight > availableHeight) {
        imgHeight = availableHeight;
        imgWidth = imgHeight / imgRatio;
      }

      // Center on page
      const xOffset = margin + (availableWidth - imgWidth) / 2;
      const yOffset = margin + (availableHeight - imgHeight) / 2;

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

/** Force-expand all collapsed/hidden sections in a cloned DOM node */
function forceExpandClone(clone: HTMLElement) {
  clone.querySelectorAll('[data-state="closed"]').forEach(el => {
    (el as HTMLElement).setAttribute('data-state', 'open');
  });
  clone.querySelectorAll('*').forEach(el => {
    const htmlEl = el as HTMLElement;
    htmlEl.style.setProperty('print-color-adjust', 'exact');
    htmlEl.style.setProperty('-webkit-print-color-adjust', 'exact');
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
    const fontSize = parseFloat(getComputedStyle(htmlEl).fontSize);
    if (fontSize < 10) {
      htmlEl.style.fontSize = '10px';
    }
  });
}
