const express = require('express');

const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
const productsEditTemplate = require('../../views/admin/products/edit');
const productsIndexTemplate = require('../../views/admin/products/index');

const {
   requireImageSize,
   requireTitle,
   requirePrice,
   requireImage
} = require('./validators');
const { handleErrors, requireAuth } = require('./middlewares');

const multer = require('multer');
const upload = multer({
   storage: multer.memoryStorage()
}).single('image');

const router = express.Router();

router.get('/admin/products', requireAuth, async (req, res) => {
   // User first name!!
   const fName = req.session.fName;

   const products = await productsRepo.getAll();
   res.send(productsIndexTemplate({ products, fName }));
});

router.get('/admin/products/:id/edit', requireAuth, async (req, res) => {
   const product = await productsRepo.getOne(req.params.id);
   if (!product) {
      return res.send('Product not found');
   }
   const fName = req.session.fName;
   res.send(productsEditTemplate({ product, fName }));
});

router.post('/admin/products/:id/delete', requireAuth, async (req, res) => {
   await productsRepo.delete(req.params.id);
   res.redirect('/admin/products');
});

router.post(
   '/admin/products/:id/edit',
   requireAuth,
   upload,
   [requireImageSize, requireTitle, requirePrice],
   handleErrors(productsEditTemplate, async req => {
      //so if there's an error, we want to return the current product to the fields..
      // so add a data cb here bc we have access to the product id!! this lets us
      // return the current product to the screen! rather than blank screen..
      const product = await productsRepo.getOne(req.params.id);
      return { product };
   }),
   async (req, res) => {
      console.log(req.params.id);
      const changes = req.body;
      if (req.file) {
         changes.image = req.file.buffer.toString('base64');
      }
      try {
         await productsRepo.update(req.params.id, changes);
      } catch (err) {
         return res.send('Could not find item');
      }
      res.redirect('/admin/products');
   }
);

router.get('/admin/products/new', requireAuth, (req, res) => {
   const fName = req.session.fName;
   res.send(productsNewTemplate({ errors: null, fName }));
});

// router.post(
//    '/admin/products/new',
//    requireAuth,
//    upload,
//    [requireImageSize, requireTitle, requirePrice, requireImage],
//    handleErrors(productsNewTemplate),
//    async (req, res) => {
//       const image = req.file.buffer.toString('base64');
//       const { title, price } = req.body;
//       await productsRepo.create({ title, price, image });
//       res.redirect('/admin/products');
//    }
// );
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
