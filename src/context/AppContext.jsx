import React, { createContext, useContext } from 'react';
import { useStreak } from '../hooks/useStreak';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getToday } from '../utils/dateHelpers';

// CreateContext
const AppContext = createContext();

// AppProvider Component
export const AppProvider = ({ children }) => {
  
  // Phase 2: Streak Engine
  const { streak, markDayAsActive } = useStreak();

  // Phase 3: Tasks & Stats
  const [tasks, setTasks] = useLocalStorage('user_tasks', []);
  const [stats, setStats] = useLocalStorage('daily_stats', {});

  // Phase 5: Goals
  const [goal, setGoal] = useLocalStorage('user_goal', {
    title: '',
    targetDate: ''
  });

  // --- ACTIONS ---

  // Helper: Record productivity in stats
  const recordProductivity = (type, value = 1) => {
    const today = getToday();
    
    setStats(prev => {
      // Default structure
      const currentDay = prev[today] || { codingTime: 0, pomodoros: 0, tasksCompleted: 0 };
      const newStats = { ...currentDay };

      // NOTE: We no longer handle 'task' here, it is handled by the useEffect below
      if (type === 'pomodoro') newStats.pomodoros += 1;
      if (type === 'codingTime') newStats.codingTime += value;

      return { ...prev, [today]: newStats };
    });

    // Mark active immediately for these events
    markDayAsActive();
  };

  // EFFECT: Sync tasksCompleted to daily_stats
  React.useEffect(() => {
    const today = getToday();
    const completedCount = tasks.filter(t => t.completed).length;

    setStats(prev => {
      const currentDay = prev[today] || { codingTime: 0, pomodoros: 0, tasksCompleted: 0 };
      
      // If count hasn't changed, return prev to avoid re-renders loop (though shallow compare might not catch deep obj)
      if (currentDay.tasksCompleted === completedCount) return prev;

      return {
        ...prev,
        [today]: {
          ...currentDay,
          tasksCompleted: completedCount
        }
      };
    });

    // If we have at least one completed task, mark day active
    if (completedCount > 0) {
        markDayAsActive();
    }
  }, [tasks]); // Runs whenever tasks change

  const addTask = (title, category) => {
    const newTask = {
      id: Date.now(),
      title,
      category,
      completed: false
    };
    setTasks(prev => [...prev, newTask]);
  };

  const toggleTask = (taskId) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, completed: !t.completed };
      }
      return t;
    }));
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const getTodayStats = () => {
    const today = getToday();
    return stats[today] || { codingTime: 0, pomodoros: 0, tasksCompleted: 0 };
  };

  const updateGoal = (title, targetDate) => {
    setGoal({ title, targetDate });
  };

  const value = {
    streak,
    tasks,
    stats,
    goal,
    markDayAsActive,
    addTask,
    toggleTask,
    deleteTask,
    getTodayStats,
    recordProductivity,
    updateGoal
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook for easier usage
export const useAppContext = () => {
  return useContext(AppContext);
};
