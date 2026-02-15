/**
 * Compteurs permanents 21 (Congés annuels) et RE (Repos Équivalent)
 * Visibles en haut de l'application, mobile inclus.
 * Affichage daté automatiquement.
 */

import { PointageSettings } from '@/types/pointage';
import { CalendarDays, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface SoldesCountersProps {
  pointageSettings: PointageSettings;
}

export function SoldesCounters({ pointageSettings }: SoldesCountersProps) {
  const solde21h = pointageSettings.soldeCongesAnnuels ?? 173;
  const solde21j = (solde21h / 8).toFixed(1);
  const soldeREh = pointageSettings.soldeRE ?? 312;
  const soldeREj = (soldeREh / 8).toFixed(1);

  const dateLabel = format(new Date(), "d MMMM yyyy", { locale: fr });

  return (
    <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-xs">
      {/* 21 (Congés annuels) */}
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-card shadow-sm">
        <CalendarDays className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
        <div className="min-w-0">
          <span className="text-[10px] text-muted-foreground block leading-tight" translate="no">21 (Congés)</span>
          <span className="font-mono font-semibold text-foreground">
            {solde21h.toFixed(0)}h
            <span className="text-muted-foreground font-normal"> ({solde21j}j)</span>
          </span>
          <span className="text-[9px] text-muted-foreground block leading-tight">au {dateLabel}</span>
        </div>
      </div>

      {/* RE (Repos Équivalent) */}
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-card shadow-sm">
        <Clock className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
        <div className="min-w-0">
          <span className="text-[10px] text-muted-foreground block leading-tight">RE</span>
          <span className="font-mono font-semibold text-foreground">
            {soldeREh.toFixed(0)}h
            <span className="text-muted-foreground font-normal"> ({soldeREj}j)</span>
          </span>
          <span className="text-[9px] text-muted-foreground block leading-tight">au {dateLabel}</span>
        </div>
      </div>
    </div>
  );
}
