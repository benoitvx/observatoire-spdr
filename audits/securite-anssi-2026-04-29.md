## Audit Sécurité ANSSI — Rapport de conformité

**Date :** 2026-04-29
**Périmètre audité :** Observatoire du SPDR — application Next.js 14 (App Router) déployée sur Vercel, sans backend propre ni base de données. L'app interroge en SSR l'API publique `data.gouv.fr` et restitue un tableau de bord en lecture seule. Pas d'authentification, pas de formulaire utilisateur, pas de stockage.
**Résultat global :** 5/8 règles applicables conformes (62 %)
(5 conformes, 1 non conforme, 2 partielles, 4 non applicables)

---

### Tableau de synthèse

| # | Domaine | Statut | Détail |
|---|---------|--------|--------|
| 1 | TLS / HTTPS | OK | Délégué à Vercel (TLS 1.3, HSTS, redirection HTTPS automatiques). |
| 2 | Gestion des secrets | OK | Aucun secret dans le code. Pas d'API key requise (data.gouv.fr public). `.env*.local` ignoré par Git. |
| 3 | Authentification et contrôle d'accès | NA | App publique en lecture seule, aucune zone authentifiée. |
| 4 | Headers de sécurité HTTP | KO | Aucun header (`CSP`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) configuré dans `next.config.mjs`. |
| 5 | Validation des entrées | OK | Aucune entrée utilisateur. Les données data.gouv.fr sont rendues via JSX (échappement React). Le seul `dangerouslySetInnerHTML` (`app/layout.tsx:39`) injecte un script DSFR statique sans donnée externe. |
| 6 | Gestion des dépendances | KO | `npm audit` : 7 vulnérabilités (1 modérée, 6 hautes) — `next@14.2.33` (DoS Server Components), `postcss`, `glob`, `vite`, `picomatch`. Pas de scan automatisé en CI. |
| 7 | Journalisation et monitoring | Partiel | Quelques `console.error` côté serveur. Pas de centralisation, pas d'alertes. |
| 8 | Protection des API | NA | Aucune API exposée par l'application. |
| 9 | Sécurité des conteneurs et du déploiement | NA | Pas de Docker. Déploiement Vercel. |
| 10 | Sécurité du poste de développement | NA | Hors périmètre code. |
| 11 | Sauvegarde et continuité | NA | App stateless, code versionné Git/GitHub (sauvegarde implicite). |
| 12 | Gestion des incidents | Partiel | Procédure non documentée dans le dépôt ; contact CERT non identifié dans le `README.md`. |

---

### Non-conformités détectées

**[KO] Domaine 4 — Headers de sécurité HTTP** — 🟠 Élevée
- **Règle concernée :** `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` doivent être définis.
- **Constat :** `next.config.mjs` ne définit aucun bloc `headers()`. Aucun fichier `vercel.json`. Vercel applique `Strict-Transport-Security` par défaut, mais pas de CSP, ni `X-Frame-Options`, ni `Permissions-Policy`.
- **Risque :** clickjacking (iframe par un site tiers), MIME sniffing, fuite de Referer, exposition à des XSS si une dépendance future introduit `dangerouslySetInnerHTML` avec données externes, et activation par défaut d'API navigateur non utilisées (caméra, micro, géoloc).
- **Correction :** ajouter dans `next.config.mjs` un bloc `async headers()` retournant au minimum :
  ```js
  {
    source: '/:path*',
    headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      { key: 'Content-Security-Policy', value: "default-src 'self'; img-src 'self' data: https://www.data.gouv.fr; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://www.data.gouv.fr; frame-ancestors 'none'" },
      { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' }
    ]
  }
  ```
  Note : `'unsafe-inline'` sur `script-src` est requis tant que le `<script dangerouslySetInnerHTML>` DSFR n'utilise pas de nonce ; à terme, passer à un nonce/hash (`getScriptToRunAsap` accepte un `nonce`).
- **Priorité :** 🟠 Élevée

