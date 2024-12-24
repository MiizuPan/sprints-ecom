// Form validation functions
// Form validation
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            showError(input, 'This field is required');
            isValid = false;
        } else {
            clearError(input);

            // Email validation
            if (input.type === 'email' && !isValidEmail(input.value)) {
                showError(input, 'Please enter a valid email address');
                isValid = false;
            }

            // Password validation
            if (input.type === 'password' && input.value.length < 8) {
                showError(input, 'Password must be at least 8 characters');
                isValid = false;
            }
        }
    });

    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input, message) {
    const formGroup = input.closest('.mb-3');
    const errorDiv = formGroup.querySelector('.error-message') || createErrorDiv();
    formGroup.appendChild(errorDiv);
    errorDiv.textContent = message;
    input.classList.add('is-invalid');
}

function clearError(input) {
    const formGroup = input.closest('.mb-3');
    const errorDiv = formGroup.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
    input.classList.remove('is-invalid');
}

function createErrorDiv() {
    const div = document.createElement('div');
    div.className = 'error-message text-danger mt-1 small';
    return div;
}

// Initialize validation on all forms
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!validateForm(this)) {
                event.preventDefault();
            }
        });
    });
});