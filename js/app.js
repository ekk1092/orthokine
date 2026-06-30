/**
 * OrthoKine Namespace - Main Orchestrator & Bootstrapper Module (v2.0)
 */
window.OrthoKine = window.OrthoKine || {};

(function () {
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme
    OrthoKine.initTheme();

    // 2. Router / navigation
    OrthoKine.initRouter();

    // 3. Forms & modals
    OrthoKine.initForms();

    // 4. Authentication (multi-role)
    OrthoKine.initAuthentication();

    // 5. Localization
    initLocalSettings();

    // 6. Initial render (if already logged in, applyRole called inside auth)
    if (OrthoKine.store.currentUser) {
      OrthoKine.renderAll();
    }
  });

  function initLocalSettings() {
    const langSelector = document.getElementById('language-selector');
    const saveBtn      = document.getElementById('save-settings-btn');
    const store        = OrthoKine.store;

    if (langSelector) langSelector.value = store.lang;

    saveBtn?.addEventListener('click', () => {
      store.lang = langSelector.value;
      store.save();
      applyTranslations();
      OrthoKine.renderAll();
      alert({ fr: 'Paramètres enregistrés !', en: 'Settings saved!', es: '¡Ajustes guardados!' }[store.lang] || 'Saved!');
    });

    applyTranslations();
  }

  function applyTranslations() {
    const lang = OrthoKine.store.lang;
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = OrthoKine.getTranslation(key);
      if (!val) return;
      const textSpan = el.querySelector('span');
      if (textSpan) { textSpan.textContent = val; }
      else          { el.textContent = val; }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = OrthoKine.getTranslation(key);
      if (val) el.setAttribute('placeholder', val);
    });

    OrthoKine.updateThemeUI(localStorage.getItem('ok_theme') || 'light');
  }

  OrthoKine.applyTranslations = applyTranslations;
  OrthoKine.translateLocalDOM  = applyTranslations; // backward compat
})();
