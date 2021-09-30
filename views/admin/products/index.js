const layout = require('../layout');

module.exports = ({ products, fName }) => {
   const renderedProducts = products
      .map(product => {
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
      pageTitle: 'Products | ',
      fName,
      content: `
    <div id="admin-index">
      <div class="control">
        <h1 class="subtitle">Products</h1>  
        <a href="/admin/products/new" class="button is-primary">New</a>
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
    `
   });
};
