import React, { useState } from 'react';
import { useSiteSettings } from '../context/SiteContext';
import { Lock, Unlock } from 'lucide-react';
import '../styles/SecurityCheck.css';

const SecurityCheck = () => {
    const { login } = useSiteSettings();
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [shake, setShake] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        if (login(pin)) {
            // Success handled by context/wrapper
        } else {
            setError('IMPOSTER DETECTED! 🚨');
            setShake(true);
            setTimeout(() => setShake(false), 500);

            // Optional: Play error sound
            // const audio = new Audio('/error.mp3');
            // audio.play().catch(() => {});
        }
    };

    return (
        <div className="security-wrapper">
            <div className={`security-card ${shake ? 'shake' : ''}`}>
                <div className="icon-container">
                    <Lock size={48} color="#ff4d6d" />
                </div>
                <h2>Security Check 🔒</h2>
                <p>Please enter the 4-digit PIN to access my heart.</p>
                <p className="hint">(Hint: When did our story begin? MMDD)</p>

                <form onSubmit={handleLogin}>
                    <input
                        type="password"
                        maxLength="4"
                        value={pin}
                        onChange={(e) => {
                            setPin(e.target.value);
                            setError('');
                        }}
                        placeholder="PIN"
                        autoFocus
                    />
                    <button type="submit">
                        Unlock <Unlock size={16} style={{ marginLeft: '8px' }} />
                    </button>
                </form>

                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
};

export default SecurityCheck;
