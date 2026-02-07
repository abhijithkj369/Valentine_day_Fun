document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    const name1Input = document.getElementById('name1');
    const name2Input = document.getElementById('name2');
    const resultDiv = document.getElementById('result');
    const percentageDiv = document.querySelector('.percentage');
    const messageDiv = document.querySelector('.message');

    calculateBtn.addEventListener('click', () => {
        const name1 = name1Input.value.trim().toLowerCase();
        const name2 = name2Input.value.trim().toLowerCase();

        if (!name1 || !name2) {
            alert("Please enter both names!");
            return;
        }

        // Simple deterministic hash based percentage
        const combined = name1 + name2;
        let hash = 0;
        for (let i = 0; i < combined.length; i++) {
            hash = combined.charCodeAt(i) + ((hash << 5) - hash);
        }

        let percentage = Math.abs(hash % 101); // 0 to 100

        // Let's bias it a little towards high scores for fun
        if (percentage < 30) percentage += 30;

        resultDiv.classList.remove('hidden');

        // Animate the counter
        let current = 0;
        const interval = setInterval(() => {
            if (current >= percentage) {
                clearInterval(interval);
                showFinalMessage(percentage);
            } else {
                current++;
                percentageDiv.textContent = current + "%";
            }
        }, 20);
    });

    function showFinalMessage(percentage) {
        let message = "";
        if (percentage > 90) {
            message = "Matches made in heaven! 👰🤵";
        } else if (percentage > 70) {
            message = "Looking good! Love is in the air! 💕";
        } else if (percentage > 50) {
            message = "There's a chance! Keep trying! 😉";
        } else {
            message = "Maybe best as friends? 😅";
        }
        messageDiv.textContent = message;
    }
});
