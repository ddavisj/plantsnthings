const fs = require("fs");
const crypto = require("crypto");
const util = require("util");
const scrypt = util.promisify(crypto.scrypt);

const Repository = require("./repository");

class UsersRepository extends Repository {
   async create(attrs) {
      attrs.id = this.randomId();
      const salt = crypto.randomBytes(8).toString("hex");
      const buff = await scrypt(attrs.password, salt, 64);
      const records = await this.getAll();
      const record = {
         ...attrs,
         password: `${buff.toString("hex")}.${salt}`,
      };
      records.push(record);
      await this.writeAll(records);
      return record;
   }
   async comparePasswords(saved, supplied) {
      //saved -> password saved in our db: 'hashed.salt' (// ie. hashed version??)
      //supplied -> pw given to us by user trying to sign in (// raw/text pw)
      const [hashed, salt] = saved.split(".");
      const hashedSuppliedBuff = await scrypt(supplied, salt, 64);
      return hashed === hashedSuppliedBuff.toString("hex");
   }
   async randomEmailNo({ email, password }) {
      // MY FUNC!!
      const randomNum = Math.floor(Math.random() * 100);
      const emailArr = email.split("@");
      const [user, host] = emailArr;
      const emailNew = `${user}${randomNum}@${host}`;

      const attrs = { email: emailNew, password };
      attrs.id = this.randomId();
      const records = await this.getAll();
      records.push(attrs);
      await this.writeAll(records);
      console.log(`NEW USER CREATED!`, attrs);
   }
}

module.exports = new UsersRepository("users.json");
