const express = require('express');
const router = express.Router();

const productsRepo = require('../repositories/products');

// To find out if cart items exist..
const cartsRepo = require('../repositories/carts');

const productsIndexTemplate = require('../views/products/index');

// Orig
// router.get('/', async (req, res) => {
//    const products = await productsRepo.getAll();

//    res.send(productsIndexTemplate({ products }));
// });

// Ver 2 - find out if cart items exist
router.get('/', async (req, res) => {
   const products = await productsRepo.getAll();

   const cart = await cartsRepo.getOne(req.session.cartId);
   let cartItemsExist;
   if (cart) {
      if (cart.items.length) {
         cartItemsExist = true;
      }
   }

   res.send(productsIndexTemplate({ products, cartItemsExist }));
});

module.exports = router;
