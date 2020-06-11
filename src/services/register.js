const refs = {
  loginBtn: document.querySelector('.login-link'),
  overlay: document.getElementById('overlay-register'),
  registerForm: document.querySelector('.register-form'),
  registerBtn: document.querySelector('.register-btn'),
};

// inputs
const firstName = refs.registerForm.elements.firstName;
const lastName = refs.registerForm.elements.lastName;
const email = refs.registerForm.elements.email;
const password = refs.registerForm.elements.password;
const birthdate = refs.registerForm.elements.birthdate;

refs.loginBtn.addEventListener('click', openModal);
refs.overlay.addEventListener('click', handleCloseModalClick);
refs.registerForm.addEventListener('submit', handleSubmit);

function openModal() {
  refs.overlay.classList.add('show-modal');
  refs.overlay.classList.remove('hide-modal');
  checkInputs();
}

function handleCloseModalClick(e) {
  if (
    e.target === e.currentTarget ||
    e.target.dataset.action === 'close-modal'
  ) {
    closeModal();
  }
}

function closeModal() {
  refs.overlay.classList.add('hide-modal');
  refs.overlay.classList.remove('show-modal');
}

function checkInputs() {
  firstName.addEventListener('blur', firstNameHandler);
  lastName.addEventListener('blur', lastNameHandler);
  email.addEventListener('blur', emailHandler);
  password.addEventListener('blur', passwordHandler);
  birthdate.addEventListener('blur', birthdateHandler);
}

function firstNameHandler() {
  const re = /^[a-zA-z]{2,10}$/;
  if (!re.test(firstName.value)) {
    createErrorMessage(
      'First name should be from 2 to 10 characters long',
      lastName,
    );
  } else removeErrorMessage();
}

function lastNameHandler() {
  const re = /^[a-zA-z]{2,10}$/;
  if (!re.test(lastName.value)) {
    createErrorMessage(
      'Last name should be from 2 to 10 characters long',
      email,
    );
  } else removeErrorMessage();
}

function emailHandler() {
  const re = /^(.+)@(.+){2,}\.(.+){2,}$/;
  if (!re.test(email.value)) {
    createErrorMessage('This is not a valid email', password);
  } else removeErrorMessage();
}

function passwordHandler() {
  const re = /^.{6,}$/;
  if (!re.test(password.value)) {
    createErrorMessage(
      'Password must contain at least 6 characters',
      birthdate,
    );
  } else removeErrorMessage();
}

function birthdateHandler() {
  if (birthdate.value === '') {
    createErrorMessage('This field is required', refs.registerBtn);
  } else removeErrorMessage();
}

function createErrorMessage(message, elementToInsertBefore) {
  removeErrorMessage();
  const div = document.createElement('div');
  div.classList.add('error-message');
  div.innerText = message;
  refs.registerForm.insertBefore(div, elementToInsertBefore);
}

function removeErrorMessage() {
  if (document.querySelector('.error-message')) {
    document.querySelector('.error-message').remove();
  }
}

function handleSubmit(e) {
  e.preventDefault();
  if (
    firstName.value === '' ||
    lastName.value === '' ||
    email.value === '' ||
    password.value === '' ||
    birthdate.value === ''
  ) {
    return;
  } else {
    closeModal();
    refs.loginBtn.innerText = `Hi, ${firstName.value}!`;
    refs.loginBtn.classList.add('login-inactive');

    clearEventListeners();
    // and clear form inputs
    firstName.value = '';
    lastName.value = '';
    email.value = '';
    password.value = '';
    birthdate.value = '';
  }
}

function clearEventListeners() {
  firstName.removeEventListener('blur', firstNameHandler);
  lastName.removeEventListener('blur', lastNameHandler);
  email.removeEventListener('blur', emailHandler);
  password.removeEventListener('blur', passwordHandler);
  birthdate.removeEventListener('blur', birthdateHandler);
  refs.loginBtn.removeEventListener('click', openModal);
  refs.overlay.removeEventListener('click', handleCloseModalClick);
  refs.registerForm.removeEventListener('submit', handleSubmit);
}
