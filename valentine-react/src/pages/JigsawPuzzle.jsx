import React, { useState, useEffect } from 'react';
import { useSiteSettings } from '../context/SiteContext';
import { Link } from 'react-router-dom';
import '../styles/JigsawPuzzle.css';

const JigsawPuzzle = () => {
    const { settings } = useSiteSettings();
    const gridSize = 3;
    const totalPieces = gridSize * gridSize;

    const [pieces, setPieces] = useState([]);
    const [isSolved, setIsSolved] = useState(false);
    const [draggedPiece, setDraggedPiece] = useState(null);
    const [selectedPiece, setSelectedPiece] = useState(null);

    useEffect(() => {
        initGame();
    }, [settings.puzzleImage]); // Re-init if image changes

    const initGame = () => {
        const initialPieces = Array.from({ length: totalPieces }, (_, i) => ({
            id: i,
            currentPos: i
        }));

        const scrambled = [...initialPieces];
        for (let i = scrambled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const tempPos = scrambled[i].currentPos;
            scrambled[i].currentPos = scrambled[j].currentPos;
            scrambled[j].currentPos = tempPos;
        }

        setPieces(scrambled);
        setIsSolved(false);
    };

    const handleDragStart = (e, piece) => {
        setDraggedPiece(piece);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const handleDrop = (e, targetSlotIndex) => {
        e.preventDefault();
        if (!draggedPiece) return;

        const targetPiece = pieces.find(p => p.currentPos === targetSlotIndex);

        const newPieces = pieces.map(p => {
            if (p.id === draggedPiece.id) return { ...p, currentPos: targetSlotIndex };
            if (p.id === targetPiece.id) return { ...p, currentPos: draggedPiece.currentPos };
            return p;
        });

        setPieces(newPieces);
        checkWin(newPieces);
        setDraggedPiece(null);
    };

    const handlePieceClick = (piece) => {
        if (!selectedPiece) {
            setSelectedPiece(piece);
        } else {
            const newPieces = pieces.map(p => {
                if (p.id === selectedPiece.id) return { ...p, currentPos: piece.currentPos };
                if (p.id === piece.id) return { ...p, currentPos: selectedPiece.currentPos };
                return p;
            });
            setPieces(newPieces);
            checkWin(newPieces);
            setSelectedPiece(null);
        }
    };

    const checkWin = (currentPieces) => {
        const solved = currentPieces.every(p => p.id === p.currentPos);
        if (solved) setIsSolved(true);
    };

    const getBackgroundPos = (id) => {
        const row = Math.floor(id / gridSize);
        const col = id % gridSize;
        const percentage = 100 / (gridSize - 1);
        return `${col * percentage}% ${row * percentage}%`;
    };

    return (
        <div className="game-wrapper">
            <header>
                <h1>Love Puzzle 🧩</h1>
            </header>
            <main>
                <div className="game-container puzzle-container">
                    <p>Drag and drop (or click two pieces) to swap them!</p>

                    <div
                        className="puzzle-grid"
                        style={{
                            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                            width: '300px',
                            height: '300px'
                        }}
                    >
                        {Array.from({ length: totalPieces }).map((_, slotIndex) => {
                            const piece = pieces.find(p => p.currentPos === slotIndex);
                            if (!piece) return null;

                            const isSelected = selectedPiece && selectedPiece.id === piece.id;

                            return (
                                <div
                                    key={slotIndex}
                                    className={`puzzle-piece ${isSelected ? 'selected' : ''}`}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, piece)}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, slotIndex)}
                                    onClick={() => handlePieceClick(piece)}
                                    style={{
                                        backgroundImage: `url(${settings.puzzleImage})`,
                                        backgroundSize: '300px 300px',
                                        backgroundPosition: getBackgroundPos(piece.id)
                                    }}
                                >
                                </div>
                            );
                        })}
                    </div>

                    {isSolved && (
                        <div className="success-message">
                            <h2>Perfect Match! ❤️</h2>
                            <p>You put the pieces together!</p>
                        </div>
                    )}

                    <button onClick={initGame} style={{ marginTop: '20px' }}>Shuffle</button>

                </div>
                <Link to="/" className="back-link">← Back to Games</Link>
            </main>
        </div>
    );
};

export default JigsawPuzzle;
