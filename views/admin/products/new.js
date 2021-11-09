// Show new product page

const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ errors, fName }) => {
   return layout({
      fName,
      pageTitle: 'New Product | ',
      content: `
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="subtitle">Create a Product</h1>

          <form method="POST" enctype="multipart/form-data">
            <div class="field">
              <label class="label">Title</label>
              <input class="input" placeholder="Title" name="title">
              <p class="help is-danger">${getError(errors, 'title')}</p>
            </div>
            
            <div class="field">
              <label class="label">Price</label>
              <input class="input" placeholder="Price" name="price">
              <p class="help is-danger">${getError(errors, 'price')}</p>
            </div>

            <!-- <div class="field">
              <label class="label">Link</label>
              <input class="input" placeholder="https://..." name="link">
              <p class="help is-danger">${getError(errors, 'link')}</p>
            </div> -->
            
            <div class="field">
              <label class="label">Image</label>            
              <input type="file" name="image" />
              <p class="help is-danger">${getError(errors, 'image')}</p>
            </div>
            <br />
            <button class="button is-primary">Create</button>
          </form>
        </div>
      </div>
    `,
   });
};
