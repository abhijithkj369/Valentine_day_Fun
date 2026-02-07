import React from 'react';
import '../styles/StarryBackground.css';

const StarryBackground = ({ children }) => {
    return (
        <div className="starry-container">
            <div className="stars"></div>
            <div className="stars2"></div>
            <div className="stars3"></div>
            <div className="moon-glow"></div>
            <div className="content-wrapper">
                {children}
            </div>
        </div>
    );
};

export default StarryBackground;
