/**
 * OrthoKine Portal - SPA State Management, Localization & UI Controllers
 * Built with vanilla JavaScript, LocalStorage persistence, and responsiveness controls.
 */

// --- TRANSLATION DICTIONARY ---
const TRANSLATIONS = {
  login_subtitle: {
    fr: "Portail de Gestion Clinique",
    en: "Clinical Management Portal",
    es: "Portal de Gestión Clínica"
  },
  login_email_label: {
    fr: "Adresse E-mail",
    en: "Email Address",
    es: "Correo Electrónico"
  },
  login_password_label: {
    fr: "Mot de passe",
    en: "Password",
    es: "Contraseña"
  },
  login_error: {
    fr: "Adresse e-mail ou mot de passe incorrect.",
    en: "Incorrect email address or password.",
    es: "Correo electrónico o contraseña incorrectos."
  },
  login_btn: {
    fr: "Se connecter",
    en: "Sign In",
    es: "Iniciar Sesión"
  },
  sidebar_subtitle: {
    fr: "Portail Clinique",
    en: "Practice Portal",
    es: "Portal de la Clínica"
  },
  nav_dashboard: {
    fr: "Tableau de bord",
    en: "Dashboard",
    es: "Tablero de Control"
  },
  nav_patients: {
    fr: "Patients",
    en: "Patients",
    es: "Pacientes"
  },
  nav_appointments: {
    fr: "Rendez-vous",
    en: "Appointments",
    es: "Citas"
  },
  nav_team: {
    fr: "Membres d'équipe",
    en: "Team Members",
    es: "Miembros del Equipo"
  },
  nav_settings: {
    fr: "Paramètres",
    en: "Settings",
    es: "Ajustes"
  },
  theme_light: {
    fr: "Mode Clair",
    en: "Light Mode",
    es: "Modo Claro"
  },
  theme_dark: {
    fr: "Mode Sombre",
    en: "Dark Mode",
    es: "Modo Oscuro"
  },
  user_role: {
    fr: "Directeur Clinique",
    en: "Clinical Director",
    es: "Director Clínico"
  },
  btn_schedule_apt: {
    fr: "Planifier un RDV",
    en: "Schedule Appointment",
    es: "Programar Cita"
  },
  stat_sessions: {
    fr: "RDV Aujourd'hui",
    en: "RDV Today",
    es: "Citas de Hoy"
  },
  stat_patients: {
    fr: "Patients Actifs",
    en: "Active Patients",
    es: "Pacientes Activos"
  },
  stat_team: {
    fr: "Membres Équipe",
    en: "Team Size",
    es: "Tamaño del Equipo"
  },
  stat_hours: {
    fr: "Heures de Session",
    en: "Session Hours",
    es: "Horas de Sesión"
  },
  dash_sessions_title: {
    fr: "Sessions planifiées aujourd'hui",
    en: "Scheduled Sessions Today",
    es: "Sesiones Programadas para Hoy"
  },
  dash_actions_title: {
    fr: "Actions Rapides",
    en: "Quick Actions",
    es: "Acciones Rápidas"
  },
  action_new_patient: {
    fr: "Créer un profil patient",
    en: "Add New Patient Profile",
    es: "Registrar Nuevo Paciente"
  },
  action_view_calendar: {
    fr: "Ouvrir le calendrier général",
    en: "Open Main Calendar",
    es: "Abrir Calendario General"
  },
  action_manage_team: {
    fr: "Gérer l'équipe",
    en: "Manage Team Rotations",
    es: "Gestionar Equipo"
  },
  patients_title: {
    fr: "Registre des Patients",
    en: "Patient Registry",
    es: "Registro de Pacientes"
  },
  search_placeholder: {
    fr: "Rechercher par nom...",
    en: "Search by name...",
    es: "Buscar por nombre..."
  },
  btn_register_patient: {
    fr: "Enregistrer Patient",
    en: "Register Patient",
    es: "Registrar Paciente"
  },
  th_p_name: {
    fr: "Nom du Patient",
    en: "Patient Name",
    es: "Nombre del Paciente"
  },
  th_p_age: {
    fr: "Âge / Genre",
    en: "Age / Gender",
    es: "Edad / Género"
  },
  th_p_condition: {
    fr: "Diagnostic principal",
    en: "Main Condition",
    es: "Diagnóstico Principal"
  },
  th_p_therapist: {
    fr: "Thérapeute assigné",
    en: "Assigned Therapist",
    es: "Terapeuta Asignado"
  },
  th_p_contact: {
    fr: "Contact principal",
    en: "Primary Contact",
    es: "Contacto Principal"
  },
  th_p_status: {
    fr: "Statut",
    en: "Status",
    es: "Estado"
  },
  th_p_actions: {
    fr: "Actions",
    en: "Actions",
    es: "Acciones"
  },
  filter_all_therapists: {
    fr: "Tous les thérapeutes",
    en: "All Therapists",
    es: "Todos los Terapeutas"
  },
  cal_today: {
    fr: "Aujourd'hui",
    en: "Today",
    es: "Hoy"
  },
  day_mon: { fr: "Lun", en: "Mon", es: "Lun" },
  day_tue: { fr: "Mar", en: "Tue", es: "Mar" },
  day_wed: { fr: "Mer", en: "Wed", es: "Mié" },
  day_thu: { fr: "Jeu", en: "Thu", es: "Jue" },
  day_fri: { fr: "Ven", en: "Fri", es: "Vie" },
  day_sat: { fr: "Sam", en: "Sat", es: "Sáb" },
  day_sun: { fr: "Dim", en: "Sun", es: "Dom" },
  team_title: {
    fr: "Notre Équipe de Praticiens",
    en: "Our Team & Staff",
    es: "Nuestro Equipo Médico"
  },
  btn_add_team: {
    fr: "Ajouter un praticien",
    en: "Add Team Member",
    es: "Añadir Miembro"
  },
  settings_title: {
    fr: "Paramètres Généraux",
    en: "General Settings",
    es: "Ajustes Generales"
  },
  settings_lang_label: {
    fr: "Langue de l'application",
    en: "Application Language",
    es: "Idioma de la Aplicación"
  },
  settings_lang_hint: {
    fr: "Le changement de langue mettra à jour instantanément toutes les interfaces et formulaires.",
    en: "Changing the language will instantly update all interfaces and forms.",
    es: "El cambio de idioma actualizará instantáneamente todas las interfaces y formularios."
  },
  settings_save_btn: {
    fr: "Enregistrer les modifications",
    en: "Save Changes",
    es: "Guardar Cambios"
  },
  profile_specialty: {
    fr: "Orthophoniste & Directeur Clinique",
    en: "Orthophonist & Clinical Director",
    es: "Logopeda y Director Clínico"
  },
  profile_email_label: {
    fr: "Identifiant E-mail",
    en: "Clinical Email",
    es: "Correo Clínico"
  },
  profile_privileges: {
    fr: "Permissions",
    en: "Permissions",
    es: "Permisos"
  },
  profile_role_admin: {
    fr: "Administrateur",
    en: "Administrator",
    es: "Administrador"
  },
  profile_logout_btn: {
    fr: "Se déconnecter",
    en: "Log Out",
    es: "Cerrar Sesión"
  },
  modal_patient_new: {
    fr: "Enregistrer Nouveau Patient",
    en: "Register New Patient",
    es: "Registrar Nuevo Paciente"
  },
  form_p_name: {
    fr: "Nom Complet",
    en: "Full Name",
    es: "Nombre Completo"
  },
  form_p_age: {
    fr: "Âge",
    en: "Age",
    es: "Edad"
  },
  form_p_gender: {
    fr: "Genre",
    en: "Gender",
    es: "Género"
  },
  gender_male: {
    fr: "Homme",
    en: "Male",
    es: "Masculino"
  },
  gender_female: {
    fr: "Femme",
    en: "Female",
    es: "Femenino"
  },
  gender_other: {
    fr: "Autre",
    en: "Other",
    es: "Otro"
  },
  form_p_status: {
    fr: "Statut",
    en: "Status",
    es: "Estado"
  },
  status_active: {
    fr: "Actif",
    en: "Active",
    es: "Activo"
  },
  status_on_hold: {
    fr: "En attente",
    en: "On Hold",
    es: "En Espera"
  },
  status_discharged: {
    fr: "Congédié",
    en: "Discharged",
    es: "Alta"
  },
  form_p_condition: {
    fr: "Diagnostic principal / Condition",
    en: "Main Condition / Diagnosis",
    es: "Diagnóstico Principal / Condición"
  },
  form_p_contact: {
    fr: "Téléphone Contact",
    en: "Contact Phone",
    es: "Teléfono de Contacto"
  },
  form_p_therapist: {
    fr: "Thérapeute Principal",
    en: "Primary Therapist",
    es: "Terapeuta Principal"
  },
  form_p_notes: {
    fr: "Notes de suivi & Traitement",
    en: "Therapy Notes & Treatment Details",
    es: "Notas Clínicas y Tratamiento"
  },
  btn_cancel: {
    fr: "Annuler",
    en: "Cancel",
    es: "Cancelar"
  },
  btn_save: {
    fr: "Enregistrer",
    en: "Save",
    es: "Guardar"
  },
  modal_apt_new: {
    fr: "Planifier Nouveau RDV",
    en: "Schedule New Appointment",
    es: "Programar Nueva Cita"
  },
  form_apt_patient: {
    fr: "Patient",
    en: "Patient",
    es: "Paciente"
  },
  form_apt_therapist: {
    fr: "Thérapeute",
    en: "Therapist",
    es: "Terapeuta"
  },
  form_apt_date: {
    fr: "Date",
    en: "Date",
    es: "Fecha"
  },
  form_apt_time: {
    fr: "Heure",
    en: "Time",
    es: "Hora"
  },
  form_apt_type: {
    fr: "Type de RDV",
    en: "Appointment Type",
    es: "Tipo de Cita"
  },
  type_evaluation: {
    fr: "Bilan Initial",
    en: "Initial Evaluation",
    es: "Evaluación Inicial"
  },
  type_speech: {
    fr: "Séance d'Orthophonie",
    en: "Speech Therapy Session",
    es: "Sesión de Logopedia"
  },
  type_kine: {
    fr: "Séance de Kinésithérapie",
    en: "Kinesitherapy Session",
    es: "Sesión de Fisioterapia"
  },
  type_follow_up: {
    fr: "Suivi régulier",
    en: "Follow-up",
    es: "Seguimiento"
  },
  form_apt_status: {
    fr: "Statut",
    en: "Status",
    es: "Estado"
  },
  status_scheduled: {
    fr: "Planifié",
    en: "Scheduled",
    es: "Programada"
  },
  status_completed: {
    fr: "Effectué",
    en: "Completed",
    es: "Completada"
  },
  status_cancelled: {
    fr: "Annulé",
    en: "Cancelled",
    es: "Cancelada"
  },
  btn_save_apt: {
    fr: "Réserver le RDV",
    en: "Book Appointment",
    es: "Reservar Cita"
  },
  modal_team_new: {
    fr: "Ajouter un Membre de l'Équipe",
    en: "Add Team Member",
    es: "Añadir Miembro au Equipo"
  },
  form_t_name: {
    fr: "Nom Complet",
    en: "Full Name",
    es: "Nombre Completo"
  },
  form_t_specialty: {
    fr: "Spécialité",
    en: "Specialty",
    es: "Especialidad"
  },
  role_ortho: {
    fr: "Orthophoniste",
    en: "Orthophonist (Speech Therapist)",
    es: "Logopeda"
  },
  role_kine: {
    fr: "Kinésithérapeute",
    en: "Kinésithérapeute (Physiotherapist)",
    es: "Fisioterapeuta"
  },
  form_t_email: {
    fr: "Adresse E-mail",
    en: "Email Address",
    es: "Correo Electrónico"
  },
  btn_add_member: {
    fr: "Ajouter",
    en: "Add Member",
    es: "Añadir"
  },
  table_time: {
    fr: "Heure",
    en: "Time",
    es: "Hora"
  },
  table_patient: {
    fr: "Patient",
    en: "Patient",
    es: "Paciente"
  },
  table_therapist: {
    fr: "Thérapeute / Spécialité",
    en: "Therapist / Specialty",
    es: "Terapeuta / Especialidad"
  },
  table_type: {
    fr: "Type",
    en: "Type",
    es: "Tipo"
  },
  table_status: {
    fr: "Statut",
    en: "Status",
    es: "Estado"
  }
};

