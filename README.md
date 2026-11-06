# Rif Business Desk — Concept Demo

Site de démonstration Innovatechs (portfolio, concept n°10) : création d'entreprise, domiciliation et accompagnement administratif à Al Hoceima.
Marque, adresse et contenus **fictifs** — ce n'est pas le site d'un cabinet réel, ni d'une administration.

## Parcours principal

Service → formulaire de consultation en 3 étapes (projet · disponibilités · coordonnées + consentement loi 09-08) → récapitulatif → message WhatsApp pré-rempli.

## Stack

React 19 · Vite 6 · TypeScript · Tailwind CSS 4 · React Router 7 · Vitest. Site statique, déployé sur Vercel.

- Langues : français (défaut), arabe (RTL), anglais — préfixe d'URL `/fr`, `/ar`, `/en`.
- Textes : `src/i18n/*.ts` (typés : une traduction manquante fait échouer le build) · services : `src/data/services.ts`.
- Numéro WhatsApp : `VITE_WHATSAPP_NUMBER` (défaut : ligne Innovatechs).

## Commandes

```bash
npm install
npm run dev      # développement
npm test         # tests (validation par étape + message WhatsApp)
npm run build    # build de production dans dist/
```

## Mentions

Informations générales, ne remplacent pas un conseil juridique ou fiscal. Aucune affiliation à une administration publique.
Photos : Unsplash (licence Unsplash).
# rif-business-desk
