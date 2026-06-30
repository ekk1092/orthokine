# OrthoKine Practice Portal 🏥✨

An elegant, premium, lightweight Single Page Application (SPA) custom-tailored for a speech therapy (**orthophonie**) and physiotherapy (**kinésithérapie**) practice.

This portal enables clinical directors (like your uncle) to manage their team of therapists, register patient profiles, and coordinate appointment schedules (**RDVs**) seamlessly with zero server dependency, zero installation latency, and 100% offline data resilience.

---

## 🚀 How to Run Locally

You can launch and use the app instantly:

1. **Direct Double-Click**:
   Simply open [index.html](index.html) in any modern desktop browser (Chrome, Safari, Firefox, or Edge).
2. **Using a Dev Server (Recommended)**:
   If you have Python installed, spin up a local server inside the project folder:

   ```bash
   python -m http.server 8000
   ```

   Then open `http://localhost:8000` in your web browser.

---

## 🎨 Core Design Aesthetics

- **Fluent Glassmorphic Accent Panels**: Provides dynamic background-blur panels layered beautifully on gradient backdrops.
- **Vibrant Dark/Light Dual Mode**: Integrated transition animations utilizing CSS custom HSL tokens.
- **Top Layer Animations**: Modal dialogs use CSS `@starting-style` and discrete transition behaviors (`transition-behavior: allow-discrete`) for beautiful, modern pop-in/pop-out visual flows.
- **Responsive Layout**: Adapts smoothly to tablets and large desktop monitors.

---

## 🛠️ Main Tech Stack

- **Structure**: HTML5 Semantic Architecture (using native `<dialog>` and responsive grids).
- **Styling**: Pure CSS3 utilizing CSS Custom Properties, smooth cubic-bezier transitions, and modern element queries.
- **Logic**: Vanilla JavaScript featuring modular client-side state engines backed by LocalStorage, complete CRUD capabilities, and fully reactive view-binding.
- **Aesthetic Assets**: Loaded directly via Lucide Icons CDN.