// --- INITIAL SEED DATA ---
const INITIAL_STAFF = [
  { id: "s-1", name: "Dr. Marc Dubois", specialty: "Orthophoniste", email: "marc.dubois@orthokine.com" },
  { id: "s-2", name: "Sophie Laurent", specialty: "Kinésithérapeute", email: "sophie.l@orthokine.com" },
  { id: "s-3", name: "Lucas Bernard", specialty: "Kinésithérapeute", email: "lucas.b@orthokine.com" }
];

const INITIAL_PATIENTS = [
  { id: "p-101", name: "Alice Martin", age: 8, gender: "Female", condition: "Speech Delay & Articulation", therapistId: "s-1", contact: "+33 6 45 28 19 92", status: "Active", notes: "Focusing on phonological awareness and articulation of s/z sounds. Showing steady progress." },
  { id: "p-102", name: "Thomas Morel", age: 34, gender: "Male", condition: "Post-Stroke Aphasia Rehabilitation", therapistId: "s-1", contact: "+33 6 88 41 23 09", status: "Active", notes: "Working on word retrieval and sentence construction. Patient is very motivated." },
  { id: "p-103", name: "Julie Petit", age: 29, gender: "Female", condition: "ACL Reconstruction Rehab", therapistId: "s-2", contact: "+33 7 12 90 45 61", status: "Active", notes: "Post-op week 6. Working on quad activation and flexion exercises." },
  { id: "p-104", name: "Antoine Gauthier", age: 67, gender: "Male", condition: "Chronic Lower Back Pain", therapistId: "s-3", contact: "+33 6 34 56 78 90", status: "Active", notes: "Core strengthening and posture correction training." },
  { id: "p-105", name: "Emma Richard", age: 12, gender: "Female", condition: "Stuttering therapy", therapistId: "s-1", contact: "+33 6 99 88 77 66", status: "On Hold", notes: "Improving speech fluency techniques. Temporarily paused for school break." }
];

