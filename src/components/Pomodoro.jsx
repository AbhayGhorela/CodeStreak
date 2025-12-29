import React, { useEffect, useState } from 'react';
import { useTimer } from '../hooks/useTimer';
import { useAppContext } from '../context/AppContext';

const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

const Pomodoro = () => {
    const [mode, setMode] = useState('WORK');
    // Pomodoro = Countdown (countUp: false)
    const { seconds, isActive, toggle, reset } = useTimer(WORK_TIME, false);
    const { recordProductivity } = useAppContext();

    const formatTime = (totalSeconds) => {
        const m = Math.floor(totalSeconds / 60);
        const s = totalSeconds % 60;
        return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
    };

    const handleComplete = () => {
        if (mode === 'WORK') {
            recordProductivity('pomodoro');
            setMode('BREAK');
            reset(BREAK_TIME);
        } else {
            setMode('WORK');
            reset(WORK_TIME);
        }
    };

    const progress = 100 - (seconds / (mode === 'WORK' ? WORK_TIME : BREAK_TIME)) * 100;

    return (
        <div className="card">
            <div className="flex justify-between">
                <h3>🍅 Pomodoro</h3>
                <span style={{ 
                    fontSize: '0.8rem', 
                    background: mode === 'WORK' ? 'var(--danger-color)' : 'var(--primary-color)', 
                    padding: '4px 8px', borderRadius: '8px', fontWeight: 'bold' 
                }}>
                    {mode}
                </span>
            </div>

            <div style={{ textAlign: 'center', padding: '20px' }}>
                {/* Progress Bar */}
                <div style={{ width: '100%', height: '8px', background: 'var(--dark-bg)', borderRadius: '4px', marginBottom: '20px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: 'var(--danger-color)', transition: 'width 1s linear' }} />
                </div>

                <div className="timer-display">
                    {formatTime(seconds)}
                </div>

                <div className="flex gap-sm" style={{ justifyContent: 'center', marginTop: '20px' }}>
                    {seconds === 0 ? (
                        <button className="btn-primary" onClick={handleComplete}>
                            {mode === 'WORK' ? 'FINISH & REST' : 'BACK TO WORK'}
                        </button>
                    ) : (
                        <>
                            <button className={isActive ? "btn-danger" : "btn-primary"} onClick={toggle}>
                                {isActive ? 'PAUSE' : 'START'}
                            </button>
                            <button onClick={() => reset(mode==='WORK'?WORK_TIME:BREAK_TIME)} style={{background:'transparent', color:'#888'}}>
                                Reset
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Pomodoro;
