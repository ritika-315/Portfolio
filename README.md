# Ritika Srivastava | Software Engineer

A responsive, dark portfolio focused on Python, backend, and full-stack development.

[Live portfolio](https://portfolio-flame-ten-r3u0s99zxp.vercel.app/) · [GitHub](https://github.com/ritika-315/)

## Stack and sections

React, Vite, Tailwind CSS, Framer Motion, and Lucide React. The static build is compatible with Vercel.

The page includes navigation, a hero, About, Technical Skills, Featured Projects, Experience, Publication and Leadership, Contact, and a footer. It supports keyboard navigation, a mobile menu, and reduced-motion preferences. Contact uses direct email, LinkedIn, and GitHub links; no environment variables are required.

## Local development

Use Node.js 22.12+ and npm.

```bash
git clone https://github.com/ritika-315/Portfolio.git
cd Portfolio
npm ci
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

```bash
npm run lint
npm run build
npm run preview
```

The production build is written to `dist/`. `npm run preview` serves that build locally.

## Content and assets

Portfolio content and repository links are in `src/App.jsx`; styles are in `src/index.css`. Project screenshots and the current résumé are in `public/`. The résumé link must remain `/Ritika_Srivastava_Resume.pdf`.

Project demo buttons remain hidden until public functionality is verified. The live portfolio reflects the last deployment, not uncommitted local changes.
