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
