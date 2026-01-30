// API Configuration and Services
const API_BASE_URL = 'http://localhost:5000/api';

// Token management
const TokenService = {
    getToken: () => localStorage.getItem('token'),
    setToken: (token) => localStorage.setItem('token', token),
    removeToken: () => localStorage.removeItem('token'),
    getUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },
    setUser: (user) => localStorage.setItem('user', JSON.stringify(user)),
    removeUser: () => localStorage.removeItem('user'),
    isLoggedIn: () => !!localStorage.getItem('token')
};

// API Request helper
const apiRequest = async (endpoint, options = {}) => {
    const token = TokenService.getToken();
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers
        },
        ...options
    };

    try {
        console.log(`Making API request to: ${API_BASE_URL}${endpoint}`);
        console.log('Request config:', config);
        
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        let data;
        try {
            data = await response.json();
            console.log('Response data:', data);
        } catch (jsonError) {
            console.error('Failed to parse JSON response:', jsonError);
            const text = await response.text();
            console.log('Raw response text:', text);
            throw new Error('Invalid JSON response from server');
        }

        if (!response.ok) {
            const errorMessage = data?.message || data?.error || `HTTP ${response.status}: ${response.statusText}`;
            console.error('API request failed:', errorMessage);
            throw new Error(errorMessage);
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            endpoint: endpoint,
            config: config
        });
        throw error;
    }
};

// Auth API
const AuthAPI = {
    register: async (userData) => {
        const response = await apiRequest('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
        if (response.success && response.token) {
            TokenService.setToken(response.token);
            TokenService.setUser(response.data);
        }
        return response;
    },

    login: async (email, password) => {
        const response = await apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        if (response.success && response.token) {
            TokenService.setToken(response.token);
            TokenService.setUser(response.data);
        }
        return response;
    },

    logout: async () => {
        try {
            await apiRequest('/auth/logout', { method: 'POST' });
        } catch (error) {
            console.error('Logout error:', error);
        }
        TokenService.removeToken();
        TokenService.removeUser();
    },

    getMe: async () => {
        return await apiRequest('/auth/me');
    },

    updateDetails: async (userData) => {
        return await apiRequest('/auth/updatedetails', {
            method: 'PUT',
            body: JSON.stringify(userData)
        });
    },

    updatePassword: async (currentPassword, newPassword) => {
        return await apiRequest('/auth/updatepassword', {
            method: 'PUT',
            body: JSON.stringify({ currentPassword, newPassword })
        });
    }
};

// Products API
const ProductsAPI = {
    getAll: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return await apiRequest(`/products${queryString ? `?${queryString}` : ''}`);
    },

    getById: async (id) => {
        return await apiRequest(`/products/${id}`);
    },

    getFeatured: async (limit = 8) => {
        return await apiRequest(`/products/featured?limit=${limit}`);
    },

    getByCategory: async (category) => {
        return await apiRequest(`/products/category/${category}`);
    },

    getBrands: async () => {
        return await apiRequest('/products/brands');
    },

    getCategories: async () => {
        return await apiRequest('/products/categories');
    },

    addReview: async (productId, reviewData) => {
        return await apiRequest(`/products/${productId}/reviews`, {
            method: 'POST',
            body: JSON.stringify(reviewData)
        });
    },

    search: async (query) => {
        return await apiRequest(`/products?search=${encodeURIComponent(query)}`);
    }
};

// Cart API
const CartAPI = {
    get: async () => {
        return await apiRequest('/cart');
    },

    add: async (productId, quantity = 1, productName = '', productData = {}) => {
        return await apiRequest('/cart/add', {
            method: 'POST',
            body: JSON.stringify({ productId, quantity, productName, productData })
        });
    },

    update: async (productId, quantity) => {
        return await apiRequest(`/cart/update/${productId}`, {
            method: 'PUT',
            body: JSON.stringify({ quantity })
        });
    },

    remove: async (productId) => {
        return await apiRequest(`/cart/remove/${productId}`, {
            method: 'DELETE'
        });
    },

    clear: async () => {
        return await apiRequest('/cart/clear', {
            method: 'DELETE'
        });
    },

    getCount: async () => {
        return await apiRequest('/cart/count');
    }
};

// Orders API
const OrdersAPI = {
    create: async (orderData) => {
        return await apiRequest('/orders', {
            method: 'POST',
            body: JSON.stringify(orderData)
        });
    },

    getMyOrders: async () => {
        return await apiRequest('/orders');
    },

    getById: async (orderId) => {
        return await apiRequest(`/orders/${orderId}`);
    },

    cancel: async (orderId) => {
        return await apiRequest(`/orders/${orderId}/cancel`, {
            method: 'PUT'
        });
    },

    updatePayment: async (orderId, transactionId) => {
        return await apiRequest(`/orders/${orderId}/pay`, {
            method: 'PUT',
            body: JSON.stringify({ transactionId })
        });
    }
};

// User API
const UserAPI = {
    getProfile: async () => {
        return await apiRequest('/users/profile');
    },

    updateProfile: async (profileData) => {
        return await apiRequest('/users/profile', {
            method: 'PUT',
            body: JSON.stringify(profileData)
        });
    },

    addAddress: async (addressData) => {
        return await apiRequest('/users/address', {
            method: 'POST',
            body: JSON.stringify(addressData)
        });
    },

    updateAddress: async (addressId, addressData) => {
        return await apiRequest(`/users/address/${addressId}`, {
            method: 'PUT',
            body: JSON.stringify(addressData)
        });
    },

    deleteAddress: async (addressId) => {
        return await apiRequest(`/users/address/${addressId}`, {
            method: 'DELETE'
        });
    },

    getWishlist: async () => {
        return await apiRequest('/users/wishlist');
    },

    addToWishlist: async (productId) => {
        return await apiRequest(`/users/wishlist/${productId}`, {
            method: 'POST'
        });
    },

    removeFromWishlist: async (productId) => {
        return await apiRequest(`/users/wishlist/${productId}`, {
            method: 'DELETE'
        });
    },

    updatePreferences: async (preferences) => {
        return await apiRequest('/users/preferences', {
            method: 'PUT',
            body: JSON.stringify(preferences)
        });
    }
};

// Export for use in other scripts
window.API = {
    TokenService,
    AuthAPI,
    ProductsAPI,
    CartAPI,
    OrdersAPI,
    UserAPI,
    apiRequest
};
