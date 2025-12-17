# Méthodologie de l'Observatoire du SPDR

## Introduction

L'Observatoire du Service Public de la Donnée de Référence (SPDR) est un tableau de bord public permettant de suivre la conformité des 9 jeux de données de référence définis par la loi pour une République Numérique.

Cette page détaille la méthodologie utilisée pour évaluer la conformité de chaque jeu de données par rapport aux exigences réglementaires.

---

## Cadre légal

### Textes de référence

L'Observatoire s'appuie sur les textes suivants :

- **[Article 14 de la loi pour une République Numérique (2016)](https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000033205148/2016-10-09)** : institue le Service Public de la Donnée de Référence
- **[Article L321-4 du CRPA](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033219118)** : définit les données de référence
- **[Décret n° 2017-331 du 14 mars 2017](https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000034194946)** : précise les règles d'organisation
- **[Arrêté du 14 juin 2017](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000034944648)** : fixe les règles techniques et d'organisation

### Les 9 jeux de données de référence

| Nom | Producteur | Fréquence réglementaire |
|-----|------------|-------------------------|
| **Base Sirene** (SIREN, SIRET) | INSEE | Quotidienne (J+1 ouvré) |
| **Répertoire National des Associations** (RNA) | Ministère de l'Intérieur | Mensuelle |
| **Plan Cadastral Informatisé** (PCI) | DGFiP | Trimestrielle |
| **Référentiel à Grande Échelle** (RGE) | IGN | Semestrielle |
| **Base Adresse Nationale** (BAN) | DINUM / IGN | Hebdomadaire |
| **Organisation Administrative de l'État** | DILA | Hebdomadaire |
| **Répertoire des Métiers et Emplois** (ROME) | France Travail | Quadrimestrielle |
| **Code Officiel Géographique** (COG) | INSEE | Annuelle |
| **Registre Parcellaire Graphique** (RPG) | IGN / ASP | Annuelle (fin campagne PAC) |

---

## Les 5 indicateurs de conformité

L'Observatoire évalue chaque jeu de données selon **5 indicateurs** :

### 1️⃣ Métadonnées (Méta)
### 2️⃣ Mise à jour (MAJ)
### 3️⃣ Format ouvert
### 4️⃣ Téléchargement
### 5️⃣ API

Un **score global** synthétise l'ensemble de ces indicateurs.

---

## 1️⃣ Métadonnées obligatoires

### Critère réglementaire

L'arrêté du 14 juin 2017 (Article 1) impose que l'administration renseigne **au minimum 8 métadonnées** :

1. **Source et date de dernière mise à jour** des données
2. **Titre** des données
3. **Description** des données
4. **Périodicité** de mise à disposition des données
5. **Format** des données
6. **Couverture géographique** des données
7. **Licence** de réutilisation applicable aux données
8. **Mots-clés** des données

### Méthode de calcul

Pour chaque jeu de données, l'Observatoire vérifie la présence de ces 8 champs via l'API data.gouv.fr :

```
Score = Nombre de champs présents / 8

Exemple :
- Titre ✅
- Description ✅
- Date MAJ ✅
- Périodicité ✅
- Format ✅
- Couverture géographique ✅
- Licence ✅
- Mots-clés ✅

→ Score : 8/8
```

### Seuils de conformité

| Score | Statut | Badge |
|-------|--------|-------|
| **8/8 ou 7/8** | ✅ Conforme | Badge vert |
| **6/8 ou 5/8** | ⚠️ Attention | Badge orange |
| **< 5/8** | ❌ Non conforme | Badge rouge |

### Affichage

- ✅ **8/8** : Toutes les métadonnées sont renseignées
- ⚠️ **6/8** : Métadonnées incomplètes, à améliorer
- ❌ **4/8** : Métadonnées insuffisantes

---

## 2️⃣ Respect de la périodicité de mise à jour

### Critère réglementaire

L'arrêté du 14 juin 2017 (Article 3) fixe une **périodicité de mise à jour obligatoire** pour chaque jeu de données.

### Méthode de calcul

L'Observatoire calcule le nombre de jours écoulés depuis la dernière mise à jour :

```
Jours écoulés = Date du jour - Date de dernière mise à jour (last_modified)
```

