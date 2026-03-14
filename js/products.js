const products = [
    {
        id: 1,
        name: "Classic Minimalism Tee",
        price: 35.00,
        category: "men",
        image: "assets/images/Classic Minimalism Tee.jpg",
        description: "A premium cotton tee with a clean silhouette. Perfect for layering or wearing on its own."
    },
    {
        id: 2,
        name: "Urban Explorer Hoodie",
        price: 85.00,
        category: "men",
        image: "assets/images/Urban Explorer Hoodie.jpg",
        description: "Heavyweight fleece hoodie designed for maximum comfort and urban style."
    },
    {
        id: 3,
        name: "Silk Flow Blouse",
        price: 65.00,
        category: "women",
        image: "assets/images/Silk Flow Blouse.jpg",
        description: "Elegant silk blouse that transitions perfectly from desk to dinner."
    },
    {
        id: 4,
        name: "High-Waist Sculpt Leggings",
        price: 55.00,
        category: "women",
        image: "assets/images/leggings.png",
        description: "Performance fabric that lifts and sculpts. Designed for the gym and beyond."
    },
    {
        id: 5,
        name: "Brushed Leather Tote",
        price: 120.00,
        category: "accessories",
        image: "assets/images/tote.png",
        description: "Handcrafted Italian leather tote. Spacious enough for all your essentials."
    },
    {
        id: 6,
        name: "Cloth Chrono Watch",
        price: 210.00,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Sleek matte black chronograph with a sapphire crystal face."
    }
];

function renderProducts(productsToRender) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    grid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        grid.innerHTML = '<p class="no-products">No products found.</p>';
        return;
    }

    productsToRender.forEach(product => {
        const productCard = `
            <div class="product-card">
                <a href="product.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                </a>
                <div class="product-info">
                    <p class="product-category">${product.category}</p>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}" style="margin-top: 15px; width: 100%;">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        grid.innerHTML += productCard;
    });

    // Add event listeners to "Add to Cart" buttons
    attachAddToCartListeners();
}

function attachAddToCartListeners() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            addToCart(id);
        });
    });
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cloth_cart')) || [];
    const product = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('vanta_cart', JSON.stringify(cart));
    updateCartCount();
    
    // Simple feedback
    const btn = document.querySelector(`.add-to-cart[data-id="${productId}"]`);
    if (btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Added!';
        btn.style.backgroundColor = '#2ecc71';
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.backgroundColor = '';
        }, 1500);
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('vanta_cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if (badge) badge.innerText = count;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    updateCartCount();
});
