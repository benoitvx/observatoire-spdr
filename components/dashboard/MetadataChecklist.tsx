"use client";

import { fr } from "@codegouvfr/react-dsfr/fr";
import { ComplianceBadge } from "../ComplianceBadge";
import { MetadataCompliance } from "../../lib/compliance/types";

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

export function MetadataChecklist({ metadata }: MetadataChecklistProps) {
  return (
    <div>
      <div className={fr.cx("fr-mb-2w")} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <h4 className={fr.cx("fr-text--bold", "fr-mb-0")}>
          Métadonnées
        </h4>
        <span className={fr.cx("fr-text--sm", "fr-text--bold")}>{metadata.score}/8</span>
        <ComplianceBadge status={metadata.status} />
      </div>
      <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
        {METADATA_ITEMS.map((item) => {
          const isValid = metadata[item.key];

          return (
            <div
              key={item.key}
              className={fr.cx("fr-col-6")}
            >
              <span className={fr.cx("fr-text--sm")}>{item.label}</span>
              {" "}
              <span
                style={{
                  color: isValid ? "var(--text-default-success)" : "var(--text-default-error)",
                }}
                aria-label={isValid ? "présent" : "absent"}
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
