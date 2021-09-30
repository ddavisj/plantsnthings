const express = require('express');
const router = express.Router();

const { handleErrors } = require('./admin/middlewares');
const {
   requireName,
   requireMsg,
   requirePhoneNo
} = require('./admin/validators');

// const { checkForCart } = require('./_contactHelpers');

// Do items exist..
const cartsRepo = require('../repositories/carts');

const contactTemplate = require('../views/contact');

router.post(
   '/contact',
   [requireName, requireMsg, requirePhoneNo],
   handleErrors(contactTemplate),
   async (req, res) => {
      const cart = await cartsRepo.getOne(req.session.cartId);
      let cartItemsExist;
      if (cart) {
         if (cart.items.length) {
            cartItemsExist = true;
         }
      }
      //   checkForCart(req);

      const { name } = req.body;
      const firstName = name.includes(' ') ? name.split(' ')[0] : name;
      const confMsg = `<p>Thanks ${firstName}, we'll be in contact asap!</p>`;

      res.send(contactTemplate({ cartItemsExist, confMsg }));
   }
);

router.get('/contact', async (req, res) => {
   const cart = await cartsRepo.getOne(req.session.cartId);
   let cartItemsExist;
   if (cart) {
      if (cart.items.length) {
         cartItemsExist = true;
      }
   }
   //    let cartItemsExist;
   //    checkForCart(req);

   res.send(contactTemplate({ errors: null, cartItemsExist, confMsg: null }));
});

module.exports = router;
