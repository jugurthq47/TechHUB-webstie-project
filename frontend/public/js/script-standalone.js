// Shopping cart
let cart = [];
let selectedAccessoryType = null;

// Dark mode functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = document.getElementById('darkModeIcon');

// DOM elements
const productGrid = document.getElementById('productGrid');
const categoryFilter = document.getElementById('categoryFilter');
const brandFilter = document.getElementById('brandFilter');
const sortFilter = document.getElementById('sortFilter');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');
const closeModal = document.querySelector('.close');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    initializeDarkMode();
    if (productGrid && categoryFilter && brandFilter && sortFilter && searchInput) {
        loadProducts();
    }
});

// Initialize dark mode
function initializeDarkMode() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
    }
    
    // Add dark mode toggle event listener
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
}

// Toggle dark mode
function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Set the new theme
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Update the icon
    if (newTheme === 'dark') {
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
    } else {
        darkModeIcon.classList.remove('fa-sun');
        darkModeIcon.classList.add('fa-moon');
    }
    
    // Save the theme preference
    localStorage.setItem('theme', newTheme);
}

// Load products from local data
function loadProducts() {
    try {
        renderProducts(products);
        updateBrandFilter(products);
    } catch (error) {
        console.error('Failed to load products:', error);
        showNotification('Failed to load products. Please try again.');
    }
}

