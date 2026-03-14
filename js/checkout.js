const STORAGE_KEY = 'cloth_cart';

document.addEventListener('DOMContentLoaded', () => {
    displayCheckoutSummary();
    handleCheckoutForm();
    updateCartCount();
});

function displayCheckoutSummary() {
    const cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const summaryContainer = document.getElementById('checkout-items');
    const totalEl = document.getElementById('checkout-total');
    
    if (!summaryContainer) return;

    if (cart.length === 0) {
        summaryContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalEl.innerText = '$0.00';
        return;
    }

    summaryContainer.innerHTML = cart.map(item => `
        <div class="item-row">
            <span>${item.name} x ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');

    const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    if (totalEl) totalEl.innerText = `$${total.toFixed(2)}`;
}

function handleCheckoutForm() {
    const form = document.getElementById('checkout-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simulate processing
        const submitBtn = form.querySelector('button');
        submitBtn.innerText = 'Processing...';
        submitBtn.disabled = true;

        setTimeout(() => {
            const orderId = 'VW' + Math.floor(Math.random() * 1000000);
            
            // Success view
            document.getElementById('checkout-content').style.display = 'none';
            document.getElementById('order-success').style.display = 'block';
            document.getElementById('order-id').innerText = orderId;

            // Clear Cart
            localStorage.removeItem('vanta_cart');
            updateCartCount();
        }, 2000);
    });
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('vanta_cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if (badge) badge.innerText = count;
}
