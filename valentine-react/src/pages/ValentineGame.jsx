import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ValentineGame.css';

const ValentineGame = () => {
    const [moveCount, setMoveCount] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [yesBtnStyle, setYesBtnStyle] = useState({});
    const maxMoves = 4;
    const containerRef = useRef(null);

    const moveButton = () => {
        if (moveCount >= maxMoves) {
            // Stop moving
            return;
        }

        if (!containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        // Assuming button width/height approx 100px/50px or getting from ref if needed
        // For simplicity, we use the logic from before but adapted for React state

        const viewportWidth = window.innerWidth - 100;
        const viewportHeight = window.innerHeight - 50;

        const newX = Math.max(20, Math.random() * viewportWidth);
        const newY = Math.max(20, Math.random() * viewportHeight);

        setYesBtnStyle({
            position: 'fixed',
            left: `${newX}px`,
            top: `${newY}px`,
            cursor: moveCount === maxMoves - 1 ? 'pointer' : 'default' // Prepare cursor for next state
        });

        setMoveCount(prev => prev + 1);
    };

    const handleYesClick = (e) => {
        if (moveCount < maxMoves) {
            e.preventDefault();
            moveButton();
        } else {
            setShowSuccess(true);
        }
    };

    const handleNoClick = () => {
        alert("Nice try, but 'No' isn't an option! 😉");
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
                                onClick={handleYesClick}
                            >
                                Yes!
                            </button>
                            <button onClick={handleNoClick}>No</button>
                        </div>
                    </div>
                ) : (
                    <div className="game-container success-message">
                        <h2>Yay! I knew you'd say Yes! ❤️</h2>
                        <p>I love you!</p>
                        <div className="heart-animation">❤️</div>
                    </div>
                )}
                <Link to="/" className="back-link">← Back to Games</Link>
            </main>
        </div>
    );
};

export default ValentineGame;