// Setup event listeners
function setupEventListeners() {
    // Logo click to go to home
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
        logo.style.cursor = 'pointer';
    }
    
    const hasShopFilters = !!(categoryFilter && brandFilter && sortFilter && searchInput);
    
    if (hasShopFilters) {
        // Category filter
        categoryFilter.addEventListener('change', function() {
            selectedAccessoryType = null;
            updateBrandFilter(products);
            filterProducts();
        });
        
        // Brand filter
        brandFilter.addEventListener('change', filterProducts);
        
        // Sort filter
        sortFilter.addEventListener('change', filterProducts);
        
        // Search
        searchInput.addEventListener('input', debounce(filterProducts, 300));
        if (searchButton) {
            searchButton.addEventListener('click', performSearch);
        }
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
     
    // Cart modal
    if (cartIcon && cartModal) {
        cartIcon.addEventListener('click', openCartModal);
    }
    if (closeModal && cartModal) {
        closeModal.addEventListener('click', closeCartModal);
    }
    
    // Profile icon
    const profileIcon = document.querySelector('.profile-icon');
    if (profileIcon) {
        profileIcon.addEventListener('click', function() {
            window.location.href = 'profile.html';
        });
    }
    
    // Login/Signup buttons
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            window.location.href = 'login.html';
        });
    }
    
    if (signupBtn) {
        signupBtn.addEventListener('click', function() {
            window.location.href = 'signup.html';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (cartModal && e.target === cartModal) {
            closeCartModal();
        }
    });
    
    // Category cards
    if (hasShopFilters) {
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', function() {
                const category = this.dataset.category;
                categoryFilter.value = category;
                updateBrandFilter(products);
                filterProducts();
                const productsSection = document.getElementById('products');
                if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
    
    // Accessory cards
    if (hasShopFilters) {
        document.querySelectorAll('.accessory-card').forEach(card => {
            card.addEventListener('click', function() {
                selectedAccessoryType = this.dataset.category;
                categoryFilter.value = 'accessories';
                updateBrandFilter(products);
                filterProducts();
                const productsSection = document.getElementById('products');
                if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
    
    // Brand cards
    document.querySelectorAll('.brand-card').forEach(card => {
        card.addEventListener('click', function() {
            const brandName = this.getAttribute('data-brand') || '';
            if (brandFilter) {
                brandFilter.value = brandName;
                filterProducts();
                const productsSection = document.getElementById('products');
                if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const productsSection = document.getElementById('products');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Update brand filter based on available products
function updateBrandFilter(products) {
    if (!categoryFilter || !brandFilter) {
        return;
    }
    
    const category = categoryFilter.value;
    const previousBrand = brandFilter.value;
    
    // Get brands available for selected category
    let availableBrands = ['all'];
    
    if (category !== 'all') {
        const categoryProducts = products.filter(p => p.category === category);
        const brandSet = new Set(categoryProducts.map(p => p.brand));
        availableBrands = ['all', ...brandSet];
    } else {
        const brandSet = new Set(products.map(p => p.brand));
        availableBrands = ['all', ...brandSet];
    }
    
    // Update brand filter dropdown
    brandFilter.innerHTML = '';
    availableBrands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand === 'all' ? 'All Brands' : brand.charAt(0).toUpperCase() + brand.slice(1);
        brandFilter.appendChild(option);
    });
    
    const hasPrevious = Array.from(brandFilter.options).some(o => o.value === previousBrand);
    brandFilter.value = hasPrevious ? previousBrand : 'all';
}

// Filter products from local data
function filterProducts() {
    if (!categoryFilter || !brandFilter || !searchInput) {
        return;
    }
    
    try {
        let filteredProducts = [...products];
        
        // Filter by category
        if (categoryFilter.value !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.category === categoryFilter.value);
        }

        if (categoryFilter.value === 'accessories' && selectedAccessoryType) {
            filteredProducts = filteredProducts.filter(product => product.accessoryType === selectedAccessoryType);
        }
        
        // Filter by brand
        if (brandFilter.value !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.brand === brandFilter.value);
        }
        
        // Filter by search term
        if (searchInput.value) {
            const searchLower = searchInput.value.toLowerCase();
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(searchLower) ||
                product.description.toLowerCase().includes(searchLower) ||
                product.brand.toLowerCase().includes(searchLower)
            );
        }
        
        // Sort products
        switch (sortFilter.value) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'rating':
                filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            default: // featured
                // Keep original order
                break;
        }
        
        renderProducts(filteredProducts);
    } catch (error) {
        console.error('Failed to filter products:', error);
        showNotification('Failed to filter products. Please try again.');
    }
}

// Perform search and scroll to products
function performSearch() {
    filterProducts();
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Render products
function renderProducts(productsToRender) {
    if (!productGrid) {
        return;
    }
    
    productGrid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; font-size: 1.2rem; color: var(--text-light);">No products found.</p>';
        return;
    }
    
    productsToRender.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image" onclick="viewProduct(${product.id})">
            <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div class="product-info">
            <h3 onclick="viewProduct(${product.id})" style="cursor: pointer; color: var(--primary-color);">${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
        </div>
    `;
    return card;
}

// View product details
function viewProduct(productId) {
    window.location.href = `product-details.html?id=${productId}`;
}

// Add to cart
function addToCart(productId) {
    try {
        const product = products.find(p => p.id === productId);
        
        if (!product) {
            showNotification('Product not found!');
            return;
        }
        
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCart();
        showNotification(`${product.name} added to cart!`);
    } catch (error) {
        console.error('Failed to add product to cart:', error);
        showNotification('Failed to add product to cart. Please try again.');
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update cart display
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
    
    // Update cart modal
    renderCartItems();
    updateCartTotal();
}

// Render cart items
function renderCartItems() {
    if (!cartItems) {
        return;
    }
    
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: var(--text-light);">Your cart is empty.</p>';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <div class="cart-item-price">
                $${(item.price * item.quantity).toFixed(2)}
                <button onclick="removeFromCart(${item.id})" style="margin-left: 1rem; background: var(--danger-color); color: white; border: none; padding: 0.25rem 0.5rem; border-radius: 4px; cursor: pointer;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
}

// Update cart total
function updateCartTotal() {
    if (!cartTotal) {
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Open cart modal
function openCartModal() {
    if (!cartModal) {
        return;
    }
    cartModal.style.display = 'flex';
}

// Close cart modal
function closeCartModal() {
    if (!cartModal) {
        return;
    }
    cartModal.style.display = 'none';
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
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

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Checkout functionality
const checkoutBtn = document.querySelector('.checkout-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            showNotification('Your cart is empty!');
            return;
        }
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        if (confirm(`Proceed to checkout?\n\nItems: ${itemCount}\nTotal: $${total.toFixed(2)}`)) {
            showNotification('Order placed successfully! Thank you for your purchase.');
            cart = [];
            updateCart();
            closeCartModal();
        }
    });
}

// Add some interactivity to deal buttons
document.querySelectorAll('.deal-button').forEach(button => {
    button.addEventListener('click', function() {
        const dealText = this.parentElement.querySelector('h3').textContent;
        showNotification(`${dealText} - Check out our amazing deals!`);
        const productsSection = document.getElementById('products');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
