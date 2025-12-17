import { ComplianceStatus } from '../lib/compliance/types';
import Badge from '@codegouvfr/react-dsfr/Badge';

export interface ComplianceBadgeProps {
  status: ComplianceStatus;
  label?: string;
  detail?: string;
}

export function ComplianceBadge({ status, label, detail }: ComplianceBadgeProps) {
  const severityMap: Record<ComplianceStatus, "success" | "warning" | "error" | "info"> = {
    compliant: "success",
    warning: "warning",
    non_compliant: "error",
    not_applicable: "info"
  };

  const labelMap: Record<ComplianceStatus, string> = {
    compliant: "CONFORME",
    warning: "AVERTISSEMENT",
    non_compliant: "NON CONFORME",
    not_applicable: "N/A"
  };

  const displayLabel = label || labelMap[status];

  return (
    <div style={{ textAlign: 'center' }}>
      <Badge severity={severityMap[status]} small>
        {displayLabel}
      </Badge>
      {detail && (
        <span
          className="fr-text--xs fr-mt-1v"
          style={{ display: 'block', color: 'var(--text-mention-grey)' }}
        >
          {detail}
        </span>
      )}
    </div>
  );
}
