// ===== ELEMENTET KRYESORE =====
const form = document.getElementById('driver-form');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const phone = document.getElementById('phone-number');

// MODALET
const cashModal = document.getElementById('cashModal');
const receiptModal = document.getElementById('receiptModal');

// BUTONAT
const proceedBtn = document.getElementById('proceedBtn');
const printBtn = document.getElementById('printBtn');
const homeBtn = document.getElementById('homeBtn');

const isValidEmail = email => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
};

const isValidPhone = phone => {
  const re = /^[\+]?[0-9\s\-\(\)\.]{7,20}$/;
  return re.test(phone);
};

// ===== FUNKSIONET PËR VALIDIM =====
const validateInputs = () => {
  let isValid = true;
  
  // Reset all errors
  document.querySelectorAll('.input-control').forEach(el => {
    el.classList.remove('error');
    el.querySelector('.error').innerText = '';
  });

  // Validate First Name
  if (firstName.value.trim() === '') {
    showError(firstName, 'First name is required');
    isValid = false;
  }

  // Validate Last Name
  if (lastName.value.trim() === '') {
    showError(lastName, 'Last name is required');
    isValid = false;
  }

  // Validate Email
  if (email.value.trim() === '') {
    showError(email, 'Email is required');
    isValid = false;
  } else if (!isValidEmail(email.value.trim())) {
    showError(email, 'Provide a valid email address');
    isValid = false;
  }

  // Validate Phone
  if (phone.value.trim() === '') {
    showError(phone, 'Phone number is required');
    isValid = false;
  }

  return isValid;
};

const showError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');
  errorDisplay.innerText = message;
  inputControl.classList.add('error');
};


// ===== FUNKSIONET PËR MODALET =====
const showModal = (modal) => {
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
};

const hideModal = (modal) => {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
};

// ===== FORM SUBMIT =====
form.addEventListener('submit', e => {
  e.preventDefault();
  
  if (validateInputs()) {
    showModal(cashModal);
  }
});

// ===== BUTONI "Agree & Continue" =====
proceedBtn.addEventListener('click', () => {
  const agreeCheckbox = document.getElementById('agreeTerms');
  
  if (!agreeCheckbox.checked) {
    alert('Please agree to the terms before continuing');
    return;
  }
  
  hideModal(cashModal);
  
  // Vendos të dhënat në receipt
  document.getElementById('customerName').textContent = `${firstName.value.trim()} ${lastName.value.trim()}`;
  document.getElementById('customerEmail').textContent = email.value.trim();
  document.getElementById('customerPhone').textContent = phone.value.trim();
  
  // Gjenero kod unik
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  document.getElementById('reservationCode').textContent = `FD-473750-${randomNum}`;
  
  showModal(receiptModal);
});

// ===== BUTONI PRINT =====
printBtn.addEventListener('click', () => {
  window.print();
});

// ===== BUTONI RETURN TO HOME =====
homeBtn.addEventListener('click', () => {
  window.location.href = '../pages/index.html'; // Ndrysho sipas nevojës
});

// ===== MBYLL MODALET =====
document.querySelectorAll('.close-btn, .cancel-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const modal = this.closest('.modal');
    hideModal(modal);
  });
});

// Mbyll modal kur klikohet jashtë
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    hideModal(e.target);
  }
});