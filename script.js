let cart = [];
let total = 0;

function addToCart(product, price) {
  cart.push({ product, price });
  total += price;
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.product} - ₹${item.price}`;
    cartItems.appendChild(li);
  });
  document.getElementById("total").textContent = `Total: ₹${total}`;
}

function searchProducts() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const products = document.querySelectorAll(".product-card");
  products.forEach(card => {
    const name = card.getAttribute("data-name").toLowerCase();
    card.style.display = name.includes(query) ? "block" : "none";
  });
}
