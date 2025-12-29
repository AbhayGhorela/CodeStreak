import { useState, useEffect } from 'react';
import { getStorage, setStorage } from '../utils/storage';

/**
 * useLocalStorage
 * Syncs state with LocalStorage.
 * 
 * @param {string} key - LocalStorage key
 * @param {any} initialValue - Default value if key doesn't exist
 */
export const useLocalStorage = (key, initialValue) => {
  // Initialize state from storage or default
  const [value, setValue] = useState(() => {
    return getStorage(key, initialValue);
  });

  // Update storage whenever value changes
  useEffect(() => {
    setStorage(key, value);
  }, [key, value]);

  return [value, setValue];
};
