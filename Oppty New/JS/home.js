





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


window.addEventListener('scroll', () => {
    const islands = document.querySelectorAll('.feature-island');
    const scrollY = window.scrollY;

    islands.forEach(island => {
        const speed = 0.05;
        const rect = island.getBoundingClientRect();
        
        // Only animate if in viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const shift = rect.top * speed;
            island.style.transform = `translateY(${shift}px)`;
        }
    });
});





const revealCards = () => {
    const cards = document.querySelectorAll('.reveal');
    const triggerBottom = window.innerHeight / 5 * 4;

    cards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;

        if (cardTop < triggerBottom) {
            // Add a staggered delay based on the index
            setTimeout(() => {
                card.classList.add('active');
            }, index * 150); // 150ms delay between each card
        }
    });
};

window.addEventListener('scroll', revealCards);

// Run once on load in case the user is already at that section
revealCards();





const stats = document.querySelectorAll('.stat-number');
const speed = 200; // The lower the number, the faster the count

const startCounting = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const countTo = parseInt(target.getAttribute('data-target'));
            let count = 0;
            
            // Calculate increment based on target and speed
            const increment = countTo / speed;

            const updateCount = () => {
                count += increment;
                if (count < countTo) {
                    target.innerText = Math.ceil(count) + (target.innerText.includes('+') ? '+' : '');
                    setTimeout(updateCount, 1);
                } else {
                    target.innerText = countTo + (target.innerText.includes('+') ? '+' : '');
                }
            };

            updateCount();
            // Stop observing once the animation has run
            observer.unobserve(target);
        }
    });
};


const options = {
    threshold: 0.5 
};

const observer = new IntersectionObserver(startCounting, options);

stats.forEach(stat => {
    observer.observe(stat);
});




const featured = document.querySelector('.featured-image-wrapper img');

document.addEventListener('mousemove', (e) => {
    let x = (window.innerWidth / 2 - e.pageX) / 30;
    let y = (window.innerHeight / 2 - e.pageY) / 30;
    
    if (featured) {
        featured.style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
    }
});


const cards = document.querySelectorAll('.testi-card');
const dots = document.querySelectorAll('.dot');
let currentTesti = 0;

function updateSlider(index) {
    cards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    cards[index].classList.add('active');
    dots[index].classList.add('active');
}

// Auto-rotate every 5 seconds
setInterval(() => {
    currentTesti = (currentTesti + 1) % cards.length;
    updateSlider(currentTesti);
}, 5000);

// Allow clicking dots to change testimonial
dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        currentTesti = i;
        updateSlider(i);
    });
});


const footerBrand = document.querySelector('.footer-bottom .highlight');

footerBrand.addEventListener('mouseover', () => {
    footerBrand.style.textShadow = "0 0 15px #ec7733";
    footerBrand.style.transition = "0.3s";
});

footerBrand.addEventListener('mouseout', () => {
    footerBrand.style.textShadow = "none";
});