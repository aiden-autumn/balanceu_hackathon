// grass.js

const awards = [
  { id: '1', name: 'First Touch', requiredTouches: 5, icon: '🌱' },
  { id: '2', name: 'Grass Dabbler', requiredTouches: 10, icon: '🌿' },
  { id: '3', name: 'Lawn Wanderer', requiredTouches: 20, icon: '🍃' },
  { id: '4', name: 'Field Scout', requiredTouches: 40, icon: '🌾' },
  { id: '5', name: 'Trail Blazer', requiredTouches: 75, icon: '🥾' },
  { id: '6', name: 'Nature Guardian', requiredTouches: 125, icon: '🌳' },
  { id: '7', name: 'Grass Sage', requiredTouches: 180, icon: '🧘' },
  { id: '8', name: 'Legend of the Lawn', requiredTouches: 250, icon: '👑' },
];

let touchesToday = 0;
let totalTouches = 0;

const currentUser = localStorage.getItem('currentUser') || 'guest';
const keyToday = `${currentUser}_touchesToday`;
const keyDate = `${currentUser}_lastTouchDate`;

// Read totalTouches from the users object
function getUserTotalTouches() {
  const users = JSON.parse(localStorage.getItem('users')) || {};
  return (users[currentUser] && users[currentUser].totalTouches) || 0;
}

// Save totalTouches back into the users object
function saveUserTotalTouches(value) {
  const users = JSON.parse(localStorage.getItem('users')) || {};
  if (!users[currentUser]) users[currentUser] = {};
  users[currentUser].totalTouches = value;
  localStorage.setItem('users', JSON.stringify(users));
}

function loadData() {
  totalTouches = getUserTotalTouches();

  const storedToday = localStorage.getItem(keyToday);
  const storedDate = localStorage.getItem(keyDate);
  const today = new Date().toDateString();

  if (storedDate === today && storedToday) {
    touchesToday = parseInt(storedToday);
  } else {
    touchesToday = 0;
    localStorage.setItem(keyDate, today);
  }

  updateDisplay();
}

function updateDisplay() {
  document.getElementById('touchesToday').textContent = touchesToday;
  document.getElementById('totalTouches').textContent = totalTouches;
  updateAwards();
}

function handleTouch() {
  touchesToday++;
  totalTouches++;

  localStorage.setItem(keyToday, touchesToday.toString());
  localStorage.setItem(keyDate, new Date().toDateString());
  saveUserTotalTouches(totalTouches);

  updateDisplay();

  const button = document.getElementById('touchButton');
  button.classList.add('animate');
  setTimeout(() => button.classList.remove('animate'), 600);
}

function updateAwards() {
  const container = document.getElementById('awardsContainer');
  const unlockedAwards = awards.filter(award => totalTouches >= award.requiredTouches);

  if (unlockedAwards.length > 0) {
    container.innerHTML = unlockedAwards.map(award => `
      <div class="award-card">
        <div class="award-icon">${award.icon}</div>
        <p class="award-name">${award.name}</p>
        <p class="award-requirement">${award.requiredTouches} touches</p>
      </div>
    `).join('');
  } else {
    container.innerHTML = `
      <div class="no-awards">
        <p class="no-awards-title">No awards yet</p>
        <p class="no-awards-subtitle">Touch grass to unlock awards!</p>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadData();
  document.getElementById('touchButton').addEventListener('click', handleTouch);
});

function goToPage(page) { window.location.href = page; }
