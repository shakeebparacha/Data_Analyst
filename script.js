let selectedAmountText = '';
let selectedAmountValue = '';

function scrollToEidi() {
    document.getElementById('eidi-section').scrollIntoView({ behavior: 'smooth' });
}

// Open Modal and Setup Confirmation
function selectEidi(amountText, amountValue) {
    selectedAmountText = amountText;
    selectedAmountValue = amountValue;
    
    const message = `Are you sure you want this Eidi? I’ll prepare it with the exact Pakistani rupee note (${amountValue}) and give it to you in real life, inshaAllah! 😊`;
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
    const textMessage = `I chose Eidi amount ${selectedAmountText} on your website.`;
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
