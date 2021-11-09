# Intro

Repositories are structured as JS classes. The parent repo is repository.js, all other repos inherit all of this repo's properties.

All repository files export an instance of the repo, with a filename passed in to the constructor for each class that sets up the associated JSON file/database.

## repository.js

This contains the code that sets out how records are created, read, updated, and deleted. This repo is the parent class for all other repository classes. Note - unlike the other repos, this file does not export an instance of a class but the class itself.

# Other Repos

The other repos export an instance of the class, complete with a filename passed in. This avoids errors where filenames are incorrectly spelled or given different names if they were instantiated in eg. route files.

## carts.js / products.js

These repos simply inherit all props of repository.js. No additional properties are added.

## users.js

This repo adds additional functions that allow for the secure storage of user passwords, ie. encryption and password salting. Comparing of a password provided with that stored allows users to securely sign in.
