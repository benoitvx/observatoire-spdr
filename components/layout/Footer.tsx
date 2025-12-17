"use client";

import { Footer as DSFRFooter } from "@codegouvfr/react-dsfr/Footer";

export function Footer() {
  return (
    <DSFRFooter
      brandTop={
        <>
          RÉPUBLIQUE
          <br />
          FRANÇAISE
        </>
      }
      homeLinkProps={{
        href: "/",
        title: "Accueil - Observatoire du SPDR"
      }}
      accessibility="fully compliant"
      contentDescription="L'Observatoire du SPDR est un service public qui permet de suivre la conformité des jeux de données de référence."
      bottomItems={[
        {
          text: "Mentions légales",
          linkProps: { href: "/mentions-legales" }
        },
        {
          text: "Données personnelles",
          linkProps: { href: "/donnees-personnelles" }
        },
        {
          text: "Gestion des cookies",
          linkProps: { href: "#" }
        }
      ]}
      license={
        <>
          Sauf mention contraire, tous les contenus de ce site sont sous{" "}
          <a
            href="https://github.com/etalab/licence-ouverte/blob/master/LO.md"
            target="_blank"
            rel="noopener external"
          >
            licence etalab-2.0
          </a>
        </>
      }
    />
  );
}
