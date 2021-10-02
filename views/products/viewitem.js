const layout = require('../layout');

module.exports = ({ product, cartItemsExist }) => {
   return layout({
      cartItemsExist,
      pageTitle: 'View Item | ',
      content: `
      <div id="view-item" class="columns is-centered">
        <div class="column is-half">
          <h1 class="subtitle">View Product</h1>
            <div class="field">
            <label class="label">Title</label>
              <div>${product.title}</div>
            </div>
            
            <div class="field">
              <label class="label">Price</label>
              <div>$${product.price}</div>
            </div>

            <div class="field">
              <img src="data:image/png;base64, ${product.image}"/>
            </div>
                
            <br />

            <form action="/cart/products" method="POST">
                <input hidden value="${product.id}" name="productId"/>
            
                <button class="button is-primary"">
                    <i class="fa fa-shopping-cart"></i>&nbsp; Add to cart
                </button>
            </form>
            
        </div>
    </div>
    `
   });
};
