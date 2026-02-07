import React, { useState, useEffect } from 'react';
import { useSiteSettings } from '../context/SiteContext';
import '../styles/TimeTogether.css';

const TimeTogether = () => {
    const { settings } = useSiteSettings();
    const startDate = new Date(settings.startDate);

    const [timeElapsed, setTimeElapsed] = useState({
        years: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const difference = now.getTime() - startDate.getTime();

            if (difference < 0) {
                setTimeElapsed({ years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
            const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeElapsed({ years, days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(timer);
    }, [settings.startDate]);

    return (
        <div className="time-together-container">
            <h2>We've been together for:</h2>
            <div className="timer-grid">
                <div className="timer-item">
                    <span className="timer-value">{timeElapsed.years}</span>
                    <span className="timer-label">Years</span>
                </div>
                <div className="timer-item">
                    <span className="timer-value">{timeElapsed.days}</span>
                    <span className="timer-label">Days</span>
                </div>
                <div className="timer-item">
                    <span className="timer-value">{timeElapsed.hours}</span>
                    <span className="timer-label">Hours</span>
                </div>
                <div className="timer-item">
                    <span className="timer-value">{timeElapsed.minutes}</span>
                    <span className="timer-label">Minutes</span>
                </div>
                <div className="timer-item">
                    <span className="timer-value">{timeElapsed.seconds}</span>
                    <span className="timer-label">Seconds</span>
                </div>
            </div>
        </div>
    );
};

export default TimeTogether;
