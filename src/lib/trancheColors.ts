import { CalendarSettings, Arret } from '@/types/calendar';

/**
 * Get the color for an arret based on its type and tranche from settings
 */
export function getArretColor(arret: Arret, settings: CalendarSettings): string {
  const tranche = arret.tranche?.toLowerCase() || '';
  
  if (arret.type === 'prepa') {
    switch (tranche) {
      case 'tr2':
        return settings.prepaTr2Color;
      case 'tr3':
        return settings.prepaTr3Color;
      case 'tr4':
        return settings.prepaTr4Color;
      case 'tr5':
        return settings.prepaTr5Color;
      default:
        return settings.prepaTr2Color; // Default to Tr2
    }
  } else {
    switch (tranche) {
      case 'tr2':
        return settings.arretTr2Color;
      case 'tr3':
        return settings.arretTr3Color;
      case 'tr4':
        return settings.arretTr4Color;
      case 'tr5':
        return settings.arretTr5Color;
      default:
        return settings.arretTr2Color; // Default to Tr2
    }
  }
}
