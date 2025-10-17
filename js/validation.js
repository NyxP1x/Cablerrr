// Validation Functions
function validateUsername(username) {
  const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
  return usernameRegex.test(username);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

function showError(input, message) {
  let errorElement = input.parentElement.querySelector('.error-message');
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '12px';
    errorElement.style.marginTop = '5px';
    input.parentElement.appendChild(errorElement);
  }
  errorElement.textContent = message;
  input.style.borderColor = 'red';
  input.parentElement.classList.add('error');
}

function clearError(input) {
  const errorElement = input.parentElement.querySelector('.error-message');
  if (errorElement) {
    errorElement.remove();
  }
  input.style.borderColor = '';
  input.parentElement.classList.remove('error');
}

function showTosError(message) {
  const tosElement = document.querySelector('.tos label');
  let errorElement = tosElement.querySelector('.error-message');
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '12px';
    errorElement.style.marginTop = '5px';
    tosElement.appendChild(errorElement);
  }
  errorElement.textContent = message;
}

function clearTosError() {
  const tosElement = document.querySelector('.tos label');
  const errorElement = tosElement.querySelector('.error-message');
  if (errorElement) {
    errorElement.remove();
  }
}

// Login Validation
function validateLoginForm(event) {
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  let isValid = true;

  clearError(username);
  clearError(password);

  if (!username.value.trim()) {
    showError(username, 'Please fill out this field.');
    isValid = false;
  }

  if (!password.value.trim()) {
    showError(password, 'Please fill out this field.');
    isValid = false;
  }

  if (!isValid) {
    event.preventDefault();
  }
}

// Register Validation
function validateRegisterForm(event) {
  const username = document.getElementById('username');
  const email = document.getElementById('Mail');
  const password = document.getElementById('password');
  const tosCheckbox = document.querySelector('.tos input[type="checkbox"]');
  let isValid = true;

  clearError(username);
  clearError(email);
  clearError(password);
  clearTosError();

  if (!username.value.trim()) {
    showError(username, 'Please fill out this field.');
    isValid = false;
  } else if (!validateUsername(username.value)) {
    showError(username, 'Username must be 3-20 alphanumeric characters.');
    isValid = false;
  }

  if (!email.value.trim()) {
    showError(email, 'Please fill out this field.');
    isValid = false;
  } else if (!validateEmail(email.value)) {
    showError(email, 'Please enter a valid email address.');
    isValid = false;
  }

  if (!password.value.trim()) {
    showError(password, 'Please fill out this field.');
    isValid = false;
  } else if (!validatePassword(password.value)) {
    showError(password, 'Password must be at least 8 characters with uppercase, lowercase, number, and special character.');
    isValid = false;
  }

  if (!tosCheckbox.checked) {
    showTosError('You must agree to the terms of service.');
    isValid = false;
  }

  if (!isValid) {
    event.preventDefault();
  }
}

// Forgot Password Validation
function validateForgotPasswordForm(event) {
  const email = document.getElementById('Mail');
  let isValid = true;

  clearError(email);

  if (!email.value.trim()) {
    showError(email, 'Please fill out this field.');
    isValid = false;
  } else if (!validateEmail(email.value)) {
    showError(email, 'Please enter a valid email address.');
    isValid = false;
  }

  if (!isValid) {
    event.preventDefault();
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.querySelector('form[action=""]'); // Assuming forms have action=""
  if (loginForm && document.title === 'Login') {
    loginForm.addEventListener('submit', validateLoginForm);

    // Real-time error clearing
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    username.addEventListener('input', function() {
      if (username.value.trim()) {
        clearError(username);
      }
    });
    password.addEventListener('input', function() {
      if (password.value.trim()) {
        clearError(password);
      }
    });
  }

  if (loginForm && document.title === 'Register') {
    loginForm.addEventListener('submit', validateRegisterForm);

    // Real-time error clearing
    const username = document.getElementById('username');
    const email = document.getElementById('Mail');
    const password = document.getElementById('password');
    const tosCheckbox = document.querySelector('.tos input[type="checkbox"]');
    username.addEventListener('input', function() {
      if (username.value.trim()) {
        clearError(username);
      }
    });
    email.addEventListener('input', function() {
      if (email.value.trim()) {
        clearError(email);
      }
    });
    password.addEventListener('input', function() {
      if (password.value.trim()) {
        clearError(password);
      }
    });
    tosCheckbox.addEventListener('change', function() {
      if (tosCheckbox.checked) {
        clearTosError();
      }
    });
  }

  if (loginForm && document.title === 'Forgot Password') {
    loginForm.addEventListener('submit', validateForgotPasswordForm);

    // Real-time error clearing
    const email = document.getElementById('Mail');
    email.addEventListener('input', function() {
      if (email.value.trim()) {
        clearError(email);
      }
    });
  }
});
