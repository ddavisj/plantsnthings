module.exports = {
   getError: (errors, prop) => {
      // prop === 'email' || 'pw' || 'pwConf'
      try {
         return errors.mapped()[prop].msg;
      } catch (err) {
         return "";
      }
   },
};
