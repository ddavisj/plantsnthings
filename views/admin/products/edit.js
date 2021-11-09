const layout = require('../layout'); // Load the admin layout

const { getError } = require('../../helpers');

// Pass in fName so user can see they're logged in.. TODO - Q: Can we use cookie for this?
module.exports = ({ product, errors, fName }) => {
   return layout({
      fName,
      pageTitle: 'Edit Product | ', // SEO!
      content: `
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="subtitle">Edit a Product</h1>

          ${
             // Show errors is exist - ternary operator within template string
             errors
                ? '<h2 class="help is-danger">Please fix all errors below<br><br></h2>'
                : ''
          }

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

            <div class="field">
              <img src="data:image/png;base64, ${product.image}"/>
            </div>
                
            <div class="field">
              <label class="label">Image</label>            
              <input type="file" name="image" />
              <p class="help is-danger">${getError(errors, 'image')}</p>
            </div>
            <br />

            <button class="button is-primary">Save</button>
          </form>
        </div>
      </div>
    `,
   });
};
