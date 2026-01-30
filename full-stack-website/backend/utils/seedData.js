const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Product = require('../models/Product');

// Sample products data
const products = [
    {
        name: 'Intel Core i9-13900K',
        description: 'The Intel Core i9-13900K is the flagship processor featuring 24 cores (8 P-cores + 16 E-cores) and 32 threads, with boost clocks up to 5.8 GHz. Perfect for gaming and content creation.',
        price: 589.99,
        originalPrice: 649.99,
        category: 'cpu',
        brand: 'Intel',
        image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500',
        stock: 50,
        rating: 4.8,
        numReviews: 245,
        specifications: new Map([
            ['Cores', '24 (8P + 16E)'],
            ['Threads', '32'],
            ['Base Clock', '3.0 GHz'],
            ['Boost Clock', '5.8 GHz'],
            ['Cache', '36 MB'],
            ['TDP', '125W'],
            ['Socket', 'LGA 1700']
        ]),
        features: ['Hybrid Architecture', 'Intel Thread Director', 'PCIe 5.0 Support', 'DDR5 Support'],
        isFeatured: true,
        isActive: true
    },
    {
        name: 'AMD Ryzen 9 7950X',
        description: 'The AMD Ryzen 9 7950X delivers exceptional performance with 16 cores and 32 threads, boost clocks up to 5.7 GHz, and support for DDR5 memory.',
        price: 549.99,
        originalPrice: 699.99,
        category: 'cpu',
        brand: 'AMD',
        image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=500',
        stock: 35,
        rating: 4.9,
        numReviews: 189,
        specifications: new Map([
            ['Cores', '16'],
            ['Threads', '32'],
            ['Base Clock', '4.5 GHz'],
            ['Boost Clock', '5.7 GHz'],
            ['Cache', '80 MB'],
            ['TDP', '170W'],
            ['Socket', 'AM5']
        ]),
        features: ['Zen 4 Architecture', '5nm Process', 'PCIe 5.0', 'DDR5 Support'],
        isFeatured: true,
        isActive: true
    },
    {
        name: 'NVIDIA GeForce RTX 4090',
        description: 'The ultimate graphics card for gaming and creative work. Features 24GB GDDR6X memory, ray tracing, and DLSS 3 for incredible performance.',
        price: 1599.99,
        originalPrice: 1799.99,
        category: 'gpu',
        brand: 'NVIDIA',
        image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500',
        stock: 15,
        rating: 4.9,
        numReviews: 312,
        specifications: new Map([
            ['CUDA Cores', '16384'],
            ['Memory', '24GB GDDR6X'],
            ['Memory Bus', '384-bit'],
            ['Boost Clock', '2.52 GHz'],
            ['TDP', '450W'],
            ['Outputs', '3x DP 1.4a, 1x HDMI 2.1']
        ]),
        features: ['Ada Lovelace Architecture', 'DLSS 3', 'Ray Tracing', '8K Gaming'],
        isFeatured: true,
        isActive: true
    },
    {
        name: 'AMD Radeon RX 7900 XTX',
        description: 'High-performance graphics card with 24GB GDDR6 memory, perfect for 4K gaming and content creation.',
        price: 999.99,
        originalPrice: 1099.99,
        category: 'gpu',
        brand: 'AMD',
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500',
        stock: 25,
        rating: 4.7,
        numReviews: 156,
        specifications: new Map([
            ['Stream Processors', '6144'],
            ['Memory', '24GB GDDR6'],
            ['Memory Bus', '384-bit'],
            ['Boost Clock', '2.5 GHz'],
            ['TDP', '355W']
        ]),
        features: ['RDNA 3 Architecture', 'Chiplet Design', 'AV1 Encoding', 'DisplayPort 2.1'],
        isFeatured: true,
        isActive: true
    },
    {
        name: 'ASUS ROG Maximus Z790 Hero',
        description: 'Premium Intel Z790 motherboard with DDR5 support, PCIe 5.0, and extensive overclocking features.',
        price: 629.99,
        originalPrice: 699.99,
        category: 'motherboard',
        brand: 'ASUS',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500',
        stock: 20,
        rating: 4.8,
        numReviews: 98,
        specifications: new Map([
            ['Socket', 'LGA 1700'],
            ['Chipset', 'Intel Z790'],
            ['Memory Slots', '4x DDR5'],
            ['Max Memory', '128GB'],
            ['PCIe Slots', '2x PCIe 5.0 x16'],
            ['M2 Slots', '5']
        ]),
        features: ['DDR5 Support', 'PCIe 5.0', 'WiFi 6E', 'Thunderbolt 4'],
        isFeatured: true,
        isActive: true
    },
    {
        name: 'MSI MEG X670E ACE',
        description: 'High-end AMD X670E motherboard with PCIe 5.0, DDR5, and premium components for enthusiasts.',
        price: 699.99,
        originalPrice: 799.99,
        category: 'motherboard',
        brand: 'MSI',
        image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=500',
        stock: 15,
        rating: 4.7,
        numReviews: 67,
        specifications: new Map([
            ['Socket', 'AM5'],
            ['Chipset', 'AMD X670E'],
            ['Memory Slots', '4x DDR5'],
            ['Max Memory', '128GB'],
            ['PCIe Slots', '2x PCIe 5.0 x16'],
            ['M2 Slots', '4']
        ]),
        features: ['DDR5 Support', 'PCIe 5.0', 'WiFi 6E', '10GbE LAN'],
        isFeatured: false,
        isActive: true
    },
    {
        name: 'Corsair Vengeance DDR5-6000 32GB',
        description: 'High-performance DDR5 memory kit with 32GB (2x16GB) at 6000MHz for optimal gaming and productivity.',
        price: 159.99,
        originalPrice: 189.99,
        category: 'ram',
        brand: 'Corsair',
        image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=500',
        stock: 100,
        rating: 4.8,
        numReviews: 234,
        specifications: new Map([
            ['Capacity', '32GB (2x16GB)'],
            ['Speed', 'DDR5-6000'],
            ['Latency', 'CL36'],
            ['Voltage', '1.35V'],
            ['Form Factor', 'DIMM']
        ]),
        features: ['Intel XMP 3.0', 'AMD EXPO', 'Aluminum Heat Spreader', 'RGB Lighting'],
        isFeatured: true,
        isActive: true
    },
    {
        name: 'G.Skill Trident Z5 RGB DDR5-6400 64GB',
        description: 'Premium DDR5 memory with stunning RGB lighting and extreme performance for enthusiasts.',
        price: 299.99,
        originalPrice: 349.99,
        category: 'ram',
        brand: 'G.Skill',
        image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=500',
        stock: 45,
        rating: 4.9,
        numReviews: 156,
        specifications: new Map([
            ['Capacity', '64GB (2x32GB)'],
            ['Speed', 'DDR5-6400'],
            ['Latency', 'CL32'],
            ['Voltage', '1.4V'],
            ['Form Factor', 'DIMM']
        ]),
        features: ['Intel XMP 3.0', 'AMD EXPO', 'RGB Lighting', 'Dual-Channel Kit'],
        isFeatured: false,
        isActive: true
    },
    {
        name: 'Samsung 990 Pro 2TB NVMe SSD',
        description: 'Ultra-fast PCIe 4.0 NVMe SSD with sequential read speeds up to 7,450 MB/s.',
        price: 179.99,
        originalPrice: 229.99,
        category: 'storage',
        brand: 'Samsung',
        image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500',
        stock: 75,
        rating: 4.9,
        numReviews: 412,
        specifications: new Map([
            ['Capacity', '2TB'],
            ['Interface', 'PCIe 4.0 x4 NVMe'],
            ['Read Speed', '7,450 MB/s'],
            ['Write Speed', '6,900 MB/s'],
            ['Form Factor', 'M2 2280']
        ]),
        features: ['PCIe 4.0', 'Samsung V-NAND', 'Hardware Encryption', '5-Year Warranty'],
        isFeatured: true,
        isActive: true
    },
    {
        name: 'WD Black SN850X 1TB',
        description: 'High-performance gaming SSD with PCIe Gen4 speeds and Game Mode 2.0.',
        price: 89.99,
        originalPrice: 109.99,
        category: 'storage',
        brand: 'Western Digital',
        image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500',
        stock: 120,
        rating: 4.8,
        numReviews: 289,
        specifications: new Map([
            ['Capacity', '1TB'],
            ['Interface', 'PCIe 4.0 x4 NVMe'],
            ['Read Speed', '7,300 MB/s'],
            ['Write Speed', '6,300 MB/s'],
            ['Form Factor', 'M2 2280']
        ]),
        features: ['Game Mode 2.0', 'Low Latency', 'RGB Optional', '5-Year Warranty'],
        isFeatured: false,
        isActive: true
    },
    {
        name: 'Corsair RM1000x 1000W PSU',
        description: '80 Plus Gold certified fully modular power supply with Zero RPM fan mode for silent operation.',
        price: 189.99,
        originalPrice: 219.99,
        category: 'psu',
        brand: 'Corsair',
        image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500',
        stock: 40,
        rating: 4.9,
        numReviews: 567,
        specifications: new Map([
            ['Wattage', '1000W'],
            ['Efficiency', '80 Plus Gold'],
            ['Modularity', 'Fully Modular'],
            ['Fan Size', '135mm'],
            ['Warranty', '10 Years']
        ]),
        features: ['Zero RPM Mode', 'Japanese Capacitors', 'Fully Modular', 'ATX 3.0 Ready'],
        isFeatured: true,
        isActive: true
    },
    {
        name: 'Seasonic Prime TX-850 850W',
        description: 'Premium 80 Plus Titanium power supply with exceptional efficiency and reliability.',
        price: 249.99,
        originalPrice: 279.99,
        category: 'psu',
        brand: 'Seasonic',
        image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500',
        stock: 25,
        rating: 4.9,
        numReviews: 234,
        specifications: new Map([
            ['Wattage', '850W'],
            ['Efficiency', '80 Plus Titanium'],
            ['Modularity', 'Fully Modular'],
            ['Fan Size', '135mm FDB'],
            ['Warranty', '12 Years']
        ]),
        features: ['Titanium Efficiency', 'Hybrid Fan Control', 'Premium Components', '12-Year Warranty'],
        isFeatured: false,
        isActive: true
    },
    {
        name: 'Lian Li O11 Dynamic EVO',
        description: 'Premium mid-tower case with dual-chamber design and exceptional airflow for high-end builds.',
        price: 169.99,
        originalPrice: 189.99,
        category: 'case',
        brand: 'Lian Li',
        image: 'https://images.unsplash.com/photo-1587202372616-b43abea06c2a?w=500',
        stock: 30,
        rating: 4.8,
        numReviews: 445,
        specifications: new Map([
            ['Form Factor', 'Mid Tower'],
            ['Material', 'Aluminum/Steel/Glass'],
            ['GPU Length', 'Up to 420mm'],
            ['CPU Cooler Height', 'Up to 167mm'],
            ['Radiator Support', 'Up to 360mm']
        ]),
        features: ['Dual Chamber', 'Tempered Glass', 'Modular Design', 'USB-C Front Panel'],
        isFeatured: true,
        isActive: true
    },
    {
        name: 'NZXT Kraken X73 RGB',
        description: '360mm AIO liquid cooler with stunning RGB infinity mirror design and powerful cooling.',
        price: 199.99,
        originalPrice: 249.99,
        category: 'cooling',
        brand: 'NZXT',
        image: 'https://images.unsplash.com/photo-1587202372583-49330a15584d?w=500',
        stock: 35,
        rating: 4.7,
        numReviews: 312,
        specifications: new Map([
            ['Radiator Size', '360mm'],
            ['Fan Size', '3x 120mm'],
            ['Pump Speed', '800-2800 RPM'],
            ['Socket Support', 'Intel/AMD'],
            ['Warranty', '6 Years']
        ]),
        features: ['Infinity Mirror', 'RGB Lighting', 'CAM Software', 'Asetek Gen7 Pump'],
        isFeatured: true,
        isActive: true
    },
    {
        name: 'Noctua NH-D15 chromax.black',
        description: 'Premium dual-tower CPU cooler with exceptional cooling performance and silent operation.',
        price: 109.99,
        originalPrice: 119.99,
        category: 'cooling',
        brand: 'Noctua',
        image: 'https://images.unsplash.com/photo-1587202372583-49330a15584d?w=500',
        stock: 50,
        rating: 4.9,
        numReviews: 678,
        specifications: new Map([
            ['Type', 'Air Cooler'],
            ['Height', '165mm'],
            ['Fans', '2x NF-A15 PWM'],
            ['TDP Rating', '250W+'],
            ['Socket Support', 'Intel/AMD']
        ]),
        features: ['Dual Tower', 'chromax.black', 'SecuFirm2 Mount', '6-Year Warranty'],
        isFeatured: false,
        isActive: true
    },
    {
        name: 'Logitech G Pro X Superlight',
        description: 'Ultra-lightweight wireless gaming mouse with HERO 25K sensor and 70-hour battery life.',
        price: 149.99,
        originalPrice: 159.99,
        category: 'peripherals',
        brand: 'Logitech',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
        stock: 80,
        rating: 4.9,
        numReviews: 1234,
        specifications: new Map([
            ['Sensor', 'HERO 25K'],
            ['DPI', 'Up to 25,600'],
            ['Weight', '63g'],
            ['Battery Life', '70 hours'],
            ['Connection', 'LIGHTSPEED Wireless']
        ]),
        features: ['Superlight Design', 'PTFE Feet', 'POWERPLAY Compatible', 'Onboard Memory'],
        isFeatured: true,
        isActive: true
    },
    {
        name: 'Samsung Odyssey G9 49"',
        description: 'Ultra-wide curved gaming monitor with 240Hz refresh rate and 1ms response time.',
        price: 1299.99,
        originalPrice: 1499.99,
        category: 'monitors',
        brand: 'Samsung',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
        stock: 10,
        rating: 4.8,
        numReviews: 234,
        specifications: new Map([
            ['Size', '49 inch'],
            ['Resolution', '5120x1440'],
            ['Refresh Rate', '240Hz'],
            ['Response Time', '1ms'],
            ['Panel Type', 'VA']
        ]),
        features: ['1000R Curve', 'QLED', 'G-Sync Compatible', 'HDR1000'],
        isFeatured: true,
        isActive: true
    },
    {
        name: 'Gigabyte B650 AORUS Elite AX',
        description: 'Feature-rich AMD B650 motherboard with DDR5 support, WiFi 6E, and robust VRM design.',
        price: 229.99,
        originalPrice: 259.99,
        category: 'motherboard',
        brand: 'Gigabyte',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500',
        stock: 45,
        rating: 4.6,
        numReviews: 123,
        specifications: new Map([
            ['Socket', 'AM5'],
            ['Chipset', 'AMD B650'],
            ['Memory Slots', '4x DDR5'],
            ['Max Memory', '128GB'],
            ['PCIe Slots', '1x PCIe 4.0 x16'],
            ['M2 Slots', '2']
        ]),
        features: ['DDR5 Support', 'WiFi 6E', '2.5GbE LAN', 'Q-Flash Plus'],
        isFeatured: false,
        isActive: true
    }
];

// Admin user data
const adminUser = {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@techhub.com',
    password: 'admin123',
    role: 'admin',
    isVerified: true
};

// Test user data
const testUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user',
    isVerified: true,
    phone: '555-123-4567',
    addresses: [{
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
        isDefault: true
    }]
};

// Seed function
const seedDatabase = async () => {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/techhub', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Product.deleteMany({});
        console.log('Cleared existing data');

        // Create admin user
        const admin = await User.create(adminUser);
        console.log('Admin user created:', admin.email);

        // Create test user
        const user = await User.create(testUser);
        console.log('Test user created:', user.email);

        // Create products
        const createdProducts = await Product.insertMany(
            products.map(p => ({ ...p, createdBy: admin._id }))
        );
        console.log(`${createdProducts.length} products created`);

        console.log('\n=== Seed Data Complete ===');
        console.log('Admin login: admin@techhub.com / admin123');
        console.log('User login: john@example.com / password123');
        console.log('==========================\n');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

// Run if called directly
if (require.main === module) {
    seedDatabase();
}

module.exports = { seedDatabase, products, adminUser, testUser };
