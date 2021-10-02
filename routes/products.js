const express = require('express');
const router = express.Router();

const productsRepo = require('../repositories/products');

// To find out if cart items exist..
const cartsRepo = require('../repositories/carts');

const productsIndexTemplate = require('../views/products/index');
const productsViewItem = require('../views/products/viewitem');

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
   if (cart && cart.items.length) {
      cartItemsExist = true;
   }

   res.send(productsIndexTemplate({ products, cartItemsExist }));
});

router.get('/:id/viewitem', async (req, res) => {
   const product = await productsRepo.getOne(req.params.id);

   const cart = await cartsRepo.getOne(req.session.cartId);
   let cartItemsExist;
   if (cart && cart.items.length) {
      cartItemsExist = true;
   }
   res.send(productsViewItem({ product, cartItemsExist }));
});

module.exports = router;
