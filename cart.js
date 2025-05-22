let cart = JSON.parse(localStorage.getItem('cart')) || [];
let savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];

// Constants
const SHIPPING_COST = 40;
const TAX_RATE = 0.18; // 18% GST

// Default book cover image if the actual image is not available
const DEFAULT_BOOK_COVER = 'https://via.placeholder.com/80x120/f8f9fa/495057?text=Book';

function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ 
            name, 
            price, 
            quantity: 1, 
            image: image || DEFAULT_BOOK_COVER 
        });
    }
    saveCart();
    updateCart();
    showNotification(`${name} added to cart`);
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('cart-total');

    // Show/hide empty cart state
    if (cart.length === 0) {
        cartItems.style.display = 'none';
        emptyCart.style.display = 'block';
        return;
    }

    cartItems.style.display = 'block';
    emptyCart.style.display = 'none';
    cartItems.innerHTML = '';

    let subtotal = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="row align-items-center">
                <div class="col-md-4 d-flex align-items-center gap-3">
                    <img src="${item.image}" 
                         alt="${item.name}" 
                         class="book-image"
                         onerror="this.src='${DEFAULT_BOOK_COVER}'">
                    <div>
                        <h5 class="mb-1">${item.name}</h5>
                        <small class="text-muted">Paperback</small>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="changeQuantity(${index}, -1)">
                            <i class="bi bi-dash"></i>
                        </button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="changeQuantity(${index}, 1)">
                            <i class="bi bi-plus"></i>
                        </button>
                    </div>
                </div>
                <div class="col-md-2">
                    <span class="price">₹${item.price.toFixed(2)}</span>
                </div>
                <div class="col-md-2">
                    <span>₹${itemTotal.toFixed(2)}</span>
                </div>
                <div class="col-md-1 d-flex gap-2">
                    <button class="action-btn delete" onclick="removeItem(${index})" title="Remove item">
                        <i class="bi bi-trash"></i>
                    </button>
                    <button class="action-btn save" onclick="saveForLater(${index})" title="Save for later">
                        <i class="bi bi-bookmark"></i>
                    </button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    // Update summary
    const shipping = subtotal > 0 ? SHIPPING_COST : 0;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + shipping + tax;

    subtotalElement.textContent = subtotal.toFixed(2);
    shippingElement.textContent = shipping.toFixed(2);
    taxElement.textContent = tax.toFixed(2);
    totalElement.textContent = total.toFixed(2);
}

function changeQuantity(index, change) {
    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
        saveCart();
        updateCart();
        showNotification(`Quantity updated for ${cart[index].name}`);
    }
}

function removeItem(index) {
    const item = cart[index];
    const cartItem = document.querySelectorAll('.cart-item')[index];
    cartItem.style.opacity = '0';
    cartItem.style.transform = 'translateX(20px)';
    
    setTimeout(() => {
        cart.splice(index, 1);
        saveCart();
        updateCart();
        showNotification(`${item.name} removed from cart`);
    }, 300);
}

function saveForLater(index) {
    const item = cart[index];
    savedItems.push(item);
    cart.splice(index, 1);
    saveCart();
    localStorage.setItem('savedItems', JSON.stringify(savedItems));
    updateCart();
    showNotification(`${item.name} saved for later`);
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #212529;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        font-size: 0.9rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease forwards;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add styles for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCart();
    
    // Add checkout button handler
    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Your cart is empty');
            return;
        }
        // Here you can add your checkout logic or redirect to checkout page
        alert('Proceeding to checkout...');
    });
});

// Razorpay Payment Integration
function openRazorpayCheckout(amount) {
    var options = {
        "key": "rzp_test_PV747NFSUDBTLP", // Provided Razorpay Test Key
        "amount": Math.round(amount * 100), // Amount in paise
        "currency": "INR",
        "name": "ChapterOne Bookstore",
        "description": "Book Purchase",
        "image": "Dostoevsky.jpg", // You can use your logo here
        "handler": function (response){
            // Optionally show a subtle notification or redirect
            showNotification('Payment successful!');
            // Optionally clear cart or redirect to thank you page
        },
        "prefill": {
            "name": "",
            "email": "",
            "contact": ""
        },
        "theme": {
            "color": "#212529"
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
}

// Attach Razorpay to checkout button
const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function(e){
        e.preventDefault();
        if (cart.length === 0) {
            showNotification('Your cart is empty');
            return;
        }
        // Calculate total (same as in your summary)
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shipping = subtotal > 0 ? 40 : 0;
        const tax = subtotal * 0.18;
        const total = subtotal + shipping + tax;
        openRazorpayCheckout(total);
    });
}

// let cart = [];

// function addToCart(name, price) {
//     const existingItem = cart.find(item => item.name === name);
//     if (existingItem) {
//         existingItem.quantity++;
//     } else {
//         cart.push({ name, price, quantity: 1 });
//     }
//     updateCart();
// }

// function updateCart() {
//     let totalAmount = 0;
//     console.clear();
//     console.log("Cart Contents:");

//     cart.forEach((item, index) => {
//         const itemTotal = item.price * item.quantity;
//         console.log(`${index + 1}. ${item.name} - Quantity: ${item.quantity}, Price: ₹${item.price.toFixed(2)}, Total: ₹${itemTotal.toFixed(2)}`);
//         totalAmount += itemTotal;
//     });

//     console.log(`\nTotal Amount: ₹${totalAmount.toFixed(2)}`);
// }

// function changeQuantity(index, change) {
//     if (index < cart.length && cart[index].quantity + change > 0) {
//         cart[index].quantity += change;
//         updateCart();
//     } else {
//         console.log("Invalid operation: quantity cannot be zero or negative.");
//     }
// }

// function removeItem(index) {
//     if (index < cart.length) {
//         cart.splice(index, 1);
//         updateCart();
//     } else {
//         console.log("Invalid index: Item does not exist in the cart.");
//     }
// }

// addToCart("Club Sandwich", 210);
// addToCart("Chicken Ham", 290);
// addToCart("Club Sandwich", 210);
// changeQuantity(0, -1);
// removeItem(1);