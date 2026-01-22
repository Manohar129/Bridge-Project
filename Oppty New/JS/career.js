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


// Simple Filter Logic
const filterButtons = document.querySelectorAll('.f-btn');
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from others
        document.querySelector('.f-btn.active').classList.remove('active');
        btn.classList.add('active');
        
        // Add a "Thinking" state to the feed
        const feed = document.querySelector('.job-grid-inner');
        feed.style.opacity = '0.3';
        setTimeout(() => {
            feed.style.opacity = '1';
            // Logic to filter rows would go here
        }, 400);
    });
});


const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: "0px 0px -50px 0px"
};

const careerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // FADE IN
            entry.target.classList.add('active');
            entry.target.classList.remove('out-view');
        } else {
            // FADE OUT (Optional: triggers when user scrolls past it)
            if (entry.boundingClientRect.top < 0) {
                entry.target.classList.add('out-view');
            }
        }
    });
}, observerOptions);

// Target all boxes
document.querySelectorAll('.reveal-box').forEach(box => {
    careerObserver.observe(box);
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


    
    // Create the "Observer" to watch for elements
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the class that forces the CSS transition
                entry.target.classList.add('active');
                
                // Optional: Stop watching once animated (for performance)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Tell the observer to watch all elements with the 'reveal-up' class
    document.querySelectorAll('.reveal-up').forEach((el) => {
        observer.observe(el);
    });



