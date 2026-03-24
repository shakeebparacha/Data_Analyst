// Typewriter Effect Variables
const titles = [
    "I hope you enjoy your Eidi! ✨",
    "Pick any amount you'd like... 🎁",
    "Wait... maybe not the 5000 one! 💸 😂",
    "Just kidding... choose whatever! 😄",
    "Prepare for some funny buttons... 🏃‍♂️"
];
let titleIdx = 0;
let charIdx = 0;
let deleting = false;

function typeEffect() {
    const typedEl = document.getElementById("typed-text");
    if (!typedEl) return;
    
    const current = titles[titleIdx];
    if (!deleting) {
        typedEl.textContent = current.slice(0, ++charIdx);
        if (charIdx === current.length) {
            deleting = true;
            setTimeout(typeEffect, 1800);
            return;
        }
    } else {
        typedEl.textContent = current.slice(0, --charIdx);
        if (charIdx === 0) {
            deleting = false;
            titleIdx = (titleIdx + 1) % titles.length;
        }
    }
    setTimeout(typeEffect, deleting ? 60 : 90);
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeEffect, 500);
});

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
        let hasCloned = false;

        const jumpAway = function (e) {
            interactionCount++;

            if (interactionCount > 10) {
                // After 10 times, let her click it without jumping
                this.style.transform = "translate(0, 0)";
                this.textContent = originalText;
                return;
            }

            // Calculate a random displacement widely across the screen
            const maxX = window.innerWidth * 0.8; // 80% of screen width
            const maxY = window.innerHeight * 0.8; // 80% of screen height

            const x = (Math.random() - 0.5) * maxX; // random between -40% and 40% of screen width
            const y = (Math.random() - 0.5) * maxY; // random between -40% and 40% of screen height

            // Keeping the original size, just jumping
            this.style.transform = `translate(${x}px, ${y}px)`;

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

            // Special case explosion for 5000 PKR button
            if (this.id === 'btn-5000' && !hasCloned) {
                hasCloned = true;
                this.style.position = 'relative'; // Ensure proper relative context
                this.style.zIndex = '100';

                // Spawn 4 clones
                for (let i = 0; i < 4; i++) {
                    createFakeButton(this);
                }

                // Add continuous roaming for the real 5000 button too
                let continuousJumps = 0;
                let roamInterval = setInterval(() => {
                    continuousJumps++;
                    if (continuousJumps > 15 || interactionCount > 10) {
                        clearInterval(roamInterval);
                        this.style.transform = "translate(0, 0)";
                        this.textContent = originalText;
                    } else {
                        const nx = (Math.random() - 0.5) * window.innerWidth * 0.8;
                        const ny = (Math.random() - 0.5) * window.innerHeight * 0.8;
                        this.style.transform = `translate(${nx}px, ${ny}px)`;
                        this.textContent = originalText; // Keep making it look like the real option
                    }
                }, 800);
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
        }, { passive: false });
    });

    function createFakeButton(originalBtn) {
        const clone = originalBtn.cloneNode(true);
        clone.id = ""; // Remove ID so it's not detected as the real one
        
        const rect = originalBtn.getBoundingClientRect();
        clone.style.position = 'fixed';
        clone.style.top = rect.top + 'px';
        clone.style.left = rect.left + 'px';
        clone.style.transform = 'translate(0px, 0px)';
        clone.style.zIndex = "99";
        clone.style.margin = "0";
        document.body.appendChild(clone);

        // Make clone completely fake on click
        clone.removeAttribute('onclick');
        clone.onclick = function(e) {
            e.preventDefault();
            alert("Haha! This is a fake. The real one is hiding! 😂");
        };

        let jumps = 0;
        let roamInterval = setInterval(() => {
            jumps++;
            if (jumps > 15) {
                clearInterval(roamInterval);
                clone.style.transform = "translate(0, 0)";
                clone.textContent = "Fake 5000 PKR 😂";
            } else {
                const nx = (Math.random() - 0.5) * window.innerWidth * 0.8;
                const ny = (Math.random() - 0.5) * window.innerHeight * 0.8;
                clone.style.transform = `translate(${nx}px, ${ny}px)`;
                clone.textContent = originalBtn.textContent; // Masquerade as the option
            }
        }, 800);
        
        // Initial scatter immediately
        setTimeout(() => {
            const nx = (Math.random() - 0.5) * window.innerWidth * 0.8;
            const ny = (Math.random() - 0.5) * window.innerHeight * 0.8;
            clone.style.transform = `translate(${nx}px, ${ny}px)`;
        }, 50);

        // Jump away on hover too
        clone.addEventListener('mouseenter', function(e) {
            const nx = (Math.random() - 0.5) * window.innerWidth * 0.8;
            const ny = (Math.random() - 0.5) * window.innerHeight * 0.8;
            clone.style.transform = `translate(${nx}px, ${ny}px)`;
        });
    }
});

// Theme Toggle Logic
const htmlElement = document.documentElement;
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIconSpan = document.getElementById('theme-icon');

// Check Local Storage
const savedThemeSetting = localStorage.getItem('theme');
if (savedThemeSetting) {
    htmlElement.setAttribute('data-theme', savedThemeSetting);
    updateThemeIconStyle(savedThemeSetting);
}

// Toggle Event Listener
if(themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('theme', nextTheme);
        updateThemeIconStyle(nextTheme);
    });
}

function updateThemeIconStyle(theme) {
    if(themeIconSpan) {
        themeIconSpan.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}
