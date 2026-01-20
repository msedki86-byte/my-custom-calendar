import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';

interface ExportPDFProps {
  viewMode: 'year' | 'month';
  year: number;
  month?: number;
}

export function ExportPDF({ viewMode, year, month }: ExportPDFProps) {
  const handleExport = () => {
    // Use browser print functionality with specific styling
    const printContent = document.querySelector('[data-calendar-print]');
    if (!printContent) {
      alert('Veuillez vous assurer que le calendrier est visible.');
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Veuillez autoriser les pop-ups pour exporter en PDF.');
      return;
    }

    const title = viewMode === 'year' 
      ? `Calendrier ${year}` 
      : `Calendrier ${new Date(year, month || 0).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { 
              font-family: system-ui, -apple-system, sans-serif; 
              padding: 20px;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            h1 { 
              text-align: center; 
              margin-bottom: 20px; 
              font-size: 24px;
            }
            .calendar-content {
              width: 100%;
            }
            /* Preserve all background colors */
            [style*="background"] {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            @media print {
              body { padding: 10px; }
              @page { 
                size: ${viewMode === 'year' ? 'A3 landscape' : 'A4 portrait'}; 
                margin: 10mm;
              }
            }
          </style>
          <link rel="stylesheet" href="${window.location.origin}/src/index.css" />
        </head>
        <body>
          <h1>${title}</h1>
          <div class="calendar-content">
            ${printContent.outerHTML}
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.close();
              }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
      <FileDown className="h-4 w-4" />
      Exporter PDF
    </Button>
  );
}
