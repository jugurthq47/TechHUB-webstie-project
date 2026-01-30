# TechHub - Full Stack E-Commerce Website

A complete full-stack e-commerce website for computer components built with Node.js, Express, MongoDB, and vanilla JavaScript frontend.

## 🚀 Features

### Backend
- **Authentication**: JWT-based authentication with secure password hashing
- **User Management**: Registration, login, profile updates, address management
- **Product Management**: CRUD operations, categories, brands, search, filtering
- **Shopping Cart**: Add, remove, update quantities, persistent cart
- **Order System**: Order creation, status tracking, order history
- **Wishlist**: Save favorite products with real-time synchronization
- **Reviews**: Product ratings and reviews with interactive forms
- **Security**: Helmet, rate limiting, CORS, input validation

### Frontend
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Mode**: Toggle between light and dark themes
- **Product Browsing**: Categories, brands, search, filters, sorting
- **Shopping Cart**: Add items, update quantities, checkout
- **User Dashboard**: Profile, orders, addresses, wishlist
- **Modern UI**: Clean design with smooth animations and micro-interactions
- **Real-time Updates**: Wishlist and cart sync across pages

## 📁 Project Structure

```
full-stack-website/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── cart.js
│   │   ├── orders.js
│   │   ├── products.js
│   │   └── users.js
│   ├── utils/
│   │   └── seedData.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend/
    └── public/
        ├── css/
        ├── js/
        │   ├── api.js
        │   ├── auth.js
        │   ├── cart-api.js
        │   └── ...
        ├── index.html
        └── ...
```

## 🛠️ Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd full-stack-website/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/techhub
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

5. Seed the database with sample data:
```bash
npm run seed
```

6. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

### Frontend Setup

The frontend is a static site that can be served directly. For development:

1. You can use any static file server, such as:
```bash
# Using Python
cd full-stack-website/frontend/public
python -m http.server 3000

# Using Node.js http-server
npx http-server ./full-stack-website/frontend/public -p 3000

# Using live-server for auto-reload
npx live-server ./full-stack-website/frontend/public --port=3000
```

2. Or simply open the HTML files in your browser

## � How to Use the Project

### Quick Start Guide

1. **Start the Backend Server**
   ```bash
   cd full-stack-website/backend
   npm run dev
   ```
   The server will start on `http://localhost:5000`

2. **Start the Frontend**
   ```bash
   # In a new terminal
   cd full-stack-website/frontend/public
   npx live-server --port=3000
   ```
   Open `http://localhost:3000` in your browser

### User Guide

#### 🏠 Homepage Features
- **Product Gallery**: Browse all available computer components
- **Search Bar**: Find products by name, brand, or description
- **Filters**: Filter by category (processors, graphics cards, etc.) and brand
- **Sorting**: Sort by price (low/high), name, or rating
- **Dark Mode Toggle**: Switch between light and dark themes

#### 🔐 Authentication
1. **Sign Up**: Create a new account with email and password
2. **Login**: Access your account with existing credentials
3. **Profile Management**: Update personal information, add addresses

#### 🛒 Shopping Cart
1. **Add to Cart**: Click the "Add to Cart" button on any product
2. **View Cart**: Click the cart icon in the navigation bar
3. **Update Quantities**: Use + and - buttons to adjust quantities
4. **Remove Items**: Click the trash icon to remove items
5. **Checkout**: Proceed to payment (demo checkout flow)

#### ❤️ Wishlist Management
1. **Add to Wishlist**: Click the heart icon on product cards or details page
2. **View Wishlist**: Access from your profile page
3. **Remove Items**: Click the "Remove" button in wishlist
4. **Real-time Sync**: Wishlist updates across all open tabs

#### 📝 Product Reviews
1. **Write Reviews**: Click the "Write Review" button on product details
2. **Star Rating**: Select 1-5 stars for rating
3. **Add Comments**: Write title and detailed review
4. **View Reviews**: See all reviews on product details page

#### 👤 User Dashboard
- **Profile Information**: View and edit personal details
- **Order History**: Track past and current orders
- **Shipping Addresses**: Manage multiple delivery addresses
- **Wishlist**: View and manage saved products

### Navigation Guide

#### Main Pages
- **Home** (`index.html`): Product browsing and search
- **Product Details** (`product-details.html`): Individual product information
- **Profile** (`profile.html`): User dashboard and settings
- **Cart Modal**: Shopping cart management (accessible from any page)
- **Checkout** (`checkout.html`): Payment and shipping information

