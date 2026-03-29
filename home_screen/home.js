// home.js

// Quotes & Side Quests
const quotes = [
    "The only way to do great work is to love what you do.",
    "Believe you can and you're halfway there.",
    "Every day is a new opportunity to grow.",
    "Small progress is still progress.",
    "Your potential is endless.",
    "Balance is not something you find, it's something you create.",
    "The key to keeping your balance is knowing when you've lost it.",
    "Focus on being balanced - success is balance.",
    "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    "Better learn balance. Balance is key.",
];

const sideQuests = [
    { id: '1', title: 'Morning Warrior', description: 'Complete 3 hobby logs before noon', xpReward: 50, difficulty: 'medium' },
    { id: '2', title: 'Consistency Champion', description: 'Log all your hobbies in one day', xpReward: 75, difficulty: 'hard' },
    { id: '3', title: 'First Steps', description: 'Add a new hobby and log it once', xpReward: 25, difficulty: 'easy' },
    { id: '4', title: 'Streak Master', description: 'Maintain your streak for 7 days', xpReward: 100, difficulty: 'hard' },
];

// ========================
// Load current user data
// ========================
function getCurrentUser() {
    const username = localStorage.getItem('currentUser');
    if (!username) { window.location.href = '../welcome_screen/welcome.html'; return null; }
    const users = JSON.parse(localStorage.getItem('users')) || {};
    return users[username] ? { username, ...users[username] } : null;
}

function saveCurrentUser(data) {
    const username = localStorage.getItem('currentUser');
    if (!username) return;
    const users = JSON.parse(localStorage.getItem('users')) || {};
    users[username] = { ...users[username], ...data };
    localStorage.setItem('users', JSON.stringify(users));
}

const userData = getCurrentUser();
if (!userData) { /* redirected */ }

const savedHobbies = userData ? (userData.userHobbies || []) : [];
if (!savedHobbies.length) window.location.href = '../first_screen/index.html';

let state = {
    userName: userData ? (userData.userName || 'User') : 'User',
    stats: userData ? (userData.userStats || { level: 1, xp: 0, maxXp: 100, streak: 0, tasksCompleted: 0 }) : { level: 1, xp: 0, maxXp: 100, streak: 0, tasksCompleted: 0 },
    hobbies: savedHobbies.map((hobby, index) => ({
        id: hobby.id || (index + 1).toString(),
        name: hobby.name || hobby,
        logs: hobby.logs || 0,
        goal: hobby.goal || 10,
    })),
    currentQuest: sideQuests[Math.floor(Math.random() * sideQuests.length)],
};

// ========================
// Helpers
// ========================
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

// ========================
// Render Functions
// ========================
function updateStats() {
    const { level, xp, maxXp, streak, tasksCompleted } = state.stats;
    const xpPercentage = (xp / maxXp) * 100;
    document.getElementById('levelValue').textContent = level;
    document.getElementById('xpProgress').style.width = `${xpPercentage}%`;
    document.getElementById('xpText').textContent = `${xp}/${maxXp} XP`;
    document.getElementById('streakValue').textContent = streak;
    document.getElementById('completedValue').textContent = tasksCompleted;
}

function renderHobbies() {
    const hobbiesList = document.getElementById('hobbiesList');
    if (!state.hobbies.length) {
        hobbiesList.innerHTML = '<p>No hobbies found</p>';
        return;
    }
    hobbiesList.innerHTML = state.hobbies.map(hobby => `
        <div class="hobby-card">
            <div class="hobby-info">
                <div class="hobby-name">${hobby.name}</div>
                <div class="hobby-logs">${hobby.logs} times logged</div>
            </div>
            <button class="log-button" onclick="handleAddLog('${hobby.id}')">+ Log</button>
        </div>
    `).join('');
}

