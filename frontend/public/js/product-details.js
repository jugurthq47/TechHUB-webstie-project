// Product Details JavaScript
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
    // Initialize dark mode first
    initializeDarkMode();
    
    const productId = getProductIdFromUrl();
    
    // Setup logo click handler
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
        logo.style.cursor = 'pointer';
    }
    
    // Setup profile icon click handler
    const profileIcon = document.querySelector('.profile-icon');
    if (profileIcon) {
        profileIcon.addEventListener('click', function() {
            window.location.href = 'profile.html';
        });
        profileIcon.style.cursor = 'pointer';
    }
    
    // Load product if ID exists
    if (productId) {
        currentProduct = findProductById(productId);
        if (currentProduct) {
            loadProductDetails();
            setupEventListeners();
            loadRelatedProducts();
        } else {
            showProductNotFound();
        }
    } else {
        showProductNotFound();
    }
    
    updateCartCount();
});

// Initialize dark mode
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = document.getElementById('darkModeIcon');
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (darkModeIcon) {
            darkModeIcon.classList.remove('fa-moon');
            darkModeIcon.classList.add('fa-sun');
        }
    }
    
    // Add dark mode toggle event listener
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
}

// Toggle dark mode
function toggleDarkMode() {
    const darkModeIcon = document.getElementById('darkModeIcon');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Set the new theme
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Update the icon
    if (darkModeIcon) {
        if (newTheme === 'dark') {
            darkModeIcon.classList.remove('fa-moon');
            darkModeIcon.classList.add('fa-sun');
        } else {
            darkModeIcon.classList.remove('fa-sun');
            darkModeIcon.classList.add('fa-moon');
        }
    }
    
    // Save the theme preference
    localStorage.setItem('theme', newTheme);
}

// Load product details
function loadProductDetails() {
    // Update basic product info
    document.getElementById('productTitle').textContent = currentProduct.name;
    document.getElementById('productName').textContent = currentProduct.name;
    document.getElementById('productPrice').textContent = `$${currentProduct.price.toFixed(2)}`;
    document.getElementById('productDescription').textContent = currentProduct.description;
    document.getElementById('detailedDescription').textContent = currentProduct.description;
    
    // Update image
    document.getElementById('productImage').src = currentProduct.image;
    document.getElementById('productImage').alt = currentProduct.name;
    
    // Update rating
    updateRating(currentProduct.rating);
    
    // Update stock information
    updateStockInfo(currentProduct.stock);
    
    // Update category link
    updateCategoryLink(currentProduct.category);
    
    // Load specifications
    loadSpecifications(currentProduct);
    
    // Load reviews
    loadReviews(currentProduct);
}

// Update rating display
function updateRating(rating) {
    const ratingValue = document.getElementById('ratingValue');
    const avgRating = document.getElementById('avgRating');
    const stars = document.querySelectorAll('#productRating i, #avgStars i');
    
    ratingValue.textContent = `${rating}/5`;
    avgRating.textContent = rating;
    
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    stars.forEach((star, index) => {
        if (index < fullStars) {
            star.className = 'fas fa-star';
        } else if (index === fullStars && hasHalfStar) {
            star.className = 'fas fa-star-half-alt';
        } else {
            star.className = 'far fa-star';
        }
    });
    
    document.getElementById('reviewCount').textContent = `(245 reviews)`;
    document.getElementById('totalReviews').textContent = `Based on 245 reviews`;
}

// Update stock information
function updateStockInfo(stock) {
    const stockStatus = document.getElementById('stockStatus');
    const stockCount = document.getElementById('stockCount');
    const addToCartBtn = document.getElementById('addToCartBtn');
    const buyNowBtn = document.getElementById('buyNowBtn');
    
    if (stock > 0) {
        stockStatus.innerHTML = '<i class="fas fa-check-circle"></i> In Stock';
        stockStatus.className = 'stock-status in-stock';
        stockCount.textContent = `${stock} items available`;
        addToCartBtn.disabled = false;
        buyNowBtn.disabled = false;
    } else {
        stockStatus.innerHTML = '<i class="fas fa-times-circle"></i> Out of Stock';
        stockStatus.className = 'stock-status out-of-stock';
        stockCount.textContent = 'Currently unavailable';
        addToCartBtn.disabled = true;
        buyNowBtn.disabled = true;
    }
}

