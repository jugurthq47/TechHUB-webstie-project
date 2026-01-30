// Main script for index.html - Product listing and cart functionality
console.log('script.js loaded successfully!');

// Products will be loaded from database
let products = [];

// Load products from database
async function loadProductsFromDatabase() {
    try {
        const response = await fetch('http://localhost:5000/api/products');
        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                products = data.data.map(product => ({
                    id: product._id,
                    name: product.name,
                    category: product.category,
                    brand: product.brand,
                    price: product.price,
                    description: product.description,
                    image: product.image || 'https://via.placeholder.com/280x200/1f2937/ffffff?text=Product',
                    stock: product.stock,
                    rating: product.rating || 0
                }));
                console.log('Loaded', products.length, 'products from database');
                renderCurrentProducts();
                updateBrandFilter();
            }
        }
    } catch (error) {
        console.error('Error loading products from database:', error);
        // Show error message to user
        const productGrid = document.getElementById('productGrid');
        if (productGrid) {
            productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; font-size: 1.2rem; color: var(--text-light);">Error loading products. Please refresh the page.</p>';
        }
    }
}

// DOM elements
let productGrid, categoryFilter, brandFilter, sortFilter, searchInput, searchButton;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing main page...');
    
    // Get DOM elements
    productGrid = document.getElementById('productGrid');
    categoryFilter = document.getElementById('categoryFilter');
    brandFilter = document.getElementById('brandFilter');
    sortFilter = document.getElementById('sortFilter');
    searchInput = document.getElementById('searchInput');
    searchButton = document.getElementById('searchButton');
    
    setupEventListeners();
    
    if (productGrid && categoryFilter && brandFilter && sortFilter && searchInput) {
        // Load products from database first
        loadProductsFromDatabase();
    }
});

// Setup event listeners
function setupEventListeners() {
    // Logo click to go to top
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            const path = window.location.pathname;
            if (path.endsWith('/') || path.endsWith('/index.html')) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                window.location.href = 'index.html';
            }
        });
    }

    // Category filter
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }

    // Brand filter
    if (brandFilter) {
        brandFilter.addEventListener('change', filterProducts);
    }

    // Sort filter
    if (sortFilter) {
        sortFilter.addEventListener('change', sortProducts);
    }

    // Search input
    if (searchInput) {
        searchInput.addEventListener('input', searchProducts);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Search button
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
}

// Update brand filter based on selected category
function updateBrandFilter(previousBrand = 'all') {
    if (!categoryFilter || !brandFilter) {
        return;
    }

    const category = categoryFilter.value;
    
    // All available brands
    const allBrands = [
        { value: 'all', text: 'All Brands' },
        { value: 'intel', text: 'Intel' },
        { value: 'amd', text: 'AMD' },
        { value: 'nvidia', text: 'NVIDIA' },
        { value: 'asus', text: 'ASUS' },
        { value: 'msi', text: 'MSI' },
        { value: 'gigabyte', text: 'Gigabyte' },
        { value: 'asrock', text: 'ASRock' },
        { value: 'corsair', text: 'Corsair' },
        { value: 'gskill', text: 'G.Skill' },
        { value: 'kingston', text: 'Kingston' },
        { value: 'crucial', text: 'Crucial' },
        { value: 'samsung', text: 'Samsung' },
        { value: 'wd', text: 'Western Digital' },
        { value: 'seagate', text: 'Seagate' },
        { value: 'evga', text: 'EVGA' },
        { value: 'thermaltake', text: 'Thermaltake' },
        { value: 'bequiet', text: 'be quiet!' },
        { value: 'fractal', text: 'Fractal Design' },
        { value: 'lianli', text: 'Lian Li' },
        { value: 'logitech', text: 'Logitech' },
        { value: 'razer', text: 'Razer' },
        { value: 'steelseries', text: 'SteelSeries' },
        { value: 'lg', text: 'LG' }
    ];
    
    // Get brands available for selected category
    let availableBrands = [{ value: 'all', text: 'All Brands' }];
    
    if (category !== 'all') {
        const categoryProducts = products.filter(p => p.category === category);
        const brandSet = new Set(categoryProducts.map(p => p.brand));
        
        brandSet.forEach(brand => {
            const brandInfo = allBrands.find(b => b.value === brand);
            if (brandInfo) {
                availableBrands.push(brandInfo);
            }
        });
    } else {
        availableBrands = allBrands;
    }
    
    // Update brand filter dropdown
    brandFilter.innerHTML = '';
    availableBrands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand.value;
        option.textContent = brand.text;
        brandFilter.appendChild(option);
    });

    const hasPrevious = Array.from(brandFilter.options).some(o => o.value === previousBrand);
    brandFilter.value = hasPrevious ? previousBrand : 'all';
}

function getFilteredProducts() {
    if (!categoryFilter || !brandFilter || !searchInput) {
        return [];
    }

    const category = categoryFilter.value;
    const brand = brandFilter.value;
    const searchTerm = searchInput.value.toLowerCase();

    return products.filter(product => {
        const matchesCategory = category === 'all' || product.category === category;
        const matchesBrand = brand === 'all' || product.brand === brand;
        const matchesSearch = searchTerm === '' || 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm);

        return matchesCategory && matchesBrand && matchesSearch;
    });
}

function applySorting(productsToSort) {
    if (!sortFilter) {
        return productsToSort;
    }

    const sortBy = sortFilter.value;
    const sorted = [...productsToSort];

    switch (sortBy) {
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'rating':
            sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
        default:
            // featured (no sorting)
            break;
    }

    return sorted;
}

function renderCurrentProducts() {
    if (!productGrid) {
        return;
    }
    const filtered = getFilteredProducts();
    const sorted = applySorting(filtered);
    renderProducts(sorted);
}

// Render products
function renderProducts(productsToRender) {
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
        <div class="product-image" onclick="viewProduct('${product.id}')">
            <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div class="product-info">
            <h3 onclick="viewProduct('${product.id}')" style="cursor: pointer; color: var(--primary-color);">${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">${window.formatDZD ? window.formatDZD(product.price) : product.price.toFixed(2) + ' د.ج'}</div>
            <button class="add-to-cart" onclick="addProductToCart('${product.id}')">
                <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
        </div>
    `;
    return card;
}

// Filter products
function filterProducts() {
    renderCurrentProducts();
}

// Perform search and scroll to products
function performSearch() {
    renderCurrentProducts();
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Sort products
function sortProducts() {
    renderCurrentProducts();
}

// Search products
function searchProducts() {
    renderCurrentProducts();
}

// View product details
function viewProduct(productId) {
    window.location.href = `product-details.html?id=${productId}`;
}

// Add to cart - use cart-api.js functions
function addProductToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Use the cart-api addToCart function
    if (typeof window.addToCart === 'function') {
        window.addToCart(product, 1);
    } else {
        showNotification('Cart system not available', 'error');
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#dc2626' : 'var(--primary-color)'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add some interactivity to deal buttons
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.deal-button').forEach(button => {
        button.addEventListener('click', function() {
            const dealText = this.parentElement.querySelector('h3').textContent;
            showNotification(`${dealText} - Check out our amazing deals!`);
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        });
    });
});
