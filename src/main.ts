/** E-commerce product page interactions (TypeScript) */
type Product = {
  id: string;
  title: string;
  price: number;
  discount: number; // 0-100
  images: string[];
  thumbs: string[];
};

const product: Product = {
  id: "fall-limited",
  title: "Fall Limited Edition Sneakers",
  price: 125.0,
  discount: 50,
  images: [
    "./images/image-product-1.jpg",
    "./images/image-product-2.jpg",
    "./images/image-product-3.jpg",
    "./images/image-product-4.jpg"
  ],
  thumbs: [
    "./images/image-product-1-thumbnail.jpg",
    "./images/image-product-2-thumbnail.jpg",
    "./images/image-product-3-thumbnail.jpg",
    "./images/image-product-4-thumbnail.jpg"
  ]
};

const $ = <T extends HTMLElement = HTMLElement>(sel: string) => document.querySelector(sel) as T;
const $$ = <T extends HTMLElement = HTMLElement>(sel: string) => Array.from(document.querySelectorAll(sel)) as T[];

let currentIndex = 0;
let cartQty = 0;

function setMainImage(index: number){
  currentIndex = (index + product.images.length) % product.images.length;
  const main = $("#mainImage") as HTMLImageElement;
  const lb = $("#lightboxImage") as HTMLImageElement;
  main.src = product.images[currentIndex];
  lb.src = product.images[currentIndex];
  // update selected thumb
  $$(".thumbs .thumb").forEach((btn, i) => {
    btn.classList.toggle("selected", i === currentIndex);
  });
}

function updateCartBadge(){
  const badge = $("#cartCount");
  if(!badge) return;
  if(cartQty > 0){
    badge.textContent = String(cartQty);
    badge.removeAttribute("hidden");
  }else{
    badge.setAttribute("hidden","");
  }
}

function renderCart(){
  const panel = $("#cartContent");
  const checkout = $("#checkoutBtn") as HTMLButtonElement;
  if(!panel) return;
  panel.innerHTML = "";

  if(cartQty <= 0){
    panel.classList.add("empty");
    panel.innerHTML = "<p>Your cart is empty.</p>";
    checkout.hidden = true;
    return;
  }

  panel.classList.remove("empty");
  const item = document.createElement("div");
  item.className = "cart-item";

  const thumb = document.createElement("img");
  thumb.src = product.thumbs[0];
  thumb.className = "thumb";
  thumb.alt = "Product thumbnail";

  const meta = document.createElement("div");
  meta.className = "meta";
  const price = product.price.toFixed(2);
  const total = (product.price * cartQty).toFixed(2);
  meta.innerHTML = `${product.title}<br>$${price} x ${cartQty} <span class="total">$${total}</span>`;

  const delBtn = document.createElement("button");
  delBtn.className = "icon-btn";
  delBtn.innerHTML = '<img src="./images/icon-delete.svg" alt="Remove" />';
  delBtn.addEventListener("click", () => {
    cartQty = 0;
    updateCartBadge();
    renderCart();
  });

  item.append(thumb, meta, delBtn);
  panel.append(item);
  checkout.hidden = false;
}

function toggleCart(){
  const panel = $("#cartPanel")!;
  const btn = $("#cartBtn")!;
  const open = panel.hasAttribute("hidden");
  if(open){
    panel.removeAttribute("hidden");
    btn.setAttribute("aria-expanded","true");
  }else{
    panel.setAttribute("hidden","");
    btn.setAttribute("aria-expanded","false");
  }
}

// Setup listeners
document.addEventListener("DOMContentLoaded", () => {
  // Thumbs
  $$("#thumbs .thumb").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.getAttribute("data-index") || 0);
      setMainImage(idx);
    });
  });

  // Prev/Next
  $("#prevImg")?.addEventListener("click", () => setMainImage(currentIndex - 1));
  $("#nextImg")?.addEventListener("click", () => setMainImage(currentIndex + 1));
  $("#lbPrevImg")?.addEventListener("click", () => setMainImage(currentIndex - 1));
  $("#lbNextImg")?.addEventListener("click", () => setMainImage(currentIndex + 1));

  // Quantity
  const qtyInput = $("#quantity") as HTMLInputElement;
  $("#increment")?.addEventListener("click", () => {
    qtyInput.value = String(Number(qtyInput.value || 0) + 1);
  });
  $("#decrement")?.addEventListener("click", () => {
    const next = Math.max(0, Number(qtyInput.value || 0) - 1);
    qtyInput.value = String(next);
  });

  // Add to cart
  $("#addToCart")?.addEventListener("click", () => {
    const n = Math.max(0, Number((($("#quantity") as HTMLInputElement).value) || 0));
    cartQty += n;
    (("#quantity") as unknown as HTMLInputElement).value = "0";
    updateCartBadge();
    renderCart();
    // open cart to show update
    const panel = $("#cartPanel")!;
    panel.removeAttribute("hidden");
  });

  // Cart toggle
  $("#cartBtn")?.addEventListener("click", toggleCart);

  // Lightbox
  $("#lightboxTrigger")?.addEventListener("click", () => {
    $("#lightbox")?.removeAttribute("hidden");
  });
  $("#closeLightbox")?.addEventListener("click", () => {
    $("#lightbox")?.setAttribute("hidden","");
  });

  // Lightbox thumbs
  $$("#lbThumbs .thumb").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.getAttribute("data-index") || 0);
      setMainImage(idx);
    });
  });

  // Mobile menu
  $("#menuBtn")?.addEventListener("click", () => $("#nav")?.classList.add("open"));
  $("#closeMenuBtn")?.addEventListener("click", () => $("#nav")?.classList.remove("open"));

  // Initialize
  setMainImage(0);
  updateCartBadge();
  renderCart();

  // Click outside to close cart
  document.addEventListener("click", (e) => {
    const panel = $("#cartPanel");
    const btn = $("#cartBtn");
    if(!panel || !btn) return;
    if(panel.hasAttribute("hidden")) return;
    const target = e.target as Node;
    if(!panel.contains(target) && !btn.contains(target)){
      panel.setAttribute("hidden","");
      btn.setAttribute("aria-expanded","false");
    }
  });
});