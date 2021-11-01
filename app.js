#!/usr/bin/env node

// Import the main modules
const express = require('express');
const cookieSession = require('cookie-session');

// Instantiate the app
const app = express();

// If the app is run on a production environment, the port is set by the host. Alternatively, specify the port for local testing
const port = process.env.PORT || 3000;

// Set cache control headers, ie. specify how long files are to be cached by browsers
app.use(
   express.static('public', {
      setHeaders: (res, path) => {
         if (path.endsWith('.html')) {
            // Do not cache html files
            res.setHeader('Cache-Control', 'no-cache');
         }
         if (path.includes('.css')) {
            res.setHeader('Cache-Control', 'max-age=600');
         }
      }
   })
);

// Import all relevant routers
const authRouter = require('./routes/admin/auth'); // Authentication
const adminProductsRouter = require('./routes/admin/products'); // Product related for editing and adding products
const productsRouter = require('./routes/products'); // Product related but user-facing routes
const cartsRouter = require('./routes/carts'); // Set up how the cart works
const contactRouter = require('./routes/contact'); // Contact us page - set up by DH

// Sets how parsing of form data is to be done
app.use(express.json());

// Default way to parse form body data (ie. if no other method specified or image needs to be uploaded)
app.use(express.urlencoded({ extended: true }));

// We use a random key that prevents hackers from setting their own cookies and impersonating other users
app.use(
   cookieSession({
      keys: ['aeghqaer2346tasdfg']
   })
);

// Make the routers above available to our app
app.use(authRouter);
app.use(adminProductsRouter);
app.use(productsRouter);
app.use(cartsRouter);
app.use(contactRouter);

// Console log the port to listen on - for local dev purposes
app.listen(port, () => {
   console.log(`Listening on port ${port}..`);
});
