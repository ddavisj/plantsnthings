const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');

const express = require('express');
const {
   requireFirstName,
   requireEmail,
   requirePassword,
   requirePasswordConfirmation,
   requireEmailExists,
   requireValidPasswordForUser,
} = require('./validators');
const { handleErrors } = require('./middlewares');

const router = express.Router();

router.get('/signup', (req, res) => {
   res.send(signupTemplate({ req }));
});

router.post(
   '/signup',
   [
      requireFirstName,
      requireEmail,
      requirePassword,
      requirePasswordConfirmation,
   ],
   handleErrors(signupTemplate),
   async (req, res) => {
      const { fName, email, password, passwordConfirmation } = req.body;
      const user = await usersRepo.create({ fName, email, password });
      // Store the user id inside the user cookie
      req.session.userId = user.id;
      // res.redirect('/admin/products'); ?? redirect to products page? normally, want browser to save info.. so go to signin..
      res.redirect('/signin');
   }
);

router.get('/signout', (req, res) => {
   req.session = null;
   // res.send("You're now logged out");
   res.redirect('/');
});

router.get('/signin', (req, res) => {
   res.send(signinTemplate({ errors: null }));
});

router.post(
   '/signin',
   [requireEmailExists, requireValidPasswordForUser],
   handleErrors(signinTemplate),
   async (req, res) => {
      const { email, password } = req.body;
      const user = await usersRepo.getOneBy({ email });
      req.session.userId = user.id;

      //store name in cookie!
      req.session.fName = user.fName;
      res.redirect('/admin/products');
      // res.send(`Welcome back ${user.fName}! You're now signed in`);
      // show name in top right hand corner..
   }
);

module.exports = router;
