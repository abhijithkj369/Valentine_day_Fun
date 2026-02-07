import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MemoryMatch.css';

const MemoryMatch = () => {
    const emojis = ['❤️', '🌹', '💌', '🍫', '🧸', '💍', '🎀', '🧁', '🎁', '🔐', '🎵'];

    // Heart pattern layout (1 = card, 0 = spacer)
    const heartPattern = [
        0, 1, 1, 0, 1, 1,
        1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1,
        0, 1, 1, 1, 1, 0,
        0, 0, 1, 1, 0, 0
    ];

    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState(0);
    const [moves, setMoves] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const [winMessage, setWinMessage] = useState(false);

    useEffect(() => {
        initGame();
    }, []);

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const initGame = () => {
        const gameEmojis = [...emojis, ...emojis];
        const shuffledEmojis = shuffle([...gameEmojis]);

        // Map pattern to card objects
        let emojiIndex = 0;
        const newCards = heartPattern.map((isCard, index) => {
            if (isCard) {
                const card = {
                    id: index, // unique ID based on grid position
                    emoji: shuffledEmojis[emojiIndex],
                    isFlipped: false,
                    isMatched: false,
                    isSpacer: false
                };
                emojiIndex++;
                return card;
            } else {
                return { id: index, isSpacer: true };
            }
        });

        setCards(newCards);
        setFlippedCards([]);
        setMatchedPairs(0);
        setMoves(0);
        setIsLocked(false);
        setWinMessage(false);
    };

    const handleCardClick = (card) => {
        if (isLocked || card.isFlipped || card.isMatched || card.isSpacer) return;

        // Flip logic
        const updatedCards = cards.map(c =>
            c.id === card.id ? { ...c, isFlipped: true } : c
        );
        setCards(updatedCards);

        const newFlipped = [...flippedCards, card];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(prev => prev + 1);
            setIsLocked(true);
            checkForMatch(newFlipped, updatedCards);
        }
    };

    const checkForMatch = (currentFlipped, currentCards) => {
        const [card1, card2] = currentFlipped;

        if (card1.emoji === card2.emoji) {
            // Match found
            const matchedCards = currentCards.map(c =>
                (c.id === card1.id || c.id === card2.id)
                    ? { ...c, isMatched: true }
                    : c
            );
            setCards(matchedCards);
            setFlippedCards([]);
            setIsLocked(false);
            setMatchedPairs(prev => prev + 1);
        } else {
            // No match
            setTimeout(() => {
                const resetCards = currentCards.map(c =>
                    (c.id === card1.id || c.id === card2.id)
                        ? { ...c, isFlipped: false }
                        : c
                );
                setCards(resetCards);
                setFlippedCards([]);
                setIsLocked(false);
            }, 1000);
        }
    };

    useEffect(() => {
        if (matchedPairs === emojis.length && emojis.length > 0) {
            setTimeout(() => setWinMessage(true), 500);
        }
    }, [matchedPairs]);

    return (
        <div className="game-wrapper">
            <header>
                <h1>Memory Match 🎴</h1>
            </header>
            <main>
                <div className="game-info">
                    <span>Moves: <span>{moves}</span></span>
                    <button onClick={initGame}>Restart</button>
                </div>

                <div className="memory-grid">
                    {cards.map(card => (
                        card.isSpacer ? (
                            <div key={card.id} className="spacer"></div>
                        ) : (
                            <div
                                key={card.id}
                                className={`card ${card.isFlipped || card.isMatched ? 'flipped' : ''}`}
                                onClick={() => handleCardClick(card)}
                            >
                                <div className="card-face card-front">❓</div>
                                <div className="card-face card-back">{card.emoji}</div>
                            </div>
                        )
                    ))}
                </div>

                {winMessage && (
                    <div className="win-message">
                        <h2>You found all the matches! 🎉</h2>
                        <p>Great job!</p>
                    </div>
                )}
                <Link to="/" className="back-link">← Back to Games</Link>
            </main>
        </div>
    );
};

export default MemoryMatch;
