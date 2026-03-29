// quest.js

const currentUser = localStorage.getItem('currentUser') || 'guest';

const questXPMap = {
    "Creative Burst": 15,
    "Touch Grass Quest": 10,
    "Music Quest": 12,
};

// ------------------------
// Read/write from the shared users object
// ------------------------
function getUserData() {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    return users[currentUser] || {};
}

function saveUserData(updates) {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    users[currentUser] = { ...users[currentUser], ...updates };
    localStorage.setItem('users', JSON.stringify(users));
}

// ------------------------
// START QUEST
// ------------------------
function startQuest() {
    const button = document.querySelector('.start-button');
    const questTitle = document.querySelector('.quest-title').textContent;

    if (button.disabled) return;

    button.textContent = 'Quest Ongoing ⏳';
    button.style.backgroundColor = 'gray';
    button.style.color = '#fff';
    button.disabled = true;

    const userData = getUserData();

    // Update XP/stats
    const questXP = questXPMap[questTitle] || 0;
    const stats = userData.userStats || { level: 1, xp: 0, maxXp: 100, streak: 0, tasksCompleted: 0 };
    stats.xp += questXP;
    stats.tasksCompleted += 1;

    while (stats.xp >= stats.maxXp) {
        stats.level += 1;
        stats.xp -= stats.maxXp;
        stats.maxXp = 100 + 20 * (stats.level - 1);
        alert('Level Up! 🎉');
    }

    // Increment side quest count — stored in the users object
    const sideQuestCount = (userData.sideQuestCount || 0) + 1;

    saveUserData({
        userStats: stats,
        sideQuestCount: sideQuestCount,
        currentQuest: questTitle,
    });

    showSideQuestProgress();

    alert(`Quest started! +${questXP} XP earned! Good luck on "${questTitle}"! 🎨`);
}

// ------------------------
// DISPLAY SIDE QUEST PROGRESS
// ------------------------
function showSideQuestProgress() {
    const count = getUserData().sideQuestCount || 0;
    const progressElem = document.getElementById('sideQuestProgress');
    if (progressElem) {
        progressElem.textContent = `Side Quests Completed: ${count}`;
    }
}

// ------------------------
// UPCOMING QUESTS
// ------------------------
function selectUpcomingQuest(questName) {
    alert(`You selected: ${questName}. This quest will be available soon!`);
}

// ------------------------
// INITIALIZE PAGE
// ------------------------
document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.start-button');
    const userData = getUserData();

    if (userData.currentQuest) {
        button.textContent = 'Quest Ongoing ⏳';
        button.style.backgroundColor = 'gray';
        button.style.color = '#fff';
        button.disabled = true;
    }

    button.addEventListener('click', startQuest);
    showSideQuestProgress();
});

function goToPage(page) { window.location.href = page; }
