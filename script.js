
const form = document.getElementById("signupForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const successMessage = document.getElementById("successMessage");

// Display an error beside the relevant input
function showError(input, message) {
    document.getElementById(input.id + "Error").textContent = message;
    input.classList.toggle("invalid", message !== "");
}

// Validate name
function validateName() {
    const name = nameInput.value.trim();

    let message = "";

    if (name === "") {
        message = "Name is required.";
    } else if (name.length < 2) {
        message = "Name must contain at least 2 characters.";
    }

    showError(nameInput, message);
    return message === "";
}

// Validate email using a regular expression
function validateEmail() {
    const email = emailInput.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let message = "";

    if (email === "") {
        message = "Email is required.";
    } else if (!emailPattern.test(email)) {
        message = "Enter a valid email address.";
    }

    showError(emailInput, message);
    return message === "";
}

// Check password strength
function updateStrength() {
    const password = passwordInput.value;

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const labels = [
        "Not entered",
        "Very weak",
        "Weak",
        "Fair",
        "Good",
        "Strong"
    ];

    const widths = [0, 20, 40, 60, 80, 100];

    const colors = [
        "#e5e7eb",
        "#dc3545",
        "#fd7e14",
        "#ffc107",
        "#0d6efd",
        "#198754"
    ];

    strengthBar.style.width = widths[score] + "%";
    strengthBar.style.backgroundColor = colors[score];

    strengthText.textContent =
        "Password strength: " + labels[score];
}

// Validate password
function validatePassword() {
    const password = passwordInput.value;

    let message = "";

    if (password === "") {
        message = "Password is required.";
    } else if (password.length < 8) {
        message = "Password must be at least 8 characters.";
    } else if (
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/[0-9]/.test(password)
    ) {
        message = "Use uppercase, lowercase and a number.";
    }

    showError(passwordInput, message);
    return message === "";
}

// Confirm password
function validateConfirmation() {
    const confirmation = confirmInput.value;

    let message = "";

    if (confirmation === "") {
        message = "Please confirm your password.";
    } else if (confirmation !== passwordInput.value) {
        message = "Passwords do not match.";
    }

    showError(confirmInput, message);
    return message === "";
}

// Validate fields while typing
nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);

passwordInput.addEventListener("input", () => {
    updateStrength();
    validatePassword();

    if (confirmInput.value !== "") {
        validateConfirmation();
    }
});

confirmInput.addEventListener("input", validateConfirmation);

// Form submission
form.addEventListener("submit", function(event) {
    event.preventDefault();

    successMessage.textContent = "";

    const isValid = [
        validateName(),
        validateEmail(),
        validatePassword(),
        validateConfirmation()
    ].every(Boolean);

    if (isValid) {
        successMessage.textContent =
            "Signup form validated successfully!";

        form.reset();

        [nameInput, emailInput, passwordInput, confirmInput]
            .forEach(input => showError(input, ""));

        updateStrength();
    }
});

updateStrength();

