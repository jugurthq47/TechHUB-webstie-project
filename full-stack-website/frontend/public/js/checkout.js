// Checkout Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!window.API?.TokenService?.isLoggedIn()) {
        showNotification('Please login to checkout', 'error');
        sessionStorage.setItem('redirectAfterLogin', 'checkout.html');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return;
    }

    initializeCheckout();
    initializeDarkMode();
    setupLogoClick();
});

// Initialize checkout page
async function initializeCheckout() {
    await loadCartItems();
    await prefillUserInfo();
    setupPaymentMethodToggle();
    setupFormValidation();
    setupPlaceOrderButton();
    populateCountryDropdown('country');
}

// Load cart items for order summary
async function loadCartItems() {
    const orderItemsEl = document.getElementById('orderItems');
    
    try {
        const response = await window.API.CartAPI.get();
        
        if (!response.success || !response.data.items || response.data.items.length === 0) {
            orderItemsEl.innerHTML = `
                <div class="empty-cart-message">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <a href="index.html" class="btn-primary">Continue Shopping</a>
                </div>
            `;
            document.getElementById('placeOrderBtn').disabled = true;
            return;
        }

        const items = response.data.items;
        
        // Render items
        orderItemsEl.innerHTML = items.map(item => {
            // Extract image - handle different data structures
            const image = item.image || (item.product && item.product.image) || 'images/products/default.png';
            // Extract name - handle different data structures
            const name = item.name || (item.product && item.product.name) || 'Unknown Product';
            
            return `
            <div class="order-item">
                <img src="${image}" alt="${name}" class="order-item-image">
                <div class="order-item-details">
                    <h4>${name}</h4>
                    <span class="quantity">Qty: ${item.quantity}</span>
                </div>
                <span class="order-item-price">${window.formatDZD ? window.formatDZD(item.price * item.quantity) : (item.price * item.quantity).toFixed(2) + ' د.ج'}</span>
            </div>
            `;
        }).join('');

        // Calculate totals
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 100 ? 0 : 10; // Note: This is in USD, will be converted to DZD in display
        const tax = subtotal * 0.08;
        const total = subtotal + shipping + tax;

        document.getElementById('subtotal').textContent = window.formatDZD ? window.formatDZD(subtotal) : subtotal.toFixed(2) + ' د.ج';
        document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : (window.formatDZD ? window.formatDZD(shipping) : shipping.toFixed(2) + ' د.ج');
        document.getElementById('tax').textContent = window.formatDZD ? window.formatDZD(tax) : tax.toFixed(2) + ' د.ج';
        document.getElementById('total').textContent = window.formatDZD ? window.formatDZD(total) : total.toFixed(2) + ' د.ج';

    } catch (error) {
        console.error('Error loading cart:', error);
        orderItemsEl.innerHTML = `
            <div class="empty-cart-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>Error loading cart</p>
            </div>
        `;
    }
}

// Prefill user information
async function prefillUserInfo() {
    try {
        const response = await window.API.UserAPI.getProfile();
        
        if (response.success && response.data) {
            const user = response.data;
            
            document.getElementById('firstName').value = user.firstName || '';
            document.getElementById('lastName').value = user.lastName || '';
            document.getElementById('email').value = user.email || '';
            document.getElementById('phone').value = user.phone || '';

            // Fill default address if exists
            const defaultAddress = user.addresses?.find(addr => addr.isDefault) || user.addresses?.[0];
            if (defaultAddress) {
                document.getElementById('street').value = defaultAddress.street || '';
                document.getElementById('city').value = defaultAddress.city || '';
                document.getElementById('state').value = defaultAddress.state || '';
                document.getElementById('zipCode').value = defaultAddress.zipCode || '';
                
                // Set country value after dropdown is populated
                setTimeout(() => {
                    const countrySelect = document.getElementById('country');
                    if (countrySelect && defaultAddress.country) {
                        countrySelect.value = defaultAddress.country;
                    }
                }, 100);
            }
        }
    } catch (error) {
        console.error('Error prefilling user info:', error);
    }
}

