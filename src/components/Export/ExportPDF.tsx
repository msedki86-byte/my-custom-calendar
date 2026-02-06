import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import DOMPurify from 'dompurify';

export function ExportPDF() {
  const handleExport = () => {
    const content = document.querySelector('[data-calendar-print]');
    if (!content) return alert('Calendrier non visible');

    const win = window.open('', '_blank');
    if (!win) return alert('Pop-up bloquée');

    // Collect all stylesheets from the current page
    const styles: string[] = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          styles.push(rule.cssText);
        }
      } catch {
        // Cross-origin stylesheets - skip
      }
    }

    const sanitizedHTML = DOMPurify.sanitize(content.outerHTML, {
      WHOLE_DOCUMENT: false,
      ALLOWED_TAGS: ['div', 'span', 'table', 'tr', 'td', 'th', 'thead', 'tbody', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'svg', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'g', 'text', 'img', 'br', 'strong', 'em', 'b', 'i', 'small', 'section', 'header', 'footer', 'nav', 'main', 'article', 'aside', 'button'],
      ALLOWED_ATTR: ['class', 'style', 'data-*', 'aria-*', 'role', 'viewBox', 'd', 'fill', 'stroke', 'stroke-width', 'cx', 'cy', 'r', 'x', 'y', 'width', 'height', 'xmlns', 'src', 'alt', 'title', 'disabled'],
      FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input', 'textarea', 'link'],
      FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur'],
    });

    win.document.write(`
      <html>
        <head>
          <title>Calendrier - Export</title>
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:;">
          <style>
            @page { size: A4 landscape; margin: 8mm; }
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { 
              font-family: 'Inter', system-ui, sans-serif;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            /* Import all app styles for exact visual match */
            ${styles.join('\n')}
            /* Override for print */
            [data-calendar-print] {
              width: 100% !important;
              max-width: none !important;
            }
            @media print {
              body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            }
          </style>
        </head>
        <body>
          ${sanitizedHTML}
          <script>
            window.onload = () => { window.print(); window.close(); }
          <\/script>
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
