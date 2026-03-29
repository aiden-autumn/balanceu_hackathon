// signup.js

// Toggle password visibility
const togglePasswordBtn = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePasswordBtn.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    togglePasswordBtn.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
});

// Form submission
const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Please fill in both username and password.');
        return;
    }

    // Load the users registry (object keyed by username)
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username]) {
        alert('That username is already taken. Please choose a different one.');
        return;
    }

    // Create a new user entry with default data
    users[username] = {
        password: password,
        userName: '',
        userHobbies: [],
        userStats: { level: 1, xp: 0, maxXp: 100, streak: 0, tasksCompleted: 0 },
        hobbyLogs: [],
        hobbyTotals: {},
        totalTouches: 0,
        sideQuestCount: 0,
    };

    // Save updated users registry
    localStorage.setItem('users', JSON.stringify(users));

    // Set the currently logged-in user
    localStorage.setItem('currentUser', username);
    localStorage.setItem('loggedIn', 'true');

    console.log('Signup successful:', { username });

    // Redirect to onboarding
    window.location.href = '../first_screen/index.html';
});
