import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function ExportPDF() {
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
      container.style.width = '1600px';
      container.style.background = 'white';
      container.style.padding = '12px';

      // Legend first (above calendar)
      if (legendSection) {
        const legendClone = legendSection.cloneNode(true) as HTMLElement;
        legendClone.style.marginBottom = '12px';
        // Force expand any collapsed sections
        const collapsedContent = legendClone.querySelectorAll('[data-state="closed"]');
        collapsedContent.forEach(el => {
          (el as HTMLElement).setAttribute('data-state', 'open');
        });
        const hiddenSections = legendClone.querySelectorAll('[class*="max-h-0"], [class*="hidden"]');
        hiddenSections.forEach(el => {
          (el as HTMLElement).style.maxHeight = '2000px';
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.overflow = 'visible';
          (el as HTMLElement).style.display = 'block';
          (el as HTMLElement).classList.remove('hidden');
        });
        // Also force overflow visible on all children
        legendClone.querySelectorAll('*').forEach(el => {
          const style = getComputedStyle(el as Element);
          if (style.maxHeight === '0px' || style.display === 'none') {
            (el as HTMLElement).style.maxHeight = '2000px';
            (el as HTMLElement).style.display = 'block';
            (el as HTMLElement).style.opacity = '1';
          }
        });
        container.appendChild(legendClone);
      }

      const calClone = content.cloneNode(true) as HTMLElement;
      container.appendChild(calClone);

      document.body.appendChild(container);

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 1600,
      });

      document.body.removeChild(container);

      // A4 landscape - fill entire page
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const pageWidth = 297;
      const pageHeight = 210;
      const margin = 3;
      const availableWidth = pageWidth - margin * 2;
      const availableHeight = pageHeight - margin * 2;

      const imgRatio = canvas.height / canvas.width;
      let imgWidth = availableWidth;
      let imgHeight = imgWidth * imgRatio;

      // If too tall, scale to fit height and stretch width to fill
      if (imgHeight > availableHeight) {
        imgHeight = availableHeight;
        imgWidth = imgHeight / imgRatio;
      }

      // Center horizontally
      const xOffset = margin + (availableWidth - imgWidth) / 2;
      const yOffset = margin;

      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);
      pdf.save(`calendrier-${new Date().getFullYear()}.pdf`);
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
