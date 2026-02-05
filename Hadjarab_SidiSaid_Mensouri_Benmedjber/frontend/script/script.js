// ==========================
// Global State
// ==========================

// Stores the selected accessory sub-type (e.g. mouse, keyboard)
let selectedAccessoryType = null;


// ==========================
// Dark Mode Elements
// ==========================

// Button that toggles dark mode
const darkModeToggle = document.getElementById('darkModeToggle');

// Icon inside the dark mode button (moon / sun)
const darkModeIcon = document.getElementById('darkModeIcon');


// ==========================
// Main DOM Elements
// ==========================

// Container where product cards will be displayed
const productGrid = document.getElementById('productGrid');

// Filters and search inputs
const categoryFilter = document.getElementById('categoryFilter');
const brandFilter = document.getElementById('brandFilter');
const sortFilter = document.getElementById('sortFilter');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// Cart elements
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.getElementById('cartModal');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const cartCountEl = document.querySelector('.cart-count');
const closeModalBtn = document.querySelector('.close');


// ==========================
// App Initialization
// ==========================

// This runs when the HTML page is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Debug logs (for development only)
    console.log('DOMContentLoaded fired');
    console.log('productGrid:', productGrid);
    console.log('products:', typeof products !== 'undefined' ? products.length : 'undefined');

    // Attach all event listeners
    setupEventListeners();

    // Initialize dark mode based on saved preference
    initializeDarkMode();

    // Load products only if required elements exist
    if (productGrid && categoryFilter && brandFilter && sortFilter && searchInput) {
        loadProducts();
    }
});


// ==========================
// Dark Mode Logic
// ==========================

// Initialize dark mode from localStorage
function initializeDarkMode() {

    // Get saved theme from browser storage
    const savedTheme = localStorage.getItem('theme');

    // If user previously selected dark mode
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');

        // Change icon to sun
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
    }

    // Attach click event to dark mode toggle button
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
}

// Switch between dark and light mode
function toggleDarkMode() {

    // Get current theme from <html>
    const currentTheme = document.documentElement.getAttribute('data-theme');

    // Decide new theme
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Apply new theme
    document.documentElement.setAttribute('data-theme', newTheme);

    // Update icon
    if (newTheme === 'dark') {
        darkModeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        darkModeIcon.classList.replace('fa-sun', 'fa-moon');
    }

    // Save preference
    localStorage.setItem('theme', newTheme);
}


// ==========================
// Product Loading
// ==========================

// Load products from local array
function loadProducts() {
    renderProducts(products);
    updateBrandFilter(products);
}


// ==========================
// Event Listeners Setup
// ==========================

function setupEventListeners() {

    // Logo click → go to home page
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
        logo.style.cursor = 'pointer';
    }

    // Check if shop filters exist
    const hasShopFilters = categoryFilter && brandFilter && sortFilter && searchInput;

    if (hasShopFilters) {

        // Category filter change
        categoryFilter.addEventListener('change', () => {
            selectedAccessoryType = null;
            updateBrandFilter(products);
            filterProducts();
        });

        // Brand filter change
        brandFilter.addEventListener('change', filterProducts);

        // Sort filter change
        sortFilter.addEventListener('change', filterProducts);

        // Search input typing (with debounce)
        searchInput.addEventListener('input', debounce(filterProducts, 300));

        // Search button click
        if (searchButton) {
            searchButton.addEventListener('click', performSearch);
        }

        // Enter key triggers search
        searchInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') performSearch();
        });
    }

    // Open cart modal
    if (cartIcon && cartModal) {
        cartIcon.addEventListener('click', openCartModal);
    }

    // Close cart modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeCartModal);
    }

    // Close modal when clicking outside
    window.addEventListener('click', e => {
        if (e.target === cartModal) closeCartModal();
    });
}


// ==========================
// Brand Filter Update
// ==========================

// Update brand dropdown based on selected category
function updateBrandFilter(products) {

    if (!categoryFilter || !brandFilter) return;

    const category = categoryFilter.value;
    const previousBrand = brandFilter.value;

    let availableBrands = ['all'];

    // Get brands for selected category
    if (category !== 'all') {
        const filtered = products.filter(p => p.category === category);
        availableBrands = ['all', ...new Set(filtered.map(p => p.brand))];
    } else {
        availableBrands = ['all', ...new Set(products.map(p => p.brand))];
    }

    // Update dropdown options
    brandFilter.innerHTML = '';
    availableBrands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand === 'all' ? 'All Brands' : brand;
        brandFilter.appendChild(option);
    });

    // Restore previous selection if possible
    brandFilter.value = availableBrands.includes(previousBrand) ? previousBrand : 'all';
}


// ==========================
// Filtering & Sorting
// ==========================

function filterProducts() {

    if (!categoryFilter || !brandFilter || !searchInput) return;

    let filteredProducts = [...products];

    // Filter by category
    if (categoryFilter.value !== 'all') {
        filteredProducts = filteredProducts.filter(
            p => p.category === categoryFilter.value
        );
    }

    // Filter by accessory type
    if (categoryFilter.value === 'accessories' && selectedAccessoryType) {
        filteredProducts = filteredProducts.filter(
            p => p.accessoryType === selectedAccessoryType
        );
    }

    // Filter by brand
    if (brandFilter.value !== 'all') {
        filteredProducts = filteredProducts.filter(
            p => p.brand === brandFilter.value
        );
    }

    // Filter by search text
    if (searchInput.value) {
        const text = searchInput.value.toLowerCase();
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(text) ||
            p.description.toLowerCase().includes(text) ||
            p.brand.toLowerCase().includes(text)
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
    }

    renderProducts(filteredProducts);
}


// ==========================
// Rendering Products
// ==========================

function renderProducts(productsToRender) {

    if (!productGrid) return;

    productGrid.innerHTML = '';

    // Show message if no products found
    if (productsToRender.length === 0) {
        productGrid.innerHTML = '<p>No products found.</p>';
        return;
    }

    // Create and append product cards
    productsToRender.forEach(product => {
        productGrid.appendChild(createProductCard(product));
    });
}


// ==========================
// Utility Functions
// ==========================

// Delay function execution (used for search input)
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}

// Open cart modal
function openCartModal() {
    cartModal.style.display = 'flex';
}

// Close cart modal
function closeCartModal() {
    cartModal.style.display = 'none';
}
