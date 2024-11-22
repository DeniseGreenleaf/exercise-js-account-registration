const form = document.querySelector('#registrationForm');
const inputs = document.querySelectorAll("#registrationForm input"); 

function validateField(field, condition) {
    if (condition) {
        field.classList.add('valid');
        field.classList.remove('invalid');
    } else {
        field.classList.add('invalid');
        field.classList.remove('valid');
        isValid = false;
    }
}

function validateInput(event) {
    const field = event.target; 

    switch (field.id) {
        case 'fname':
        case 'lname':
            validateField(field, field.value.trim() !== ""); // Kontrollera att fältet inte är tomt
            break;
        case 'email':
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            validateField(field, emailPattern.test(field.value.trim())); // Kontrollera e-postformat
            break;
        case 'password':
            const passwordValid = field.value.length >= 8 && /\d/.test(field.value);
            validateField(field, passwordValid); // Kontrollera lösenordets styrka
            break;
        case 'passwordConfirmation':
            const password = document.querySelector('#password');
            validateField(field, field.value === password.value); // Kontrollera att lösenorden matchar
            break;
    }
}

// Lägg till input-händelsen på varje fält
inputs.forEach(input => {
    input.addEventListener('input', validateInput);
});

form.addEventListener('submit', function (event) {
    event.preventDefault();

    let isValid = true;

    // Kontrollera alla fält vid submit
    inputs.forEach(input => {
        input.dispatchEvent(new Event('input')); // Trigga validering för varje fält
        if (input.classList.contains('invalid')) {
            isValid = false;
        }
    });

    if (isValid) {
        alert('Registration successful!');
        form.reset();
        inputs.forEach(input => input.classList.remove('valid', 'invalid')); // Rensa klasser efter lyckad registrering
    }
});