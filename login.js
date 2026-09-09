const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error-message");

// Matches the input's own type="email" pattern; kept explicit since the form uses novalidate.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
}

function clearError() {
  errorMessage.hidden = true;
  errorMessage.textContent = "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearError();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!EMAIL_PATTERN.test(email)) {
    showError("Please enter a valid email address.");
    return;
  }

  if (password.length === 0) {
    showError("Please enter your password.");
    return;
  }

  // No backend/database — any well-formed email + non-empty password "logs in".
  window.location.href = "index.html";
});
