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
    },

    // Motherboards
    {
        id: 20,
        name: "ASRock B650 Steel Legend",
        category: "motherboards",
        brand: "asrock",
        price: 44997.5,
        description: "B650 chipset motherboard for AMD Ryzen",
        image: "images/products/ASRock B650 Steel Legend.png",
        stock: 12,
        rating: 4.6
    },
    {
        id: 21,
        name: "ASUS ROG Strix Z790-E",
        category: "motherboards",
        brand: "asus",
        price: 74997.5,
        description: "Z790 chipset motherboard for Intel 13th Gen CPUs",
        image: "images/products/ASUS ROG Strix Z790-E.png",
        stock: 10,
        rating: 4.7
    },
    {
        id: 22,
        name: "Gigabyte Z790 Aorus Master",
        category: "motherboards",
        brand: "gigabyte",
        price: 69997.5,
        description: "Z790 chipset motherboard, premium features",
        image: "images/products/Gigabyte Z790 Aorus Master.png",
        stock: 8,
        rating: 4.6
    },
    {
        id: 23,
        name: "MSI MAG X670E Tomahawk",
        category: "motherboards",
        brand: "msi",
        price: 54997.5,
        description: "X670E chipset motherboard for AMD Ryzen 7000 series",
        image: "images/products/MSI MAG X670E Tomahawk.png",
        stock: 9,
        rating: 4.5
    },

    // Cooling
    {
        id: 24,
        name: "be quiet! Dark Rock Pro 4",
        category: "cooling",
        brand: "bequiet",
        price: 14997.5,
        description: "High-performance CPU air cooler",
        image: "images/products/be quiet! Dark Rock Pro 4.png",
        stock: 15,
        rating: 4.7
    },
    {
        id: 25,
        name: "Corsair iCUE H150i",
        category: "cooling",
        brand: "corsair",
        price: 24997.5,
        description: "360mm AIO liquid CPU cooler",
        image: "images/products/Corsair iCUE H150i.png",
        stock: 12,
        rating: 4.6
    },
    {
        id: 26,
        name: "Noctua NH-D15",
        category: "cooling",
        brand: "noctua",
        price: 19997.5,
        description: "Premium dual-tower CPU air cooler",
        image: "images/products/Noctua NH-D15.png",
        stock: 14,
        rating: 4.8
    },
    {
        id: 27,
        name: "NZXT Kraken X73",
        category: "cooling",
        brand: "nzxt",
        price: 25997.5,
        description: "360mm AIO liquid CPU cooler with RGB",
        image: "images/products/NZXT Kraken X73.png",
        stock: 10,
        rating: 4.7
    },

    // Power Supply (PSU)
    {
        id: 28,
        name: "Corsair RM1000x",
        category: "power",
        brand: "corsair",
        price: 24997.5,
        description: "1000W, 80+ Gold modular PSU",
        image: "images/products/Corsair RM1000x.png",
        stock: 20,
        rating: 4.8
    },
    {
        id: 29,
        name: "EVGA SuperNOVA 750 G5",
        category: "power",
        brand: "evga",
        price: 17497.5,
        description: "750W, 80+ Gold modular PSU",
        image: "images/products/EVGA SuperNOVA 750 G5.png",
        stock: 15,
        rating: 4.6
    },
    {
        id: 30,
        name: "Seasonic Focus GX-850",
        category: "power",
        brand: "seasonic",
        price: 19997.5,
        description: "850W, 80+ Gold fully modular PSU",
        image: "images/products/Seasonic Focus GX-850.png",
        stock: 10,
        rating: 4.7
    },

    // Cases
    {
        id: 31,
        name: "Corsair 4000D Airflow",
        category: "cases",
        brand: "corsair",
        price: 12997.5,
        description: "Mid-tower case with high airflow",
        image: "images/products/Corsair 4000D Airflow.png",
        stock: 18,
        rating: 4.5
    },
    {
        id: 32,
        name: "Fractal Design Meshify C",
        category: "cases",
        brand: "fractal",
        price: 13997.5,
        description: "Mid-tower case with mesh front panel",
        image: "images/products/Fractal Design Meshify C.png",
        stock: 12,
        rating: 4.6
    },
    {
        id: 33,
        name: "Lian Li Lancool 216",
        category: "cases",
        brand: "lianli",
        price: 14997.5,
        description: "Mid-tower case with excellent airflow and RGB",
        image: "images/products/Lian Li Lancool 216.png",
        stock: 14,
        rating: 4.7
    },
    {
        id: 34,
        name: "NZXT H510 Elite",
        category: "cases",
        brand: "nzxt",
        price: 16997.5,
        description: "Mid-tower case with tempered glass and RGB",
        image: "images/products/NZXT H510 Elite.png",
        stock: 10,
        rating: 4.6
    },

    // Monitors
    {
        id: 35,
        name: "ASUS ROG Swift PG279Q",
        category: "accessories",
        accessoryType: "monitors",
        brand: "asus",
        price: 74997.5,
        description: "27-inch 1440p IPS gaming monitor, 165Hz",
        image: "images/products/ASUS ROG Swift PG279Q.png",
        stock: 8,
        rating: 4.7
    },
    {
        id: 36,
        name: "LG 27GP850-B",
        category: "accessories",
        accessoryType: "monitors",
        brand: "lg",
        price: 69997.5,
        description: "27-inch 1440p IPS gaming monitor, 165Hz, 1ms",
        image: "images/products/LG 27GP850-B.png",
        stock: 10,
        rating: 4.6
    },
    {
        id: 37,
        name: "Samsung Odyssey G7",
        category: "accessories",
        accessoryType: "monitors",
        brand: "samsung",
        price: 74997.5,
        description: "27-inch 1440p QHD, 240Hz, VA curved gaming monitor",
        image: "images/products/Samsung Odyssey G7.png",
        stock: 12,
        rating: 4.7
    },

    // Keyboards
    {
        id: 38,
        name: "Corsair K70 RGB",
        category: "accessories",
        accessoryType: "keyboards",
        brand: "corsair",
        price: 12997.5,
        description: "Mechanical gaming keyboard with RGB",
        image: "images/products/Corsair K70 RGB.png",
        stock: 25,
        rating: 4.7
    },
    {
        id: 39,
        name: "Razer BlackWidow V3",
        category: "accessories",
        accessoryType: "keyboards",
        brand: "razer",
        price: 11997.5,
        description: "Mechanical gaming keyboard with RGB",
        image: "images/products/Razer BlackWidow V3.png",
        stock: 20,
        rating: 4.6
    },
    {
        id: 40,
        name: "Logitech G Pro X TKL",
        category: "accessories",
        accessoryType: "keyboards",
        brand: "logitech",
        price: 13997.5,
        description: "Tenkeyless mechanical gaming keyboard",
        image: "images/products/Logitech G Pro X TKL.png",
        stock: 18,
        rating: 4.7
    },

    // Mice
    {
        id: 41,
        name: "Logitech G502 Hero",
        category: "accessories",
        accessoryType: "mice",
        brand: "logitech",
        price: 7997.5,
        description: "Gaming mouse with adjustable DPI and RGB",
        image: "images/products/Logitech G502 Hero.png",
        stock: 30,
        rating: 4.7
    },
    {
        id: 42,
        name: "Razer DeathAdder V3",
        category: "accessories",
        accessoryType: "mice",
        brand: "razer",
        price: 6997.5,
        description: "Ergonomic gaming mouse with RGB",
        image: "images/products/Razer DeathAdder V3.png",
        stock: 25,
        rating: 4.6
    },

];

