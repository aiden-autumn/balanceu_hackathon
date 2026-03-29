// log.js

let selectedHobby = '';
let selectedDuration = '';
let selectedFeelings = [];

const hobbyEmojis = {
    reading: '📚', gaming: '🎮', cooking: '🍳', photography: '📷',
    traveling: '✈️', music: '🎵', sports: '⚽', painting: '🎨',
    gardening: '🌻', writing: '✍️', dancing: '💃', hiking: '🥾',
    pottery: '🏺', woodworking: '🪚', yoga: '🧘', cycling: '🚴',
    fishing: '🎣', knitting: '🧶', drawing: '🖊️', guitar: '🎸',
    running: '🏃',
};

function getCurrentUserData() {
    const username = localStorage.getItem('currentUser');
    if (!username) return null;
    const users = JSON.parse(localStorage.getItem('users')) || {};
    return { username, data: users[username] || {} };
}

function saveCurrentUserData(updates) {
    const username = localStorage.getItem('currentUser');
    if (!username) return;
    const users = JSON.parse(localStorage.getItem('users')) || {};
    users[username] = { ...users[username], ...updates };
    localStorage.setItem('users', JSON.stringify(users));
}

function buildHobbyButtons() {
    const current = getCurrentUserData();
    const saved = current ? (current.data.userHobbies || []) : [];
    const container = document.getElementById('hobbies');
    container.innerHTML = '';

    if (!saved.length) {
        container.innerHTML = '<p>No hobbies found. Go to the home screen to add some!</p>';
        return;
    }

    saved.forEach(hobbyEntry => {
        const hobbyName = typeof hobbyEntry === 'string' ? hobbyEntry : hobbyEntry.name;
        const key = hobbyName.toLowerCase();
        const emoji = hobbyEmojis[key] || '🎯';
        const btn = document.createElement('button');
        btn.dataset.hobby = key;
        btn.innerHTML = `<span class="emoji">${emoji}</span>${hobbyName}`;
        container.appendChild(btn);
    });
}

document.getElementById('hobbies').addEventListener('click', function(e) {
    const button = e.target.closest('button');
    if (!button) return;
    this.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    selectedHobby = button.dataset.hobby;
});

document.getElementById('durations').addEventListener('click', function(e) {
    const button = e.target.closest('button');
    if (!button) return;
    this.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    selectedDuration = button.dataset.duration;
});

document.getElementById('feelings').addEventListener('click', function(e) {
    const button = e.target.closest('button');
    if (!button) return;
    const feeling = button.dataset.feeling;
    if (selectedFeelings.includes(feeling)) {
        selectedFeelings = selectedFeelings.filter(f => f !== feeling);
        button.classList.remove('selected');
    } else {
        selectedFeelings.push(feeling);
        button.classList.add('selected');
    }
});

function logSession() {
    if (!selectedHobby || !selectedDuration) {
        alert('Please select a hobby and duration');
        return;
    }

    const duration = parseInt(selectedDuration);
    const current = getCurrentUserData();
    if (!current) return;

    const userData = current.data;

    // Update hobby totals
    const hobbyTotals = userData.hobbyTotals || {};
    hobbyTotals[selectedHobby] = (hobbyTotals[selectedHobby] || 0) + duration;

    // Update hobby logs
    const hobbyLogs = userData.hobbyLogs || [];
    hobbyLogs.push({
        hobby: selectedHobby,
        duration,
        feelings: [...selectedFeelings],
        timestamp: new Date().toISOString()
    });

    // Update XP and stats
    let userStats = userData.userStats || { level: 1, xp: 0, maxXp: 100, streak: 0, tasksCompleted: 0 };
    userStats.xp += duration;
    userStats.tasksCompleted += 1;

    while (userStats.xp >= userStats.maxXp) {
        userStats.level++;
        userStats.xp -= userStats.maxXp;
        userStats.maxXp = 100 + 20 * (userStats.level - 1);
        alert(`Level Up! 🎉 You are now level ${userStats.level}`);
    }

    saveCurrentUserData({ hobbyTotals, hobbyLogs, userStats });

    // Reset selections
    document.querySelectorAll('#hobbies button.selected, #durations button.selected, #feelings button.selected')
        .forEach(btn => btn.classList.remove('selected'));
    selectedHobby = '';
    selectedDuration = '';
    selectedFeelings = [];

    alert(`Logged: ${duration} min of ${selectedHobby}! +${duration} XP`);
}

function goToPage(page) { window.location.href = page; }

document.addEventListener('DOMContentLoaded', buildHobbyButtons);
