const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity cannot be less than 1'],
        default: 1
    }
});

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: [cartItemSchema],
    totalItems: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Calculate totals before saving
cartSchema.pre('save', function(next) {
    this.totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
    this.totalPrice = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    next();
});

// Method to add item to cart
cartSchema.methods.addItem = async function(product, quantity = 1) {
    const existingItemIndex = this.items.findIndex(
        item => item.product.toString() === product._id.toString()
    );

    if (existingItemIndex > -1) {
        this.items[existingItemIndex].quantity += quantity;
    } else {
        this.items.push({
            product: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity
        });
    }

    return this.save();
};

// Method to remove item from cart
cartSchema.methods.removeItem = async function(productId) {
    this.items = this.items.filter(
        item => item.product.toString() !== productId.toString()
    );
    return this.save();
};

// Method to update item quantity
cartSchema.methods.updateItemQuantity = async function(productId, quantity) {
    const itemIndex = this.items.findIndex(
        item => item.product.toString() === productId.toString()
    );

    if (itemIndex > -1) {
        if (quantity <= 0) {
            this.items.splice(itemIndex, 1);
        } else {
            this.items[itemIndex].quantity = quantity;
        }
    }

    return this.save();
};

// Method to clear cart
cartSchema.methods.clearCart = async function() {
    this.items = [];
    return this.save();
};

module.exports = mongoose.model('Cart', cartSchema);
