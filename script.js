const form = document.querySelector('.signup-form');
const feedback = document.querySelector('.feedback');
const usernamePattern = /^[a-zA-Z0-9åäöÅÄÖ]{5,}$/;
const passwordPattern = /^[a-zA-Z0-9@._-]{8,}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// validation
form.addEventListener('submit', e => {
  e.preventDefault();

  const username =  form.username.value;
  const email = form.querySelector('input[type="email"]').value;
  const password = form.querySelector('#password').value;
  const passwordConfirm = form.querySelector('#password-confirm').value;
  const firstName = form.querySelector('input[placeholder="Enter your first name"]').value;
  const lastName = form.querySelector('input[placeholder="Enter your last name"]').value;

  if (!usernamePattern.test(username)) {
    feedback.textContent = 'Username must contain only letters & be at least 5 characters long.';
    return;  // Stop execution if validation fails
  }

  // Kontrollera e-post
  if (!emailPattern.test(email)) {
    feedback.textContent = 'Email must include a valid format.';
    return;
  }

    // Kontrollera lösenord
  if (password !== passwordConfirm) {
    feedback.textContent = 'Passwords do not match.';
    return;
  } else if (!passwordPattern.test(password)) {
    feedback.textContent = 'Password must be at least 8 characters and include @._-';
    return;
  }


  // Om alla fält är giltiga, skapa objektet
  const registrationData = {
    name: `${firstName} ${lastName}`,
    username: username,
    email: email,
    password: password,
  };

    // Logga registreringsdata till konsolen
    console.log(registrationData);

    // Lägg till ett framgångsmeddelande eller vidare åtgärder här om du vill
  feedback.textContent = 'Form is successfully submitted!';
  console.log('Form submitted successfully!');
});


// Live-feedback för fält
const inputs = document.querySelectorAll('.input-validation');

inputs.forEach(input => {
  input.addEventListener('keyup', e => {
    const value = e.target.value;

    if (e.target.type === 'text' && usernamePattern.test(value)) {
      input.setAttribute('class', 'success input-validation');
    } else if (e.target.type === 'email' && emailPattern.test(value)) {
      input.setAttribute('class', 'success input-validation');
    } else if (e.target.type === 'password') {
      if (e.target.id === 'password') {
        if (passwordPattern.test(value)) {
          input.setAttribute('class', 'success input-validation');
        } else {
          input.setAttribute('class', 'error input-validation');
        }
      }
      if (e.target.id === 'password-confirm') {
        const originalPassword = document.querySelector('#password').value;
        if (value === originalPassword) {
          input.setAttribute('class', 'success input-validation');
        } else {
          input.setAttribute('class', 'error input-validation');
        }
      }
    } else {
      input.setAttribute('class', 'error input-validation');
    }
  });
});