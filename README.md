# OCP21 Prep

Application web de préparation quotidienne à l’examen **Oracle Certified Professional Java SE 21 (1Z0-830)**.

- Interface et énoncés en **français** ; code Java et identifiants en **anglais** (comme à l’examen)
- Plan de **30 jours** (~20 questions/jour, ~600 au total)
- Progression persistée en `localStorage` (reprise après fermeture d’onglet / téléphone)
- SPA statique : fonctionne dans Cursor (**Try Live** / `npm run dev`) et hors Cursor (navigateur mobile / GitHub Pages)

## Lancer en local

```bash
cd web
npm install
npm run dev
```

Ouvrez l’URL affichée (souvent `http://localhost:5173/OCP21_training/`).

### Sur téléphone (même Wi‑Fi)

```bash
cd web
npm run dev -- --host
```

Utilisez l’URL réseau affichée par Vite (ex. `http://192.168.x.x:5173/OCP21_training/`).

### Build de production

```bash
cd web
npm run build
npm run preview
```

## GitHub Pages

Le workflow `.github/workflows/deploy-pages.yml` construit `web/` et déploie sur Pages à chaque push sur `main`.

URL publique (après activation Pages + premier déploiement) :

**https://mykamla.github.io/OCP21_training/**

Dans les réglages du dépôt : *Settings → Pages → Source = GitHub Actions*.

## Structure

```
web/
  src/
    data/days/     # banques JSON/TS par jour (day01…day30)
    pages/         # Accueil, session jour, résultats
    hooks/         # persistence localStorage
  vite.config.ts   # base: /OCP21_training/
```

## Parcours

| Jours | Thèmes |
|------:|--------|
| 1–3 | Primitives, wrappers, Math, String, StringBuilder, text blocks, Date-Time |
| 4–5 | Contrôle de flux |
| 6–11 | POO (classes, records, sealed, héritage, interfaces, enums, pattern matching) |
| 12–13 | Exceptions |
| 14–16 | Tableaux & collections |
| 17–20 | Streams & lambdas |
| 21–22 | Modules |
| 23–25 | Concurrence & virtual threads |
| 26–27 | I/O / NIO.2 & sérialisation |
| 28 | Localisation |
| 29–30 | Examens blancs mixtes |

Pas de JDBC (hors périmètre 1Z0-830 ciblé ici).
