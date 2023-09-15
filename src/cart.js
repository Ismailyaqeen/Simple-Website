let label = document.getElementById("label");
let shoppingCart = document.getElementById("shop-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartNum = document.getElementById("cartAmount");
  cartNum.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);

  //   cartNum.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateShopCart = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        // console.log(x);
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        let { img, name, price } = search;
        return `
        <div class="cart-items">
        <img width='100' src=${img} alt="" />
        <div class="details">
        <div class="title-price-x">
        <h3 class='title-price'>
        <p>${name}</p>
        <p class='price'>$ ${price}</p>
      </h3>
      <i onclick='removeItem(${id})' class="bi bi-x-lg"></i>
        </div>
            <div class="buttons">
            <i onclick='decrement(${id})' class="bi bi-dash-lg"></i>
            <div id=${id} class="quantity">${item} </div>
            <i onclick='increment(${id})' class="bi bi-plus-lg"></i>
        </div>
            <h3>$ ${item * search.price} </h3>
        </div>
        </div>

      `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href='new.html'>
    <button class='home'>Back to home</button>
    // </a>
    `;
  }
};

generateShopCart();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  localStorage.setItem("data", JSON.stringify(basket));
  generateShopCart();
  update(selectedItem.id);
};
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateShopCart();
  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  //   console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalBill();
};

let removeItem = (id) => {
  let selectedItem = id;
  //   console.log(selectedItem.id);
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateShopCart();
  totalBill();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateShopCart();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

let totalBill = () => {
  if (basket.length !== 0) {
    let bill = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);

    label.innerHTML = `
            <h2>Total bill: $ ${bill}</h2>
            <button class="check">Checkout</button>
            <button onclick="clearCart()"class="ccart">Clear Cart</button>
      `;
  } else return;
};

totalBill();
