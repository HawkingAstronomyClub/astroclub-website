// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBn2e4_TbwbTjVgc7PvOfv2qFFYXsLsoyM",
    authDomain: "hawking-astronomy-club.firebaseapp.com",
    projectId: "hawking-astronomy-club"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// DOM Elements
const authMessage = document.getElementById('authMessage');
const authEmail = document.getElementById('auth-email');
const authPassword = document.getElementById('auth-password');
const authActionBtn = document.getElementById('auth-action-btn');
const authFooter = document.getElementById('authFooter');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Check URL for mode parameter
const urlParams = new URLSearchParams(window.location.search);
const mode = urlParams.get('mode');
let isLoginMode = mode !== 'signup';

// Initialize UI based on mode
updateAuthUI();

// Toggle between login and signup modes
document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'toggle-auth') {
        e.preventDefault();
        isLoginMode = !isLoginMode;
        emailError.style.display = 'none';
        passwordError.style.display = 'none';
        updateAuthUI();
    }
});

// Handle auth action (login or signup)
authActionBtn.addEventListener('click', handleAuthAction);

// Handle password reset
document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'reset-password') {
        e.preventDefault();
        handleResetPassword();
    }
});

// Update auth UI based on mode (login/signup)
function updateAuthUI() {
    if (isLoginMode) {
        authMessage.textContent = 'Welcome back, stargazer!';
        authActionBtn.textContent = 'Sign In';
        authFooter.innerHTML = `Don't have an account? <a href="#" id="toggle-auth">Sign up here</a><br>
        <a href="#" id="reset-password">Forgot password?</a>`;
    } else {
        authMessage.textContent = 'Join our cosmic community';
        authActionBtn.textContent = 'Create Account';
        authFooter.innerHTML = 'Already have an account? <a href="#" id="toggle-auth">Sign in here</a>';
    }
}

// Handle auth action
async function handleAuthAction() {
    const email = authEmail.value;
    const password = authPassword.value;
    
    emailError.style.display = 'none';
    passwordError.style.display = 'none';
    
    // Basic validation
    if (!email) {
        emailError.textContent = 'Email is required';
        emailError.style.display = 'block';
        return;
    }
    
    if (!password) {
        passwordError.textContent = 'Password is required';
        passwordError.style.display = 'block';
        return;
    }
    
    try {
        if (isLoginMode) {
            // Login
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
            if (userCredential.user.emailVerified) {
                window.location.href = 'home.html';
            } else {
                await userCredential.user.sendEmailVerification();
                alert("Please verify your email first. We've resent the verification email.");
                await firebase.auth().signOut();
            }
        } else {
            // Signup - prompt for display name
            const displayName = prompt("Please enter your name:");
            if (!displayName) {
                alert("Name is required for registration");
                return;
            }
            
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            await userCredential.user.updateProfile({
                displayName: displayName
            });
            await userCredential.user.sendEmailVerification();
            alert("Account created! Please check your email for verification. After verifying, you can log in.");
            isLoginMode = true;
            updateAuthUI();
        }
    } catch (error) {
        handleAuthError(error);
    }
}

// Handle password reset
async function handleResetPassword() {
    const email = authEmail.value || prompt("Enter your email:");
    if (email) {
        try {
            await firebase.auth().sendPasswordResetEmail(email);
            alert("Password reset email sent! Check your inbox.");
        } catch (error) {
            alert("Error: " + error.message);
        }
    }
}

// Handle auth errors
function handleAuthError(error) {
    console.error("Auth error:", error);
    
    if (error.code === 'auth/user-not-found') {
        emailError.textContent = 'User not found';
        emailError.style.display = 'block';
    } else if (error.code === 'auth/email-already-in-use') {
        emailError.textContent = 'Email already in use';
        emailError.style.display = 'block';
    } else if (error.code === 'auth/wrong-password') {
        passwordError.textContent = 'Incorrect password';
        passwordError.style.display = 'block';
    } else if (error.code === 'auth/weak-password') {
        passwordError.textContent = 'Password should be at least 6 characters';
        passwordError.style.display = 'block';
    } else if (error.code === 'auth/invalid-email') {
        emailError.textContent = 'Invalid email address';
        emailError.style.display = 'block';
    } else if (error.code === 'auth/too-many-requests') {
        alert("Too many attempts. Please try again later or reset your password.");
    } else {
        alert("Error: " + error.message);
    }
}