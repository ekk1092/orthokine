/**
 * OrthoKine Namespace - UI Render Engine Module
 */
window.OrthoKine = window.OrthoKine || {};

(function() {
  // Translate dynamic dates based on active language
  function getLocalizedDateStr(dateStr) {
    const date = new Date(dateStr);
    const lang = OrthoKine.store.lang;
    const locale = (lang === 'en') ? 'en-US' : (lang === 'es' ? 'es-ES' : 'fr-FR');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
    // Capitalize first letter of string
    const val = date.toLocaleDateString(locale, options);
    return val.charAt(0).toUpperCase() + val.slice(1);
  }

  // --- DYNAMIC FORM SELECTORS ---
  function renderDropdownSelectors() {
    const pTherapistSelect = document.getElementById("p-therapist");
    const aptPatientSelect = document.getElementById("apt-patient");
    const aptTherapistSelect = document.getElementById("apt-therapist");
    const calTherapistFilter = document.getElementById("calendar-therapist-filter");
    const store = OrthoKine.store;

    // Keep current selection values
    const prevPTherapist = pTherapistSelect.value;
    const prevAptPatient = aptPatientSelect.value;
    const prevAptTherapist = aptTherapistSelect.value;
    const prevCalFilter = calTherapistFilter.value;

    // Clear options
    pTherapistSelect.innerHTML = "";
    
    const selectLabel = store.lang === 'fr' ? 'Sélectionner' : (store.lang === 'es' ? 'Seleccionar' : 'Select');
    
    aptPatientSelect.innerHTML = "";
    const pOption = document.createElement("option");
    pOption.value = "";
    pOption.textContent = `-- ${selectLabel} --`;
    aptPatientSelect.appendChild(pOption);

    aptTherapistSelect.innerHTML = "";
    const tOption = document.createElement("option");
    tOption.value = "";
    tOption.textContent = `-- ${selectLabel} --`;
    aptTherapistSelect.appendChild(tOption);
    
    // Repopulate Staff
    store.staff.forEach(s => {
      const specialtyTranslation = s.specialty === "Orthophoniste" ? 
                                   (OrthoKine.getTranslation('role_ortho') || s.specialty) : 
                                   (OrthoKine.getTranslation('role_kine') || s.specialty);

      const opt1 = document.createElement("option");
      opt1.value = s.id;
      opt1.textContent = `${s.name} (${specialtyTranslation})`;
      pTherapistSelect.appendChild(opt1);

      const opt2 = document.createElement("option");
      opt2.value = s.id;
      opt2.textContent = `${s.name} (${specialtyTranslation})`;
      aptTherapistSelect.appendChild(opt2);
    });

    // Repopulate Patients
    store.patients.forEach(p => {
      const opt = document.createElement("option");
      opt.value = p.id;
      opt.textContent = p.name;
      aptPatientSelect.appendChild(opt);
    });

    // Repopulate Calendar filter
    const allTherapistsTranslation = OrthoKine.getTranslation('filter_all_therapists') || "Tous les thérapeutes";
    calTherapistFilter.innerHTML = "";
    const allOption = document.createElement("option");
    allOption.value = "all";
    allOption.textContent = allTherapistsTranslation;
    calTherapistFilter.appendChild(allOption);
    store.staff.forEach(s => {
      const opt = document.createElement("option");
      opt.value = s.id;
      opt.textContent = s.name;
      calTherapistFilter.appendChild(opt);
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
    document.getElementById("today-rdv-count-badge").textContent = `${todayAppointments.length} ${OrthoKine.escapeHTML(appointmentsTranslation)}`;

    // Fill Today's Appointment Table
    const tbody = document.getElementById("today-appointments-table");
    tbody.innerHTML = "";

    if (todayAppointments.length === 0) {
      const emptyTranslation = {
        fr: "Aucune séance planifiée pour aujourd'hui.",
        en: "No appointments scheduled for today.",
        es: "No hay citas programadas para hoy."
      };
      tbody.innerHTML = "";
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 5;
      td.style.textAlign = "center";
      td.style.color = "hsl(var(--muted-foreground))";
      td.style.padding = "2rem";
      td.textContent = OrthoKine.getLangValue(emptyTranslation);
      tr.appendChild(td);
      tbody.appendChild(tr);
      return;
    }

    // Sort by time
    todayAppointments.sort((a, b) => a.time.localeCompare(b.time));

    todayAppointments.forEach(apt => {
      const patient = store.patients.find(p => p.id === apt.patientId) || { name: "Unknown" };
      const staff = store.staff.find(s => s.id === apt.therapistId) || { name: "Unknown", specialty: "" };

      const specialtyTranslation = staff.specialty === "Orthophoniste" ? 
                                   (OrthoKine.getTranslation('role_ortho') || staff.specialty) : 
                                   (OrthoKine.getTranslation('role_kine') || staff.specialty);

      const typeTranslation = apt.type === "Initial Evaluation" ? (OrthoKine.getTranslation('type_evaluation') || apt.type) :
                              (apt.type === "Speech Therapy Session" ? (OrthoKine.getTranslation('type_speech') || apt.type) :
                              (apt.type === "Kinesitherapy Session" ? (OrthoKine.getTranslation('type_kine') || apt.type) :
                              (OrthoKine.getTranslation('type_follow_up') || apt.type)));

      const statusBadge = apt.status === "Completed" ? "badge-success" : (apt.status === "Cancelled" ? "badge-danger" : "badge-primary");
      const statusTranslation = apt.status === "Completed" ? (OrthoKine.getTranslation('status_completed') || apt.status) :
                                (apt.status === "Cancelled" ? (OrthoKine.getTranslation('status_cancelled') || apt.status) :
                                (OrthoKine.getTranslation('status_scheduled') || apt.status));

      const row = document.createElement("tr");

      // Time Cell
      const timeCell = row.insertCell();
      timeCell.style.fontWeight = "700";
      timeCell.textContent = apt.time;

      // Patient Info Cell
      const patientCell = row.insertCell();
      const patientNameDiv = document.createElement("div");
      patientNameDiv.style.fontWeight = "600";
      patientNameDiv.textContent = patient.name;
      const patientContactDiv = document.createElement("div");
      patientContactDiv.style.fontSize = "0.75rem";
      patientContactDiv.style.color = "hsl(var(--muted-foreground))";
      patientContactDiv.textContent = patient.contact;
      patientCell.appendChild(patientNameDiv);
      patientCell.appendChild(patientContactDiv);

      // Staff Info Cell
      const staffCell = row.insertCell();
      const staffNameDiv = document.createElement("div");
      staffNameDiv.style.fontWeight = "500";
      staffNameDiv.textContent = staff.name;
      const staffSpecDiv = document.createElement("div");
      staffSpecDiv.style.fontSize = "0.75rem";
      staffSpecDiv.style.color = "hsl(var(--primary))";
      staffSpecDiv.style.fontWeight = "600";
      staffSpecDiv.textContent = specialtyTranslation;
      staffCell.appendChild(staffNameDiv);
      staffCell.appendChild(staffSpecDiv);

      // Type Cell
      const typeCell = row.insertCell();
      const typeSpan = document.createElement("span");
      typeSpan.className = "badge badge-muted";
      typeSpan.textContent = typeTranslation;
      typeCell.appendChild(typeSpan);

      // Status Cell
      const statusCell = row.insertCell();
      const statusSpan = document.createElement("span");
      statusSpan.className = `badge ${statusBadge}`;
      statusSpan.textContent = statusTranslation;
      statusCell.appendChild(statusSpan);

      tbody.appendChild(row);
    });
  }

  // --- 2. PATIENTS REGISTRY ---
  function renderPatientsTable() {
    const searchQuery = document.getElementById("patient-search-input").value.toLowerCase();
    const tbody = document.getElementById("patients-table-body");
    const store = OrthoKine.store;
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
      tbody.innerHTML = "";
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 7;
      td.style.textAlign = "center";
      td.style.color = "hsl(var(--muted-foreground))";
      td.style.padding = "2rem";
      td.textContent = OrthoKine.getLangValue(emptyMsg);
      tr.appendChild(td);
      tbody.appendChild(tr);
      return;
    }

    filteredPatients.forEach(p => {
      const staff = store.staff.find(s => s.id === p.therapistId) || { name: "Unassigned" };
      
      let statusClass = "badge-success";
      if (p.status === "On Hold") statusClass = "badge-warning";
      if (p.status === "Discharged") statusClass = "badge-danger";

      const statusTranslation = p.status === "Active" ? (OrthoKine.getTranslation('status_active') || p.status) :
                                (p.status === "On Hold" ? (OrthoKine.getTranslation('status_on_hold') || p.status) :
                                (OrthoKine.getTranslation('status_discharged') || p.status));

      const genderTranslation = p.gender === "Male" ? (OrthoKine.getTranslation('gender_male') || p.gender) :
                                (p.gender === "Female" ? (OrthoKine.getTranslation('gender_female') || p.gender) :
                                (OrthoKine.getTranslation('gender_other') || p.gender));

      const row = document.createElement("tr");

      // Patient Info Cell
      const nameCell = row.insertCell();
      const patientNameDiv = document.createElement("div");
      patientNameDiv.style.fontWeight = "700";
      patientNameDiv.textContent = p.name;
      const patientIdDiv = document.createElement("div");
      patientIdDiv.style.fontSize = "0.75rem";
      patientIdDiv.style.color = "hsl(var(--muted-foreground))";
      patientIdDiv.textContent = `ID: ${p.id}`;
      nameCell.appendChild(patientNameDiv);
      nameCell.appendChild(patientIdDiv);

      // Age / Gender Cell
      const ageGenderCell = row.insertCell();
      ageGenderCell.textContent = `${p.age} / ${genderTranslation}`;

      // Condition Cell
      const conditionCell = row.insertCell();
      const conditionSpan = document.createElement("span");
      conditionSpan.className = "badge badge-muted";
      conditionSpan.style.maxWidth = "180px";
      conditionSpan.style.overflow = "hidden";
      conditionSpan.style.textOverflow = "ellipsis";
      conditionSpan.style.whiteSpace = "nowrap";
      conditionSpan.textContent = p.condition;
      conditionCell.appendChild(conditionSpan);

      // Assigned Therapist Cell
      const therapistCell = row.insertCell();
      therapistCell.style.fontWeight = "500";
      therapistCell.style.color = "hsl(var(--primary))";
      therapistCell.textContent = staff.name;

      // Contact Cell
      const contactCell = row.insertCell();
      contactCell.textContent = p.contact;

      // Status Cell
      const statusCell = row.insertCell();
      const statusSpan = document.createElement("span");
      statusSpan.className = `badge ${statusClass}`;
      statusSpan.textContent = statusTranslation;
      statusCell.appendChild(statusSpan);

      // Actions Cell
      const actionsCell = row.insertCell();
      const btnContainer = document.createElement("div");
      btnContainer.style.display = "flex";
      btnContainer.style.gap = "0.5rem";

      const editBtn = document.createElement("button");
      editBtn.className = "btn btn-secondary";
      editBtn.style.padding = "0.4rem";
      editBtn.style.fontSize = "0.8rem";
      editBtn.onclick = () => { OrthoKine.openPatientModal(p.id); };
      const editIcon = document.createElement("i");
      editIcon.setAttribute("data-lucide", "edit");
      editIcon.style.width = "14px";
      editIcon.style.height = "14px";
      editBtn.appendChild(editIcon);

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "btn btn-danger";
      deleteBtn.style.padding = "0.4rem";
      deleteBtn.style.fontSize = "0.8rem";
      deleteBtn.onclick = () => { OrthoKine.deletePatientConfirm(p.id); };
      const deleteIcon = document.createElement("i");
      deleteIcon.setAttribute("data-lucide", "trash-2");
      deleteIcon.style.width = "14px";
      deleteIcon.style.height = "14px";
      deleteBtn.appendChild(deleteIcon);

      btnContainer.appendChild(editBtn);
      btnContainer.appendChild(deleteBtn);
      actionsCell.appendChild(btnContainer);

      tbody.appendChild(row);
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
    
    const names = OrthoKine.getLangValue(monthNames);
    monthYearLabel.textContent = `${names.at(month)} ${year}`;

    // Get first day of the month
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Adjust so Mon=0, Tue=1, ..., Sun=6
    const adjustedFirstDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevMonthTotalDays = new Date(year, month, 0).getDate();

    // 1. Fill previous month dates (muted)
    for (let i = adjustedFirstDay - 1; i >= 0; i--) {
      const day = prevMonthTotalDays - i;
      const cell = document.createElement("div");
      cell.className = "calendar-cell muted";
      const numSpan = document.createElement("span");
      numSpan.className = "calendar-cell-num";
      numSpan.textContent = day;
      cell.appendChild(numSpan);
      container.appendChild(cell);
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

      const cell = document.createElement("div");
      cell.className = cellClass;
      cell.onclick = () => { OrthoKine.openAppointmentForDate(formattedDate); };

      const numSpan = document.createElement("span");
      numSpan.className = "calendar-cell-num";
      numSpan.textContent = day;
      cell.appendChild(numSpan);

      const eventsDiv = document.createElement("div");
      eventsDiv.className = "calendar-cell-events";

      dayApts.slice(0, 3).forEach(apt => {
        const patient = store.patients.find(p => p.id === apt.patientId) || { name: "Unknown" };
        const therapist = store.staff.find(s => s.id === apt.therapistId) || { specialty: "" };
        
        const eventDot = document.createElement("div");
        eventDot.className = "calendar-event-dot";
        if (therapist.specialty === "Orthophoniste") {
          eventDot.style.backgroundColor = "hsl(var(--primary) / 0.15)";
          eventDot.style.color = "hsl(var(--primary))";
        } else {
          eventDot.style.backgroundColor = "hsl(var(--accent) / 0.15)";
          eventDot.style.color = "hsl(var(--accent))";
        }
        eventDot.onclick = (e) => {
          e.stopPropagation();
          OrthoKine.openAppointmentModal(apt.id);
        };

        const timeStrong = document.createElement("strong");
        timeStrong.textContent = apt.time;
        const nameSpan = document.createElement("span");
        nameSpan.textContent = patient.name;
        
        eventDot.appendChild(timeStrong);
        eventDot.appendChild(document.createTextNode(" "));
        eventDot.appendChild(nameSpan);
        eventsDiv.appendChild(eventDot);
      });

      if (dayApts.length > 3) {
        const moreStr = store.lang === 'fr' ? 'de plus' : (store.lang === 'es' ? 'más' : 'more');
        const moreDiv = document.createElement("div");
        moreDiv.style.fontSize = "0.7rem";
        moreDiv.style.fontWeight = "700";
        moreDiv.style.textAlign = "center";
        moreDiv.style.color = "hsl(var(--muted-foreground))";
        moreDiv.textContent = `+${dayApts.length - 3} ${moreStr}`;
        eventsDiv.appendChild(moreDiv);
      }

      cell.appendChild(eventsDiv);
      container.appendChild(cell);
    }

    // 3. Fill remaining space to keep calendar square (42 cells total)
    const remainingCells = 42 - (adjustedFirstDay + totalDays);
    for (let day = 1; day <= remainingCells; day++) {
      const cell = document.createElement("div");
      cell.className = "calendar-cell muted";
      const numSpan = document.createElement("span");
      numSpan.className = "calendar-cell-num";
      numSpan.textContent = day;
      cell.appendChild(numSpan);
      container.appendChild(cell);
    }
  }

  // --- 4. TEAM MEMBERS ---
  function renderTeam() {
    const grid = document.getElementById("team-members-grid");
    const store = OrthoKine.store;
    grid.innerHTML = "";

    store.staff.forEach(s => {
      // Count active patients and scheduled appointments for this staff member
      const patientCount = store.patients.filter(p => p.therapistId === s.id).length;
      const sessionCount = store.appointments.filter(a => a.therapistId === s.id).length;

      const initials = s.name.split(" ").map(n => n[0]).join("").slice(0, 2);

      // Specialty translation
      const specialtyTranslation = s.specialty === "Orthophoniste" ? 
                                   (OrthoKine.getTranslation('role_ortho') || s.specialty) : 
                                   (OrthoKine.getTranslation('role_kine') || s.specialty);

      const patientsTranslation = store.lang === 'fr' ? 'Patients' : (store.lang === 'es' ? 'Pacientes' : 'Patients');
      const sessionsTranslation = store.lang === 'fr' ? 'Séances' : (store.lang === 'es' ? 'Sesiones' : 'Sessions');

      const cardDiv = document.createElement("div");
      cardDiv.className = "team-card glass-panel";

      const avatarDiv = document.createElement("div");
      avatarDiv.className = "team-card-avatar";
      avatarDiv.textContent = initials;
      cardDiv.appendChild(avatarDiv);

      const nameH3 = document.createElement("h3");
      nameH3.textContent = s.name;
      cardDiv.appendChild(nameH3);

      const specialtyP = document.createElement("p");
      specialtyP.className = "specialty";
      specialtyP.textContent = specialtyTranslation;
      cardDiv.appendChild(specialtyP);

      const emailP = document.createElement("p");
      emailP.className = "email";
      emailP.textContent = s.email;
      cardDiv.appendChild(emailP);

      const statsDiv = document.createElement("div");
      statsDiv.className = "team-card-stats";

      const patientStat = document.createElement("div");
      patientStat.className = "team-stat";
      const patientH5 = document.createElement("h5");
      patientH5.textContent = patientCount;
      const patientP = document.createElement("p");
      patientP.textContent = patientsTranslation;
      patientStat.appendChild(patientH5);
      patientStat.appendChild(patientP);

      const sessionStat = document.createElement("div");
      sessionStat.className = "team-stat";
      const sessionH5 = document.createElement("h5");
      sessionH5.textContent = sessionCount;
      const sessionP = document.createElement("p");
      sessionP.textContent = sessionsTranslation;
      sessionStat.appendChild(sessionH5);
      sessionStat.appendChild(sessionP);

      statsDiv.appendChild(patientStat);
      statsDiv.appendChild(sessionStat);
      cardDiv.appendChild(statsDiv);

      grid.appendChild(cardDiv);
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
