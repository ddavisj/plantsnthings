const { check } = require('express-validator');
const usersRepo = require('../../repositories/users');

const maxFileSize = 0.7; // MB

module.exports = {
   // note: these are fn calls stored as obj (module.exports) props
   requirePhoneNo: check('phone')
      .trim()
      .isNumeric()
      .withMessage('Please enter your phone number (digits only)'),
   requireMsg: check('message')
      .trim()
      .notEmpty()
      .withMessage('Please enter a message'),
   requireName: check('name')
      .trim()
      .isLength({ min: 1, max: 20 })
      .withMessage('Please enter your name'),
   requireUrl: check('link').trim().isURL().withMessage('Not a valid URL'),
   requireFirstName: check('fName')
      .trim()
      .isLength({ min: 1, max: 20 })
      .withMessage('First name is required (max 20 chars)'),
   requireImage: check('image').custom(async (image, { req }) => {
      if (!req.file) {
         throw new Error('Image is required');
      }
   }),
   requireImageSize: check('image').custom(async (image, { req }) => {
      if (req.file && req.file.size > maxFileSize * 1024 * 1024) {
         throw new Error(`File must be smaller than ${maxFileSize}MB`);
      }
   }),
   requireTitle: check('title')
      .trim()
      .isLength({ min: 5, max: 40 })
      .withMessage('Must be between 5 and 40 chars'),
   requirePrice: check('price')
      .trim()
      .toFloat()
      .isFloat({ min: 1 })
      .withMessage('Must be a number greater than 1'),
   requireValidPasswordForUser: check('password')
      .trim()
      .custom(async (password, { req }) => {
         const user = await usersRepo.getOneBy({ email: req.body.email });
         if (!user) {
            throw new Error('Invalid password');
         }
         const validPassword = await usersRepo.comparePasswords(
            user.password,
            password
         );
         if (!validPassword) {
            throw new Error('Incorrect password, pls try again');
         }
      }),
   requireEmailExists: check('email')
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage('Must provide a valid email')
      .custom(async email => {
         const user = await usersRepo.getOneBy({ email });
         if (!user) {
            throw new Error('Email not found');
         }
      }),
   requireEmail: check('email')
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage('Must be a valid email')
      .custom(async email => {
         const existingUser = await usersRepo.getOneBy({ email });
         if (existingUser) {
            throw new Error('Email in use');
         }
      }),
   requirePassword: check('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Must be between 4 and 20 characters'),
   requirePasswordConfirmation: check('passwordConfirmation')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Must be between 4 and 20 characters')
      .custom((passwordConfirmation, { req }) => {
         if (passwordConfirmation !== req.body.password) {
            throw new Error('Passwords must match');
         }
         return true;
      })
};
