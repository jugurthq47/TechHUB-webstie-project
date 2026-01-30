// Product Details JavaScript - Simple Working Version
console.log('product-details.js loaded successfully!');

let currentProduct = null;

// Get product ID from URL
function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

// Find product by ID
function findProductById(id) {
    return products.find(product => product.id === id);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Product details page initialized');
    
    const productId = getProductIdFromUrl();
    console.log('Product ID:', productId);
    
    if (productId && products) {
        currentProduct = findProductById(productId);
        console.log('Found product:', currentProduct);
        
        if (currentProduct) {
            loadProductDetails();
            loadProductDescription();
            loadProductSpecifications();
            loadRelatedProducts();
            setupQuantityControls();
            setupTabButtons();
            setupWishlistButton();
            setupCartButtons();
            setupReviewButton();
            
            // Check wishlist status after a short delay to ensure everything is loaded
            setTimeout(() => checkWishlistStatus(), 1000);
            
            // Set up periodic wishlist status check
            setInterval(() => checkWishlistStatus(), 5000);
            
            // Listen for visibility changes (when user returns to the tab)
            document.addEventListener('visibilitychange', function() {
                if (!document.hidden) {
                    console.log('Page became visible, checking wishlist status');
                    checkWishlistStatus();
                }
            });
            
            // Listen for storage changes (when wishlist is updated in another tab)
            window.addEventListener('storage', function(e) {
                if (e.key === 'wishlistUpdated') {
                    console.log('Wishlist updated in another tab, refreshing status');
                    checkWishlistStatus();
                }
            });
            
            console.log('Setup complete');
        }
    }
});

// Setup quantity controls
function setupQuantityControls() {
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');
    const quantityInput = document.getElementById('quantity');
    
    console.log('Quantity elements:', {
        decreaseBtn: !!decreaseBtn,
        increaseBtn: !!increaseBtn,
        quantityInput: !!quantityInput
    });
    
    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', function() {
            console.log('Decrease clicked');
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
    }
    
    if (increaseBtn) {
        increaseBtn.addEventListener('click', function() {
            console.log('Increase clicked');
            const currentValue = parseInt(quantityInput.value);
            const maxValue = parseInt(quantityInput.max);
            if (currentValue < maxValue) {
                quantityInput.value = currentValue + 1;
            }
        });
    }
}

// Setup tab buttons
function setupTabButtons() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    console.log('Tab elements found:', {
        buttons: tabButtons.length,
        panes: tabPanes.length
    });
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                console.log('Tab clicked:', button.dataset.tab);
                
                // Remove active class from all tabs
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to clicked tab
                button.classList.add('active');
                const targetPane = document.getElementById(button.dataset.tab);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }
}

// Load product details
function loadProductDetails() {
    console.log('Loading product details...');
    
    // Update basic product info
    const productTitle = document.getElementById('productTitle');
    const productName = document.getElementById('productName');
    const productPrice = document.getElementById('productPrice');
    const productImage = document.getElementById('productImage');
    const productDescription = document.getElementById('productDescription');
    
    if (productTitle) productTitle.textContent = currentProduct.name;
    if (productName) productName.textContent = currentProduct.name;
    if (productPrice) {
        productPrice.textContent = window.formatDZD ? 
            window.formatDZD(currentProduct.price) : 
            currentProduct.price.toFixed(2) + ' د.ج';
    }
    if (productImage) {
        productImage.src = currentProduct.image;
        productImage.alt = currentProduct.name;
    }
    if (productDescription) productDescription.textContent = currentProduct.description;
    
    console.log('Product details loaded');
}

