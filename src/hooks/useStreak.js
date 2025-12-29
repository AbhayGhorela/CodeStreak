import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { getToday, getYesterday } from '../utils/dateHelpers';

/**
 * useStreak
 * Manages the core streak logic.
 * 
 * Logic:
 * - Load streak data from localStorage
 * - Check if streak is broken (lastActive < yesterday)
 * - Expose function to mark today as active
 */
export const useStreak = () => {
    
    // 1. Initialize State from LocalStorage
    // Default: local active date is null (never used), calendar empty
    const [streak, setStreak] = useLocalStorage('user_streak', {
        currentStreak: 0,
        longestStreak: 0,
        lastActiveDate: null,
        calendar: [] // Keep a log of all active dates
    });

    // 2. Check Streak Validity on Mount
    useEffect(() => {
        const today = getToday();
        const yesterday = getYesterday();
        const lastActive = streak.lastActiveDate;

        // If no history, nothing to check
        if (!lastActive) return;

        // Condition A: Active today or yesterday -> Streak is safe (do nothing)
        if (lastActive === today || lastActive === yesterday) {
            return;
        }

        // Condition B: Last active was OLDER than yesterday -> Streak Broken
        // We only reset currentStreak to 0. Longest streak remains.
        if (lastActive < yesterday) {
            setStreak(prev => ({
                ...prev,
                currentStreak: 0
                // We keep lastActiveDate as is, until they engage again
            }));
        }
    }, []); // Run once on mount

    // 3. Action: Mark Day As Active
    // Called whenever a task/timer is completed
    const markDayAsActive = () => {
        const today = getToday();
        const yesterday = getYesterday();
        const lastActive = streak.lastActiveDate;

        // If today is already active, don't increment streak again
        if (lastActive === today) {
            return;
        }

        setStreak(prev => {
            let newCurrent = prev.currentStreak;

            // If last active was yesterday, increment
            if (lastActive === yesterday) {
                newCurrent += 1;
            } 
            // If last active was today (handled above, but for safety)
            else if (lastActive === today) {
                // No change
            }
            // If streak was broken or brand new
            else {
                newCurrent = 1;
            }

            return {
                ...prev,
                currentStreak: newCurrent,
                longestStreak: Math.max(prev.longestStreak, newCurrent),
                lastActiveDate: today,
                calendar: [...prev.calendar, today]
            };
        });
    };

    return { streak, markDayAsActive };
};
