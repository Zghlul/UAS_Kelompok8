const products = [
  { id:1, title:"Rexus ShagaX RX130 Mouse Gaming Wireless", price:349000, old:529000, img:"https://picsum.photos/seed/m1/600/400", badge:"NEW", sku:"RX130" },
  { id:2, title:"Rexus TWS NA-12 Stitch Edition Earphone", price:359000, old:509000, img:"https://picsum.photos/seed/m2/600/400", badge:"HOT", sku:"NA12" },
  { id:3, title:"Rexus Aether Keyboard Gaming Mechanical", price:599000, old:993000, img:"https://picsum.photos/seed/m3/600/400", badge:"BEST", sku:"AETHER" },
  { id:4, title:"Rexus Flow QZ30 Mouse Office Wireless", price:449000, old:649000, img:"https://picsum.photos/seed/m4/600/400", badge:"SALE", sku:"QZ30" },
  { id:5, title:"Rexus Marvel Bundle 01 - Gamepad + Mouse + Pad", price:1110000, old:1520000, img:"https://picsum.photos/seed/m5/600/400", badge:"BUNDLE", sku:"BNDL01" },
  { id:6, title:"Rexus Q-Pix Bundle 01 - Mouse + Mousepad", price:90000, old:147500, img:"https://picsum.photos/seed/m6/600/400", badge:"DEAL", sku:"QPIX1" },
  { id:7, title:"REXUS BUNDLE BTS 01 - Keyboard + Keycaps", price:429000, old:699000, img:"https://picsum.photos/seed/m7/600/400", badge:"LIMITED", sku:"BTS01" },
  { id:8, title:"Rexus Workfit Bundle - Kursi & Meja", price:2949000, old:5378000, img:"https://picsum.photos/seed/m8/600/400", badge:"WORK", sku:"WF01" }
];

const grid = document.getElementById('productGrid');
const cartCountEl = document.getElementById('cartCount');
let cartCount = 0;

function formatRupiah(n){
  return 'Rp ' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function renderProducts(list){
  grid.innerHTML = '';
  list.forEach(p=>{
    const card = document.createElement('div');
    card.className = 'product';
    card.innerHTML = `
      <div style="position:relative">
        <img loading="lazy" src="${p.img}" alt="${p.title}">
        <div style="position:absolute;left:10px;top:10px">
          <span class="badge">${p.badge}</span>
        </div>
      </div>
      <div>
        <div class="title">${p.title}</div>
        <div class="muted" style="margin-top:6px">${p.sku}</div>
        <div class="meta">
          <div>
            <div class="price">${formatRupiah(p.price)}</div>
            <div class="old">${formatRupiah(p.old)}</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">
            <button class="btn btn-primary" data-id="${p.id}">Add</button>
            <button class="btn btn-ghost" data-quick="${p.id}">Quick</button>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  document.querySelectorAll('.btn-primary').forEach(btn=>{
    btn.onclick = (e)=> addToCart(+e.currentTarget.dataset.id);
  });

  document.querySelectorAll('[data-quick]').forEach(btn=>{
    btn.onclick = (e)=> openModal(+e.currentTarget.dataset.quick);
  });
}

function addToCart(id){
  cartCount++;
  cartCountEl.textContent = cartCount;
  cartCountEl.animate(
    [{transform:'scale(1)'},{transform:'scale(1.25)'},{transform:'scale(1)'}],
    {duration:300}
  );
}

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e)=>{
  const q = e.target.value.trim().toLowerCase();
  const filtered = products.filter(
    p => p.title.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)
  );
  renderProducts(filtered);
});

const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalOld = document.getElementById('modalOld');
const modalDesc = document.getElementById('modalDesc');
const modalStock = document.getElementById('modalStock');
const modalBadge = document.getElementById('modalBadge');
let activeProduct = null;

function openModal(id){
  const p = products.find(x=>x.id === id);
  if(!p) return;
  activeProduct = p;
  modalImg.src = p.img;
  modalTitle.textContent = p.title;
  modalPrice.textContent = formatRupiah(p.price);
  modalOld.textContent = formatRupiah(p.old);
  modalDesc.textContent = `Deskripsi singkat untuk ${p.title}. Fitur unggulan: kualitas build, performa, dan garansi resmi.`;
  modalStock.textContent = 20;
  modalBadge.textContent = p.badge;
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden','false');
}

function closeModal(){
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden','true');
}

document.getElementById('modalClose').onclick = closeModal;

modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });

document.getElementById('addCartModal').onclick = ()=>{
  if(activeProduct) addToCart(activeProduct.id);
};

const carouselImg = document.getElementById('carouselImg');
const carouselImages = [
  "https://picsum.photos/seed/hero1/1200/600",
  "https://picsum.photos/seed/hero2/1200/600",
  "https://picsum.photos/seed/hero3/1200/600"
];

let carouselIndex = 0;

function nextCarousel(){
  carouselIndex = (carouselIndex + 1) % carouselImages.length;
  carouselImg.style.opacity = 0;
  setTimeout(()=>{
    carouselImg.src = carouselImages[carouselIndex];
    carouselImg.style.opacity = 1;
  }, 220);
}

setInterval(nextCarousel, 4500);

document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape') closeModal();
  if(e.key === '/' ) { 
    e.preventDefault(); 
    searchInput.focus(); 
  }
});

document.querySelector('.logo').addEventListener('click', (ev)=>{
  ev.preventDefault();
  window.scrollTo({ top:0, behavior:'smooth' });
});

renderProducts(products);

let cart = [];

function addToCart(id){
  const item = products.find(p => p.id === id);
  const exist = cart.find(p => p.id === id);
  if(exist){
    exist.qty++;
  } else {
    cart.push({...item, qty: 1});
  }
  updateCartUI();
  cartCount++;
  cartCountEl.textContent = cartCount;
  cartCountEl.animate(
    [{transform:'scale(1)'},{transform:'scale(1.25)'},{transform:'scale(1)'}],
    {duration:300}
  );
}

function updateCartUI(){
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const el = document.createElement('div');
    el.className = "cart-item";
    total += item.price * item.qty;
    el.innerHTML = `
      <img src="${item.img}" alt="">
      <div style="flex:1">
        <div style="font-weight:700">${item.title}</div>
        <div class="muted">Qty: ${item.qty}</div>
        <div>${formatRupiah(item.price * item.qty)}</div>
      </div>
    `;
    cartItems.appendChild(el);
  });
  cartTotal.textContent = formatRupiah(total);
}

const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const closeCartBtn = document.getElementById('closeCart');

cartBtn.addEventListener('click', () => {
  cartSidebar.classList.add('open');
});

closeCartBtn.addEventListener('click', () => {
  cartSidebar.classList.remove('open');
});
