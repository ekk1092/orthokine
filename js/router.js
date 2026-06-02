/**
 * OrthoKine Namespace - Router & Navigation Module
 */
window.OrthoKine = window.OrthoKine || {};

(function() {
  function initRouter() {
    const links = document.querySelectorAll(".nav-link");
    const panes = document.querySelectorAll(".tab-pane");
    const title = document.getElementById("current-tab-title");

    links.forEach(link => {
      link.addEventListener("click", () => {
        const targetTab = link.getAttribute("data-tab");
        
        links.forEach(l => l.classList.remove("active"));
        panes.forEach(p => p.classList.remove("active"));

        link.classList.add("active");
        const targetPane = document.getElementById(targetTab);
        if (targetPane) targetPane.classList.add("active");

        // Update header title beautifully using dynamic localization keys
        const translationKey = link.querySelector("span").getAttribute("data-i18n");
        title.textContent = OrthoKine.getTranslation(translationKey) || link.querySelector("span").textContent;
        
        // Render components dynamically based on target view
        OrthoKine.renderAll();
      });
    });

    // Topleft Brand Logo click action: Always go back to Home (Dashboard)
    document.getElementById("brand-home-link").addEventListener("click", () => {
      document.querySelector('[data-tab="dashboard"]').click();
    });

    // User Profile at bottom click action: Always go to Profile tab and set active
    document.getElementById("user-profile-trigger").addEventListener("click", () => {
      // Hide active tabs
      links.forEach(l => l.classList.remove("active"));
      panes.forEach(p => p.classList.remove("active"));

      // Activate Profile Tab
      document.getElementById("profile").classList.add("active");
      
      // Localize header title
      const profileTitles = { fr: "Mon Profil", en: "My Profile", es: "Mi Perfil" };
      title.textContent = OrthoKine.getLangValue(profileTitles);

      OrthoKine.renderAll();
    });

    // Shortcut dashboard actions
    document.getElementById("dash-quick-patient-btn").addEventListener("click", () => {
      OrthoKine.openPatientModal();
    });
    
    document.getElementById("dash-view-calendar-btn").addEventListener("click", () => {
      document.querySelector('[data-tab="appointments"]').click();
    });

    document.getElementById("dash-view-team-btn").addEventListener("click", () => {
      document.querySelector('[data-tab="team"]').click();
    });
  }

  // Hamburger drawer controls
  function initMobileControls() {
    const toggleBtn = document.getElementById("mobile-menu-toggle");
    const sidebar = document.getElementById("app-sidebar");
    const backdrop = document.getElementById("sidebar-backdrop");

    const closeSidebar = () => {
      sidebar.classList.remove("open");
      backdrop.classList.remove("active");
    };

    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      backdrop.classList.toggle("active");
    });

    backdrop.addEventListener("click", closeSidebar);

    // Close mobile sidebar on any navigation link selection
    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 992) {
          closeSidebar();
        }
      });
    });

    document.getElementById("brand-home-link").addEventListener("click", () => {
      if (window.innerWidth <= 992) {
        closeSidebar();
      }
    });

    document.getElementById("user-profile-trigger").addEventListener("click", () => {
      if (window.innerWidth <= 992) {
        closeSidebar();
      }
    });
  }

  OrthoKine.initRouter = initRouter;
  OrthoKine.initMobileControls = initMobileControls;
})();
