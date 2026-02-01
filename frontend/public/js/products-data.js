// Product data for standalone frontend
const products = [
    // Processors
    {
        id: 1,
        name: "Intel Core i9-13900K",
        category: "processors",
        brand: "intel",
        price: 147497.5,
        description: "13th Gen Intel Core i9 processor, 24 cores, 32 threads",
        image: "images/products/Intel Core i9-13900K.png",
        stock: 15,
        rating: 4.8
    },
    {
        id: 2,
        name: "AMD Ryzen 9 7950X",
        category: "processors",
        brand: "amd",
        price: 137497.5,
        description: "AMD Ryzen 9 processor, 16 cores, 32 threads",
        image: "images/products/AMD Ryzen 9 7950X.png",
        stock: 12,
        rating: 4.7
    },
    {
        id: 3,
        name: "Intel Core i7-13700K",
        category: "processors",
        brand: "intel",
        price: 97497.5,
        description: "13th Gen Intel Core i7 processor, 16 cores, 24 threads",
        image: "images/products/Intel Core i7-13700K.png",
        stock: 20,
        rating: 4.6
    },
    {
        id: 4,
        name: "AMD Ryzen 7 7700X",
        category: "processors",
        brand: "amd",
        price: 87497.5,
        description: "AMD Ryzen 7 processor, 8 cores, 16 threads",
        image: "images/products/AMD Ryzen 7 7700X.png",
        stock: 18,
        rating: 4.5
    },
    {
        id: 5,
        name: "Intel Core i5-13600K",
        category: "processors",
        brand: "intel",
        price: 72497.5,
        description: "13th Gen Intel Core i5 processor, 14 cores, 20 threads",
        image: "images/products/Intel Core i5-13600K.png",
        stock: 25,
        rating: 4.4
    },

    // Graphics Cards
    {
        id: 6,
        name: "NVIDIA RTX 4090",
        category: "graphics",
        brand: "nvidia",
        price: 399997.5,
        description: "GeForce RTX 4090, 24GB GDDR6X, DLSS 3",
        image: "images/products/NVIDIA RTX 4090.png",
        stock: 8,
        rating: 4.9
    },
    {
        id: 7,
        name: "AMD RX 7900 XTX",
        category: "graphics",
        brand: "amd",
        price: 249997.5,
        description: "Radeon RX 7900 XTX, 24GB GDDR6, RDNA 3",
        image: "images/products/AMD RX 7900 XTX.png",
        stock: 10,
        rating: 4.7
    },
    {
        id: 8,
        name: "NVIDIA RTX 4070 Ti",
        category: "graphics",
        brand: "nvidia",
        price: 199997.5,
        description: "GeForce RTX 4070 Ti, 12GB GDDR6X, DLSS 3",
        image: "images/products/NVIDIA RTX 4070 Ti.png",
        stock: 15,
        rating: 4.8
    },
    {
        id: 9,
        name: "AMD RX 7800 XT",
        category: "graphics",
        brand: "amd",
        price: 124997.5,
        description: "Radeon RX 7800 XT, 16GB GDDR6, RDNA 3",
        image: "images/products/AMD RX 7800 XT.png",
        stock: 12,
        rating: 4.6
    },
    {
        id: 10,
        name: "NVIDIA RTX 4060 Ti",
        category: "graphics",
        brand: "nvidia",
        price: 99997.5,
        description: "GeForce RTX 4060 Ti, 8GB GDDR6, DLSS 3",
        image: "images/products/NVIDIA RTX 4060 Ti.png",
        stock: 20,
        rating: 4.5
    },

    // Memory (RAM)
    {
        id: 11,
        name: "Corsair Vengeance RGB 32GB",
        category: "memory",
        brand: "corsair",
        price: 37497.5,
        description: "DDR5 5600MHz, 32GB (2x16GB) RGB RAM",
        image: "images/products/Corsair Vengeance RGB 32GB.png",
        stock: 30,
        rating: 4.6
    },
    {
        id: 12,
        name: "G.Skill Trident Z5 32GB",
        category: "memory",
        brand: "gskill",
        price: 42497.5,
        description: "DDR5 6000MHz, 32GB (2x16GB) RGB RAM",
        image: "images/products/G.Skill Trident Z5 32GB.png",
        stock: 25,
        rating: 4.7
    },
    {
        id: 13,
        name: "Kingston Fury Beast 16GB",
        category: "memory",
        brand: "kingston",
        price: 22497.5,
        description: "DDR5 5200MHz, 16GB (2x8GB) RAM",
        image: "images/products/Kingston Fury Beast 16GB.png",
        stock: 40,
        rating: 4.4
    },
    {
        id: 14,
        name: "Crucial Ballistix 32GB",
        category: "memory",
        brand: "crucial",
        price: 32497.5,
        description: "DDR5 5600MHz, 32GB (2x16GB) RAM",
        image: "images/products/Crucial Ballistix 32GB.png",
        stock: 35,
        rating: 4.5
    },

    // Storage
    {
        id: 15,
        name: "Samsung 980 Pro 2TB",
        category: "storage",
        brand: "samsung",
        price: 47497.5,
        description: "NVMe SSD, 2TB, PCIe 4.0, up to 7,000 MB/s",
        image: "images/products/Samsung 980 Pro 2TB.png",
        stock: 22,
        rating: 4.8
    },
    {
        id: 16,
        name: "Western Digital Black 4TB",
        category: "storage",
        brand: "wd",
        price: 62497.5,
        description: "NVMe SSD, 4TB, PCIe 4.0, up to 7,300 MB/s",
        image: "images/products/Western Digital Black 4TB.png",
        stock: 18,
        rating: 4.7
    },
    {
        id: 17,
        name: "Crucial MX500 1TB",
        category: "storage",
        brand: "crucial",
        price: 19997.5,
        description: "SATA SSD, 1TB, up to 560 MB/s",
        image: "images/products/Crucial MX500 1TB.png",
        stock: 45,
        rating: 4.5
    },
    {
        id: 18,
        name: "Seagate Barracuda 2TB",
        category: "storage",
        brand: "seagate",
        price: 14997.5,
        description: "HDD, 2TB, 7200 RPM, SATA 6Gb/s",
        image: "images/products/Seagate Barracuda 2TB.png",
        stock: 50,
        rating: 4.3
    },
    {
        id: 19,
        name: "Kingston NV2 1TB",
        category: "storage",
        brand: "kingston",
        price: 17497.5,
        description: "NVMe SSD, 1TB, PCIe 4.0, up to 3,500 MB/s",
        image: "images/products/Kingston NV2 1TB.png",
        stock: 38,
        rating: 4.4
    }
];