Ce délai est ensuite comparé aux **seuils de conformité** définis selon la fréquence réglementaire.

### Seuils de conformité par fréquence

| Fréquence | ✅ Conforme | ⚠️ Attention | ❌ Non conforme |
|-----------|-------------|--------------|-----------------|
| **Quotidienne** | ≤ 1 jour | 2 à 3 jours | > 3 jours |
| **Hebdomadaire** | ≤ 7 jours | 8 à 10 jours | > 10 jours |
| **Mensuelle** | ≤ 31 jours | 32 à 45 jours | > 45 jours |
| **Trimestrielle** | ≤ 92 jours | 93 à 100 jours | > 100 jours |
| **Quadrimestrielle** | ≤ 122 jours | 123 à 135 jours | > 135 jours |
| **Semestrielle** | ≤ 183 jours | 184 à 200 jours | > 200 jours |
| **Annuelle** | ≤ 365 jours | 366 à 400 jours | > 400 jours |

### Affichage

- ✅ **0 jours** : Données à jour
- ⚠️ **83 jours** : Retard modéré (trimestrielle)
- ❌ **106 jours** : Retard important (mensuelle)

### Exemples

**Base Sirene (quotidienne)** :
- Dernière MAJ : 16/12/2025
- Aujourd'hui : 17/12/2025
- Délai : **1 jour** → ✅ Conforme

**RNA (mensuelle)** :
- Dernière MAJ : 02/09/2025
- Aujourd'hui : 17/12/2025
- Délai : **106 jours** → ❌ Non conforme (> 45 jours)

---

## 3️⃣ Format ouvert

### Critère réglementaire

L'arrêté du 14 juin 2017 (Article 5) impose que les données soient disponibles en **téléchargement intégral**, ce qui implique l'utilisation de **formats ouverts et réutilisables**.

### Méthode de calcul

L'Observatoire vérifie la présence d'**au moins une ressource** dans un format ouvert parmi :

**Formats ouverts reconnus** :
- `CSV` (Comma-Separated Values)
- `JSON` (JavaScript Object Notation)
- `GeoJSON` (format géographique)
- `XML` (eXtensible Markup Language)
- `Parquet` (format colonne)
- `ODS` (OpenDocument Spreadsheet)
- `TXT` (texte brut)
- `SHP` (Shapefile)
- `GPKG` (GeoPackage)
- `GML` (Geography Markup Language)

### Seuils de conformité

| Condition | Statut | Badge |
|-----------|--------|-------|
| **Au moins 1 format ouvert** | ✅ Conforme | Badge vert |
| **Aucun format ouvert** | ❌ Non conforme | Badge rouge |

### Affichage

- ✅ **2 format(s)** : CSV et JSON disponibles
- ❌ **0 format(s)** : Aucun format ouvert détecté

---

## 4️⃣ Téléchargement intégral

### Critère réglementaire

L'arrêté du 14 juin 2017 (Article 5) impose que les données soient disponibles :
> "en téléchargement dans leur intégralité, aisément réalisable par un traitement automatisé, en une ou plusieurs opérations"

### Méthode de calcul

L'Observatoire compte le nombre de **ressources principales** (type `main`) disposant d'une URL de téléchargement valide.

```
Ressources téléchargeables = Ressources avec :
- Type = "main" (ressource principale)
- URL valide et accessible
```

### Seuils de conformité

| Condition | Statut | Badge |
|-----------|--------|-------|
| **Au moins 1 ressource téléchargeable** | ✅ Conforme | Badge vert |
| **Aucune ressource téléchargeable** | ❌ Non conforme | Badge rouge |

### Affichage

- ✅ **24 ressource(s)** : Téléchargement disponible
- ✅ **5 ressource(s)** : Téléchargement disponible
- ❌ **0 ressource(s)** : Aucun téléchargement disponible

---

## 5️⃣ Interface de programmation (API)

### Critère réglementaire

L'arrêté du 14 juin 2017 (Article 5) précise que les données doivent être disponibles :
> "le cas échéant, par l'intermédiaire d'une interface de programmation"

L'Article 4 ajoute que l'administration :
> "s'efforce de garantir la disponibilité des données par l'intermédiaire d'une interface de programmation 99,5 % du temps mensuel"

### Méthode de calcul

