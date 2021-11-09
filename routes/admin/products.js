const express = require('express');

// Require in the products repo
const productsRepo = require('../../repositories/products');

// Require all product templates
const productsNewTemplate = require('../../views/admin/products/new');
const productsEditTemplate = require('../../views/admin/products/edit');
const productsIndexTemplate = require('../../views/admin/products/index');

// Require validators
const {
   requireImageSize, // lets us specify a maximum size to be uploaded
   requireTitle,
   requirePrice,
   requireImage,
} = require('./validators');
const { handleErrors, requireAuth } = require('./middlewares');

// Multer adds a body object and file/files object to the request object, allows us to upload files using a different encoding type
const multer = require('multer');
const upload = multer({
   storage: multer.memoryStorage(),
}).single('image');

const router = express.Router();

// The control panel home page..
router.get('/admin/products', requireAuth, async (req, res) => {
   // Get user first name from the session cookie!!
   const fName = req.session.fName;

   // Load products from the repo
   const products = await productsRepo.getAll();
   res.send(productsIndexTemplate({ products, fName }));
});

// Edit product
router.get('/admin/products/:id/edit', requireAuth, async (req, res) => {
   const product = await productsRepo.getOne(req.params.id); // Use url/route params to store product id, accessvia req.params.id
   if (!product) {
      // If product no longer exists, eg. url was previously stored, show error
      return res.send('Product not found');
   }
   const fName = req.session.fName;
   res.send(productsEditTemplate({ product, fName }));
});

// Delete product - note - always use post cf get
router.post('/admin/products/:id/delete', requireAuth, async (req, res) => {
   await productsRepo.delete(req.params.id);
   res.redirect('/admin/products');
});

// Update product
router.post(
   '/admin/products/:id/edit',
   requireAuth,
   upload, // ie. uses multer to upload the file.. middleware order is vital heere
   [requireImageSize, requireTitle, requirePrice],
   handleErrors(productsEditTemplate, async req => {
      const product = await productsRepo.getOne(req.params.id);
      return { product };
      // If there's an error, we want to return current product data to the inputs so add data cb here so we have access to the product id! So can return current product to screen rather than just errors
   }),
   async (req, res) => {
      const changes = req.body; // All that is uploaded via the req body are the new field data (ie. changes)
      if (req.file) {
         // If there's a file uploaded, convert to string..
         changes.image = req.file.buffer.toString('base64');
      }
      try {
         // Try update the product
         await productsRepo.update(req.params.id, changes);
      } catch (err) {
         return res.send('Could not find item');
      }
      res.redirect('/admin/products');
   }
);

// Add a new product
router.get('/admin/products/new', requireAuth, (req, res) => {
   const fName = req.session.fName;
   res.send(productsNewTemplate({ errors: null, fName })); // This template requires an errors obj or will show an error, so set as null
});

// Upload new product
router.post(
   '/admin/products/new',
   requireAuth,
   upload,
   [requireImageSize, requireTitle, requirePrice, requireImage],
   handleErrors(productsNewTemplate),
   async (req, res) => {
      const image = req.file.buffer.toString('base64');
      const { title, price } = req.body;
      await productsRepo.create({ title, price, image });
      res.redirect('/admin/products');
   }
);

module.exports = router;
