document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const movesSpan = document.getElementById('moves');
    const restartBtn = document.getElementById('restart-btn');
    const winMessage = document.getElementById('win-message');

    const emojis = ['❤️', '🌹', '💌', '🍫', '🧸', '💍', '🎀', '🧁', '🎁', '🔐', '🎵'];
    // 11 pairs = 22 cards.
    // 6x5 grid = 30 cells.
    // Pattern (1=Card, 0=Space):
    // 0 1 1 0 1 1 (Row 1: 4 cards)
    // 1 1 1 1 1 1 (Row 2: 6 cards)
    // 1 1 1 1 1 1 (Row 3: 6 cards)
    // 0 1 1 1 1 0 (Row 4: 4 cards)
    // 0 0 1 1 0 0 (Row 5: 2 cards)

    // Total 1s = 4+6+6+4+2 = 22. Perfect.

    const heartPattern = [
        0, 1, 1, 0, 1, 1,
        1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1,
        0, 1, 1, 1, 1, 0,
        0, 0, 1, 1, 0, 0
    ];

    let cards = [...emojis, ...emojis];

    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let isLocked = false;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function initGame() {
        grid.innerHTML = '';
        flippedCards = [];
        matchedPairs = 0;
        moves = 0;
        movesSpan.textContent = moves;
        winMessage.classList.add('hidden');
        isLocked = false;

        const shuffledCards = shuffle([...cards]);
        let cardIndex = 0;

        heartPattern.forEach(isCard => {
            if (isCard) {
                const emoji = shuffledCards[cardIndex];
                cardIndex++;

                const cardElement = document.createElement('div');
                cardElement.classList.add('card');

                const frontFace = document.createElement('div');
                frontFace.classList.add('card-face', 'card-front');
                frontFace.innerHTML = '❓';

                const backFace = document.createElement('div');
                backFace.classList.add('card-face', 'card-back');
                backFace.innerHTML = emoji;

                cardElement.appendChild(frontFace);
                cardElement.appendChild(backFace);

                cardElement.addEventListener('click', () => flipCard(cardElement, emoji));

                grid.appendChild(cardElement);
            } else {
                const spacer = document.createElement('div');
                spacer.classList.add('spacer');
                grid.appendChild(spacer);
            }
        });
    }

    function flipCard(card, emoji) {
        if (isLocked) return;
        if (card.classList.contains('flipped')) return;

        card.classList.add('flipped');
        flippedCards.push({ element: card, emoji: emoji });

        if (flippedCards.length === 2) {
            moves++;
            movesSpan.textContent = moves;
            checkForMatch();
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;

        if (card1.emoji === card2.emoji) {
            // Match!
            matchedPairs++;
            flippedCards = [];
            if (matchedPairs === emojis.length) {
                setTimeout(() => {
                    winMessage.classList.remove('hidden');
                }, 500);
            }
        } else {
            // No match
            isLocked = true;
            setTimeout(() => {
                card1.element.classList.remove('flipped');
                card2.element.classList.remove('flipped');
                flippedCards = [];
                isLocked = false;
            }, 1000);
        }
    }

    restartBtn.addEventListener('click', initGame);

    initGame();
});