L'Observatoire vérifie la présence d'une API de **deux manières** :

1. **Déclaration dans les métadonnées** : une ressource de type `api` est présente
2. **Configuration manuelle** : l'URL de l'API est connue et documentée

```
API disponible = 
  Ressource avec type "api" 
  OU 
  URL d'API documentée dans la configuration
```

### Seuils de conformité

| Condition | Statut | Badge |
|-----------|--------|-------|
| **API attendue ET disponible** | ✅ Conforme | Badge vert |
| **API attendue MAIS absente** | ❌ Non conforme | Badge rouge |
| **API non attendue** | ⚪ Non applicable | Badge gris (N/A) |

### APIs connues par jeu de données

| Jeu de données | API attendue ? | URL |
|----------------|----------------|-----|
| SIRENE | ✅ Oui | https://api.insee.fr/entreprises/sirene/V3 |
| RNA | ❌ Non | N/A |
| PCI | ✅ Oui | https://cadastre.data.gouv.fr/api |
| RGE | ✅ Oui | https://data.geopf.fr/wfs |
| BAN | ✅ Oui | https://api-adresse.data.gouv.fr |
| Organisation Administrative | ✅ Oui | https://api-lannuaire.service-public.fr |
| ROME | ✅ Oui | https://api.francetravail.io/partenaire/rome |
| COG | ✅ Oui | https://api.insee.fr/metadonnees/geo |
| RPG | ❌ Non | N/A |

### Affichage

- ✅ **CONFORME** : API disponible (quand attendue)
- ❌ **NON CONFORME** : API absente (quand attendue)
- ⚪ **N/A** : API non attendue (RNA, RPG)

---

## Score global de conformité

### Méthode de calcul

Le **score global** synthétise l'ensemble des 5 indicateurs en un pourcentage de 0 à 100%.

Chaque indicateur est converti en score :
- ✅ **Conforme** = 2 points
- ⚠️ **Attention** = 1 point
- ❌ **Non conforme** = 0 point
- ⚪ **Non applicable** = exclu du calcul

```
Score global = (Points obtenus / Points maximum possible) × 100

Avec :
- Points maximum = Nombre d'indicateurs applicables × 2
```

### Exemple de calcul

**Base Sirene** :
- Métadonnées : 8/8 → ✅ Conforme (+2 points)
- MAJ : 0 jours → ✅ Conforme (+2 points)
- Format : 2 formats → ✅ Conforme (+2 points)
- Téléchargement : 24 ressources → ✅ Conforme (+2 points)
- API : disponible → ✅ Conforme (+2 points)

**Calcul** :
```
Points obtenus = 2 + 2 + 2 + 2 + 2 = 10
Points maximum = 5 indicateurs × 2 = 10

Score global = (10 / 10) × 100 = 100%
```

**Répertoire National des Associations** :
- Métadonnées : 8/8 → ✅ Conforme (+2 points)
- MAJ : 106 jours → ❌ Non conforme (+0 point)
- Format : 0 formats → ❌ Non conforme (+0 point)
- Téléchargement : 135 ressources → ✅ Conforme (+2 points)
- API : N/A → ⚪ Non applicable (exclu)

**Calcul** :
```
Points obtenus = 2 + 0 + 0 + 2 = 4
Points maximum = 4 indicateurs × 2 = 8 (API exclue)

Score global = (4 / 8) × 100 = 50%
```

### Interprétation du score

| Score | Interprétation |
|-------|----------------|
| **90-100%** | 🟢 Excellent : conformité totale ou quasi-totale |
| **70-89%** | 🟡 Bon : conformité majoritaire avec quelques points d'amélioration |
| **50-69%** | 🟠 Moyen : conformité partielle, amélioration nécessaire |
| **< 50%** | 🔴 Insuffisant : non-conformité majeure |

---

## Système de badges colorés

L'Observatoire utilise un **code couleur** pour faciliter la lecture :

| Badge | Signification | Quand l'utiliser |
|-------|---------------|------------------|
| 🟢 **Vert (Conforme)** | Le critère est respecté | Toutes les exigences sont remplies |
| 🟡 **Orange (Attention)** | Le critère est partiellement respecté | Retard modéré ou conformité incomplète |
| 🔴 **Rouge (Non conforme)** | Le critère n'est pas respecté | Exigences non remplies |
| ⚪ **Gris (N/A)** | Le critère n'est pas applicable | Critère non pertinent pour ce dataset |