// Seed appointments around June 2, 2026 (the current system date)
const INITIAL_APPOINTMENTS = [
  { id: "a-201", patientId: "p-101", therapistId: "s-1", date: "2026-06-02", time: "09:00", type: "Speech Therapy Session", status: "Scheduled" },
  { id: "a-202", patientId: "p-103", therapistId: "s-2", date: "2026-06-02", time: "10:30", type: "Kinesitherapy Session", status: "Completed" },
  { id: "a-203", patientId: "p-104", therapistId: "s-3", date: "2026-06-02", time: "14:00", type: "Kinesitherapy Session", status: "Scheduled" },
  { id: "a-204", patientId: "p-102", therapistId: "s-1", date: "2026-06-02", time: "16:00", type: "Initial Evaluation", status: "Scheduled" },
  { id: "a-205", patientId: "p-103", therapistId: "s-2", date: "2026-06-03", time: "11:00", type: "Kinesitherapy Session", status: "Scheduled" },
  { id: "a-206", patientId: "p-101", therapistId: "s-1", date: "2026-06-04", time: "09:30", type: "Speech Therapy Session", status: "Scheduled" },
  { id: "a-207", patientId: "p-104", therapistId: "s-3", date: "2026-06-05", time: "15:00", type: "Follow-up", status: "Scheduled" }
];

// --- STATE MANAGEMENT SERVICE ---
class AppStore {
  static get(key, defaultValue) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  }

  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  constructor() {
    this.patients = AppStore.get("ok_patients", INITIAL_PATIENTS);
    this.staff = AppStore.get("ok_staff", INITIAL_STAFF);
    this.appointments = AppStore.get("ok_appointments", INITIAL_APPOINTMENTS);
    this.lang = AppStore.get("ok_lang", "fr"); // DEFAULT LANGUAGE IS FRENCH
    this.loggedIn = AppStore.get("ok_logged_in", false);
    this.save();
  }

  save() {
    AppStore.set("ok_patients", this.patients);
    AppStore.set("ok_staff", this.staff);
    AppStore.set("ok_appointments", this.appointments);
    AppStore.set("ok_lang", this.lang);
    AppStore.set("ok_logged_in", this.loggedIn);
  }

  addPatient(patient) {
    patient.id = "p-" + Date.now();
    this.patients.push(patient);
    this.save();
    return patient;
  }

  updatePatient(id, updatedData) {
    const index = this.patients.findIndex(p => p.id === id);
    if (index !== -1) {
      this.patients[index] = { ...this.patients[index], ...updatedData };
      this.save();
    }
  }

  deletePatient(id) {
    this.patients = this.patients.filter(p => p.id !== id);
    this.appointments = this.appointments.filter(a => a.patientId !== id);
    this.save();
  }

  addAppointment(apt) {
    apt.id = "a-" + Date.now();
    this.appointments.push(apt);
    this.save();
    return apt;
  }

  updateAppointment(id, updatedData) {
    const index = this.appointments.findIndex(a => a.id === id);
    if (index !== -1) {
      this.appointments[index] = { ...this.appointments[index], ...updatedData };
      this.save();
    }
  }

  deleteAppointment(id) {
    this.appointments = this.appointments.filter(a => a.id !== id);
    this.save();
  }

  addStaff(member) {
    member.id = "s-" + Date.now();
    this.staff.push(member);
    this.save();
    return member;
  }
}

