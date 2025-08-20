let quantity = 0;
const quantityEl = document.getElementById("quantity") as HTMLElement;
const increaseBtn = document.getElementById("increase") as HTMLButtonElement;
const decreaseBtn = document.getElementById("decrease") as HTMLButtonElement;
const addToCartBtn = document.getElementById("add-to-cart") as HTMLButtonElement;
const cartItems = document.getElementById("cart-items") as HTMLElement;
const cartBtn = document.getElementById("cart-btn") as HTMLButtonElement;
const cartDropdown = document.getElementById("cart-dropdown") as HTMLElement;
const checkoutBtn = document.getElementById("checkout-btn") as HTMLButtonElement;

increaseBtn.addEventListener("click", () => {
  quantity++;
  quantityEl.textContent = String(quantity);
});

decreaseBtn.addEventListener("click", () => {
  if (quantity > 0) {
    quantity--;
    quantityEl.textContent = String(quantity);
  }
});

addToCartBtn.addEventListener("click", () => {
  if (quantity > 0) {
    cartItems.innerHTML = `
      <div class="cart-item">
        <img src="images/image-product-1-thumbnail.jpg" width="50">
        <div>
          Fall Limited Edition Sneakers<br>
          $125.00 x ${quantity} <b>$${125 * quantity}.00</b>
        </div>
        <button id="delete-item"><img src="images/icon-delete.svg" alt="delete"></button>
      </div>
    `;
    checkoutBtn.classList.remove("hidden");

    const deleteBtn = document.getElementById("delete-item") as HTMLButtonElement;
    deleteBtn.addEventListener("click", () => {
      cartItems.innerHTML = "Your cart is empty";
      checkoutBtn.classList.add("hidden");
    });
  }
});

cartBtn.addEventListener("click", () => {
  cartDropdown.classList.toggle("hidden");
});

// Thumbnail image switching
const thumbnails = document.querySelectorAll(".thumbnails img");
const mainImage = document.getElementById("main-image") as HTMLImageElement;

thumbnails.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    const fullImg = thumb.getAttribute("data-full");
    if (fullImg) {
      mainImage.src = fullImg;
    }
  });
});