---

## Source des données

### API data.gouv.fr

Toutes les données affichées dans l'Observatoire proviennent de l'**API publique de data.gouv.fr** :

```
https://www.data.gouv.fr/api/1/datasets/{id}/
```

### Fréquence de mise à jour

Les données affichées dans l'Observatoire sont **actualisées en temps réel** à chaque consultation, avec un cache de **5 minutes** pour éviter une surcharge de l'API.

La date et l'heure de dernière actualisation sont affichées en haut du tableau de bord.

### Données extraites

Pour chaque jeu de données, l'Observatoire récupère :
- Les **métadonnées** (titre, description, licence, etc.)
- La **date de dernière mise à jour** (`last_modified`)
- La liste des **ressources** (fichiers téléchargeables)
- Les **formats** disponibles
- La présence d'une **API**

---

## Critères non mesurés en V1

Certains critères définis par l'arrêté du 14 juin 2017 ne sont **pas encore mesurés** dans cette première version de l'Observatoire :

### Disponibilité 99% (Article 4)

> L'administration garantit la disponibilité des données en téléchargement 99 % du temps mensuel

**Pourquoi non mesuré ?**  
Nécessite la mise en place d'un système de **monitoring continu** (uptime monitoring) sur plusieurs semaines/mois.

**Évolution prévue** : V2

### Signalement d'erreurs (Article 6)

> L'administration répond aux utilisateurs dans un délai maximal d'un mois à compter de la réception du signalement

**Pourquoi non mesuré ?**  
Nécessite un suivi manuel des signalements et des délais de réponse.

**Évolution prévue** : Intégration avec le système de signalement de data.gouv.fr

### Information préalable 3 mois (Article 7)

> L'administration informe les usagers, dans un délai qui ne peut être inférieur à trois mois, de toute modification substantielle

**Pourquoi non mesuré ?**  
Nécessite un suivi manuel des communications aux usagers.

**Évolution prévue** : Analyse des annonces publiées

---

## Limites de la méthodologie

### Détection des formats

La détection des formats ouverts se base sur l'**extension déclarée** dans les métadonnées. Il est possible qu'un fichier soit déclaré dans un format ouvert mais ne soit pas réellement exploitable.

### Date de mise à jour

La date `last_modified` correspond à la **dernière modification des métadonnées ou des ressources** sur data.gouv.fr. Elle ne reflète pas toujours la date de production réelle des données.

### Disponibilité des APIs

L'Observatoire vérifie la **présence** d'une API mais ne teste pas sa **disponibilité effective** ni sa **performance**.

---

## Évolutions futures

### Version 2

- ✅ **Historisation** des données de conformité
- ✅ **Graphiques d'évolution** temporelle
- ✅ **Monitoring de disponibilité** (uptime 99%)
- ✅ Suivi des **signalements** et délais de réponse

### Version 3

- ✅ Extension aux **données de forte valeur** (HVD)
- ✅ **API publique** de l'Observatoire
- ✅ **Notifications** aux producteurs
- ✅ Tests de **performance** des APIs

---

## Contact et feedback

### Vous avez une question sur la méthodologie ?

Contactez l'équipe Etalab : **contact@data.gouv.fr**

### Vous souhaitez signaler une erreur ?

Utilisez le système de signalement disponible sur chaque page de jeu de données sur data.gouv.fr.

### Vous souhaitez contribuer au code ?

Le code source de l'Observatoire est disponible sur GitHub :  
**https://github.com/benoitvx/observatoire-spdr**

---

## Références

- [Loi pour une République Numérique (article 14)](https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000033205148/2016-10-09)
- [Article L321-4 du CRPA](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033219118)
- [Décret n° 2017-331 du 14 mars 2017](https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000034194946)
- [Arrêté du 14 juin 2017](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000034944648)
- [API data.gouv.fr](https://www.data.gouv.fr/fr/apidoc/)
- [Service Public de la Donnée de Référence](https://www.data.gouv.fr/fr/pages/spd/reference/)

---

_Dernière mise à jour de cette page : 17 décembre 2025_
