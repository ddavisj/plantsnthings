const crypto = require('crypto'); // Lets us encrypt user passwords
const util = require('util'); // Use the promisify function to allow scrypt to return a promise (and use async/await syntax)
const scrypt = util.promisify(crypto.scrypt); // A password based key derivation function that works with a salt to make it expensive computationally to guess a password via the use of a salt

const Repository = require('./repository'); // Import the parent repo

class UsersRepository extends Repository {
   // Note - no constructor reqd, we import from Repository

   // Create the user, add a random id, salt the password (ie. add a random string to make it harder to decrypt)
   async create(attrs) {
      attrs.id = this.randomId();
      const salt = crypto.randomBytes(8).toString('hex');
      const buff = await scrypt(attrs.password, salt, 64); // The raw buffer string
      const records = await this.getAll();
      const record = {
         ...attrs,
         password: `${buff.toString('hex')}.${salt}`, // Convert the raw buffer string to hex, ie. join the set of 2 byte stringss
      };
      records.push(record);
      await this.writeAll(records);
      return record;
   }

   // Check if the user supplied password matches that saved in our repo
   async comparePasswords(saved, supplied) {
      // saved -> password saved in our db: 'hashed.salt' (// ie. hashed version??)
      // supplied -> pw given to us by user trying to sign in (// raw/text pw)
      const [hashed, salt] = saved.split('.');
      const hashedSuppliedBuff = await scrypt(supplied, salt, 64);
      return hashed === hashedSuppliedBuff.toString('hex');
   }
}

// Export an instance of the repo with a set filename
module.exports = new UsersRepository('users.json');
