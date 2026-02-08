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
      // Create a temporary container
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.style.width = '1400px';
      container.style.background = 'white';
      container.style.padding = '16px';
      
      const calClone = content.cloneNode(true) as HTMLElement;
      container.appendChild(calClone);
      
      // Always include legend, force it expanded
      if (legendSection) {
        const legendClone = legendSection.cloneNode(true) as HTMLElement;
        legendClone.style.marginTop = '16px';
        // Force expand any collapsed sections
        const collapsedSections = legendClone.querySelectorAll('[class*="max-h-0"]');
        collapsedSections.forEach(el => {
          (el as HTMLElement).style.maxHeight = '1000px';
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.overflow = 'visible';
        });
        container.appendChild(legendClone);
      }
      
      document.body.appendChild(container);

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 1400,
      });

      document.body.removeChild(container);

      // A4 landscape
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const pageWidth = 297;
      const pageHeight = 210;
      const margin = 5;
      const availableWidth = pageWidth - margin * 2;
      const availableHeight = pageHeight - margin * 2;

      const imgRatio = canvas.height / canvas.width;
      let imgWidth = availableWidth;
      let imgHeight = imgWidth * imgRatio;

      if (imgHeight > availableHeight) {
        imgHeight = availableHeight;
        imgWidth = imgHeight / imgRatio;
      }

      // Center on page
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