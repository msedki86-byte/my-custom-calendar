import { useRef } from 'react';

export function useSwipeNavigation(onLeft: () => void, onRight: () => void) {
  const startX = useRef<number | null>(null);

  return {
    onTouchStart: (e: React.TouchEvent) => {
      startX.current = e.touches[0].clientX;
    },
    onTouchEnd: (e: React.TouchEvent) => {
      if (startX.current === null) return;
      const dx = e.changedTouches[0].clientX - startX.current;
      if (Math.abs(dx) > 50) {
        dx < 0 ? onLeft() : onRight();
      }
      startX.current = null;
    },
  };
}
