// Profile page JavaScript with API integration
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = window.API?.TokenService?.isLoggedIn();
    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }
    
    // Load user profile data
    loadUserProfile();
    
    // Setup logo click handler
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
        logo.style.cursor = 'pointer';
    }
    
    // Setup back button
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }
});

// Load user profile from API
async function loadUserProfile() {
    console.log('Loading user profile...');
    console.log('Current token:', window.API.TokenService.getToken());
    console.log('Current user from token service:', window.API.TokenService.getUser());
    
    // Clear any cached profile data that might be stale
    localStorage.removeItem('profileData');
    localStorage.removeItem('userAddress');
    
    // Always get fresh data from API, never use cached data
    try {
        const response = await window.API.UserAPI.getProfile();
        console.log('Profile API response:', response);
        
        if (response.success && response.data) {
            console.log('Profile data loaded successfully:', response.data);
            // Update UI with fresh data from API
            updateProfileUI(response.data);
            loadUserAddress(response.data);
        } else {
            console.log('Profile API response failed:', response);
            // If API fails, show error state
            updateProfileUI(null);
        }
    } catch (error) {
        console.error('Error loading profile:', error);
        // Show error state instead of using potentially stale cached data
        updateProfileUI(null);
    }
    
    // Don't load saved profile data - it could be from a different user
    // loadSavedProfileData();
}

// Load user address from profile data
function loadUserAddress(userData) {
    console.log('=== LOAD USER ADDRESS DEBUG ===');
    console.log('Loading user address:', userData);
    
    // Check if user has address in their profile
    if (userData.addresses && userData.addresses.length > 0) {
        const address = userData.addresses[0]; // Get first (and only) address
        console.log('Found address in user profile:', address);
        console.log('Address.stats:', address.stats);
        console.log('Address.stats type:', typeof address.stats);
        console.log('Address.stats length:', address.stats ? address.stats.length : 'null');
        
        // Update address display
        const addressesList = document.querySelector('.addresses-list');
        if (addressesList) {
            const statsDisplay = address.stats || 'No stats';
            console.log('Stats display value:', statsDisplay);
            
            const addressHTML = `
                <div class="address-item">
                    <div class="address-content">
                        <h4>Home Address</h4>
                        <p>${address.street}<br>${address.city}<br>${address.zipCode || ''}<br>${address.country || ''}</p>
                        <p>${statsDisplay}</p>
                    </div>
                    <div class="address-actions">
                        <button class="btn btn-sm btn-primary" onclick="editAddress('home')">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteAddress('home')">Delete</button>
                    </div>
                </div>
            `;
            addressesList.innerHTML = addressHTML;
            console.log('Address HTML set with stats:', statsDisplay);
        }
        
        // Hide "Add New Address" button since address exists
        const addAddressBtn = document.querySelector('button[onclick="addNewAddress()"]');
        if (addAddressBtn) {
            addAddressBtn.style.display = 'none';
        }
    } else {
        console.log('No address found in user profile');
        // Show empty state
        const addressesList = document.querySelector('.addresses-list');
        if (addressesList) {
            addressesList.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">No address set. Click "Add New Address" to add your shipping address.</p>';
        }
        
        // Show "Add New Address" button since no address exists
        const addAddressBtn = document.querySelector('button[onclick="addNewAddress()"]');
        if (addAddressBtn) {
            addAddressBtn.style.display = 'inline-block';
        }
    }
}

// Load saved profile data from localStorage
function loadSavedProfileData() {
    try {
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
            const profileData = JSON.parse(savedProfile);
            console.log('Loading saved profile data:', profileData);
            updateProfileDisplay(profileData);
        }
        
        // Load notification preferences
        const savedNotifications = localStorage.getItem('notificationPreferences');
        if (savedNotifications) {
            const preferences = JSON.parse(savedNotifications);
            console.log('Loading notification preferences:', preferences);
            
            // Update notification checkboxes
            document.getElementById('emailNotifications').checked = preferences.emailNotifications;
            document.getElementById('smsNotifications').checked = preferences.smsNotifications;
            document.getElementById('promoNotifications').checked = preferences.promoNotifications;
        }
    } catch (error) {
        console.error('Error loading saved data:', error);
    }
}

