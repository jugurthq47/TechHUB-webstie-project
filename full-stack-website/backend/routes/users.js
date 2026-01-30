const express = require('express');
const router = express.Router();
const {
    getProfile,
    updateProfile,
    updatePreferences,
    addAddress,
    updateAddress,
    deleteAddress,
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    getUsers,
    getUser,
    deleteUser,
    testProduct
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// User routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.put('/preferences', updatePreferences);
router.post('/address', addAddress);
router.put('/address/:addressId', updateAddress);
router.delete('/address/:addressId', deleteAddress);
router.get('/wishlist', getWishlist);
router.post('/wishlist/:productId', addToWishlist);
router.delete('/wishlist/:productId', removeFromWishlist);

// Debug route
router.get('/test-product', testProduct);

// Admin routes
router.get('/', authorize('admin'), getUsers);
router.get('/:id', authorize('admin'), getUser);
router.delete('/:id', authorize('admin'), deleteUser);

module.exports = router;
