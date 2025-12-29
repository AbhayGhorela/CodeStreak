import React from 'react';
import StreakCard from '../components/StreakCard';
import GoalCard from '../components/GoalCard';
import TaskList from '../components/TaskList';
import Timer from '../components/Timer';
import Pomodoro from '../components/Pomodoro';
import { useAppContext } from '../context/AppContext';

const Dashboard = () => {
  const { getTodayStats } = useAppContext();
  const stats = getTodayStats();

  return (
    <div className="container">
      <div className="dashboard-grid">
        
        {/* ROW 1: Streak & Goal (Side by Side on Desktop, Stacked on Mobile) */}
        <div>
            <StreakCard />
        </div>
        <div>
            <GoalCard />
        </div>

        {/* ROW 2: Daily Stats Banner (Full Width) */}
        <div className="card span-2" style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', border: 'none', flexDirection: 'row', alignItems: 'center' }}>
            <div style={{ flex: 1, textAlign: 'left' }}>
                <h3 style={{ marginBottom: '0', color: '#94a3b8' }}>📊 Impact</h3>
            </div>
            <div style={{ flex: 3, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', textAlign: 'center' }}>
                <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--info-color)' }}>{stats.codingTime}m</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Code</div>
                </div>
                <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--danger-color)' }}>{stats.pomodoros}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Pomo</div>
                </div>
                <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{stats.tasksCompleted}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Tasks</div>
                </div>
            </div>
        </div>

        {/* ROW 3: Tools & Tasks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
             <h3 style={{ color: '#64748b', fontSize: '1rem', textTransform: 'uppercase' }}>Focus</h3>
             <Timer />
             <Pomodoro />
        </div>

        <div>
            <h3 style={{ color: '#64748b', fontSize: '1rem', textTransform: 'uppercase' }}>Tasks</h3>
            <TaskList />
        </div>
      
      </div>
    </div>
  );
};

export default Dashboard;
