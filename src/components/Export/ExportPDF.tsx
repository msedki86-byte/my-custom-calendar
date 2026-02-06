import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import DOMPurify from 'dompurify';

export function ExportPDF() {
  const handleExport = () => {
    const content = document.querySelector('[data-calendar-print]');
    if (!content) return alert('Calendrier non visible');

    const win = window.open('', '_blank');
    if (!win) return alert('Pop-up bloquée');

    const sanitizedHTML = DOMPurify.sanitize(content.outerHTML, {
      WHOLE_DOCUMENT: false,
      ALLOWED_TAGS: ['div', 'span', 'table', 'tr', 'td', 'th', 'thead', 'tbody', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'svg', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'g', 'text', 'img', 'br', 'strong', 'em', 'b', 'i', 'small', 'section', 'header', 'footer', 'nav', 'main', 'article', 'aside'],
      ALLOWED_ATTR: ['class', 'style', 'data-*', 'aria-*', 'role', 'viewBox', 'd', 'fill', 'stroke', 'stroke-width', 'cx', 'cy', 'r', 'x', 'y', 'width', 'height', 'xmlns', 'src', 'alt'],
      FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input', 'textarea', 'button', 'link'],
      FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur'],
    });

    win.document.write(`
      <html>
        <head>
          <title>Calendrier</title>
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:;">
          <style>
            @page { size: A3 landscape; margin: 10mm; }
            body { font-family: system-ui; }
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
