import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';

export function ExportPDF() {
  const handleExport = () => {
    const content = document.querySelector('[data-calendar-print]');
    if (!content) return alert('Calendrier non visible');

    const win = window.open('', '_blank');
    if (!win) return alert('Pop-up bloquée');

    win.document.write(`
      <html>
        <head>
          <title>Calendrier</title>
          <style>
            @page { size: A3 landscape; margin: 10mm; }
            body { font-family: system-ui; }
          </style>
          <link rel="stylesheet" href="${window.location.origin}/src/index.css" />
        </head>
        <body>
          ${content.outerHTML}
          <script>
            window.onload = () => { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    win.document.close();
  };

  return (
    <Button variant="outline" size="sm" onClick={handleExport}>
      <FileDown className="h-4 w-4 mr-1" />
      PDF
    </Button>
  );
}
