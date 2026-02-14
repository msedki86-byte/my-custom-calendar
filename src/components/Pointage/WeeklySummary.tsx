/**
 * Module 2 – Weekly Summary (CNPE Bugey)
 * Badge hebdo, carte heures restantes, alertes, HS, conformité.
 */

import { WeekSummary, AlertLevel, PointageSettings } from '@/types/pointage';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle, Clock, TrendingDown } from 'lucide-react';

interface WeeklySummaryProps {
  summary: WeekSummary;
  pointageSettings?: PointageSettings;
}

const statusBg: Record<AlertLevel, string> = {
  vert: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  orange: 'bg-amber-100 text-amber-800 border-amber-300',
  rouge: 'bg-red-100 text-red-800 border-red-300',
};

const statusLabels: Record<AlertLevel, string> = {
  vert: 'Conforme',
  orange: 'Vigilance',
  rouge: 'Non conforme',
};

function StatusIcon({ ok }: { ok: boolean }) {
  return ok
    ? <CheckCircle className="w-4 h-4 text-emerald-600" />
    : <XCircle className="w-4 h-4 text-red-600" />;
}

function getHeuresRestantesColor(heuresRestantes: number, plafond: number): string {
  const ratio = heuresRestantes / plafond;
  if (ratio <= 0.15) return 'text-red-600';
  if (ratio <= 0.3) return 'text-amber-600';
  return 'text-emerald-600';
}

export function WeeklySummaryTable({ summary, pointageSettings }: WeeklySummaryProps) {
  const hrColor = getHeuresRestantesColor(summary.heuresRestantes, summary.plafondAutorise);

  return (
    <div className="space-y-3">
      {/* Status banner with badge */}
      <div className={`flex items-center justify-between p-3 rounded-lg border ${statusBg[summary.overallStatus]}`}>
        <div className="flex items-center gap-2">
          {summary.overallStatus === 'rouge' && <XCircle className="w-5 h-5" />}
          {summary.overallStatus === 'orange' && <AlertTriangle className="w-5 h-5" />}
          {summary.overallStatus === 'vert' && <CheckCircle className="w-5 h-5" />}
          <span className="font-semibold text-sm">{statusLabels[summary.overallStatus]}</span>
        </div>
        {/* Badge hebdo */}
        <Badge variant="outline" className="font-mono text-sm px-3 py-1 border-current">
          {summary.totalHours.toFixed(2)}h / {summary.plafondAutorise}h
        </Badge>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <MetricCard
          label="Heures restantes"
          value={`${summary.heuresRestantes.toFixed(2)}h`}
          icon={<TrendingDown className={`w-4 h-4 ${hrColor}`} />}
          valueClass={hrColor}
        />
        <MetricCard label="Jours travaillés" value={`${summary.daysWorkedCount}`} icon={<Clock className="w-4 h-4 text-muted-foreground" />} />
        <MetricCard
          label="Repos quotidien"
          value={summary.reposQuotidienOk ? '✓' : '✗'}
          icon={<StatusIcon ok={summary.reposQuotidienOk} />}
        />
        <MetricCard
          label="Repos hebdo"
          value={summary.reposHebdoOk ? '✓' : '✗'}
          icon={<StatusIcon ok={summary.reposHebdoOk} />}
        />
      </div>

      {/* Alerts */}
      {summary.alerts.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Alertes</p>
          {summary.alerts.map((alert, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 p-2 rounded text-xs ${
                alert.level === 'rouge' ? 'bg-red-50 text-red-800 border border-red-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}
            >
              {alert.level === 'rouge' ? <XCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" /> : <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />}
              <span>{alert.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MetricCard({ label, value, icon, valueClass }: { label: string; value: string; icon?: React.ReactNode; valueClass?: string }) {
  return (
    <div className="p-2 rounded-lg border border-border bg-card text-center">
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <div className="flex items-center justify-center gap-1 mt-0.5">
        {icon}
        <span className={`text-sm font-semibold ${valueClass || ''}`}>{icon && !valueClass ? '' : value}</span>
      </div>
    </div>
  );
}