// Update category link
function updateCategoryLink(category) {
    const categoryLink = document.getElementById('categoryLink');
    const categoryNames = {
        'processors': 'Processors',
        'graphics': 'Graphics Cards',
        'memory': 'Memory',
        'storage': 'Storage',
        'motherboards': 'Motherboards',
        'power': 'Power Supplies',
        'cooling': 'Cooling',
        'cases': 'PC Cases',
        'accessories': 'Accessories'
    };
    
    categoryLink.textContent = categoryNames[category] || 'Products';
    categoryLink.href = `index.html?category=${category}`;
}

// Load specifications
function loadSpecifications(product) {
    const specGrid = document.getElementById('specGrid');
    const specTable = document.getElementById('specTable');
    
    // Generate specifications based on category
    const specs = getSpecificationsByCategory(product);
    
    // Populate spec grid
    specGrid.innerHTML = '';
    specs.slice(0, 6).forEach(spec => {
        const specItem = document.createElement('div');
        specItem.className = 'spec-item';
        specItem.innerHTML = `
            <span class="spec-label">${spec.label}:</span>
            <span class="spec-value">${spec.value}</span>
        `;
        specGrid.appendChild(specItem);
    });
    
    // Populate spec table
    specTable.innerHTML = '';
    specs.forEach(spec => {
        const specRow = document.createElement('div');
        specRow.className = 'spec-row';
        specRow.innerHTML = `
            <div class="spec-label">${spec.label}</div>
            <div class="spec-value">${spec.value}</div>
        `;
        specTable.appendChild(specRow);
    });
}

// Get specifications based on product category
function getSpecificationsByCategory(product) {
    const baseSpecs = [
        { label: 'Brand', value: product.brand.toUpperCase() },
        { label: 'Category', value: product.category.charAt(0).toUpperCase() + product.category.slice(1) },
        { label: 'Warranty', value: '2 Years' },
        { label: 'Origin', value: 'Official' }
    ];
    
    const categorySpecs = {
        'processors': [
            { label: 'Socket', value: 'LGA 1700 / AM5' },
            { label: 'Cores', value: '8-16 Cores' },
            { label: 'Threads', value: '16-32 Threads' },
            { label: 'Base Clock', value: '3.2-4.2 GHz' },
            { label: 'Boost Clock', value: '5.0-5.8 GHz' },
            { label: 'TDP', value: '65W-125W' }
        ],
        'graphics': [
            { label: 'GPU Memory', value: '8GB-24GB GDDR6X' },
            { label: 'Memory Interface', value: '128-bit-384-bit' },
            { label: 'Boost Clock', value: '2.1-2.7 GHz' },
            { label: 'CUDA Cores', value: '5120-16384' },
            { label: 'Power Consumption', value: '285W-450W' },
            { label: 'Recommended PSU', value: '650W-850W' }
        ],
        'memory': [
            { label: 'Type', value: 'DDR5' },
            { label: 'Capacity', value: '16GB-32GB' },
            { label: 'Speed', value: '5200MHz-6000MHz' },
            { label: 'Timing', value: 'CL30-CL40' },
            { label: 'Voltage', value: '1.1V-1.35V' },
            { label: 'Heat Spreader', value: 'Aluminum' }
        ],
        'storage': [
            { label: 'Type', value: 'NVMe SSD' },
            { label: 'Capacity', value: '1TB-4TB' },
            { label: 'Interface', value: 'PCIe 4.0' },
            { label: 'Read Speed', value: 'Up to 7,300 MB/s' },
            { label: 'Write Speed', value: 'Up to 6,800 MB/s' },
            { label: 'Form Factor', value: 'M.2 2280' }
        ]
    };
    
    return [...baseSpecs, ...(categorySpecs[product.category] || [])];
}

// Load reviews
function loadReviews(product) {
    const reviewsList = document.getElementById('reviewsList');
    
    // Sample reviews
    const sampleReviews = [
        {
            name: 'John D.',
            rating: 5,
            date: '2024-01-15',
            comment: 'Excellent product! Exactly what I needed for my build.'
        },
        {
            name: 'Sarah M.',
            rating: 4,
            date: '2024-01-10',
            comment: 'Great quality, works perfectly. Fast shipping too!'
        },
        {
            name: 'Mike R.',
            rating: 5,
            date: '2024-01-05',
            comment: 'Outstanding performance. Highly recommend this product.'
        }
    ];
    
    reviewsList.innerHTML = '';
    sampleReviews.forEach(review => {
        const reviewElement = createReviewElement(review);
        reviewsList.appendChild(reviewElement);
    });
}

