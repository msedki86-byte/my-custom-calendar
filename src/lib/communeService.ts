/**
 * Service commune trajet – CNPE Bugey
 * Lookup + valorisation temps trajet selon jour/nuit et semaine/dimanche.
 */

import { COMMUNES_BUGEY, CommuneTrajet } from '@/data/communes_bugey_dataset';

// Cache for fast lookup
const communeMap = new Map<string, CommuneTrajet>();
for (const c of COMMUNES_BUGEY) {
  communeMap.set(c.localite, c);
}

export function getCommuneByName(name: string): CommuneTrajet | undefined {
  return communeMap.get(name);
}

export function getAllCommuneNames(): string[] {
  return COMMUNES_BUGEY.map(c => c.localite);
}

/**
 * Determine which valorisation field to use based on day-of-week and time.
 * Night = any hour between 21:00 and 06:00.
 * Sunday = day index 0.
 */
export type ValorisationType = 'jour_semaine' | 'nuit_semaine' | 'jour_dimanche' | 'nuit_dimanche';

export function getValorisationType(dateStr: string, startTime: string): ValorisationType {
  const dow = new Date(dateStr + 'T00:00:00').getDay(); // 0=Sunday
  const isSunday = dow === 0;
  
  const [h] = startTime.split(':').map(Number);
  const isNight = h >= 21 || h < 6;
  
  if (isSunday && isNight) return 'nuit_dimanche';
  if (isSunday) return 'jour_dimanche';
  if (isNight) return 'nuit_semaine';
  return 'jour_semaine';
}

const FIELD_MAP: Record<ValorisationType, keyof CommuneTrajet> = {
  jour_semaine: 'valorise_jour_semaine_150',
  nuit_semaine: 'valorise_nuit_semaine_200',
  jour_dimanche: 'valorise_jour_dimanche_175',
  nuit_dimanche: 'valorise_nuit_dimanche_225',
};

const LABEL_MAP: Record<ValorisationType, string> = {
  jour_semaine: 'Jour semaine (×1.50)',
  nuit_semaine: 'Nuit semaine (×2.00)',
  jour_dimanche: 'Jour dimanche (×1.75)',
  nuit_dimanche: 'Nuit dimanche (×2.25)',
};

export interface TrajetResult {
  commune: CommuneTrajet;
  valorisationType: ValorisationType;
  valorisationLabel: string;
  valorisationHeures: number;
  isZoneImmediate: boolean;
}

/**
 * Compute travel valorisation for a given day entry.
 * Returns null if commune not found or astreinte sans intervention.
 */
export function computeTrajetValorisation(
  communeName: string,
  dateStr: string,
  startTime: string
): TrajetResult | null {
  const commune = getCommuneByName(communeName);
  if (!commune) return null;

  const isZoneImmediate = commune.trajetPlafonne_km !== null && commune.trajetPlafonne_km < 0;
  const type = getValorisationType(dateStr, startTime);
  const heures = (commune[FIELD_MAP[type]] as number | null) ?? 0;

  return {
    commune,
    valorisationType: type,
    valorisationLabel: LABEL_MAP[type],
    valorisationHeures: heures,
    isZoneImmediate,
  };
}
