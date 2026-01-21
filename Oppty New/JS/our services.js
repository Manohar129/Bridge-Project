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






document.addEventListener("DOMContentLoaded", function() {
    const splitObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.3 });

    const leftCol = document.querySelector('.reveal-left');
    const rightCol = document.querySelector('.reveal-right');
    
    if(leftCol) splitObserver.observe(leftCol);
    if(rightCol) splitObserver.observe(rightCol);
});



const serviceCards = document.querySelectorAll('.service-main-card');

const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('active');
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }, index * 150);
        }
    });
}, { threshold: 0.1 });

serviceCards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = "all 0.6s ease-out";
    serviceObserver.observe(card);
});



document.addEventListener("DOMContentLoaded", function() {
    const splitObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.3 }); // Triggers when 30% visible

    const leftCol = document.querySelector('.reveal-left');
    const rightCol = document.querySelector('.reveal-right');
    
    if(leftCol) splitObserver.observe(leftCol);
    if(rightCol) splitObserver.observe(rightCol);
});




const modules = document.querySelectorAll('.hub-module');
const section = document.querySelector('.service-hub-section');

modules.forEach(module => {
    module.addEventListener('mouseenter', () => {
        const color = module.getAttribute('data-color');
        section.style.background = color; // Shifts the atmosphere
    });

    module.addEventListener('mouseleave', () => {
        section.style.background = '#050505'; // Resets to dark
    });
});



// Staggered reveal
const hubObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }, index * 200);
        }
    });
}, { threshold: 0.1 });

modules.forEach(m => hubObserver.observe(m));

window.addEventListener('scroll', () => {
    const roadmap = document.querySelector('.roadmap-container');
    const items = document.querySelectorAll('.roadmap-item');
    
    items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            item.classList.add('active-roadmap');
            item.style.opacity = "1";
            item.style.transform = "translateX(0)";
        }
    });
});

// Set initial state
document.querySelectorAll('.roadmap-item').forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateX(-30px)";
    item.style.transition = "all 0.8s ease";
});


const footerBrand = document.querySelector('.footer-bottom .highlight');

footerBrand.addEventListener('mouseover', () => {
    footerBrand.style.textShadow = "0 0 15px #ec7733";
    footerBrand.style.transition = "0.3s";
});

footerBrand.addEventListener('mouseout', () => {
    footerBrand.style.textShadow = "none";
});

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



    document.addEventListener("DOMContentLoaded", function() {
        const gridObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    gridObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        const targets = document.querySelectorAll('.reveal-up');
        targets.forEach(target => gridObserver.observe(target));
    });


