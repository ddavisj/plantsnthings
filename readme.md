## Introduction

This app was adapted from a [Udemy course](https://www.udemy.com/course/javascript-beginners-complete-tutorial/). It's a plant shop, built with a custom Node server, Express and html templates. Node modules provide functionality, such as the ability to set cookies so users can add items to a cart without having to sign, and form validation. An encryption module allows admins to securely create an account, add products and upload images. All product data, users, shopping carts and product images are stored in JSON files.

# Main Technologies

-  node 14.8.0
-  express 4.17.1 -
   A full featured web server built for NodeJS

# Node Modules

-  cookie-session 1.4.0 -
   Allows storing of session cookies
-  express-validator 6.12.1 -
   A set of express.js middleware that wraps validator and sanitizer functions
-  multer 1.4.3 -
   Parses input fields and allows for file and image uploads
-  nodemon 2.0.12 -
   Watches for changes made to files in a project, and restarts as necessary

# Main Folders

Public: Holds all public, non-JS, files and images that the project needs, eg. css files, banners, logos etc.

Repositories: The server. Separate repositories exist for each of the data records, eg. products, users and carts.

Routes: Files created for each of the different sets of urls required. Routes set out how these urls work, what templates and views are loaded.

Templates: Two html templates have been created for this project - one for front-end user pages, and another for the admin panel. Templates provide the basic html required by each set of pages.

Views: These are loaded for specific routes as required. Template strings allow the insertion of dynamic content for each view.

# Additional Files

Procfile. A file required by Heroku's server, that allows us to specify how the project is set up.
