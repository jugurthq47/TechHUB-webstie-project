// Cart functionality with API integration

// Cart state
let cartItems = [];
let isLoggedIn = false;

// Initialize cart
document.addEventListener('DOMContentLoaded', function() {
    isLoggedIn = window.API?.TokenService?.isLoggedIn() || false;
    loadCart();
    setupCartEventListeners();
});

// Load cart from API or local storage
async function loadCart() {
    if (isLoggedIn) {
        try {
            const response = await window.API.CartAPI.get();
            if (response.success) {
                cartItems = response.data.items || [];
                updateCartUI();
            }
        } catch (error) {
            console.error('Error loading cart:', error);
            loadLocalCart();
        }
    } else {
        loadLocalCart();
    }
}

// Load cart from local storage
function loadLocalCart() {
    cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    updateCartUI();
}

// Save cart to local storage
function saveLocalCart() {
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Add item to cart
async function addToCart(product, quantity = 1) {
    if (isLoggedIn) {
        try {
            // Send product name and data for better backend resolution
            const response = await window.API.CartAPI.add(
                product.id || product._id,
                quantity,
                product.name,
                product
            );
            if (response.success) {
                cartItems = response.data.items;
                updateCartUI();
                showNotification('Added to cart!', 'success');
            }
        } catch (error) {
            showNotification(error.message || 'Failed to add to cart', 'error');
        }
    } else {
        // Local cart for non-logged in users
        const productId = product.id || product._id;
        const existingIndex = cartItems.findIndex(item => {
            const itemProductId = item.product?._id || item.product || item.id;
            return itemProductId === productId;
        });

        if (existingIndex > -1) {
            cartItems[existingIndex].quantity += quantity;
        } else {
            cartItems.push({
                product: productId,
                id: productId,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        saveLocalCart();
        updateCartUI();
        showNotification('Added to cart!', 'success');
    }
}

// Remove item from cart
async function removeFromCart(productId) {
    console.log('removeFromCart called with productId:', productId);
    console.log('productId type:', typeof productId);
    console.log('productId === undefined:', productId === undefined);

    if (isLoggedIn) {
        try {
            console.log('Calling API remove with productId:', productId);
            const response = await window.API.CartAPI.remove(productId);
            if (response.success) {
                cartItems = response.data.items;
                updateCartUI();
                showNotification('Item removed from cart', 'success');
            }
        } catch (error) {
            showNotification(error.message || 'Failed to remove item', 'error');
        }
    } else {
        cartItems = cartItems.filter(item => {
            let itemProductId;
            if (item.product && typeof item.product === 'object') {
                itemProductId = item.product._id || item.product.id;
            } else if (item.product && typeof item.product === 'string') {
                itemProductId = item.product;
            } else {
                itemProductId = item.id;
            }
            itemProductId = itemProductId ? itemProductId.toString() : 'undefined';
            return itemProductId !== productId;
        });
        saveLocalCart();
        updateCartUI();
        showNotification('Item removed from cart', 'success');
    }
}

// Update item quantity
async function updateCartQuantity(productId, quantity) {
    console.log('updateCartQuantity called with productId:', productId, 'quantity:', quantity);
    console.log('productId type:', typeof productId);
    console.log('productId === undefined:', productId === undefined);

    if (quantity <= 0) {
        return removeFromCart(productId);
    }

    if (isLoggedIn) {
        try {
            console.log('Calling API update with productId:', productId);
            const response = await window.API.CartAPI.update(productId, quantity);
            if (response.success) {
                cartItems = response.data.items;
                updateCartUI();
            }
        } catch (error) {
            showNotification(error.message || 'Failed to update quantity', 'error');
        }
    } else {
        const item = cartItems.find(item => {
            let itemProductId;
            if (item.product && typeof item.product === 'object') {
                itemProductId = item.product._id || item.product.id;
            } else if (item.product && typeof item.product === 'string') {
                itemProductId = item.product;
            } else {
                itemProductId = item.id;
            }
            itemProductId = itemProductId ? itemProductId.toString() : 'undefined';
            return itemProductId === productId;
        });
        if (item) {
            item.quantity = quantity;
            saveLocalCart();
            updateCartUI();
        }
    }
}

// Clear cart
async function clearCart() {
    if (isLoggedIn) {
        try {
            const response = await window.API.CartAPI.clear();
            if (response.success) {
                cartItems = [];
                updateCartUI();
            }
        } catch (error) {
            showNotification(error.message || 'Failed to clear cart', 'error');
        }
    } else {
        cartItems = [];
        saveLocalCart();
        updateCartUI();
    }
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const cartCountEl = document.querySelector('.cart-count');
    if (cartCountEl) {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        cartCountEl.textContent = totalItems;
    }

    // Update cart modal content
    const cartItemsEl = document.getElementById('cartItems');
    const cartTotalEl = document.getElementById('cartTotal');

    if (cartItemsEl) {
        if (cartItems.length === 0) {
            cartItemsEl.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        } else {
            cartItemsEl.innerHTML = cartItems.map(item => {
                // Extract product ID - handle different data structures
                let productId;
                console.log('Cart item structure:', JSON.stringify(item, null, 2));

                if (item.product && typeof item.product === 'object') {
                    // If product is populated object
                    productId = item.product._id || item.product.id;
                    console.log('Product is object, extracted ID:', productId);
                } else if (item.product && typeof item.product === 'string') {
                    // If product is ObjectId string
                    productId = item.product;
                    console.log('Product is string, extracted ID:', productId);
                } else {
                    // Fallback to item.id
                    productId = item.id;
                    console.log('Using fallback item.id:', productId);
                }

                // Ensure productId is a string
                productId = productId ? productId.toString() : 'undefined';
                console.log('Final productId for cart item:', productId);
                // Extract image - handle different data structures
                const image = item.image || (item.product && item.product.image) || 'images/products/default.png';
                // Extract name - handle different data structures
                const name = item.name || (item.product && item.product.name) || 'Unknown Product';
                // Extract price - handle different data structures
                const price = item.price || (item.product && item.product.price) || 0;

                return `
                <div class="cart-item" data-id="${productId}">
                    <img src="${image}" alt="${name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4>${name}</h4>
                        <p class="cart-item-price">${window.formatDZD ? window.formatDZD(price) : price.toFixed(2) + ' د.ج'}</p>
                        <div class="cart-item-quantity">
                            <button class="qty-btn minus" onclick="updateCartQuantity('${productId}', ${item.quantity - 1})">-</button>
                            <span>${item.quantity}</span>
                            <button class="qty-btn plus" onclick="updateCartQuantity('${productId}', ${item.quantity + 1})">+</button>
                        </div>
                    </div>
                    <button class="remove-item" onclick="removeFromCart('${productId}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            }).join('');
        }
    }

    if (cartTotalEl) {
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalEl.textContent = window.formatDZD ? window.formatDZD(total) : total.toFixed(2) + ' د.ج';
    }
}

// Setup cart event listeners
function setupCartEventListeners() {
    // Cart icon click
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.getElementById('cartModal');
    const closeModal = document.querySelector('.close-modal');

    if (cartIcon && cartModal) {
        cartIcon.addEventListener('click', () => {
            cartModal.style.display = 'flex';
            loadCart(); // Refresh cart when opening modal
        });
    }

    if (closeModal && cartModal) {
        closeModal.addEventListener('click', () => {
            cartModal.style.display = 'none';
        });
    }

    // Close modal on outside click
    if (cartModal) {
        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.style.display = 'none';
            }
        });
    }

    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
}


// Make functions globally available
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.clearCart = clearCart;
window.loadCart = loadCart;
window.syncCartToServer = syncCartToServer;