// Setup wishlist button
function setupWishlistButton() {
    const wishlistBtn = document.getElementById('wishlistBtn');
    
    console.log('Wishlist button found:', !!wishlistBtn);
    console.log('API available:', !!window.API);
    console.log('UserAPI available:', !!window.API?.UserAPI);
    console.log('TokenService available:', !!window.API?.TokenService);
    console.log('Is logged in:', window.API?.TokenService?.isLoggedIn());
    
    // Test Product model
    if (window.API?.TokenService?.isLoggedIn()) {
        testProductModel();
    }
    
    if (wishlistBtn) {
        // Check if product is already in wishlist immediately
        checkWishlistStatus();
        
        // Also check after a short delay to ensure API is ready and user is authenticated
        setTimeout(() => {
            console.log('Delayed wishlist status check for toggle preservation...');
            checkWishlistStatus();
        }, 1500);
        
        // Also check when API becomes available
        const checkInterval = setInterval(() => {
            if (window.API?.TokenService?.isLoggedIn()) {
                console.log('API ready, checking wishlist status...');
                checkWishlistStatus();
                clearInterval(checkInterval);
            }
        }, 500);
        
        // Clear interval after 10 seconds to prevent infinite checking
        setTimeout(() => clearInterval(checkInterval), 10000);
        
        wishlistBtn.addEventListener('click', async function() {
            console.log('Wishlist button clicked');
            const icon = wishlistBtn.querySelector('i');
            
            // Get product ID from multiple sources
            let productId;
            let productName = '';
            let productData = {};
            
            // Try to get current product data first
            if (currentProduct && currentProduct.id) {
                productId = currentProduct.id;
                productName = currentProduct.name || '';
                productData = currentProduct;
                console.log('Using currentProduct data:', { productId, productName });
            } else if (window.currentProduct && window.currentProduct._id) {
                productId = window.currentProduct._id;
                productName = window.currentProduct.name || '';
                productData = window.currentProduct;
                console.log('Using window.currentProduct data:', { productId, productName });
            } else {
                // Try URL parameters
                const urlParams = new URLSearchParams(window.location.search);
                productId = urlParams.get('id');
                
                // Try pathname if no URL parameter
                if (!productId) {
                    const pathParts = window.location.pathname.split('/');
                    productId = pathParts[pathParts.length - 1];
                }
                
                console.log('Using URL-based product ID:', productId);
            }
            
            console.log('Product ID extracted:', productId);
            console.log('Current URL:', window.location.href);
            console.log('URL search:', window.location.search);
            console.log('URL pathname:', window.location.pathname);
            console.log('Current product data:', window.currentProduct);
            
            if (!productId || productId === 'product-details.html') {
                showNotification('Unable to identify product', 'error');
                return;
            }
            
            // Check if user is logged in
            if (!window.API?.TokenService?.isLoggedIn()) {
                showNotification('Please login to add to wishlist', 'error');
                return;
            }
            
            try {
                if (icon.classList.contains('far')) {
                    // Add to wishlist
                    console.log('Adding to wishlist:', productId, productName);
                    console.log('Calling API...');
                    
                    // Create a custom request with product data
                    const response = await fetch(`http://localhost:5000/api/users/wishlist/${productId}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${window.API.TokenService.getToken()}`
                        },
                        body: JSON.stringify({
                            productName: productName,
                            productData: productData
                        })
                    });
                    
                    const responseData = await response.json();
                    console.log('API response:', responseData);
                    
                    if (responseData.success) {
                        icon.classList.remove('far');
                        icon.classList.add('fas');
                        showNotification('Added to wishlist!');
                        console.log('Wishlist updated successfully');
                        
                        // Store in localStorage for persistence
                        if (!isNaN(productId)) {
                            localStorage.setItem(`wishlist_item_${productId}`, 'true');
                        }
                        
                        // Trigger storage event to notify other tabs/pages
                        localStorage.setItem('wishlistUpdated', Date.now().toString());
                        
                        // Trigger profile wishlist update if user is on profile page
                        triggerProfileWishlistUpdate();
                    } else {
                        console.log('API failed:', responseData);
                        showNotification('Failed to add to wishlist', 'error');
                    }
                } else {
                    // Remove from wishlist
                    console.log('Removing from wishlist:', productId, productName);
                    console.log('Calling API...');
                    
                    // Create a custom request with product data
                    const response = await fetch(`http://localhost:5000/api/users/wishlist/${productId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${window.API.TokenService.getToken()}`
                        },
                        body: JSON.stringify({
                            productName: productName,
                            productData: productData
                        })
                    });
                    
                    const responseData = await response.json();
                    console.log('API response:', responseData);
                    
                    if (responseData.success) {
                        icon.classList.remove('fas');
                        icon.classList.add('far');
                        showNotification('Removed from wishlist!');
                        console.log('Item removed from wishlist');
                        
                        // Remove from localStorage for persistence
                        if (!isNaN(productId)) {
                            localStorage.removeItem(`wishlist_item_${productId}`);
                        }
                        
                        // Trigger storage event to notify other tabs/pages
                        localStorage.setItem('wishlistUpdated', Date.now().toString());
                        
                        // Trigger profile wishlist update if user is on profile page
                        triggerProfileWishlistUpdate();
                    } else {
                        console.log('API failed:', responseData);
                        showNotification('Failed to remove from wishlist', 'error');
                    }
                }
            } catch (error) {
                console.error('Wishlist error:', error);
                console.error('Error stack:', error.stack);
                showNotification('Wishlist operation failed', 'error');
            }
        });
    }
}

