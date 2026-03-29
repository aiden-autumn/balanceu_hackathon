// userStore.js — shared helper for reading/writing per-user data

function getCurrentUsername() {
    return localStorage.getItem('currentUser') || null;
}

function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || {};
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function getCurrentUserData() {
    const username = getCurrentUsername();
    if (!username) return null;
    const users = getUsers();
    return users[username] || null;
}

function saveCurrentUserData(data) {
    const username = getCurrentUsername();
    if (!username) return;
    const users = getUsers();
    users[username] = { ...users[username], ...data };
    saveUsers(users);
}
