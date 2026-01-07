document.addEventListener("DOMContentLoaded", () => {

    /* ================= DARK MODE ================= */
    const toggleBtn = document.getElementById("darkToggle");
    if (toggleBtn) {
        const icon = toggleBtn.querySelector("i");

        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark");
            icon.classList.replace("fa-moon", "fa-sun");
        }

        toggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark");

            const isDark = document.body.classList.contains("dark");
            icon.classList.toggle("fa-moon", !isDark);
            icon.classList.toggle("fa-sun", isDark);

            localStorage.setItem("theme", isDark ? "dark" : "light");
        });
    }

    /* ================= QUICK VIEW ================= */
    document.querySelectorAll(".quick-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.getElementById("quick-img").src = btn.dataset.image;
            document.getElementById("quick-name").innerText = btn.dataset.name;
            document.getElementById("quick-price").innerText =
                "Rp " + Number(btn.dataset.price).toLocaleString("id-ID");
            document.getElementById("quick-desc").innerText = btn.dataset.desc;

            const beli = document.querySelector("#quick-modal .tombol-beli");
            beli.dataset.name = btn.dataset.name;
            beli.dataset.price = btn.dataset.price;
            beli.dataset.image = btn.dataset.image;

            document.getElementById("quick-modal").style.display = "flex";
        });
    });

    const quickClose = document.querySelector(".quick-close");
    if (quickClose) {
        quickClose.onclick = () => {
            document.getElementById("quick-modal").style.display = "none";
        };
    }

    /* ================= CART ================= */
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const badge = document.getElementById("notification-badge");
    const cartItems = document.getElementById("cart-items");
    const cartPopup = document.getElementById("cart-popup");

    function updateCartBadge() {
        if (badge) {
            badge.innerText = cart.reduce((s, i) => s + i.qty, 0);
        }
    }

    function updateCart() {
        if (!cartItems) return;
        cartItems.innerHTML = "";

        cart.forEach((item, index) => {
            cartItems.innerHTML += `
                <li class="cart-item">
                    <img src="${item.image}" class="cart-img">
                    <div class="cart-info">
                        <strong>${item.name}</strong>
                        <p>${item.qty} x Rp ${item.price.toLocaleString("id-ID")}</p>
                    </div>
                    <button class="hapus-btn" data-index="${index}">✕</button>
                </li>
            `;
        });

        document.querySelectorAll(".hapus-btn").forEach(btn => {
            btn.onclick = () => {
                cart.splice(btn.dataset.index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCart();
                updateCartBadge();
            };
        });
    }

    document.querySelectorAll(".tombol-add").forEach(btn => {
        btn.onclick = () => {
            const existing = cart.find(i => i.name === btn.dataset.name);
            existing ? existing.qty++ : cart.push({
                name: btn.dataset.name,
                price: Number(btn.dataset.price),
                image: btn.dataset.image,
                qty: 1
            });

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCart();
            updateCartBadge();
        };
    });

    const keranjang = document.querySelector(".keranjang");
    if (keranjang && cartPopup) {
        keranjang.onclick = () => cartPopup.style.display = "block";
    }

    window.closeCart = () => {
        if (cartPopup) cartPopup.style.display = "none";
    };

    updateCart();
    updateCartBadge();

    /* ================= SEARCH ================= */
    const searchInput = document.querySelector(".search-input");
    const boxes = document.querySelectorAll(".box");

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const keyword = this.value.toLowerCase();

            boxes.forEach(box => {
                const title = box.dataset.title?.toLowerCase() || "";
                const category = box.dataset.category?.toLowerCase() || "";

                box.style.display =
                    title.includes(keyword) || category.includes(keyword)
                        ? "block"
                        : "none";
            });
        });
    }

});
