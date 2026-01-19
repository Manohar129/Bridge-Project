document.querySelector('.oppty-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.querySelector('.submit-btn');
    btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    
    // Simulate a successful send
    setTimeout(() => {
        btn.style.background = '#27ae60';
        btn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
    }, 2000);
});


