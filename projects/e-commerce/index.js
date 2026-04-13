const products = [
    { id: 1, name: 'Laptop', price: 999.99, image: 'https://via.placeholder.com/250x200?text=Laptop' },
    { id: 2, name: 'Smartphone', price: 699.99, image: 'https://via.placeholder.com/250x200?text=Smartphone' },
    { id: 3, name: 'Headphones', price: 199.99, image: 'https://via.placeholder.com/250x200?text=Headphones' },
    { id: 4, name: 'Tablet', price: 499.99, image: 'https://via.placeholder.com/250x200?text=Tablet' }
];

let cart = [];

function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '<div class="product-grid">' +
        products.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `).join('') + '</div>';
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    cartCount.textContent = `Cart: ${cart.reduce((sum, item) => sum + item.quantity, 0)} items`;

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name} (x${item.quantity})</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Initialize the page
displayProducts();