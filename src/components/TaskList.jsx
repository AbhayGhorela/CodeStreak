import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

/**
 * TaskList
 * Visual interface for managing daily tasks.
 */
const TaskList = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useAppContext();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [category, setCategory] = useState('Coding');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addTask(newTaskTitle, category);
    setNewTaskTitle('');
  };

  const getCategoryEmoji = (cat) => {
    switch (cat) {
      case 'Coding': return '💻';
      case 'Learning': return '📚';
      case 'Revision': return '🧠';
      default: return '📝';
    }
  };

  return (
    <div className="card" style={{ height: 'fit-content' }}>
      <div className="flex justify-between" style={{ marginBottom: 'var(--spacing-md)' }}>
        <h3>✅ Today's Tasks</h3>
        {tasks.length > 0 && (
            <span style={{ background: 'var(--primary-color)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>
            {tasks.filter(t => t.completed).length} / {tasks.length}
            </span>
        )}
      </div>

      <form onSubmit={handleSubmit} style={{ marginBottom: 'var(--spacing-md)' }}>
        <div className="flex gap-sm">
          <input 
            type="text" 
            placeholder="Add a new task..." 
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            style={{ flex: 1 }} 
          />
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Coding">Coding</option>
            <option value="Learning">Learning</option>
            <option value="Revision">Revision</option>
          </select>
        </div>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
        {tasks.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', padding: '10px 0' }}>
            No tasks yet. Add one to get started!
          </div>
        )}
        
        {tasks.map(task => (
          <div 
            key={task.id} 
            style={{ 
              background: 'var(--dark-bg)', 
              padding: '12px', 
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: task.completed ? '2px solid var(--primary-color)' : '2px solid transparent',
              opacity: task.completed ? 0.7 : 1,
              transition: 'var(--transition)'
            }}
          >
            <div className="flex" style={{ gap: '12px', cursor: 'pointer', flex: 1 }} onClick={() => toggleTask(task.id)}>
              <div style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '50%', 
                border: task.completed ? 'none' : '2px solid var(--text-secondary)',
                backgroundColor: task.completed ? 'var(--primary-color)' : 'transparent',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                {task.completed && '✓'}
              </div>
              <div>
                <div style={{ textDecoration: task.completed ? 'line-through' : 'none', fontWeight: 'bold' }}>
                  {task.title}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {getCategoryEmoji(task.category)} {task.category}
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => deleteTask(task.id)}
              style={{ background: 'transparent', color: '#555', fontSize: '1.2rem', padding: '0 8px' }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
