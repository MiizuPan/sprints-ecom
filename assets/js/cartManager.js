// Create this as a new file: assets/js/cartManager.js

// Cart state management
const cartManager = {
    // Initialize cart from localStorage or create empty cart
    initCart: function() {
        if (!localStorage.getItem('cart')) {
            localStorage.setItem('cart', JSON.stringify([]));
        }
        this.updateCartCount();
    },

    // Get current cart
    getCart: function() {
        return JSON.parse(localStorage.getItem('cart') || '[]');
    },

    // Save cart
    saveCart: function(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        this.updateCartCount();
    },

    // Add item to cart
    addToCart: function(product) {
        const cart = this.getCart();
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.image
            });
        }
        
        this.saveCart(cart);
    },

    // Remove item from cart
    removeFromCart: function(productId) {
        const cart = this.getCart();
        const updatedCart = cart.filter(item => item.id !== productId);
        this.saveCart(updatedCart);
    },

    // Update item quantity
    updateQuantity: function(productId, quantity) {
        const cart = this.getCart();
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            this.saveCart(cart);
        }
    },

    // Get cart total
    getCartTotal: function() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    // Update cart count in UI
    updateCartCount: function() {
        const cart = this.getCart();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('#cartCount');
        cartCountElements.forEach(element => {
            element.textContent = count;
        });
    },

    // Clear cart
    clearCart: function() {
        localStorage.setItem('cart', JSON.stringify([]));
        this.updateCartCount();
    }
};

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    cartManager.initCart();
});