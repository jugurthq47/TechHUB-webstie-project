// Sample product data
const products = [
    // Processors
    {
        id: 1,
        name: "Intel Core i9-13900K",
        category: "processors",
        brand: "intel",
        price: 589.99,
        description: "13th Gen Intel Core i9 processor, 24 cores, 32 threads",
        image: "https://via.placeholder.com/280x200/1f2937/ffffff?text=Intel+i9"
    },
    {
        id: 2,
        name: "AMD Ryzen 9 7950X",
        category: "processors",
        brand: "amd",
        price: 549.99,
        description: "AMD Ryzen 9 processor, 16 cores, 32 threads",
        image: "https://via.placeholder.com/280x200/ed1c24/ffffff?text=AMD+Ryzen+9"
    },
    {
        id: 3,
        name: "Intel Core i7-13700K",
        category: "processors",
        brand: "intel",
        price: 389.99,
        description: "13th Gen Intel Core i7 processor, 16 cores, 24 threads",
        image: "https://via.placeholder.com/280x200/1f2937/ffffff?text=Intel+i7"
    },
    {
        id: 4,
        name: "AMD Ryzen 7 7700X",
        category: "processors",
        brand: "amd",
        price: 349.99,
        description: "AMD Ryzen 7 processor, 8 cores, 16 threads",
        image: "https://via.placeholder.com/280x200/ed1c24/ffffff?text=AMD+Ryzen+7"
    },
    {
        id: 5,
        name: "Intel Core i5-13600K",
        category: "processors",
        brand: "intel",
        price: 289.99,
        description: "13th Gen Intel Core i5 processor, 14 cores, 20 threads",
        image: "https://via.placeholder.com/280x200/1f2937/ffffff?text=Intel+i5"
    },
    // Graphics Cards
    {
        id: 6,
        name: "NVIDIA RTX 4090",
        category: "graphics",
        brand: "nvidia",
        price: 1599.99,
        description: "GeForce RTX 4090, 24GB GDDR6X, DLSS 3",
        image: "https://via.placeholder.com/280x200/76b900/ffffff?text=RTX+4090"
    },
    {
        id: 7,
        name: "AMD RX 7900 XTX",
        category: "graphics",
        brand: "amd",
        price: 999.99,
        description: "Radeon RX 7900 XTX, 24GB GDDR6, RDNA 3",
        image: "https://via.placeholder.com/280x200/ed1c24/ffffff?text=RX+7900+XTX"
    },
    {
        id: 8,
        name: "NVIDIA RTX 4070 Ti",
        category: "graphics",
        brand: "nvidia",
        price: 799.99,
        description: "GeForce RTX 4070 Ti, 12GB GDDR6X, DLSS 3",
        image: "https://via.placeholder.com/280x200/76b900/ffffff?text=RTX+4070+Ti"
    },
    {
        id: 9,
        name: "AMD RX 7800 XT",
        category: "graphics",
        brand: "amd",
        price: 499.99,
        description: "Radeon RX 7800 XT, 16GB GDDR6, RDNA 3",
        image: "https://via.placeholder.com/280x200/ed1c24/ffffff?text=RX+7800+XT"
    },
    {
        id: 10,
        name: "NVIDIA RTX 4060 Ti",
        category: "graphics",
        brand: "nvidia",
        price: 399.99,
        description: "GeForce RTX 4060 Ti, 8GB GDDR6, DLSS 3",
        image: "https://via.placeholder.com/280x200/76b900/ffffff?text=RTX+4060+Ti"
    },
    // Memory (RAM)
    {
        id: 11,
        name: "Corsair Vengeance RGB 32GB",
        category: "memory",
        brand: "corsair",
        price: 149.99,
        description: "DDR5 5600MHz, 32GB (2x16GB) RGB RAM",
        image: "https://via.placeholder.com/280x200/000000/ffffff?text=Corsair+RAM"
    },
    {
        id: 12,
        name: "G.Skill Trident Z5 32GB",
        category: "memory",
        brand: "gskill",
        price: 169.99,
        description: "DDR5 6000MHz, 32GB (2x16GB) RGB RAM",
        image: "https://via.placeholder.com/280x200/ff6900/ffffff?text=G.Skill+RAM"
    },
    {
        id: 13,
        name: "Kingston Fury Beast 16GB",
        category: "memory",
        brand: "kingston",
        price: 89.99,
        description: "DDR5 5200MHz, 16GB (2x8GB) RAM",
        image: "https://via.placeholder.com/280x200/000000/ffffff?text=Kingston+RAM"
    },
    {
        id: 14,
        name: "Crucial Ballistix 32GB",
        category: "memory",
        brand: "crucial",
        price: 129.99,
        description: "DDR5 5600MHz, 32GB (2x16GB) RAM",
        image: "https://via.placeholder.com/280x200/000000/ffffff?text=Crucial+RAM"
    },
    // Storage
    {
        id: 15,
        name: "Samsung 980 Pro 2TB",
        category: "storage",
        brand: "samsung",
        price: 189.99,
        description: "NVMe SSD, 2TB, PCIe 4.0, up to 7,000 MB/s",
        image: "https://via.placeholder.com/280x200/1f2937/ffffff?text=Samsung+SSD"
    },
    {
        id: 16,
        name: "Western Digital Black 4TB",
        category: "storage",
        brand: "wd",
        price: 249.99,
        description: "NVMe SSD, 4TB, PCIe 4.0, up to 7,300 MB/s",
        image: "https://via.placeholder.com/280x200/000000/ffffff?text=WD+Black+SSD"
    },
    {
        id: 17,
        name: "Crucial MX500 1TB",
        category: "storage",
        brand: "crucial",
        price: 79.99,
        description: "SATA SSD, 1TB, up to 560 MB/s",
        image: "https://via.placeholder.com/280x200/000000/ffffff?text=Crucial+MX500"
    },
    {
        id: 18,
        name: "Seagate Barracuda 2TB",
        category: "storage",
        brand: "seagate",
        price: 59.99,
        description: "HDD, 2TB, 7200 RPM, SATA 6Gb/s",
        image: "https://via.placeholder.com/280x200/000000/ffffff?text=Seagate+HDD"
    },
    {
        id: 19,
        name: "Kingston NV2 1TB",
        category: "storage",
        brand: "kingston",
        price: 69.99,
        description: "NVMe SSD, 1TB, PCIe 4.0, up to 3,500 MB/s",
        image: "https://via.placeholder.com/280x200/000000/ffffff?text=Kingston+NV2"
    },
    // Motherboards
    {
        id: 20,
        name: "ASUS ROG Strix Z790-E",
        category: "motherboards",
        brand: "asus",
        price: 449.99,
        description: "Intel Z790 chipset, ATX, WiFi 6E, DDR5",
        image: "https://via.placeholder.com/280x200/ff6900/ffffff?text=ASUS+ROG"
    },
    {
        id: 21,
        name: "MSI MAG X670E Tomahawk",
        category: "motherboards",
        brand: "msi",
        price: 399.99,
        description: "AMD X670E chipset, ATX, WiFi 6E, DDR5",
        image: "https://via.placeholder.com/280x200/ff0000/ffffff?text=MSI+X670E"
    },
    {
        id: 22,
        name: "Gigabyte Z790 Aorus Master",
        category: "motherboards",
        brand: "gigabyte",
        price: 429.99,
        description: "Intel Z790 chipset, ATX, WiFi 6E, DDR5",
        image: "https://via.placeholder.com/280x200/ff6900/ffffff?text=Gigabyte+Z790"
    },
    {
        id: 23,
        name: "ASRock B650 Steel Legend",
        category: "motherboards",
        brand: "asrock",
        price: 229.99,
        description: "AMD B650 chipset, ATX, DDR5",
        image: "https://via.placeholder.com/280x200/000000/ffffff?text=ASRock+B650"
    },
    // Power Supplies
    {
        id: 24,
        name: "Corsair RM1000x",
        category: "power",
        brand: "corsair",
        price: 169.99,
        description: "1000W 80+ Gold, Fully Modular, 10 Year Warranty",
        image: "https://via.placeholder.com/280x200/000000/ffffff?text=Corsair+PSU"
    },
    {
        id: 25,
        name: "Seasonic Focus GX-850",
        category: "power",
        brand: "seasonic",
        price: 139.99,
        description: "850W 80+ Gold, Fully Modular, 10 Year Warranty",
        image: "https://via.placeholder.com/280x200/00a652/ffffff?text=Seasonic+PSU"
    },
    {
        id: 26,
        name: "EVGA SuperNOVA 750 G5",
        category: "power",
        brand: "evga",
        price: 119.99,
        description: "750W 80+ Gold, Fully Modular, 7 Year Warranty",
        image: "https://via.placeholder.com/280x200/000000/ffffff?text=EVGA+PSU"
    },
    {
        id: 27,
        name: "Thermaltake Toughpower 1200W",
        category: "power",
        brand: "thermaltake",
        price: 299.99,
        description: "1200W 80+ Gold, Fully Modular, 5 Year Warranty",
        image: "https://via.placeholder.com/280x200/000000/ffffff?text=Thermaltake+PSU"
    },
    // Cooling
    {
        id: 28,
        name: "Noctua NH-D15",
        category: "cooling",
        brand: "noctua",
        price: 99.99,
        description: "Dual tower CPU cooler, 140mm fans, premium quality",
        image: "https://via.placeholder.com/280x200/8b4513/ffffff?text=Noctua+NH-D15"
    },
    {
        id: 29,
        name: "NZXT Kraken X73",
        category: "cooling",
        brand: "nzxt",
        price: 199.99,
        description: "360mm AIO liquid cooler, RGB lighting, CAM software",
        image: "https://via.placeholder.com/280x200/000000/ffffff?text=NZXT+Kraken"
    },
    {
        id: 30,
        name: "Corsair iCUE H150i",
        category: "cooling",
        brand: "corsair",
        price: 179.99,
        description: "360mm AIO liquid cooler, RGB lighting, iCUE software",
        image: "https://via.placeholder.com/280x200/000000/ffffff?text=Corsair+AIO"
    },
    {
        id: 31,
        name: "be quiet! Dark Rock Pro 4",
        category: "cooling",
        brand: "bequiet",
        price: 89.99,
        description: "Dual tower CPU cooler, 135mm fans, silent operation",
        image: "https://via.placeholder.com/280x200/000000/ffffff?text=be+quiet"
    },
    // PC Cases
    {
        id: 32,
        name: "NZXT H510 Elite",
        category: "cases",
        brand: "nzxt",
        price: 149.99,
        description: "Mid-tower case, tempered glass, RGB lighting",
        image: "https://via.placeholder.com/280x200/000000/ffffff?text=NZXT+H510"
    },
    {
        id: 33,
        name: "Fractal Design Meshify C",
        category: "cases",
        brand: "fractal",
        price: 119.99,
        description: "Mid-tower case, mesh front panel, excellent airflow",
        image: "https://via.placeholder.com/280x200/000000/ffffff?text=Meshify+C"
    },
    {
        id: 34,
        name: "Corsair 4000D Airflow",
        category: "cases",
        brand: "corsair",
        price: 99.99,
        description: "Mid-tower case, high airflow design, tempered glass",
        image: "https://via.placeholder.com/280x200/000000/ffffff?text=Corsair+4000D"
    },
    {
        id: 35,
        name: "Lian Li Lancool 216",
        category: "cases",
        brand: "lianli",
        price: 89.99,
        description: "Mid-tower case, excellent airflow, tempered glass",
        image: "https://via.placeholder.com/280x200/000000/ffffff?text=Lian+Li+216"
    },
    // Accessories - Keyboards
    {
        id: 36,
        name: "Logitech G Pro X TKL",
        category: "accessories",
        brand: "logitech",
        price: 149.99,
        description: "Tenkeyless mechanical keyboard, GX switches, RGB",
        image: "https://via.placeholder.com/280x200/000000/ffffff?text=Logitech+G+Pro"
    },
    {
        id: 37,
        name: "Razer BlackWidow V3",
        category: "accessories",
        brand: "razer",
        price: 139.99,
        description: "Full-size mechanical keyboard, Chroma RGB",
        image: "https://via.placeholder.com/280x200/000000/ffffff?text=Razer+BlackWidow"
    },
    {
        id: 38,
        name: "Corsair K70 RGB",
        category: "accessories",
        brand: "corsair",
        price: 129.99,
        description: "Mechanical gaming keyboard, Cherry MX switches",
        image: "https://via.placeholder.com/280x200/000000/ffffff?text=Corsair+K70"
    },
    // Accessories - Mice
    {
        id: 39,
        name: "Logitech G502 Hero",
        category: "accessories",
        brand: "logitech",
        price: 79.99,
        description: "Wired gaming mouse, 25,600 DPI, 11 buttons",
        image: "https://via.placeholder.com/280x200/000000/ffffff?text=Logitech+G502"
    },
    {
        id: 40,
        name: "Razer DeathAdder V3",
        category: "accessories",
        brand: "razer",
        price: 69.99,
        description: "Wireless gaming mouse, 30,000 DPI, ergonomic design",
        image: "https://via.placeholder.com/280x200/000000/ffffff?text=Razer+DeathAdder"
    },
    {
        id: 41,
        name: "SteelSeries Rival 650",
        category: "accessories",
        brand: "steelseries",
        price: 99.99,
        description: "Wireless gaming mouse, dual sensor, fast charging",
        image: "https://via.placeholder.com/280x200/000000/ffffff?text=SteelSeries+Rival"
    },
    // Accessories - Monitors
    {
        id: 42,
        name: "ASUS ROG Swift PG279Q",
        category: "accessories",
        brand: "asus",
        price: 599.99,
        description: "27\" 1440p, 165Hz, G-Sync, IPS panel",
        image: "https://via.placeholder.com/280x200/000000/ffffff?text=ASUS+PG279Q"
    },
    {
        id: 43,
        name: "LG 27GP850-B",
        category: "accessories",
        brand: "lg",
        price: 449.99,
        description: "27\" 1440p, 165Hz, G-Sync Compatible, Nano IPS",
        image: "https://via.placeholder.com/280x200/000000/ffffff?text=LG+27GP850"
    },
    {
        id: 44,
        name: "Samsung Odyssey G7",
        category: "accessories",
        brand: "samsung",
        price: 699.99,
        description: "27\" 1440p, 240Hz, G-Sync, Curved VA panel",
        image: "https://via.placeholder.com/280x200/000000/ffffff?text=Samsung+G7"
    }
];

