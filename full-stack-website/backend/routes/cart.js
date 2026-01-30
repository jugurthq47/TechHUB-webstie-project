const express = require('express');
const router = express.Router();
const {
    getCart,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    getCartCount
} = require('../controllers/cartController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

router.get('/', getCart);
router.get('/count', getCartCount);
router.post('/add', addToCart);
router.put('/update/:productId', updateCartItem);
router.delete('/remove/:productId', removeFromCart);
router.delete('/clear', clearCart);

module.exports = router;
