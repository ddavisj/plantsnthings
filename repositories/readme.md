# Intro

Repositories are structured as JS classes. The base repo is simply called repository.js, all other repos inherit all of this repo's properties.

All repository files export an instance of the repo, with a filename passed in to the constructor for each class that sets up the associated JSON file/database.

# repository.js

This contains the code that sets out how records are created, read, updated, and deleted.

# carts.js / products.js

These repos simply inherit all props of repository.js. No additional properties are added.

# users.js

This repo adds additional functions that allow for the secure storage of user passwords, ie. encryption and password salting. Comparing of a password provided with that stored allows users to securely sign in.
