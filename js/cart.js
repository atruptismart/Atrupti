function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function clearCart() {
    localStorage.removeItem('cart');
    updateCartCount();
}

function updateCartCount() {
    const cart = getCart();
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => {
        el.textContent = cart.length;
    });
}

function updateQuantity(productId, change) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);

    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        saveCart(cart);
        displayCart();
    }
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    displayCart();
}

function calculateTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function displayCart() {
    const cart = getCart();
    const cartItemsEl = document.getElementById('cartItems');
    const cartSubtotalEl = document.getElementById('cartSubtotal');
    const cartTotalEl = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');

    if (!cartItemsEl) return;

    if (cart.length === 0) {
        cartItemsEl.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty</h2>
                <p>Add some products to get started!</p>
                <a href="shop.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        if (cartSubtotalEl) cartSubtotalEl.textContent = '₹0';
        if (cartTotalEl) cartTotalEl.textContent = '₹0';
        if (checkoutBtn) checkoutBtn.style.display = 'none';
        return;
    }

    if (checkoutBtn) checkoutBtn.style.display = 'block';

    cartItemsEl.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3 class="cart-item-name">${item.name}</h3>
                <p class="cart-item-price">₹${item.price}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
            <div>
                <p class="cart-item-price">₹${item.price * item.quantity}</p>
            </div>
        </div>
    `).join('');

    const total = calculateTotal();
    if (cartSubtotalEl) cartSubtotalEl.textContent = `₹${total}`;
    if (cartTotalEl) cartTotalEl.textContent = `₹${total}`;
}

if (document.getElementById('cartItems')) {
    displayCart();
}

updateCartCount();
