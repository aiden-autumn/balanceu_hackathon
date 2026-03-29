// profile.js

let showPassword = false;

// Load current user's data
const username = localStorage.getItem('currentUser') || 'guest';
const users = JSON.parse(localStorage.getItem('users')) || {};
const user = users[username] || {};

const userData = {
    username: username,
    password: user.password || '',
    name: user.userName || 'User',
    hobbies: (user.userHobbies || []).map(h => (typeof h === 'string' ? h : h.name)),
};

// Emoji map for known hobbies
const hobbyEmojis = {
    reading: '📚', gaming: '🎮', cooking: '🍳', photography: '📷',
    traveling: '✈️', music: '🎵', sports: '⚽', painting: '🎨',
    gardening: '🌻', writing: '✍️', dancing: '💃', hiking: '🥾',
    pottery: '🏺', woodworking: '🪚', yoga: '🧘', cycling: '🚴',
    fishing: '🎣', knitting: '🧶', drawing: '🖊️', guitar: '🎸',
    running: '🏃',
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('user-name').textContent = userData.name;
    document.getElementById('username-value').textContent = userData.username;

    renderHobbies();

    document.getElementById('toggle-password').addEventListener('click', togglePasswordVisibility);
    document.getElementById('logout-button').addEventListener('click', handleLogout);
});

function togglePasswordVisibility() {
    showPassword = !showPassword;
    const passwordElement = document.getElementById('password-value');
    const eyeIcon = document.getElementById('eye-icon');
    if (showPassword) {
        passwordElement.textContent = userData.password || '(not set)';
        eyeIcon.textContent = '👁️‍🗨️';
    } else {
        passwordElement.textContent = '•••••••••';
        eyeIcon.textContent = '👁️';
    }
}

function renderHobbies() {
    const container = document.getElementById('profile-hobbies');
    if (!userData.hobbies.length) {
        container.textContent = 'No hobbies set yet.';
        return;
    }
    container.innerHTML = '';
    userData.hobbies.forEach(hobbyName => {
        const key = hobbyName.toLowerCase();
        const emoji = hobbyEmojis[key] || '🎯';
        const span = document.createElement('span');
        span.className = 'hobby-tag';
        span.textContent = `${emoji} ${hobbyName}`;
        container.appendChild(span);
    });
}

function handleLogout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('currentUser');
    window.location.href = '../welcome_screen/welcome.html';
}

function goToPage(page) { window.location.href = page; }
