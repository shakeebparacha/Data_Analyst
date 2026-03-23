let selectedAmountText = '';
let selectedAmountValue = '';

function scrollToEidi() {
    document.getElementById('eidi-section').scrollIntoView({ behavior: 'smooth' });
}

// Open Modal and Setup Confirmation
function selectEidi(amountText, amountValue) {
    selectedAmountText = amountText;
    selectedAmountValue = amountValue;

    let message = '';
    if (amountValue === 5000) {
        message = `Are you SURE you want 5000 PKR? My wallet is shaking right now! 🥶 But fine, I'll send the ${amountValue} PKR to your account, inshaAllah! 😂`;
    } else if (amountValue === 10) {
        message = `Wow, 10 PKR? You are so humble! I’ll send the 10 PKR to your account right away, inshaAllah! 😂`;
    } else {
        message = `Are you sure you want this Eidi? I’ll send the exact amount (${amountValue} PKR) to your account, inshaAllah! 😊`;
    }
    document.getElementById('confirm-message').textContent = message;

    // Show confirm content, hide result content
    document.getElementById('confirm-content').style.display = 'block';
    document.getElementById('result-content').classList.remove('active');

    // Show modal
    document.getElementById('modal-overlay').classList.add('active');
}

// Close Modal
function closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');

    // Allow time for animation to finish before resetting display
    setTimeout(() => {
        document.getElementById('confirm-content').style.display = 'block';
        document.getElementById('result-content').classList.remove('active');
    }, 300);
}

// Confirm Selection and Show WhatsApp Link
function confirmEidi() {
    // Transition from Confirmation to Result
    document.getElementById('confirm-content').style.display = 'none';
    document.getElementById('result-content').classList.add('active');

    // Prepare WhatsApp link
    // Given WhatsApp number: +923245514735
    const phoneNumber = "923245514735";

    let textMessage = `I chose Eidi amount ${selectedAmountText} on your website.`;
    if (selectedAmountValue === 5000) {
        textMessage = `I chose the 5000 PKR Eidi! Please have your wallet ready! 💸🤣`;
    } else if (selectedAmountValue === 10) {
        textMessage = `I chose the humblest 10 PKR Eidi! Can't wait for my crisp note! 😄`;
    }

    const encodedText = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

    document.getElementById('whatsapp-link').href = whatsappUrl;
}

// Close on background click
document.getElementById('modal-overlay').addEventListener('click', function (e) {
    if (e.target === this) {
        closeModal();
    }
});

// Funny runaway button for all buttons except 10 PKR
document.addEventListener("DOMContentLoaded", function () {
    const runawayButtons = document.querySelectorAll('.btn-runaway');

    runawayButtons.forEach(btn => {
        let interactionCount = 0;
        const originalText = btn.textContent;

        const jumpAway = function (e) {
            interactionCount++;

            if (interactionCount > 10) {
                // After 10 times, let her click it without jumping
                this.style.transform = "translate(0, 0) scale(1)";
                this.textContent = originalText;
                return;
            }

            // Calculate a random displacement widely across the screen
            const maxX = window.innerWidth * 0.8; // 80% of screen width
            const maxY = window.innerHeight * 0.8; // 80% of screen height
            
            const x = (Math.random() - 0.5) * maxX; // random between -40% and 40% of screen width
            const y = (Math.random() - 0.5) * maxY; // random between -40% and 40% of screen height

            this.style.transform = `translate(${x}px, ${y}px) scale(0.6)`;

            const funnyMessages = [
                "Catch me! 🏃‍♂️",
                "Too slow! 😂",
                "Not so easy! 😜",
                "Try again! 🤪",
                "Oops! Missed! 💨",
                "My wallet says no! 🛑",
                "Not happening! 🙅‍♂️"
            ];
            this.textContent = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];

            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
        };

        btn.addEventListener('mouseenter', jumpAway);
        btn.addEventListener('click', jumpAway);

        // Mobile support
        btn.addEventListener('touchstart', function (e) {
            if (interactionCount <= 10) {
                e.preventDefault();
            }
            jumpAway.call(this, e);
        });
    });
});
