import React, { useState, useEffect } from 'react';
import { useSiteSettings } from '../context/SiteContext';
import '../styles/FloatingHeart.css';

const FloatingHeart = () => {
    const { settings } = useSiteSettings();
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: '50%', left: '50%' });

    useEffect(() => {
        const showHeart = () => {
            // Random position (keeping it somewhat central but varied)
            const top = Math.random() * 60 + 20 + '%'; // 20% to 80%
            const left = Math.random() * 60 + 20 + '%';

            setPosition({ top, left });
            setIsVisible(true);

            // Hide after 3 seconds (duration of animation)
            setTimeout(() => {
                setIsVisible(false);
            }, 3000);

            // Schedule next appearance (random between 10s and 30s)
            // Initial wait is short for testing
            const nextTime = Math.random() * 20000 + 10000;
            timeoutId = setTimeout(showHeart, nextTime);
        };

        // Start the cycle
        let timeoutId = setTimeout(showHeart, 5000);

        return () => clearTimeout(timeoutId);
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className="floating-heart-container"
            style={{ top: position.top, left: position.left }}
        >
            <div className="heart-shape"></div>
            <div className="heart-text">I Love You {settings.valentineName}</div>
        </div>
    );
};

export default FloatingHeart;
