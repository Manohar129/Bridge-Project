


const images = [
    '../Oppty New/images/new-20-1024x630.jpg',
    '../Oppty New/images/1736937202phpzFvoCm.jpeg',
    '../Oppty New/images/1721062700287.png',
    '../Oppty New/images/0_o5062-0Phxt6S4LL.png',
    '../Oppty New/images/E-commerce_web_design_EWM_SA_Digital_Agency_Geneva.jpg'
];

let currentIndex = 0;
const sliderElement = document.getElementById('heroSlider');

function changeBackground() {
    sliderElement.style.backgroundImage = `url('${images[currentIndex]}')`;
    currentIndex = (currentIndex + 1) % images.length;
}

// Initialize and interval
changeBackground();
setInterval(changeBackground, 5000);





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