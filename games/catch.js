document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreSpan = document.getElementById('score');
    const livesSpan = document.getElementById('lives');
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const gameOverDiv = document.getElementById('game-over');
    const finalScoreSpan = document.getElementById('final-score');
    const gameArea = document.getElementById('game-area');

    let score = 0;
    let lives = 5;
    let gameLoopId;
    let isPlaying = false;
    let hearts = [];
    let spawnRate = 60; // Frames between spawns
    let frameCount = 0;
    let speed = 2;

    // Set canvas size
    function resizeCanvas() {
        canvas.width = gameArea.clientWidth;
        canvas.height = gameArea.clientHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Basket
    const basket = {
        x: canvas.width / 2,
        y: canvas.height - 50,
        width: 60,
        height: 40,
        color: '#ff4d6d'
    };

    // Mouse control
    gameArea.addEventListener('mousemove', (e) => {
        if (!isPlaying) return;
        const rect = canvas.getBoundingClientRect();
        basket.x = e.clientX - rect.left - basket.width / 2;

        // Keep in bounds
        if (basket.x < 0) basket.x = 0;
        if (basket.x + basket.width > canvas.width) basket.x = canvas.width - basket.width;
    });

    // Touch control
    gameArea.addEventListener('touchmove', (e) => {
        if (!isPlaying) return;
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        basket.x = touch.clientX - rect.left - basket.width / 2;

        if (basket.x < 0) basket.x = 0;
        if (basket.x + basket.width > canvas.width) basket.x = canvas.width - basket.width;
    }, { passive: false });

    class Heart {
        constructor() {
            this.size = 20 + Math.random() * 10;
            this.x = Math.random() * (canvas.width - this.size);
            this.y = -this.size;
            this.speed = speed + Math.random() * 2;
            this.color = Math.random() > 0.8 ? '#ff0000' : '#ff4d6d'; // Occasional red heart
        }

        update() {
            this.y += this.speed;
        }

        draw() {
            ctx.font = `${this.size}px Arial`;
            ctx.fillStyle = this.color;
            ctx.fillText('❤️', this.x, this.y + this.size);
        }
    }

    function initGame() {
        score = 0;
        lives = 5;
        scoreSpan.textContent = score;
        livesSpan.textContent = lives;
        hearts = [];
        isPlaying = true;
        speed = 2;
        gameOverDiv.classList.add('hidden');
        startBtn.style.display = 'none';
        gameArea.style.cursor = 'none';

        // Reset basket
        basket.x = canvas.width / 2 - basket.width / 2;

        gameLoop();
    }

    function gameOver() {
        isPlaying = false;
        cancelAnimationFrame(gameLoopId);
        finalScoreSpan.textContent = score;
        gameOverDiv.classList.remove('hidden');
        gameArea.style.cursor = 'default';
        startBtn.style.display = 'inline-block';
        startBtn.textContent = "Restart";
    }

    function gameLoop() {
        if (!isPlaying) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Basket
        ctx.fillStyle = basket.color;
        // Simple basket shape (trapezoid)
        ctx.beginPath();
        ctx.moveTo(basket.x, basket.y);
        ctx.lineTo(basket.x + basket.width, basket.y);
        ctx.lineTo(basket.x + basket.width - 10, basket.y + basket.height);
        ctx.lineTo(basket.x + 10, basket.y + basket.height);
        ctx.closePath();
        ctx.fill();

        // Handle texture/emoji for basket?
        ctx.font = "30px Arial";
        ctx.fillText("🧺", basket.x + basket.width / 2 - 15, basket.y + 30);


        // Spawn Hearts
        frameCount++;
        if (frameCount % spawnRate === 0) {
            hearts.push(new Heart());
            // Increase difficulty
            if (score > 0 && score % 10 === 0) {
                speed += 0.2;
                if (spawnRate > 20) spawnRate -= 2;
            }
        }

        // Update and Draw Hearts
        for (let i = hearts.length - 1; i >= 0; i--) {
            const heart = hearts[i];
            heart.update();
            heart.draw();

            // Collision Detection
            if (
                heart.x < basket.x + basket.width &&
                heart.x + heart.size > basket.x &&
                heart.y + heart.size > basket.y &&
                heart.y < basket.y + basket.height
            ) {
                // Caught!
                score++;
                scoreSpan.textContent = score;
                hearts.splice(i, 1);
            } else if (heart.y > canvas.height) {
                // Missed
                lives--;
                livesSpan.textContent = lives;
                hearts.splice(i, 1);
                if (lives <= 0) {
                    gameOver();
                }
            }
        }

        gameLoopId = requestAnimationFrame(gameLoop);
    }

    startBtn.addEventListener('click', initGame);
    restartBtn.addEventListener('click', initGame);
});
