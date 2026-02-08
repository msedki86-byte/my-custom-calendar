import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ExportPDFProps {
  viewMode: 'year' | 'month' | 'week';
}

export async function exportPDF(viewMode: 'year' | 'month' | 'week') {
  const content = document.querySelector('[data-calendar-print]');
  if (!content) return alert('Calendrier non visible');

  const legendSection = document.querySelector('[data-legend-print]');
  const arretSection = document.querySelector('[data-arret-print]');

  try {
    // Use a wider container for year view (6 cols layout needs space)
    const containerWidth = viewMode === 'year' ? 3200 : 2200;

    const container = document.createElement('div');
    container.style.cssText = `position:absolute;left:-9999px;top:0;width:${containerWidth}px;background:white;padding:16px;font-family:Arial,Helvetica,sans-serif`;

    // Clone calendar
    const calClone = content.cloneNode(true) as HTMLElement;
    calClone.style.setProperty('print-color-adjust', 'exact');
    calClone.style.setProperty('-webkit-print-color-adjust', 'exact');

    // Boost small text
    calClone.querySelectorAll('*').forEach(el => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.setProperty('print-color-adjust', 'exact');
      htmlEl.style.setProperty('-webkit-print-color-adjust', 'exact');
      const fontSize = parseFloat(getComputedStyle(htmlEl).fontSize);
      if (fontSize < 10) {
        htmlEl.style.fontSize = viewMode === 'year' ? '11px' : '12px';
      }
    });

    // Year view: 2 rows × 6 months, scale up cells x1.8
    if (viewMode === 'year') {
      calClone.style.display = 'grid';
      calClone.style.gridTemplateColumns = 'repeat(6, 1fr)';
      calClone.style.gap = '16px';
      calClone.className = calClone.className
        .replace(/grid-cols-\d/g, '')
        .replace(/sm:grid-cols-\d/g, '')
        .replace(/lg:grid-cols-\d/g, '');

      // Scale up month cards
      calClone.querySelectorAll(':scope > *').forEach(child => {
        const el = child as HTMLElement;
        el.style.transform = 'scale(1)';
        el.style.minWidth = '0';
        // Increase inner font sizes for readability
        el.querySelectorAll('*').forEach(inner => {
          const innerEl = inner as HTMLElement;
          const fs = parseFloat(getComputedStyle(innerEl).fontSize);
          if (fs < 14) {
            innerEl.style.fontSize = `${Math.max(fs * 1.4, 11)}px`;
          }
        });
      });
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

    // Minimal wait for layout
    await new Promise(r => setTimeout(r, 100));

    const canvas = await html2canvas(container, {
      scale: 1.5,
      useCORS: true,
      backgroundColor: '#ffffff',
      width: containerWidth,
      logging: false,
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
    const yOffset = margin + (availableHeight - imgHeight) / 2;

    // JPEG is much faster than PNG
    const imgData = canvas.toDataURL('image/jpeg', 0.92);
    pdf.addImage(imgData, 'JPEG', xOffset, yOffset, imgWidth, imgHeight);

    const suffix = viewMode === 'year' ? 'annuel' : 'mensuel';
    pdf.save(`calendrier-${suffix}-${new Date().getFullYear()}.pdf`);
  } catch (err) {
    console.error('PDF export error:', err);
    alert("Erreur lors de l'export PDF. Veuillez réessayer.");
  }
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
