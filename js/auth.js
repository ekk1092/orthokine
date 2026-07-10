/**
 * OrthoKine Namespace - Authentication & Session Module (v2.0)
 */
window.OrthoKine = window.OrthoKine || {};

(function () {
  
  const ROLE_LABELS = {
    chef_service: 'Chef de Service',
    chef_session: 'Chef de Session',
    praticien:    'Praticien',
  };

  const ROLE_ICONS = {
    chef_service: 'shield-check',
    chef_session: 'award',
    praticien:    'stethoscope',
  };

  function initAuthentication() {
    const loginForm   = document.getElementById('login-form');
    const loginScreen = document.getElementById('login-screen');
    const mainApp     = document.getElementById('main-app');
    const errorMsg    = document.getElementById('login-error-msg');
    const store       = OrthoKine.store;

    // Auto-restore session
    if (store.currentUser) {
      _showApp(loginScreen, mainApp);
    } else {
      loginScreen.style.display = 'flex';
      mainApp.style.display     = 'none';
    }

    // Password visibility toggle
    const pwToggle = document.getElementById('password-toggle');
    const pwInput  = document.getElementById('login-password');

    pwToggle.addEventListener('click', () => {
      const isHidden = pwInput.type === 'password';
      pwInput.type = isHidden ? 'text' : 'password';
      const iconName = isHidden ? 'eye-off' : 'eye';
      pwToggle.innerHTML = `<i data-lucide="${iconName}"></i>`;
      lucide.createIcons({ nodes: [pwToggle] });
      pwToggle.setAttribute('aria-label', isHidden ? 'Masquer le mot de passe' : 'Afficher le mot de passe');
    });

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email    = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;
      const user     = store.login(email, password);

      if (user) {
        errorMsg.style.display = 'none';
        loginScreen.style.opacity    = '0';
        loginScreen.style.transition = 'opacity 0.4s ease';

        setTimeout(() => {
          loginScreen.style.display = 'none';
          loginScreen.style.opacity = '1';
          _showApp(loginScreen, mainApp);
          OrthoKine.applyRole();
          OrthoKine.renderAll();
        }, 400);
      } else {
        errorMsg.style.display = 'block';
        errorMsg.classList.add('shake');
        setTimeout(() => errorMsg.classList.remove('shake'), 500);
      }
    });

    // Logout
    document.getElementById('logout-btn').addEventListener('click', () => {
      store.logout();
      mainApp.style.display     = 'none';
      loginScreen.style.display = 'flex';
      document.getElementById('login-password').value = '';
      // Reset to dashboard tab visually
      const dashLink = document.querySelector('[data-tab="dashboard"]');
      if (dashLink) dashLink.click();
    });
  }

  function _showApp(loginScreen, mainApp) {
    loginScreen.style.display = 'none';
    mainApp.style.display     = 'flex';
    OrthoKine.applyRole();
    OrthoKine.renderAll();
  }

  /** Apply role-based UI visibility */
  function applyRole() {
    const user  = OrthoKine.store.currentUser;
    if (!user) return;

    const role  = user.role;
    const store = OrthoKine.store;

    // Update sidebar user info
    const avatarEl = document.getElementById('user-avatar-initials');
    const nameEl   = document.getElementById('user-display-name');
    const roleEl   = document.getElementById('user-role-label');
    const badgeEl  = document.getElementById('user-role-badge');

    if (avatarEl) avatarEl.textContent = user.initials || user.name.slice(0, 2).toUpperCase();
    if (nameEl)   nameEl.textContent   = user.name;
    if (roleEl)   roleEl.textContent   = ROLE_LABELS[role] || role;

    if (badgeEl) {
      badgeEl.textContent  = ROLE_LABELS[role] || role;
      badgeEl.className    = 'role-badge role-' + role;
    }

    // Show session badge for chef_session / praticien
    const sessionBadgeWrap = document.getElementById('session-badge-header');
    if (sessionBadgeWrap) {
      if (role !== 'chef_service') {
        const sess = store.getSessionForUser(user.id);
        sessionBadgeWrap.style.display = 'inline-flex';
        const sessNameEl = document.getElementById('session-badge-name');
        if (sessNameEl && sess) sessNameEl.textContent = sess.name;
      } else {
        sessionBadgeWrap.style.display = 'none';
      }
    }

    // Toggle nav links visibility
    const navLinks = document.querySelectorAll('.nav-link[data-roles]');
    navLinks.forEach(link => {
      const allowed = link.dataset.roles.split(',').map(r => r.trim());
      link.style.display = allowed.includes(role) ? 'flex' : 'none';
    });

    // Toggle action buttons based on role
    _applyActionVisibility(role);
  }

  function _applyActionVisibility(role) {
    // "Planifier un RDV" global button: chef_session & praticien only (not chef_service)
    const rdvBtn = document.getElementById('global-new-rdv-btn');
    if (rdvBtn) rdvBtn.style.display = (role === 'chef_service') ? 'none' : 'flex';

    // "Nouveau Premier RDV" button: chef_session only
    const firstRdvBtn = document.getElementById('global-new-first-rdv-btn');
    if (firstRdvBtn) firstRdvBtn.style.display = (role === 'chef_session') ? 'flex' : 'none';
  }

  OrthoKine.initAuthentication = initAuthentication;
  OrthoKine.applyRole          = applyRole;
  OrthoKine.ROLE_LABELS        = ROLE_LABELS;
  OrthoKine.ROLE_ICONS         = ROLE_ICONS;
})();
