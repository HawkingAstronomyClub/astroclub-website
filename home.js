// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBn2e4_TbwbTjVgc7PvOfv2qFFYXsLsoyM",
    authDomain: "hawking-astronomy-club.firebaseapp.com",
    projectId: "hawking-astronomy-club"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const userAuthSection = document.getElementById('userAuthSection');
const eventsBtn = document.getElementById('eventsBtn');
const galleryBtn = document.getElementById('galleryBtn');
const announcement = document.querySelector('.announcement-content');

// Initialize UI
initializePage();

// Initialize page elements
function initializePage() {
    // Set up mobile menu toggle
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Set up announcement hover effects
    setupAnnouncementHover();
    
    // Set up button click handlers
    setupButtonHandlers();
    
    // Set up auth state listener
    setupAuthListener();
}

// Toggle mobile menu
function toggleMobileMenu() {
    this.classList.toggle('active');
    mobileMenu.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (!mobileMenu.contains(e.target) && e.target !== mobileMenuBtn) {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

// Setup announcement hover effects
function setupAnnouncementHover() {
    announcement.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    
    announcement.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });
}

// Setup button click handlers
function setupButtonHandlers() {
    eventsBtn.addEventListener('click', function() {
        window.location.href = '#events';
    });
    
    galleryBtn.addEventListener('click', function() {
        alert('Gallery page will be shown here!');
    });
}

// Setup auth state listener
function setupAuthListener() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in and verified
            if (user.emailVerified) {
                updateUserProfile(user);
            } else {
                // If email not verified, sign out and show message
                firebase.auth().signOut();
                alert("Please verify your email before logging in. Check your inbox.");
            }
        } else {
            // No user is signed in
            showAuthButtons();
        }
    });
}

// Update user profile in header
function updateUserProfile(user) {
    // Get user's Gravatar or default image
    const profileImageUrl = user.photoURL || 
        `https://www.gravatar.com/avatar/${CryptoJS.MD5(user.email.trim().toLowerCase()).toString()}?d=retro`;
    
    userAuthSection.innerHTML = `
        <div class="user-profile" id="userProfile">
            <img src="${profileImageUrl}" class="profile-img" alt="Profile">
            <div class="profile-dropdown" id="profileDropdown">
                <span><i class="fas fa-user-astronaut"></i> ${user.displayName || user.email.split('@')[0]}</span>
                <p><i class="fas fa-envelope"></i> ${user.email}</p>
                <a href="#"><i class="fas fa-users"></i> My Team</a>
                <a href="#events"><i class="fas fa-calendar-check"></i> My Events</a>
                <a href="#" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Logout</a>
            </div>
        </div>
    `;

    // Add click event for profile dropdown
    setupProfileDropdown();
}

// Show authentication buttons
function showAuthButtons() {
    userAuthSection.innerHTML = `
        <div class="auth-buttons">
            <a href="signup_login.html?mode=login"><i class="fas fa-sign-in-alt"></i> Sign In</a>
            <a href="signup_login.html?mode=signup"><i class="fas fa-user-plus"></i> Sign Up</a>
        </div>
    `;
}

// Setup profile dropdown functionality
function setupProfileDropdown() {
    const userProfile = document.getElementById('userProfile');
    const dropdown = document.getElementById('profileDropdown');
    
    if (userProfile && dropdown) {
        // Toggle dropdown on profile click
        userProfile.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });
        
        // Add logout event
        document.getElementById('logoutBtn').addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.user-profile')) {
                dropdown.style.display = 'none';
            }
        });
    }
}

// Logout function
function logout() {
    firebase.auth().signOut()
        .then(() => {
            window.location.reload();
        })
        .catch((error) => {
            console.error("Logout error:", error);
            alert("Error during logout: " + error.message);
        });
}

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});