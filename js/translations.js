/**
 * OrthoKine Namespace - Translations Module
 */
window.OrthoKine = window.OrthoKine || {};

OrthoKine.escapeHTML = function(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

OrthoKine.getTranslation = function(key) {
  if (typeof key !== 'string') return "";
  if (!Object.prototype.hasOwnProperty.call(OrthoKine.translations, key)) return "";
  const entry = Reflect.get(OrthoKine.translations, key);
  const lang = OrthoKine.store ? OrthoKine.store.lang : "fr";
  if (lang === "en") return entry.en || entry.fr || "";
  if (lang === "es") return entry.es || entry.fr || "";
  return entry.fr || "";
};

OrthoKine.getLangValue = function(obj) {
  if (!obj || typeof obj !== 'object') return "";
  const lang = OrthoKine.store ? OrthoKine.store.lang : "fr";
  if (lang === "en") return obj.en || obj.fr || "";
  if (lang === "es") return obj.es || obj.fr || "";
  return obj.fr || "";
};

OrthoKine.translations = {
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
    es: "Acciones Rápida"
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
