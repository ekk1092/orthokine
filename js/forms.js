/**
 * OrthoKine Namespace - Form Submission & Modal Controllers (v2.0)
 */
window.OrthoKine = window.OrthoKine || {};

(function () {

  function initForms() {
    const store = OrthoKine.store;

    // ── Global Header Action Buttons ───────────────────────────────────────
    document.getElementById('global-new-rdv-btn')?.addEventListener('click', () => openAppointmentModal());
    document.getElementById('global-new-first-rdv-btn')?.addEventListener('click', () => openFirstRdvModal());

    // ── Patient Form ───────────────────────────────────────────────────────
    document.getElementById('add-patient-trigger')?.addEventListener('click', () => openPatientModal());

    document.getElementById('patient-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('patient-form-id').value;

      const data = {
        name:              document.getElementById('p-name').value,
        age:               parseInt(document.getElementById('p-age').value),
        gender:            document.getElementById('p-gender').value,
        status:            document.getElementById('p-status').value,
        condition:         document.getElementById('p-condition').value,
        contact:           document.getElementById('p-contact').value,
        praticienId:       document.getElementById('p-praticien').value,
        sessionId:         document.getElementById('p-session').value,
        notes:             document.getElementById('p-notes').value,
        // New fields
        nombreSeances:     parseInt(document.getElementById('p-seances').value) || 0,
        statutMatrimonial: document.getElementById('p-stat-matrimonial').value,
        fonction:          document.getElementById('p-fonction').value,
        adresse:           document.getElementById('p-adresse').value,
        histoireMaladie:   document.getElementById('p-histoire').value,
      };

      if (id) { store.updatePatient(id, data); }
      else    { store.addPatient(data); }

      document.getElementById('patient-modal').close();
      OrthoKine.renderAll();
    });

    // ── Appointment Form ───────────────────────────────────────────────────
    document.getElementById('appointment-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('appointment-form-id').value;
      const user = store.currentUser;

      const data = {
        patientId:   document.getElementById('apt-patient').value,
        praticienId: document.getElementById('apt-praticien').value,
        date:        document.getElementById('apt-date').value,
        time:        document.getElementById('apt-time').value,
        type:        document.getElementById('apt-type').value,
        status:      document.getElementById('apt-status').value,
        sessionId:   document.getElementById('apt-session').value,
        isFirstApt:  false,
      };

      if (id) { store.updateAppointment(id, data); }
      else    { store.addAppointment(data); }

      document.getElementById('appointment-modal').close();
      OrthoKine.renderAll();
    });

    // ── First RDV Form (Chef Session) ──────────────────────────────────────
    document.getElementById('first-rdv-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = store.currentUser;

      const data = {
        patientId:   document.getElementById('frdv-patient').value,
        praticienId: document.getElementById('frdv-praticien').value,
        date:        document.getElementById('frdv-date').value,
        time:        document.getElementById('frdv-time').value,
        type:        'Première consultation',
        status:      'Planifiée',
        sessionId:   user ? user.sessionId : '',
        isFirstApt:  true,
      };

      store.addAppointment(data);
      document.getElementById('first-rdv-modal').close();
      OrthoKine.renderAll();
    });

    // ── Praticien / Team Form ──────────────────────────────────────────────
    document.getElementById('add-team-trigger')?.addEventListener('click', () => openTeamModal());

    document.getElementById('team-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = store.currentUser;

      const data = {
        name:      document.getElementById('t-name').value,
        specialty: document.getElementById('t-specialty').value,
        email:     document.getElementById('t-email').value,
        sessionId: user && user.role !== 'chef_service' ? user.sessionId : (document.getElementById('t-session')?.value || null),
      };

      store.addPraticien(data);
      document.getElementById('team-modal').close();
      document.getElementById('t-name').value  = '';
      document.getElementById('t-email').value = '';
      OrthoKine.renderAll();
    });

    // ── Assign Praticien to Session (Chef Session) ─────────────────────────
    document.getElementById('assign-pr-trigger')?.addEventListener('click', () => openAssignPraticienModal());

    document.getElementById('assign-pr-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const user     = store.currentUser;
      const prId     = document.getElementById('assign-pr-id').value;
      const sessId   = user ? user.sessionId : '';
      if (prId && sessId) {
        store.assignPraticienToSession(prId, sessId);
      }
      document.getElementById('assign-pr-modal').close();
      OrthoKine.renderAll();
    });

    // ── Session Assignment (Chef de Service) ───────────────────────────────
    document.getElementById('session-assign-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const sessId  = document.getElementById('session-assign-form-id').value;
      const userId  = document.getElementById('sess-chef-user').value;
      if (sessId && userId) {
        store.assignChefSession(sessId, userId);
      }
      document.getElementById('session-assign-modal').close();
      OrthoKine.renderAll();
    });

    // ── Search ─────────────────────────────────────────────────────────────
    document.getElementById('patient-search-input')?.addEventListener('input', () => {
      OrthoKine.renderPatientsTable();
      lucide.createIcons();
    });

    // ── Calendar Controls ──────────────────────────────────────────────────
    document.getElementById('calendar-therapist-filter')?.addEventListener('change', () => {
      OrthoKine.renderCalendar(OrthoKine.currentCalendarMonth, OrthoKine.currentCalendarYear);
      lucide.createIcons();
    });

    document.getElementById('calendar-prev-btn')?.addEventListener('click', () => {
      OrthoKine.currentCalendarMonth--;
      if (OrthoKine.currentCalendarMonth < 0) {
        OrthoKine.currentCalendarMonth = 11;
        OrthoKine.currentCalendarYear--;
      }
      OrthoKine.renderCalendar(OrthoKine.currentCalendarMonth, OrthoKine.currentCalendarYear);
      lucide.createIcons();
    });

    document.getElementById('calendar-next-btn')?.addEventListener('click', () => {
      OrthoKine.currentCalendarMonth++;
      if (OrthoKine.currentCalendarMonth > 11) {
        OrthoKine.currentCalendarMonth = 0;
        OrthoKine.currentCalendarYear++;
      }
      OrthoKine.renderCalendar(OrthoKine.currentCalendarMonth, OrthoKine.currentCalendarYear);
      lucide.createIcons();
    });

    document.getElementById('calendar-today-btn')?.addEventListener('click', () => {
      const now = new Date();
      OrthoKine.currentCalendarMonth = now.getMonth();
      OrthoKine.currentCalendarYear  = now.getFullYear();
      OrthoKine.renderCalendar(OrthoKine.currentCalendarMonth, OrthoKine.currentCalendarYear);
      lucide.createIcons();
    });
  }

  // ─── OPEN PATIENT MODAL ────────────────────────────────────────────────────
  function openPatientModal(id = null) {
    const modal = document.getElementById('patient-modal');
    const form  = document.getElementById('patient-form');
    const title = document.getElementById('patient-modal-title');
    const store = OrthoKine.store;
    const user  = store.currentUser;

    form.reset();

    if (id) {
      title.textContent = 'Modifier Profil Patient';
      const p = store.patients.find(pt => pt.id === id);
      if (p) {
        document.getElementById('patient-form-id').value       = p.id;
        document.getElementById('p-name').value                = p.name;
        document.getElementById('p-age').value                 = p.age;
        document.getElementById('p-gender').value              = p.gender;
        document.getElementById('p-status').value              = p.status;
        document.getElementById('p-condition').value           = p.condition;
        document.getElementById('p-contact').value             = p.contact;
        document.getElementById('p-notes').value               = p.notes || '';
        document.getElementById('p-seances').value             = p.nombreSeances || 0;
        document.getElementById('p-stat-matrimonial').value    = p.statutMatrimonial || '';
        document.getElementById('p-fonction').value            = p.fonction || '';
        document.getElementById('p-adresse').value             = p.adresse || '';
        document.getElementById('p-histoire').value            = p.histoireMaladie || '';
        // Selects (re-render selects first)
        OrthoKine.renderAll();
        setTimeout(() => {
          document.getElementById('p-praticien').value = p.praticienId || '';
          document.getElementById('p-session').value   = p.sessionId   || '';
        }, 50);
      }
    } else {
      title.textContent = 'Enregistrer Nouveau Patient';
      document.getElementById('patient-form-id').value = '';
      // Auto-fill session for non-chef_service
      if (user && user.role !== 'chef_service' && user.sessionId) {
        setTimeout(() => {
          document.getElementById('p-session').value = user.sessionId;
        }, 50);
      }
    }

    modal.showModal();
    lucide.createIcons();
  }

  // ─── DELETE PATIENT ────────────────────────────────────────────────────────
  function deletePatientConfirm(id) {
    const store   = OrthoKine.store;
    const patient = store.patients.find(p => p.id === id);
    if (patient && confirm(`Supprimer le patient "${patient.name}" ? Tous ses rendez-vous seront également supprimés.`)) {
      store.deletePatient(id);
      OrthoKine.renderAll();
    }
  }

  // ─── OPEN APPOINTMENT MODAL ────────────────────────────────────────────────
  function openAppointmentModal(id = null, defaultDate = null) {
    const modal = document.getElementById('appointment-modal');
    const form  = document.getElementById('appointment-form');
    const title = document.getElementById('appointment-modal-title');
    const store = OrthoKine.store;
    const user  = store.currentUser;

    form.reset();

    if (id) {
      title.textContent = 'Modifier Rendez-vous';
      const a = store.appointments.find(ap => ap.id === id);
      if (a) {
        document.getElementById('appointment-form-id').value = a.id;
        document.getElementById('apt-date').value            = a.date;
        document.getElementById('apt-time').value            = a.time;
        document.getElementById('apt-type').value            = a.type;
        document.getElementById('apt-status').value          = a.status;
        setTimeout(() => {
          document.getElementById('apt-patient').value   = a.patientId   || '';
          document.getElementById('apt-praticien').value = a.praticienId || '';
          document.getElementById('apt-session').value   = a.sessionId   || '';
        }, 50);
      }
    } else {
      title.textContent = 'Planifier un Rendez-vous';
      document.getElementById('appointment-form-id').value = '';
      document.getElementById('apt-date').value            = defaultDate || store.getTodayStr();
      document.getElementById('apt-time').value            = '10:00';
      document.getElementById('apt-status').value          = 'Planifiée';
      if (user && user.role !== 'chef_service' && user.sessionId) {
        setTimeout(() => {
          document.getElementById('apt-session').value = user.sessionId;
          if (user.praticienId) document.getElementById('apt-praticien').value = user.praticienId;
        }, 50);
      }
    }

    modal.showModal();
    lucide.createIcons();
  }

  // ─── OPEN FIRST RDV MODAL (Chef Session) ───────────────────────────────────
  function openFirstRdvModal() {
    const modal = document.getElementById('first-rdv-modal');
    const form  = document.getElementById('first-rdv-form');
    const store = OrthoKine.store;
    const user  = store.currentUser;

    form.reset();
    document.getElementById('frdv-date').value = store.getTodayStr();
    document.getElementById('frdv-time').value = '09:00';

    // Populate patient and praticien selects for this session
    const sessPatients = store.patients.filter(p => p.sessionId === user.sessionId);
    const sessPrs      = store.praticiens.filter(p => p.sessionId === user.sessionId);

    const frdvPat = document.getElementById('frdv-patient');
    const frdvPr  = document.getElementById('frdv-praticien');
    if (frdvPat) {
      frdvPat.innerHTML = `<option value="">-- Sélectionner --</option>`;
      sessPatients.forEach(p => {
        const o = document.createElement('option');
        o.value = p.id; o.textContent = p.name;
        frdvPat.appendChild(o);
      });
    }
    if (frdvPr) {
      frdvPr.innerHTML = `<option value="">-- Sélectionner --</option>`;
      sessPrs.forEach(pr => {
        const o = document.createElement('option');
        o.value = pr.id; o.textContent = `${pr.name} (${pr.specialty})`;
        frdvPr.appendChild(o);
      });
    }

    modal.showModal();
    lucide.createIcons();
  }

  function openAppointmentForDate(dateStr) {
    openAppointmentModal(null, dateStr);
  }

  // ─── OPEN TEAM MODAL ───────────────────────────────────────────────────────
  function openTeamModal() {
    const form = document.getElementById('team-form');
    if (form) form.reset();
    // Show/hide session select based on role
    const sessRow = document.getElementById('t-session-row');
    const user    = OrthoKine.store.currentUser;
    if (sessRow) {
      sessRow.style.display = (user && user.role === 'chef_service') ? '' : 'none';
    }
    document.getElementById('team-modal').showModal();
    lucide.createIcons();
  }

  // ─── OPEN SESSION ASSIGN MODAL (Chef de Service) ───────────────────────────
  function openSessionAssignModal(sessionId) {
    const modal  = document.getElementById('session-assign-modal');
    const store  = OrthoKine.store;
    const sess   = store.getSessionById(sessionId);
    if (!sess) return;

    document.getElementById('session-assign-form-id').value = sessionId;
    document.getElementById('session-assign-title').textContent = `Gérer : ${sess.name}`;

    // Pre-select current chef
    const currentChef = store.getChefSessionUser(sessionId);
    OrthoKine.renderAll();
    setTimeout(() => {
      if (currentChef) {
        const sel = document.getElementById('sess-chef-user');
        if (sel) sel.value = currentChef.id;
      }
    }, 50);

    modal.showModal();
    lucide.createIcons();
  }

  // ─── OPEN ASSIGN PRATICIEN MODAL (Chef Session) ────────────────────────────
  function openAssignPraticienModal() {
    const modal = document.getElementById('assign-pr-modal');
    OrthoKine.renderDropdownSelectors?.() || OrthoKine.renderAll();
    modal.showModal();
    lucide.createIcons();
  }

  // ─── EXPORTS ───────────────────────────────────────────────────────────────
  OrthoKine.initForms                 = initForms;
  OrthoKine.openPatientModal          = openPatientModal;
  OrthoKine.deletePatientConfirm      = deletePatientConfirm;
  OrthoKine.openAppointmentModal      = openAppointmentModal;
  OrthoKine.openFirstRdvModal         = openFirstRdvModal;
  OrthoKine.openAppointmentForDate    = openAppointmentForDate;
  OrthoKine.openTeamModal             = openTeamModal;
  OrthoKine.openSessionAssignModal    = openSessionAssignModal;
  OrthoKine.openAssignPraticienModal  = openAssignPraticienModal;
})();
