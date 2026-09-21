const products = [

  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 2499,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"
  },

  {
    id: 2,
    name: "Smart Fitness Watch",
    category: "Electronics",
    price: 3999,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"
  },

  {
    id: 3,
    name: "Minimalist Backpack",
    category: "Fashion",
    price: 1499,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"
  },

  {
    id: 4,
    name: "Running Shoes",
    category: "Fashion",
    price: 2999,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
  },

  {
    id: 5,
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 3299,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800"
  },

  {
    id: 6,
    name: "Ceramic Coffee Mug",
    category: "Home",
    price: 599,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=800"
  },

  {
    id: 7,
    name: "Modern Desk Lamp",
    category: "Home",
    price: 1299,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800"
  },

  {
    id: 8,
    name: "Classic Sunglasses",
    category: "Fashion",
    price: 999,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800"
  }

];


// ============================
// CART
// ============================

let cart =
  JSON.parse(
    localStorage.getItem("shopsphereCart")
  ) || [];


// ============================
// DISPLAY PRODUCTS
// ============================

function displayProducts() {

  const grid =
    document.getElementById(
      "productGrid"
    );

  const search =
    document
      .getElementById("searchInput")
      .value
      .toLowerCase();

  const category =
    document
      .getElementById("categoryFilter")
      .value;

  const sort =
    document
      .getElementById("sortFilter")
      .value;


  let filtered =
    products.filter(product => {

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search);

      const matchesCategory =
        category === "all" ||
        product.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );

    });


  // SORT

  if (sort === "low") {

    filtered.sort(
      (a, b) =>
        a.price - b.price
    );

  }

  if (sort === "high") {

    filtered.sort(
      (a, b) =>
        b.price - a.price
    );

  }

  if (sort === "rating") {

    filtered.sort(
      (a, b) =>
        b.rating - a.rating
    );

  }


  document.getElementById(
    "resultCount"
  ).textContent =
    `${filtered.length} products found`;


  if (filtered.length === 0) {

    grid.innerHTML = `
      <div class="empty-cart">
        <h2>No products found</h2>
        <p>Try changing your search or filters.</p>
      </div>
    `;

    return;

  }


  grid.innerHTML =
    filtered.map(product => `

      <article class="product-card">

        <img
          src="${product.image}"
          alt="${product.name}"
          class="product-image"
          loading="lazy"
        >

        <div class="product-info">

          <span class="product-category">
            ${product.category}
          </span>

          <h3 class="product-name">
            ${product.name}
          </h3>

          <div class="rating">
            ⭐ ${product.rating}
          </div>

          <div class="product-bottom">

            <span class="price">
              ₹${product.price.toLocaleString("en-IN")}
            </span>

            <button
              class="add-button"
              onclick="addToCart(${product.id})"
            >
              Add
            </button>

          </div>

        </div>

      </article>

    `).join("");

}


// ============================
// ADD TO CART
// ============================

function addToCart(id) {

  const product =
    products.find(
      item => item.id === id
    );

  const existing =
    cart.find(
      item => item.id === id
    );


  if (existing) {

    existing.quantity++;

  } else {

    cart.push({

      ...product,

      quantity: 1

    });

  }


  saveCart();

  showNotification(
    `${product.name} added to cart`
  );

}


// ============================
// SAVE CART
// ============================

function saveCart() {

  localStorage.setItem(
    "shopsphereCart",
    JSON.stringify(cart)
  );

  updateCartCount();

}


// ============================
// CART COUNT
// ============================

function updateCartCount() {

  const count =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  document.getElementById(
    "cartCount"
  ).textContent = count;

}


// ============================
// OPEN CART
// ============================

function openCart() {

  renderCart();

  document
    .getElementById("cartModal")
    .classList.add("active");

}


// ============================
// CLOSE CART
// ============================

function closeCart() {

  document
    .getElementById("cartModal")
    .classList.remove("active");

}


// ============================
// CLOSE OUTSIDE
// ============================

function closeCartOutside(event) {

  if (
    event.target.id ===
    "cartModal"
  ) {

    closeCart();

  }

}


// ============================
// RENDER CART
// ============================

function renderCart() {

  const container =
    document.getElementById(
      "cartItems"
    );

  const totalElement =
    document.getElementById(
      "cartTotal"
    );


  if (cart.length === 0) {

    container.innerHTML = `
      <div class="empty-cart">
        🛒
        <p>Your cart is empty.</p>
      </div>
    `;

    totalElement.textContent = "₹0";

    return;

  }


  container.innerHTML =
    cart.map(item => `

      <div class="cart-item">

        <img
          src="${item.image}"
          alt="${item.name}"
        >

        <div class="cart-item-info">

          <h3>
            ${item.name}
          </h3>

          <p>
            ₹${item.price.toLocaleString("en-IN")}
          </p>

          <div class="quantity-controls">

            <button
              onclick="changeQuantity(
                ${item.id},
                -1
              )"
            >
              −
            </button>

            <span>
              ${item.quantity}
            </span>

            <button
              onclick="changeQuantity(
                ${item.id},
                1
              )"
            >
              +
            </button>

          </div>

        </div>

        <button
          class="remove-cart"
          onclick="removeFromCart(${item.id})"
        >
          Remove
        </button>

      </div>

    `).join("");


  const total =
    cart.reduce(
      (sum, item) =>
        sum +
        item.price *
        item.quantity,
      0
    );


  totalElement.textContent =
    `₹${total.toLocaleString("en-IN")}`;

}


// ============================
// CHANGE QUANTITY
// ============================

function changeQuantity(
  id,
  change
) {

  const item =
    cart.find(
      product =>
        product.id === id
    );


  if (!item) return;


  item.quantity += change;


  if (item.quantity <= 0) {

    cart =
      cart.filter(
        product =>
          product.id !== id
      );

  }


  saveCart();

  renderCart();

}


// ============================
// REMOVE
// ============================

function removeFromCart(id) {

  cart =
    cart.filter(
      item =>
        item.id !== id
    );

  saveCart();

  renderCart();

}


// ============================
// CHECKOUT
// ============================

function checkout() {

  if (cart.length === 0) {

    alert(
      "Your cart is empty."
    );

    return;

  }


  alert(
    "Demo checkout successful! This is a capstone project, so no real payment is processed."
  );

}


// ============================
// NOTIFICATION
// ============================

function showNotification(
  message
) {

  const notification =
    document.createElement(
      "div"
    );

  notification.textContent =
    message;

  notification.style.position =
    "fixed";

  notification.style.bottom =
    "25px";

  notification.style.right =
    "25px";

  notification.style.background =
    "#111827";

  notification.style.color =
    "white";

  notification.style.padding =
    "14px 20px";

  notification.style.borderRadius =
    "10px";

  notification.style.zIndex =
    "5000";

  document.body.appendChild(
    notification
  );


  setTimeout(() => {

    notification.remove();

  }, 2500);

}


// ============================
// INITIALIZE
// ============================

displayProducts();

updateCartCount();
