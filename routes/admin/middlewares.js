const { validationResult } = require('express-validator');

const multer = require('multer');
// Original code
// const upload = multer({
//    storage: multer.memoryStorage(),
//    limits: { fileSize: maxFileSizeMB * 1024 * 1024 }
// });
const maxFileSize = 7; // in MB

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
         }
         next();
      };
   },
   requireAuth(req, res, next) {
      if (!req.session.userId) {
         return res.redirect('/signin');
      }
      next();
   },
   uploadFile(req, res, next) {
      const upload = multer({
         storage: multer.memoryStorage(),
         limits: { fileSize: maxFileSize * 1024 * 1024 }
      }).single('image');

      upload(req, res, function (err) {
         if (err instanceof multer.MulterError) {
            return res.send(
               `Uploaded images must be less than ${maxFileSize}MB`
            );
         } else if (err) {
            return res.send(`An unknown error occurred when uploading.`);
         }
         next();
      });
   }
};