// Shopping cart
let cart = [];

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
    if (productGrid && categoryFilter && brandFilter && sortFilter && searchInput) {
        updateBrandFilter();
        renderCurrentProducts();
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
    
    const hasShopFilters = !!(categoryFilter && brandFilter && sortFilter && searchInput);
    
    if (hasShopFilters) {
        // Category filter
        categoryFilter.addEventListener('change', function() {
            updateBrandFilter();
            filterProducts();
        });
        
        // Brand filter
        brandFilter.addEventListener('change', filterProducts);
        
        // Sort filter
        sortFilter.addEventListener('change', sortProducts);
        
        // Search
        searchInput.addEventListener('input', searchProducts);
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
                updateBrandFilter();
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
                categoryFilter.value = 'accessories';
                updateBrandFilter();
                filterProducts();
                const productsSection = document.getElementById('products');
                if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
    
    // Brand cards
    if (hasShopFilters) {
        document.querySelectorAll('.brand-card').forEach(card => {
            card.addEventListener('click', function() {
                const img = this.querySelector('img');
                const brandName = img ? img.alt.toLowerCase() : '';
                brandFilter.value = brandName;
                filterProducts();
                const productsSection = document.getElementById('products');
                if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
    
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

// Update brand filter based on selected category
function updateBrandFilter() {
    if (!categoryFilter || !brandFilter) {
        return;
    }
    const category = categoryFilter.value;
    const previousBrand = brandFilter.value;
    const allBrands = [
        { value: 'all', text: 'All Brands' },
        { value: 'intel', text: 'Intel' },
        { value: 'amd', text: 'AMD' },
        { value: 'nvidia', text: 'NVIDIA' },
        { value: 'corsair', text: 'Corsair' },
        { value: 'asus', text: 'ASUS' },
        { value: 'msi', text: 'MSI' },
        { value: 'gigabyte', text: 'Gigabyte' },
        { value: 'samsung', text: 'Samsung' },
        { value: 'seasonic', text: 'Seasonic' },
        { value: 'noctua', text: 'Noctua' },
        { value: 'nzxt', text: 'NZXT' },
        { value: 'gskill', text: 'G.Skill' },
        { value: 'kingston', text: 'Kingston' },
        { value: 'crucial', text: 'Crucial' },
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

    let filtered = products;

    if (category !== 'all') {
        filtered = filtered.filter(product => product.category === category);
    }

    if (brand !== 'all') {
        filtered = filtered.filter(product => product.brand === brand);
    }

    if (searchTerm) {
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm)
        );
    }

    return filtered;
}

function applySorting(list) {
    const sortBy = sortFilter ? sortFilter.value : 'featured';
    const sorted = [...list];

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
        default:
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
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
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

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
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
    cartCount.textContent = totalItems;
    
    // Update cart modal
    renderCartItems();
    updateCartTotal();
}

// Render cart items
function renderCartItems() {
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
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Open cart modal
function openCartModal() {
    if (!cartModal) {
        return;
    }
    cartModal.style.display = 'block';
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
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(20px); }
    }
`;
document.head.appendChild(style);

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
        // Simulate checkout process
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
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
});
