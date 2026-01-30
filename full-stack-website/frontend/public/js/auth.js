// Authentication functionality for the full-stack website

document.addEventListener('DOMContentLoaded', function() {
    initializeAuth();
});

function initializeAuth() {
    // Check if user is logged in and update UI
    updateAuthUI();
    
    // Setup login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Setup signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    // Setup logout buttons
    document.querySelectorAll('.logout-btn, #logoutBtn').forEach(btn => {
        btn.addEventListener('click', handleLogout);
    });
}

// Update UI based on authentication status
function updateAuthUI() {
    const isLoggedIn = window.API?.TokenService?.isLoggedIn() || false;
    const user = window.API?.TokenService?.getUser();

    const authButtons = document.querySelector('.auth-buttons');
    const profileIcon = document.querySelector('.profile-icon');
    const userGreeting = document.getElementById('userGreeting');

    if (isLoggedIn && user) {
        // Hide login/signup buttons
        if (authButtons) {
            authButtons.innerHTML = `
                <span class="user-welcome">Hi, ${user.firstName}</span>
                <button class="logout-btn" onclick="handleLogout()">Logout</button>
            `;
        }

        // Show profile icon
        if (profileIcon) {
            profileIcon.style.display = 'flex';
        }

        // Update greeting on profile page
        if (userGreeting) {
            userGreeting.textContent = `Welcome, ${user.firstName} ${user.lastName}!`;
        }

        // Update cart count
        updateCartCount();
    } else {
        // Show login/signup buttons
        if (authButtons) {
            authButtons.innerHTML = `
                <a href="login.html" class="login-btn">Login</a>
                <a href="signup.html" class="signup-btn">Sign Up</a>
            `;
        }
    }
}

// Handle login form submission
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError') || createErrorDiv('loginForm');
    const submitBtn = e.target.querySelector('button[type="submit"]');

    // Clear previous errors
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';

    // Disable button during request
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Logging in...';
    }

    try {
        const response = await window.API.AuthAPI.login(email, password);
        
        if (response.success) {
            // Show success message
            showNotification('Login successful! Redirecting...', 'success');
            
            // Redirect to home page or previous page
            setTimeout(() => {
                const redirectUrl = sessionStorage.getItem('redirectAfterLogin') || 'index.html';
                sessionStorage.removeItem('redirectAfterLogin');
                window.location.href = redirectUrl;
            }, 1000);
        }
    } catch (error) {
        errorDiv.textContent = error.message || 'Login failed. Please check your credentials.';
        errorDiv.style.display = 'block';
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Login';
        }
    }
}

// Handle signup form submission
async function handleSignup(e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorDiv = document.getElementById('signupError') || createErrorDiv('signupForm');
    const submitBtn = e.target.querySelector('button[type="submit"]');

    // Clear previous errors
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';

    // Validate passwords match
    if (password !== confirmPassword) {
        errorDiv.textContent = 'Passwords do not match';
        errorDiv.style.display = 'block';
        return;
    }

    // Validate password length
    if (password.length < 6) {
        errorDiv.textContent = 'Password must be at least 6 characters';
        errorDiv.style.display = 'block';
        return;
    }

    // Disable button during request
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating account...';
    }

    try {
        const response = await window.API.AuthAPI.register({
            firstName,
            lastName,
            email,
            password
        });

        if (response.success) {
            showNotification('Account created successfully! Redirecting...', 'success');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }
    } catch (error) {
        errorDiv.textContent = error.message || 'Registration failed. Please try again.';
        errorDiv.style.display = 'block';
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Sign Up';
        }
    }
}

// Handle logout
async function handleLogout() {
    try {
        await window.API.AuthAPI.logout();
        showNotification('Logged out successfully', 'success');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    } catch (error) {
        console.error('Logout error:', error);
        // Still clear local storage and redirect
        window.API.TokenService.removeToken();
        window.API.TokenService.removeUser();
        window.location.href = 'index.html';
    }
}

// Update cart count in header
async function updateCartCount() {
    const cartCountEl = document.querySelector('.cart-count');
    if (!cartCountEl) return;

    if (window.API?.TokenService?.isLoggedIn()) {
        try {
            const response = await window.API.CartAPI.getCount();
            cartCountEl.textContent = response.count || 0;
        } catch (error) {
            console.error('Error fetching cart count:', error);
            cartCountEl.textContent = '0';
        }
    } else {
        // Use local storage cart for non-logged in users
        const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const count = localCart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountEl.textContent = count;
    }
}

// Create error div if it doesn't exist
function createErrorDiv(formId) {
    const form = document.getElementById(formId);
    let errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ef4444';
    errorDiv.style.marginBottom = '1rem';
    errorDiv.style.padding = '0.75rem';
    errorDiv.style.backgroundColor = '#fef2f2';
    errorDiv.style.borderRadius = '8px';
    errorDiv.style.display = 'none';
    form.insertBefore(errorDiv, form.firstChild);
    return errorDiv;
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        background-color: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Make functions globally available
window.handleLogin = handleLogin;
window.handleSignup = handleSignup;
window.handleLogout = handleLogout;
window.updateAuthUI = updateAuthUI;
window.updateCartCount = updateCartCount;
window.showNotification = showNotification;
