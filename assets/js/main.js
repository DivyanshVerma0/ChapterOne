/*=============== SHOW HIDE PASSWORD ===============*/
const togglePasswordVisibility = (passwordId, iconId) => {
   const input = document.getElementById(passwordId);
   const icon = document.getElementById(iconId);

   icon.addEventListener('click', () => {
      // Toggle input type
      input.type = input.type === 'password' ? 'text' : 'password';

      // Toggle icon class
      icon.classList.toggle('ri-eye-fill');
      icon.classList.toggle('ri-eye-off-fill');
   });
};

// Toggle visibility for login and create account forms
togglePasswordVisibility('password', 'loginPassword');
togglePasswordVisibility('passwordCreate', 'loginPasswordCreate');

//  TOGGLE BETWEEN LOGIN & CREATE ACCOUNT 
const loginAccessRegister = document.getElementById('loginAccessRegister');
const buttonRegister = document.getElementById('loginButtonRegister');
const buttonAccess = document.getElementById('loginButtonAccess');

buttonRegister.addEventListener('click', () => {
   loginAccessRegister.classList.add('active'); // Show register form
});

buttonAccess.addEventListener('click', () => {
   loginAccessRegister.classList.remove('active'); // Show login form
});


// Select form and elements
const loginForm = document.querySelector('.login__form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Function to validate the password
const validatePassword = (password) => {
   // Regular expression to validate password constraints
   const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

   return passwordRegex.test(password);
};

// Add event listener to the login form
loginForm.addEventListener('submit', (e) => {
   e.preventDefault(); // Prevent default form submission behavior

   const email = emailInput.value.trim();
   const password = passwordInput.value.trim();

   // Validate password
   if (!validatePassword(password)) {
      alert('Password must be at least 8 characters long, include an uppercase letter, a number, and a symbol.');
      return; // Stop submission if the password is invalid
   }

   // Validate credentials
   if (email === 'admin@example.com' && password === 'Admin&123') {
      // Redirect to dashboard or another page
      window.location.href = 'index.html';
   } else {
      alert('Invalid email or password. Please try again.');
   }
});
