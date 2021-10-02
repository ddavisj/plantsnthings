const layout = require('../layout');

module.exports = ({ items }) => {
   const totalPrice = items.reduce((total, item) => {
      return total + item.quantity * item.product.price;
   }, 0);
   const noOfItems = items.reduce((totalItems, item) => {
      return totalItems + item.quantity;
   }, 0);
   const formattedPrice = new Intl.NumberFormat().format(totalPrice);

   const renderedItems = items
      .map(item => {
         return `
        <div class="cart-item message">
          <figure>
            <a href="/${item.id}/viewitem"><img src="data:image/png;base64, ${item.product.image}" /></a>
          </figure>
          <h3 class="subtitle">${item.product.title}</h3>
          <div class="cart-right">
            <div>
              Qty: ${item.quantity}
            </div>
            <div class="price is-size-4">
              $${item.product.price}
            </div>
            <div class="remove">
              <form method="POST" action="/cart/products/delete">
                <button class="button is-danger">
                <input hidden value="${item.id}" name="itemId"/>              
                  <span class="icon is-small">
                    <i class="fas fa-times"></i>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      `;
      })
      .join('');

   return layout({
      pageTitle: 'Shopping Cart | ',
      cartItemsExist: true,
      content: `
      <div id="cart" class="container">
        <div class="columns">
          <div class="column"></div>
          <div class="column is-four-fifths">
            <h3 class="subtitle"><b>Shopping Cart</b></h3>
            <div>
              ${renderedItems}
            </div>
            <div class="total message is-info">
              <div class="message-header">
                Subtotal (${noOfItems} items)
              </div>
              <h1 class="title">$ ${formattedPrice}</h1>
              <button class="button is-primary">Proceed to Checkout</button>
            </div>
          </div>
          <div class="column"></div>
        </div>
      </div>
      <style>.footer {display:none}
      a#cart {color: black}
      </style>
    `
   });
};
