/**
 * OrthoKine Namespace - Form Submission & Modal Controllers
 */
window.OrthoKine = window.OrthoKine || {};

(function() {
  function initForms() {
    const store = OrthoKine.store;

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
      OrthoKine.renderAll();
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
      OrthoKine.renderAll();
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
      
      OrthoKine.renderAll();
    });

    // Bind patient search query
    document.getElementById("patient-search-input").addEventListener("input", () => {
      OrthoKine.renderPatientsTable();
      lucide.createIcons();
    });

    // Calendar Navigation Trigger Filters
    document.getElementById("calendar-therapist-filter").addEventListener("change", () => {
      const filterVal = document.getElementById("calendar-therapist-filter").value;
      const filterBadge = document.getElementById("calendar-filter-badge");
      
      if (filterVal === "all") {
        filterBadge.textContent = OrthoKine.getTranslation('filter_all_therapists') || "Tous les thérapeutes";
      } else {
        const staff = store.staff.find(s => s.id === filterVal);
        filterBadge.textContent = staff ? staff.name : "Filtered";
      }

      OrthoKine.renderCalendar(OrthoKine.currentCalendarMonth, OrthoKine.currentCalendarYear);
      lucide.createIcons();
    });
  }

  // Opening Patient Modal
  function openPatientModal(id = null) {
    const modal = document.getElementById("patient-modal");
    const form = document.getElementById("patient-form");
    const title = document.getElementById("patient-modal-title");
    const store = OrthoKine.store;
    
    form.reset();
    
    if (id) {
      const editTitles = { fr: "Modifier Profil Patient", en: "Edit Patient Profile", es: "Editar Perfil del Paciente" };
      title.textContent = OrthoKine.getLangValue(editTitles);

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
      title.textContent = OrthoKine.getTranslation('modal_patient_new') || "Enregistrer Nouveau Patient";
      document.getElementById("patient-form-id").value = "";
    }
    
    modal.showModal();
    lucide.createIcons();
  }

  // Deletion confirm
  function deletePatientConfirm(id) {
    const store = OrthoKine.store;
    const patient = store.patients.find(p => p.id === id);
    if (patient) {
      const confirmMsgs = {
        fr: `Êtes-vous sûr de vouloir supprimer le patient "${patient.name}" ? Cela supprimera également tous ses rendez-vous associés.`,
        en: `Are you sure you want to delete patient "${patient.name}"? This will also remove all scheduled appointments associated with them.`,
        es: `¿Está seguro de que desea eliminar al paciente "${patient.name}"? Esto también eliminará todas las citas programadas asociadas.`
      };

      if (confirm(OrthoKine.getLangValue(confirmMsgs))) {
        store.deletePatient(id);
        OrthoKine.renderAll();
      }
    }
  }

  // Opening Appointment Modal
  function openAppointmentModal(id = null, defaultDate = null) {
    const modal = document.getElementById("appointment-modal");
    const form = document.getElementById("appointment-form");
    const title = document.getElementById("appointment-modal-title");
    const store = OrthoKine.store;
    
    form.reset();
    
    if (id) {
      const editTitles = { fr: "Modifier Détails du RDV", en: "Edit Appointment Details", es: "Editar Detalles de la Cita" };
      title.textContent = OrthoKine.getLangValue(editTitles);

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
      title.textContent = OrthoKine.getTranslation('modal_apt_new') || "Planifier Nouveau RDV";
      document.getElementById("appointment-form-id").value = "";
      // Set default date if passed or default to system standard today (June 2, 2026)
      document.getElementById("apt-date").value = defaultDate || "2026-06-02";
      document.getElementById("apt-time").value = "10:00";
      document.getElementById("apt-status").value = "Scheduled";
    }
    
    modal.showModal();
    lucide.createIcons();
  }

  function openAppointmentForDate(dateStr) {
    openAppointmentModal(null, dateStr);
  }

  function openTeamModal() {
    document.getElementById("team-modal").showModal();
    lucide.createIcons();
  }

  OrthoKine.initForms = initForms;
  OrthoKine.openPatientModal = openPatientModal;
  OrthoKine.deletePatientConfirm = deletePatientConfirm;
  OrthoKine.openAppointmentModal = openAppointmentModal;
  OrthoKine.openAppointmentForDate = openAppointmentForDate;
  OrthoKine.openTeamModal = openTeamModal;
})();
