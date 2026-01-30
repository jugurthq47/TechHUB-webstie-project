const express = require('express');
const router = express.Router();
const {
    createOrder,
    getMyOrders,
    getOrder,
    updateOrderStatus,
    updatePaymentStatus,
    cancelOrder,
    getAllOrders
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// User routes
router.post('/', createOrder);
router.get('/', getMyOrders);
router.get('/:id', getOrder);
router.put('/:id/pay', updatePaymentStatus);
router.put('/:id/cancel', cancelOrder);

// Admin routes
router.get('/admin/all', authorize('admin'), getAllOrders);
router.put('/:id/status', authorize('admin'), updateOrderStatus);

module.exports = router;
