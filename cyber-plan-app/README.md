# cursor/develop-the-cybersecurity-learning-app-5cec
# Cybersecurity Learning Plan App

A modern Vue 3 application for managing and tracking your cybersecurity learning journey.

## Tech Stack
- Vue 3 + Vite + TypeScript
- Pinia (state management)
- Vue Router (routing)
- TailwindCSS (with dark mode)
- vue-i18n (English/Arabic)
- Dexie.js (local database)
- jsPDF, html2canvas, Turndown (export)

## Project Structure
```
cyber-plan-app/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── store/
│   ├── database/
│   ├── exports/
│   ├── router/
│   ├── utils/
│   ├── App.vue
│   └── main.ts
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── package.json
└── tsconfig.json
```

## Getting Started
```bash
npm install
npm run dev
```

## Features
- Dashboard, daily view, notebook, achievements, calendar, skill matrix
- Pomodoro timer, markdown editor, drawing board
- Data export (PDF/Markdown)
- English/Arabic support
- Dark mode

---

This is a work in progress. See the `src/pages` and `src/components` for the main app structure.

# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

