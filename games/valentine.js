document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const question = document.getElementById('question');
    const buttonsContainer = document.getElementById('buttons-container');
    const successMessage = document.getElementById('success-message');

    let moveCount = 0;
    const maxMoves = 4; // Moves 3-4 times then stops

    // Initial positioning to ensure it starts correctly if we switch to absolute
    // For now, let's keep it simple. When hover starts, we make it absolute if not already.

    const moveButton = () => {
        if (moveCount >= maxMoves) {
            // Stop moving, reset cursor to pointer to indicate it's clickable now
            yesBtn.style.cursor = 'pointer';
            return;
        }

        const containerRect = document.querySelector('main').getBoundingClientRect();
        const btnRect = yesBtn.getBoundingClientRect();

        // Calculate valid range within the main container
        // We want to keep the button visible
        const maxX = containerRect.width - btnRect.width;
        const maxY = containerRect.height - btnRect.height;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        // Apply new position
        // We need to set position fixed or absolute relative to the main container
        // Let's use fixed for "running away" effect across the screen or absolute to the game container
        // The prompt says "moves... and stay".
        
        // Let's use absolute positioning relative to the 'main' or body to allow more freedom?
        // Actually, let's keep it within the game card for usability, or maybe the whole screen?
        // Let's stick to the card first, but if it's too small, the effect is lost.
        // Let's make it relative to the window or a larger container if we can.
        // For simplicity: Update the button to be 'fixed' or absolute to body to run wildly!
        
        // Re-implementing logic:
        // 1. On first hover, change position to absolute if not already.
        // 2. Calculate random pos.
        
        // Let's use fixed to allow it to go anywhere on screen (more fun) but stay within viewport.
        const viewportWidth = window.innerWidth - btnRect.width - 50; // -50 for padding
        const viewportHeight = window.innerHeight - btnRect.height - 50;

        const newX = Math.max(20, Math.random() * viewportWidth);
        const newY = Math.max(20, Math.random() * viewportHeight);

        yesBtn.style.position = 'fixed'; // Use fixed to escape the container
        yesBtn.style.left = `${newX}px`;
        yesBtn.style.top = `${newY}px`;
        
        moveCount++;
    };

    yesBtn.addEventListener('mouseover', moveButton);
    yesBtn.addEventListener('click', (e) => {
        if (moveCount < maxMoves) {
            // If they manage to click it before it stops (fast clickers), treat it as a move trigger?
            // Or just let them win? 
            // The prompt says: "moves 3 to 4 times ans stay and we click yes"
            // So we should enforce the movement count?
            e.preventDefault(); // changing focus might trigger click
            moveButton();
        } else {
            // Success!
            showSuccess();
        }
    });

    const showSuccess = () => {
        question.style.display = 'none';
        buttonsContainer.style.display = 'none';
        successMessage.classList.remove('hidden');
        
        // Create confetti or hearts?
        createHearts();
    };
    
    noBtn.addEventListener('click', () => {
        alert("Nice try, but 'No' isn't an option! 😉");
    });

    // Optional: Make 'No' run away too? Or just alert?
    // User didn't specify, but often 'No' swaps with 'Yes'.
    // We'll stick to the "No isn't an option" alert or shrinking it.
    
    function createHearts() {
        // Simple particle effect
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart-animation');
            heart.innerHTML = '❤️';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = Math.random() * 100 + 'vh';
            heart.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
            document.body.appendChild(heart);
        }
    }
});
