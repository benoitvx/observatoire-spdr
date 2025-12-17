"use client";

import { fr } from "@codegouvfr/react-dsfr/fr";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { DatagouvDataset } from "../../lib/types";
import { DatasetConfig } from "../../lib/config/datasets";
import { DatasetCompliance, ComplianceStatus } from "../../lib/compliance/types";
import { MetadataChecklist } from "./MetadataChecklist";

interface DatasetDetailsProps {
  dataset: DatagouvDataset;
  config: DatasetConfig;
  compliance: DatasetCompliance;
}

const FREQUENCY_LABELS: Record<string, string> = {
  daily: "Quotidienne",
  weekly: "Hebdomadaire",
  monthly: "Mensuelle",
  quarterly: "Trimestrielle",
  quadrimestrial: "Quadrimestrielle",
  biannual: "Semestrielle",
  annual: "Annuelle",
  campaign: "Par campagne",
};

function StatusBadge({ status }: { status: ComplianceStatus }) {
  const severityMap: Record<ComplianceStatus, "success" | "warning" | "error" | "info"> = {
    compliant: "success",
    warning: "warning",
    non_compliant: "error",
    not_applicable: "info",
  };

  const labelMap: Record<ComplianceStatus, string> = {
    compliant: "Conforme",
    warning: "Avertissement",
    non_compliant: "Non conforme",
    not_applicable: "N/A",
  };

  return <Badge severity={severityMap[status]} small>{labelMap[status]}</Badge>;
}

function SectionHeader({ title, status }: { title: string; status?: ComplianceStatus }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
      <h4 className={fr.cx("fr-text--bold", "fr-mb-0")}>{title}</h4>
      {status && <StatusBadge status={status} />}
    </div>
  );
}

export function DatasetDetails({ dataset, config, compliance }: DatasetDetailsProps) {
  const datagouvUrl = `https://www.data.gouv.fr/fr/datasets/${dataset.id}/`;
  const organizationUrl = dataset.organization
    ? `https://www.data.gouv.fr/fr/organizations/${dataset.organization.slug}/`
    : null;

  const resourceTypes = Array.from(new Set(dataset.resources.map((r) => r.type)));

  return (
    <div className={fr.cx("fr-p-3w")} style={{ backgroundColor: "var(--background-alt-grey)" }}>
      <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
        {/* Section Informations générales */}
        <div className={fr.cx("fr-col-12", "fr-col-md-6", "fr-col-lg-4")}>
          <div className={fr.cx("fr-p-2w")} style={{ backgroundColor: "var(--background-default-grey)", height: "100%" }}>
            <SectionHeader title="Informations générales" />
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <li className={fr.cx("fr-mb-1w")}>
                <a
                  href={datagouvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={fr.cx("fr-link")}
                >
                  Voir sur data.gouv.fr
                </a>
              </li>
              <li>
                <span className={fr.cx("fr-text--sm")}>Producteur : </span>
                {organizationUrl ? (
                  <a
                    href={organizationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={fr.cx("fr-link", "fr-text--sm")}
                  >
                    {dataset.organization?.name}
                  </a>
                ) : (
                  <span className={fr.cx("fr-text--sm")}>{config.producer}</span>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* Section Métadonnées */}
        <div className={fr.cx("fr-col-12", "fr-col-md-6", "fr-col-lg-4")}>
          <div className={fr.cx("fr-p-2w")} style={{ backgroundColor: "var(--background-default-grey)", height: "100%" }}>
            <MetadataChecklist metadata={compliance.metadata} />
          </div>
        </div>

        {/* Section Mise à jour */}
        <div className={fr.cx("fr-col-12", "fr-col-md-6", "fr-col-lg-4")}>
          <div className={fr.cx("fr-p-2w")} style={{ backgroundColor: "var(--background-default-grey)", height: "100%" }}>
            <SectionHeader title="Mise à jour" status={compliance.update.status} />
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <li className={fr.cx("fr-text--sm", "fr-mb-1v")}>
                Fréquence attendue : {FREQUENCY_LABELS[config.expectedFrequency] || config.expectedFrequency}
              </li>
              <li className={fr.cx("fr-text--sm", "fr-mb-1v")}>
                Dernière MAJ : {new Date(dataset.last_modified).toLocaleDateString("fr-FR")}
              </li>
              <li className={fr.cx("fr-text--sm")}>
                Écart : {compliance.update.daysSinceUpdate} jour(s)
              </li>
            </ul>
          </div>
        </div>

        {/* Section Formats */}
        <div className={fr.cx("fr-col-12", "fr-col-md-6", "fr-col-lg-4")}>
          <div className={fr.cx("fr-p-2w")} style={{ backgroundColor: "var(--background-default-grey)", height: "100%" }}>
            <SectionHeader title="Formats" status={compliance.format.status} />
            {compliance.format.formats.length > 0 ? (
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {compliance.format.formats.map((format) => (
                  <Badge key={format} severity="info" small>
                    {format.toUpperCase()}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className={fr.cx("fr-text--sm", "fr-mb-0")} style={{ color: "var(--text-default-error)" }}>
                Aucun format ouvert détecté
              </p>
            )}
          </div>
        </div>

        {/* Section Téléchargement */}
        <div className={fr.cx("fr-col-12", "fr-col-md-6", "fr-col-lg-4")}>
          <div className={fr.cx("fr-p-2w")} style={{ backgroundColor: "var(--background-default-grey)", height: "100%" }}>
            <SectionHeader title="Téléchargement" status={compliance.download.status} />
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <li className={fr.cx("fr-text--sm", "fr-mb-1v")}>
                {compliance.download.resourceCount} ressource(s) disponible(s)
              </li>
              <li className={fr.cx("fr-text--sm")}>
                Types : {resourceTypes.length > 0 ? resourceTypes.join(", ") : "Non spécifié"}
              </li>
            </ul>
          </div>
        </div>

        {/* Section API */}
        <div className={fr.cx("fr-col-12", "fr-col-md-6", "fr-col-lg-4")}>
          <div className={fr.cx("fr-p-2w")} style={{ backgroundColor: "var(--background-default-grey)", height: "100%" }}>
            <SectionHeader
              title="API"
              status={compliance.api.status === "not_applicable" ? undefined : compliance.api.status}
            />
            {compliance.api.status === "not_applicable" ? (
              <p className={fr.cx("fr-text--sm", "fr-mb-0")}>
                API non attendue pour ce jeu de données
              </p>
            ) : (
              <>
                {compliance.api.available ? (
                  compliance.api.url && (
                    <a
                      href={compliance.api.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={fr.cx("fr-link", "fr-text--sm")}
                    >
                      Documentation API
                    </a>
                  )
                ) : (
                  <p className={fr.cx("fr-text--sm", "fr-mb-0")} style={{ color: "var(--text-default-error)" }}>
                    API non disponible
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