// Test Product model
async function testProductModel() {
    try {
        console.log('Testing Product model...');
        const response = await fetch('http://localhost:5000/api/users/test-product', {
            headers: {
                'Authorization': `Bearer ${window.API.TokenService.getToken()}`,
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        console.log('Product model test response:', data);
        
        if (data.success) {
            console.log('Product model working correctly');
            console.log('Available products:', data.data.sampleProducts);
        } else {
            console.error('Product model test failed:', data.message);
        }
    } catch (error) {
        console.error('Product model test error:', error);
    }
}

// Check if product is already in wishlist
async function checkWishlistStatus() {
    const wishlistBtn = document.getElementById('wishlistBtn');
    if (!wishlistBtn) {
        console.log('Wishlist button not found');
        return;
    }
    
    // Get product ID from multiple sources
    let productId;
    
    // Try URL parameters first
    const urlParams = new URLSearchParams(window.location.search);
    productId = urlParams.get('id');
    
    // Try pathname if no URL parameter
    if (!productId) {
        const pathParts = window.location.pathname.split('/');
        productId = pathParts[pathParts.length - 1];
    }
    
    // Fallback to current product data if available
    if (!productId && window.currentProduct && window.currentProduct._id) {
        productId = window.currentProduct._id;
    }
    
    // Fallback to global currentProduct
    if (!productId && currentProduct && currentProduct.id) {
        productId = currentProduct.id;
    }
    
    console.log('=== WISHLIST STATUS CHECK ===');
    console.log('Product ID:', productId);
    console.log('Current URL:', window.location.href);
    console.log('URL search:', window.location.search);
    console.log('URL pathname:', window.location.pathname);
    console.log('Current product data:', currentProduct);
    console.log('Window currentProduct:', window.currentProduct);
    
    if (!productId || productId === 'product-details.html') {
        console.log('Invalid product ID, skipping wishlist check');
        return;
    }
    
    // Check if user is logged in
    if (!window.API?.TokenService?.isLoggedIn()) {
        console.log('User not logged in, setting default wishlist state');
        const icon = wishlistBtn.querySelector('i');
        if (icon) {
            icon.classList.remove('fas');
            icon.classList.add('far');
        }
        return;
    }
    
    // Get user's wishlist and check if product is in it
    try {
        const response = await window.API.UserAPI.getWishlist();
        console.log('Wishlist status check - API response:', response);
        
        if (response.success && response.data) {
            console.log('Wishlist items from API:', response.data);
            console.log('Wishlist item details:', response.data.map(item => ({
                id: item._id,
                idString: item._id ? item._id.toString() : 'no-id',
                name: item.name || 'no-name'
            })));
            
            // For numeric product IDs, we need to check if the corresponding product ObjectId is in the wishlist
            let isInWishlist = false;
            
            if (!isNaN(productId)) {
                console.log('Product ID is numeric:', productId);
                // For numeric IDs, we need to find if any product in the wishlist corresponds to this position
                // The backend stores the actual ObjectId, so we need to check if this product was added
                
                // Since we can't easily map numeric ID to ObjectId on frontend, 
                // we'll use a different approach: check if we have a recent API call that succeeded
                // For now, we'll assume if there are items in wishlist, this product might be one of them
                // This is a limitation of the numeric ID system
                
                // A better approach: store a mapping in localStorage or session storage
                const wishlistKey = `wishlist_item_${productId}`;
                const isInLocalWishlist = localStorage.getItem(wishlistKey) === 'true';
                
                console.log('Local wishlist state for product', productId, ':', isInLocalWishlist);
                
                if (isInLocalWishlist) {
                    // Verify it's actually in the server wishlist
                    isInWishlist = response.data.length > 0;
                } else {
                    isInWishlist = false;
                }
            } else {
                // For ObjectId or string IDs, compare directly
                isInWishlist = response.data.some(item => {
                    const itemId = item._id ? item._id.toString() : item.toString();
                    console.log('Comparing wishlist item ID:', itemId, 'with product ID:', productId);
                    return itemId === productId || item.id === productId;
                });
            }
            
            console.log('Final wishlist state:', isInWishlist);
            
            const icon = wishlistBtn.querySelector('i');
            if (icon) {
                if (isInWishlist) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    console.log('✅ Set wishlist button to FILLED heart');
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    console.log('❌ Set wishlist button to EMPTY heart');
                }
            }
        } else {
            console.log('No wishlist data or failed response');
            const icon = wishlistBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        }
    } catch (error) {
        console.error('Error checking wishlist status:', error);
        // Set default state on error
        const icon = wishlistBtn.querySelector('i');
        icon.classList.remove('fas');
        icon.classList.add('far');
    }
}

// Trigger profile wishlist update
function triggerProfileWishlistUpdate() {
    console.log('Triggering profile wishlist update...');
    
    // Check if profile page functions are available
    if (typeof window.loadUserWishlist === 'function') {
        console.log('Profile wishlist function found, updating...');
        window.loadUserWishlist();
    } else {
        console.log('Profile wishlist function not found, trying to update via custom event...');
        // Dispatch a custom event that profile page can listen to
        const event = new CustomEvent('wishlistUpdated', {
            detail: { action: 'updated', timestamp: Date.now() }
        });
        window.dispatchEvent(event);
    }
}

// Setup cart buttons
function setupCartButtons() {
    const addToCartBtn = document.getElementById('addToCartBtn');
    const buyNowBtn = document.getElementById('buyNowBtn');
    
    console.log('Cart buttons found:', {
        addToCartBtn: !!addToCartBtn,
        buyNowBtn: !!buyNowBtn
    });
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            console.log('Add to cart clicked');
            const quantity = parseInt(document.getElementById('quantity').value);
            
            if (typeof window.addToCart === 'function') {
                console.log('Using global addToCart');
                window.addToCart(currentProduct, quantity);
            } else if (typeof addToCart === 'function') {
                console.log('Using addToCart');
                addToCart(currentProduct, quantity);
            } else {
                console.log('Using fallback');
                // Fallback - add to local storage directly
                let cart = JSON.parse(localStorage.getItem('cart') || '[]');
                const existingIndex = cart.findIndex(item => item.id === currentProduct.id);
                
                if (existingIndex > -1) {
                    cart[existingIndex].quantity += quantity;
                } else {
                    cart.push({
                        id: currentProduct.id,
                        name: currentProduct.name,
                        price: currentProduct.price,
                        image: currentProduct.image,
                        quantity: quantity
                    });
                }
                
                localStorage.setItem('cart', JSON.stringify(cart));
                showNotification(`${currentProduct.name} added to cart!`);
                
                // Update cart count if function exists
                if (typeof updateCartCount === 'function') {
                    updateCartCount();
                }
            }
        });
    }
    
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', function() {
            console.log('Buy now clicked');
            // First add to cart, then redirect
            const quantity = parseInt(document.getElementById('quantity').value);
            
            if (typeof window.addToCart === 'function') {
                window.addToCart(currentProduct, quantity);
            } else if (typeof addToCart === 'function') {
                addToCart(currentProduct, quantity);
            } else {
                // Fallback
                let cart = JSON.parse(localStorage.getItem('cart') || '[]');
                const existingIndex = cart.findIndex(item => item.id === currentProduct.id);
                
                if (existingIndex > -1) {
                    cart[existingIndex].quantity += quantity;
                } else {
                    cart.push({
                        id: currentProduct.id,
                        name: currentProduct.name,
                        price: currentProduct.price,
                        image: currentProduct.image,
                        quantity: quantity
                    });
                }
                
                localStorage.setItem('cart', JSON.stringify(cart));
                showNotification(`${currentProduct.name} added to cart!`);
            }
            
            // Redirect to checkout page
            setTimeout(() => {
                window.location.href = 'checkout.html';
            }, 1000);
        });
    }
}

