const HARDCODED_NAME = "test";
const HARDCODED_PASS = "1234";

const loginView = document.getElementById("loginView");
const welcomeView = document.getElementById("welcomeView");
const errorView = document.getElementById("errorView");
const loginForm = document.getElementById("loginForm");
const logoutBtnHeader = document.getElementById("logoutBtn");
const logoutBtnWelcome = document.getElementById("logoutBtn2");
const backToLoginBtn = document.getElementById("backToLoginBtn");
const liveRegion = document.getElementById("live");

const STORAGE_KEY = "loggedInUser";

function render(view) {
  loginView.classList.add("hidden");
  welcomeView.classList.add("hidden");
  errorView.classList.add("hidden");
  logoutBtnHeader.classList.add("hidden");
  logoutBtnHeader.setAttribute("aria-hidden", "true");
  welcomeView.setAttribute("aria-hidden", "true");
  errorView.setAttribute("aria-hidden", "true");

  switch (view) {
    case "welcome":
      welcomeView.classList.remove("hidden");
      welcomeView.setAttribute("aria-hidden", "false");
      logoutBtnHeader.classList.remove("hidden");
      logoutBtnHeader.setAttribute("aria-hidden", "false");
      announce("Inloggning lyckades. Välkommen!");
      break;
    case "error":
      errorView.classList.remove("hidden");
      errorView.setAttribute("aria-hidden", "false");
      announce("Fel vid inloggning. Försök igen.");
      break;
    default:
      loginView.classList.remove("hidden");
      announce("Visa inloggningsformuläret.");
  }
}

function announce(msg) {
  if (!liveRegion) return;
  liveRegion.textContent = "";
  setTimeout(() => (liveRegion.textContent = msg), 50);
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = (document.getElementById("name")?.value || "").trim();
    const pass = document.getElementById("password")?.value || "";

    const ok = name === HARDCODED_NAME && pass === HARDCODED_PASS;

    if (ok) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ name, loggedInAt: new Date().toISOString() })
      );
      render("welcome");
    } else {
      render("error");
    }
  });
}


[logoutBtnHeader, logoutBtnWelcome].forEach((btn) => {
  btn?.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    render("login");
    document.getElementById("name").value = "";
    document.getElementById("password").value = "";
  });
});

backToLoginBtn?.addEventListener("click", () => {
  render("login");
  document.getElementById("password").focus();
});


(function init() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.name === HARDCODED_NAME) {
        render("welcome");
        return;
      }
    }
  } catch {
  }
  render("login");
})();
