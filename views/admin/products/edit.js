const layout = require('../layout');

const { getError } = require('../../helpers');

module.exports = ({ product, errors, fName }) => {
   return layout({
      fName,
      pageTitle: 'Edit Product | ',
      content: `
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="subtitle">Edit a Product</h1>

          <form method="POST" enctype="multipart/form-data">
            <div class="field">
              <label class="label">Title</label>
              <input value="${
                 product.title
              }" class="input" placeholder="Title" name="title">
              <p class="help is-danger">${getError(errors, 'title')}</p>
            </div>
            
            <div class="field">
              <label class="label">Price</label>
              <input value="${
                 product.price
              }" class="input" placeholder="Price" name="price">
              <p class="help is-danger">${getError(errors, 'price')}</p>
            </div>

            <!-- /DH/ -->
            <div class="field">
                <img src="data:image/png;base64, ${product.image}"/>
            </div>
            <!-- -->

            <div class="field">
              <label class="label">Image</label>            
              <input type="file" name="image" />
            </div>
            <br />
            <button class="button is-primary">Save</button>
          </form>
        </div>
      </div>
    `
   });
};
