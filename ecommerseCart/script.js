document.addEventListener("DOMContentLoaded", main);

function main() {
  //grab elements
  const loadStyle = document.getElementById("loadStyle");
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyMsg = document.getElementById("empty-cart");
  const cartTotal = document.getElementById("cart-total");
  const totalPrice = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");

  //adding the change style feature
  loadStyle.addEventListener("click", () => {
    exitsting = document.getElementById("dynamic-styling");
    if (!exitsting) {
      link = document.createElement("link");
      link.id = "dynamic-styling";
      link.href = "styles.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
      console.log("Stylesheet loaded", link);
    } else {
      setTimeout(() => {
        alert("Stylesheet loaded successfully");
      }, 50);
      exitsting.remove(link);
    }
  });

  const itemsList = [
    { id: 1, name: "Product1", price: 49 },
    { id: 2, name: "Product2", price: 19 },
    { id: 3, name: "Product3", price: 39 },
    { id: 4, name: "Product4", price: 59 },
  ];

  let cartList = JSON.parse(localStorage.getItem("cartList")) || [];

  // render products
  function renderProducts(list, dom, className) {
    dom.innerHTML = "";
    list.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add(className);
      div.innerHTML = `
      <span>${item.name} - $${item.price.toFixed(2)}</span>
      <button data-id="${item.id}">Add to cart</button>
    `;
      dom.appendChild(div);
    });
  }

  renderProducts(itemsList, productList, "product");

  // product click 
  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const id = Number(e.target.dataset.id);
      console.log(id)
      const product = itemsList.find((p) => p.id === id);
      addToCart(product);
    }
  });

  // cart functions
  function addToCart(item) {
    cartList.push(item);
    saveCart();
    displayCart();
  }

  function displayCart() {
    cartItems.innerHTML = "";
    let total = 0;

    if (cartList.length === 0) {
      emptyMsg.classList.remove("hidden");
      cartTotal.classList.add("hidden");
      totalPrice.textContent = "$0.00";
      return;
    }
  
    emptyMsg.classList.add("hidden");
    cartTotal.classList.remove("hidden");

    cartList.forEach((item, index) => {
      total += item.price;
      const div = document.createElement("div");
      div.classList.add('product');
      div.id = `${item.id}`;
      div.innerHTML = `
      <span>${item.name} - $${item.price.toFixed(2)}</span>
      <button class="cartButton" data-index="${index}"> Delete </button>
      `;
      cartItems.appendChild(div);
    });

    totalPrice.textContent = `$${total.toFixed(2)}`;
  }

  // checkout
  checkoutBtn.addEventListener("click", () => {
    cartList = [];
    localStorage.removeItem("cartList");
    displayCart();
    alert("Checkout successful");
  });
function saveCart() {
    localStorage.setItem('cartList', JSON.stringify(cartList));
}

//delete cart
cartItems.addEventListener("click", (e) => {
  if (e.target.classList.contains("cartButton")) {
    const index = Number(e.target.dataset.index);
    cartList.splice(index, 1); // remove only clicked item
    console.log(e)
    saveCart();
    displayCart();
  }
});

  // initial render
  displayCart();
}
