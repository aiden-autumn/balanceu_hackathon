// progress.js

const COLORS = ['#3b82f6', '#60a5fa', '#93c5fd', '#34d399', '#f59e0b', '#f87171', '#a78bfa'];

const grassAwards = [
    { id: '1', name: 'First Touch', requiredTouches: 5, icon: '🌱' },
    { id: '2', name: 'Grass Dabbler', requiredTouches: 10, icon: '🌿' },
    { id: '3', name: 'Lawn Wanderer', requiredTouches: 20, icon: '🍃' },
    { id: '4', name: 'Field Scout', requiredTouches: 40, icon: '🌾' },
    { id: '5', name: 'Trail Blazer', requiredTouches: 75, icon: '🥾' },
    { id: '6', name: 'Nature Guardian', requiredTouches: 125, icon: '🌳' },
    { id: '7', name: 'Grass Sage', requiredTouches: 180, icon: '🧘' },
    { id: '8', name: 'Legend of the Lawn', requiredTouches: 250, icon: '👑' },
];

const hobbyAwardThresholds = [
    { min: 5, name: "Getting Started" },
    { min: 10, name: "Casual Explorer" },
    { min: 20, name: "Dedicated Hobbyist" },
    { min: 40, name: "Hobby Enthusiast" },
    { min: 75, name: "Master of Fun" },
    { min: 125, name: "Hobby Champion" },
    { min: 180, name: "Legendary Practitioner" },
    { min: 250, name: "Ultimate Hobbyist" },
];

function formatTime(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function getCurrentUserData() {
    const username = localStorage.getItem('currentUser');
    if (!username) return null;
    const users = JSON.parse(localStorage.getItem('users')) || {};
    return users[username] || null;
}

function getHobbies(userData) {
    const savedHobbies = userData.userHobbies || [];
    return savedHobbies.map((hobby, index) => ({
        id: hobby.id || (index + 1).toString(),
        name: hobby.name || hobby,
        clicks: hobby.logs || 0,
    }));
}

function getHobbyData(userData) {
    const hobbies = getHobbies(userData);
    const logs = userData.hobbyLogs || [];

    const hobbyMap = {};
    hobbies.forEach(h => {
        hobbyMap[h.id] = { name: h.name, totalTime: h.clicks * 10 };
    });

    logs.forEach(log => {
        const hobbyId = log.hobbyId;
        const hobbyName = log.hobby;
        if (hobbyId && hobbyMap[hobbyId]) {
            hobbyMap[hobbyId].totalTime += log.duration || 0;
        } else if (hobbyName) {
            const entry = Object.values(hobbyMap).find(h => h.name.toLowerCase() === hobbyName.toLowerCase());
            if (entry) entry.totalTime += log.duration || 0;
        }
    });

    return Object.values(hobbyMap);
}

function renderProgressList() {
    const userData = getCurrentUserData();
    if (!userData) return;
    const container = document.querySelector('.activity-list');
    if (!container) return;
    container.innerHTML = '';

    getHobbyData(userData).forEach(hobby => {
        const div = document.createElement('div');
        div.className = 'activity-item';
        div.innerHTML = `
            <span class="activity-name">${hobby.name}</span>
            <span class="activity-time">${formatTime(hobby.totalTime)}</span>
        `;
        container.appendChild(div);
    });
}

function drawChart() {
    const userData = getCurrentUserData();
    if (!userData) return;
    const canvas = document.getElementById('pieChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const outerRadius = 80;
    const innerRadius = 60;

    const hobbyData = getHobbyData(userData).filter(h => h.totalTime > 0);
    if (!hobbyData.length) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI);
        ctx.arc(centerX, centerY, innerRadius, 2 * Math.PI, 0, true);
        ctx.closePath();
        ctx.fillStyle = '#e0e7ff';
        ctx.fill();
        ctx.fillStyle = '#64748b';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('No logs yet', centerX, centerY + 4);
        updateLegend([]);
        return;
    }

    const total = hobbyData.reduce((sum, h) => sum + h.totalTime, 0);
    let currentAngle = -Math.PI / 2;

    hobbyData.forEach((item, i) => {
        const sliceAngle = (item.totalTime / total) * 2 * Math.PI;
        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius, currentAngle, currentAngle + sliceAngle);
        ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
        ctx.closePath();
        ctx.fillStyle = COLORS[i % COLORS.length];
        ctx.fill();
        currentAngle += sliceAngle;
    });

    updateLegend(hobbyData);
}

function updateLegend(data) {
    const legendEl = document.querySelector('.legend');
    if (!legendEl) return;
    if (!data.length) {
        legendEl.innerHTML = '<p style="color:#64748b;font-size:0.85rem;">Log some hobbies to see your chart!</p>';
        return;
    }
    legendEl.innerHTML = data.map((item, i) => `
        <div class="legend-item">
            <span class="legend-color" style="background-color:${COLORS[i % COLORS.length]};"></span>
            <span>${item.name} (${formatTime(item.totalTime)})</span>
        </div>
    `).join('');
}

function updateWeeklyGoal() {
    const userData = getCurrentUserData();
    if (!userData) return;
    const goalHours = parseFloat(localStorage.getItem('weeklyGoal')) || 10;
    const hobbyData = getHobbyData(userData);
    const totalMinutes = hobbyData.reduce((sum, h) => sum + (h.totalTime || 0), 0);

    const bar = document.querySelector('.progress-bar-fill');
    const label = document.querySelector('.progress-text');
    if (!bar || !label) return;

    const percentage = Math.min((totalMinutes / (goalHours * 60)) * 100, 100);
    bar.style.width = percentage + '%';
    label.textContent = `${(totalMinutes / 60).toFixed(1)}/${goalHours} hours`;
}

function renderAwards() {
    const awardsGrid = document.querySelector('.awards-grid');
    if (!awardsGrid) return;
    awardsGrid.innerHTML = '';

    const userData = getCurrentUserData();
    if (!userData) return;

    const totalTouches = userData.totalTouches || 0;
    grassAwards.forEach(a => {
        if (totalTouches >= a.requiredTouches) {
            const div = document.createElement('div');
            div.className = 'award-item';
            div.innerHTML = `<span class="award-icon">${a.icon}</span><span class="award-name">${a.name}</span>`;
            awardsGrid.appendChild(div);
        }
    });

    const userStats = userData.userStats || { level: 1 };
    const userLevel = userStats.level || 1;
    hobbyAwardThresholds.forEach(a => {
        if (userLevel >= a.min) {
            const div = document.createElement('div');
            div.className = 'award-item';
            div.innerHTML = `<span class="award-icon">🏆</span><span class="award-name">${a.name}</span>`;
            awardsGrid.appendChild(div);
        }
    });
}

function initProgress() {
    renderProgressList();
    drawChart();
    updateWeeklyGoal();
    renderAwards();
}

document.addEventListener('DOMContentLoaded', initProgress);

function goToPage(page) { window.location.href = page; }
