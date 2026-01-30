// Product data for standalone frontend
const products = [
    // Processors
    {
        id: 1,
        name: "Intel Core i9-13900K",
        category: "processors",
        brand: "intel",
        price: 589.99,
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
        price: 549.99,
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
        price: 389.99,
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
        price: 349.99,
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
        price: 289.99,
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
        price: 1599.99,
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
        price: 999.99,
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
        price: 799.99,
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
        price: 499.99,
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
        price: 399.99,
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
        price: 149.99,
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
        price: 169.99,
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
        price: 89.99,
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
        price: 129.99,
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
        price: 189.99,
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
        price: 249.99,
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
        price: 79.99,
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
        price: 59.99,
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
        price: 69.99,
        description: "NVMe SSD, 1TB, PCIe 4.0, up to 3,500 MB/s",
        image: "images/products/Kingston NV2 1TB.png",
        stock: 38,
        rating: 4.4
    },
    // Motherboards
    {
        id: 20,
        name: "ASUS ROG Strix Z790-E",
        category: "motherboards",
        brand: "asus",
        price: 449.99,
        description: "Intel Z790 chipset, ATX, WiFi 6E, DDR5",
        image: "images/products/ASUS ROG Strix Z790-E.png",
        stock: 15,
        rating: 4.8
    },
    {
        id: 21,
        name: "MSI MAG X670E Tomahawk",
        category: "motherboards",
        brand: "msi",
        price: 399.99,
        description: "AMD X670E chipset, ATX, WiFi 6E, DDR5",
        image: "images/products/MSI MAG X670E Tomahawk.png",
        stock: 12,
        rating: 4.7
    },
    {
        id: 22,
        name: "Gigabyte Z790 Aorus Master",
        category: "motherboards",
        brand: "gigabyte",
        price: 429.99,
        description: "Intel Z790 chipset, ATX, WiFi 6E, DDR5",
        image: "images/products/Gigabyte Z790 Aorus Master.png",
        stock: 10,
        rating: 4.6
    },
    {
        id: 23,
        name: "ASRock B650 Steel Legend",
        category: "motherboards",
        brand: "asrock",
        price: 229.99,
        description: "AMD B650 chipset, ATX, DDR5",
        image: "images/products/ASRock B650 Steel Legend.png",
        stock: 18,
        rating: 4.4
    },
    // Power Supplies
    {
        id: 24,
        name: "Corsair RM1000x",
        category: "power",
        brand: "corsair",
        price: 169.99,
        description: "1000W 80+ Gold, Fully Modular, 10 Year Warranty",
        image: "images/products/Corsair RM1000x.png",
        stock: 20,
        rating: 4.7
    },
    {
        id: 25,
        name: "Seasonic Focus GX-850",
        category: "power",
        brand: "seasonic",
        price: 139.99,
        description: "850W 80+ Gold, Fully Modular, 10 Year Warranty",
        image: "images/products/Seasonic Focus GX-850.png",
        stock: 16,
        rating: 4.8
    },
    {
        id: 26,
        name: "EVGA SuperNOVA 750 G5",
        category: "power",
        brand: "evga",
        price: 119.99,
        description: "750W 80+ Gold, Fully Modular, 7 Year Warranty",
        image: "images/products/EVGA SuperNOVA 750 G5.png",
        stock: 25,
        rating: 4.6
    },
    {
        id: 27,
        name: "Thermaltake Toughpower 1200W",
        category: "power",
        brand: "thermaltake",
        price: 299.99,
        description: "1200W 80+ Gold, Fully Modular, 5 Year Warranty",
        image: "images/products/Thermaltake Toughpower 1200W.png",
        stock: 8,
        rating: 4.5
    },
    // Cooling
    {
        id: 28,
        name: "Noctua NH-D15",
        category: "cooling",
        brand: "noctua",
        price: 99.99,
        description: "Dual tower CPU cooler, 140mm fans, premium quality",
        image: "images/products/Noctua NH-D15.png",
        stock: 22,
        rating: 4.9
    },
    {
        id: 29,
        name: "NZXT Kraken X73",
        category: "cooling",
        brand: "nzxt",
        price: 199.99,
        description: "360mm AIO liquid cooler, RGB lighting, CAM software",
        image: "images/products/NZXT Kraken X73.png",
        stock: 12,
        rating: 4.7
    },
    {
        id: 30,
        name: "Corsair iCUE H150i",
        category: "cooling",
        brand: "corsair",
        price: 179.99,
        description: "360mm AIO liquid cooler, RGB lighting, iCUE software",
        image: "images/products/Corsair iCUE H150i.png",
        stock: 15,
        rating: 4.6
    },
    {
        id: 31,
        name: "be quiet! Dark Rock Pro 4",
        category: "cooling",
        brand: "bequiet",
        price: 89.99,
        description: "Dual tower CPU cooler, 135mm fans, silent operation",
        image: "images/products/be quiet! Dark Rock Pro 4.png",
        stock: 18,
        rating: 4.8
    },
    // PC Cases
    {
        id: 32,
        name: "NZXT H510 Elite",
        category: "cases",
        brand: "nzxt",
        price: 149.99,
        description: "Mid-tower case, tempered glass, RGB lighting",
        image: "images/products/NZXT H510 Elite.png",
        stock: 14,
        rating: 4.7
    },
    {
        id: 33,
        name: "Fractal Design Meshify C",
        category: "cases",
        brand: "fractal",
        price: 119.99,
        description: "Mid-tower case, mesh front panel, excellent airflow",
        image: "images/products/Fractal Design Meshify C.png",
        stock: 16,
        rating: 4.6
    },
    {
        id: 34,
        name: "Corsair 4000D Airflow",
        category: "cases",
        brand: "corsair",
        price: 99.99,
        description: "Mid-tower case, high airflow design, tempered glass",
        image: "images/products/Corsair 4000D Airflow.png",
        stock: 20,
        rating: 4.5
    },
    {
        id: 35,
        name: "Lian Li Lancool 216",
        category: "cases",
        brand: "lianli",
        price: 89.99,
        description: "Mid-tower case, excellent airflow, tempered glass",
        image: "images/products/Lian Li Lancool 216.png",
        stock: 18,
        rating: 4.4
    },
    // Accessories - Keyboards
    {
        id: 36,
        name: "Logitech G Pro X TKL",
        category: "accessories",
        accessoryType: "keyboards",
        brand: "logitech",
        price: 149.99,
        description: "Tenkeyless mechanical keyboard, GX switches, RGB",
        image: "images/products/Logitech G Pro X TKL.png",
        stock: 25,
        rating: 4.7
    },
    {
        id: 37,
        name: "Razer BlackWidow V3",
        category: "accessories",
        accessoryType: "keyboards",
        brand: "razer",
        price: 139.99,
        description: "Full-size mechanical keyboard, Chroma RGB",
        image: "images/products/Razer BlackWidow V3.png",
        stock: 20,
        rating: 4.6
    },
    {
        id: 38,
        name: "Corsair K70 RGB",
        category: "accessories",
        accessoryType: "keyboards",
        brand: "corsair",
        price: 129.99,
        description: "Mechanical gaming keyboard, Cherry MX switches",
        image: "images/products/Corsair K70 RGB.png",
        stock: 22,
        rating: 4.5
    },
    // Accessories - Mice
    {
        id: 39,
        name: "Logitech G502 Hero",
        category: "accessories",
        accessoryType: "mice",
        brand: "logitech",
        price: 79.99,
        description: "Wired gaming mouse, 25,600 DPI, 11 buttons",
        image: "images/products/Logitech G502 Hero.png",
        stock: 30,
        rating: 4.8
    },
    {
        id: 40,
        name: "Razer DeathAdder V3",
        category: "accessories",
        accessoryType: "mice",
        brand: "razer",
        price: 69.99,
        description: "Wireless gaming mouse, 30,000 DPI, ergonomic design",
        image: "images/products/Razer DeathAdder V3.png",
        stock: 28,
        rating: 4.7
    },
    {
        id: 41,
        name: "SteelSeries Rival 650",
        category: "accessories",
        accessoryType: "mice",
        brand: "steelseries",
        price: 99.99,
        description: "Wireless gaming mouse, dual sensor, fast charging",
        image: "images/products/SteelSeries Rival 650.png",
        stock: 18,
        rating: 4.6
    },
    // Accessories - Monitors
    {
        id: 42,
        name: "ASUS ROG Swift PG279Q",
        category: "accessories",
        accessoryType: "monitors",
        brand: "asus",
        price: 599.99,
        description: "27\" 1440p, 165Hz, G-Sync, IPS panel",
        image: "images/products/ASUS ROG Swift PG279Q.png",
        stock: 10,
        rating: 4.8
    },
    {
        id: 43,
        name: "LG 27GP850-B",
        category: "accessories",
        accessoryType: "monitors",
        brand: "lg",
        price: 449.99,
        description: "27\" 1440p, 165Hz, G-Sync Compatible, Nano IPS",
        image: "images/products/LG 27GP850-B.png",
        stock: 12,
        rating: 4.7
    },
    {
        id: 44,
        name: "Samsung Odyssey G7",
        category: "accessories",
        accessoryType: "monitors",
        brand: "samsung",
        price: 699.99,
        description: "27\" 1440p, 240Hz, G-Sync, Curved VA panel",
        image: "images/products/Samsung Odyssey G7.png",
        stock: 8,
        rating: 4.6
    }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = products;
} else {
    window.products = products;
}
