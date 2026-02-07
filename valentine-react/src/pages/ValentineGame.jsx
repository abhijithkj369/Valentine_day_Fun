import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/ValentineGame.css';

const ValentineGame = () => {
    const [moveCount, setMoveCount] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [yesBtnStyle, setYesBtnStyle] = useState({});
    const maxMoves = 5; // Difficulty adjusted
    const containerRef = useRef(null);
    const navigate = useNavigate();

    const moveButton = () => {
        if (moveCount >= maxMoves) return;

        if (!containerRef.current) return;

        // Logic to move button to a random position
        const viewportWidth = window.innerWidth - 100;
        const viewportHeight = window.innerHeight - 50;

        const newX = Math.max(20, Math.random() * viewportWidth);
        const newY = Math.max(20, Math.random() * viewportHeight);

        setYesBtnStyle({
            position: 'fixed',
            left: `${newX}px`,
            top: `${newY}px`,
            transition: 'all 0.2s ease' // Smooth movement
        });

        setMoveCount(prev => prev + 1);
    };

    const handleYesClick = () => {
        setShowSuccess(true);
        // Redirect to rewards after 2 seconds
        setTimeout(() => {
            navigate('/rewards');
        }, 2000);
    };

    const handleNoClick = () => {
        const phrases = [
            "Nice try! 😉",
            "You can't say no! 😈",
            "Try again! ❤️",
            "Don't break my heart! 💔"
        ];
        alert(phrases[Math.floor(Math.random() * phrases.length)]);
    };

    return (
        <div className="game-wrapper">
            <header>
                <h1>Something special for you...</h1>
            </header>
            <main ref={containerRef}>
                {!showSuccess ? (
                    <div className="game-container">
                        <h2>Will you be my Valentine? 🌹</h2>
                        <div className="buttons-container">
                            <button
                                id="yes-btn"
                                style={yesBtnStyle}
                                onMouseEnter={moveButton}
                                onClick={moveCount >= maxMoves ? handleYesClick : moveButton}
                                // Mobile support: touchstart
                                onTouchStart={moveCount >= maxMoves ? handleYesClick : moveButton}
                            >
                                Yes!
                            </button>
                            <button onClick={handleNoClick} id="no-btn">No</button>
                        </div>
                        <p style={{ marginTop: '20px', fontSize: '0.8rem', opacity: 0.7 }}>
                            (Try to catch the button!)
                        </p>
                    </div>
                ) : (
                    <div className="game-container success-message">
                        <h2>Yay! I knew you'd say Yes! ❤️</h2>
                        <p>I love you! Getting your rewards...</p>
                        <div className="heart-animation">❤️</div>
                    </div>
                )}
                {!showSuccess && <Link to="/" className="back-link">← Back to Games</Link>}
            </main>
        </div>
    );
};

export default ValentineGame;
