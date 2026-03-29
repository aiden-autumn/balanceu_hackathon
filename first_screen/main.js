// main.js — onboarding screen (name + hobbies)

const hobbies = [
    "Reading", "Gaming", "Cooking", "Photography", "Traveling",
    "Music", "Sports", "Painting", "Gardening", "Writing",
    "Dancing", "Hiking", "Pottery", "Woodworking", "Yoga",
    "Cycling", "Fishing", "Knitting",
];

let selectedHobbies = [];
const hobbiesGrid = document.getElementById('hobbiesGrid');
const counter = document.getElementById('counter');
const warningText = document.getElementById('warningText');
const firstNameInput = document.getElementById('firstName');
const submitBtn = document.getElementById('submitBtn');
const form = document.getElementById('loginForm');

// Create hobby checkboxes
hobbies.forEach(hobby => {
    const hobbyItem = document.createElement('div');
    hobbyItem.className = 'hobby-item';
    hobbyItem.dataset.hobby = hobby;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = hobby;

    const label = document.createElement('label');
    label.htmlFor = hobby;
    label.className = 'hobby-label';
    label.textContent = hobby;

    hobbyItem.appendChild(checkbox);
    hobbyItem.appendChild(label);
    hobbiesGrid.appendChild(hobbyItem);

    hobbyItem.addEventListener('click', () => {
        if (!hobbyItem.classList.contains('disabled')) {
            checkbox.checked = !checkbox.checked;
            handleHobbyToggle(hobby, checkbox.checked);
        }
    });

    checkbox.addEventListener('click', (e) => {
        e.stopPropagation();
        handleHobbyToggle(hobby, checkbox.checked);
    });
});

function handleHobbyToggle(hobby, isChecked) {
    if (isChecked) {
        if (selectedHobbies.length < 3) {
            selectedHobbies.push(hobby);
        } else {
            return;
        }
    } else {
        selectedHobbies = selectedHobbies.filter(h => h !== hobby);
    }
    updateUI();
}

function updateUI() {
    counter.textContent = `${selectedHobbies.length}/3 selected`;
    warningText.style.display = selectedHobbies.length === 3 ? 'block' : 'none';
    warningText.textContent = "You can only select 3 hobbies";

    document.querySelectorAll('.hobby-item').forEach(item => {
        const hobby = item.dataset.hobby;
        const checkbox = item.querySelector('input');
        if (selectedHobbies.length >= 3 && !selectedHobbies.includes(hobby)) {
            item.classList.add('disabled');
            checkbox.disabled = true;
        } else {
            item.classList.remove('disabled');
            checkbox.disabled = false;
        }
    });

    updateSubmitButton();
}

function updateSubmitButton() {
    submitBtn.disabled = firstNameInput.value.trim() === '' || selectedHobbies.length !== 3;
}

firstNameInput.addEventListener('input', updateSubmitButton);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = firstNameInput.value.trim();

    // --- Save into the per-user record ---
    const username = localStorage.getItem('currentUser');
    if (username) {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username]) {
            users[username].userName = firstName;
            users[username].userHobbies = selectedHobbies;
            localStorage.setItem('users', JSON.stringify(users));
        }
    }

    window.location.href = '../home_screen/home.html';
});
