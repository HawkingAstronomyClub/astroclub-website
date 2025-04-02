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

// Background selector functionality
document.querySelectorAll('.bg-option').forEach(button => {
    button.addEventListener('click', function() {
        const bgType = this.getAttribute('data-bg');
        changeBackground(bgType);
    });
});

function changeBackground(type) {
    const body = document.body;
    
    switch(type) {
        case 'nebula':
            body.style.backgroundImage = `
                radial-gradient(circle at 10% 20%, rgba(123, 31, 162, 0.2) 0%, transparent 20%),
                radial-gradient(circle at 90% 80%, rgba(41, 98, 255, 0.2) 0%, transparent 20%),
                url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmVidWxhfGVufDB8fDB8fHww')
            `;
            break;
        case 'stars':
            body.style.backgroundImage = `
                radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 20%),
                radial-gradient(circle at 90% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 20%),
                url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500"><circle cx="50" cy="50" r="0.5" fill="white" opacity="0.7"/><circle cx="250" cy="250" r="0.5" fill="white" opacity="0.7"/><circle cx="400" cy="150" r="0.5" fill="white" opacity="0.7"/><circle cx="150" cy="350" r="0.5" fill="white" opacity="0.7"/><circle cx="350" cy="400" r="0.5" fill="white" opacity="0.7"/><circle cx="100" cy="100" r="0.5" fill="white" opacity="0.7"/><circle cx="300" cy="300" r="0.5" fill="white" opacity="0.7"/><circle cx="450" cy="200" r="0.5" fill="white" opacity="0.7"/><circle cx="200" cy="400" r="0.5" fill="white" opacity="0.7"/><circle cx="400" cy="50" r="0.5" fill="white" opacity="0.7"/></svg>')
            `;
            break;
        case 'galaxy':
            body.style.backgroundImage = `
                radial-gradient(circle at 10% 20%, rgba(41, 98, 255, 0.1) 0%, transparent 20%),
                radial-gradient(circle at 90% 80%, rgba(198, 51, 255, 0.1) 0%, transparent 20%),
                url('https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2FsYXh5fGVufDB8fDB8fHww')
            `;
            break;
        default:
            body.style.backgroundImage = `
                radial-gradient(circle at 10% 20%, rgba(41, 98, 255, 0.1) 0%, transparent 20%),
                radial-gradient(circle at 90% 80%, rgba(198, 51, 255, 0.1) 0%, transparent 20%),
                url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="20" cy="20" r="0.5" fill="white" opacity="0.7"/><circle cx="50" cy="50" r="0.5" fill="white" opacity="0.7"/><circle cx="80" cy="30" r="0.5" fill="white" opacity="0.7"/><circle cx="30" cy="70" r="0.5" fill="white" opacity="0.7"/><circle cx="70" cy="80" r="0.5" fill="white" opacity="0.7"/></svg>')
            `;
    }
}

// Fetch NASA APOD data (actual implementation would need API key)
async function fetchAPOD() {
    try {
        // In a real implementation, you would use:
        // const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=YOUR_API_KEY');
        // const data = await response.json();
        
        // For this example, we'll simulate the response
        const data = {
            title: "NGC 1055: Galaxy in a Box",
            url: "https://apod.nasa.gov/apod/image/2401/NGC1055-SHO-Jeff-Hermann-2048.jpg",
            date: "2024-01-15",
            explanation: "This image captures the majestic spiral galaxy NGC 1055 in stunning detail. Located about 60 million light-years away in the constellation Cetus, this edge-on galaxy reveals intricate dust lanes and star-forming regions. The image was created using data from the Hubble Space Telescope and showcases the galaxy's extended disk, distorted by gravitational interactions with its neighbor, the famous Messier 77 galaxy. The contrasting colors highlight different stellar populations, with blue regions indicating young, hot stars and reddish areas showing older stellar populations. This cosmic portrait spans about 100,000 light-years across, similar in size to our own Milky Way galaxy."
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
document.getElementById('signInBtn').addEventListener('click', function() {
    alert('Sign In functionality will be implemented soon!');
});

document.getElementById('signUpBtn').addEventListener('click', function() {
    alert('Sign Up functionality will be implemented soon!');
});

document.getElementById('eventsBtn').addEventListener('click', function() {
    alert('Events page will be shown here!');
});

document.getElementById('galleryBtn').addEventListener('click', function() {
    alert('Gallery page will be shown here!');
});

// Pause announcement on hover
const announcement = document.querySelector('.announcement-content');
announcement.addEventListener('mouseenter', function() {
    this.style.animationPlayState = 'paused';
});

announcement.addEventListener('mouseleave', function() {
    this.style.animationPlayState = 'running';
});
