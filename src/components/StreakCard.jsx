import React from 'react';
import { useAppContext } from '../context/AppContext';

const StreakCard = () => {
  const { streak } = useAppContext();
  
  // Visual logic: Fire is lit if streak > 0 or if today is active? 
  // Duolingo style: Fire is lit if you extended it today or have a running streak.
  // We'll trust currentStreak
  const isFire = streak.currentStreak > 0;

  return (
    <div className="card" style={{ borderColor: isFire ? 'var(--secondary-color)' : 'var(--border-color)' }}>
      <div className="flex justify-between" style={{ alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ color: 'var(--text-secondary)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Current Streak
          </h2>
          <div className="flex gap-sm" style={{ marginTop: 'var(--spacing-xs)' }}>
            <span style={{ fontSize: '3rem' }}>{isFire ? '🔥' : '🧊'}</span>
            <span style={{ fontSize: '3rem', fontWeight: '900', color: isFire ? 'var(--secondary-color)' : 'var(--text-secondary)' }}>
              {streak.currentStreak}
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--spacing-sm)' }}>
            days in a row
          </p>
        </div>
        
        <div style={{ textAlign: 'right' }}>
          <div className="flex gap-sm" style={{ justifyContent: 'flex-end', opacity: 0.8 }}>
            <span>🏆</span>
            <span className="font-bold">{streak.longestStreak}</span>
            <span style={{ fontSize: '0.8rem' }}>record</span>
          </div>
          <p style={{ marginTop: 'var(--spacing-sm)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
             {isFire ? "Keep it up!" : "Start today!"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StreakCard;
