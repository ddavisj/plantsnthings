const fs = require('fs'); // Load default file system module
const crypto = require('crypto'); // For encypting passwords and creating random product, user and cart ids

module.exports = class Repository {
   constructor(filename) {
      // When instantiating any repo, a filename is reqd or an error will be  thrown
      if (!filename) {
         throw new Error('Creating a repository requires a filename!');
      }
      this.filename = filename;

      // If the filename doesn't exist, create it and insert an empty array
      try {
         fs.accessSync(this.filename);
      } catch (err) {
         fs.writeFileSync(this.filename, '[]');
      }
   }

   // Create a record
   async create(attrs) {
      // Pass in all relevant attributes (in an array of object)
      attrs.id = this.randomId(); // Assign a randomly generated id (character string)
      const records = await this.getAll(); // Get all records from the relevant repo
      records.push(attrs); // Add the current record to the array of all records
      await this.writeAll(records); // Save the repo
      return attrs; // Return the record originally passed in (but now with an id)
   }

   // Get all records from the relevant repo
   async getAll() {
      return JSON.parse(
         await fs.promises.readFile(this.filename, {
            encoding: 'utf8',
         })
      );
   }

   // Save all records
   async writeAll(records) {
      await fs.promises.writeFile(
         this.filename,
         JSON.stringify(records, null, 2) // An optional param that sets out the nested structure of the saved array
      );
   }

   // Generate a random id (4 bytes = 8 chars), convert to hexadecimal (base 16) string
   randomId() {
      return crypto.randomBytes(4).toString('hex');
   }

   // Extract a record by id
   async getOne(id) {
      const records = await this.getAll();
      return records.find(record => record.id === id);
   }

   // Delete a record by id
   async delete(id) {
      const records = await this.getAll();
      const filteredRecords = records.filter(record => record.id !== id);
      this.writeAll(filteredRecords);
   }

   // Update a record, pass in an id and all new attributes
   async update(id, attrs) {
      const records = await this.getAll();
      const record = records.find(record => record.id === id);
      if (!record) {
         throw new Error(`Record with id ${id} not found`);
      }
      Object.assign(record, attrs); // Assign the specified record-object a new set of attrs
      await this.writeAll(records);
   }

   // Find the first record in the repo that matches a set of attrs/filters
   async getOneBy(filters) {
      const records = await this.getAll();
      for (let record of records) {
         let found = true;
         for (let key in filters) {
            if (record[key] !== filters[key]) {
               found = false;
            }
         }
         if (found) {
            return record;
         }
      }
   }
};
