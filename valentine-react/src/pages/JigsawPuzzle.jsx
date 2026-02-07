import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/JigsawPuzzle.css';

const JigsawPuzzle = () => {
    // Default image - can be replaced with a user upload or specific URL
    // Using a placeholder for now
    const [imageSrc, setImageSrc] = useState('https://picsum.photos/400/400');
    const gridSize = 3; // 3x3 grid
    const totalPieces = gridSize * gridSize;

    // Each piece has an id (original position) and currentPos (current grid index)
    const [pieces, setPieces] = useState([]);
    const [isSolved, setIsSolved] = useState(false);
    const [draggedPiece, setDraggedPiece] = useState(null);

    useEffect(() => {
        initGame();
    }, []);

    const initGame = () => {
        // Create pieces 0 to 8
        const initialPieces = Array.from({ length: totalPieces }, (_, i) => ({
            id: i,
            currentPos: i
        }));

        // Scramble
        const scrambled = [...initialPieces];
        // Fisher-Yates shuffle
        for (let i = scrambled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // Swap currentPos values, but keep objects intact to track IDs
            const tempPos = scrambled[i].currentPos;
            scrambled[i].currentPos = scrambled[j].currentPos;
            scrambled[j].currentPos = tempPos;
        }

        // Sort by currentPos for rendering order
        // Actually, we render based on grid slots 0-8. 
        // We need to find which piece is in slot 0, slot 1, etc.
        setPieces(scrambled);
        setIsSolved(false);
    };

    const handleDragStart = (e, piece) => {
        setDraggedPiece(piece);
        e.dataTransfer.effectAllowed = "move";
        // e.dataTransfer.setData("text/plain", piece.id); // Not strictly needed with state
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const handleDrop = (e, targetSlotIndex) => {
        e.preventDefault();

        if (!draggedPiece) return;

        // Find piece currently in the target slot
        const targetPiece = pieces.find(p => p.currentPos === targetSlotIndex);

        // Swap positions
        const newPieces = pieces.map(p => {
            if (p.id === draggedPiece.id) return { ...p, currentPos: targetSlotIndex };
            if (p.id === targetPiece.id) return { ...p, currentPos: draggedPiece.currentPos };
            return p;
        });

        setPieces(newPieces);
        checkWin(newPieces);
        setDraggedPiece(null);
    };

    // Touch support requires more complex event handling or a library like dnd-kit.
    // For simplicity in a single file without extra libs, we can implement click-to-swap.
    const [selectedPiece, setSelectedPiece] = useState(null);

    const handlePieceClick = (piece) => {
        if (!selectedPiece) {
            setSelectedPiece(piece);
        } else {
            // Swap selectedPiece and clicked piece
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

    // Calculate background position for each piece based on its ID (original pos)
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
                    <p>Drag and drop (or click two pieces) to swap them until the picture is complete!</p>

                    <div
                        className="puzzle-grid"
                        style={{
                            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                            width: '300px',
                            height: '300px'
                        }}
                    >
                        {/* Render 9 slots. In each slot, find the piece that is currently there. */}
                        {Array.from({ length: totalPieces }).map((_, slotIndex) => {
                            const piece = pieces.find(p => p.currentPos === slotIndex);
                            if (!piece) return null;

                            const isSelected = selectedPiece && selectedPiece.id === piece.id;

                            return (
                                <div
                                    key={slotIndex} // Key is slot index to keep grid stable
                                    className={`puzzle-piece ${isSelected ? 'selected' : ''}`}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, piece)}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, slotIndex)}
                                    onClick={() => handlePieceClick(piece)}
                                    style={{
                                        backgroundImage: `url(${imageSrc})`,
                                        backgroundSize: '300px 300px',
                                        backgroundPosition: getBackgroundPos(piece.id)
                                    }}
                                >
                                    {/* Debug: {piece.id} */}
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

                    {/* Optional image uploader could go here */}
                </div>
                <Link to="/" className="back-link">← Back to Games</Link>
            </main>
        </div>
    );
};

export default JigsawPuzzle;
