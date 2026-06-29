/**
 * OrthoKine Namespace - Router & Navigation Module (v2.0)
 */
window.OrthoKine = window.OrthoKine || {};

(function () {

  const TAB_TITLES = {
    dashboard:   { fr: 'Tableau de bord',      en: 'Dashboard',         es: 'Panel Principal' },
    sessions:    { fr: 'Sessions',              en: 'Sessions',          es: 'Sesiones' },
    mon_equipe:  { fr: 'Mon Équipe',            en: 'My Team',           es: 'Mi Equipo' },
    patients:    { fr: 'Patients',              en: 'Patients',          es: 'Pacientes' },
    appointments:{ fr: 'Rendez-vous',           en: 'Appointments',      es: 'Citas' },
    team:        { fr: 'Praticiens',            en: 'Practitioners',     es: 'Practicantes' },
    settings:    { fr: 'Paramètres',            en: 'Settings',          es: 'Configuración' },
  };

  OrthoKine.currentCalendarMonth = new Date().getMonth();
  OrthoKine.currentCalendarYear  = new Date().getFullYear();

  function initRouter() {
    // Mobile menu toggle
    const toggleBtn  = document.getElementById('mobile-menu-toggle');
    const sidebar    = document.getElementById('app-sidebar');
    const backdrop   = document.getElementById('sidebar-backdrop');
    const brandLink  = document.getElementById('brand-home-link');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        backdrop.classList.toggle('active');
      });
    }
    if (backdrop) {
      backdrop.addEventListener('click', () => {
        sidebar.classList.remove('open');
        backdrop.classList.remove('active');
      });
    }
    if (brandLink) {
      brandLink.addEventListener('click', () => navigateTo('dashboard'));
    }

    // Nav link clicks (event delegation)
    document.querySelector('.nav-links').addEventListener('click', (e) => {
      const link = e.target.closest('.nav-link[data-tab]');
      if (!link) return;
      e.preventDefault();
      navigateTo(link.dataset.tab);
      // Close mobile sidebar
      sidebar.classList.remove('open');
      backdrop.classList.remove('active');
    });

    // Set initial active tab
    navigateTo('dashboard');
  }

  function navigateTo(tab) {
    // Deactivate all nav links & panes
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

    // Activate target link
    const targetLink = document.querySelector(`.nav-link[data-tab="${tab}"]`);
    if (targetLink) targetLink.classList.add('active');

    // Activate target pane
    const targetPane = document.getElementById(tab);
    if (targetPane) targetPane.classList.add('active');

    // Update page title
    const titleEl = document.getElementById('current-tab-title');
    if (titleEl) {
      const lang   = OrthoKine.store.lang || 'fr';
      const titles = TAB_TITLES[tab];
      titleEl.textContent = titles ? (titles[lang] || titles.fr) : tab;
    }

    // Live clock badge
    _updateLiveClock();

    // Trigger tab-specific render
    if (tab === 'appointments') {
      OrthoKine.renderCalendar(OrthoKine.currentCalendarMonth, OrthoKine.currentCalendarYear);
      lucide.createIcons();
    } else if (tab === 'dashboard') {
      OrthoKine.renderDashboard();
      lucide.createIcons();
    }
  }

  function _updateLiveClock() {
    const badge = document.getElementById('live-time-badge');
    if (!badge) return;
    const now    = new Date();
    const days   = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
    const months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
    badge.textContent = `${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  }

  OrthoKine.initRouter  = initRouter;
  OrthoKine.navigateTo  = navigateTo;
})();
