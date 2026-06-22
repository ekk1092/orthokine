/**
 * OrthoKine Namespace - Theme Controller Module
 */
window.OrthoKine = window.OrthoKine || {};

(function () {
  function initTheme() {
    const toggleBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("ok_theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);
    updateThemeUI(currentTheme);

    toggleBtn.addEventListener("click", () => {
      const theme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("ok_theme", theme);
      updateThemeUI(theme);
    });
  }

  function updateThemeUI(theme) {
    const themeIcon = document.getElementById("theme-icon");
    const themeText = document.getElementById("theme-text");
    
    if (!themeIcon || !themeText) return;

    const newIcon = document.createElement("i");
    newIcon.id = "theme-icon";

    if (theme === "dark") {
      // Active theme is dark -> Show action to switch to light theme
      newIcon.setAttribute("data-lucide", "sun");
      themeText.setAttribute("data-i18n", "theme_light");
      themeText.textContent = OrthoKine.getTranslation('theme_light') || "Mode Clair";
    } else {
      // Active theme is light -> Show action to switch to dark theme
      newIcon.setAttribute("data-lucide", "moon");
      themeText.setAttribute("data-i18n", "theme_dark");
      themeText.textContent = OrthoKine.getTranslation('theme_dark') || "Mode Sombre";
    }

    themeIcon.replaceWith(newIcon);
    lucide.createIcons();
  }

  OrthoKine.initTheme = initTheme;
  OrthoKine.updateThemeUI = updateThemeUI;
})();