function renderQuest() {
    const quest = state.currentQuest;
    document.getElementById('questName').textContent = quest.title;
    document.getElementById('questDescription').textContent = quest.description;
    document.getElementById('questReward').textContent = `+${quest.xpReward} XP Reward`;
    const difficultyBadge = document.getElementById('questDifficulty');
    difficultyBadge.textContent = quest.difficulty;
    difficultyBadge.className = `difficulty-badge ${quest.difficulty}`;
}

// ========================
// Event Handlers
// ========================
function handleAddLog(hobbyId) {
    state.hobbies = state.hobbies.map(hobby =>
        hobby.id === hobbyId ? { ...hobby, logs: hobby.logs + 1 } : hobby
    );

    // Add a record to this user's hobbyLogs
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const username = localStorage.getItem('currentUser');
    if (users[username]) {
        const hobbyLogs = users[username].hobbyLogs || [];
        hobbyLogs.push({ hobbyId, duration: 0, timestamp: Date.now() });
        users[username].hobbyLogs = hobbyLogs;
    }

    // XP & tasks
    const xpGain = 10;
    state.stats.xp += xpGain;
    state.stats.tasksCompleted += 1;

    while (state.stats.xp >= state.stats.maxXp) {
        state.stats.level++;
        state.stats.xp -= state.stats.maxXp;
        state.stats.maxXp = 100 + 20 * (state.stats.level - 1);
        showToast(`Level Up! 🎉`, 'success');
    }

    updateStats();
    renderHobbies();

    // Save everything back to this user's record
    if (users[username]) {
        users[username].userHobbies = state.hobbies;
        users[username].userStats = state.stats;
        localStorage.setItem('users', JSON.stringify(users));
    }
}

function handleAddHobby() {
    const nameInput = document.getElementById('hobbyNameInput');
    const name = nameInput.value.trim();
    if (!name) return;

    const newHobby = { id: Date.now().toString(), name, logs: 0, goal: 10 };
    state.hobbies.push(newHobby);
    nameInput.value = '';
    document.getElementById('addHobbyForm').classList.add('hidden');

    renderHobbies();
    showToast(`${name} added!`, 'success');

    saveCurrentUser({ userHobbies: state.hobbies });
}

function handleStartQuest() {
    const questXp = state.currentQuest.xpReward || 0;
    state.stats.xp += questXp;

    const users = JSON.parse(localStorage.getItem('users')) || {};
    const username = localStorage.getItem('currentUser');
    if (users[username]) {
        users[username].sideQuestCount = (users[username].sideQuestCount || 0) + 1;
        const progressElem = document.getElementById('sideQuestProgress');
        if (progressElem) progressElem.textContent = `Side Quests Completed: ${users[username].sideQuestCount}`;
    }

    while (state.stats.xp >= state.stats.maxXp) {
        state.stats.level++;
        state.stats.xp -= state.stats.maxXp;
        state.stats.maxXp = 100 + 20 * (state.stats.level - 1);
        showToast(`Level Up! 🎉`, 'success');
    }

    showToast(`Quest completed! +${questXp} XP`, 'success');
    updateStats();

    state.currentQuest = sideQuests[Math.floor(Math.random() * sideQuests.length)];
    renderQuest();

    if (users[username]) {
        users[username].userStats = state.stats;
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// ========================
// Init
// ========================
function init() {
    document.getElementById('quoteText').textContent = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('greetingTitle').textContent = `${getGreeting()}, ${state.userName}! 👋`;

    updateStats();
    renderHobbies();
    renderQuest();

    document.getElementById('addHobbyBtn').addEventListener('click', () => {
        document.getElementById('addHobbyForm').classList.remove('hidden');
    });
    document.getElementById('submitHobbyBtn').addEventListener('click', handleAddHobby);
    document.getElementById('cancelHobbyBtn').addEventListener('click', () => {
        document.getElementById('addHobbyForm').classList.add('hidden');
    });
    document.getElementById('startQuestBtn').addEventListener('click', handleStartQuest);
}

document.addEventListener('DOMContentLoaded', init);

function goToPage(page) { window.location.href = page; }
