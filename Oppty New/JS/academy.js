window.addEventListener('scroll', () => {
    const header = document.querySelector('.head-section');
    if (window.scrollY > 50) {
        header.style.padding = "10px 0";
        header.style.background = "rgba(255, 255, 255, 0.95)";
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
    } else {
        header.style.padding = "15px 0";
        header.style.background = "rgba(255, 255, 255, 0.9)";
        header.style.boxShadow = "none";
    }
});


document.querySelectorAll('.matrix-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Update CSS Variables for the glow
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
        
        // Tilt Calculation
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
});



window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.stack-card');
    const scrollPos = window.scrollY;

    cards.forEach((card, index) => {
        const cardTop = card.offsetTop;
        const distance = scrollPos - cardTop;

        if (distance > 0) {
            // As we scroll past, the card scales down and darkens slightly
            const scale = 1 - (distance / 5000); // Subtle scale
            const opacity = 1 - (distance / 2000); // Subtle fade
            
            card.style.transform = `scale(${Math.max(scale, 0.9)}) translateY(-${distance * 0.1}px)`;
            card.style.opacity = Math.max(opacity, 0.5);
        } else {
            card.style.transform = `scale(1) translateY(0)`;
            card.style.opacity = 1;
        }
    });
});