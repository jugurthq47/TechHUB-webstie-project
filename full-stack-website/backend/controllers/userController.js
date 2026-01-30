const User = require('../models/User');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// Debug function to test Product model
exports.testProduct = async (req, res) => {
    try {
        console.log('Testing Product model...');
        const products = await Product.find().limit(5);
        console.log('Products found:', products.length);
        
        // Show actual product IDs in database
        const productIds = products.map(p => ({
            id: p._id,
            idType: typeof p._id,
            idString: p._id.toString(),
            name: p.name
        }));
        
        console.log('Product IDs in database:', productIds);
        
        res.status(200).json({
            success: true,
            message: 'Product model test successful',
            data: {
                totalProducts: products.length,
                productIds: productIds
            }
        });
    } catch (error) {
        console.error('Product model test error:', error);
        res.status(500).json({
            success: false,
            message: 'Product model test failed',
            error: error.message
        });
    }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('wishlist');

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, avatar } = req.body;

        // Build update object dynamically
        const updateData = {};
        if (firstName) updateData.firstName = firstName;
        if (lastName) updateData.lastName = lastName;
        if (email) updateData.email = email;
        if (phone) updateData.phone = phone;
        if (avatar) updateData.avatar = avatar;

        console.log('Updating user profile with data:', updateData);
        console.log('User ID:', req.user.id);

        const user = await User.findByIdAndUpdate(
            req.user.id,
            updateData,
            { new: true, runValidators: true }
        );

        console.log('Updated user:', user);

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Update user preferences
// @route   PUT /api/users/preferences
// @access  Private
exports.updatePreferences = async (req, res) => {
    try {
        const { emailNotifications, smsNotifications, promoNotifications } = req.body;

        console.log('Updating user preferences with data:', req.body);
        console.log('User ID:', req.user.id);

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { 
                preferences: {
                    emailNotifications,
                    smsNotifications,
                    promoNotifications
                }
            },
            { new: true, runValidators: true }
        );

        console.log('Updated user preferences:', user.preferences);

        res.status(200).json({
            success: true,
            data: user.preferences
        });
    } catch (error) {
        console.error('Update preferences error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Add address
// @route   POST /api/users/address
// @access  Private
exports.addAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        const { street, city, state, zipCode, country, isDefault, stats } = req.body;

        console.log('Add address - Request body:', req.body);
        console.log('Add address - Stats field:', stats);

        // If this is set as default, unset other defaults
        if (isDefault) {
            user.addresses.forEach(addr => {
                addr.isDefault = false;
            });
        }

        const newAddress = {
            street,
            city,
            state,
            zipCode,
            country: country || 'USA',
            stats,
            isDefault: isDefault || user.addresses.length === 0
        };

        console.log('Add address - New address object:', newAddress);

        user.addresses.push(newAddress);

        await user.save();

        res.status(201).json({
            success: true,
            data: user.addresses
        });
    } catch (error) {
        console.error('Add address error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Update address
// @route   PUT /api/users/address/:addressId
// @access  Private
exports.updateAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        let addressIndex = -1;
        
        // Handle single address case - if addressId is "home", update the first address
        if (req.params.addressId === 'home') {
            if (user.addresses.length > 0) {
                addressIndex = 0; // Update the first (and only) address
            }
        } else {
            // Handle specific address ID case
            addressIndex = user.addresses.findIndex(
                addr => addr._id.toString() === req.params.addressId
            );
        }

        if (addressIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            });
        }

        const { street, city, state, zipCode, country, isDefault, stats } = req.body;

        console.log('Update address - Request body:', req.body);
        console.log('Update address - Stats field:', stats);
        console.log('Update address - Current address:', user.addresses[addressIndex]);

        // If this is set as default, unset other defaults
        if (isDefault) {
            user.addresses.forEach(addr => {
                addr.isDefault = false;
            });
        }

        const updatedAddress = {
            ...user.addresses[addressIndex].toObject(),
            street: street || user.addresses[addressIndex].street,
            city: city || user.addresses[addressIndex].city,
            state: state || user.addresses[addressIndex].state,
            zipCode: zipCode || user.addresses[addressIndex].zipCode,
            country: country || user.addresses[addressIndex].country,
            stats: stats || user.addresses[addressIndex].stats,
            isDefault: isDefault !== undefined ? isDefault : user.addresses[addressIndex].isDefault
        };

        console.log('Update address - Updated address object:', updatedAddress);

        user.addresses[addressIndex] = updatedAddress;

        await user.save();

        res.status(200).json({
            success: true,
            data: user.addresses
        });
    } catch (error) {
        console.error('Update address error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Delete address
// @route   DELETE /api/users/address/:addressId
// @access  Private
exports.deleteAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        // Handle single address case - if addressId is "home", clear all addresses
        if (req.params.addressId === 'home') {
            user.addresses = [];
        } else {
            // Handle specific address ID case
            user.addresses = user.addresses.filter(
                addr => addr._id.toString() !== req.params.addressId
            );
        }

        await user.save();

        res.status(200).json({
            success: true,
            data: user.addresses
        });
    } catch (error) {
        console.error('Delete address error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Get wishlist
// @route   GET /api/users/wishlist
// @access  Private
exports.getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('wishlist');

        res.status(200).json({
            success: true,
            data: user.wishlist
        });
    } catch (error) {
        console.error('Get wishlist error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Add to wishlist
// @route   POST /api/users/wishlist/:productId
// @access  Private
exports.addToWishlist = async (req, res) => {
    try {
        console.log('Add to wishlist - Product ID:', req.params.productId);
        console.log('Add to wishlist - User ID:', req.user.id);
        console.log('Add to wishlist - Request body:', req.body);
        
        const productId = req.params.productId;
        const productName = req.body.productName || '';
        const productData = req.body.productData || {};
        console.log('Add to wishlist - Product ID type:', typeof productId);
        console.log('Add to wishlist - Product ID length:', productId.length);
        
        // Try to find product by ID (handles ObjectId, string, and numeric IDs)
        let product;
        if (mongoose.Types.ObjectId.isValid(productId)) {
            console.log('Add to wishlist - Using ObjectId lookup');
            product = await Product.findById(productId);
        } else {
            console.log('Add to wishlist - Using fallback lookup for numeric/string ID');
            
            // For numeric IDs, try to find by multiple methods
            if (!isNaN(productId)) {
                console.log('Add to wishlist - Numeric ID detected:', productId);
                
                // Method 1: Try to find by numeric ID field if it exists
                product = await Product.findOne({ 
                    $or: [
                        { id: parseInt(productId) },
                        { productId: parseInt(productId) },
                        { numericId: parseInt(productId) }
                    ]
                });
                
                if (product) {
                    console.log('Add to wishlist - Found product by numeric ID field:', product.name);
                } else {
                    // Method 2: Try exact name matching (since database now has all products)
                    if (productName) {
                        console.log('Add to wishlist - Looking for exact product:', productName);
                        
                        // Try exact match first
                        product = await Product.findOne({ 
                            name: productName
                        });
                        
                        if (product) {
                            console.log('Add to wishlist - Found product by EXACT name:', product.name);
                        } else {
                            console.log('Add to wishlist - Exact match failed, trying case-insensitive...');
                            // Try case-insensitive exact match
                            product = await Product.findOne({ 
                                name: { $regex: `^${productName}$`, $options: 'i' }
                            });
                            
                            if (product) {
                                console.log('Add to wishlist - Found product by case-insensitive name:', product.name);
                            } else {
                                console.log('Add to wishlist - Case-insensitive failed, trying partial match...');
                                // Try partial name match (last resort)
                                product = await Product.findOne({ 
                                    name: { $regex: productName, $options: 'i' }
                                });
                                
                                if (product) {
                                    console.log('Add to wishlist - Found product by partial name:', product.name);
                                } else {
                                    console.log('Add to wishlist - All name-based methods failed');
                                }
                            }
                        }
                    }
                    
                    if (!product) {
                        console.log('Add to wishlist - Trying fallback methods...');
                        // Method 3: Try to find by name containing the number (LAST RESORT)
                        product = await Product.findOne({ 
                            name: { $regex: productId.toString(), $options: 'i' }
                        });
                        
                        if (product) {
                            console.log('Add to wishlist - Found product by NUMBER regex (fallback):', product.name);
                        } else {
                            // Method 4: Try to find by any field containing the number
                            product = await Product.findOne({ 
                                $or: [
                                    { name: { $regex: productId.toString(), $options: 'i' } },
                                    { description: { $regex: productId.toString(), $options: 'i' } },
                                    { 'specifications.id': productId.toString() },
                                    { tags: productId.toString() }
                                ]
                            });
                            
                            if (product) {
                                console.log('Add to wishlist - Found product by field search:', product.name);
                            } else {
                                // Method 5: Use index-based lookup with modulo to prevent out of bounds
                                const allProducts = await Product.find().sort({ createdAt: 1 });
                                console.log('Add to wishlist - Total products in database:', allProducts.length);
                                
                                if (allProducts.length > 0) {
                                    // Use modulo to wrap around and prevent out of bounds
                                    const productIndex = (parseInt(productId) - 1) % allProducts.length;
                                    product = allProducts[productIndex];
                                    console.log('Add to wishlist - Using modulo index lookup:', productIndex, '->', product.name);
                                }
                            }
                        }
                    }
                }
            } else {
                // For non-numeric strings, try other fields
                product = await Product.findOne({ 
                    $or: [
                        { name: productId },
                        { 'specifications.id': productId },
                        { tags: productId }
                    ]
                });
            }
        }
        
        console.log('Add to wishlist - Product found:', !!product);

        if (!product) {
            console.log('Add to wishlist - Product not found for ID:', req.params.productId);
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        const user = await User.findById(req.user.id);
        console.log('Add to wishlist - User found:', !!user);

        // Check if already in wishlist (compare with actual product ObjectId)
        if (user.wishlist.some(id => id.toString() === product._id.toString())) {
            console.log('Add to wishlist - Product already in wishlist');
            return res.status(400).json({
                success: false,
                message: 'Product already in wishlist'
            });
        }

        user.wishlist.push(product._id);
        await user.save();
        console.log('Add to wishlist - User wishlist updated');

        const updatedUser = await User.findById(req.user.id).populate('wishlist');
        console.log('Add to wishlist - Updated user with populated wishlist');

        res.status(200).json({
            success: true,
            message: 'Added to wishlist',
            data: updatedUser.wishlist
        });
    } catch (error) {
        console.error('Add to wishlist error:', error);
        console.error('Add to wishlist error stack:', error.stack);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Remove from wishlist
// @route   DELETE /api/users/wishlist/:productId
// @access  Private
exports.removeFromWishlist = async (req, res) => {
    try {
        console.log('Remove from wishlist - Product ID:', req.params.productId);
        console.log('Remove from wishlist - User ID:', req.user.id);
        console.log('Remove from wishlist - Request body:', req.body);
        
        const productId = req.params.productId;
        const productName = req.body.productName || '';
        const productData = req.body.productData || {};
        console.log('Remove from wishlist - Product ID type:', typeof productId);
        console.log('Remove from wishlist - Product ID length:', productId.length);
        
        // First, find the product to get its actual ObjectId
        let product;
        if (mongoose.Types.ObjectId.isValid(productId)) {
            console.log('Remove from wishlist - Using ObjectId lookup');
            product = await Product.findById(productId);
        } else {
            console.log('Remove from wishlist - Using fallback lookup for numeric/string ID');
            
            // For numeric IDs, try to find by multiple methods
            if (!isNaN(productId)) {
                console.log('Remove from wishlist - Numeric ID detected:', productId);
                
                // Method 1: Try to find by numeric ID field if it exists
                product = await Product.findOne({ 
                    $or: [
                        { id: parseInt(productId) },
                        { productId: parseInt(productId) },
                        { numericId: parseInt(productId) }
                    ]
                });
                
                if (product) {
                    console.log('Remove from wishlist - Found product by numeric ID field:', product.name);
                } else {
                    // Method 2: Try exact name matching (since database now has all products)
                    if (productName) {
                        console.log('Remove from wishlist - Looking for exact product:', productName);
                        
                        // Try exact match first
                        product = await Product.findOne({ 
                            name: productName
                        });
                        
                        if (product) {
                            console.log('Remove from wishlist - Found product by EXACT name:', product.name);
                        } else {
                            console.log('Remove from wishlist - Exact match failed, trying case-insensitive...');
                            // Try case-insensitive exact match
                            product = await Product.findOne({ 
                                name: { $regex: `^${productName}$`, $options: 'i' }
                            });
                            
                            if (product) {
                                console.log('Remove from wishlist - Found product by case-insensitive name:', product.name);
                            } else {
                                console.log('Remove from wishlist - Case-insensitive failed, trying partial match...');
                                // Try partial name match (last resort)
                                product = await Product.findOne({ 
                                    name: { $regex: productName, $options: 'i' }
                                });
                                
                                if (product) {
                                    console.log('Remove from wishlist - Found product by partial name:', product.name);
                                } else {
                                    console.log('Remove from wishlist - All name-based methods failed');
                                }
                            }
                        }
                    }
                    
                    if (!product) {
                        console.log('Remove from wishlist - Trying fallback methods...');
                        // Method 3: Try to find by name containing the number (LAST RESORT)
                        product = await Product.findOne({ 
                            name: { $regex: productId.toString(), $options: 'i' }
                        });
                        
                        if (product) {
                            console.log('Remove from wishlist - Found product by NUMBER regex (fallback):', product.name);
                        } else {
                            // Method 4: Try to find by any field containing the number
                            product = await Product.findOne({ 
                                $or: [
                                    { name: { $regex: productId.toString(), $options: 'i' } },
                                    { description: { $regex: productId.toString(), $options: 'i' } },
                                    { 'specifications.id': productId.toString() },
                                    { tags: productId.toString() }
                                ]
                            });
                            
                            if (product) {
                                console.log('Remove from wishlist - Found product by field search:', product.name);
                            } else {
                                // Method 5: Use index-based lookup with modulo to prevent out of bounds
                                const allProducts = await Product.find().sort({ createdAt: 1 });
                                console.log('Remove from wishlist - Total products in database:', allProducts.length);
                                
                                if (allProducts.length > 0) {
                                    // Use modulo to wrap around and prevent out of bounds
                                    const productIndex = (parseInt(productId) - 1) % allProducts.length;
                                    product = allProducts[productIndex];
                                    console.log('Remove from wishlist - Using modulo index lookup:', productIndex, '->', product.name);
                                }
                            }
                        }
                    }
                }
            } else {
                // For non-numeric strings, try other fields
                product = await Product.findOne({ 
                    $or: [
                        { name: productId },
                        { 'specifications.id': productId },
                        { tags: productId }
                    ]
                });
            }
        }
        
        if (!product) {
            console.log('Remove from wishlist - Product not found for ID:', req.params.productId);
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        const user = await User.findById(req.user.id);
        console.log('Remove from wishlist - User found:', !!user);

        // Remove using the actual product ObjectId
        user.wishlist = user.wishlist.filter(
            id => id.toString() !== product._id.toString()
        );

        await user.save();
        console.log('Remove from wishlist - User wishlist updated');

        const updatedUser = await User.findById(req.user.id).populate('wishlist');
        console.log('Remove from wishlist - Updated user with populated wishlist');

        res.status(200).json({
            success: true,
            message: 'Removed from wishlist',
            data: updatedUser.wishlist
        });
    } catch (error) {
        console.error('Remove from wishlist error:', error);
        console.error('Remove from wishlist error stack:', error.stack);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get all users (Admin)
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 20;
        const startIndex = (page - 1) * limit;

        const total = await User.countDocuments();
        const users = await User.find()
            .sort({ createdAt: -1 })
            .skip(startIndex)
            .limit(limit);

        res.status(200).json({
            success: true,
            count: users.length,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            data: users
        });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Get single user (Admin)
// @route   GET /api/users/:id
// @access  Private/Admin
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Delete user (Admin)
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        await user.deleteOne();

        res.status(200).json({
            success: true,
            message: 'User deleted'
        });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
