/**
 * OrthoKine Namespace - State Store Module
 */
window.OrthoKine = window.OrthoKine || {};

(function() {
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

  const INITIAL_APPOINTMENTS = [
    { id: "a-201", patientId: "p-101", therapistId: "s-1", date: "2026-06-02", time: "09:00", type: "Speech Therapy Session", status: "Scheduled" },
    { id: "a-202", patientId: "p-103", therapistId: "s-2", date: "2026-06-02", time: "10:30", type: "Kinesitherapy Session", status: "Completed" },
    { id: "a-203", patientId: "p-104", therapistId: "s-3", date: "2026-06-02", time: "14:00", type: "Kinesitherapy Session", status: "Scheduled" },
    { id: "a-204", patientId: "p-102", therapistId: "s-1", date: "2026-06-02", time: "16:00", type: "Initial Evaluation", status: "Scheduled" },
    { id: "a-205", patientId: "p-103", therapistId: "s-2", date: "2026-06-03", time: "11:00", type: "Kinesitherapy Session", status: "Scheduled" },
    { id: "a-206", patientId: "p-101", therapistId: "s-1", date: "2026-06-04", time: "09:30", type: "Speech Therapy Session", status: "Scheduled" },
    { id: "a-207", patientId: "p-104", therapistId: "s-3", date: "2026-06-05", time: "15:00", type: "Follow-up", status: "Scheduled" }
  ];

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
      this.lang = AppStore.get("ok_lang", "fr"); // DEFAULT LANG IS FRENCH
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

  OrthoKine.AppStore = AppStore;
  OrthoKine.store = new AppStore();
})();
