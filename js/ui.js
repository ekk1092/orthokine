/**
 * OrthoKine Namespace - UI Render Engine Module
 */
window.OrthoKine = window.OrthoKine || {};

(function() {
  // Translate dynamic dates based on active language
  function getLocalizedDateStr(dateStr) {
    const date = new Date(dateStr);
    const locales = { fr: 'fr-FR', en: 'en-US', es: 'es-ES' };
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
    // Capitalize first letter of string
    const val = date.toLocaleDateString(locales[OrthoKine.store.lang] || 'fr-FR', options);
    return val.charAt(0).toUpperCase() + val.slice(1);
  }

  // --- DYNAMIC FORM SELECTORS ---
  function renderDropdownSelectors() {
    const pTherapistSelect = document.getElementById("p-therapist");
    const aptPatientSelect = document.getElementById("apt-patient");
    const aptTherapistSelect = document.getElementById("apt-therapist");
    const calTherapistFilter = document.getElementById("calendar-therapist-filter");
    const store = OrthoKine.store;
    const translations = OrthoKine.translations;

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
      const specialtyTranslation = s.specialty === "Orthophoniste" ? 
                                   (translations.role_ortho[store.lang] || s.specialty) : 
                                   (translations.role_kine[store.lang] || s.specialty);

      const opt = `<option value="${s.id}">${s.name} (${specialtyTranslation})</option>`;
      pTherapistSelect.insertAdjacentHTML("beforeend", opt);
      aptTherapistSelect.insertAdjacentHTML("beforeend", opt);
    });

    // Repopulate Patients
    store.patients.forEach(p => {
      aptPatientSelect.insertAdjacentHTML("beforeend", `<option value="${p.id}">${p.name}</option>`);
    });

    // Repopulate Calendar filter
    const allTherapistsTranslation = translations.filter_all_therapists[store.lang] || "Tous les thérapeutes";
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
    const store = OrthoKine.store;
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
      const translations = OrthoKine.translations;

      const specialtyTranslation = staff.specialty === "Orthophoniste" ? 
                                   (translations.role_ortho[store.lang] || staff.specialty) : 
                                   (translations.role_kine[store.lang] || staff.specialty);

      const typeTranslation = apt.type === "Initial Evaluation" ? (translations.type_evaluation[store.lang] || apt.type) :
                              (apt.type === "Speech Therapy Session" ? (translations.type_speech[store.lang] || apt.type) :
                              (apt.type === "Kinesitherapy Session" ? (translations.type_kine[store.lang] || apt.type) :
                              (translations.type_follow_up[store.lang] || apt.type)));

      const statusBadge = apt.status === "Completed" ? "badge-success" : (apt.status === "Cancelled" ? "badge-danger" : "badge-primary");
      const statusTranslation = apt.status === "Completed" ? (translations.status_completed[store.lang] || apt.status) :
                                (apt.status === "Cancelled" ? (translations.status_cancelled[store.lang] || apt.status) :
                                (translations.status_scheduled[store.lang] || apt.status));

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
    const store = OrthoKine.store;
    const translations = OrthoKine.translations;
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

      const statusTranslation = p.status === "Active" ? (translations.status_active[store.lang] || p.status) :
                                (p.status === "On Hold" ? (translations.status_on_hold[store.lang] || p.status) :
                                (translations.status_discharged[store.lang] || p.status));

      const genderTranslation = p.gender === "Male" ? (translations.gender_male[store.lang] || p.gender) :
                                (p.gender === "Female" ? (translations.gender_female[store.lang] || p.gender) :
                                (translations.gender_other[store.lang] || p.gender));

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
              <button class="btn btn-secondary" onclick="OrthoKine.openPatientModal('${p.id}')" style="padding: 0.4rem; font-size: 0.8rem;"><i data-lucide="edit" style="width: 14px; height: 14px;"></i></button>
              <button class="btn btn-danger" onclick="OrthoKine.deletePatientConfirm('${p.id}')" style="padding: 0.4rem; font-size: 0.8rem;"><i data-lucide="trash-2" style="width: 14px; height: 14px;"></i></button>
            </div>
          </td>
        </tr>
      `;
      tbody.insertAdjacentHTML("beforeend", tr);
    });
  }

  // --- 3. SCHEDULE CALENDAR ---
  function renderCalendar(month, year) {
    const container = document.getElementById("calendar-dates-container");
    const monthYearLabel = document.getElementById("calendar-current-month-year");
    const therapistFilter = document.getElementById("calendar-therapist-filter").value;
    const store = OrthoKine.store;
    
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
          <div class="calendar-event-dot" style="${styleClass}" onclick="event.stopPropagation(); OrthoKine.openAppointmentModal('${apt.id}')">
            <strong>${apt.time}</strong> <span>${patient.name}</span>
          </div>
        `;
      });

      if (dayApts.length > 3) {
        const moreStr = store.lang === 'fr' ? 'de plus' : (store.lang === 'es' ? 'más' : 'more');
        aptHtml += `<div style="font-size: 0.7rem; font-weight: 700; text-align: center; color: hsl(var(--muted-foreground));">+${dayApts.length - 3} ${moreStr}</div>`;
      }

      const cell = `
        <div class="${cellClass}" onclick="OrthoKine.openAppointmentForDate('${formattedDate}')">
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

  // --- 4. TEAM MEMBERS ---
  function renderTeam() {
    const grid = document.getElementById("team-members-grid");
    const store = OrthoKine.store;
    const translations = OrthoKine.translations;
    grid.innerHTML = "";

    store.staff.forEach(s => {
      // Count active patients and scheduled appointments for this staff member
      const patientCount = store.patients.filter(p => p.therapistId === s.id).length;
      const sessionCount = store.appointments.filter(a => a.therapistId === s.id).length;

      const initials = s.name.split(" ").map(n => n[0]).join("").slice(0, 2);

      // Specialty translation
      const specialtyTranslation = s.specialty === "Orthophoniste" ? 
                                   (translations.role_ortho[store.lang] || s.specialty) : 
                                   (translations.role_kine[store.lang] || s.specialty);

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

  function renderAll() {
    if (!OrthoKine.store.loggedIn) return;

    renderDropdownSelectors();
    renderDashboard();
    renderPatientsTable();
    renderCalendar(OrthoKine.currentCalendarMonth, OrthoKine.currentCalendarYear);
    renderTeam();
    
    // Re-run Lucide Icons to bind SVG visuals
    lucide.createIcons();
  }

  OrthoKine.currentCalendarMonth = 5; // June (0-indexed)
  OrthoKine.currentCalendarYear = 2026;

  OrthoKine.renderDropdownSelectors = renderDropdownSelectors;
  OrthoKine.renderDashboard = renderDashboard;
  OrthoKine.renderPatientsTable = renderPatientsTable;
  OrthoKine.renderCalendar = renderCalendar;
  OrthoKine.renderTeam = renderTeam;
  OrthoKine.renderAll = renderAll;
})();
