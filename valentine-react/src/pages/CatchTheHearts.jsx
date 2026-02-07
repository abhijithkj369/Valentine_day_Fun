import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/CatchTheHearts.css';

const CatchTheHearts = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(5);
    const [gameOver, setGameOver] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [finalScore, setFinalScore] = useState(0);

    // Game state refs to access inside loop without closure staleness
    const gameState = useRef({
        score: 0,
        lives: 5,
        hearts: [],
        basket: { x: 0, y: 0, width: 60, height: 40 },
        isPlaying: false,
        frameCount: 0,
        speed: 2,
        spawnRate: 60
    });

    const requestRef = useRef();

    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current && containerRef.current) {
                const { clientWidth, clientHeight } = containerRef.current;
                canvasRef.current.width = clientWidth;
                canvasRef.current.height = clientHeight;
                // Reset basket Y
                gameState.current.basket.y = clientHeight - 50;
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const startGame = () => {
        if (!canvasRef.current) return;

        gameState.current = {
            score: 0,
            lives: 5,
            hearts: [],
            basket: {
                x: canvasRef.current.width / 2 - 30,
                y: canvasRef.current.height - 50,
                width: 60,
                height: 40
            },
            isPlaying: true,
            frameCount: 0,
            speed: 2,
            spawnRate: 60
        };

        setScore(0);
        setLives(5);
        setGameOver(false);
        setIsPlaying(true);

        requestRef.current = requestAnimationFrame(gameLoop);
    };

    const stopGame = () => {
        gameState.current.isPlaying = false;
        setIsPlaying(false);
        setGameOver(true);
        setFinalScore(gameState.current.score);
        cancelAnimationFrame(requestRef.current);
    };

    const handleMouseMove = (e) => {
        if (!gameState.current.isPlaying || !canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const basket = gameState.current.basket;
        basket.x = e.clientX - rect.left - basket.width / 2;

        // Bounds
        if (basket.x < 0) basket.x = 0;
        if (basket.x + basket.width > canvasRef.current.width) basket.x = canvasRef.current.width - basket.width;
    };

    const handleTouchMove = (e) => {
        if (!gameState.current.isPlaying || !canvasRef.current) return;
        // e.preventDefault(); // Handled by CSS touch-action or passive listener if needed
        const rect = canvasRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        const basket = gameState.current.basket;
        basket.x = touch.clientX - rect.left - basket.width / 2;

        if (basket.x < 0) basket.x = 0;
        if (basket.x + basket.width > canvasRef.current.width) basket.x = canvasRef.current.width - basket.width;
    };

    const gameLoop = () => {
        if (!gameState.current.isPlaying || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const state = gameState.current;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Basket
        ctx.fillStyle = '#ff4d6d';
        ctx.beginPath();
        ctx.moveTo(state.basket.x, state.basket.y);
        ctx.lineTo(state.basket.x + state.basket.width, state.basket.y);
        ctx.lineTo(state.basket.x + state.basket.width - 10, state.basket.y + state.basket.height);
        ctx.lineTo(state.basket.x + 10, state.basket.y + state.basket.height);
        ctx.closePath();
        ctx.fill();

        ctx.font = "30px Arial";
        ctx.fillText("🧺", state.basket.x + state.basket.width / 2 - 15, state.basket.y + 30);

        // Spawn Hearts
        state.frameCount++;
        if (state.frameCount % state.spawnRate === 0) {
            state.hearts.push({
                size: 20 + Math.random() * 10,
                x: Math.random() * (canvas.width - 30),
                y: -30,
                speed: state.speed + Math.random() * 2,
                color: Math.random() > 0.8 ? '#ff0000' : '#ff4d6d'
            });

            // Difficulty
            if (state.score > 0 && state.score % 10 === 0 && state.frameCount % state.spawnRate === 0) {
                // Only trigger once per milestone approx
            }
        }

        // Increase difficulty cleanly
        if (state.score > 0 && state.score % 5 === 0) {
            // Logic moved to update loop to avoid spamming
        }


        // Update Hearts
        for (let i = state.hearts.length - 1; i >= 0; i--) {
            const heart = state.hearts[i];
            heart.y += heart.speed;

            ctx.font = `${heart.size}px Arial`;
            ctx.fillStyle = heart.color;
            ctx.fillText('❤️', heart.x, heart.y + heart.size);

            // Collision
            if (
                heart.x < state.basket.x + state.basket.width &&
                heart.x + heart.size > state.basket.x &&
                heart.y + heart.size > state.basket.y &&
                heart.y < state.basket.y + state.basket.height
            ) {
                state.score++;
                setScore(state.score);
                state.hearts.splice(i, 1);

                // Increase speed every 10 points
                if (state.score % 10 === 0) {
                    state.speed = Math.min(state.speed + 0.5, 8);
                    state.spawnRate = Math.max(state.spawnRate - 5, 20);
                }

            } else if (heart.y > canvas.height) {
                state.lives--;
                setLives(state.lives);
                state.hearts.splice(i, 1);
                if (state.lives <= 0) {
                    stopGame();
                    return;
                }
            }
        }

        requestRef.current = requestAnimationFrame(gameLoop);
    };

    // Cleanup
    useEffect(() => {
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    return (
        <div className="game-wrapper">
            <header>
                <h1>Catch the Hearts 🧺</h1>
            </header>
            <main>
                <div className="game-info-bar">
                    <span>Score: {score}</span>
                    <span>Lives: {lives}</span>
                    {!isPlaying && !gameOver && <button onClick={startGame}>Start Game</button>}
                </div>

                <div
                    id="game-area"
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleTouchMove}
                >
                    <canvas ref={canvasRef} />

                    {gameOver && (
                        <div className="game-over-overlay">
                            <h2>Game Over! 💔</h2>
                            <p>Final Score: {finalScore}</p>
                            <button onClick={startGame}>Play Again</button>
                        </div>
                    )}
                </div>

                <Link to="/" className="back-link">← Back to Games</Link>
            </main>
        </div>
    );
};

export default CatchTheHearts;