// Create review element
function createReviewElement(review) {
    const reviewDiv = document.createElement('div');
    reviewDiv.className = 'review-item';
    
    const stars = Array(5).fill(0).map((_, i) => 
        i < review.rating ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>'
    ).join('');
    
    reviewDiv.innerHTML = `
        <div class="review-header">
            <div class="reviewer-info">
                <span class="reviewer-name">${review.name}</span>
                <div class="review-rating">${stars}</div>
            </div>
            <span class="review-date">${review.date}</span>
        </div>
        <div class="review-comment">${review.comment}</div>
    `;
    
    return reviewDiv;
}

// Load related products
function loadRelatedProducts() {
    const relatedGrid = document.getElementById('relatedProductsGrid');
    const relatedProducts = products.filter(p => 
        p.category === currentProduct.category && p.id !== currentProduct.id
    ).slice(0, 4);
    
    relatedGrid.innerHTML = '';
    relatedProducts.forEach(product => {
        const productCard = createRelatedProductCard(product);
        relatedGrid.appendChild(productCard);
    });
}

// Create related product card
function createRelatedProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <div class="product-rating">
                ${generateStars(product.rating)}
                <span>${product.rating}</span>
            </div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart" onclick="viewProduct(${product.id})">
                View Details
            </button>
        </div>
    `;
    
    return card;
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Setup event listeners
function setupEventListeners() {
    // Quantity controls with error handling
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');
    const quantityInput = document.getElementById('quantity');
    
    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', decreaseQuantity);
    }
    if (increaseBtn) {
        increaseBtn.addEventListener('click', increaseQuantity);
    }
    if (quantityInput) {
        quantityInput.addEventListener('change', validateQuantity);
    }
    
    // Action buttons with error handling
    const addToCartBtn = document.getElementById('addToCartBtn');
    const buyNowBtn = document.getElementById('buyNowBtn');
    const wishlistBtn = document.getElementById('wishlistBtn');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', addToCart);
    }
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', buyNow);
    }
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', toggleWishlist);
    }
    
    // Tab functionality with error handling
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabButtons.length > 0 && tabPanes.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.dataset.tab;
                
                // Remove active class from all tabs and panes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding pane
                button.classList.add('active');
                const targetPane = document.getElementById(targetTab);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }
}

// Quantity controls
function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
}

function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    const maxValue = parseInt(quantityInput.max);
    if (currentValue < maxValue) {
        quantityInput.value = currentValue + 1;
    }
}

function validateQuantity() {
    const quantityInput = document.getElementById('quantity');
    let value = parseInt(quantityInput.value);
    
    if (isNaN(value) || value < 1) {
        quantityInput.value = 1;
    } else if (value > parseInt(quantityInput.max)) {
        quantityInput.value = quantityInput.max;
    }
}

// Add to cart
function addToCart() {
    if (!currentProduct || currentProduct.stock === 0) return;
    
    const quantity = parseInt(document.getElementById('quantity').value);
    
    // Use the global cart from script-standalone.js
    if (typeof cart !== 'undefined') {
        const existingItem = cart.find(item => item.id === currentProduct.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
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
        
        // Update cart display if function exists
        if (typeof updateCart === 'function') {
            updateCart();
        }
        
        showNotification(`${currentProduct.name} added to cart!`);
    }
}

// Buy now
function buyNow() {
    addToCart();
    window.location.href = 'index.html#cart';
}

// Toggle wishlist
function toggleWishlist() {
    const wishlistBtn = document.getElementById('wishlistBtn');
    const icon = wishlistBtn.querySelector('i');
    
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        showNotification('Added to wishlist!');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        showNotification('Removed from wishlist!');
    }
}

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// View product details
function viewProduct(productId) {
    window.location.href = `product-details.html?id=${productId}`;
}

// Show product not found
function showProductNotFound() {
    document.querySelector('.product-details').innerHTML = `
        <div class="container">
            <div class="not-found">
                <i class="fas fa-exclamation-triangle"></i>
                <h2>Product Not Found</h2>
                <p>The product you're looking for doesn't exist or has been removed.</p>
                <a href="index.html" class="btn btn-primary">Back to Products</a>
            </div>
        </div>
    `;
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide and remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}
