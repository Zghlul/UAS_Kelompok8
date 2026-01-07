document.addEventListener("DOMContentLoaded", loadCheckout);

function loadCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("checkout-items");
  const totalEl = document.getElementById("checkout-total");

  if (!container) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    container.innerHTML += `
      <div class="checkout-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="checkout-info">
          <strong>${item.name}</strong>
          <span>Qty: ${item.qty}</span>
        </div>
        <div class="checkout-price">
          Rp ${item.price.toLocaleString("id-ID")}
        </div>
      </div>
    `;
  });

  totalEl.innerText = "Rp " + total.toLocaleString("id-ID");
}

function placeOrder() {
  alert("Checkout berhasil!");
  localStorage.removeItem("cart");
  window.location.href = "Produk.html";
}

  document.querySelectorAll("a").forEach(link => {
    if (link.href && !link.href.includes("#")) {
      link.addEventListener("click", e => {
        e.preventDefault();
        document.body.style.opacity = "0";
        setTimeout(() => {
          window.location = link.href;
        }, 300);
      });
    }
  });
