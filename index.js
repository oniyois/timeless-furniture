/* ==============================
   PRODUCT FILTER
============================== */

const filterButtons = document.querySelectorAll(".filter-btn");
const products = document.querySelectorAll(".card");

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    const filter = button.getAttribute("data-filter");

    products.forEach(product => {

      const category = product.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }

    });

  });

});


/* ==============================
   CART SIDEBAR
============================== */

const cartIcon = document.querySelector(".cart-icon");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");

const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

let cart = [];


/* OPEN / CLOSE CART */

cartIcon.addEventListener("click", () => {
  cartSidebar.classList.add("open");
});

closeCart.addEventListener("click", () => {
  cartSidebar.classList.remove("open");
});


/* ==============================
   PRODUCT QUANTITY + ADD TO CART
============================== */

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

  const increaseBtn = card.querySelector(".increase");
  const decreaseBtn = card.querySelector(".decrease");
  const quantityDisplay = card.querySelector(".quantity");

  const name = card.dataset.name;
  const price = parseInt(card.dataset.price);

  let quantity = 0;


  /* INCREASE */

  increaseBtn.addEventListener("click", () => {

    quantity++;
    quantityDisplay.textContent = quantity;

    const existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {

      existingProduct.quantity++;

    } else {

      cart.push({
        name,
        price,
        quantity: 1
      });

    }

    updateCart();

  });


  /* DECREASE */

  decreaseBtn.addEventListener("click", () => {

    if (quantity > 0) {

      quantity--;
      quantityDisplay.textContent = quantity;

      const existingProduct = cart.find(item => item.name === name);

      if (existingProduct) {

        existingProduct.quantity--;

        if (existingProduct.quantity <= 0) {
          cart = cart.filter(item => item.name !== name);
        }

      }

      updateCart();

    }

  });

});


/* ==============================
   UPDATE CART
============================== */

function updateCart(){

  cartItemsContainer.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach(item => {

    total += item.price * item.quantity;
    count += item.quantity;

    const cartItem = document.createElement("div");

    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <span>${item.name} x ${item.quantity}</span>
      <span>₦${(item.price * item.quantity).toLocaleString()}</span>
    `;

    cartItemsContainer.appendChild(cartItem);

  });

  cartTotal.textContent = total.toLocaleString();
  cartCount.textContent = count;

}