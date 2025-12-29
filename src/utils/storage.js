/**
 * CodeStreak Storage Utilities
 * Wrappers for LocalStorage with error handling.
 */

export const getStorage = (key, defaultValue) => {
  try {
    const item = window.localStorage.getItem(key);
    // Parse JSON if exists, otherwise return default
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
    return defaultValue;
  }
};

export const setStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key}:`, error);
  }
};

export const removeStorage = (key) => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key}:`, error);
  }
};
