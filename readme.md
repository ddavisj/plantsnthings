## Introduction

This app was adapted from a [Udemy course](https://www.udemy.com/course/javascript-beginners-complete-tutorial/). It's a plant shop, built with a custom Node server, Express and html templates. Node modules provide functionality, including the ability to set cookies so users can add items to a cart without having to sign in as well as form validation. Encryption also allows admins to securely create an account, add products and upload images. All product data, users, shopping carts and product images are stored in JSON files.

# Main Technologies

-  node 14.8.0
-  express 4.17.1 -
   A full featured web server built for NodeJS

# Node Modules

-  cookie-session 1.4.0 -
   Allows us to store session cookies
-  express-validator 6.12.1 -
   A set of express.js middlewares that wraps validator and sanitizer functions
-  multer 1.4.3 -
   Parses input fields and allows for the upload of images
-  nodemon 2.0.12 -
   A module that watches for changes made to files in a project, and restarts as necessary

# Main Folders

Public: Holds all files that the project needs to be loaded and available to the public, eg. css files, image banners, logos etc.
Repositories: The server. Repositories exist for each of the data record types to be stored, eg. products, users and carts.
Routes: Route files were created for each of the different sets of urls required. These routes set how these urls work, and what templates each different endpoint/url loads.
Templates: Two html templates have been created for this project - one for the front-end user pages, and another for the admin control panel. These provide the basic html required by each set of pages.
Views: These are loaded for specific routes as required. Template strings allow the insertion of dynamic content for each view.

# Additional Files

Procfile. A file required by Heroku's server, that allows us to specify how the project is set up.
