const Repository = require("./repository");

class ProductsRepository extends Repository {
   //    async create(attrs) {
   //       attrs.id = this.randomId();
   //       const records = await this.getAll();
   //       records.push(attrs);
   //       await this.writeAll(records);
   //       return attrs;
   //    }
}

module.exports = new ProductsRepository("products.json");
