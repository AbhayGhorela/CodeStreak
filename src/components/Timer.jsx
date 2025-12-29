import React from 'react';
import { useTimer } from '../hooks/useTimer';
import { useAppContext } from '../context/AppContext';

const Timer = () => {
    // Coding Timer = Stopwatch (countUp: true)
    const { seconds, isActive, toggle, reset } = useTimer(0, true);
    const { recordProductivity } = useAppContext();

    const formatTime = (totalSeconds) => {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        return `${h > 0 ? h + ':' : ''}${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
    };

    const handleFinishSession = () => {
        console.log("Finish Session clicked. Seconds:", seconds);
        // Less than 1 minute doesn't count
        if (seconds < 60) {
            console.log("Session too short (< 60s)");
            return; 
        }

        // Convert to minutes
        const minutes = Math.floor(seconds / 60);
        console.log("Saving coding time:", minutes, "minutes");
        
        // Log productivity
        recordProductivity('codingTime', minutes);
        
        // Reset timer
        reset();
    };

    return (
        <div className="card">
            <h3>⏱ Coding Timer</h3>
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <div className="timer-display">
                    {formatTime(seconds)}
                </div>
                
                <div className="flex gap-sm" style={{ justifyContent: 'center', marginTop: '20px' }}>
                    <button 
                        className={isActive ? "btn-danger" : "btn-primary"}
                        onClick={toggle}
                        style={{ minWidth: '100px' }}
                    >
                        {isActive ? 'PAUSE' : 'START'}
                    </button>

                    {(seconds > 0) && (
                        <button 
                            className="btn-primary" 
                            style={{ backgroundColor: 'var(--info-color)', borderBottomColor: '#0b93d1' }}
                            onClick={handleFinishSession}
                        >
                            FINISH SESSION
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Timer;
