#!/usr/bin/env node

const express = require('express');

const cookieSession = require('cookie-session');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static('public'));

const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const contactRouter = require('./routes/contact');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
   cookieSession({
      keys: ['afrgadfgdrf3453tdfg']
   })
);

app.use(express.limit('10M'));

app.use(authRouter);
app.use(adminProductsRouter);
app.use(productsRouter);
app.use(cartsRouter);
app.use(contactRouter);

app.listen(port, () => {
   console.log(`Listening on port ${port}..`);
});
