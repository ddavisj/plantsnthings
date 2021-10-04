const express = require('express');
const router = express.Router();

const productsRepo = require('../repositories/products');

// To find out if cart items exist..
const cartsRepo = require('../repositories/carts');

const productsIndexTemplate = require('../views/products/index');
const productsViewItem = require('../views/products/view-item');

const shuffleArray = array => {
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
   }
};

// Orig
// router.get('/', async (req, res) => {
//    const products = await productsRepo.getAll();

//    res.send(productsIndexTemplate({ products }));
// });

// Ver 2 - find out if cart items exist
router.get('/', async (req, res) => {
   const products = await productsRepo.getAll();

   shuffleArray(products);
   const cart = await cartsRepo.getOne(req.session.cartId);
   let cartItemsExist;
   if (cart && cart.items.length) {
      cartItemsExist = true;
   }

   res.send(productsIndexTemplate({ products, cartItemsExist }));
});

router.get('/:id/viewitem', async (req, res) => {
   const product = await productsRepo.getOne(req.params.id);

   const products = await productsRepo.getAll();
   const productIndex = products.findIndex(item => item.id === req.params.id);
   const nextProductId =
      productIndex < products.length - 1
         ? products[productIndex + 1].id
         : products[0].id;

   const cart = await cartsRepo.getOne(req.session.cartId);
   let cartItemsExist;
   if (cart && cart.items.length) {
      cartItemsExist = true;
   }
   res.send(productsViewItem({ product, cartItemsExist, nextProductId }));
});

module.exports = router;
