const layout = require('../layout');

module.exports = ({ products, cartItemsExist }) => {
   const renderedProducts = products
      .map(product => {
         return `
        <div class="column is-one-quarter">
          <div class="card product-card">
            <figure>
              <a href="/${product.id}/viewitem"><img src="data:image/png;base64, ${product.image}"/></a>
            </figure>
            <div class="card-content">
              <h3 class="subtitle">${product.title}</h3>
              <h5>$${product.price}</h5>
            </div>
            <footer class="card-footer">
              <form action="/cart/products" method="POST">
              <input hidden value="${product.id}" name="productId"/>
              <button class="button has-icon is-inverted">
                  <i class="fa fa-shopping-cart"></i> Add to cart
                </button>
              </form>
            </footer>
          </div>
        </div>
      `;
      })
      .join('\n');

   return layout({
      cartItemsExist,
      content: `
    <div id="homepage">
      <section>
        <div class="container">
          <div class="columns">
            <div class="column "></div>
            <div class="column is-four-fifths">
              <div>
                <div>
                <h2 id="welcome" class="title text-center">Welcome to Plants 'n Things!</h2>
                We grow all our plants ourselves at our nursery on the Mornington Peninsula. We've also got plenty of tips, tricks and information to help you get started.
                <br><br>Please don't hesitate to email or call us if you have any questions.
                <br><br>
                </div>
                <h2 id="specials" class="title text-center">Indoor Plants</h2>
                <div class="columns products">
                  ${renderedProducts}  
                </div>
              </div>
            </div>
            <div class="column "></div>
          </div>
        </div>
      </section>
    </div>
    <style>
    a#home {
      color: black;
    }
    </style>
    `
   });
};
