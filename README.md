# BalanceU 🎮

> **No guilt. No pressure. Just life.**

BalanceU is a gamified hobby and wellness tracker built for college students who want to rediscover joy outside of academics and avoid burnout — without adding more pressure to their lives.

Built as a Hackathon project using HTML, CSS, and JavaScript with zero dependencies.

---

## 🌟 Features

- **Multi-user accounts** — Sign up and log in with a username and password. Each user's data is saved separately.
- **Hobby tracking** — Pick up to 3 hobbies during onboarding and log your sessions with duration and mood.
- **XP & leveling system** — Earn XP every time you log a hobby or complete a quest. Level up as you go.
- **Daily side quests** — Get fun, low-pressure challenges like "draw something for 10 minutes" or "go outside."
- **Touch Grass** — A dedicated screen that literally rewards you for going outside and touching grass 🌱
- **Progress dashboard** — See a pie chart of your hobby time, weekly goal tracking, and earned awards.
- **Profile page** — View your username, hobbies, and stats all in one place.
- **Streak tracking** — Build momentum by staying consistent.

---

## 📁 Project Structure
```
Hackathan/
├── welcome_screen/      # Landing page (login / sign up entry points)
├── signup_screen/       # Create a new account
├── login_screen/        # Log into an existing account
├── first_screen/        # Onboarding — pick your name and 3 hobbies
├── home_screen/         # Main dashboard — hobby cards, XP bar, side quest preview
├── log_screen/          # Log a hobby session with duration and feelings
├── quest_screen/        # Daily side quest with XP reward
├── grass_screen/        # "Touch Grass" — tap a button to go outside
├── progress_screen/     # Pie chart, weekly goal bar, and awards
└── profile_screen/      # User profile with hobbies and password toggle
```

Each screen is self-contained with its own `.html`, `.css`, and `.js` file.

---

## 🚀 Getting Started

No install or build step needed. Just open the files in a browser.

1. Clone the repository:
```bash
   git clone https://github.com/YOUR_USERNAME/BalanceU.git
```

2. Open `welcome_screen/welcome.html` in your browser.

3. Click **Sign Up** to create an account, pick your hobbies, and start tracking!

> **Note:** All data is stored in your browser's `localStorage`. No backend or database is required.

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Page structure and layout |
| CSS3 | Styling and animations |
| Vanilla JavaScript | All logic, state, and navigation |
| localStorage | Persistent multi-user data storage |
| Canvas API | Pie chart on the progress screen |

---

## 👤 How the User System Works

All user accounts are stored in a single `users` object in `localStorage`, keyed by username:
```json
{
  "users": {
    "alice": {
      "password": "...",
      "userName": "Alice",
      "userHobbies": ["Gaming", "Hiking", "Cooking"],
      "userStats": { "level": 3, "xp": 45, ... },
      "hobbyLogs": [...],
      "sideQuestCount": 5,
      "totalTouches": 12
    },
    "bob": { ... }
  }
}
```

When a user logs in, their username is saved to `currentUser` in localStorage, and every screen reads and writes data only to that user's record.

---

## 🏆 Awards & Progression

**Hobby Awards** (based on XP level):

| Level | Award |
|---|---|
| 5 | Getting Started |
| 10 | Casual Explorer |
| 20 | Dedicated Hobbyist |
| 40 | Hobby Enthusiast |
| 75 | Master of Fun |
| 125 | Hobby Champion |
| 180 | Legendary Practitioner |
| 250 | Ultimate Hobbyist |

**Grass Awards** (based on total "Touch Grass" taps):

| Taps | Award |
|---|---|
| 5 | 🌱 First Touch |
| 10 | 🌿 Grass Dabbler |
| 20 | 🍃 Lawn Wanderer |
| 40 | 🌾 Field Scout |
| 75 | 🥾 Trail Blazer |
| 125 | 🌳 Nature Guardian |
| 180 | 🧘 Grass Sage |
| 250 | 👑 Legend of the Lawn |


> Made with ❤️ for college students everywhere. You're doing great.