// Setup payment method toggle
function setupPaymentMethodToggle() {
    const paymentInputs = document.querySelectorAll('input[name="paymentMethod"]');
    const cardDetails = document.getElementById('cardDetails');

    paymentInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.value === 'credit_card' || this.value === 'debit_card') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        });
    });

    // Format card number input
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/g, '');
            let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formatted;
        });
    }

    // Format expiry input
    const expiryInput = document.getElementById('expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2);
            }
            e.target.value = value;
        });
    }
}

// Setup form validation
function setupFormValidation() {
    const form = document.getElementById('checkoutForm');
    const inputs = form.querySelectorAll('input[required], select[required]');

    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('invalid')) {
                validateField(this);
            }
        });
    });
}

// Validate single field
function validateField(field) {
    const value = field.value.trim();
    
    if (!value) {
        field.classList.add('invalid');
        return false;
    }

    // Email validation
    if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        field.classList.add('invalid');
        return false;
    }

    field.classList.remove('invalid');
    return true;
}

// Validate entire form
function validateForm() {
    const form = document.getElementById('checkoutForm');
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    // Validate card details if card payment selected
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    if (paymentMethod === 'credit_card' || paymentMethod === 'debit_card') {
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
        const expiry = document.getElementById('expiry').value;
        const cvv = document.getElementById('cvv').value;
        const cardName = document.getElementById('cardName').value;

        if (!cardNumber || cardNumber.length < 13) {
            document.getElementById('cardNumber').classList.add('invalid');
            isValid = false;
        }
        if (!expiry || !/^\d{2}\/\d{2}$/.test(expiry)) {
            document.getElementById('expiry').classList.add('invalid');
            isValid = false;
        }
        if (!cvv || cvv.length < 3) {
            document.getElementById('cvv').classList.add('invalid');
            isValid = false;
        }
        if (!cardName) {
            document.getElementById('cardName').classList.add('invalid');
            isValid = false;
        }
    }

    return isValid;
}

// Setup place order button
function setupPlaceOrderButton() {
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    
    placeOrderBtn.addEventListener('click', async function() {
        if (!validateForm()) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Disable button and show loading
        placeOrderBtn.disabled = true;
        placeOrderBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

        try {
            const orderData = {
                shippingAddress: {
                    street: document.getElementById('street').value,
                    city: document.getElementById('city').value,
                    state: document.getElementById('state').value,
                    zipCode: document.getElementById('zipCode').value,
                    country: document.getElementById('country').value
                },
                paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value
            };

            const response = await window.API.OrdersAPI.create(orderData);

            if (response.success) {
                showNotification('Order placed successfully!', 'success');
                
                // Simulate payment processing for card payments
                const paymentMethod = orderData.paymentMethod;
                if (paymentMethod === 'credit_card' || paymentMethod === 'debit_card') {
                    // Simulate payment
                    await window.API.OrdersAPI.updatePayment(response.data._id, 'TXN' + Date.now());
                }

                // Redirect to order confirmation
                setTimeout(() => {
                    window.location.href = `order-confirmation.html?orderId=${response.data._id}`;
                }, 2000);
            }
        } catch (error) {
            showNotification(error.message || 'Failed to place order', 'error');
            placeOrderBtn.disabled = false;
            placeOrderBtn.innerHTML = '<i class="fas fa-lock"></i> Place Order';
        }
    });
}

// Setup logo click handler
function setupLogoClick() {
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
        logo.style.cursor = 'pointer';
    }
}

// Initialize dark mode
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = document.getElementById('darkModeIcon');
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (darkModeIcon) {
            darkModeIcon.classList.remove('fa-moon');
            darkModeIcon.classList.add('fa-sun');
        }
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            
            if (darkModeIcon) {
                if (newTheme === 'dark') {
                    darkModeIcon.classList.remove('fa-moon');
                    darkModeIcon.classList.add('fa-sun');
                } else {
                    darkModeIcon.classList.remove('fa-sun');
                    darkModeIcon.classList.add('fa-moon');
                }
            }
            
            localStorage.setItem('theme', newTheme);
        });
    }
}

// Show notification helper
function showNotification(message, type = 'info') {
    if (window.showNotification) {
        window.showNotification(message, type);
        return;
    }
    
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
        notification.remove();
    }, 3000);
}

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