// Global App Instance
const store = new AppStore();

// --- CONTROLLER SETUP ---
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initRouter();
  initMobileControls();
  initForms();
  initAuthentication();
  initLocalization();
  renderAll();
  
  // Set French default for selector if not saved
  document.getElementById("language-selector").value = store.lang;
});

// --- MOBILE SIDEBAR ROUTING CONTROLS ---
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

// --- AUTHENTICATION ROUTING ---
function initAuthentication() {
  const loginForm = document.getElementById("login-form");
  const loginScreen = document.getElementById("login-screen");
  const mainApp = document.getElementById("main-app");
  const errorMsg = document.getElementById("login-error-msg");

  if (store.loggedIn) {
    loginScreen.style.display = "none";
    mainApp.style.display = "flex";
  } else {
    loginScreen.style.display = "flex";
    mainApp.style.display = "none";
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    // Hardcoded clinical credentials
    if (email === "admin@orthokine.com" && password === "admin") {
      store.loggedIn = true;
      store.save();
      errorMsg.style.display = "none";
      
      // Beautiful fade transition out
      loginScreen.style.opacity = "0";
      loginScreen.style.transition = "opacity 0.4s ease";
      
      setTimeout(() => {
        loginScreen.style.display = "none";
        mainApp.style.display = "flex";
        loginScreen.style.opacity = "1"; // Restore for later
        renderAll();
      }, 400);

    } else {
      errorMsg.style.display = "block";
    }
  });

  // Logout button trigger
  document.getElementById("logout-btn").addEventListener("click", () => {
    store.loggedIn = false;
    store.save();
    
    mainApp.style.display = "none";
    loginScreen.style.display = "flex";
    
    // Clear login passwords
    document.getElementById("login-password").value = "";
    
    // Auto return to dashboard tab
    document.querySelector('[data-tab="dashboard"]').click();
  });
}

// --- LOCALIZATION / TRANSLATIONS ENGINE ---
function initLocalization() {
  const langSelector = document.getElementById("language-selector");
  const saveBtn = document.getElementById("save-settings-btn");

  saveBtn.addEventListener("click", () => {
    store.lang = langSelector.value;
    store.save();
    translateApp();
    renderAll();
    
    // Standard validation popup localized
    const successMessages = {
      fr: "Paramètres enregistrés avec succès !",
      en: "Settings saved successfully!",
      es: "¡Ajustes guardados con éxito!"
    };
    alert(successMessages[store.lang]);
  });

  translateApp();
}

function translateApp() {
  const currentLang = store.lang;
  document.documentElement.setAttribute("lang", currentLang);

  // Translate all [data-i18n] text contents
  document.querySelectorAll("[data-i18n]").forEach(elem => {
    const key = elem.getAttribute("data-i18n");
    if (TRANSLATIONS[key] && TRANSLATIONS[key][currentLang]) {
      // Keep SVG icons intact inside sidebar/buttons by only modifying direct text child node or replacing innerHTML safely
      const icon = elem.querySelector("i");
      if (icon) {
        // Keep icon, just change the following text
        const textSpan = elem.querySelector("span");
        if (textSpan) {
          textSpan.textContent = TRANSLATIONS[key][currentLang];
        }
      } else {
        elem.textContent = TRANSLATIONS[key][currentLang];
      }
    }
  });

  // Translate input placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach(elem => {
    const key = elem.getAttribute("data-i18n-placeholder");
    if (TRANSLATIONS[key] && TRANSLATIONS[key][currentLang]) {
      elem.setAttribute("placeholder", TRANSLATIONS[key][currentLang]);
    }
  });

  // Dynamically update page calendar / schedules translations
  updateThemeUI(localStorage.getItem("ok_theme") || "light");
}

// Translate dynamic dates based on active language
function getLocalizedDateStr(dateStr) {
  const date = new Date(dateStr);
  const locales = { fr: 'fr-FR', en: 'en-US', es: 'es-ES' };
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  
  // Capitalize first letter of string
  const val = date.toLocaleDateString(locales[store.lang] || 'fr-FR', options);
  return val.charAt(0).toUpperCase() + val.slice(1);
}

// --- NAVIGATION / ROUTER ---
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
      title.textContent = TRANSLATIONS[translationKey] ? TRANSLATIONS[translationKey][store.lang] : link.querySelector("span").textContent;
      
      // Render components dynamically based on target view
      renderAll();
    });
  });

  // TOpleft Brand Logo click action: Always go back to Home (Dashboard)
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
    title.textContent = profileTitles[store.lang];

    renderAll();
  });

  // Shortcut dashboard actions
  document.getElementById("dash-quick-patient-btn").addEventListener("click", () => {
    openPatientModal();
  });
  
  document.getElementById("dash-view-calendar-btn").addEventListener("click", () => {
    document.querySelector('[data-tab="appointments"]').click();
  });

  document.getElementById("dash-view-team-btn").addEventListener("click", () => {
    document.querySelector('[data-tab="team"]').click();
  });
}

