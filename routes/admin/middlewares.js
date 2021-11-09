// Import validation library, destructure result of validation
const { validationResult } = require('express-validator');

module.exports = {
   // Extract validation errors from the validation result
   // We've added an additional parameter, a data cb that allows us to send to the template eg. a specific product, rather than losing existing product data and simply sending errors.
   // This data is then merged with the errors via spread
   handleErrors(templateFunc, dataCb) {
      return async (req, res, next) => {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            let data = {};
            if (dataCb) {
               data = await dataCb(req);
            }
            return res.send(templateFunc({ errors, ...data }));
         }
         next();
      };
   },
   // Require admins to be logged in to access certain pages
   requireAuth(req, res, next) {
      if (!req.session.userId) {
         return res.redirect('/signin');
      }
      next();
   },
};
