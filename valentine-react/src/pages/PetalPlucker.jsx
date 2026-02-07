import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import Confetti from 'react-confetti';
import '../styles/PetalPlucker.css';

const PetalPlucker = () => {
    const navigate = useNavigate();
    // Always use an ODD number to ensure it ends on "He loves me"
    const TOTAL_PETALS = 13;

    const [petals, setPetals] = useState([]);
    const [pluckCount, setPluckCount] = useState(0);
    const [message, setMessage] = useState("Click a petal...");
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        // Generate petals with rotation
        console.log("PetalPlucker mounted, generating petals..."); // Debug log
        const newPetals = Array.from({ length: TOTAL_PETALS }, (_, i) => ({
            id: i,
            rotation: (360 / TOTAL_PETALS) * i,
            isPlucked: false
        }));
        setPetals(newPetals);
        setPluckCount(0);
        setMessage("Click a petal to find out the truth...");
        setGameOver(false);
    }, []);

    const handlePluck = (index) => {
        if (petals[index].isPlucked || gameOver) return;

        const newPetals = [...petals];
        newPetals[index].isPlucked = true;
        setPetals(newPetals);

        const newCount = pluckCount + 1;
        setPluckCount(newCount);

        // Logic: Odd pluck = Loves me, Even pluck = Loves me not
        // Since TOTAL is Odd, the last one (TOTAL) will be Odd -> "He Loves Me"
        if (newCount === TOTAL_PETALS) {
            setMessage("HE LOVES ME! ❤️");
            setGameOver(true);
        } else if (newCount % 2 !== 0) {
            setMessage("He loves me... 🥰");
        } else {
            setMessage("He loves me not... 🥀");
        }
    };

    const resetGame = () => {
        const newPetals = petals.map(p => ({ ...p, isPlucked: false }));
        setPetals(newPetals);
        setPluckCount(0);
        setMessage("Click a petal...");
        setGameOver(false);
    };

    return (
        <div className="petal-container" style={{ minHeight: '100vh', background: 'pink', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {/* Commented out Confetti to debug blank screen issue
            {gameOver && <Confetti recycle={false} numberOfPieces={200} />}
            */}

            <button className="back-btn" onClick={() => navigate('/')} style={{ position: 'absolute', top: 20, left: 20, zIndex: 100 }}>
                <ArrowLeft size={24} /> Back
            </button>

            <h1 className="game-title" style={{ zIndex: 10 }}>{message}</h1>

            <div className="flower-wrapper" style={{ position: 'relative', width: 300, height: 300 }}>
                <div className="flower-center">
                    <div className="face">😊</div>
                </div>
                {petals.map((petal, index) => (
                    <div
                        key={petal.id}
                        className={`petal ${petal.isPlucked ? 'falling' : ''}`}
                        style={{
                            transform: `rotate(${petal.rotation}deg)`,
                            position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none'
                        }}
                        onClick={() => handlePluck(index)}
                    >
                        <div className="petal-shape" style={{ pointerEvents: 'auto' }} />
                    </div>
                ))}
                <div className="stem"></div>
            </div>

            {gameOver && (
                <button className="reset-btn" onClick={resetGame} style={{ marginTop: 50, zIndex: 100 }}>
                    <RefreshCw size={20} /> Play Again
                </button>
            )}
        </div>
    );
};

export default PetalPlucker;
