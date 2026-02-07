import React, { useState } from 'react';
import { useSiteSettings } from '../context/SiteContext';
import { Link } from 'react-router-dom';
import '../styles/HiddenHearts.css';

const HiddenHearts = () => {
    const { settings } = useSiteSettings();
    const [hearts, setHearts] = useState([
        { id: 1, top: '15%', left: '10%', found: false },
        { id: 2, top: '45%', left: '80%', found: false },
        { id: 3, top: '70%', left: '30%', found: false },
        { id: 4, top: '25%', left: '60%', found: false },
        { id: 5, top: '85%', left: '90%', found: false },
    ]);

    const [foundCount, setFoundCount] = useState(0);

    const handleHeartClick = (id) => {
        const heart = hearts.find(h => h.id === id);
        if (heart && !heart.found) {
            const newHearts = hearts.map(h =>
                h.id === id ? { ...h, found: true } : h
            );
            setHearts(newHearts);
            setFoundCount(prev => prev + 1);
        }
    };

    return (
        <div className="game-wrapper full-screen-wrapper">
            <header className="overlay-header">
                <h1>Find the Hidden Hearts 🕵️‍♀️</h1>
                <p>Found: {foundCount} / {hearts.length}</p>
            </header>

            <main className="game-container hidden-hearts-container">
                <div className="image-scan-area">
                    <img
                        src={settings.hiddenHeartsImage}
                        alt="Background"
                        className="search-bg"
                    />

                    {hearts.map(heart => (
                        <div
                            key={heart.id}
                            className={`hidden-heart ${heart.found ? 'found' : ''}`}
                            style={{ top: heart.top, left: heart.left }}
                            onClick={() => handleHeartClick(heart.id)}
                        >
                            ❤️
                        </div>
                    ))}
                </div>

                {foundCount === hearts.length && (
                    <div className="victory-overlay">
                        <div className="victory-card">
                            <h2>You found them all! 🎉</h2>
                            <p>You have an eagle eye for love!</p>
                            <Link to="/">
                                <button>Back to Games</button>
                            </Link>
                        </div>
                    </div>
                )}
            </main>

            <Link to="/" className="back-link overlay-link">← Back</Link>
        </div>
    );
};

export default HiddenHearts;
