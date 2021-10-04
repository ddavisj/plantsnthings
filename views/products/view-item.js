const layout = require('../layout');

module.exports = ({ product, cartItemsExist, nextProductId }) => {
   return layout({
      cartItemsExist,
      pageTitle: 'View Item | ',
      content: `
      <div id="view-item" class="columns is-centered">
        <div class="column is-half">
        <div id="headings">
            <h1 class="subtitle">${product.title}</h1>
            <h3>$${product.price}</h3>
            <p>&nbsp;</p>
        </div>

            <div class="field">
              <img src="data:image/png;base64, ${product.image}"/>
            </div>
                
            <div id="next-product">
                <a style="color: var(--primary)" href="/${nextProductId}/viewitem"><b>Next > </b></a>
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
