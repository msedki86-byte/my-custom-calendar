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

    try {
      // Much wider containers for readability
      const containerWidth = viewMode === 'year' ? 2800 : 2200;

      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.style.width = `${containerWidth}px`;
      container.style.background = 'white';
      container.style.padding = '24px';
      container.style.fontFamily = 'Arial, Helvetica, sans-serif';

      // Clone calendar
      const calClone = content.cloneNode(true) as HTMLElement;

      // Force all text to be readable
      calClone.querySelectorAll('*').forEach(el => {
        const htmlEl = el as HTMLElement;
        // Bump up tiny text
        const computed = getComputedStyle(htmlEl);
        const fontSize = parseFloat(computed.fontSize);
        if (fontSize < 11) {
          htmlEl.style.fontSize = viewMode === 'year' ? '11px' : '13px';
        }
      });

      // For year view: force 4 cols x 3 rows grid
      if (viewMode === 'year') {
        calClone.style.display = 'grid';
        calClone.style.gridTemplateColumns = 'repeat(4, 1fr)';
        calClone.style.gap = '16px';
        calClone.className = calClone.className
          .replace(/grid-cols-\d/g, '')
          .replace(/sm:grid-cols-\d/g, '')
          .replace(/lg:grid-cols-\d/g, '');
      }

      // For month view: make cells taller
      if (viewMode === 'month') {
        calClone.querySelectorAll('button, [class*="min-h-"]').forEach(el => {
          const htmlEl = el as HTMLElement;
          htmlEl.style.minHeight = '90px';
        });
      }

      // Legend clone - force expanded, add before calendar
      if (legendSection) {
        const legendClone = legendSection.cloneNode(true) as HTMLElement;
        legendClone.style.marginBottom = '20px';
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
          // Bump legend text
          const fontSize = parseFloat(getComputedStyle(htmlEl).fontSize);
          if (fontSize < 12) {
            htmlEl.style.fontSize = '12px';
          }
        });
        container.appendChild(legendClone);
      }

      container.appendChild(calClone);
      document.body.appendChild(container);

      // Wait for layout
      await new Promise(r => setTimeout(r, 200));

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: containerWidth,
        logging: false,
      });

      document.body.removeChild(container);

      // A4 landscape: 297 x 210 mm
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const pageWidth = 297;
      const pageHeight = 210;
      const margin = 5;
      const availableWidth = pageWidth - margin * 2;
      const availableHeight = pageHeight - margin * 2;

      const imgRatio = canvas.height / canvas.width;
      let imgWidth = availableWidth;
      let imgHeight = imgWidth * imgRatio;

      // If too tall, check if we need multi-page
      if (imgHeight > availableHeight) {
        // Scale to fit width, then paginate
        const totalPDFHeight = imgHeight;
        const pages = Math.ceil(totalPDFHeight / availableHeight);
        
        for (let page = 0; page < pages; page++) {
          if (page > 0) pdf.addPage();
          
          const sourceY = (page * availableHeight / imgHeight) * canvas.height;
          const sourceHeight = Math.min(
            (availableHeight / imgHeight) * canvas.height,
            canvas.height - sourceY
          );
          
          // Create page canvas
          const pageCanvas = document.createElement('canvas');
          pageCanvas.width = canvas.width;
          pageCanvas.height = sourceHeight;
          const ctx = pageCanvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(canvas, 0, sourceY, canvas.width, sourceHeight, 0, 0, canvas.width, sourceHeight);
            const pageImgData = pageCanvas.toDataURL('image/png');
            const pageImgHeight = (sourceHeight / canvas.height) * imgHeight;
            pdf.addImage(pageImgData, 'PNG', margin, margin, imgWidth, pageImgHeight);
          }
        }
      } else {
        const xOffset = margin + (availableWidth - imgWidth) / 2;
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', xOffset, margin, imgWidth, imgHeight);
      }
      
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
