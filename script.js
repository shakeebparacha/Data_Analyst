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
document.getElementById('modal-overlay').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Funny runaway button for 5000 PKR
document.addEventListener("DOMContentLoaded", function() {
    const btn5000 = document.getElementById('btn-5000');
    let hoverCount = 0;

    if (btn5000) {
        btn5000.addEventListener('mouseover', function() {
            if (hoverCount < 3) {
                const x = Math.random() * 80 - 40; // Move between -40px and 40px
                const y = Math.random() * -60 - 20; // Move up mainly
                this.style.transform = `translate(${x}px, ${y}px)`;
                hoverCount++;
                
                if (hoverCount === 1) {
                    this.textContent = "Catch me! 🏃‍♂️";
                } else if (hoverCount === 2) {
                    this.textContent = "Too slow! 😂";
                } else if (hoverCount === 3) {
                    this.textContent = "Okay, take it 🙄";
                }
            } else {
                this.style.transform = "translate(0, 0)";
            }
        });

        // reset slightly when mouse leaves
        btn5000.addEventListener('mouseleave', function() {
            if (hoverCount < 3) {
                setTimeout(() => {
                    this.style.transform = "translate(0, 0)";
                }, 800);
            }
        });
    }
});
