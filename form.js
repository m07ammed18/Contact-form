const form = document.querySelector("form");

function validateField(field) {
  const errorElement =
    field.type === "radio"
      ? field.closest("fieldset").querySelector(".error-message")
      : field.parentElement.querySelector(".error-message");
  if (errorElement) {
    if (!field.validity.valid) {
      errorElement.textContent =
        field.dataset.error || "This field is required";
      return false;
    }
    errorElement.textContent = "";
  }
  return true;
}

form.querySelectorAll("input, textarea").forEach((input) => {
  input.addEventListener("blur", () => {
    validateField(input);
  });
});
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let isValid = true;
  const fields = form.querySelectorAll("input, textarea");
  fields.forEach((field) => {
    const fieldValid = validateField(field);
    if (!fieldValid) {
      isValid = false;
    }
  });
  if (isValid) {
    // Send Form Data
    form.reset();
    showSuccessMessage();
  } else {
    form.querySelector(":invalid").focus();
  }
});

// Success message
const successMsg = document.querySelector(".success-msg");
function showSuccessMessage() {
  successMsg.style.display = "block";
  setTimeout(() => {
    successMsg.style.display = "none";
  }, 5000);
}
