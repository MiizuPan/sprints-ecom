class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartIcon();
    }

    addToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }

        this.saveCart();
        this.updateCartIcon();
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartIcon();
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    updateCartIcon() {
        const cartIcon = document.getElementById('cart-icon');
        if (cartIcon) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartIcon.textContent = `Cart (${totalItems})`;
        }
    }

    getCart() {
        return this.cart;
    }
}

const cartManager = new CartManager(); 