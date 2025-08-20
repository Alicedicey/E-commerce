var product = {
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
var $ = function (sel) { return document.querySelector(sel); };
var $$ = function (sel) { return Array.from(document.querySelectorAll(sel)); };
var currentIndex = 0;
var cartQty = 0;
function setMainImage(index) {
  currentIndex = (index + product.images.length) % product.images.length;
  var main = $("#mainImage");
  var lb = $("#lightboxImage");
  main.src = product.images[currentIndex];
  lb.src = product.images[currentIndex];
  $$(".thumbs .thumb").forEach(function (btn, i) {
    btn.classList.toggle("selected", i === currentIndex);
  });
}
function updateCartBadge() {
  var badge = $("#cartCount");
  if (!badge)
    return;
  if (cartQty > 0) {
    badge.textContent = String(cartQty);
    badge.removeAttribute("hidden");
  }
  else {
    badge.setAttribute("hidden", "");
  }
}
function renderCart() {
  var panel = $("#cartContent");
  var checkout = $("#checkoutBtn");
  if (!panel)
    return;
  panel.innerHTML = "";
  if (cartQty <= 0) {
    panel.classList.add("empty");
    panel.innerHTML = "<p>Your cart is empty.</p>";
    checkout.hidden = true;
    return;
  }
  panel.classList.remove("empty");
  var item = document.createElement("div");
  item.className = "cart-item";
  var thumb = document.createElement("img");
  thumb.src = product.thumbs[0];
  thumb.className = "thumb";
  thumb.alt = "Product thumbnail";
  var meta = document.createElement("div");
  meta.className = "meta";
  var price = product.price.toFixed(2);
  var total = (product.price * cartQty).toFixed(2);
  meta.innerHTML = product.title + "<br>$" + price + " x " + cartQty + " <span class=\"total\">$" + total + "</span>";
  var delBtn = document.createElement("button");
  delBtn.className = "icon-btn";
  delBtn.innerHTML = '<img src="./images/icon-delete.svg" alt="Remove" />';
  delBtn.addEventListener("click", function () {
    cartQty = 0;
    updateCartBadge();
    renderCart();
  });
  item.append(thumb, meta, delBtn);
  panel.append(item);
  checkout.hidden = false;
}
function toggleCart() {
  var panel = $("#cartPanel");
  var btn = $("#cartBtn");
  var open = panel.hasAttribute("hidden");
  if (open) {
    panel.removeAttribute("hidden");
    btn.setAttribute("aria-expanded", "true");
  }
  else {
    panel.setAttribute("hidden", "");
    btn.setAttribute("aria-expanded", "false");
  }
}
document.addEventListener("DOMContentLoaded", function () {
  $$("#thumbs .thumb").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var idx = Number(btn.getAttribute("data-index") || 0);
      setMainImage(idx);
    });
  });
  $("#prevImg") === null || $("#prevImg") === void 0 ? void 0 : $("#prevImg").addEventListener("click", function () { return setMainImage(currentIndex - 1); });
  $("#nextImg") === null || $("#nextImg") === void 0 ? void 0 : $("#nextImg").addEventListener("click", function () { return setMainImage(currentIndex + 1); });
  $("#lbPrevImg") === null || $("#lbPrevImg") === void 0 ? void 0 : $("#lbPrevImg").addEventListener("click", function () { return setMainImage(currentIndex - 1); });
  $("#lbNextImg") === null || $("#lbNextImg") === void 0 ? void 0 : $("#lbNextImg").addEventListener("click", function () { return setMainImage(currentIndex + 1); });
  var qtyInput = $("#quantity");
  $("#increment") === null || $("#increment") === void 0 ? void 0 : $("#increment").addEventListener("click", function () {
    qtyInput.value = String(Number(qtyInput.value || 0) + 1);
  });
  $("#decrement") === null || $("#decrement") === void 0 ? void 0 : $("#decrement").addEventListener("click", function () {
    var next = Math.max(0, Number(qtyInput.value || 0) - 1);
    qtyInput.value = String(next);
  });
  $("#addToCart") === null || $("#addToCart") === void 0 ? void 0 : $("#addToCart").addEventListener("click", function () {
    var n = Math.max(0, Number((("#quantity").value) || 0));
    cartQty += n;
    ("#quantity").value = "0";
    updateCartBadge();
    renderCart();
    var panel = $("#cartPanel");
    panel.removeAttribute("hidden");
  });
  $("#cartBtn") === null || $("#cartBtn") === void 0 ? void 0 : $("#cartBtn").addEventListener("click", toggleCart);
  $("#lightboxTrigger") === null || $("#lightboxTrigger") === void 0 ? void 0 : $("#lightboxTrigger").addEventListener("click", function () {
    $("#lightbox") === null || $("#lightbox") === void 0 ? void 0 : $("#lightbox").removeAttribute("hidden");
  });
  $("#closeLightbox") === null || $("#closeLightbox") === void 0 ? void 0 : $("#closeLightbox").addEventListener("click", function () {
    $("#lightbox") === null || $("#lightbox") === void 0 ? void 0 : $("#lightbox").setAttribute("hidden", "");
  });
  $$("#lbThumbs .thumb").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var idx = Number(btn.getAttribute("data-index") || 0);
      setMainImage(idx);
    });
  });
  $("#menuBtn") === null || $("#menuBtn") === void 0 ? void 0 : $("#menuBtn").addEventListener("click", function () { var _a; return (_a = $("#nav")) === null || _a === void 0 ? void 0 : _a.classList.add("open"); });
  $("#closeMenuBtn") === null || $("#closeMenuBtn") === void 0 ? void 0 : $("#closeMenuBtn").addEventListener("click", function () { var _a; return (_a = $("#nav")) === null || _a === void 0 ? void 0 : _a.classList.remove("open"); });
  setMainImage(0);
  updateCartBadge();
  renderCart();
  document.addEventListener("click", function (e) {
    var panel = $("#cartPanel");
    var btn = $("#cartBtn");
    if (!panel || !btn)
      return;
    if (panel.hasAttribute("hidden"))
      return;
    var target = e.target;
    if (!panel.contains(target) && !btn.contains(target)) {
      panel.setAttribute("hidden", "");
      btn.setAttribute("aria-expanded", "false");
    }
  });
});