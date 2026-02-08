import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';

interface ExportPDFProps {
  viewMode: 'year' | 'month';
  year: number;
  month?: number;
}

export function ExportPDF({ viewMode, year, month }: ExportPDFProps) {
  const handleExport = () => {
    const calendar = document.querySelector('[data-calendar-print]');
    const legend = document.querySelector('[data-calendar-legend]');

    if (!calendar) {
      alert('Calendrier introuvable pour export PDF.');
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const title =
      viewMode === 'year'
        ? `Calendrier ${year}`
        : `Calendrier ${new Date(year, month ?? 0).toLocaleDateString('fr-FR', {
            month: 'long',
            year: 'numeric',
          })}`;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="fr">
        <head>
          <meta charset="utf-8" />
          <title>${title}</title>
          <style>
            @page {
              size: A4 landscape;
              margin: 10mm;
            }

            body {
              font-family: system-ui, -apple-system, sans-serif;
              background: white;
              color: #111;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }

            h1 {
              text-align: center;
              margin-bottom: 12px;
              font-size: 18px;
            }

            .print-wrapper {
              display: flex;
              flex-direction: column;
              gap: 12px;
            }

            .calendar-wrapper {
              transform: scale(0.9);
              transform-origin: top left;
            }

            .legend-wrapper {
              font-size: 11px;
            }

            * {
              box-sizing: border-box;
            }

            /* Désactiver scroll / overflow écran */
            [style*="overflow"] {
              overflow: visible !important;
            }
          </style>
        </head>
        <body>
          <h1>${title}</h1>

          <div class="print-wrapper">
            <div class="calendar-wrapper">
              ${calendar.outerHTML}
            </div>

            ${
              legend
                ? `<div class="legend-wrapper">${legend.outerHTML}</div>`
                : ''
            }
          </div>

          <script>
            window.onload = () => {
              setTimeout(() => {
                window.print();
                window.close();
              }, 300);
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  return (
    <Button variant="outline" size="sm" onClick={handleExport}>
      <FileDown className="h-4 w-4 mr-2" />
      Exporter PDF
    </Button>
  );
}
