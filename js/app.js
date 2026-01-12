function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => {
        el.textContent = cart.length;
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    alert(`${product.name} added to cart!`);
}

function displayProducts(productsToDisplay, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = productsToDisplay.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">₹${product.price}</p>
                <a href="product.html?id=${product.id}" class="view-details-btn">View Details</a>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

if (document.getElementById('featuredProducts')) {
    displayProducts(products.slice(0, 6), 'featuredProducts');
}

if (document.getElementById('shopProducts')) {
    displayProducts(products, 'shopProducts');
}

if (document.getElementById('productDetails')) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);

    if (product) {
        document.getElementById('productDetails').innerHTML = `
            <div class="product-detail-content">
                <div>
                    <img src="${product.image}" alt="${product.name}" class="product-detail-image">
                </div>
                <div class="product-detail-info">
                    <span class="product-category">${product.category}</span>
                    <h1>${product.name}</h1>
                    <p class="product-price">₹${product.price}</p>
                    <p class="product-description">${product.description}</p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})" style="padding: 15px 40px; font-size: 1.1rem;">Add to Cart</button>
                </div>
            </div>
        `;
    } else {
        document.getElementById('productDetails').innerHTML = `
            <div class="empty-cart">
                <h2>Product not found</h2>
                <a href="shop.html" class="btn btn-primary">Back to Shop</a>
            </div>
        `;
    }
}

updateCartCount();