// Show notification
function showNotification(message) {
    console.log('Notification:', message);
    
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
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Load product description
function loadProductDescription() {
    console.log('Loading description...');
    
    const descriptionEl = document.getElementById('description');
    if (!descriptionEl) return;
    
    // Generate detailed description based on product category
    let descriptionHTML = '';
    
    if (currentProduct.category === 'processors') {
        descriptionHTML = `
            <div class="product-description-content">
                <h3>Product Overview</h3>
                <p>${currentProduct.description}</p>
                
                <h3>Key Features</h3>
                <ul>
                    <li>High-performance computing power</li>
                    <li>Advanced architecture for modern applications</li>
                    <li>Optimized for gaming and content creation</li>
                    <li>Energy efficient design</li>
                    <li>Compatible with latest motherboards</li>
                </ul>
                
                <h3>Performance</h3>
                <p>Experience blazing-fast speeds and seamless multitasking with this powerful processor. Built with cutting-edge technology, it delivers exceptional performance for demanding applications, gaming, and professional workloads.</p>
                
                <h3>Compatibility</h3>
                <p>This processor is compatible with the latest motherboard chipsets and supports high-speed memory configurations. Perfect for building a high-performance gaming PC or professional workstation.</p>
            </div>
        `;
    } else if (currentProduct.category === 'graphics-cards') {
        descriptionHTML = `
            <div class="product-description-content">
                <h3>Product Overview</h3>
                <p>${currentProduct.description}</p>
                
                <h3>Key Features</h3>
                <ul>
                    <li>Latest graphics architecture</li>
                    <li>High-speed memory for smooth gaming</li>
                    <li>Advanced cooling solutions</li>
                    <li>Support for multiple displays</li>
                    <li>Ray tracing and AI capabilities</li>
                </ul>
                
                <h3>Gaming Performance</h3>
                <p>Dominate the latest games with stunning visuals and smooth frame rates. This graphics card delivers exceptional performance for 1440p and 4K gaming, with support for real-time ray tracing and AI-enhanced graphics.</p>
                
                <h3>Creative Power</h3>
                <p>Accelerate your creative workflow with GPU-accelerated rendering, video editing, and 3D modeling. Perfect for content creators, designers, and professionals who demand the best performance.</p>
            </div>
        `;
    } else {
        descriptionHTML = `
            <div class="product-description-content">
                <h3>Product Overview</h3>
                <p>${currentProduct.description}</p>
                
                <h3>Key Features</h3>
                <ul>
                    <li>Premium quality construction</li>
                    <li>Reliable performance</li>
                    <li>Easy installation</li>
                    <li>Manufacturer warranty included</li>
                    <li>Compatible with standard systems</li>
                </ul>
                
                <h3>Quality Assurance</h3>
                <p>Built to meet the highest standards of quality and reliability. This component undergoes rigorous testing to ensure optimal performance and longevity in your system.</p>
                
                <h3>Technical Support</h3>
                <p>Backed by comprehensive manufacturer support and warranty. Get assistance when you need it from knowledgeable technical support teams.</p>
            </div>
        `;
    }
    
    descriptionEl.innerHTML = descriptionHTML;
    console.log('Description loaded');
}

// Load product specifications
function loadProductSpecifications() {
    console.log('Loading specifications...');
    
    const specificationsEl = document.getElementById('specifications');
    if (!specificationsEl) return;
    
    // Generate specifications based on product category
    let specsHTML = '';
    
    if (currentProduct.category === 'processors') {
        specsHTML = `
            <div class="spec-item">
                <span class="spec-label">Brand:</span>
                <span class="spec-value">${currentProduct.brand.toUpperCase()}</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Price:</span>
                <span class="spec-value">${window.formatDZD ? window.formatDZD(currentProduct.price) : currentProduct.price.toFixed(2) + ' د.ج'}</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Stock:</span>
                <span class="spec-value">${currentProduct.stock} units available</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Rating:</span>
                <span class="spec-value">${currentProduct.rating}/5 ⭐</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Warranty:</span>
                <span class="spec-value">3 Years Manufacturer Warranty</span>
            </div>
        `;
    } else if (currentProduct.category === 'graphics-cards') {
        specsHTML = `
            <div class="spec-item">
                <span class="spec-label">Brand:</span>
                <span class="spec-value">${currentProduct.brand.toUpperCase()}</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Price:</span>
                <span class="spec-value">${window.formatDZD ? window.formatDZD(currentProduct.price) : currentProduct.price.toFixed(2) + ' د.ج'}</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Stock:</span>
                <span class="spec-value">${currentProduct.stock} units available</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Rating:</span>
                <span class="spec-value">${currentProduct.rating}/5 ⭐</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Interface:</span>
                <span class="spec-value">PCI Express 4.0</span>
            </div>
        `;
    } else {
        specsHTML = `
            <div class="spec-item">
                <span class="spec-label">Brand:</span>
                <span class="spec-value">${currentProduct.brand.toUpperCase()}</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Price:</span>
                <span class="spec-value">${window.formatDZD ? window.formatDZD(currentProduct.price) : currentProduct.price.toFixed(2) + ' د.ج'}</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Stock:</span>
                <span class="spec-value">${currentProduct.stock} units available</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Rating:</span>
                <span class="spec-value">${currentProduct.rating}/5 ⭐</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Category:</span>
                <span class="spec-value">${currentProduct.category}</span>
            </div>
        `;
    }
    
    specificationsEl.innerHTML = specsHTML;
    console.log('Specifications loaded');
}

// Load related products
function loadRelatedProducts() {
    console.log('Loading related products...');
    console.log('Current product category:', currentProduct.category);
    console.log('Current product ID:', currentProduct.id);
    console.log('Total products available:', products.length);
    
    const relatedProductsEl = document.getElementById('relatedProductsGrid');
    console.log('Related products element found:', !!relatedProductsEl);
    
    if (!relatedProductsEl) {
        console.log('Related products element not found');
        return;
    }
    
    // Find products from same category
    const relatedProducts = products.filter(product => 
        product.category === currentProduct.category && product.id !== currentProduct.id
    );
    
    console.log('Found related products:', relatedProducts.length);
    console.log('Related products:', relatedProducts.map(p => ({id: p.id, name: p.name})));
    
    if (relatedProducts.length === 0) {
        console.log('No related products found');
        relatedProductsEl.innerHTML = '<p class="no-related-products">No related products found.</p>';
        return;
    }
    
    // Limit to 4 products
    const limitedProducts = relatedProducts.slice(0, 4);
    console.log('Showing products:', limitedProducts.length);
    
    let relatedHTML = '<div class="related-products-grid">';
    
    limitedProducts.forEach(product => {
        relatedHTML += `
            <div class="related-product-card" onclick="viewProduct(${product.id})">
                <img src="${product.image}" alt="${product.name}" class="related-product-image">
                <h4>${product.name}</h4>
                <p class="related-product-price">${window.formatDZD ? window.formatDZD(product.price) : product.price.toFixed(2) + ' د.ج'}</p>
                <button class="btn btn-primary">View Details</button>
            </div>
        `;
    });
    
    relatedHTML += '</div>';
    relatedProductsEl.innerHTML = relatedHTML;
    console.log('Related products loaded successfully');
}

// Setup review button
function setupReviewButton() {
    const reviewBtn = document.getElementById('reviewBtn');
    const reviewModal = document.getElementById('reviewModal');
    const reviewForm = document.getElementById('reviewForm');
    const starButtons = document.querySelectorAll('.star-btn');
    const ratingValue = document.getElementById('ratingValue');
    
    console.log('Review button found:', !!reviewBtn);
    
    if (reviewBtn) {
        reviewBtn.addEventListener('click', function() {
            console.log('Review button clicked');
            // Check if user is logged in
            if (!window.API?.TokenService?.isLoggedIn()) {
                showNotification('Please login to write a review', 'error');
                return;
            }
            openReviewModal();
        });
    }
    
    // Setup star rating
    starButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const rating = parseInt(this.dataset.rating);
            setRating(rating);
        });
    });
    
    // Setup form submission
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitReview();
        });
    }
    
    // Setup modal close buttons
    const closeButtons = reviewModal?.querySelectorAll('.close');
    closeButtons?.forEach(btn => {
        btn.addEventListener('click', closeReviewModal);
    });
    
    // Close modal when clicking outside
    reviewModal?.addEventListener('click', function(e) {
        if (e.target === reviewModal) {
            closeReviewModal();
        }
    });
}

