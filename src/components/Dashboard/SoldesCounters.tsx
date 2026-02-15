/**
 * Compteurs permanents RH — W Planner
 * Visibles en haut de l'application, mobile inclus.
 * RC total avec ventilation RC-HS / RC-Autres / RCO.
 */

import { RHState } from '@/stores/rhStore';
import { CalendarDays, Clock, Hash } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

interface SoldesCountersProps {
  rhState: RHState;
}

function formatDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), "d MMMM yyyy", { locale: fr });
  } catch {
    return dateStr;
  }
}

function CounterCard({ icon, label, soldeH, dateStr, colorClass, children }: {
  icon: React.ReactNode;
  label: string;
  soldeH: number;
  dateStr: string;
  colorClass?: string;
  children?: React.ReactNode;
}) {
  const soldeJ = (soldeH / 8).toFixed(1);
  return (
    <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg border border-border bg-card shadow-sm min-w-0">
      <div className={`flex-shrink-0 ${colorClass || ''}`}>{icon}</div>
      <div className="min-w-0">
        <span className="text-[10px] text-muted-foreground block leading-tight" translate="no">{label}</span>
        <span className="font-mono font-semibold text-foreground text-xs">
          {soldeH.toFixed(0)}h
          <span className="text-muted-foreground font-normal"> ({soldeJ}j)</span>
        </span>
        <span className="text-[9px] text-muted-foreground block leading-tight">au {formatDate(dateStr)}</span>
        {children}
      </div>
    </div>
  );
}

export function SoldesCounters({ rhState }: SoldesCountersProps) {
  const rcTotal = rhState.soldeRC011 + rhState.soldeRC012;
  const latestRCDate = rhState.dateSoldeRC011 > rhState.dateSoldeRC012 ? rhState.dateSoldeRC011 : rhState.dateSoldeRC012;

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap text-xs">
      <CounterCard
        icon={<CalendarDays className="w-3.5 h-3.5" />}
        label="21 (Congés)"
        soldeH={rhState.solde21}
        dateStr={rhState.dateSolde21}
        colorClass="text-muted-foreground"
      />
      <CounterCard
        icon={<Clock className="w-3.5 h-3.5" />}
        label="RE"
        soldeH={rhState.soldeRE}
        dateStr={rhState.dateSoldeRE}
        colorClass="text-muted-foreground"
      />
      <CounterCard
        icon={<Hash className="w-3.5 h-3.5" />}
        label="RC"
        soldeH={rcTotal}
        dateStr={latestRCDate}
        colorClass="text-muted-foreground"
      >
        <div className="flex gap-1.5 text-[8px] text-muted-foreground leading-tight">
          <span>HS:{rhState.soldeRC011.toFixed(0)}h</span>
          <span>Autres:{rhState.soldeRC012.toFixed(0)}h</span>
        </div>
      </CounterCard>
    </div>
  );
}
