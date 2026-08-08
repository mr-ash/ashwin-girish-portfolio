# Ashwin Girish — Portfolio

A Next.js version of the Figma-inspired UX portfolio, cloned from the original single-page HTML design.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `app/` — Next.js App Router layout, global styles, and home page
- `components/portfolio/` — Section components and interactive features (theme toggle, sticker studio, quick connect, cursors)
- `lib/sticker-utils.ts` — Canvas utilities for the sticker studio
- `public/` — Static assets (case study HTML, résumé PDF)

## Static assets

Add your résumé PDF to:

```
public/Ashwin_Girish_Resume_2025.pdf
```

The Mewurk timesheet case study is included at `public/mewurk-timesheet-case-study.html`.
The Spot-to-Plot case study is included at `public/spot-to-plot-case-study.html`.

## Features

- Dark / light theme toggle
- Custom Figma-style cursors (You + Ashwin buddy)
- Quick connect modal
- Sticker studio (draw or pick from pack, drag anywhere)
- Scroll reveal animations
- Live Dublin & Kochi clocks in the footer

## Deploy

```bash
npm run build
npm start
```

Deploy to [Vercel](https://vercel.com) or any Node.js host that supports Next.js.
