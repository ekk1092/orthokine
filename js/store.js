/**
 * OrthoKine Namespace - State Store Module (v2.0 — Multi-Rôles)
 */
window.OrthoKine = window.OrthoKine || {};

(function () {

  // ─── SESSION DEFINITIONS (immutable labels, mutable assignments) ───────────
  const SESSIONS_DEF = [
    { id: 'sess-1', name: 'Mobilisation Adulte', color: '#6366f1', bgClass: 'sess-indigo', icon: 'activity' },
    { id: 'sess-2', name: 'Pédiatrie',           color: '#10b981', bgClass: 'sess-emerald', icon: 'baby' },
    { id: 'sess-3', name: 'École de marche',     color: '#f59e0b', bgClass: 'sess-amber',   icon: 'footprints' },
    { id: 'sess-4', name: 'Vestibulaire',         color: '#ec4899', bgClass: 'sess-pink',   icon: 'ear' },
  ];

  // ─── INITIAL USERS ─────────────────────────────────────────────────────────
  const INITIAL_USERS = [
    // Chef de Service
    { id: 'u-1',  name: 'Dr. Responsable',     initials: 'DR', email: 'chef@orthokine.com',           password: 'chef2026',   role: 'chef_service', sessionId: null,     praticienId: null },
    // Chefs de Session
    { id: 'u-2',  name: 'Marie Koné',           initials: 'MK', email: 'mobilisation@orthokine.com',   password: 'session123', role: 'chef_session', sessionId: 'sess-1', praticienId: null },
    { id: 'u-3',  name: 'Dr. Awa Diallo',       initials: 'AD', email: 'pediatrie@orthokine.com',      password: 'session123', role: 'chef_session', sessionId: 'sess-2', praticienId: null },
    { id: 'u-4',  name: 'Paul Mensah',          initials: 'PM', email: 'marche@orthokine.com',         password: 'session123', role: 'chef_session', sessionId: 'sess-3', praticienId: null },
    { id: 'u-5',  name: 'Fatou Traoré',        initials: 'FT', email: 'vestibulaire@orthokine.com',   password: 'session123', role: 'chef_session', sessionId: 'sess-4', praticienId: null },
    // Praticiens — Mobilisation Adulte (sess-1)
    { id: 'u-6',  name: 'Sophie Laurent',       initials: 'SL', email: 'sophie@orthokine.com',         password: 'kine123',    role: 'praticien',    sessionId: 'sess-1', praticienId: 'pr-1' },
    { id: 'u-7',  name: 'Lucas Bernard',        initials: 'LB', email: 'lucas@orthokine.com',          password: 'kine123',    role: 'praticien',    sessionId: 'sess-1', praticienId: 'pr-2' },
    { id: 'u-11', name: 'Dr. Kofi Asante',      initials: 'KA', email: 'kofi@orthokine.com',           password: 'kine123',    role: 'praticien',    sessionId: 'sess-1', praticienId: 'pr-6' },
    // Praticiens — Pédiatrie (sess-2)
    { id: 'u-8',  name: 'Dr. Marc Dubois',      initials: 'MD', email: 'marc@orthokine.com',           password: 'kine123',    role: 'praticien',    sessionId: 'sess-2', praticienId: 'pr-3' },
    { id: 'u-12', name: 'Aminata Coulibaly',    initials: 'AC', email: 'aminata@orthokine.com',        password: 'kine123',    role: 'praticien',    sessionId: 'sess-2', praticienId: 'pr-7' },
    { id: 'u-13', name: 'Dr. Yves Tossou',      initials: 'YT', email: 'yves@orthokine.com',           password: 'kine123',    role: 'praticien',    sessionId: 'sess-2', praticienId: 'pr-8' },
    // Praticiens — École de marche (sess-3)
    { id: 'u-9',  name: 'Isabelle Moreau',      initials: 'IM', email: 'isabelle@orthokine.com',       password: 'kine123',    role: 'praticien',    sessionId: 'sess-3', praticienId: 'pr-4' },
    { id: 'u-14', name: 'Serge Kouadio',        initials: 'SK', email: 'serge@orthokine.com',          password: 'kine123',    role: 'praticien',    sessionId: 'sess-3', praticienId: 'pr-9' },
    { id: 'u-15', name: 'Dr. Nadia Bamba',      initials: 'NB', email: 'nadia@orthokine.com',          password: 'kine123',    role: 'praticien',    sessionId: 'sess-3', praticienId: 'pr-10' },
    // Praticiens — Vestibulaire (sess-4)
    { id: 'u-10', name: 'Thomas Renard',        initials: 'TR', email: 'thomas@orthokine.com',         password: 'kine123',    role: 'praticien',    sessionId: 'sess-4', praticienId: 'pr-5' },
    { id: 'u-16', name: 'Chloé Ouédraogo',     initials: 'CO', email: 'chloe@orthokine.com',          password: 'kine123',    role: 'praticien',    sessionId: 'sess-4', praticienId: 'pr-11' },
    { id: 'u-17', name: 'Dr. Emile Gbagbo',     initials: 'EG', email: 'emile@orthokine.com',          password: 'kine123',    role: 'praticien',    sessionId: 'sess-4', praticienId: 'pr-12' },
  ];

  // ─── INITIAL PRATICIENS ────────────────────────────────────────────────────
  const INITIAL_PRATICIENS = [
    // Mobilisation Adulte
    { id: 'pr-1',  name: 'Sophie Laurent',    specialty: 'Kinésithérapeute', email: 'sophie@orthokine.com',   sessionId: 'sess-1' },
    { id: 'pr-2',  name: 'Lucas Bernard',     specialty: 'Kinésithérapeute', email: 'lucas@orthokine.com',    sessionId: 'sess-1' },
    { id: 'pr-6',  name: 'Dr. Kofi Asante',   specialty: 'Orthopédiste',     email: 'kofi@orthokine.com',     sessionId: 'sess-1' },
    // Pédiatrie
    { id: 'pr-3',  name: 'Dr. Marc Dubois',   specialty: 'Pédiatre',          email: 'marc@orthokine.com',     sessionId: 'sess-2' },
    { id: 'pr-7',  name: 'Aminata Coulibaly', specialty: 'Pédiatre',          email: 'aminata@orthokine.com',  sessionId: 'sess-2' },
    { id: 'pr-8',  name: 'Dr. Yves Tossou',   specialty: 'Psychologue',       email: 'yves@orthokine.com',     sessionId: 'sess-2' },
    // École de marche
    { id: 'pr-4',  name: 'Isabelle Moreau',   specialty: 'Ergothérapeute',   email: 'isabelle@orthokine.com', sessionId: 'sess-3' },
    { id: 'pr-9',  name: 'Serge Kouadio',     specialty: 'Kinésithérapeute', email: 'serge@orthokine.com',    sessionId: 'sess-3' },
    { id: 'pr-10', name: 'Dr. Nadia Bamba',   specialty: 'Orthopédiste',     email: 'nadia@orthokine.com',    sessionId: 'sess-3' },
    // Vestibulaire
    { id: 'pr-5',  name: 'Thomas Renard',     specialty: 'Kinésithérapeute', email: 'thomas@orthokine.com',   sessionId: 'sess-4' },
    { id: 'pr-11', name: 'Chloé Ouédraogo',  specialty: 'Ergothérapeute',   email: 'chloe@orthokine.com',    sessionId: 'sess-4' },
    { id: 'pr-12', name: 'Dr. Emile Gbagbo',  specialty: 'Psychologue',       email: 'emile@orthokine.com',    sessionId: 'sess-4' },
  ];

  // ─── INITIAL PATIENTS (enriched v2) ───────────────────────────────────────
  const INITIAL_PATIENTS = [
    {
      id: 'pat-1', name: 'Alice Martin', age: 8, gender: 'Féminin',
      condition: 'Retard moteur', praticienId: 'pr-3', contact: '+225 07 45 28 19 92',
      status: 'Actif', notes: 'Bon progrès en motricité fine.', sessionId: 'sess-2',
      nombreSeances: 12, statutMatrimonial: 'N/A', fonction: 'Élève',
      adresse: '12 Rue des Fleurs, Abidjan',
      histoireMaladie: 'Retard de développement moteur détecté à 3 ans. Suivi neurologique en parallèle.'
    },
    {
      id: 'pat-2', name: 'Thomas Morel', age: 34, gender: 'Masculin',
      condition: 'Rééducation post-AVC', praticienId: 'pr-1', contact: '+225 07 88 41 23 09',
      status: 'Actif', notes: 'Récupération mobilité bras droit en cours.', sessionId: 'sess-1',
      nombreSeances: 20, statutMatrimonial: 'Marié', fonction: 'Ingénieur',
      adresse: '5 Boulevard de la Paix, Abidjan',
      histoireMaladie: 'AVC ischémique en janvier 2026. Hémiplégie droite résiduelle. Prise en charge urgente recommandée par neurologie.'
    },
    {
      id: 'pat-3', name: 'Julie Petit', age: 29, gender: 'Féminin',
      condition: 'Rééducation LCA', praticienId: 'pr-1', contact: '+225 07 12 90 45 61',
      status: 'Actif', notes: 'Semaine 6 post-opératoire. Bon progrès.', sessionId: 'sess-1',
      nombreSeances: 15, statutMatrimonial: 'Célibataire', fonction: 'Sportive professionnelle',
      adresse: '8 Rue du Sport, Abidjan',
      histoireMaladie: 'Rupture du ligament croisé antérieur droit lors d\'un match en mars 2026. Chirurgie le 15 mars 2026.'
    },
    {
      id: 'pat-4', name: 'Antoine Gauthier', age: 67, gender: 'Masculin',
      condition: 'Troubles de la marche', praticienId: 'pr-4', contact: '+225 07 34 56 78 90',
      status: 'Actif', notes: 'Amélioration de l\'équilibre. Continue les exercices.', sessionId: 'sess-3',
      nombreSeances: 8, statutMatrimonial: 'Veuf', fonction: 'Retraité',
      adresse: '22 Avenue des Ancêtres, Abidjan',
      histoireMaladie: 'Chute en novembre 2025, fracture du col du fémur. Opéré le 3 décembre 2025. Troubles persistants de la marche.'
    },
    {
      id: 'pat-5', name: 'Emma Richard', age: 12, gender: 'Féminin',
      condition: 'Troubles vestibulaires', praticienId: 'pr-5', contact: '+225 07 99 88 77 66',
      status: 'En attente', notes: 'Vertiges récurrents, bilan vestibulaire complet en cours.', sessionId: 'sess-4',
      nombreSeances: 5, statutMatrimonial: 'N/A', fonction: 'Élève',
      adresse: '3 Cité Scolaire, Abidjan',
      histoireMaladie: 'Vertiges et nausées depuis 6 mois. Origine vestibulaire confirmée par ORL. Première séance de rééducation vestibulaire.'
    },
  ];

  // ─── INITIAL APPOINTMENTS ──────────────────────────────────────────────────
  const today = new Date().toISOString().split('T')[0];
  const INITIAL_APPOINTMENTS = [
    { id: 'apt-1', patientId: 'pat-2', praticienId: 'pr-1', date: today, time: '09:00', type: 'Première consultation', status: 'Planifiée', sessionId: 'sess-1', isFirstApt: true },
    { id: 'apt-2', patientId: 'pat-3', praticienId: 'pr-1', date: today, time: '10:30', type: 'Séance de rééducation', status: 'En cours', sessionId: 'sess-1', isFirstApt: false },
    { id: 'apt-3', patientId: 'pat-4', praticienId: 'pr-4', date: today, time: '14:00', type: 'Séance de marche', status: 'Planifiée', sessionId: 'sess-3', isFirstApt: false },
    { id: 'apt-4', patientId: 'pat-1', praticienId: 'pr-3', date: today, time: '16:00', type: 'Séance pédiatrique', status: 'Terminée', sessionId: 'sess-2', isFirstApt: false },
    { id: 'apt-5', patientId: 'pat-5', praticienId: 'pr-5', date: '2026-06-30', time: '11:00', type: 'Bilan vestibulaire', status: 'Planifiée', sessionId: 'sess-4', isFirstApt: true },
    { id: 'apt-6', patientId: 'pat-2', praticienId: 'pr-2', date: '2026-07-01', time: '09:30', type: 'Séance de rééducation', status: 'Planifiée', sessionId: 'sess-1', isFirstApt: false },
    { id: 'apt-7', patientId: 'pat-4', praticienId: 'pr-4', date: '2026-07-02', time: '15:00', type: 'Suivi marche', status: 'Planifiée', sessionId: 'sess-3', isFirstApt: false },
  ];

  // ─── APP STORE CLASS ───────────────────────────────────────────────────────
  class AppStore {
    static get(key, defaultValue) {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    }
    static set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    }

    constructor() {
      this._migrate();
      this.sessions     = AppStore.get('ok_sessions',      SESSIONS_DEF);
      this.users        = AppStore.get('ok_users',         INITIAL_USERS);
      this.praticiens   = AppStore.get('ok_praticiens',    INITIAL_PRATICIENS);
      this.patients     = AppStore.get('ok_patients_v2',   INITIAL_PATIENTS);
      this.appointments = AppStore.get('ok_appointments_v2', INITIAL_APPOINTMENTS);
      this.lang         = AppStore.get('ok_lang',          'fr');
      this.currentUser  = AppStore.get('ok_current_user',  null);
      this.save();
    }

    _migrate() {
      // Remove v1 keys that conflict with new model
      ['ok_staff', 'ok_logged_in', 'ok_patients', 'ok_appointments'].forEach(k => {
        localStorage.removeItem(k);
      });
      // Bust praticiens/users cache when seed data version is upgraded
      const DATA_VERSION = 'v2.1';
      if (localStorage.getItem('ok_data_version') !== DATA_VERSION) {
        localStorage.removeItem('ok_users');
        localStorage.removeItem('ok_praticiens');
        localStorage.setItem('ok_data_version', DATA_VERSION);
      }
    }

    save() {
      AppStore.set('ok_sessions',         this.sessions);
      AppStore.set('ok_users',            this.users);
      AppStore.set('ok_praticiens',       this.praticiens);
      AppStore.set('ok_patients_v2',      this.patients);
      AppStore.set('ok_appointments_v2',  this.appointments);
      AppStore.set('ok_lang',             this.lang);
      AppStore.set('ok_current_user',     this.currentUser);
    }

    // ── Auth ───────────────────────────────────────────────────────────────
    login(email, password) {
      const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      if (user) { this.currentUser = user; this.save(); }
      return user || null;
    }
    logout() { this.currentUser = null; this.save(); }

    // ── Patients ───────────────────────────────────────────────────────────
    addPatient(data) {
      const p = { id: 'pat-' + Date.now(), ...data };
      this.patients.push(p); this.save(); return p;
    }
    updatePatient(id, data) {
      const i = this.patients.findIndex(p => p.id === id);
      if (i !== -1) { this.patients[i] = { ...this.patients[i], ...data }; this.save(); }
    }
    deletePatient(id) {
      this.patients     = this.patients.filter(p => p.id !== id);
      this.appointments = this.appointments.filter(a => a.patientId !== id);
      this.save();
    }

    // ── Appointments ───────────────────────────────────────────────────────
    addAppointment(data) {
      const a = { id: 'apt-' + Date.now(), ...data };
      this.appointments.push(a); this.save(); return a;
    }
    updateAppointment(id, data) {
      const i = this.appointments.findIndex(a => a.id === id);
      if (i !== -1) { this.appointments[i] = { ...this.appointments[i], ...data }; this.save(); }
    }
    deleteAppointment(id) {
      this.appointments = this.appointments.filter(a => a.id !== id);
      this.save();
    }

    // ── Praticiens ─────────────────────────────────────────────────────────
    addPraticien(data) {
      const pr = { id: 'pr-' + Date.now(), ...data };
      this.praticiens.push(pr); this.save(); return pr;
    }
    updatePraticien(id, data) {
      const i = this.praticiens.findIndex(p => p.id === id);
      if (i !== -1) { this.praticiens[i] = { ...this.praticiens[i], ...data }; this.save(); }
    }
    deletePraticien(id) {
      this.praticiens = this.praticiens.filter(p => p.id !== id);
      this.save();
    }
    assignPraticienToSession(praticienId, sessionId) {
      const i = this.praticiens.findIndex(p => p.id === praticienId);
      if (i !== -1) { this.praticiens[i].sessionId = sessionId; this.save(); }
      // also update the linked user
      const ui = this.users.findIndex(u => u.praticienId === praticienId);
      if (ui !== -1) { this.users[ui].sessionId = sessionId; this.save(); }
    }
    removePraticienFromSession(praticienId) {
      const i = this.praticiens.findIndex(p => p.id === praticienId);
      if (i !== -1) { this.praticiens[i].sessionId = null; this.save(); }
    }

    // ── Sessions ───────────────────────────────────────────────────────────
    assignChefSession(sessionId, userId) {
      // Remove this user from any previous session
      this.users.forEach(u => { if (u.id === userId) u.sessionId = sessionId; });
      this.save();
    }
    getSessionById(id) { return this.sessions.find(s => s.id === id); }
    getSessionForUser(userId) {
      const user = this.users.find(u => u.id === userId);
      if (!user || !user.sessionId) return null;
      return this.sessions.find(s => s.id === user.sessionId);
    }
    getChefSessionUser(sessionId) {
      return this.users.find(u => u.role === 'chef_session' && u.sessionId === sessionId);
    }

    // ── Role-scoped visibility ─────────────────────────────────────────────
    getVisiblePatients() {
      const u = this.currentUser;
      if (!u) return [];
      if (u.role === 'chef_service') return this.patients;
      if (u.role === 'chef_session') return this.patients.filter(p => p.sessionId === u.sessionId);
      if (u.role === 'praticien')    return this.patients.filter(p => p.praticienId === u.praticienId);
      return [];
    }
    getVisibleAppointments() {
      const u = this.currentUser;
      if (!u) return [];
      if (u.role === 'chef_service') return this.appointments;
      if (u.role === 'chef_session') return this.appointments.filter(a => a.sessionId === u.sessionId);
      if (u.role === 'praticien')    return this.appointments.filter(a => a.sessionId === u.sessionId);
      return [];
    }
    getVisiblePraticiens() {
      const u = this.currentUser;
      if (!u) return [];
      if (u.role === 'chef_service') return this.praticiens;
      return this.praticiens.filter(p => p.sessionId === u.sessionId);
    }

    getTodayStr() {
      return new Date().toISOString().split('T')[0];
    }
  }

  OrthoKine.AppStore = AppStore;
  OrthoKine.store = new AppStore();
  OrthoKine.SESSIONS_DEF = SESSIONS_DEF;
})();