#### Key Interactions
- **Product Cards**: Click product name or image to view details
- **Cart Icon**: Shows item count, click to view cart
- **User Icon**: Access profile and account settings
- **Search**: Real-time product search as you type
- **Filters**: Instant product filtering without page reload

### Admin Features

#### Default Admin Account
- **Email**: admin@techhub.com
- **Password**: admin123

#### Admin Capabilities
- **Product Management**: Add, edit, delete products
- **Order Management**: View and update order statuses
- **User Management**: View user accounts and orders

### Tips & Tricks

#### Shopping Experience
- **Compare Products**: Use wishlist to save items for comparison
- **Quick Search**: Type brand names (Intel, AMD, NVIDIA) for fast results
- **Category Browsing**: Use category filters for focused shopping
- **Stock Information**: Check availability on product cards

#### Account Management
- **Save Addresses**: Add multiple shipping addresses for convenience
- **Track Orders**: Monitor order status in real-time
- **Wishlist Sync**: Your wishlist syncs automatically across devices

#### Technical Features
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Dark Mode**: Easy on the eyes during nighttime browsing
- **Real-time Updates**: Cart and wishlist update instantly
- **Smooth Animations**: Enjoy polished micro-interactions

### Troubleshooting

#### Common Issues
1. **Server Not Starting**: Check if MongoDB is running and port 5000 is free
2. **Images Not Loading**: Ensure backend is serving static files
3. **Cart Issues**: Clear browser cache and refresh the page
4. **Login Problems**: Verify email/password and check network connection

#### Getting Help
- Check browser console for error messages
- Ensure both backend and frontend are running
- Verify MongoDB connection in `.env` file
- Restart servers if experiencing issues

## � API Documentation

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/me` | Get current user |
| PUT | `/api/auth/updatedetails` | Update user details |
| PUT | `/api/auth/updatepassword` | Update password |

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| GET | `/api/products/featured` | Get featured products |
| GET | `/api/products/brands` | Get all brands |
| GET | `/api/products/categories` | Get all categories |
| POST | `/api/products/:id/reviews` | Add product review |
| POST | `/api/products` | Create product (Admin) |
| PUT | `/api/products/:id` | Update product (Admin) |
| DELETE | `/api/products/:id` | Delete product (Admin) |

### Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get user's cart |
| POST | `/api/cart/add` | Add item to cart |
| PUT | `/api/cart/update/:productId` | Update item quantity |
| DELETE | `/api/cart/remove/:productId` | Remove item from cart |
| DELETE | `/api/cart/clear` | Clear cart |

### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create new order |
| GET | `/api/orders` | Get user's orders |
| GET | `/api/orders/:id` | Get single order |
| PUT | `/api/orders/:id/cancel` | Cancel order |
| PUT | `/api/orders/:id/pay` | Update payment status |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/profile` | Get user profile |
| PUT | `/api/users/profile` | Update profile |
| POST | `/api/users/address` | Add address |
| PUT | `/api/users/address/:id` | Update address |
| DELETE | `/api/users/address/:id` | Delete address |
| GET | `/api/users/wishlist` | Get wishlist |
| POST | `/api/users/wishlist/:productId` | Add to wishlist |
| DELETE | `/api/users/wishlist/:productId` | Remove from wishlist |

## 🔐 Default Credentials

After running the seed script:

**Admin Account:**
- Email: admin@techhub.com
- Password: admin123

**Test User:**
- Email: john@example.com
- Password: password123

## 🔧 Configuration Options

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/techhub |
| JWT_SECRET | JWT signing secret | - |
| JWT_EXPIRE | JWT expiration | 7d |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:3000 |

## 🔄 Development Workflow

### Project Architecture
```
Frontend (Static Files) ←→ Backend API ←→ MongoDB Database
       ↓                        ↓                ↓
   User Interface         Business Logic      Data Persistence
   Real-time Updates       JWT Auth          Product/User Data
   Cart/Wishlist Sync      REST API          Order Management
```

### Key Features Implementation

#### Real-time Wishlist Synchronization
- **Storage Events**: Cross-tab communication using localStorage
- **Periodic Checks**: 5-second intervals for reliability
- **Visibility API**: Updates when user returns to tab
- **Product ID Mapping**: Frontend IDs (1-44) ↔ MongoDB ObjectIds