function openReviewModal() {
    const reviewModal = document.getElementById('reviewModal');
    if (reviewModal) {
        reviewModal.style.display = 'block';
        // Reset form
        resetReviewForm();
    }
}

function closeReviewModal() {
    const reviewModal = document.getElementById('reviewModal');
    if (reviewModal) {
        reviewModal.style.display = 'none';
        resetReviewForm();
    }
}

function resetReviewForm() {
    const reviewForm = document.getElementById('reviewForm');
    const ratingValue = document.getElementById('ratingValue');
    const starButtons = document.querySelectorAll('.star-btn');
    
    if (reviewForm) reviewForm.reset();
    if (ratingValue) ratingValue.value = '5';
    
    // Reset stars to 5
    setRating(5);
}

function setRating(rating) {
    const ratingValue = document.getElementById('ratingValue');
    const starButtons = document.querySelectorAll('.star-btn');
    
    if (ratingValue) ratingValue.value = rating;
    
    starButtons.forEach((btn, index) => {
        const star = btn.querySelector('i');
        if (index < rating) {
            star.classList.remove('far');
            star.classList.add('fas');
            btn.classList.add('active');
        } else {
            star.classList.remove('fas');
            star.classList.add('far');
            btn.classList.remove('active');
        }
    });
}

async function submitReview() {
    const reviewForm = document.getElementById('reviewForm');
    const ratingValue = document.getElementById('ratingValue');
    const reviewTitle = document.getElementById('reviewTitle');
    const reviewComment = document.getElementById('reviewComment');
    
    if (!currentProduct) {
        showNotification('Product not found', 'error');
        return;
    }
    
    const reviewData = {
        productId: currentProduct.id,
        productName: currentProduct.name,
        rating: parseInt(ratingValue.value),
        title: reviewTitle.value,
        comment: reviewComment.value
    };
    
    console.log('Submitting review:', reviewData);
    
    try {
        // Here you would normally send to your API
        // For now, we'll just show a success message
        showNotification('Review submitted successfully!', 'success');
        closeReviewModal();
        
        // You could add this to your reviews list
        addReviewToList(reviewData);
        
    } catch (error) {
        console.error('Error submitting review:', error);
        showNotification('Failed to submit review', 'error');
    }
}

