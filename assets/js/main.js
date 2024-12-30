// Sample product data (in a real app, this would come from a backend)
const products = [
    {
        id: 1,
        name: "Product 1",
        price: 29.99,
        image: "assets/images/product1.jpg",
        description: "Product 1 description"
    },
    // Add more products as needed
];

function displayProducts(containerID) {
    const container = document.getElementById(containerID);
    if (!container) return;

    container.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="cartManager.addToCart(${JSON.stringify(product)})">
                Add to Cart
            </button>
        </div>
    `).join('');
}

// Initialize products on page load
document.addEventListener('DOMContentLoaded', () => {
    displayProducts('featured-products');
}); 