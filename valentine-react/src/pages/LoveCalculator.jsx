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

        const n1 = name1.trim().toLowerCase();
        const n2 = name2.trim().toLowerCase();

        // Simple deterministic hash based percentage
        const combined = n1 + n2;
        let hash = 0;
        for (let i = 0; i < combined.length; i++) {
            hash = combined.charCodeAt(i) + ((hash << 5) - hash);
        }

        let percentage = Math.abs(hash % 101); // 0 to 100
        if (percentage < 30) percentage += 30; // Bias towards love

        setResult({ percentage, message: getMessage(percentage) });
        setIsAnimating(true);
        setAnimatingPercentage(0);
    };

    const getMessage = (percentage) => {
        if (percentage > 90) return "Matches made in heaven! 👰🤵";
        if (percentage > 70) return "Looking good! Love is in the air! 💕";
        if (percentage > 50) return "There's a chance! Keep trying! 😉";
        return "Maybe best as friends? 😅";
    };

    useEffect(() => {
        if (isAnimating && result) {
            if (animatingPercentage < result.percentage) {
                const timer = setTimeout(() => {
                    setAnimatingPercentage(prev => Math.min(prev + 1, result.percentage));
                }, 20);
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
