const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Frontend products data
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

// Map frontend categories to backend categories
const categoryMapping = {
    'processors': 'cpu',
    'graphics': 'gpu',
    'memory': 'ram',
    'storage': 'storage',
    'motherboards': 'motherboard',
    'power': 'psu',
    'cases': 'case',
    'cooling': 'cooling',
    'accessories': 'peripherals'
};

// Seed products function
async function seedProducts() {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/techhub');
        console.log('Connected to MongoDB');

        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products');

        // Insert new products
        const seededProducts = [];
        
        for (const product of products) {
            const mappedProduct = {
                name: product.name,
                description: product.description,
                price: product.price,
                originalPrice: product.price * 1.1, // Add 10% original price
                category: categoryMapping[product.category] || 'accessories',
                brand: product.brand,
                image: `images/products/${product.name}.png`,
                stock: Math.floor(Math.random() * 50) + 10, // Random stock between 10-60
            };
            
            const createdProduct = await Product.create(mappedProduct);
            seededProducts.push(createdProduct);
            console.log(`Created: ${product.name} (ID: ${createdProduct._id})`);
        }

        console.log(`Successfully seeded ${seededProducts.length} products to database`);
        console.log('Product seeding completed!');
        
        // Close connection
        await mongoose.connection.close();
        
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
}

// Run the seeding function
seedProducts();