**[KO] Domaine 6 — Gestion des dépendances** — 🟠 Élevée
- **Règle concernée :** mettre à jour les dépendances avec CVE connues, scanner régulièrement.
- **Constat :** `npm audit` remonte 7 vulnérabilités, dont 6 hautes :
  - `next@14.2.33` : `GHSA-mwv6-3258-q52c` (DoS via Server Components, fix en 14.2.34+).
  - `glob` 10.2.0–10.4.5 (via `eslint-config-next`) : `GHSA-5j98-mcp5-4vw2` (command injection).
  - `vite` 8.0.0–8.0.4 (via `vitest`) : path traversal et lecture de fichiers arbitraires.
  - `postcss <8.5.10` : XSS via stringify.
  - `picomatch` : ReDoS.
  Aucune étape `npm audit` ou Dependabot n'apparaît dans `.github/workflows/ci.yml`.
- **Risque :** la CVE Next 14.2.33 est exploitable en production (DoS du serveur SSR). Les autres concernent surtout la chaîne de build/dev, mais elles signalent l'absence de discipline de mise à jour.
- **Correction :**
  1. `npm install next@14.2.35` (compatible plage `^14.2.33` ? non, dépendance actuelle pinnée à `14.2.33`, passer à `^14.2.35`).
  2. `npm audit fix` pour `picomatch`/`vite`/`postcss`.
  3. `npm audit fix --force` pour `eslint-config-next` (saut de version majeure 14 → 16, à valider).
  4. Activer Dependabot (`.github/dependabot.yml`) et ajouter une étape `npm audit --audit-level=high` dans `.github/workflows/ci.yml`.
- **Priorité :** 🟠 Élevée

### Conformités partielles

**[Partiel] Domaine 7 — Journalisation et monitoring** — 🟡 Modérée
- **Règles respectées :** quelques `console.error` capturent les erreurs de l'API data.gouv.fr (`lib/api/datagouv.ts:25,41`).
- **Règles manquantes :** pas d'horodatage UTC explicite, pas de centralisation (Vercel Logs offre une rétention courte par défaut), pas d'alerte sur pic d'erreurs ou indisponibilité de l'API amont.
- **Correction :** activer Vercel Log Drains vers un agrégateur (Loki, Datadog, Better Stack) et configurer une alerte sur taux d'erreurs SSR. Ajouter un endpoint `/api/health` minimal pour le monitoring externe.

**[Partiel] Domaine 12 — Gestion des incidents** — 🟡 Modérée
- **Règles respectées :** code versionné, possibilité de redéploiement immédiat via Git/Vercel.
- **Règles manquantes :** procédure de signalement non documentée, contact CERT (CERT-FR / CERT ministériel DINUM) non mentionné dans le `README.md`. Pas de fichier `SECURITY.md`.
- **Correction :** ajouter un `SECURITY.md` à la racine indiquant le canal de signalement (mail dédié, formulaire) et le contact CERT-FR (`cert-fr.cossi@ssi.gouv.fr`) pour les vulnérabilités critiques. Citer le contact dans le pied de page ou les mentions légales.

---

### Domaines conformes

- Domaine 1 — TLS / HTTPS
- Domaine 2 — Gestion des secrets
- Domaine 5 — Validation des entrées

### Domaines non applicables

- **Domaine 3** — Pas d'authentification, app publique en lecture seule.
- **Domaine 8** — Aucune API exposée par l'app (uniquement consommation de l'API data.gouv.fr en SSR).
- **Domaine 9** — Pas de conteneurs ; déploiement Vercel.
- **Domaine 10** — Hors périmètre du code source.
- **Domaine 11** — App stateless ; backup = dépôt Git/GitHub.

---

### Plan d'action priorisé

1. 🟠 **Patch immédiat Next.js** : `next@14.2.33` → `14.2.35+` (CVE DoS exploitable en prod).
2. 🟠 **Headers de sécurité** : ajouter `headers()` dans `next.config.mjs` (CSP, X-Frame-Options, etc.).
3. 🟠 **CI** : intégrer `npm audit --audit-level=high` + Dependabot.
4. 🟡 **SECURITY.md** : documenter procédure de signalement.
5. 🟡 **Log drain** : centraliser les logs Vercel.
