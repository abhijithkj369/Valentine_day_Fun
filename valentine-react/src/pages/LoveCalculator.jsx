import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoveCalculator.css';

const LoveCalculator = () => {
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [result, setResult] = useState(null);
    const [animatingPercentage, setAnimatingPercentage] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const calculateLove = () => {
        if (!name1.trim() || !name2.trim()) {
            alert("Please enter both names!");
            return;
        }

        // RIGGED: Always 1000%
        const percentage = 1000;
        const message = "Error: Too much love to calculate! 💥❤️";

        setResult({ percentage, message });
        setIsAnimating(true);
        setAnimatingPercentage(0);
    };

    useEffect(() => {
        if (isAnimating && result) {
            if (animatingPercentage < result.percentage) {
                const timer = setTimeout(() => {
                    // Speed up the count for 1000%
                    setAnimatingPercentage(prev => Math.min(prev + 10, result.percentage));
                }, 10);
                return () => clearTimeout(timer);
            } else {
                setIsAnimating(false);
            }
        }
    }, [isAnimating, animatingPercentage, result]);

    return (
        <div className="game-wrapper">
            <header>
                <h1>Love Calculator 💘</h1>
            </header>
            <main>
                <div className="game-container">
                    <p>Enter your names to see your compatibility!</p>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={name1}
                            onChange={(e) => setName1(e.target.value)}
                        />
                        <span className="heart-icon">❤️</span>
                        <input
                            type="text"
                            placeholder="Crush's Name"
                            value={name2}
                            onChange={(e) => setName2(e.target.value)}
                        />
                    </div>
                    <button onClick={calculateLove}>Calculate Love</button>

                    {result && (
                        <div className="result-area">
                            <div className="percentage">{animatingPercentage}%</div>
                            {!isAnimating && <p className="message">{result.message}</p>}
                        </div>
                    )}
                </div>
                <Link to="/" className="back-link">← Back to Games</Link>
            </main>
        </div>
    );
};

export default LoveCalculator;
