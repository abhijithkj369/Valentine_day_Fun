import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { Mail, ArrowRight } from 'lucide-react';
import '../styles/LoveLetter.css';

const LoveLetter = () => {
    const navigate = useNavigate();
    const correctSentence = ["I", "LOVE", "YOU", "SO", "MUCH"];
    const [words, setWords] = useState([]);
    const [isWon, setIsWon] = useState(false);
    const [draggedItem, setDraggedItem] = useState(null);

    useEffect(() => {
        // Shuffle words on mount
        const shuffled = [...correctSentence].sort(() => Math.random() - 0.5);
        setWords(shuffled);
    }, []);

    const handleDragStart = (e, index) => {
        setDraggedItem(index);
        e.dataTransfer.effectAllowed = "move";
        // e.target.style.opacity = '0.5'; // Optional visual feedback
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Necessary to allow dropping
    };

    const handleDrop = (e, index) => {
        e.preventDefault();

        if (draggedItem === null) return;

        const newWords = [...words];
        const draggedWord = newWords[draggedItem];

        // Remove dragged word
        newWords.splice(draggedItem, 1);
        // Insert at new position
        newWords.splice(index, 0, draggedWord);

        setWords(newWords);
        setDraggedItem(null);

        checkWin(newWords);
    };

    // Also support clicking to swap for mobile friendliness if drag is hard
    // (Simple version: click one, click another to swap)
    const [selectedIdx, setSelectedIdx] = useState(null);

    const handleClick = (index) => {
        if (isWon) return;

        if (selectedIdx === null) {
            setSelectedIdx(index);
        } else {
            const newWords = [...words];
            // Swap
            const temp = newWords[selectedIdx];
            newWords[selectedIdx] = newWords[index];
            newWords[index] = temp;

            setWords(newWords);
            setSelectedIdx(null);
            checkWin(newWords);
        }
    };

    const checkWin = (currentWords) => {
        if (JSON.stringify(currentWords) === JSON.stringify(correctSentence)) {
            setIsWon(true);
        }
    };

    return (
        <div className="love-letter-container">
            {isWon && <Confetti recycle={false} numberOfPieces={200} />}

            <div className={`game-content ${isWon ? 'sending' : ''}`}>
                <h2>💌 Love Scramble</h2>
                <p>Unscramble the message to send the letter!</p>
                <p className="hint">(Drag and drop or click to swap words)</p>

                <div className="word-container">
                    {words.map((word, index) => (
                        <div
                            key={index}
                            className={`word-tile ${selectedIdx === index ? 'selected' : ''}`}
                            draggable={!isWon}
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}
                            onClick={() => handleClick(index)}
                        >
                            {word}
                        </div>
                    ))}
                </div>
            </div>

            {isWon && (
                <div className="envelope-animation">
                    <div className="envelope">
                        <div className="front"></div>
                        <div className="card">I LOVE YOU SO MUCH</div>
                        <div className="back"></div>
                    </div>
                    <div className="flying-message">
                        Message Sent to My Heart! 💘
                    </div>
                </div>
            )}

            {isWon && (
                <button className="home-btn" onClick={() => navigate('/')}>
                    Back Home <ArrowRight size={20} />
                </button>
            )}

            <button className="back-button" onClick={() => navigate('/')}>
                Back
            </button>
        </div>
    );
};

export default LoveLetter;
