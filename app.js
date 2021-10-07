#!/usr/bin/env node

const express = require('express');

const cookieSession = require('cookie-session');

const app = express();

const port = process.env.PORT || 3000;

// app.use(express.static('public'));
app.use(
   express.static('public', {
      // etag: true, // Just being explicit about the default.
      // lastModified: true,  // Just being explicit about the default.
      setHeaders: (res, path) => {
         if (path.endsWith('.html')) {
            // All of the project's HTML files end in .html
            res.setHeader('Cache-Control', 'no-cache');
         }
         if (path.includes('.css')) {
            res.setHeader('Cache-Control', 'max-age=600');
         }
      }
   })
);

const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const contactRouter = require('./routes/contact');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
   cookieSession({
      keys: ['aeghqaer2346tasdfg']
   })
);

app.use(authRouter);
app.use(adminProductsRouter);
app.use(productsRouter);
app.use(cartsRouter);
app.use(contactRouter);

app.listen(port, () => {
   console.log(`Listening on port ${port}..`);
});
