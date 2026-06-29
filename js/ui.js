/**
 * OrthoKine Namespace - UI Render Engine Module (v2.0 — Multi-Rôles)
 */
window.OrthoKine = window.OrthoKine || {};

(function () {

  // ─── HELPERS ───────────────────────────────────────────────────────────────
  function getLocalizedDateStr(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    const lang = OrthoKine.store.lang;
    const locale = lang === 'en' ? 'en-US' : lang === 'es' ? 'es-ES' : 'fr-FR';
    const val = date.toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return val.charAt(0).toUpperCase() + val.slice(1);
  }

  function getSessionDef(sessionId) {
    return (OrthoKine.SESSIONS_DEF || []).find(s => s.id === sessionId) || { color: '#888', name: 'Session', bgClass: '' };
  }

  function statusBadge(status) {
    const map = {
      'Planifiée':  { cls: 'badge-planned',    icon: 'clock' },
      'En cours':   { cls: 'badge-inprogress', icon: 'activity' },
      'Terminée':   { cls: 'badge-done',       icon: 'check-circle' },
      'Actif':      { cls: 'badge-success',    icon: 'check' },
      'En attente': { cls: 'badge-warning',    icon: 'clock' },
      'Inactif':    { cls: 'badge-muted',      icon: 'x' },
    };
    const info = map[status] || { cls: 'badge-muted', icon: 'help-circle' };
    return `<span class="badge ${info.cls}"><i data-lucide="${info.icon}"></i>${status}</span>`;
  }

  function praticienName(id) {
    const pr = OrthoKine.store.praticiens.find(p => p.id === id);
    return pr ? pr.name : '—';
  }

  function praticienSpecialty(id) {
    const pr = OrthoKine.store.praticiens.find(p => p.id === id);
    return pr ? pr.specialty : '';
  }

  function patientName(id) {
    const p = OrthoKine.store.patients.find(p => p.id === id);
    return p ? p.name : '—';
  }

  // ─── DROPDOWN SELECTORS ────────────────────────────────────────────────────
  function renderDropdownSelectors() {
    const store      = OrthoKine.store;
    const praticiens = store.getVisiblePraticiens();
    const patients   = store.getVisiblePatients();
    const selectLbl  = store.lang === 'fr' ? 'Sélectionner' : 'Select';

    // Patient-form: assign praticien
    const pPraticienSel = document.getElementById('p-praticien');
    if (pPraticienSel) {
      const prev = pPraticienSel.value;
      pPraticienSel.innerHTML = `<option value="">-- ${selectLbl} --</option>`;
      praticiens.forEach(pr => {
        const o = document.createElement('option');
        o.value = pr.id; o.textContent = `${pr.name} (${pr.specialty})`;
        pPraticienSel.appendChild(o);
      });
      if (prev) pPraticienSel.value = prev;
    }

    // Appointment form: patient & praticien
    const aptPatSel = document.getElementById('apt-patient');
    const aptPrSel  = document.getElementById('apt-praticien');
    if (aptPatSel) {
      const prev = aptPatSel.value;
      aptPatSel.innerHTML = `<option value="">-- ${selectLbl} --</option>`;
      patients.forEach(p => {
        const o = document.createElement('option');
        o.value = p.id; o.textContent = p.name;
        aptPatSel.appendChild(o);
      });
      if (prev) aptPatSel.value = prev;
    }
    if (aptPrSel) {
      const prev = aptPrSel.value;
      aptPrSel.innerHTML = `<option value="">-- ${selectLbl} --</option>`;
      praticiens.forEach(pr => {
        const o = document.createElement('option');
        o.value = pr.id; o.textContent = `${pr.name} (${pr.specialty})`;
        aptPrSel.appendChild(o);
      });
      if (prev) aptPrSel.value = prev;
    }

    // Calendar therapist filter
    const calFilter = document.getElementById('calendar-therapist-filter');
    if (calFilter) {
      const prev = calFilter.value;
      calFilter.innerHTML = `<option value="all">Tous les praticiens</option>`;
      praticiens.forEach(pr => {
        const o = document.createElement('option');
        o.value = pr.id; o.textContent = pr.name;
        calFilter.appendChild(o);
      });
      if (prev) calFilter.value = prev;
    }

    // Session selector in forms
    const pSessionSel  = document.getElementById('p-session');
    const aptSessionSel = document.getElementById('apt-session');
    [pSessionSel, aptSessionSel].forEach(sel => {
      if (!sel) return;
      const prev = sel.value;
      sel.innerHTML = `<option value="">-- ${selectLbl} --</option>`;
      const u = store.currentUser;
      const sessions = (u && u.role !== 'chef_service')
        ? store.sessions.filter(s => s.id === u.sessionId)
        : store.sessions;
      sessions.forEach(s => {
        const o = document.createElement('option');
        o.value = s.id; o.textContent = s.name;
        sel.appendChild(o);
      });
      if (prev) sel.value = prev;
      // Auto-select for non-chef_service
      if (u && u.role !== 'chef_service' && u.sessionId && !sel.value) {
        sel.value = u.sessionId;
      }
    });

    // Chef session selector (for session management)
    const chefSessionSel = document.getElementById('sess-chef-user');
    if (chefSessionSel) {
      const prev = chefSessionSel.value;
      const chefUsers = store.users.filter(u => u.role === 'chef_session');
      chefSessionSel.innerHTML = `<option value="">-- ${selectLbl} --</option>`;
      chefUsers.forEach(u => {
        const o = document.createElement('option');
        o.value = u.id; o.textContent = u.name;
        chefSessionSel.appendChild(o);
      });
      if (prev) chefSessionSel.value = prev;
    }

    // Assign-praticien modal: praticien list
    const assignPrSel = document.getElementById('assign-pr-id');
    if (assignPrSel) {
      const prev = assignPrSel.value;
      // Show praticiens without a session or from same session
      const user = store.currentUser;
      const available = store.praticiens.filter(p => !p.sessionId || (user && p.sessionId === user.sessionId));
      assignPrSel.innerHTML = `<option value="">-- ${selectLbl} --</option>`;
      available.forEach(pr => {
        const o = document.createElement('option');
        o.value = pr.id; o.textContent = `${pr.name} (${pr.specialty})`;
        assignPrSel.appendChild(o);
      });
      if (prev) assignPrSel.value = prev;
    }
  }

  // ─── 1. DASHBOARD ──────────────────────────────────────────────────────────
  function renderDashboard() {
    const store   = OrthoKine.store;
    const user    = store.currentUser;
    if (!user) return;

    const todayStr = store.getTodayStr();
    const allApts  = store.getVisibleAppointments();
    const allPats  = store.getVisiblePatients();
    const allPrs   = store.getVisiblePraticiens();
    const todayApts = allApts.filter(a => a.date === todayStr);

    // Stats cards
    _setText('stat-sessions-today',    todayApts.length);
    _setText('stat-total-patients',    allPats.filter(p => p.status === 'Actif').length);
    _setText('stat-active-therapists', allPrs.length);
    const pending = allApts.filter(a => a.status === 'Planifiée').length;
    _setText('stat-pending-hours', pending);

    // Today's appointments table
    const tbody = document.getElementById('today-appointments-table');
    if (tbody) {
      if (todayApts.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="empty-state-cell">Aucune séance planifiée aujourd'hui</td></tr>`;
      } else {
        tbody.innerHTML = todayApts
          .sort((a, b) => a.time.localeCompare(b.time))
          .map(a => {
            const sess = getSessionDef(a.sessionId);
            return `
            <tr>
              <td><strong>${a.time}</strong></td>
              <td>${patientName(a.patientId)}</td>
              <td>
                <div style="display:flex;align-items:center;gap:0.5rem;">
                  <span class="session-dot" style="background:${sess.color};"></span>
                  ${praticienName(a.praticienId)}<br>
                  <small class="text-muted">${praticienSpecialty(a.praticienId)}</small>
                </div>
              </td>
              <td>${a.type}</td>
              <td>
                ${statusBadge(a.status)}
                <div class="status-actions" style="margin-top:0.35rem;">
                  ${_statusActions(a)}
                </div>
              </td>
            </tr>`;
          }).join('');
      }
    }

    // Badge
    _setText('today-rdv-count-badge', `${todayApts.length} rendez-vous`);

    // Chef de Service: session overview cards
    const sessOverviewEl = document.getElementById('sessions-overview-dash');
    if (sessOverviewEl) {
      if (user.role === 'chef_service') {
        sessOverviewEl.style.display = '';
        sessOverviewEl.innerHTML = store.sessions.map(sess => {
          const def    = getSessionDef(sess.id);
          const chef   = store.getChefSessionUser(sess.id);
          const prs    = store.praticiens.filter(p => p.sessionId === sess.id);
          const pats   = store.patients.filter(p => p.sessionId === sess.id);
          const todaySessApts = store.appointments.filter(a => a.sessionId === sess.id && a.date === todayStr);
          return `
          <div class="session-overview-card glass-panel" style="border-top: 3px solid ${def.color};">
            <div class="session-ov-header">
              <div class="session-ov-icon" style="background:${def.color}20;color:${def.color};">
                <i data-lucide="${def.icon}"></i>
              </div>
              <div>
                <h3>${sess.name}</h3>
                <p class="text-muted small">${chef ? 'Chef: ' + chef.name : 'Aucun chef assigné'}</p>
              </div>
            </div>
            <div class="session-ov-stats">
              <div class="ov-stat"><span>${prs.length}</span><label>Praticiens</label></div>
              <div class="ov-stat"><span>${pats.length}</span><label>Patients</label></div>
              <div class="ov-stat"><span>${todaySessApts.length}</span><label>RDV Auj.</label></div>
            </div>
          </div>`;
        }).join('');
      } else {
        sessOverviewEl.style.display = 'none';
      }
    }
  }

  function _statusActions(apt) {
    const user = OrthoKine.store.currentUser;
    if (!user) return '';
    if (apt.status === 'Planifiée') {
      return `<button class="btn-status-change" onclick="OrthoKine.changeAptStatus('${apt.id}','En cours')" title="Démarrer">
                <i data-lucide="play"></i>
              </button>`;
    }
    if (apt.status === 'En cours') {
      return `<button class="btn-status-change btn-done" onclick="OrthoKine.changeAptStatus('${apt.id}','Terminée')" title="Terminer">
                <i data-lucide="check"></i>
              </button>`;
    }
    return '';
  }

  function changeAptStatus(id, newStatus) {
    OrthoKine.store.updateAppointment(id, { status: newStatus });
    OrthoKine.renderAll();
  }

  // ─── 2. SESSIONS TAB (chef_service) ───────────────────────────────────────
  function renderSessionsTab() {
    const store   = OrthoKine.store;
    const user    = store.currentUser;
    const tbody   = document.getElementById('sessions-table-body');
    if (!tbody || !user || user.role !== 'chef_service') return;

    tbody.innerHTML = store.sessions.map(sess => {
      const def   = getSessionDef(sess.id);
      const chef  = store.getChefSessionUser(sess.id);
      const prs   = store.praticiens.filter(p => p.sessionId === sess.id);
      const pats  = store.patients.filter(p => p.sessionId === sess.id);
      const apts  = store.appointments.filter(a => a.sessionId === sess.id);
      const terminees = apts.filter(a => a.status === 'Terminée').length;
      const planned   = apts.filter(a => a.status === 'Planifiée').length;
      const enCours   = apts.filter(a => a.status === 'En cours').length;

      return `
      <tr>
        <td>
          <div style="display:flex;align-items:center;gap:0.75rem;">
            <div class="session-icon-sm" style="background:${def.color}20;color:${def.color};">
              <i data-lucide="${def.icon}"></i>
            </div>
            <strong>${sess.name}</strong>
          </div>
        </td>
        <td>${chef ? chef.name : '<span class="text-muted">Non assigné</span>'}</td>
        <td>${prs.length} praticien(s)</td>
        <td>${pats.length} patient(s)</td>
        <td>
          <div style="display:flex;gap:0.4rem;flex-wrap:wrap;">
            <span class="badge badge-planned">${planned} Planifiée</span>
            <span class="badge badge-inprogress">${enCours} En cours</span>
            <span class="badge badge-done">${terminees} Terminée</span>
          </div>
        </td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="OrthoKine.openSessionAssignModal('${sess.id}')">
            <i data-lucide="user-cog"></i> Gérer
          </button>
        </td>
      </tr>`;
    }).join('');
  }

  // ─── 3. PATIENTS TABLE ─────────────────────────────────────────────────────
  function renderPatientsTable() {
    const store   = OrthoKine.store;
    const query   = (document.getElementById('patient-search-input')?.value || '').toLowerCase();
    const patients = store.getVisiblePatients().filter(p =>
      p.name.toLowerCase().includes(query) ||
      (p.condition || '').toLowerCase().includes(query)
    );
    const tbody = document.getElementById('patients-table-body');
    if (!tbody) return;

    if (patients.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="empty-state-cell">Aucun patient trouvé</td></tr>`;
      return;
    }

    tbody.innerHTML = patients.map(p => {
      const sess = getSessionDef(p.sessionId);
      return `
      <tr>
        <td>
          <div class="patient-name-cell">
            <div class="patient-avatar">${p.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
            <div>
              <strong>${p.name}</strong>
              <p class="text-muted small">${p.age} ans · ${p.gender}</p>
            </div>
          </div>
        </td>
        <td>${p.condition}</td>
        <td>
          <span class="session-badge-sm" style="background:${sess.color}20;color:${sess.color};">
            ${sess.name}
          </span>
        </td>
        <td>${praticienName(p.praticienId)}</td>
        <td>
          <span class="badge badge-muted">${p.nombreSeances || 0} séances</span>
        </td>
        <td>${statusBadge(p.status)}</td>
        <td>
          <div class="action-btns">
            <button class="btn btn-secondary btn-sm" onclick="OrthoKine.openPatientModal('${p.id}')" title="Modifier">
              <i data-lucide="edit-3"></i>
            </button>
            <button class="btn btn-danger btn-sm" onclick="OrthoKine.deletePatientConfirm('${p.id}')" title="Supprimer">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        </td>
      </tr>`;
    }).join('');
  }

  // ─── 4. PRATICIENS (TEAM) TABLE ────────────────────────────────────────────
  function renderTeam() {
    const store     = OrthoKine.store;
    const user      = store.currentUser;
    const praticiens = store.getVisiblePraticiens();

    const SPECIALTY_ICONS = {
      'Kinésithérapeute': 'activity',
      'Pédiatre':          'baby',
      'Orthopédiste':      'bone',
      'Ergothérapeute':    'hand',
      'Psychologue':       'brain',
    };

    function buildRows(canRemove) {
      if (praticiens.length === 0) {
        return `<tr><td colspan="5" class="empty-state-cell">Aucun praticien dans cette session</td></tr>`;
      }
      return praticiens.map(pr => {
        const sess    = getSessionDef(pr.sessionId);
        const icon    = SPECIALTY_ICONS[pr.specialty] || 'stethoscope';
        const patsCnt = store.patients.filter(p => p.praticienId === pr.id).length;
        const aptsCnt = store.appointments.filter(a => a.praticienId === pr.id).length;
        return `
        <tr>
          <td>
            <div class="patient-name-cell">
              <div class="patient-avatar" style="background: ${sess.color}20; color:${sess.color};">
                ${pr.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <strong>${pr.name}</strong>
                <p class="text-muted small">${pr.email}</p>
              </div>
            </div>
          </td>
          <td>
            <span class="specialty-badge">
              <i data-lucide="${icon}"></i> ${pr.specialty}
            </span>
          </td>
          <td>
            <span class="session-badge-sm" style="background:${sess.color}20;color:${sess.color};">
              ${sess.name}
            </span>
          </td>
          <td>${patsCnt} patients · ${aptsCnt} RDVs</td>
          <td>
            <div class="action-btns">
              ${canRemove ? `
              <button class="btn btn-danger btn-sm" onclick="OrthoKine.confirmRemovePraticien('${pr.id}')" title="Retirer de la session">
                <i data-lucide="user-minus"></i>
              </button>` : ''}
            </div>
          </td>
        </tr>`;
      }).join('');
    }

    const canRemove = user && (user.role === 'chef_service' || user.role === 'chef_session');
    const rows = buildRows(canRemove);

    // Populate team tab (chef_service)
    const tbody = document.getElementById('team-table-body');
    if (tbody) tbody.innerHTML = rows;

    // Populate mon_equipe tab (chef_session)
    const equipeTbody = document.getElementById('equipe-table-body');
    if (equipeTbody) equipeTbody.innerHTML = rows;
  }

  // ─── 5. CALENDAR ───────────────────────────────────────────────────────────
  function renderCalendar(month, year) {
    const store      = OrthoKine.store;
    const monthNames = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
    const filterVal  = document.getElementById('calendar-therapist-filter')?.value || 'all';

    const titleEl = document.getElementById('calendar-current-month-year');
    if (titleEl) titleEl.textContent = `${monthNames[month]} ${year}`;

    const filterBadge = document.getElementById('calendar-filter-badge');
    if (filterBadge) {
      if (filterVal === 'all') {
        filterBadge.textContent = 'Tous les praticiens';
      } else {
        const pr = store.praticiens.find(p => p.id === filterVal);
        filterBadge.textContent = pr ? pr.name : 'Filtré';
      }
    }

    const allApts = store.getVisibleAppointments().filter(a => {
      if (filterVal !== 'all' && a.praticienId !== filterVal) return false;
      const d = new Date(a.date + 'T00:00:00');
      return d.getMonth() === month && d.getFullYear() === year;
    });

    // Group by date
    const byDate = {};
    allApts.forEach(a => {
      if (!byDate[a.date]) byDate[a.date] = [];
      byDate[a.date].push(a);
    });

    const grid = document.getElementById('calendar-grid');
    if (!grid) return;

    const firstDay = new Date(year, month, 1).getDay();
    const offset   = (firstDay + 6) % 7; // Week starts Monday
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const todayStr = store.getTodayStr();

    let html = '';
    for (let i = 0; i < offset; i++) html += '<div class="calendar-cell empty"></div>';

    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr  = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const dayApts  = byDate[dateStr] || [];
      const isToday  = dateStr === todayStr;

      html += `
      <div class="calendar-cell ${isToday ? 'today' : ''}" onclick="OrthoKine.openAppointmentForDate('${dateStr}')">
        <div class="cell-date ${isToday ? 'today-label' : ''}">${d}</div>
        <div class="cell-events">
          ${dayApts.slice(0, 3).map(a => {
            const sess = getSessionDef(a.sessionId);
            return `<div class="cal-event" style="background:${sess.color}20;border-left:2px solid ${sess.color};"
                     onclick="event.stopPropagation();OrthoKine.openAppointmentModal('${a.id}')">
                      <span>${a.time}</span> ${patientName(a.patientId)}
                    </div>`;
          }).join('')}
          ${dayApts.length > 3 ? `<div class="cal-more">+${dayApts.length - 3} autres</div>` : ''}
        </div>
      </div>`;
    }

    grid.innerHTML = html;
  }

  // ─── 6. APPOINTMENTS LIST (for Mon Équipe / Mes Séances) ──────────────────
  function renderAppointmentsList() {
    const store  = OrthoKine.store;
    const apts   = store.getVisibleAppointments().sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return a.time.localeCompare(b.time);
    });
    const tbody = document.getElementById('appointments-list-body');
    if (!tbody) return;

    if (apts.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="empty-state-cell">Aucun rendez-vous</td></tr>`;
      return;
    }

    tbody.innerHTML = apts.map(a => {
      const sess = getSessionDef(a.sessionId);
      return `
      <tr>
        <td><strong>${getLocalizedDateStr(a.date)}</strong><br><small>${a.time}</small></td>
        <td>${patientName(a.patientId)}</td>
        <td>${praticienName(a.praticienId)}</td>
        <td>
          <span class="session-badge-sm" style="background:${sess.color}20;color:${sess.color};">
            ${sess.name}
          </span>
        </td>
        <td>${a.type}${a.isFirstApt ? ' <span class="badge badge-muted">1er RDV</span>' : ''}</td>
        <td>
          ${statusBadge(a.status)}
          <div style="margin-top:0.35rem;display:flex;gap:0.3rem;">
            ${_statusActions(a)}
            <button class="btn btn-secondary btn-sm" onclick="OrthoKine.openAppointmentModal('${a.id}')" title="Modifier">
              <i data-lucide="edit-3"></i>
            </button>
            <button class="btn btn-danger btn-sm" onclick="OrthoKine.deleteAptConfirm('${a.id}')" title="Supprimer">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        </td>
      </tr>`;
    }).join('');
  }

  // ─── 7. MON ÉQUIPE (chef_session) ─────────────────────────────────────────
  function renderMonEquipe() {
    const store = OrthoKine.store;
    const user  = store.currentUser;
    if (!user || user.role !== 'chef_session') return;

    const sess = store.getSessionForUser(user.id);
    const sessHeaderEl = document.getElementById('mon-equipe-session-name');
    if (sessHeaderEl && sess) {
      const def = getSessionDef(sess.id);
      sessHeaderEl.innerHTML = `<span style="color:${def.color};">${sess.name}</span>`;
    }

    // Render team table
    renderTeam();

    // Render patients in this session
    renderPatientsTable();

    // Render appointments
    renderAppointmentsList();
  }

  // ─── UTILITY ───────────────────────────────────────────────────────────────
  function _setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function deleteAptConfirm(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce rendez-vous ?')) {
      OrthoKine.store.deleteAppointment(id);
      OrthoKine.renderAll();
    }
  }

  function confirmRemovePraticien(praticienId) {
    const pr = OrthoKine.store.praticiens.find(p => p.id === praticienId);
    if (!pr) return;
    if (confirm(`Retirer "${pr.name}" de sa session ? Il(elle) restera dans le système mais ne sera plus assigné(e).`)) {
      OrthoKine.store.removePraticienFromSession(praticienId);
      OrthoKine.renderAll();
    }
  }

  // ─── RENDER ALL ────────────────────────────────────────────────────────────
  function renderAll() {
    renderDropdownSelectors();
    renderDashboard();
    renderPatientsTable();
    renderTeam();
    renderAppointmentsList();
    renderSessionsTab();
    renderMonEquipe();
    OrthoKine.applyTranslations();
    lucide.createIcons();
  }

  // ─── EXPORTS ───────────────────────────────────────────────────────────────
  OrthoKine.renderAll             = renderAll;
  OrthoKine.renderDashboard       = renderDashboard;
  OrthoKine.renderPatientsTable   = renderPatientsTable;
  OrthoKine.renderTeam            = renderTeam;
  OrthoKine.renderCalendar        = renderCalendar;
  OrthoKine.renderSessionsTab     = renderSessionsTab;
  OrthoKine.renderMonEquipe       = renderMonEquipe;
  OrthoKine.renderAppointmentsList= renderAppointmentsList;
  OrthoKine.changeAptStatus       = changeAptStatus;
  OrthoKine.deleteAptConfirm      = deleteAptConfirm;
  OrthoKine.confirmRemovePraticien= confirmRemovePraticien;
})();
