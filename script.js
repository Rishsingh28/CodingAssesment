const cartItemsContainer = document.getElementById("cart-items");
const cartTotalPriceElement = document.getElementById("cart-total-price");
const subtotalelement = document.getElementById("cart-subtotal");


async function fetchCartData() {
  try {
    const response = await fetch(
      "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch cart data");
    }
    const cartData = await response.json();
    renderCart(cartData);
    setupQuantityListeners(cartData); 
  } catch (error) {
    console.error("Error fetching cart data:", error);
  }
}


function renderCart(cartData) {
  cartItemsContainer.innerHTML = "";
  let totalPrice = 0;

  cartData.items.forEach((item, index) => {
    const itemTotalPrice = item.price * item.quantity;
    totalPrice += itemTotalPrice;

    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <img class="item-image" src="${item.image}" alt="${item.title}">
        <p class="cart-item-title">${item.title}</p>
        <p class="cart-item-price">₹${item.price}</p>
        <div class="cart-item-quantity">
          <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity-input">
        </div>
        <p>₹<span id="item-total-${index}">${itemTotalPrice}</span></p>
      </div>
    `;
  });

  cartTotalPriceElement.innerText = `₹${totalPrice}`;
  subtotalelement.innerText = `₹${totalPrice}`;
}


function updateQuantity(event, cartData) {
  const index = event.target.dataset.index;
  const newQuantity = parseInt(event.target.value, 10);

  if (newQuantity >= 1) {
    cartData.items[index].quantity = newQuantity;
    renderCart(cartData);
    setupQuantityListeners(cartData);
  }
}


function setupQuantityListeners(cartData) {
  const quantityInputs = document.querySelectorAll(".quantity-input");
  quantityInputs.forEach((input) => {
    input.addEventListener("input", (event) => updateQuantity(event, cartData));
  });
}


async function init() {
  const cartData = await fetchCartData();
  if (cartData) {
    renderCart(cartData);
    setupQuantityListeners(cartData);
  }
}

init();


