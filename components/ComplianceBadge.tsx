import React from 'react';
import { ComplianceStatus } from '../lib/compliance/types';
import Badge from '@codegouvfr/react-dsfr/Badge';

export interface ComplianceBadgeProps {
  status: ComplianceStatus;
  label?: string;
}

export function ComplianceBadge({ status, label }: ComplianceBadgeProps) {
  const getBadgeType = (status: ComplianceStatus) => {
    switch (status) {
      case 'compliant':
        return 'success';
      case 'warning':
        return 'warning';
      case 'non_compliant':
        return 'error';
      case 'not_applicable':
      default:
        return 'info';
    }
  };
  
  const getDefaultLabel = (status: ComplianceStatus) => {
    switch (status) {
      case 'compliant':
        return 'Conforme';
      case 'warning':
        return 'Avertissement';
      case 'non_compliant':
        return 'Non conforme';
      case 'not_applicable':
      default:
        return 'Non applicable';
    }
  };
  
  const badgeType = getBadgeType(status);
  const displayLabel = label || getDefaultLabel(status);
  
  return (
    <Badge severity={badgeType} small>
      {displayLabel}
    </Badge>
  );
}