#### Shopping Cart System
- **Persistent Storage**: Database-backed cart for logged-in users
- **Local Fallback**: localStorage for guest users
- **Real-time Updates**: Cart count updates across all pages
- **Product Resolution**: Name-based product matching

#### Review System
- **Interactive Forms**: Star rating with hover effects
- **Modal Interface**: Clean, accessible review submission
- **Real-time Display**: Reviews appear immediately after submission
- **Validation**: Required fields and proper input handling

### Development Tips

#### Frontend Development
- **Modular CSS**: Organized by component (auth, products, profile)
- **Vanilla JavaScript**: No frameworks required, ES6+ features
- **Responsive Design**: Mobile-first approach with breakpoints
- **Dark Mode**: CSS custom properties for theme switching

#### Backend Development
- **RESTful API**: Standard HTTP methods and status codes
- **Error Handling**: Comprehensive error middleware
- **Security**: Rate limiting, CORS, input validation
- **Data Validation**: Mongoose schemas and express-validator

#### Database Design
- **User Schema**: Profile, addresses, wishlist, orders
- **Product Schema**: Categories, brands, ratings, stock
- **Cart Schema**: User-specific with product references
- **Order Schema**: Status tracking and timestamps

## 🧪 Testing

Test the API using tools like:
- Postman
- curl
- Thunder Client (VS Code extension)

Example API test:
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","password":"test123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Get products
curl http://localhost:5000/api/products
```

## 📦 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Security**: helmet, cors, express-rate-limit

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Flexbox, Grid
- **JavaScript**: Vanilla ES6+
- **Icons**: Font Awesome

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🎯 Project Summary

TechHub is a production-ready e-commerce platform demonstrating full-stack web development capabilities. The project showcases:

### Technical Excellence
- **Clean Architecture**: Separation of concerns with modular design
- **Real-time Features**: Wishlist synchronization across browser tabs
- **Responsive Design**: Seamless experience on all devices
- **Security Best Practices**: JWT authentication, input validation, rate limiting
- **Performance**: Efficient database queries and optimized frontend rendering

### User Experience
- **Intuitive Navigation**: Clear user flow from browsing to checkout
- **Modern UI**: Polished interface with smooth animations
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Error Handling**: Graceful degradation and user-friendly error messages

### Business Features
- **Complete E-commerce Flow**: Product discovery → Cart → Checkout → Orders
- **User Management**: Profiles, addresses, order history
- **Product Management**: Categories, brands, search, filtering
- **Review System**: Customer feedback and ratings

## � Future Enhancements

### Planned Features
- **Payment Integration**: Stripe/PayPal payment processing
- **Admin Dashboard**: Complete product and order management interface
- **Email Notifications**: Order confirmations and shipping updates
- **Product Recommendations**: AI-powered product suggestions
- **Advanced Search**: Full-text search with filters and sorting
- **Inventory Management**: Real-time stock tracking and alerts

### Technical Improvements
- **Unit Testing**: Comprehensive test coverage for frontend and backend
- **Docker Support**: Containerized deployment
- **CI/CD Pipeline**: Automated testing and deployment
- **Performance Optimization**: Caching, lazy loading, code splitting
- **SEO Optimization**: Meta tags, sitemaps, structured data
- **PWA Features**: Offline support and app-like experience

### Scaling Considerations
- **Database Optimization**: Indexing, query optimization, sharding
- **Load Balancing**: Multiple server instances
- **CDN Integration**: Static asset delivery optimization
- **Microservices Architecture**: Service separation for scalability

## 📊 Project Statistics

- **Backend**: 15+ API endpoints, 5 data models, comprehensive middleware
- **Frontend**: 8 HTML pages, 11 CSS modules, 12 JavaScript files
- **Features**: Authentication, cart, wishlist, reviews, orders, search
- **Responsive**: Mobile, tablet, desktop optimized
- **Dark Mode**: Complete theme implementation
- **Real-time**: Cross-tab synchronization

## �🙏 Acknowledgments

- **Font Awesome**: For beautiful icons throughout the interface
- **Unsplash**: For high-quality product placeholder images
- **MongoDB**: For robust database functionality
- **Node.js Community**: For excellent packages and tools
- **MDN Web Docs**: For comprehensive web development references

## 📞 Support

For questions, issues, or contributions:
- **Issues**: Report bugs or request features via GitHub Issues
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Contributions**: Follow the contributing guidelines above
- **Documentation**: Check this README and inline code comments

---

**Built with ❤️ using modern web technologies**
