/**
 * OrthoKine Namespace - Authentication & Session Module
 */
window.OrthoKine = window.OrthoKine || {};

(function() {
  function initAuthentication() {
    const loginForm = document.getElementById("login-form");
    const loginScreen = document.getElementById("login-screen");
    const mainApp = document.getElementById("main-app");
    const errorMsg = document.getElementById("login-error-msg");
    const store = OrthoKine.store;

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
          OrthoKine.renderAll();
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

  OrthoKine.initAuthentication = initAuthentication;
})();
