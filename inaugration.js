// IP restriction for inaugration (replace with your actual IP)
const ALLOWED_IP = '192.168.1.6'; // Example IP - replace with the actual one

// Function to get client IP (simplified version)
async function getClientIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP:', error);
        return null;
    }
}

// Function to check if IP matches
async function checkIP() {
    const clientIP = await getClientIP();
    return clientIP === ALLOWED_IP;
}

// Countdown timer
function startCountdown() {
    let minutes = 0;
    let seconds = 30;
    const countdownElement = document.getElementById('countdown');
    
    const timer = setInterval(() => {
        countdownElement.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(timer);
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
    }, 1000);
}

// Inaugration function
async function setupInaugration() {
    // Start countdown
    startCountdown();
    
    // Check IP and setup button accordingly
    const isAllowedIP = await checkIP();
    const inaugrateBtn = document.getElementById('inaugrateBtn');
    
    if (isAllowedIP) {
        inaugrateBtn.style.display = 'block';
    } else {
        inaugrateBtn.style.display = 'none';
    }
    
    // Inaugration button click handler
    inaugrateBtn.addEventListener('click', function() {
        // Show celebration effects
        this.textContent = 'INAUGURATED!';
        this.style.backgroundColor = '#00ff00';
        this.style.boxShadow = '0 0 50px rgba(0, 255, 0, 0.9)';
        
        // Play sound effect (optional)
        const audio = new Audio('fireworks.mp3'); // Add your sound file
        audio.play().catch(e => console.log('Audio play failed:', e));
        
        // Hide inaugration overlay after delay
        setTimeout(() => {
            document.getElementById('inaugrationOverlay').style.display = 'none';
            document.getElementById('websiteContent').style.display = 'block';
            
            // Set flag in localStorage
            localStorage.setItem('inaugrated', 'true');
        }, 3000);
    });
}

// Check if already inaugrated
if (localStorage.getItem('inaugrated') !== 'true') {
    document.addEventListener('DOMContentLoaded', setupInaugration);
} else {
    document.getElementById('inaugrationOverlay').style.display = 'none';
    document.getElementById('websiteContent').style.display = 'block';
}
