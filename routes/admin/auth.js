// This file sets up all user authentication pages. Eg. Sign Up, Sign In and Log Out.
// Pages are loaded via templates that call the underlying auth-layout html template (/views/admin/auth/auth-layout)

// Load user repo to access users and relevant methods
const usersRepo = require('../../repositories/users');

// Load html views for Sign Up and Sign In
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');

// Load express
const express = require('express');

// Load and destructure validation/middleware functions
const {
   requireFirstName,
   requireEmail,
   requirePassword,
   requirePasswordConfirmation,
   requireEmailExists,
   requireValidPasswordForUser,
} = require('./validators');

// Extract error handling into a middleware file
const { handleErrors } = require('./middlewares');

// Set up an Express router for all routes in this file (exported via module.exports below)
const router = express.Router();

// Show the Sign Up page (pass request to show if user has a cart)
router.get('/signup', (req, res) => {
   res.send(signupTemplate({ req }));
   // Req is not explicitly reqd by the signUpTemplate but our middlewares intercept it and extract errors if present..
});

// Handle user data, handle errors via middleware validators, pass reqd errors to template if present
// .. then destructure fields from the req body and pass them to our repo to create the user..
router.post(
   '/signup',
   // Run all validators
   [
      requireFirstName,
      requireEmail,
      requirePassword,
      requirePasswordConfirmation,
   ],
   handleErrors(signupTemplate), // If there are errors, returns the template, else, runs next()..
   async (req, res) => {
      const { fName, email, password, passwordConfirmation } = req.body;
      const user = await usersRepo.create({ fName, email, password });
      // Store the user id inside the user cookie
      // User needs to log in after signing up..
      // Could redirect to products page but we want browser to save info.. so go to signin..
      res.redirect('/signin');
   }
);

// Set the cookie as null when user logs out
router.get('/signout', (req, res) => {
   req.session = null;
   res.redirect('/');
});

// Admin sign In Page - Pass in errors: null for get request..
router.get('/signin', (req, res) => {
   res.send(signinTemplate({ errors: null }));
});

router.post(
   '/signin',
   [requireEmailExists, requireValidPasswordForUser],
   handleErrors(signinTemplate),
   async (req, res) => {
      const { email } = req.body; // Destructure reqd params from req.body
      const user = await usersRepo.getOneBy({ email }); // Load user from repo
      req.session.userId = user.id; // Set user cookie

      // Store First Name in cookie! So avail to all pages
      req.session.fName = user.fName;
      res.redirect('/admin/products');
   }
);

module.exports = router;
