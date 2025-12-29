import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { getDaysRemaining } from '../utils/dateHelpers';

const GoalCard = () => {
  const { goal, updateGoal } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [tempGoal, setTempGoal] = useState(goal);

  const daysLeft = getDaysRemaining(goal.targetDate);

  const handleSave = () => {
    updateGoal(tempGoal.title, tempGoal.targetDate);
    setIsEditing(false);
  };

  if (!goal.title && !isEditing) {
    return (
      <div className="card" style={{ borderStyle: 'dashed', textAlign: 'center', cursor: 'pointer' }} onClick={() => setIsEditing(true)}>
        <h3 style={{ color: 'var(--text-secondary)' }}>+ Set a Big Goal</h3>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex justify-between">
        <h3>🎯 Goal</h3>
        {!isEditing && (
            <button onClick={() => setIsEditing(true)} style={{ background:'transparent', color: '#888' }}>
                Edit
            </button>
        )}
      </div>

      {isEditing ? (
        <div style={{ marginTop: '20px' }}>
            <input 
                type="text" 
                placeholder="Goal Title (e.g. Master React)" 
                value={tempGoal.title}
                onChange={e => setTempGoal({...tempGoal, title: e.target.value})}
                style={{ width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '8px', border: '1px solid #444', background: '#222', color: 'white' }}
            />
            <input 
                type="date"
                value={tempGoal.targetDate}
                onChange={e => setTempGoal({...tempGoal, targetDate: e.target.value})}
                style={{ width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '8px', border: '1px solid #444', background: '#222', color: 'white' }}
            />
            <div className="flex gap-sm">
                <button className="btn-primary" onClick={handleSave}>Save</button>
                <button onClick={() => setIsEditing(false)} style={{ background:'transparent', color: '#888' }}>Cancel</button>
            </div>
        </div>
      ) : (
        <div style={{ marginTop: '20px' }}>
            <div style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{goal.title}</div>
            
            {/* Visual Progress Bar (simulated) */}
            <div style={{ width: '100%', height: '10px', background: '#333', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', background: 'var(--info-color)' }} /> 
                {/* Note: Real progress needs start date. For now, we just show it's active. */}
            </div>

            <div style={{ textAlign: 'right', marginTop: '10px', fontWeight: 'bold', color: 'var(--info-color)' }}>
                {daysLeft} days left
            </div>
        </div>
      )}
    </div>
  );
};

export default GoalCard;
