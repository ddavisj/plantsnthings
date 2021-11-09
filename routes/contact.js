// I added this form to allow users to send a msg to the site admin.
// TODO: Add mail functionality so emails are actually sent!

const express = require('express');
const router = express.Router();

const { handleErrors } = require('./admin/middlewares');
const {
   requireName,
   requireMsg,
   requirePhoneNo,
} = require('./admin/validators');

// Do items exist..
const cartsRepo = require('../repositories/carts');

const contactTemplate = require('../views/contact');

// Update contact form
router.post(
   '/contact',
   [requireName, requireMsg, requirePhoneNo],
   handleErrors(contactTemplate),
   async (req, res) => {
      // A cart icon is shown on the page if a cartID session cookie exists
      const cart = await cartsRepo.getOne(req.session.cartId);
      let cartItemsExist;
      if (cart) {
         if (cart.items.length) {
            cartItemsExist = true;
         }
      }

      const { name } = req.body;
      const firstName = name.includes(' ') ? name.split(' ')[0] : name; // Extract first name from full name, split by space
      const confMsg = `<p>Thanks ${firstName}, we'll be in contact asap!</p>`;

      res.send(contactTemplate({ cartItemsExist, confMsg }));
   }
);

// Show contact form
router.get('/contact', async (req, res) => {
   const cart = await cartsRepo.getOne(req.session.cartId);
   let cartItemsExist;
   if (cart) {
      if (cart.items.length) {
         cartItemsExist = true;
      }
   }

   res.send(contactTemplate({ errors: null, cartItemsExist, confMsg: null }));
});

module.exports = router;
