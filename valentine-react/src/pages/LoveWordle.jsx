import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoveWordle.css';

const LoveWordle = () => {
    const SECRET_word = "ADORE"; // You can change this to something specific
    const MAX_ATTEMPTS = 6;
    const WORD_LENGTH = 5;

    const [guesses, setGuesses] = useState(Array(MAX_ATTEMPTS).fill(''));
    const [currentAttempt, setCurrentAttempt] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [gameState, setGameState] = useState('playing'); // playing, won, lost

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (gameOver) return;

            const key = e.key.toUpperCase();

            if (key === 'ENTER') {
                if (currentGuess.length !== WORD_LENGTH) {
                    // Shake animation or alert?
                    return;
                }
                submitGuess();
            } else if (key === 'BACKSPACE') {
                setCurrentGuess(prev => prev.slice(0, -1));
            } else if (/^[A-Z]$/.test(key)) {
                if (currentGuess.length < WORD_LENGTH) {
                    setCurrentGuess(prev => prev + key);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentGuess, gameOver]);

    const submitGuess = () => {
        const newGuesses = [...guesses];
        newGuesses[currentAttempt] = currentGuess;
        setGuesses(newGuesses);

        if (currentGuess === SECRET_word) {
            setGameState('won');
            setGameOver(true);
        } else if (currentAttempt >= MAX_ATTEMPTS - 1) {
            setGameState('lost');
            setGameOver(true);
        } else {
            setCurrentAttempt(prev => prev + 1);
            setCurrentGuess('');
        }
    };

    const getLetterColor = (letter, index, attemptIndex) => {
        if (attemptIndex >= currentAttempt && gameState === 'playing') return 'empty';
        if (!guesses[attemptIndex]) return 'empty';

        const guessWord = guesses[attemptIndex];
        const secretLetter = SECRET_word[index];

        if (letter === secretLetter) return 'correct';
        if (SECRET_word.includes(letter)) return 'present';
        return 'absent';
    };

    // Virtual Keyboard
    const handleKeyClick = (key) => {
        if (gameOver) return;
        if (key === 'ENTER') {
            if (currentGuess.length === WORD_LENGTH) submitGuess();
        } else if (key === '⌫') {
            setCurrentGuess(prev => prev.slice(0, -1));
        } else {
            if (currentGuess.length < WORD_LENGTH) setCurrentGuess(prev => prev + key);
        }
    };

    const qwerty = [
        "QWERTYUIOP".split(""),
        "ASDFGHJKL".split(""),
        ["ENTER", ..."ZXCVBNM".split(""), "⌫"]
    ];

    return (
        <div className="game-wrapper">
            <header>
                <h1>Love Wordle 🤔</h1>
            </header>
            <main>
                <div className="game-container wordle-container">
                    <p>Guess the 5-letter secret word related to love!</p>

                    <div className="wordle-grid">
                        {guesses.map((guess, i) => (
                            <div key={i} className="wordle-row">
                                {Array(WORD_LENGTH).fill(0).map((_, j) => {
                                    const letter = i === currentAttempt ? currentGuess[j] : guess[j];
                                    const colorClass = i < currentAttempt || (gameState !== 'playing' && i === currentAttempt)
                                        ? getLetterColor(letter, j, i)
                                        : '';
                                    return (
                                        <div key={j} className={`wordle-cell ${colorClass}`}>
                                            {letter}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    {gameOver && (
                        <div className="wordle-message">
                            {gameState === 'won' ? (
                                <h2>You got it! The word was {SECRET_word} ❤️</h2>
                            ) : (
                                <h2>Nice try! The word was {SECRET_word} 🥺</h2>
                            )}
                            <button onClick={() => window.location.reload()}>Play Again</button>
                        </div>
                    )}

                    <div className="keyboard">
                        {qwerty.map((row, i) => (
                            <div key={i} className="keyboard-row">
                                {row.map(key => (
                                    <button
                                        key={key}
                                        className="key-btn"
                                        onClick={() => handleKeyClick(key)}
                                    >
                                        {key}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <Link to="/" className="back-link">← Back to Games</Link>
            </main>
        </div>
    );
};

export default LoveWordle;
