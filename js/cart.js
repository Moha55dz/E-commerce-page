function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cloth_cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total-price');
    
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
        if (subtotalEl) subtotalEl.innerText = '$0.00';
        if (totalEl) totalEl.innerText = '$0.00';
        return;
    }

    cartItemsContainer.innerHTML = `
        <table class="cart-table">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                ${cart.map(item => `
                    <tr>
                        <td>
                            <div class="cart-product">
                                <img src="${item.image}" alt="${item.name}">
                                <span>${item.name}</span>
                            </div>
                        </td>
                        <td>$${item.price.toFixed(2)}</td>
                        <td>
                            <div class="quantity-controls">
                                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                                <span>${item.quantity}</span>
                                <button onclick="updateQuantity(${item.id}, 1)">+</button>
                            </div>
                        </td>
                        <td>$${(item.price * item.quantity).toFixed(2)}</td>
                        <td><button class="remove-btn" onclick="removeItem(${item.id})"><i class="fas fa-trash"></i></button></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    subtotalEl.innerText = `$${subtotal.toFixed(2)}`;
    totalEl.innerText = `$${subtotal.toFixed(2)}`;
}

window.updateQuantity = function(id, change) {
    let cart = JSON.parse(localStorage.getItem('vanta_cart')) || [];
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
        localStorage.setItem('vanta_cart', JSON.stringify(cart));
        displayCart();
        updateCartCount();
    }
};

window.removeItem = function(id) {
    let cart = JSON.parse(localStorage.getItem('vanta_cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('vanta_cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
};

function initProductDetail() {
    const detailContainer = document.getElementById('product-detail');
    if (!detailContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);

    if (!product) {
        detailContainer.innerHTML = '<h2>Product not found</h2>';
        return;
    }

    detailContainer.innerHTML = `
        <div class="product-detail-flex">
            <div class="product-detail-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-detail-info">
                <p class="category">${product.category}</p>
                <h1>${product.name}</h1>
                <p class="price">$${product.price.toFixed(2)}</p>
                <div class="description">
                    <h3>Description</h3>
                    <p>${product.description}</p>
                </div>
                <button class="btn btn-primary add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `;
}

// Add CSS for cart and product detail
const extraStyles = `
    .cart-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
    .cart-table th { text-align: left; padding: 15px; border-bottom: 1px solid #ddd; }
    .cart-table td { padding: 15px; border-bottom: 1px solid #eee; }
    .cart-product { display: flex; align-items: center; gap: 15px; }
    .cart-product img { width: 80px; height: 80px; object-fit: cover; border-radius: 8px; }
    .quantity-controls { display: flex; align-items: center; gap: 10px; }
    .quantity-controls button { width: 30px; height: 30px; border: 1px solid #ddd; background: white; cursor: pointer; border-radius: 4px; }
    .remove-btn { color: #e74c3c; background: none; border: none; cursor: pointer; font-size: 1.1rem; }
    .cart-container { display: grid; grid-template-columns: 2fr 1fr; gap: 40px; }
    .cart-summary { background: #f9f9f9; padding: 30px; border-radius: 12px; height: fit-content; }
    .summary-item { display: flex; justify-content: space-between; margin-bottom: 15px; }
    .summary-item.total { border-top: 1px solid #ddd; padding-top: 15px; font-weight: 700; font-size: 1.2rem; }
    
    .product-detail-flex { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
    .product-detail-image img { border-radius: 15px; box-shadow: var(--shadow-lg); }
    .product-detail-info .category { text-transform: uppercase; color: var(--text-muted); letter-spacing: 2px; }
    .product-detail-info h1 { font-size: 2.5rem; margin: 10px 0; }
    .product-detail-info .price { font-size: 1.8rem; font-weight: 700; color: var(--accent-hover); margin-bottom: 30px; }
    .product-detail-info .description { margin-bottom: 30px; padding-top: 20px; border-top: 1px solid #eee; }
    
    @media (max-width: 768px) {
        .cart-container, .product-detail-flex { grid-template-columns: 1fr; }
        .cart-table thead { display: none; }
        .cart-table tr { display: block; border-bottom: 2px solid #eee; padding-bottom: 15px; }
        .cart-table td { display: flex; justify-content: space-between; align-items: center; border: none; padding: 10px 0; }
        .cart-table td::before { content: attr(data-label); font-weight: 700; }
    }
`;

document.addEventListener('DOMContentLoaded', () => {
    // Inject styles (could be in style.css but keeping it here for modularity in this step)
    const styleSheet = document.createElement("style");
    styleSheet.innerText = extraStyles;
    document.head.appendChild(styleSheet);

    displayCart();
    initProductDetail();
    updateCartCount();
});