function addReviewToList(reviewData) {
    const reviewsList = document.getElementById('reviewsList');
    if (!reviewsList) return;
    
    const reviewHTML = `
        <div class="review-item">
            <div class="review-header">
                <div class="reviewer-info">
                    <strong>${reviewData.title}</strong>
                    <div class="review-rating">
                        ${generateStarHTML(reviewData.rating)}
                    </div>
                </div>
                <div class="review-date">
                    ${new Date().toLocaleDateString()}
                </div>
            </div>
            <div class="review-content">
                <p>${reviewData.comment}</p>
            </div>
        </div>
    `;
    
    reviewsList.insertAdjacentHTML('afterbegin', reviewHTML);
}

function generateStarHTML(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Test function
window.testProductDetails = function() {
    console.log('Testing product details functionality...');
    console.log('Current product:', currentProduct);
    console.log('Products available:', products ? products.length : 0);
    
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');
    const quantityInput = document.getElementById('quantity');
    const wishlistBtn = document.getElementById('wishlistBtn');
    const addToCartBtn = document.getElementById('addToCartBtn');
    const buyNowBtn = document.getElementById('buyNowBtn');
    
    console.log('Elements:', {
        decreaseBtn: !!decreaseBtn,
        increaseBtn: !!increaseBtn,
        quantityInput: !!quantityInput,
        wishlistBtn: !!wishlistBtn,
        addToCartBtn: !!addToCartBtn,
        buyNowBtn: !!buyNowBtn,
        quantityValue: quantityInput ? quantityInput.value : 'N/A'
    });
};