// --- THEME MANAGEMENT ---
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
  
  if (theme === "dark") {
    themeIcon.setAttribute("data-lucide", "moon");
    themeText.setAttribute("data-i18n", "theme_dark");
    themeText.textContent = TRANSLATIONS.theme_dark[store.lang] || "Mode Sombre";
  } else {
    themeIcon.setAttribute("data-lucide", "sun");
    themeText.setAttribute("data-i18n", "theme_light");
    themeText.textContent = TRANSLATIONS.theme_light[store.lang] || "Mode Clair";
  }
  lucide.createIcons();
}

// --- GLOBAL RENDER ---
let currentCalendarMonth = 5; // June (0-indexed)
let currentCalendarYear = 2026;

function renderAll() {
  if (!store.loggedIn) return;

  renderDropdownSelectors();
  renderDashboard();
  renderPatientsTable();
  renderCalendar(currentCalendarMonth, currentCalendarYear);
  renderTeam();
  
  // Re-run Lucide Icons to bind SVG visuals
  lucide.createIcons();
}

// --- DYNAMIC FORM SELECTORS ---
function renderDropdownSelectors() {
  const pTherapistSelect = document.getElementById("p-therapist");
  const aptPatientSelect = document.getElementById("apt-patient");
  const aptTherapistSelect = document.getElementById("apt-therapist");
  const calTherapistFilter = document.getElementById("calendar-therapist-filter");

  // Keep current selection values
  const prevPTherapist = pTherapistSelect.value;
  const prevAptPatient = aptPatientSelect.value;
  const prevAptTherapist = aptTherapistSelect.value;
  const prevCalFilter = calTherapistFilter.value;

  // Clear options
  pTherapistSelect.innerHTML = "";
  aptPatientSelect.innerHTML = `<option value=''>-- ${store.lang === 'fr' ? 'Sélectionner' : (store.lang === 'es' ? 'Seleccionar' : 'Select')} --</option>`;
  aptTherapistSelect.innerHTML = `<option value=''>-- ${store.lang === 'fr' ? 'Sélectionner' : (store.lang === 'es' ? 'Seleccionar' : 'Select')} --</option>`;
  
  // Repopulate Staff
  store.staff.forEach(s => {
    // Localize specialty
    const specialtyTranslation = s.specialty === "Orthophoniste" ? 
                                 (TRANSLATIONS.role_ortho[store.lang] || s.specialty) : 
                                 (TRANSLATIONS.role_kine[store.lang] || s.specialty);

    const opt = `<option value="${s.id}">${s.name} (${specialtyTranslation})</option>`;
    pTherapistSelect.insertAdjacentHTML("beforeend", opt);
    aptTherapistSelect.insertAdjacentHTML("beforeend", opt);
  });

  // Repopulate Patients
  store.patients.forEach(p => {
    aptPatientSelect.insertAdjacentHTML("beforeend", `<option value="${p.id}">${p.name}</option>`);
  });

  // Repopulate Calendar filter
  const allTherapistsTranslation = TRANSLATIONS.filter_all_therapists[store.lang] || "Tous les thérapeutes";
  calTherapistFilter.innerHTML = `<option value="all">${allTherapistsTranslation}</option>`;
  store.staff.forEach(s => {
    calTherapistFilter.insertAdjacentHTML("beforeend", `<option value="${s.id}">${s.name}</option>`);
  });

  // Restore values
  if (prevPTherapist) pTherapistSelect.value = prevPTherapist;
  if (prevAptPatient) aptPatientSelect.value = prevAptPatient;
  if (prevAptTherapist) aptTherapistSelect.value = prevAptTherapist;
  if (prevCalFilter) calTherapistFilter.value = prevCalFilter;
}

// --- 1. DASHBOARD ---
function renderDashboard() {
  const todayStr = "2026-06-02"; // Standardized system date
  const todayAppointments = store.appointments.filter(a => a.date === todayStr);

  // Update Stats
  document.getElementById("stat-sessions-today").textContent = todayAppointments.length;
  document.getElementById("stat-total-patients").textContent = store.patients.filter(p => p.status === "Active").length;
  document.getElementById("stat-active-therapists").textContent = store.staff.length;
  
  // Weekly Session hours count (approx 1h per appointment)
  const totalWeeklyHours = store.appointments.length; 
  document.getElementById("stat-pending-hours").textContent = totalWeeklyHours + "h";
  
  // Translate system live date
  document.getElementById("live-time-badge").textContent = getLocalizedDateStr(todayStr);

  const appointmentsTranslation = store.lang === 'fr' ? 'rendez-vous' : (store.lang === 'es' ? 'citas' : 'appointments');
  document.getElementById("today-rdv-count-badge").textContent = `${todayAppointments.length} ${appointmentsTranslation}`;

  // Fill Today's Appointment Table
  const tbody = document.getElementById("today-appointments-table");
  tbody.innerHTML = "";

  if (todayAppointments.length === 0) {
    const emptyTranslation = {
      fr: "Aucune séance planifiée pour aujourd'hui.",
      en: "No appointments scheduled for today.",
      es: "No hay citas programadas para hoy."
    };
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: hsl(var(--muted-foreground)); padding: 2rem;">${emptyTranslation[store.lang]}</td></tr>`;
    return;
  }

  // Sort by time
  todayAppointments.sort((a, b) => a.time.localeCompare(b.time));

  todayAppointments.forEach(apt => {
    const patient = store.patients.find(p => p.id === apt.patientId) || { name: "Unknown" };
    const staff = store.staff.find(s => s.id === apt.therapistId) || { name: "Unknown", specialty: "" };

    const specialtyTranslation = staff.specialty === "Orthophoniste" ? 
                                 (TRANSLATIONS.role_ortho[store.lang] || staff.specialty) : 
                                 (TRANSLATIONS.role_kine[store.lang] || staff.specialty);

    const typeTranslation = apt.type === "Initial Evaluation" ? (TRANSLATIONS.type_evaluation[store.lang] || apt.type) :
                            (apt.type === "Speech Therapy Session" ? (TRANSLATIONS.type_speech[store.lang] || apt.type) :
                            (apt.type === "Kinesitherapy Session" ? (TRANSLATIONS.type_kine[store.lang] || apt.type) :
                            (TRANSLATIONS.type_follow_up[store.lang] || apt.type)));

    const statusBadge = apt.status === "Completed" ? "badge-success" : (apt.status === "Cancelled" ? "badge-danger" : "badge-primary");
    const statusTranslation = apt.status === "Completed" ? (TRANSLATIONS.status_completed[store.lang] || apt.status) :
                              (apt.status === "Cancelled" ? (TRANSLATIONS.status_cancelled[store.lang] || apt.status) :
                              (TRANSLATIONS.status_scheduled[store.lang] || apt.status));

    const tr = `
      <tr>
        <td style="font-weight: 700;">${apt.time}</td>
        <td>
          <div style="font-weight: 600;">${patient.name}</div>
          <div style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">${patient.contact}</div>
        </td>
        <td>
          <div style="font-weight: 500;">${staff.name}</div>
          <div style="font-size: 0.75rem; color: hsl(var(--primary)); font-weight: 600;">${specialtyTranslation}</div>
        </td>
        <td><span class="badge badge-muted">${typeTranslation}</span></td>
        <td><span class="badge ${statusBadge}">${statusTranslation}</span></td>
      </tr>
    `;
    tbody.insertAdjacentHTML("beforeend", tr);
  });
}

