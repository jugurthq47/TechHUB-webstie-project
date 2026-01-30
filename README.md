# TechHub E-Commerce Full-stack Website

A modern, responsive e-commerce frontend built with HTML, CSS, and JavaScript. Features a complete shopping experience with product browsing, cart management, user authentication, and profile management.

## 🚀 Features

### 🛍️ Shopping Experience
- **Product Catalog**: Browse products with filtering and search
- **Product Details**: Detailed product pages with specifications and reviews
- **Shopping Cart**: Full cart functionality with add/remove/update items
- **Wishlist**: Save favorite products for later

### 👤 User Management
- **Authentication**: Login and signup pages with modern UI
- **User Profile**: Comprehensive profile with order history and settings
- **Account Badges**: Premium member and verified status indicators

### 🎨 Design & UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean, professional design with smooth animations
- **Interactive Elements**: Hover effects, transitions, and micro-interactions
- **Consistent Theming**: Unified color scheme and design language

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and modern structure
- **CSS3**: Advanced styling with gradients, animations, and flexbox/grid
- **JavaScript (ES6+)**: Modern JavaScript with DOM manipulation
- **Font Awesome**: Icon library for UI elements
- **LocalStorage**: Client-side data persistence

## 📁 Project Structure

```
frontend/public/
├── css/
│   ├── main.css              # Main stylesheet
│   ├── base.css              # Base styles and variables
│   ├── navbar.css            # Navigation styling
│   ├── components.css        # Product cards and components
│   ├── modal.css             # Shopping cart modal
│   ├── product-details.css   # Product page specific styles
│   ├── profile.css           # Profile page styling
│   ├── auth.css              # Authentication pages
│   ├── footer.css            # Footer styling
│   └── responsive.css        # Media queries for responsiveness
├── js/
│   ├── script-standalone.js  # Main application logic
│   ├── product-details.js    # Product page functionality
│   ├── profile-ui-only.js    # Profile page interactions
│   └── auth-ui-only.js       # Authentication interactions
├── images/
│   └── products/             # Product images
├── index.html                # Homepage
├── product-details.html      # Product details page
├── profile.html              # User profile page
├── login.html                # Login page
└── signup.html               # Signup page
```

## 🎯 Key Features

### Shopping Cart System
- **Modal Interface**: Right-side sliding cart modal
- **Real-time Updates**: Cart count and total update instantly
- **Item Management**: Add, remove, and update quantities
- **Persistent Storage**: Cart data saved in localStorage

### Product Management
- **Dynamic Loading**: Products loaded from JavaScript data
- **Filtering & Search**: Filter by category, brand, and search by name
- **Sorting Options**: Sort by price, name, and popularity
- **Responsive Grid**: Adaptive layout for different screen sizes

### User Experience
- **Smooth Animations**: CSS transitions and JavaScript animations
- **Hover Effects**: Interactive feedback on all clickable elements
- **Loading States**: Professional loading indicators
- **Error Handling**: Graceful error management and user feedback

## 🌟 Design Highlights

### Modern Theming
- **Color Palette**: Professional blue and orange accent colors
- **Typography**: Clean, readable fonts with proper hierarchy
- **Shadows & Depth**: Subtle shadows for visual depth
- **Gradient Effects**: Modern gradients for buttons and backgrounds

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Breakpoints**: Carefully crafted media queries
- **Touch-Friendly**: Large touch targets for mobile users
- **Flexible Layouts**: Flexbox and grid for adaptive designs

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/jugurthq47/windsurf-project.git
   ```

2. Navigate to the project directory:
   ```bash
   cd windsurf-project/frontend/public
   ```

3. Open `index.html` in your web browser or serve with a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

## 📱 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 🎨 Customization

### Colors
Edit CSS variables in `css/base.css`:
```css
:root {
    --primary-color: #3b82f6;
    --secondary-color: #2563eb;
    --accent-color: #f97316;
    /* ... */
}
```

### Products
Update product data in `js/products-data.js`:
```javascript
const products = [
    {
        id: 1,
        name: "Product Name",
        price: 99.99,
        // ... other properties
    }
];
```

## 🔧 Features Implemented

### ✅ Completed Features
- [x] Product catalog with filtering and search
- [x] Shopping cart with full CRUD operations
- [x] User authentication pages
- [x] User profile with order history
- [x] Responsive design for all screen sizes
- [x] Modern UI with animations and transitions
- [x] LocalStorage for data persistence
- [x] Cross-browser compatibility

### 🚀 Future Enhancements
- [ ] Backend API integration
- [ ] Payment processing
- [ ] User reviews and ratings
- [ ] Product comparison
- [ ] Advanced search with filters
- [ ] Social sharing features

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Jugurtha Sidi Said**
- GitHub: [@jugurthq47](https://github.com/jugurthq47)
- Email: jugurthasidisaid@gmail.com

## 🙏 Acknowledgments

- Font Awesome for the amazing icon library
- Modern CSS techniques and best practices
- Responsive design principles
- JavaScript ES6+ features

---

⭐ If you like this project, please give it a star on GitHub!
