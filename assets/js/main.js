// Main JavaScript functionality
// Cart functionality
function updateTotals() {
    let subtotal = 0;
    document.querySelectorAll('.cart-item').forEach(item => {
        const price = parseFloat(item.querySelector('.text-muted').textContent.replace('$', ''));
        const quantity = parseInt(item.querySelector('.qty-input').value);
        const total = price * quantity;
        item.querySelector('.product-total').textContent = formatPrice(total);
        subtotal += total;
    });

    const shipping = 9.99;
    const total = subtotal + shipping;

    document.getElementById('subtotal').textContent = formatPrice(subtotal);
    document.getElementById('shipping').textContent = formatPrice(shipping);
    document.getElementById('total').textContent = formatPrice(total);
}

function formatPrice(price) {
    return '$' + price.toFixed(2);
}

// Product functionality
// In main.js, update the product handlers:

function initializeProductHandlers() {
    // Add to cart
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const product = {
                id: Date.now(), // Using timestamp as a simple unique ID
                name: productCard.querySelector('.card-title').textContent,
                price: parseFloat(productCard.querySelector('.card-text.fw-bold').textContent.replace('$', '')),
                image: productCard.querySelector('img').src
            };
            
            cartManager.addToCart(product);
            
            // Show feedback to user
            const originalText = this.textContent;
            this.textContent = 'Added!';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 1500);
        });
    });

    // Quantity buttons
    document.querySelectorAll('.decrease-qty, .increase-qty').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.qty-input');
            const cartItem = this.closest('.cart-item');
            const productId = parseInt(cartItem.dataset.id);
            let newQuantity = parseInt(input.value);

            if (this.classList.contains('decrease-qty') && newQuantity > 1) {
                newQuantity--;
            } else if (this.classList.contains('increase-qty') && newQuantity < 10) {
                newQuantity++;
            }

            input.value = newQuantity;
            cartManager.updateQuantity(productId, newQuantity);
            updateTotals();
        });
    });
}

// Account functionality
function showProfileTab(tabName) {
    // Update active state of navigation buttons
    document.querySelectorAll('.list-group-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.classList.add('active');

    // Show selected tab content
    document.querySelectorAll('.profile-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(tabName + 'Tab').classList.add('active');
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeProductHandlers();
    
    // Check if we're on a cart page
    if (document.querySelector('.cart-item')) {
        updateTotals();
    }
});

// Add this to the bottom of main.js or in a new <script> tag in products/index.html
function initializePagination() {
    const pages = document.querySelectorAll('.pagination .page-link');
    const productsPerPage = 4;
    let currentPage = 1;

    // Sample product data - in a real app, this would come from a backend
    const allProducts = [
        { name: 'Smartphone', price: 699.99, category: 'Electronics' },
        { name: 'Cotton T-Shirt', price: 24.99, category: 'Clothing' },
        { name: 'Programming Guide', price: 39.99, category: 'Books' },
        { name: 'Wireless Headphones', price: 149.99, category: 'Electronics' },
        // Page 2
        { name: 'Laptop', price: 999.99, category: 'Electronics' },
        { name: 'Jeans', price: 49.99, category: 'Clothing' },
        { name: 'Novel', price: 19.99, category: 'Books' },
        { name: 'Smart Watch', price: 299.99, category: 'Electronics' },
        // Page 3
        { name: 'Bluetooth Speaker', price: 79.99, category: 'Electronics' },
        { name: 'Hoodie', price: 39.99, category: 'Clothing' },
        { name: 'Cookbook', price: 29.99, category: 'Books' },
        { name: 'Tablet', price: 449.99, category: 'Electronics' }
    ];

    pages.forEach(page => {
        page.addEventListener('click', function(e) {
            e.preventDefault();
            if (this.textContent === 'Previous') {
                if (currentPage > 1) currentPage--;
            } else if (this.textContent === 'Next') {
                if (currentPage < Math.ceil(allProducts.length / productsPerPage)) currentPage++;
            } else {
                currentPage = parseInt(this.textContent);
            }
            updateProducts(currentPage);
            updatePaginationState();
        });
    });

    function updateProducts(page) {
        const start = (page - 1) * productsPerPage;
        const end = start + productsPerPage;
        const pageProducts = allProducts.slice(start, end);
        
        const productsGrid = document.getElementById('productsGrid');
        productsGrid.innerHTML = pageProducts.map(product => `
            <div class="col-12 col-md-4 col-lg-3 mb-4">
                <div class="card product-card">
                    <span class="badge bg-primary category-badge">${product.category}</span>
                    <img src="/api/placeholder/300/200" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text text-muted">Latest model with great features</p>
                        <p class="card-text fw-bold">$${product.price}</p>
                        <button class="btn btn-primary w-100 btn-add-to-cart">Add to Cart</button>
                    </div>
                </div>
            </div>
        `).join('');

        // Reinitialize product handlers for new products
        initializeProductHandlers();
    }

    function updatePaginationState() {
        const totalPages = Math.ceil(allProducts.length / productsPerPage);
        
        // Update active state
        pages.forEach(page => {
            if (page.textContent === currentPage.toString()) {
                page.parentElement.classList.add('active');
            } else {
                page.parentElement.classList.remove('active');
            }
        });

        // Update Previous/Next buttons
        const prevButton = document.querySelector('.pagination .page-item:first-child');
        const nextButton = document.querySelector('.pagination .page-item:last-child');
        
        prevButton.classList.toggle('disabled', currentPage === 1);
        nextButton.classList.toggle('disabled', currentPage === totalPages);
    }

    // Initialize search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterAndDisplayProducts();
        });
    }

    // Initialize category filter
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            filterAndDisplayProducts();
        });
    }

    // Initialize sort filter
    const sortFilter = document.getElementById('sortFilter');
    if (sortFilter) {
        sortFilter.addEventListener('change', function() {
            filterAndDisplayProducts();
        });
    }

    function filterAndDisplayProducts() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const categoryValue = categoryFilter ? categoryFilter.value.toLowerCase() : '';
        const sortValue = sortFilter ? sortFilter.value : 'default';

        let filteredProducts = allProducts.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm);
            const matchesCategory = !categoryValue || product.category.toLowerCase() === categoryValue;
            return matchesSearch && matchesCategory;
        });

        // Apply sorting
        if (sortValue === 'price-low') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'price-high') {
            filteredProducts.sort((a, b) => b.price - a.price);
        }

        // Reset to first page when filtering
        currentPage = 1;
        updateProducts(currentPage);
        updatePaginationState();
    }

    // Initialize the first page
    updateProducts(1);
    updatePaginationState();
}

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializePagination();
});