// --- 2. PATIENTS REGISTRY ---
function renderPatientsTable() {
  const searchQuery = document.getElementById("patient-search-input").value.toLowerCase();
  const tbody = document.getElementById("patients-table-body");
  tbody.innerHTML = "";

  const filteredPatients = store.patients.filter(p => {
    return p.name.toLowerCase().includes(searchQuery) || 
           p.condition.toLowerCase().includes(searchQuery) ||
           p.id.toLowerCase().includes(searchQuery);
  });

  if (filteredPatients.length === 0) {
    const emptyMsg = {
      fr: "Aucun profil patient correspondant trouvé.",
      en: "No matching patient profiles found.",
      es: "No se encontraron perfiles de pacientes correspondientes."
    };
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: hsl(var(--muted-foreground)); padding: 2rem;">${emptyMsg[store.lang]}</td></tr>`;
    return;
  }

  filteredPatients.forEach(p => {
    const staff = store.staff.find(s => s.id === p.therapistId) || { name: "Unassigned" };
    
    let statusClass = "badge-success";
    if (p.status === "On Hold") statusClass = "badge-warning";
    if (p.status === "Discharged") statusClass = "badge-danger";

    const statusTranslation = p.status === "Active" ? (TRANSLATIONS.status_active[store.lang] || p.status) :
                              (p.status === "On Hold" ? (TRANSLATIONS.status_on_hold[store.lang] || p.status) :
                              (TRANSLATIONS.status_discharged[store.lang] || p.status));

    const genderTranslation = p.gender === "Male" ? (TRANSLATIONS.gender_male[store.lang] || p.gender) :
                              (p.gender === "Female" ? (TRANSLATIONS.gender_female[store.lang] || p.gender) :
                              (TRANSLATIONS.gender_other[store.lang] || p.gender));

    const tr = `
      <tr>
        <td>
          <div style="font-weight: 700;">${p.name}</div>
          <div style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">ID: ${p.id}</div>
        </td>
        <td>${p.age} / ${genderTranslation}</td>
        <td><span class="badge badge-muted" style="max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${p.condition}</span></td>
        <td style="font-weight: 500; color: hsl(var(--primary));">${staff.name}</td>
        <td>${p.contact}</td>
        <td><span class="badge ${statusClass}">${statusTranslation}</span></td>
        <td>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-secondary" onclick="openPatientModal('${p.id}')" style="padding: 0.4rem; font-size: 0.8rem;"><i data-lucide="edit" style="width: 14px; height: 14px;"></i></button>
            <button class="btn btn-danger" onclick="deletePatientConfirm('${p.id}')" style="padding: 0.4rem; font-size: 0.8rem;"><i data-lucide="trash-2" style="width: 14px; height: 14px;"></i></button>
          </div>
        </td>
      </tr>
    `;
    tbody.insertAdjacentHTML("beforeend", tr);
  });
}

// Make globally accessible
window.openPatientModal = openPatientModal;
window.deletePatientConfirm = deletePatientConfirm;

