"use client";

import { useState, Fragment } from "react";
import { fr } from "@codegouvfr/react-dsfr/fr";
import { DatagouvDataset } from "../../lib/types";
import { DatasetConfig } from "../../lib/config/datasets";
import { DatasetCompliance } from "../../lib/compliance/types";
import { ComplianceBadge } from "../ComplianceBadge";
import { DatasetDetails } from "./DatasetDetails";

interface ComplianceTableProps {
  datasets: DatagouvDataset[];
  configs: DatasetConfig[];
  complianceResults: DatasetCompliance[];
}

export function ComplianceTable({ datasets, configs, complianceResults }: ComplianceTableProps) {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const isExpanded = (id: string) => expandedIds.includes(id);

  return (
    <div className="fr-table" id="table-compliance">
      <table>
        <caption>État de conformité des 9 jeux de données de référence</caption>
        <thead>
          <tr>
            <th scope="col" style={{ minWidth: "280px" }}>
              Jeu de données
            </th>
            <th scope="col">Méta (8/8)</th>
            <th scope="col">MAJ</th>
            <th scope="col">Format</th>
            <th scope="col">Téléchargement</th>
            <th scope="col">API</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody>
          {complianceResults.map((compliance) => {
            const dataset = datasets.find((d) => d.id === compliance.datasetId);
            const config = configs.find((c) => c.id === compliance.datasetId);

            if (!dataset || !config) return null;

            const expanded = isExpanded(compliance.datasetId);
            const detailsId = `details-${compliance.datasetId}`;

            return (
              <Fragment key={compliance.datasetId}>
                <tr
                  onClick={() => toggleExpand(compliance.datasetId)}
                  style={{ cursor: "pointer" }}
                  aria-expanded={expanded}
                  aria-controls={detailsId}
                >
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span
                        aria-hidden="true"
                        style={{ fontSize: "0.75rem", color: "var(--text-mention-grey)" }}
                      >
                        {expanded ? "▼" : "▶"}
                      </span>
                      <div>
                        <strong>{config.fullName}</strong>
                        <br />
                        <span className={fr.cx("fr-text--xs")} style={{ color: "var(--text-mention-grey)" }}>
                          {config.producer}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <ComplianceBadge status={compliance.metadata.status} />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <ComplianceBadge status={compliance.update.status} />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <ComplianceBadge status={compliance.format.status} />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <ComplianceBadge status={compliance.download.status} />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {compliance.api.status === "not_applicable" ? (
                      <span className="fr-text--sm">N/A</span>
                    ) : (
                      <ComplianceBadge status={compliance.api.status} />
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <strong>{compliance.globalScore}%</strong>
                  </td>
                </tr>
                {expanded && (
                  <tr id={detailsId}>
                    <td colSpan={7} style={{ padding: 0 }}>
                      <DatasetDetails
                        dataset={dataset}
                        config={config}
                        compliance={compliance}
                      />
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
