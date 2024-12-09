const form = document.querySelector('#registrationForm');
const inputs = document.querySelectorAll("#registrationForm input"); 
const submitButton = form.querySelector('button');

// Function to validate fields
function validateField(field, condition) {
    if (condition) {
        field.classList.add('valid');
        field.classList.remove('invalid');
    } else {
        field.classList.add('invalid');
        field.classList.remove('valid');
    }
}

// Function to handle input validation
function validateInput(event) {
    const field = event.target;
    switch (field.id) {
        case 'fname':
        case 'lname':
            validateField(field, field.value.trim() !== "");
            break;
        case 'email':
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            validateField(field, emailPattern.test(field.value.trim()));
            break;
        case 'password':
            const passwordValid = field.value.length >= 8 && /\d/.test(field.value);
            validateField(field, passwordValid);
            break;
        case 'passwordConfirmation':
            const password = document.querySelector('#password');
            const match = field.value === password.value;
            validateField(field, match);
            break;
    }
    toggleSubmitButton();
}

// Function to toggle submit button's disabled state
function toggleSubmitButton() {
    let allValid = true;
    inputs.forEach(input => {
        if (input.classList.contains('invalid') || input.value.trim() === "") {
            allValid = false;
        }
    });
    submitButton.disabled = !allValid;
}

// Attach input event listener
inputs.forEach(input => {
    input.addEventListener('input', validateInput);
});

// Attach submit event listener
form.addEventListener('submit', function (event) {
    event.preventDefault();
    
    let isValid = true;

    inputs.forEach(input => {
        input.dispatchEvent(new Event('input')); // Trigger validation for each field
        if (input.classList.contains('invalid')) {
            isValid = false;
        }
    });

    if (isValid) {
        const registrationData = {
            name: `${document.querySelector("#fname").value} ${document.querySelector("#lname").value}`,
            username: document.querySelector("#username").value,
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value
        };

        console.log(registrationData); // Show the registration data
        form.reset();
        inputs.forEach(input => input.classList.remove('valid', 'invalid')); // Reset styles after successful registration
    }
});