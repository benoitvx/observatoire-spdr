"use client";

import { fr } from "@codegouvfr/react-dsfr/fr";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { MetadataCompliance, ComplianceStatus } from "../../lib/compliance/types";

interface MetadataChecklistProps {
  metadata: MetadataCompliance;
}

interface MetadataItem {
  key: keyof Omit<MetadataCompliance, "score" | "status">;
  label: string;
}

const METADATA_ITEMS: MetadataItem[] = [
  { key: "title", label: "Titre" },
  { key: "description", label: "Description" },
  { key: "lastModified", label: "Date MAJ" },
  { key: "frequency", label: "Périodicité" },
  { key: "format", label: "Format" },
  { key: "spatial", label: "Couverture géo" },
  { key: "license", label: "Licence" },
  { key: "tags", label: "Mots-clés" },
];

function getStatusBadge(status: ComplianceStatus) {
  const severityMap: Record<ComplianceStatus, "success" | "warning" | "error" | "info"> = {
    compliant: "success",
    warning: "warning",
    non_compliant: "error",
    not_applicable: "info",
  };

  const labelMap: Record<ComplianceStatus, string> = {
    compliant: "Conforme",
    warning: "Partiel",
    non_compliant: "Incomplet",
    not_applicable: "N/A",
  };

  return <Badge severity={severityMap[status]} small>{labelMap[status]}</Badge>;
}

export function MetadataChecklist({ metadata }: MetadataChecklistProps) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
        <h4 className={fr.cx("fr-text--bold", "fr-mb-0")}>
          Métadonnées
        </h4>
        <span className={fr.cx("fr-text--sm", "fr-text--bold")}>{metadata.score}/8</span>
        {getStatusBadge(metadata.status)}
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0.25rem 1rem"
      }}>
        {METADATA_ITEMS.map((item) => {
          const isValid = metadata[item.key];

          return (
            <div
              key={item.key}
              style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
            >
              <span className={fr.cx("fr-text--sm")}>{item.label}</span>
              <span
                style={{
                  color: isValid ? "var(--text-default-success)" : "var(--text-default-error)",
                  fontSize: "0.875rem"
                }}
              >
                {isValid ? "✓" : "✗"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
