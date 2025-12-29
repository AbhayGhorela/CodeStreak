# CodeStreak 🔥

**CodeStreak** is a gamified productivity web application designed to help developers and learners maintain their consistency. Inspired by Duolingo's streak dynamics, it combines task management, focus timers, and goal tracking into a unified, privacy-focused dashboard.

![CodeStreak Dashboard](https://via.placeholder.com/800x400?text=CodeStreak+Dashboard+Preview) 
*(Replace with actual screenshot)*

## ✨ Features

- **🔥 Daily Streak System**: Automatically tracks your consistency. Miss a day, and your streak resets (unless you were active yesterday).
- **✅ Daily Task Tracker**: a simple to-do list for efficient daily planning.
- **⏱️ Focus Timers**:
  - **Coding Stopwatch**: Track raw coding hours. Includes a "Finish Session" flow to log time.
  - **Pomodoro Timer**: Classic 25m Work / 5m Break cycle.
- **🎯 Goal Countdown**: Set a major target date and see the days remaining.
- **📊 Daily Impact**: Visual summary of your coding minutes, pomodoros, and completed tasks for the day.
- **🌑 Dark Mode**: A sleek, high-contrast dark theme designed for long coding sessions.
- **📱 Mobile Responsive**: Fully optimized UI that works perfectly on desktop, tablet, and mobile.

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite)
- **Styling**: Vanilla CSS (Custom Variables, Grid/Flexbox)
- **State Management**: React Context API
- **Persistence**: LocalStorage (Privacy-first, no backend required)

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/code-streak.git
   cd code-streak
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Visit `http://localhost:5173` to start your streak!

## 📂 Project Structure

```
src/
 ├── components/       # UI Components (Timer, TaskList, Cards)
 ├── context/          # Global State (AppContext)
 ├── hooks/            # Custom Hooks (useStreak, useTimer, useLocalStorage)
 ├── pages/            # Main Page Views (Dashboard)
 ├── styles/           # Global CSS & Variables
 ├── utils/            # Helper functions (Date, Storage)
 └── App.jsx           # Root Component
```

## 🎮 usage

1. **Start your day**: Open the app to check your streak.
2. **Plan**: Add tasks to your daily list.
3. **Focus**: Use the **Coding Timer** for deep work or **Pomodoro** for structured sessions.
4. **Win**: Completing *any* task or timer session automatically marks your day as **Active** and extends your streak!

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
