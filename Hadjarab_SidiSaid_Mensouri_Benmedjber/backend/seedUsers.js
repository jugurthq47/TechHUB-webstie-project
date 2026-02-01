const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');


const MONGODB_URI = 'mongodb+srv://techhubadmin:Password123@techhub.c1fjmnz.mongodb.net/techhub?retryWrites=true&w=majority';


// Sample users data
const users = [
    {
        name: 'Lyes',
        email: 'Lyes@gmail.com',
        password: 'Password123',
        phone: '+213 555 123 456',
        address: '15 Rue de la Liberté',
        city: 'Bab Ezzouar',
        country: 'Algérie'
    },
    {
        name: 'Jugo',
        email: 'Jugo@gmail.com',
        password: 'Password123',
        phone: '+213 555 234 567',
        address: '28 Avenue Mohamed Belouizdad',
        city: 'Alger Centre',
        country: 'Algérie'
    },
    {
        name: 'Wassim',
        email: 'Wassim@gmail.com',
        password: 'Password123',
        phone: '+213 555 345 678',
        address: '42 Rue Didouche Mourad',
        city: 'Alger',
        country: 'Algérie'
    },
    {
        name: 'Mazigh',
        email: 'Mazigh@gmail.com',
        password: 'Password123',
        phone: '+213 555 456 789',
        address: '7 Boulevard Zighoud Youcef',
        city: 'Bab Ezzouar',
        country: 'Algérie'
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing users
        await User.deleteMany({});
        console.log('🗑️  Cleared existing users');

        // Insert new users
        await User.insertMany(users);
        console.log('✅ Successfully created 4 users:');
        users.forEach(user => {
            console.log(`   - ${user.name} (${user.email})`);
        });

        console.log('\n📝 All users have password: Password123');
        
        // Disconnect
        await mongoose.disconnect();
        console.log('\n✅ Database seeding completed!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
