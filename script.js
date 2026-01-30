// Cart and points state (persisted in localStorage)
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let total = parseFloat(localStorage.getItem('total') || '0');
// default points set to 9,876,543 when not present in localStorage
let points = parseInt(localStorage.getItem('points') || '9876543', 10); // initial points if none

// If points key doesn't exist, ensure it's created with the desired default
if (localStorage.getItem('points') === null) {
  points = 9876543;
  localStorage.setItem('points', String(points));
}

function saveState() {
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('total', String(total));
  localStorage.setItem('points', String(points));
}

function addToCart(product, price) {
  cart.push({ product, price });
  total = Number((total + Number(price)).toFixed(2));
  saveState();
  renderCart();
  updateCartCount();
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  if (!cartItems) return;
  cartItems.innerHTML = "";
  cart.forEach((item, idx) => {
    const li = document.createElement("li");
    li.textContent = `${item.product} - ₹${item.price}`;
    // optional remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'small secondary';
    removeBtn.onclick = () => {
      cart.splice(idx, 1);
      total = cart.reduce((s, i) => s + Number(i.price), 0);
      saveState();
      renderCart();
      updateCartCount();
    };
    li.appendChild(removeBtn);
    cartItems.appendChild(li);
  });
  const totalEl = document.getElementById("total");
  if (totalEl) totalEl.textContent = `Total: ₹${total}`;
}

function updateCartCount() {
  const badge = document.getElementById('cart-count');
  if (badge) badge.textContent = cart.length;
}

function goToPayment() {
  // Save current cart/total to localStorage for payment page
  localStorage.setItem('checkout_cart', JSON.stringify(cart));
  localStorage.setItem('checkout_total', String(total));
  // navigate to payment page
  window.location.href = 'payment.html';
}

function clearCart() {
  cart = [];
  total = 0;
  saveState();
  renderCart();
  updateCartCount();
}

function searchProducts() {
  const qEl = document.getElementById("searchInput");
  if (!qEl) return;
  const query = qEl.value.toLowerCase();
  const products = document.querySelectorAll(".product-card");
  products.forEach(card => {
    let name = card.getAttribute("data-name");
    if (!name) {
      const h = card.querySelector('h3');
      name = h ? h.textContent : '';
    }
    name = name.toLowerCase();
    card.style.display = name.includes(query) ? "block" : "none";
  });
}

// initialize UI on load
window.addEventListener('DOMContentLoaded', () => {
  // ensure types
  total = Number(total || 0);
  points = Number(points || 0);
  // show points in header
  const pointsEl = document.getElementById('points');
  if (pointsEl) pointsEl.textContent = points;
  renderCart();
  updateCartCount();
});
