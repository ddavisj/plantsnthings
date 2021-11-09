// User product pages

const express = require('express');
const router = express.Router();

const productsRepo = require('../repositories/products');

const cartsRepo = require('../repositories/carts');

const productsIndexTemplate = require('../views/products/index');
const productsViewItem = require('../views/products/view-item');

// Basic (condensed) shuffle algorithm lets us show products in a random order on load
const shuffleArray = array => {
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
   }
};

// Show user home page
router.get('/', async (req, res) => {
   const products = await productsRepo.getAll();

   shuffleArray(products);
   // If cart items exist, show cart icon
   const cart = await cartsRepo.getOne(req.session.cartId);
   let cartItemsExist;
   if (cart && cart.items.length) {
      cartItemsExist = true;
   }

   res.send(productsIndexTemplate({ products, cartItemsExist }));
});

// Load individual product
router.get('/:id/viewitem', async (req, res) => {
   const product = await productsRepo.getOne(req.params.id);

   const products = await productsRepo.getAll();
   const productIndex = products.findIndex(item => item.id === req.params.id);

   // Give users ability to click on next or previous product (not shuffled!)
   const nextProductId =
      productIndex === products.length - 1 // ie. last in the array
         ? products[0].id // go to first
         : products[productIndex + 1].id; // go to next

   const prevProductId =
      productIndex === 0 // ie. first in the array
         ? products[products.length - 1].id // go to last
         : products[productIndex - 1].id; // go to prev

   const cart = await cartsRepo.getOne(req.session.cartId);
   let cartItemsExist;
   if (cart && cart.items.length) {
      cartItemsExist = true;
   }
   res.send(
      productsViewItem({
         product,
         cartItemsExist,
         prevProductId,
         nextProductId,
      })
   );
});

module.exports = router;
