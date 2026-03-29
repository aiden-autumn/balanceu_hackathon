// login.js

// Password visibility toggle
const togglePasswordBtn = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePasswordBtn.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
});

// Form submission
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    // Load the users registry
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const user = users[username];

    if (!user) {
        alert('No account found with that username. Please sign up first.');
        return;
    }

    if (user.password !== password) {
        alert('Incorrect password. Please try again.');
        return;
    }

    // Set the currently logged-in user
    localStorage.setItem('currentUser', username);
    localStorage.setItem('loggedIn', 'true');

    console.log('Login successful:', { username });

    // If onboarding already done, go to home; otherwise onboard
    if (user.userName && user.userHobbies && user.userHobbies.length > 0) {
        window.location.href = '../home_screen/home.html';
    } else {
        window.location.href = '../first_screen/index.html';
    }
});
