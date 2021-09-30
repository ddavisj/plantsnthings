const Repository = require('./repository');

class CartsRepository extends Repository {
   // async delete(cartId, productId) {
   //    const records = await this.getAll();
   //    console.log('WORKS!');
   //    const cart = records.find(id => id === cartId);
   //    console.log(cart);
   //    //   const updatedCart = cart.filter(item => item.id !== productId);
   //    // this.writeAll(filteredRecords);
   // }
}

module.exports = new CartsRepository('carts.json');
