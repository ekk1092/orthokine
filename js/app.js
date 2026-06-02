/**
 * OrthoKine Namespace - Main Orchestrator & Bootstrapper Module
 */
window.OrthoKine = window.OrthoKine || {};

(function() {
  // DOMContentLoaded orchestrator
  document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Active theme
    OrthoKine.initTheme();
    
    // 2. Initialize Routing and navigation controllers
    OrthoKine.initRouter();
    OrthoKine.initMobileControls();
    
    // 3. Initialize Forms and modals selectors
    OrthoKine.initForms();
    
    // 4. Initialize Clinical session authentication
    OrthoKine.initAuthentication();
    
    // 5. Initialize Localization translations
    initLocalSettings();
    
    // 6. Draw all UI stats and views
    OrthoKine.renderAll();
  });

  // Settings screen language saving action
  function initLocalSettings() {
    const langSelector = document.getElementById("language-selector");
    const saveBtn = document.getElementById("save-settings-btn");
    const store = OrthoKine.store;

    saveBtn.addEventListener("click", () => {
      store.lang = langSelector.value;
      store.save();
      translateLocalDOM();
      OrthoKine.renderAll();
      
      const successMessages = {
        fr: "Paramètres enregistrés avec succès !",
        en: "Settings saved successfully!",
        es: "¡Ajustes guardados con éxito!"
      };
      alert(OrthoKine.getLangValue(successMessages));
    });

    translateLocalDOM();
  }

  function translateLocalDOM() {
    const currentLang = OrthoKine.store.lang;
    document.documentElement.setAttribute("lang", currentLang);

    // Translate [data-i18n] text elements
    document.querySelectorAll("[data-i18n]").forEach(elem => {
      const key = elem.getAttribute("data-i18n");
      const translatedValue = OrthoKine.getTranslation(key);
      if (translatedValue) {
        const icon = elem.querySelector("i");
        if (icon) {
          const textSpan = elem.querySelector("span");
          if (textSpan) {
            textSpan.textContent = translatedValue;
          }
        } else {
          elem.textContent = translatedValue;
        }
      }
    });

    // Translate input placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach(elem => {
      const key = elem.getAttribute("data-i18n-placeholder");
      const translatedValue = OrthoKine.getTranslation(key);
      if (translatedValue) {
        elem.setAttribute("placeholder", translatedValue);
      }
    });

    // Update translations theme tags
    OrthoKine.updateThemeUI(localStorage.getItem("ok_theme") || "light");
  }

  OrthoKine.translateLocalDOM = translateLocalDOM;
})();
