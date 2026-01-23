
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


document.addEventListener("DOMContentLoaded", () => {
    // 1. Scroll Reveal Logic
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                
                // Trigger Number Counter if it's the stats row
                if(entry.target.querySelector('.stat-num')) {
                    startCounting();
                }
            }
        });
    }, { threshold: 0.1 });

    const targets = document.querySelectorAll('.scroll-reveal');
    targets.forEach(t => {
        t.style.opacity = "0";
        t.style.transform = "translateY(30px)";
        t.style.transition = "all 0.8s ease";
        observer.observe(t);
    });

    // 2. Number Counter Logic
    function startCounting() {
        const counters = document.querySelectorAll('.stat-num');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const speed = 200; // Lower is faster
            
            const updateCount = () => {
                const count = +counter.innerText.replace('+', ''); // Remove + to add
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc) + "+";
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount();
        });
    }
});


    document.addEventListener("DOMContentLoaded", function() {
        const hudObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.2 });

        const hud = document.querySelector('.reveal-hud');
        if(hud) hudObserver.observe(hud);
    });




document.addEventListener("DOMContentLoaded", () => {
    // Select all stat items
    const statItems = document.querySelectorAll('.stat-item');

    const observerOptions = {
        threshold: 0.2 // Trigger when 20% of the item is visible
    };

    const statObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 1. Trigger the Slide Animation
                const item = entry.target;
                item.classList.add('slide-in');

                // 2. Trigger the Number Counter
                const numElement = item.querySelector('.stat-number');
                if (numElement) {
                    animateValue(numElement);
                }

                // Stop observing this item once animated
                observer.unobserve(item);
            }
        });
    }, observerOptions);

    statItems.forEach(item => {
        statObserver.observe(item);
    });

    // Helper function to count numbers up
    function animateValue(obj) {
        const target = +obj.getAttribute('data-target'); // Get value from HTML
        const duration = 2000; // Animation takes 2 seconds
        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Format number (removes decimals) and adds '+' if originally present
            obj.innerHTML = Math.floor(progress * target) + (obj.innerHTML.includes('+') ? '+' : '');
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = target + (obj.innerHTML.includes('+') ? '+' : ''); // Ensure final value is exact
            }
        };
        window.requestAnimationFrame(step);
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


document.addEventListener("DOMContentLoaded", () => {
    // Select all elements with the 'fade-up-item' class
    const observerItems = document.querySelectorAll('.fade-up-item');

    const observerOptions = {
        threshold: 0.15 // Trigger when 15% of the item is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the class that forces opacity: 1 and translateY(0)
                entry.target.classList.add('is-visible');
                // Stop observing after it has animated once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observerItems.forEach(item => {
        observer.observe(item);
    });
});


    document.addEventListener("DOMContentLoaded", function() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% visible

        const strip = document.querySelector('.strip-container');
        if(strip) observer.observe(strip);
    });



    // Function to open the map overlay
    function openMap() {
        const overlay = document.getElementById('mapOverlay');
        overlay.style.display = 'flex'; // Shows the modal
    }

    // Function to close the map overlay
    function closeMap() {
        const overlay = document.getElementById('mapOverlay');
        overlay.style.display = 'none'; // Hides the modal
    }

    // Close the map if the user clicks on the dark background (outside the box)
    document.getElementById('mapOverlay').addEventListener('click', function(e) {
        if (e.target === this) {
            closeMap();
        }
    });


document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide-item');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    let slideTimer;

    function updateSlider(index) {
        // Remove active class from all
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        // Add active class to target
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    // Dot Clicks
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            updateSlider(i);
            startAutoPlay(); // Restart timer on click
        });
    });

    function startAutoPlay() {
        clearInterval(slideTimer);
        slideTimer = setInterval(() => {
            let nextIndex = (currentIndex + 1) % slides.length;
            updateSlider(nextIndex);
        }, 5000); // 5 Seconds
    }

    startAutoPlay();
});