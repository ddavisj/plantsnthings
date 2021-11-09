const layout = require('../layout'); // Load the admin layout

module.exports = ({ products, fName }) => {
   // Create an html string with all products joined together
   // Products here is an array
   const renderedProducts = products
      .map(product => {
         // Map individual items in the array into the following html template string
         return `
        <tr>
         <td>
            <a href="/admin/products/${product.id}/edit">
              <img src="data:image/png;base64, ${product.image}"/>
            </a>
         </td>
         <td>${product.title}</td>
         <td>${product.price}</td>
         <td>
            <a href="/admin/products/${product.id}/edit">
             <button class="button is-link">
             <i class="far fa-edit"></i>
             </button>
           </a>
         </td>
         <td>
          <form method="POST" action="/admin/products/${product.id}/delete">
            <button class="button is-danger"><i class="fas fa-trash"></i></button>
          </form>
         </td>
       </tr>
     `;
      })
      .join('');

   return layout({
      // Add products above within the content string, all within the admin layout
      pageTitle: 'Products | ',
      fName,
      content: `
    <div id="admin-index">
      <div class="control">
        <h1 class="subtitle">Products</h1>  
        <a href="/admin/products/new" class="button is-primary">New Product</a>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Edit</i></th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          ${renderedProducts}
        </tbody>
      </table>
    </div>
    <style>#products {color: black !important}
    `,
   });
};
