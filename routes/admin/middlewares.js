const { validationResult } = require('express-validator');

module.exports = {
   handleErrors(templateFunc, dataCb) {
      return async (req, res, next) => {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            let data = {};
            if (dataCb) {
               data = await dataCb(req);
            }
            return res.send(templateFunc({ errors, ...data }));
            // console.log({ errors, ...data });
         }
         // if (confirmationHTML && errors.isEmpty) {
         //    return res.send(templateFunc({ confirmationHTML }));
         // }
         next();
      };
   },
   requireAuth(req, res, next) {
      if (!req.session.userId) {
         return res.redirect('/signin');
      }
      next();
   }
};
