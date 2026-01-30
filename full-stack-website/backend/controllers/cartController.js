const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
exports.getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id }).populate('items.product');

        if (!cart) {
            cart = await Cart.create({ user: req.user.id, items: [] });
        }

        res.status(200).json({
            success: true,
            data: cart
        });
    } catch (error) {
        console.error('Get cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error fetching cart'
        });
    }
};

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1, productName, productData } = req.body;

        // Find product using enhanced resolution system
        let product;
        const mongoose = require('mongoose');
        
        console.log('Add to cart - Product ID:', productId);
        console.log('Add to cart - Product name:', productName);
        console.log('Add to cart - Product data:', productData);
        
        if (mongoose.Types.ObjectId.isValid(productId) && String(productId).length === 24) {
            // It's a valid MongoDB ObjectId
            product = await Product.findById(productId);
            console.log('Add to cart - Found by ObjectId:', !!product);
        } else {
            // Try exact name matching (since database now has all products)
            if (productName) {
                console.log('Add to cart - Looking for exact product:', productName);
                
                // Try exact match first
                product = await Product.findOne({ 
                    name: productName
                });
                
                if (product) {
                    console.log('Add to cart - Found product by EXACT name:', product.name);
                } else {
                    console.log('Add to cart - Exact match failed, trying case-insensitive...');
                    // Try case-insensitive exact match
                    product = await Product.findOne({ 
                        name: { $regex: `^${productName}$`, $options: 'i' }
                    });
                    
                    if (product) {
                        console.log('Add to cart - Found product by case-insensitive name:', product.name);
                    } else {
                        console.log('Add to cart - Case-insensitive failed, trying partial match...');
                        // Try partial name match (last resort)
                        product = await Product.findOne({ 
                            name: { $regex: productName, $options: 'i' }
                        });
                        
                        if (product) {
                            console.log('Add to cart - Found product by partial name:', product.name);
                        } else {
                            console.log('Add to cart - All name-based methods failed');
                        }
                    }
                }
            }
            
            // Fallback to numeric system if name matching fails
            if (!product) {
                console.log('Add to cart - Name matching failed, using fallback numeric system');
                const totalProducts = await Product.countDocuments();
                console.log(`Add to cart - Total products in database: ${totalProducts}`);
                
                if (Number(productId) > totalProducts) {
                    console.log(`Add to cart - Product ID ${productId} exceeds total products ${totalProducts}`);
                    // Use modulo to wrap around
                    const wrappedIndex = (Number(productId) - 1) % totalProducts;
                    const products = await Product.find().skip(wrappedIndex).limit(1);
                    product = products[0];
                } else {
                    const products = await Product.find().skip(Number(productId) - 1).limit(1);
                    product = products[0];
                }
                console.log('Add to cart - Found product (numeric fallback):', product);
            }
        }
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Check stock
        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Not enough stock available'
            });
        }

        // Find or create cart
        let cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            cart = new Cart({ user: req.user.id, items: [] });
        }

        // Add item to cart
        await cart.addItem(product, quantity);

        // Populate and return
        cart = await Cart.findById(cart._id).populate('items.product');

        res.status(200).json({
            success: true,
            message: 'Item added to cart',
            data: cart
        });
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error adding to cart'
        });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:productId
// @access  Private
exports.removeFromCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        await cart.removeItem(req.params.productId);

        cart = await Cart.findById(cart._id).populate('items.product');

        res.status(200).json({
            success: true,
            message: 'Item removed from cart',
            data: cart
        });
    } catch (error) {
        console.error('Remove from cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error removing from cart'
        });
    }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/update/:productId
// @access  Private
exports.updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        const mongoose = require('mongoose');
        const productId = req.params.productId;

        // Check stock - support both MongoDB ObjectId and numeric ID
        let product;
        if (mongoose.Types.ObjectId.isValid(productId) && String(productId).length === 24) {
            product = await Product.findById(productId);
        } else {
            const totalProducts = await Product.countDocuments();
            if (Number(productId) > totalProducts) {
                const wrappedIndex = (Number(productId) - 1) % totalProducts;
                const products = await Product.find().skip(wrappedIndex).limit(1);
                product = products[0];
            } else {
                const products = await Product.find().skip(Number(productId) - 1).limit(1);
                product = products[0];
            }
        }
        
        if (product && product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Not enough stock available'
            });
        }

        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        await cart.updateItemQuantity(req.params.productId, quantity);

        cart = await Cart.findById(cart._id).populate('items.product');

        res.status(200).json({
            success: true,
            message: 'Cart updated',
            data: cart
        });
    } catch (error) {
        console.error('Update cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error updating cart'
        });
    }
};

// @desc    Clear cart
// @route   DELETE /api/cart/clear
// @access  Private
exports.clearCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        await cart.clearCart();

        res.status(200).json({
            success: true,
            message: 'Cart cleared',
            data: cart
        });
    } catch (error) {
        console.error('Clear cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error clearing cart'
        });
    }
};

// @desc    Get cart count
// @route   GET /api/cart/count
// @access  Private
exports.getCartCount = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });

        res.status(200).json({
            success: true,
            count: cart ? cart.totalItems : 0
        });
    } catch (error) {
        console.error('Get cart count error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
