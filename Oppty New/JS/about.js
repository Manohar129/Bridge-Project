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


const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelector('.about-visual').style.transform = 'translateX(0)';
            entry.target.querySelector('.about-visual').style.opacity = '1';
            entry.target.querySelector('.about-content').style.transform = 'translateX(0)';
            entry.target.querySelector('.about-content').style.opacity = '1';
        }
    });
}, { threshold: 0.3 });

// Set initial states in CSS or via JS
const aboutSection = document.querySelector('.about-section');
const visual = document.querySelector('.about-visual');
const content = document.querySelector('.about-content');

visual.style.transition = 'all 1s ease-out';
visual.style.transform = 'translateX(-100px)';
visual.style.opacity = '0';

content.style.transition = 'all 1s ease-out';
content.style.transform = 'translateX(100px)';
content.style.opacity = '0';

aboutObserver.observe(aboutSection);


// This works with your existing 'reveal' class
const mvCards = document.querySelectorAll('.mv-card');

const mvObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('active');
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }, index * 200); // 200ms delay between cards
        }
    });
}, { threshold: 0.1 });

mvCards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "all 0.6s ease-out";
    mvObserver.observe(card);
});


const awardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateX(0)";
                // Pulse effect on the icon
                const icon = entry.target.querySelector('.award-icon');
                icon.style.animation = "pulse 0.5s ease-out";
            }, index * 200);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.award-tile').forEach(tile => {
    tile.style.opacity = "0";
    tile.style.transform = "translateX(50px)";
    tile.style.transition = "all 0.6s ease-out";
    awardObserver.observe(tile);
});


const govLogos = document.querySelectorAll('.gov-logo-box');

const govObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "scale(1)";
            }, index * 200);
        }
    });
}, { threshold: 0.5 });

govLogos.forEach(logo => {
    logo.style.opacity = "0";
    logo.style.transform = "scale(0.8)";
    logo.style.transition = "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    govObserver.observe(logo);
});






const partnerCards = document.querySelectorAll('.partner-card');

const observerOptions = { threshold: 0.2 };

const partnerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger the cards so they pop up 1, 2, 3, 4
            setTimeout(() => {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }, index * 100);
            partnerObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

partnerCards.forEach(card => {
    // Initial hidden state
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "all 0.6s ease-out";
    partnerObserver.observe(card);
});



const reviewItems = document.querySelectorAll('.review-item');

const stableObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateX(0)";
        }
    });
}, { threshold: 0.2 });

reviewItems.forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateX(20px)";
    item.style.transition = "all 0.5s ease-out";
    stableObserver.observe(item);
});


const footerBrand = document.querySelector('.footer-bottom .highlight');

footerBrand.addEventListener('mouseover', () => {
    footerBrand.style.textShadow = "0 0 15px #ec7733";
    footerBrand.style.transition = "0.3s";
});

footerBrand.addEventListener('mouseout', () => {
    footerBrand.style.textShadow = "none";
});