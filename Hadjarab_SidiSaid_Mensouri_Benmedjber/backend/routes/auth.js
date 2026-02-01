const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Email incorrect. Utilisateur non trouvé.' 
            });
        }

        // Check password (no hashing as requested)
        if (user.password !== password) {
            return res.status(401).json({ 
                success: false, 
                message: 'Mot de passe incorrect.' 
            });
        }

        // Set session
        req.session.userId = user._id;
        req.session.user = {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            city: user.city,
            country: user.country
        };

        res.json({ 
            success: true, 
            message: 'Connexion réussie!',
            user: req.session.user
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erreur serveur lors de la connexion.' 
        });
    }
});

// Signup route
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, phone, address, city, country } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: 'Cet email est déjà utilisé.' 
            });
        }

        // Create new user
        const newUser = new User({
            name,
            email,
            password, // No hashing as requested
            phone: phone || '',
            address: address || '',
            city: city || '',
            country: country || ''
        });

        await newUser.save();

        // Set session
        req.session.userId = newUser._id;
        req.session.user = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            address: newUser.address,
            city: newUser.city,
            country: newUser.country
        };

        res.json({ 
            success: true, 
            message: 'Compte créé avec succès!',
            user: req.session.user
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erreur serveur lors de l\'inscription.' 
        });
    }
});

// Logout route
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ 
                success: false, 
                message: 'Erreur lors de la déconnexion.' 
            });
        }
        res.json({ 
            success: true, 
            message: 'Déconnexion réussie.' 
        });
    });
});

// Check session route
router.get('/check-session', (req, res) => {
    if (req.session.user) {
        res.json({ 
            success: true, 
            isLoggedIn: true,
            user: req.session.user
        });
    } else {
        res.json({ 
            success: true, 
            isLoggedIn: false 
        });
    }
});

// Get user profile
router.get('/profile', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ 
            success: false, 
            message: 'Non authentifié.' 
        });
    }

    res.json({ 
        success: true, 
        user: req.session.user
    });
});

module.exports = router;