// --- 3. SCHEDULE CALENDAR ---
function renderCalendar(month, year) {
  const container = document.getElementById("calendar-dates-container");
  const monthYearLabel = document.getElementById("calendar-current-month-year");
  const therapistFilter = document.getElementById("calendar-therapist-filter").value;
  
  container.innerHTML = "";

  const monthNames = {
    fr: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    es: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  };
  
  monthYearLabel.textContent = `${monthNames[store.lang][month]} ${year}`;

  // Get first day of the month
  const firstDayIndex = new Date(year, month, 1).getDay();
  // Adjust so Mon=0, Tue=1, ..., Sun=6
  const adjustedFirstDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  const totalDays = new Date(year, month + 1, 0).getDate();
  const prevMonthTotalDays = new Date(year, month, 0).getDate();

  // 1. Fill previous month dates (muted)
  for (let i = adjustedFirstDay - 1; i >= 0; i--) {
    const day = prevMonthTotalDays - i;
    const cell = `
      <div class="calendar-cell muted">
        <span class="calendar-cell-num">${day}</span>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", cell);
  }

  // 2. Fill active month dates
  for (let day = 1; day <= totalDays; day++) {
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    // Filter appointments for this date
    let dayApts = store.appointments.filter(a => a.date === formattedDate);
    if (therapistFilter !== "all") {
      dayApts = dayApts.filter(a => a.therapistId === therapistFilter);
    }

    const isToday = formattedDate === "2026-06-02";
    const cellClass = isToday ? "calendar-cell today" : "calendar-cell";

    // Injected appointment lists
    let aptHtml = "";
    dayApts.slice(0, 3).forEach(apt => {
      const patient = store.patients.find(p => p.id === apt.patientId) || { name: "Unknown" };
      const therapist = store.staff.find(s => s.id === apt.therapistId) || { specialty: "" };
      
      const styleClass = therapist.specialty === "Orthophoniste" ? 
                         "background-color: hsl(var(--primary) / 0.15); color: hsl(var(--primary));" : 
                         "background-color: hsl(var(--accent) / 0.15); color: hsl(var(--accent));";

      aptHtml += `
        <div class="calendar-event-dot" style="${styleClass}" onclick="event.stopPropagation(); openAppointmentModal('${apt.id}')">
          <strong>${apt.time}</strong> <span>${patient.name}</span>
        </div>
      `;
    });

    if (dayApts.length > 3) {
      const moreStr = store.lang === 'fr' ? 'de plus' : (store.lang === 'es' ? 'más' : 'more');
      aptHtml += `<div style="font-size: 0.7rem; font-weight: 700; text-align: center; color: hsl(var(--muted-foreground));">+${dayApts.length - 3} ${moreStr}</div>`;
    }

    const cell = `
      <div class="${cellClass}" onclick="openAppointmentForDate('${formattedDate}')">
        <span class="calendar-cell-num">${day}</span>
        <div class="calendar-cell-events">
          ${aptHtml}
        </div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", cell);
  }

  // 3. Fill remaining space to keep calendar square (42 cells total)
  const remainingCells = 42 - (adjustedFirstDay + totalDays);
  for (let day = 1; day <= remainingCells; day++) {
    const cell = `
      <div class="calendar-cell muted">
        <span class="calendar-cell-num">${day}</span>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", cell);
  }
}

// Calendar Navigation
document.getElementById("calendar-prev-btn").addEventListener("click", () => {
  currentCalendarMonth--;
  if (currentCalendarMonth < 0) {
    currentCalendarMonth = 11;
    currentCalendarYear--;
  }
  renderCalendar(currentCalendarMonth, currentCalendarYear);
  lucide.createIcons();
});

document.getElementById("calendar-next-btn").addEventListener("click", () => {
  currentCalendarMonth++;
  if (currentCalendarMonth > 11) {
    currentCalendarMonth = 0;
    currentCalendarYear++;
  }
  renderCalendar(currentCalendarMonth, currentCalendarYear);
  lucide.createIcons();
});

document.getElementById("calendar-today-btn").addEventListener("click", () => {
  currentCalendarMonth = 5; // June
  currentCalendarYear = 2026;
  renderCalendar(currentCalendarMonth, currentCalendarYear);
  lucide.createIcons();
});

document.getElementById("calendar-therapist-filter").addEventListener("change", () => {
  const filterVal = document.getElementById("calendar-therapist-filter").value;
  const filterBadge = document.getElementById("calendar-filter-badge");
  
  if (filterVal === "all") {
    filterBadge.textContent = TRANSLATIONS.filter_all_therapists[store.lang] || "Tous les thérapeutes";
  } else {
    const staff = store.staff.find(s => s.id === filterVal);
    filterBadge.textContent = staff ? staff.name : "Filtered";
  }

  renderCalendar(currentCalendarMonth, currentCalendarYear);
  lucide.createIcons();
});

window.openAppointmentForDate = function(dateStr) {
  openAppointmentModal(null, dateStr);
};

// --- 4. TEAM MEMBERS ---
function renderTeam() {
  const grid = document.getElementById("team-members-grid");
  grid.innerHTML = "";

  store.staff.forEach(s => {
    // Count active patients and scheduled appointments for this staff member
    const patientCount = store.patients.filter(p => p.therapistId === s.id).length;
    const sessionCount = store.appointments.filter(a => a.therapistId === s.id).length;

    const initials = s.name.split(" ").map(n => n[0]).join("").slice(0, 2);

    // Specialty translation
    const specialtyTranslation = s.specialty === "Orthophoniste" ? 
                                 (TRANSLATIONS.role_ortho[store.lang] || s.specialty) : 
                                 (TRANSLATIONS.role_kine[store.lang] || s.specialty);

    const patientsTranslation = store.lang === 'fr' ? 'Patients' : (store.lang === 'es' ? 'Pacientes' : 'Patients');
    const sessionsTranslation = store.lang === 'fr' ? 'Séances' : (store.lang === 'es' ? 'Sesiones' : 'Sessions');

    const card = `
      <div class="team-card glass-panel">
        <div class="team-card-avatar">${initials}</div>
        <h3>${s.name}</h3>
        <p class="specialty">${specialtyTranslation}</p>
        <p class="email">${s.email}</p>
        
        <div class="team-card-stats">
          <div class="team-stat">
            <h5>${patientCount}</h5>
            <p>${patientsTranslation}</p>
          </div>
          <div class="team-stat">
            <h5>${sessionCount}</h5>
            <p>${sessionsTranslation}</p>
          </div>
        </div>
      </div>
    `;
    grid.insertAdjacentHTML("beforeend", card);
  });
}

// --- MODAL CONTROLS & FORM ACTIONS ---
function initForms() {
  // Global buttons
  document.getElementById("global-new-rdv-btn").addEventListener("click", () => {
    openAppointmentModal();
  });
  
  document.getElementById("add-patient-trigger").addEventListener("click", () => {
    openPatientModal();
  });

  document.getElementById("add-team-trigger").addEventListener("click", () => {
    openTeamModal();
  });

  // Forms Submissions
  document.getElementById("patient-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("patient-form-id").value;
    const name = document.getElementById("p-name").value;
    const age = parseInt(document.getElementById("p-age").value);
    const gender = document.getElementById("p-gender").value;
    const status = document.getElementById("p-status").value;
    const condition = document.getElementById("p-condition").value;
    const contact = document.getElementById("p-contact").value;
    const therapistId = document.getElementById("p-therapist").value;
    const notes = document.getElementById("p-notes").value;

    const patientData = { name, age, gender, status, condition, contact, therapistId, notes };

    if (id) {
      store.updatePatient(id, patientData);
    } else {
      store.addPatient(patientData);
    }

    document.getElementById("patient-modal").close();
    renderAll();
  });

  document.getElementById("appointment-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("appointment-form-id").value;
    const patientId = document.getElementById("apt-patient").value;
    const therapistId = document.getElementById("apt-therapist").value;
    const date = document.getElementById("apt-date").value;
    const time = document.getElementById("apt-time").value;
    const type = document.getElementById("apt-type").value;
    const status = document.getElementById("apt-status").value;

    const appointmentData = { patientId, therapistId, date, time, type, status };

    if (id) {
      store.updateAppointment(id, appointmentData);
    } else {
      store.addAppointment(appointmentData);
    }

    document.getElementById("appointment-modal").close();
    renderAll();
  });

  document.getElementById("team-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("t-name").value;
    const specialty = document.getElementById("t-specialty").value;
    const email = document.getElementById("t-email").value;

    store.addStaff({ name, specialty, email });
    document.getElementById("team-modal").close();
    
    // Clear fields
    document.getElementById("t-name").value = "";
    document.getElementById("t-email").value = "";
    
    renderAll();
  });

  // Bind patient search query
  document.getElementById("patient-search-input").addEventListener("input", () => {
    renderPatientsTable();
    lucide.createIcons();
  });
}

// Opening Patient Modal
function openPatientModal(id = null) {
  const modal = document.getElementById("patient-modal");
  const form = document.getElementById("patient-form");
  const title = document.getElementById("patient-modal-title");
  
  form.reset();
  
  if (id) {
    const editTitles = { fr: "Modifier Profil Patient", en: "Edit Patient Profile", es: "Editar Perfil del Paciente" };
    title.textContent = editTitles[store.lang];

    const patient = store.patients.find(p => p.id === id);
    if (patient) {
      document.getElementById("patient-form-id").value = patient.id;
      document.getElementById("p-name").value = patient.name;
      document.getElementById("p-age").value = patient.age;
      document.getElementById("p-gender").value = patient.gender;
      document.getElementById("p-status").value = patient.status;
      document.getElementById("p-condition").value = patient.condition;
      document.getElementById("p-contact").value = patient.contact;
      document.getElementById("p-therapist").value = patient.therapistId;
      document.getElementById("p-notes").value = patient.notes || "";
    }
  } else {
    title.textContent = TRANSLATIONS.modal_patient_new[store.lang] || "Enregistrer Nouveau Patient";
    document.getElementById("patient-form-id").value = "";
  }
  
  modal.showModal();
  lucide.createIcons();
}

// Delete patient confirm
function deletePatientConfirm(id) {
  const patient = store.patients.find(p => p.id === id);
  if (patient) {
    const confirmMsgs = {
      fr: `Êtes-vous sûr de vouloir supprimer le patient "${patient.name}" ? Cela supprimera également tous ses rendez-vous associés.`,
      en: `Are you sure you want to delete patient "${patient.name}"? This will also remove all scheduled appointments associated with them.`,
      es: `¿Está seguro de que desea eliminar al paciente "${patient.name}"? Esto también eliminará todas las citas programadas asociadas.`
    };

    if (confirm(confirmMsgs[store.lang])) {
      store.deletePatient(id);
      renderAll();
    }
  }
}

// Opening Appointment Modal
function openAppointmentModal(id = null, defaultDate = null) {
  const modal = document.getElementById("appointment-modal");
  const form = document.getElementById("appointment-form");
  const title = document.getElementById("appointment-modal-title");
  
  form.reset();
  
  if (id) {
    const editTitles = { fr: "Modifier Détails du RDV", en: "Edit Appointment Details", es: "Editar Detalles de la Cita" };
    title.textContent = editTitles[store.lang];

    const apt = store.appointments.find(a => a.id === id);
    if (apt) {
      document.getElementById("appointment-form-id").value = apt.id;
      document.getElementById("apt-patient").value = apt.patientId;
      document.getElementById("apt-therapist").value = apt.therapistId;
      document.getElementById("apt-date").value = apt.date;
      document.getElementById("apt-time").value = apt.time;
      document.getElementById("apt-type").value = apt.type;
      document.getElementById("apt-status").value = apt.status;
    }
  } else {
    title.textContent = TRANSLATIONS.modal_apt_new[store.lang] || "Planifier Nouveau RDV";
    document.getElementById("appointment-form-id").value = "";
    // Set default date if passed or default to system standard today (June 2, 2026)
    document.getElementById("apt-date").value = defaultDate || "2026-06-02";
    document.getElementById("apt-time").value = "10:00";
    document.getElementById("apt-status").value = "Scheduled";
  }
  
  modal.showModal();
  lucide.createIcons();
}

function openTeamModal() {
  document.getElementById("team-modal").showModal();
  lucide.createIcons();
}
