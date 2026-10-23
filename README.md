# Rustam Ganiev — Frontend Portfolio

[![Portfolio CI and Pages](https://github.com/developerRustam/Portfolio/actions/workflows/pages.yml/badge.svg)](https://github.com/developerRustam/Portfolio/actions/workflows/pages.yml)
[![Live site](https://img.shields.io/badge/live-GitHub%20Pages-087f70)](https://developerrustam.github.io/Portfolio/)

Bilingual portfolio site for a frontend developer focused on React and TypeScript. It presents verified commercial experience, selected projects, professional contacts, and technical strengths without subjective percentage ratings.

## Highlights

- Russian and English content
- Current work history and professional contacts
- Selected GitHub projects with live links where available
- Responsive light and dark themes
- Accessible navigation and visible keyboard focus
- Automated tests, type checking, production build, and GitHub Pages deployment

## Stack

- React
- TypeScript
- Vite
- i18next / react-i18next
- SCSS
- GitHub Actions and GitHub Pages

## Local development

```bash
npm ci
npm start
```

The development server uses the `/Portfolio/` base path.

## Verification

```bash
npm test
npm run build
npm audit --audit-level=high
```

`npm run build` includes TypeScript checking before the Vite production build.

## Deployment

Pushes to `master` run the verification workflow and deploy `dist/` to GitHub Pages. Pull requests run the same tests and production build without deploying.

## Content source

Confirmed contacts, skills, projects, and work-history entries are stored in [`src/shared/config/profile/profile.json`](src/shared/config/profile/profile.json). UI components consume that file so Russian and English pages stay consistent.