// Update profile UI with user data
function updateProfileUI(user) {
    console.log('Updating profile UI with user data:', user);
    
    // Handle error or null user data
    if (!user) {
        console.log('No user data available, showing error state');
        const nameEl = document.querySelector('.profile-details h1');
        const emailEl = document.querySelector('.profile-details p:first-of-type');
        const dateEl = document.querySelector('.profile-details p:nth-of-type(2)');
        const addressEl = document.querySelector('.profile-details p:nth-of-type(3)');
        const phoneEl = document.querySelector('.profile-details p:nth-of-type(4)');
        
        if (nameEl) nameEl.textContent = 'Error loading profile';
        if (emailEl) emailEl.innerHTML = '<i class="fas fa-envelope"></i> Unable to load email';
        if (dateEl) dateEl.innerHTML = '<i class="fas fa-calendar"></i> Unable to load join date';
        if (addressEl) addressEl.innerHTML = '<i class="fas fa-map-marker-alt"></i> Unable to load address';
        if (phoneEl) phoneEl.innerHTML = '<i class="fas fa-phone"></i> Unable to load phone';
        return;
    }
    
    // Update name
    const nameEl = document.querySelector('.profile-details h1');
    if (nameEl) {
        nameEl.textContent = `${user.firstName} ${user.lastName}`;
    }
    
    // Update email
    const emailEl = document.querySelector('.profile-details p:first-of-type');
    if (emailEl) {
        emailEl.innerHTML = `<i class="fas fa-envelope"></i> ${user.email}`;
    }
    
    // Update member since date
    const dateEl = document.querySelector('.profile-details p:nth-of-type(2)');
    if (dateEl && user.createdAt) {
        const date = new Date(user.createdAt);
        const options = { year: 'numeric', month: 'long' };
        dateEl.innerHTML = `<i class="fas fa-calendar"></i> Member since ${date.toLocaleDateString('en-US', options)}`;
    }
    
    // Update address if available
    if (user.addresses && user.addresses.length > 0) {
        const address = user.addresses[0];
        console.log('Updating address in profile info:', address);
        
        const addressEl = document.querySelector('.profile-details p:nth-of-type(3)');
        if (addressEl) {
            const addressText = `${address.street}, ${address.city}${address.zipCode ? ', ' + address.zipCode : ''}${address.country ? ', ' + address.country : ''}`;
            addressEl.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${addressText}`;
        }
    } else {
        // Show no address message
        const addressEl = document.querySelector('.profile-details p:nth-of-type(3)');
        if (addressEl) {
            addressEl.innerHTML = `<i class="fas fa-map-marker-alt"></i> No address set`;
        }
    }
    
    // Update phone
    const phoneEl = document.querySelector('.profile-details p:nth-of-type(4)');
    if (phoneEl) {
        const phoneText = user.phone ? user.phone : 'No phone set';
        phoneEl.innerHTML = `<i class="fas fa-phone"></i> ${phoneText}`;
    }
    
    // Update badges
    const badgesEl = document.querySelector('.profile-badges');
    if (badgesEl) {
        let badges = '';
        if (user.role === 'admin') {
            badges += '<span class="badge badge-premium"><i class="fas fa-crown"></i> Admin</span>';
        }
        if (user.isVerified) {
            badges += '<span class="badge badge-verified"><i class="fas fa-check-circle"></i> Verified</span>';
        }
        badgesEl.innerHTML = badges || '<span class="badge"><i class="fas fa-user"></i> Member</span>';
    }
    
    // Load user's orders and wishlist
    loadUserOrders();
    loadUserWishlist();
    updateProfileStats();
    
    // Listen for wishlist updates from other pages
    window.addEventListener('wishlistUpdated', function(event) {
        console.log('Wishlist update event received:', event.detail);
        loadUserWishlist();
    });
}

// Load user orders
async function loadUserOrders() {
    const ordersContainer = document.getElementById('ordersContainer');
    if (!ordersContainer) return;
    
    try {
        // For now, show empty state. In future, fetch from API
        ordersContainer.innerHTML = '<p class="empty-state">No orders yet. Start shopping to see your order history here!</p>';
    } catch (error) {
        console.error('Error loading orders:', error);
        ordersContainer.innerHTML = '<p class="empty-state">Unable to load orders.</p>';
    }
}

// Load products for profile page
async function loadProductsForProfile() {
    try {
        console.log('Loading products for profile...');
        
        // Try to load products from API first
        if (window.API && window.API.ProductAPI) {
            const response = await window.API.ProductAPI.getProducts();
            if (response.success && response.data) {
                window.products = response.data;
                console.log('Products loaded from API:', window.products.length);
                return;
            }
        }
        
        // Fallback to hardcoded products if API fails
        if (typeof products !== 'undefined') {
            window.products = products;
            console.log('Using hardcoded products:', window.products.length);
            return;
        }
        
        console.log('No products available for ID mapping');
    } catch (error) {
        console.error('Error loading products for profile:', error);
        // Fallback to hardcoded products
        if (typeof products !== 'undefined') {
            window.products = products;
            console.log('Using hardcoded products as fallback:', window.products.length);
        }
    }
}

// Load user wishlist
async function loadUserWishlist() {
    const wishlistContainer = document.getElementById('wishlistContainer');
    if (!wishlistContainer) return;
    
    try {
        console.log('Loading user wishlist...');
        
        // Check if user is logged in
        if (!window.API?.TokenService?.isLoggedIn()) {
            console.log('User not logged in, showing login prompt');
            wishlistContainer.innerHTML = '<p class="empty-state">Please login to view your wishlist.</p>';
            updateWishlistCount(0);
            return;
        }
        
        // Ensure products are loaded for ID mapping
        if (!window.products || window.products.length === 0) {
            console.log('Products not loaded, attempting to load products first...');
            await loadProductsForProfile();
        }
        
        console.log('Fetching wishlist from API...');
        const response = await window.API.UserAPI.getWishlist();
        console.log('Wishlist API response:', response);
        
        if (response.success && response.data && response.data.length > 0) {
            const wishlistItems = response.data;
            console.log('Wishlist items found:', wishlistItems.length);
            console.log('Wishlist items details:', wishlistItems);
            
            let wishlistHTML = '';
            wishlistItems.forEach(item => {
                const productName = item.name || 'Unknown Product';
                
                // Find the frontend product ID by matching the product name
                let frontendProductId = null;
                if (window.products && window.products.length > 0) {
                    const frontendProduct = window.products.find(p => p.name === productName);
                    frontendProductId = frontendProduct ? frontendProduct.id : null;
                    console.log(`Product mapping: ${productName} -> Frontend ID: ${frontendProductId}`);
                } else {
                    console.log(`No products available for mapping: ${productName}`);
                }
                
                // Always use frontend product ID if found, otherwise fallback to MongoDB ID
                const productId = frontendProductId || item._id || item.id;
                const productImage = item.image || 'https://images.unsplash.com/photo-15187092638062-0d3ff9dc540e?w=500';
                const productDescription = item.description ? item.description.substring(0, 100) + '...' : 'No description available';
                const productPrice = item.price ? item.price.toFixed(2) : '0.00';
                
                console.log(`Final wishlist item: ${productName}, Using ID: ${productId} (${frontendProductId ? 'Frontend' : 'MongoDB'})`);
                
                wishlistHTML += `
                    <div class="wishlist-item" data-product-id="${productId}" data-product-name="${productName}">
                        <img src="${productImage}" alt="${productName}" onerror="this.src='https://images.unsplash.com/photo-15187092638062-0d3ff9dc540e?w=500'">
                        <div class="wishlist-info">
                            <h4>${productName}</h4>
                            <p>${productDescription}</p>
                            <p class="wishlist-price">$${productPrice}</p>
                        </div>
                        <div class="wishlist-actions">
                            <button class="btn btn-sm btn-primary" onclick="window.location.href='product-details.html?id=${productId}'">View</button>
                            <button class="btn btn-sm btn-danger" onclick="removeFromWishlist('${productId}')">Remove</button>
                        </div>
                    </div>
                `;
            });
            
            wishlistContainer.innerHTML = wishlistHTML;
            console.log('Wishlist HTML rendered successfully');
            
            // Update wishlist count in profile stats
            updateWishlistCount(wishlistItems.length);
            
            // Show success notification
            showProfileNotification(`Loaded ${wishlistItems.length} items from your wishlist`);
        } else {
            console.log('No wishlist items found');
            wishlistContainer.innerHTML = '<p class="empty-state">Your wishlist is empty. Add products you love to see them here!</p>';
            updateWishlistCount(0);
        }
    } catch (error) {
        console.error('Error loading wishlist:', error);
        console.error('Error details:', error.message);
        wishlistContainer.innerHTML = '<p class="empty-state">Unable to load wishlist. Please try again later.</p>';
        updateWishlistCount(0);
        showProfileNotification('Failed to load wishlist', 'error');
    }
}

// Remove item from wishlist
window.removeFromWishlist = async function(productId) {
    console.log('Removing from wishlist:', productId);
    
    // Check if user is logged in
    if (!window.API?.TokenService?.isLoggedIn()) {
        showProfileNotification('Please login to remove items from wishlist', 'error');
        return;
    }
    
    try {
        // Get the product name from the DOM element
        const wishlistItem = document.querySelector(`[data-product-id="${productId}"]`);
        const productName = wishlistItem ? wishlistItem.dataset.productName : null;
        
        console.log('Removing product:', productName, 'with ID:', productId);
        
        // Always use the frontend product ID for API calls
        let apiProductId = productId;
        
        // If we have a product name and products array, try to find the frontend ID
        if (productName && window.products) {
            const frontendProduct = window.products.find(p => p.name === productName);
            if (frontendProduct) {
                apiProductId = frontendProduct.id;
                console.log(`Found frontend product ID: ${apiProductId} for product: ${productName}`);
            }
        }
        
        console.log('Calling API to remove item with ID:', apiProductId);
        const response = await window.API.UserAPI.removeFromWishlist(apiProductId);
        console.log('Remove API response:', response);
        
        if (response.success) {
            showProfileNotification('Item removed from wishlist!');
            console.log('Item removed successfully, reloading wishlist...');
            
            // Trigger storage event to notify other tabs/pages
            localStorage.setItem('wishlistUpdated', Date.now().toString());
            
            // Reload wishlist to update the display
            await loadUserWishlist();
        } else {
            console.log('Failed to remove item:', response);
            showProfileNotification('Failed to remove from wishlist', 'error');
        }
    } catch (error) {
        console.error('Error removing from wishlist:', error);
        console.error('Error details:', error.message);
        showProfileNotification('Error removing from wishlist', 'error');
    }
}

// Update wishlist count in profile stats
function updateWishlistCount(count) {
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length >= 2) {
        stats[1].textContent = count;  // Wishlist count (second stat)
    }
}

// Update profile stats
function updateProfileStats() {
    // Update stats to show 0 for new users
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length >= 4) {
        stats[0].textContent = '0';  // Orders
        stats[1].textContent = '0';  // Wishlist
        stats[2].textContent = '0';  // Reviews
        stats[3].textContent = '0 د.ج';  // Spent
    }
}

// Account Settings Modal Functions
window.openPersonalInfoModal = function(event) {
    event.preventDefault();
    console.log('Opening personal info modal');
    
    // Load current user data
    const user = window.API?.TokenService?.getUser();
    if (user) {
        document.getElementById('firstName').value = user.firstName || '';
        document.getElementById('lastName').value = user.lastName || '';
        document.getElementById('email').value = user.email || '';
        document.getElementById('phone').value = user.phone || '';
    }
    
    openModal('personalInfoModal');
};

window.openAddressesModal = function(event) {
    event.preventDefault();
    console.log('Opening addresses modal');
    openModal('addressesModal');
};

window.openPaymentModal = function(event) {
    event.preventDefault();
    console.log('Opening payment modal');
    openModal('paymentModal');
};

window.openNotificationsModal = function(event) {
    event.preventDefault();
    console.log('Opening notifications modal');
    openModal('notificationsModal');
};

// Modal helper functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

window.closeModal = function(modalId) {
    console.log('closeModal called with modalId:', modalId);
    const modal = document.getElementById(modalId);
    console.log('Modal element found:', !!modal);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        console.log('Modal closed successfully');
    } else {
        console.log('Modal element not found!');
    }
};

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Personal Information Form Handler
document.addEventListener('DOMContentLoaded', function() {
    console.log('Setting up form handlers...');
    
    const personalInfoForm = document.getElementById('personalInfoForm');
    console.log('Personal info form found:', !!personalInfoForm);
    
    if (personalInfoForm) {
        personalInfoForm.addEventListener('submit', function(e) {
            console.log('Personal info form submitted!');
            e.preventDefault();
            
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value
            };
            
            console.log('Form data collected:', formData);
            
            // Try to save to backend API first
            if (window.API && window.API.UserAPI && window.API.UserAPI.updateProfile) {
                console.log('Saving to backend API...');
                window.API.UserAPI.updateProfile(formData)
                    .then(response => {
                        console.log('API response:', response);
                        if (response.success) {
                            // Save to localStorage as backup
                            localStorage.setItem('userProfile', JSON.stringify(formData));
                            
                            // Update user token service
                            const currentUser = window.API.TokenService.getUser();
                            if (currentUser) {
                                const updatedUser = { ...currentUser, ...formData };
                                window.API.TokenService.setUser(updatedUser);
                                console.log('Updated user in TokenService');
                            }
                            
                            // Update profile display
                            console.log('Updating profile display...');
                            updateProfileDisplay(formData);
                            
                            // Show success message
                            console.log('Showing success notification...');
                            showProfileNotification('Personal information updated successfully!');
                            
                            // Close modal
                            console.log('About to close modal...');
                            closeModal('personalInfoModal');
                            console.log('Modal close command sent');
                        } else {
                            throw new Error(response.message || 'Update failed');
                        }
                    })
                    .catch(error => {
                        console.log('API failed, using localStorage fallback:', error);
                        
                        // Fallback to localStorage
                        localStorage.setItem('userProfile', JSON.stringify(formData));
                        
                        // Update user token service if available
                        if (window.API && window.API.TokenService) {
                            const currentUser = window.API.TokenService.getUser();
                            if (currentUser) {
                                const updatedUser = { ...currentUser, ...formData };
                                window.API.TokenService.setUser(updatedUser);
                                console.log('Updated user in TokenService (fallback)');
                            }
                        }
                        
                        // Update profile display
                        console.log('Updating profile display (fallback)...');
                        updateProfileDisplay(formData);
                        
                        // Show success message
                        console.log('Showing success notification (fallback)...');
                        showProfileNotification('Personal information updated locally!');
                        
                        // Close modal
                        console.log('About to close modal (fallback)...');
                        closeModal('personalInfoModal');
                        console.log('Modal close command sent (fallback)');
                    });
            } else {
                console.log('API not available, using localStorage only...');
                
                // Save to localStorage only
                localStorage.setItem('userProfile', JSON.stringify(formData));
                
                // Update user token service if available
                if (window.API && window.API.TokenService) {
                    const currentUser = window.API.TokenService.getUser();
                    if (currentUser) {
                        const updatedUser = { ...currentUser, ...formData };
                        window.API.TokenService.setUser(updatedUser);
                        console.log('Updated user in TokenService (localStorage only)');
                    }
                }
                
                // Update profile display
                console.log('Updating profile display (localStorage only)...');
                updateProfileDisplay(formData);
                
                // Show success message
                console.log('Showing success notification (localStorage only)...');
                showProfileNotification('Personal information saved locally!');
                
                // Close modal
                console.log('About to close modal (localStorage only)...');
                closeModal('personalInfoModal');
                console.log('Modal close command sent (localStorage only)');
            }
        });
    } else {
        console.log('Personal info form not found!');
    }
    
    // Notifications Form Handler
    const notificationsForm = document.querySelector('.notifications-form');
    if (notificationsForm) {
        notificationsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const preferences = {
                emailNotifications: document.getElementById('emailNotifications').checked,
                smsNotifications: document.getElementById('smsNotifications').checked,
                promoNotifications: document.getElementById('promoNotifications').checked
            };
            
            console.log('Saving notification preferences:', preferences);
            
            // Try to save to backend API first
            if (window.API && window.API.UserAPI && window.API.UserAPI.updatePreferences) {
                console.log('Saving preferences to backend API...');
                window.API.UserAPI.updatePreferences(preferences)
                    .then(response => {
                        console.log('API response:', response);
                        if (response.success) {
                            // Save to localStorage as backup
                            localStorage.setItem('notificationPreferences', JSON.stringify(preferences));
                            
                            // Show success message
                            showProfileNotification('Notification preferences saved successfully!');
                            closeModal('notificationsModal');
                        } else {
                            throw new Error(response.message || 'Update failed');
                        }
                    })
                    .catch(error => {
                        console.log('API failed, using localStorage fallback:', error);
                        
                        // Fallback to localStorage
                        localStorage.setItem('notificationPreferences', JSON.stringify(preferences));
                        
                        // Show success message
                        showProfileNotification('Notification preferences saved locally!');
                        closeModal('notificationsModal');
                    });
            } else {
                console.log('API not available, using localStorage only...');
                
                // Save to localStorage only
                localStorage.setItem('notificationPreferences', JSON.stringify(preferences));
                
                // Show success message
                showProfileNotification('Notification preferences saved locally!');
                closeModal('notificationsModal');
            }
        });
    }
});

// Show notification for profile page
function showProfileNotification(message) {
    console.log('showProfileNotification called with:', message);
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide and remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Update profile display with new data
function updateProfileDisplay(userData) {
    console.log('Updating profile display with:', userData);
    
    // Update welcome message
    const userGreeting = document.querySelector('.user-greeting');
    console.log('User greeting element found:', !!userGreeting);
    if (userGreeting) {
        const newGreeting = `Welcome, ${userData.firstName} ${userData.lastName}!`;
        userGreeting.textContent = newGreeting;
        console.log('Updated greeting to:', newGreeting);
    }
    
    // Update auth buttons
    const authButtons = document.querySelector('.auth-buttons');
    console.log('Auth buttons element found:', !!authButtons);
    if (authButtons) {
        const newAuthHTML = `
            <span class="user-welcome">Hi, ${userData.firstName}</span>
            <button class="logout-btn" onclick="handleLogout()">Logout</button>
        `;
        authButtons.innerHTML = newAuthHTML;
        console.log('Updated auth buttons');
    }
    
    // Update main profile details section
    const profileDetails = document.querySelector('.profile-details h1');
    console.log('Profile details h1 found:', !!profileDetails);
    if (profileDetails) {
        const newName = `${userData.firstName} ${userData.lastName}`;
        profileDetails.textContent = newName;
        console.log('Updated profile name to:', newName);
    }
    
    // Update email in profile details
    const profileEmail = document.querySelector('.profile-details p:first-of-type');
    console.log('Profile email element found:', !!profileEmail);
    if (profileEmail) {
        profileEmail.innerHTML = `<i class="fas fa-envelope"></i> ${userData.email}`;
        console.log('Updated profile email to:', userData.email);
    }
    
    // Update phone in profile details
    const profilePhone = document.querySelector('.profile-details p:nth-of-type(4)');
    console.log('Profile phone element found:', !!profilePhone);
    if (profilePhone) {
        const phoneText = userData.phone ? userData.phone : 'No phone set';
        profilePhone.innerHTML = `<i class="fas fa-phone"></i> ${phoneText}`;
        console.log('Updated profile phone to:', phoneText);
    }
    
    // Update any other profile displays
    const profileNameElements = document.querySelectorAll('.profile-name');
    console.log('Profile name elements found:', profileNameElements.length);
    profileNameElements.forEach(element => {
        const newName = `${userData.firstName} ${userData.lastName}`;
        element.textContent = newName;
        console.log('Updated profile name to:', newName);
    });
    
    const profileEmailElements = document.querySelectorAll('.profile-email');
    console.log('Profile email elements found:', profileEmailElements.length);
    profileEmailElements.forEach(element => {
        element.textContent = userData.email;
        console.log('Updated profile email to:', userData.email);
    });
    
    console.log('Profile display update complete');
}

// Add Payment Method functionality
window.addPaymentMethod = function() {
    console.log('Add Payment Method clicked');
    showProfileNotification('Payment method form would open here (demo mode)');
};

// Add Address functionality
window.addNewAddress = function() {
    console.log('Add New Address clicked');
    
    // Check if address already exists
    if (document.querySelector('.address-item')) {
        showProfileNotification('You already have an address. Use Edit to modify it.');
        return;
    }
    
    // Create a simple address form for demo
    const addressFormHTML = `
        <div class="address-form" style="padding: 1rem; background: white; border-radius: 8px; margin-bottom: 1rem;">
            <h3>Add Your Address</h3>
            <div class="form-group" style="margin-bottom: 1rem;">
                <label for="newStreet" style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text-dark);">Street Address:</label>
                <input type="text" id="newStreet" class="form-control" placeholder="Enter your street address" style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="form-group" style="margin-bottom: 1rem;">
                <label for="newCity" style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text-dark);">City:</label>
                <input type="text" id="newCity" class="form-control" placeholder="Enter your city" style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="form-group" style="margin-bottom: 1rem;">
                <label for="newZipCode" style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text-dark);">Zip Code:</label>
                <input type="text" id="newZipCode" class="form-control" placeholder="Enter your zip code" style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="form-group" style="margin-bottom: 1rem;">
                <label for="newCountry" style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text-dark);">Country:</label>
                <select id="newCountry" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
                    <option value="">Select a country</option>
                </select>
            </div>
            <div class="form-group" style="margin-bottom: 1rem;">
                <label for="newStats" style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text-dark);">Stats:</label>
                <input type="text" id="newStats" class="form-control" placeholder="Enter your stats" style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button class="btn btn-secondary" onclick="cancelAddressForm()">Cancel</button>
                <button class="btn btn-primary" onclick="saveNewAddress()">Save Address</button>
            </div>
        </div>
    `;
    
    // Insert form before the form-actions
    const addressesList = document.querySelector('.addresses-list');
    const formActions = document.querySelector('.addresses-modal .form-actions');
    
    if (addressesList && !document.querySelector('.address-form')) {
        addressesList.insertAdjacentHTML('beforebegin', addressFormHTML);
        
        // Populate country dropdown
        populateCountryDropdown('newCountry');
        
        showProfileNotification('Add your shipping address details and click Save.');
    } else {
        showProfileNotification('Address form is already open!');
    }
};

// Function to populate country dropdown
function populateCountryDropdown(selectId) {
    const countries = [
        'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia',
        'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus',
        'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil',
        'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde',
        'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo',
        'Congo, Democratic Republic of the', 'Costa Rica', 'Côte d\'Ivoire', 'Croatia', 'Cuba', 'Cyprus',
        'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt',
        'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland',
        'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala',
        'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India',
        'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan',
        'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon',
        'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi',
        'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico',
        'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar',
        'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria',
        'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama',
        'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania',
        'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines',
        'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles',
        'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa',
        'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland',
        'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga',
        'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine',
        'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu',
        'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
    ];
    
    const select = document.getElementById(selectId);
    if (select) {
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country;
            select.appendChild(option);
        });
    }
}

// Edit Address functionality
window.editAddress = function(addressId) {
    console.log('Edit Address clicked:', addressId);
    
    const addressItem = document.querySelector('.address-item');
    if (!addressItem) {
        showProfileNotification('No address found to edit!');
        return;
    }
    
    const addressContent = addressItem.querySelector('.address-content');
    const currentText = addressContent.innerHTML;
    
    // Extract current address info
    const lines = addressContent.querySelectorAll('p');
    const addressLine = lines[0] ? lines[0].textContent : '';
    const statsLine = lines[1] ? lines[1].textContent : '';
    
    console.log('Current address content lines:');
    console.log('- Address line:', addressLine);
    console.log('- Stats line:', statsLine);
    
    // Parse the address line to extract individual components
    // The address line contains text separated by newlines, not <br> tags
    const addressParts = addressLine.split('\n').map(part => part.trim()).filter(part => part);
    console.log('Parsed address parts:', addressParts);
    
    const street = addressParts[0] || '';
    const city = addressParts[1] || '';
    const zipCode = addressParts[2] || '';
    const country = addressParts[3] || '';
    const stats = statsLine.includes('No stats') ? '' : statsLine.trim();
    
    // Also try to get the current address data from localStorage as primary source
    const savedAddress = localStorage.getItem('userAddress');
    let finalStreet = street;
    let finalCity = city;
    let finalZipCode = zipCode;
    let finalCountry = country;
    let finalStats = stats;
    
    if (savedAddress) {
        const parsedAddress = JSON.parse(savedAddress);
        console.log('Using localStorage address data as primary source:', parsedAddress);
        
        // Use localStorage values as they're more reliable
        finalStreet = parsedAddress.street || street;
        finalCity = parsedAddress.city || city;
        finalZipCode = parsedAddress.zipCode || zipCode;
        finalCountry = parsedAddress.country || country;
        finalStats = parsedAddress.stats || stats;
    }
    
    console.log('Final values for edit form:');
    console.log('- Street:', finalStreet);
    console.log('- City:', finalCity);
    console.log('- Zip Code:', finalZipCode);
    console.log('- Country:', finalCountry);
    console.log('- Stats:', finalStats);
    
    // Create edit form
    const editFormHTML = `
        <div class="address-edit-form" style="padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 1rem;">
            <h3>Edit Address</h3>
            <div class="form-group" style="margin-bottom: 1rem;">
                <label for="editStreet" style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text-dark);">Street Address:</label>
                <input type="text" id="editStreet" class="form-control" placeholder="Enter your street address" value="${finalStreet}" style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="form-group" style="margin-bottom: 1rem;">
                <label for="editCity" style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text-dark);">City:</label>
                <input type="text" id="editCity" class="form-control" placeholder="Enter your city" value="${finalCity}" style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="form-group" style="margin-bottom: 1rem;">
                <label for="editZipCode" style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text-dark);">Zip Code:</label>
                <input type="text" id="editZipCode" class="form-control" placeholder="Enter your zip code" value="${finalZipCode || ''}" style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div class="form-group" style="margin-bottom: 1rem;">
                <label for="editCountry" style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text-dark);">Country:</label>
                <select id="editCountry" class="form-control" style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
                    <option value="">Select a country</option>
                </select>
            </div>
            <div class="form-group" style="margin-bottom: 1rem;">
                <label for="editStats" style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text-dark);">Stats:</label>
                <input type="text" id="editStats" class="form-control" placeholder="Enter your stats" value="${finalStats || ''}" style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button class="btn btn-secondary" onclick="cancelEditAddress()">Cancel</button>
                <button class="btn btn-primary" onclick="saveEditedAddress('${addressId}')">Save Changes</button>
            </div>
        </div>
    `;
    
    // Replace address content with edit form
    addressContent.innerHTML = editFormHTML;
    
    // Populate country dropdown and set selected value
    populateCountryDropdown('editCountry');
    
    // Set the selected country value after populating
    setTimeout(() => {
        const editCountrySelect = document.getElementById('editCountry');
        if (editCountrySelect && finalCountry) {
            editCountrySelect.value = finalCountry;
        }
    }, 100);
    
    // Hide action buttons during editing
    const addressActions = document.querySelector('.address-actions');
    if (addressActions) {
        addressActions.style.display = 'none';
    }
    
    showProfileNotification('Edit the address details and click Save Changes');
};

// Cancel edit address
window.cancelEditAddress = function() {
    console.log('Cancel edit address clicked');
    location.reload(); // Simple way to restore original state
};

// Save edited address
window.saveEditedAddress = function(addressId) {
    console.log('Save edited address clicked:', addressId);
    
    const street = document.getElementById('editStreet')?.value;
    const city = document.getElementById('editCity')?.value;
    const zipCode = document.getElementById('editZipCode')?.value;
    const country = document.getElementById('editCountry')?.value;
    const stats = document.getElementById('editStats')?.value;
    
    console.log('=== EDIT ADDRESS DEBUG ===');
    console.log('Edit form values collected:');
    console.log('- Street:', street);
    console.log('- City:', city);
    console.log('- Zip Code:', zipCode);
    console.log('- Country:', country);
    console.log('- Stats:', stats);
    console.log('- Stats type:', typeof stats);
    console.log('- Stats length:', stats ? stats.length : 'null');
    
    if (!street) {
        showProfileNotification('Street address is required!');
        return;
    }
    
    const addressData = {
        street: street,
        city: city,
        zipCode: zipCode,
        country: country,
        stats: stats,
        isDefault: true
    };
    
    console.log('Edited address data object created:', addressData);
    console.log('Address data.stats:', addressData.stats);
    console.log('Address data.stats type:', typeof addressData.stats);
    console.log('Updating address in database...');
    
    // Try to update via backend API first
    if (window.API && window.API.UserAPI && window.API.UserAPI.updateAddress) {
        console.log('Updating address via backend API...');
        window.API.UserAPI.updateAddress('home', addressData)
            .then(response => {
                console.log('API response:', response);
                if (response.success) {
                    // Update UI with updated address
                    updateAddressDisplay(addressData);
                    
                    showProfileNotification('Address updated successfully!');
                    closeModal('addressesModal');
                } else {
                    throw new Error(response.message || 'Failed to update address');
                }
            })
            .catch(error => {
                console.log('API failed, using localStorage fallback:', error);
                updateAddressDisplay(addressData);
                showProfileNotification('Address updated locally!');
            });
    } else {
        console.log('API not available, using localStorage only...');
        updateAddressDisplay(addressData);
        showProfileNotification('Address updated locally!');
    }
};

// Update address display
function updateAddressDisplay(addressData) {
    console.log('Updating address display with data:', addressData);
    
    // Update the address display
    const addressContent = document.querySelector('.address-edit-form')?.parentElement || 
                          document.querySelector('.address-content');
    
    if (addressContent) {
        const displayHTML = `
            <h4>Home Address</h4>
            <p>${addressData.street}<br>${addressData.city}<br>${addressData.zipCode || ''}<br>${addressData.country || ''}</p>
            <p>${addressData.stats || 'No stats'}</p>
        `;
        console.log('Setting address content HTML:', displayHTML);
        addressContent.innerHTML = displayHTML;
    }
    
    // Show action buttons again
    const addressActions = document.querySelector('.address-actions');
    if (addressActions) {
        addressActions.style.display = 'flex';
    }
    
    // Save to localStorage for demo
    console.log('Saving to localStorage:', addressData);
    localStorage.setItem('userAddress', JSON.stringify(addressData));
}

// Delete Address functionality
window.deleteAddress = function(addressId) {
    console.log('Delete Address clicked:', addressId);
    if (confirm('Are you sure you want to delete this address?')) {
        // Try to delete via backend API first
        if (window.API && window.API.UserAPI && window.API.UserAPI.deleteAddress) {
            console.log('Deleting address via backend API...');
            window.API.UserAPI.deleteAddress('home')
                .then(response => {
                    console.log('API response:', response);
                    if (response.success) {
                        // Remove the address item from DOM
                        const addressItem = document.querySelector('.address-item');
                        if (addressItem) {
                            addressItem.style.opacity = '0.5';
                            setTimeout(() => {
                                addressItem.remove();
                                showProfileNotification('Address deleted successfully!');
                                
                                // Show empty state
                                const addressesList = document.querySelector('.addresses-list');
                                if (addressesList) {
                                    addressesList.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">No address set. Click "Add New Address" to add your shipping address.</p>';
                                }
                                
                                // Show "Add New Address" button since no address exists
                                const addAddressBtn = document.querySelector('button[onclick="addNewAddress()"]');
                                if (addAddressBtn) {
                                    addAddressBtn.style.display = 'inline-block';
                                }
                            }, 300);
                        }
                        
                        // Clear localStorage
                        localStorage.removeItem('userAddress');
                    } else {
                        throw new Error(response.message || 'Failed to delete address');
                    }
                })
                .catch(error => {
                    console.log('API failed, using localStorage fallback:', error);
                    deleteAddressLocally();
                });
        } else {
            console.log('API not available, using localStorage only...');
            deleteAddressLocally();
        }
    }
};

// Delete address locally (fallback)
function deleteAddressLocally() {
    // Remove the address item from DOM
    const addressItem = document.querySelector('.address-item');
    if (addressItem) {
        addressItem.style.opacity = '0.5';
        setTimeout(() => {
            addressItem.remove();
            showProfileNotification('Address deleted locally!');
            
            // Show empty state
            const addressesList = document.querySelector('.addresses-list');
            if (addressesList) {
                addressesList.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">No address set. Click "Add New Address" to add your shipping address.</p>';
            }
            
            // Show "Add New Address" button since no address exists
            const addAddressBtn = document.querySelector('button[onclick="addNewAddress()"]');
            if (addAddressBtn) {
                addAddressBtn.style.display = 'inline-block';
            }
        }, 300);
    }
    
    // Clear localStorage
    localStorage.removeItem('userAddress');
}

// Cancel address form
window.cancelAddressForm = function() {
    console.log('Cancel address form clicked');
    const addressForm = document.querySelector('.address-form');
    if (addressForm) {
        addressForm.remove();
        showProfileNotification('Address form cancelled');
    }
};

// Save new address
window.saveNewAddress = function() {
    console.log('Save new address clicked');
    
    const street = document.getElementById('newStreet')?.value;
    const city = document.getElementById('newCity')?.value;
    const zipCode = document.getElementById('newZipCode')?.value;
    const country = document.getElementById('newCountry')?.value;
    const stats = document.getElementById('newStats')?.value;
    
    console.log('=== ADD ADDRESS DEBUG ===');
    console.log('Form values collected:');
    console.log('- Street:', street);
    console.log('- City:', city);
    console.log('- Zip Code:', zipCode);
    console.log('- Country:', country);
    console.log('- Stats:', stats);
    console.log('- Stats type:', typeof stats);
    console.log('- Stats length:', stats ? stats.length : 'null');
    
    if (!street || !city) {
        showProfileNotification('Please fill in street and city fields!');
        return;
    }
    
    const addressData = {
        street: street,
        city: city,
        zipCode: zipCode,
        country: country,
        stats: stats,
        isDefault: true
    };
    
    console.log('Address data object created:', addressData);
    console.log('Address data.stats:', addressData.stats);
    console.log('Address data.stats type:', typeof addressData.stats);
    console.log('Saving address to database...');
    
    // Try to save to backend API first
    if (window.API && window.API.UserAPI && window.API.UserAPI.addAddress) {
        console.log('Saving address to backend API...');
        window.API.UserAPI.addAddress(addressData)
            .then(response => {
                console.log('API response:', response);
                if (response.success) {
                    // Update UI with saved address
                    updateAddressUI(response.data);
                    
                    // Remove the form
                    const addressForm = document.querySelector('.address-form');
                    if (addressForm) {
                        addressForm.remove();
                    }
                    
                    showProfileNotification('Address saved successfully!');
                    closeModal('addressesModal');
                } else {
                    throw new Error(response.message || 'Failed to save address');
                }
            })
            .catch(error => {
                console.log('API failed, using localStorage fallback:', error);
                saveAddressLocally(addressData);
            });
    } else {
        console.log('API not available, using localStorage only...');
        saveAddressLocally(addressData);
    }
};

// Save address locally (fallback)
function saveAddressLocally(addressData) {
    // Create new address item
    const newAddressHTML = `
        <div class="address-item" style="opacity: 0; transition: opacity 0.3s;">
            <div class="address-content">
                <h4>Home Address</h4>
                <p>${addressData.street}<br>${addressData.city}<br>${addressData.zipCode}<br>${addressData.country}</p>
                <p>${addressData.stats || 'No stats'}</p>
            </div>
            <div class="address-actions">
                <button class="btn btn-sm btn-primary" onclick="editAddress('home')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteAddress('home')">Delete</button>
            </div>
        </div>
    `;
    
    // Add to addresses list
    const addressesList = document.querySelector('.addresses-list');
    if (addressesList) {
        addressesList.insertAdjacentHTML('beforeend', newAddressHTML);
        
        // Remove the form
        const addressForm = document.querySelector('.address-form');
        if (addressForm) {
            addressForm.remove();
        }
        
        // Fade in the new address
        setTimeout(() => {
            const newAddress = addressesList.lastElementChild;
            if (newAddress) {
                newAddress.style.opacity = '1';
            }
        }, 100);
        
        showProfileNotification('Address saved locally!');
        
        // Save to localStorage for demo
        localStorage.setItem('userAddress', JSON.stringify(addressData));
    }
}

// Update address UI with data from backend
function updateAddressUI(addressData) {
    const newAddressHTML = `
        <div class="address-item" style="opacity: 0; transition: opacity 0.3s;">
            <div class="address-content">
                <h4>Home Address</h4>
                <p>${addressData.street}<br>${addressData.city}<br>${addressData.zipCode}<br>${addressData.country}</p>
                <p>${addressData.stats || 'No stats'}</p>
            </div>
            <div class="address-actions">
                <button class="btn btn-sm btn-primary" onclick="editAddress('home')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteAddress('home')">Delete</button>
            </div>
        </div>
    `;
    
    // Add to addresses list
    const addressesList = document.querySelector('.addresses-list');
    if (addressesList) {
        addressesList.insertAdjacentHTML('beforeend', newAddressHTML);
        
        // Fade in the new address
        setTimeout(() => {
            const newAddress = addressesList.lastElementChild;
            if (newAddress) {
                newAddress.style.opacity = '1';
            }
        }, 100);
    }
}

// Edit Payment Method functionality
window.editPaymentMethod = function(paymentId) {
    console.log('Edit Payment Method clicked:', paymentId);
    showProfileNotification('Payment method edit form would open here (demo mode)');
};

// Remove Payment Method functionality
window.removePaymentMethod = function(paymentId) {
    console.log('Remove Payment Method clicked:', paymentId);
    if (confirm('Are you sure you want to remove this payment method?')) {
        showProfileNotification('Payment method removed successfully!');
        // In real implementation, remove from data store
    }
};

// Add product to cart from profile page
function addProfileProductToCart(productId, productName, price) {
    const product = {
        id: productId,
        name: productName,
        price: price,
        image: `images/products/${productName}.png`
    };
    
    if (typeof addToCart === 'function') {
        addToCart(product);
    } else {
        // Fallback
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingIndex = cart.findIndex(item => item.id === productId);
        
        if (existingIndex > -1) {
            cart[existingIndex].quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: price,
                image: `images/products/${productName}.png`,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        showNotification('Product added to cart!');
    }
}

// Update cart count if function exists
if (typeof updateCartCount === 'function') {
    updateCartCount();
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}
