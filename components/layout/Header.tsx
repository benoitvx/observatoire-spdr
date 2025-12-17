"use client";

import { Header as DSFRHeader } from "@codegouvfr/react-dsfr/Header";

export function Header() {
  return (
    <DSFRHeader
      brandTop={
        <>
          RÉPUBLIQUE
          <br />
          FRANÇAISE
        </>
      }
      homeLinkProps={{
        href: "/",
        title: "Accueil - Observatoire du SPDR - data.gouv.fr - République Française"
      }}
      operatorLogo={{
        alt: "data.gouv.fr",
        imgUrl: "/images/logo-datagouv.svg",
        orientation: "horizontal"
      }}
      serviceTitle="Observatoire du SPDR"
      serviceTagline="Service Public de la Donnée de Référence"
      quickAccessItems={[
        {
          iconId: "fr-icon-information-line",
          linkProps: {
            href: "/methodologie"
          },
          text: "En savoir plus"
        }
      ]}
    />
  );
}
