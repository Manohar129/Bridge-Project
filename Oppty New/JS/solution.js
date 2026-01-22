document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.solution-card');
    
    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(40px)";
        card.style.transition = "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        revealOnScroll.observe(card);
    });
});


window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    const progressLine = document.querySelector('.progress-line');
    
    // Scale the line based on scroll
    if(progressLine) {
        progressLine.style.height = `${scrollPercent}%`;
    }
});



const triggers = document.querySelectorAll('.problem-trigger');
const screens = document.querySelectorAll('.display-screen');

triggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', () => {
        // Remove active class from all
        triggers.forEach(t => t.classList.remove('active'));
        screens.forEach(s => s.classList.remove('active'));

        // Add to current
        trigger.classList.add('active');
        const targetId = trigger.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
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
