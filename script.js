// Toggle dropdown menu
document.getElementById('menuBtn').addEventListener('click', function() {
    const menu = document.getElementById('dropdownMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

// Close menu when clicking outside
window.addEventListener('click', function(event) {
    if (!event.target.matches('.menu-button') && !event.target.matches('.menu-button *')) {
        const menu = document.getElementById('dropdownMenu');
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        }
    }
});

// Fetch NASA APOD data (simulated)
function fetchAPOD() {
    try {
        const data = {
            title: "NGC 1055: Galaxy in a Box",
            url: "https://apod.nasa.gov/apod/image/2401/NGC1055-SHO-Jeff-Hermann-2048.jpg",
            date: "2024-01-15",
            explanation: "This image captures the majestic spiral galaxy NGC 1055 in stunning detail. Located about 60 million light-years away in the constellation Cetus, this edge-on galaxy reveals intricate dust lanes and star-forming regions."
        };
        
        document.getElementById('apodImage').src = data.url;
        document.getElementById('apodDate').innerHTML = `<i class="fas fa-clock"></i> ${new Date(data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;
        document.getElementById('apodExplanation').textContent = data.explanation;
        document.querySelector('.apod-title').innerHTML = `<i class="fas fa-star"></i> ${data.title}`;
    } catch (error) {
        console.error('Error fetching APOD:', error);
    }
}

// Call the function when the page loads
window.addEventListener('load', fetchAPOD);

// Button event listeners
document.getElementById('signInBtn')?.addEventListener('click', function() {
    window.location.href = 'signin.html';
});

document.getElementById('signUpBtn')?.addEventListener('click', function() {
    window.location.href = 'signup.html';
});

document.getElementById('eventsBtn')?.addEventListener('click', function() {
    window.location.href = 'events.html';
});

document.getElementById('galleryBtn')?.addEventListener('click', function() {
    window.location.href = 'gallery.html';
});

// Pause announcement on hover
const announcement = document.querySelector('.announcement-content');
if (announcement) {
    announcement.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });

    announcement.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });
}
