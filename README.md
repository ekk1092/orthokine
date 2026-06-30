# OrthoKine Practice Portal 🏥✨

An elegant, premium, lightweight Single Page Application (SPA) custom-tailored for a speech therapy (**orthophonie**) and physiotherapy (**kinésithérapie**) practice.

This portal enables clinical directors to manage their team of therapists, register patient profiles, and coordinate appointment schedules (**RDVs**) seamlessly — with zero server dependency, zero installation, and 100% offline data resilience via `localStorage`.

---

## 🚀 Live Demo

The app is deployed on Vercel:

> **[https://orthokine.vercel.app](https://orthokine.vercel.app/)**

### Demo Credentials

| Role            | Email                   | Password   |
| --------------- | ----------------------- | ---------- |
| Chef de Service | chef@orthokine.com      | chef2026   |
| Chef de Session | pediatrie@orthokine.com | session123 |
| Praticien       | sophie@orthokine.com    | kine123    |

---

## 🖥️ Run Locally

```bash
# Option 1 — Direct open (no server needed for basic use)
open index.html

# Option 2 — Python dev server (recommended)
python3 -m http.server 8000
# Then open http://localhost:8000

# Option 3 — npx serve
npx serve .
```

---

## 🚢 Deploy to Vercel

The project includes a `vercel.json` pre-configured for SPA routing, security headers, and long-term asset caching.

```bash
# Install Vercel CLI (one-time)
npm i -g vercel

# Deploy
vercel --prod
```

Or connect the GitHub repo via the [Vercel Dashboard](https://vercel.com/new) for automatic deploys on every push.

> **Cache busting**: All assets are versioned with `?v=2.0`. Bump this string in `index.html` before deploying a new version to guarantee users receive updated files.

---

## 🎨 Core Design

- **Fluent Glassmorphic Panels** — backdrop-blur glass cards layered on gradient backgrounds
- **Dark / Light Dual Mode** — smooth HSL CSS custom property transitions
- **Top-Layer Modal Animations** — native `<dialog>` with `@starting-style` transitions
- **Fully Mobile Responsive** — hamburger menu, slide-in sidebar, stacking grids

---

## 🛠️ Tech Stack

| Layer     | Technology                                                                |
| --------- | ------------------------------------------------------------------------- |
| Structure | HTML5 Semantic (`<dialog>`, semantic grids)                             |
| Styling   | Pure CSS3 (custom properties,`@media`, glassmorphism)                   |
| Logic     | Vanilla JS — modular IIFE namespacing,`localStorage` CRUD              |
| Icons     | [Lucide](https://lucide.dev/) — self-hosted (`js/vendor/lucide.min.js`) |

---

## 📁 Project Structure

```
eager-mendeleev/
├── index.html            # App shell & all modals
├── index.css             # Full design system
├── vercel.json           # Vercel SPA config + security headers
├── js/
│   ├── vendor/
│   │   └── lucide.min.js # Self-hosted Lucide icons
│   ├── translations.js   # i18n strings (fr/en/es)
│   ├── store.js          # LocalStorage state engine
│   ├── theme.js          # Dark/light mode toggle
│   ├── router.js         # Tab navigation + mobile sidebar
│   ├── auth.js           # Login/logout + role-based UI
│   ├── ui.js             # View render engine
│   ├── forms.js          # Modal form handlers
│   └── app.js            # Bootstrap orchestrator
└── README.md
```
