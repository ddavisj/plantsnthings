module.exports = ({ content, fName = 'David', pageTitle }) => {
   if (fName.length > 10) {
      fName = fName.slice(0, 10).trim() + '..';
   }

   return `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${pageTitle}Plants 'n Things</title>
          <link href="/css/main.css" rel="stylesheet"></link>
          <link href="/css/all.min.css" rel="stylesheet"></link>
          <link href="/css/bulma.min.css" rel="stylesheet"></link>
          <style>
          .navbar-item a {
            padding-right: 20px;
          }
          </style>
        </head>
        <body class="admin">
          <header>
          <section class="banner mob-only">
            <div class="container">
              <div class="columns is-centered">
                <a href="/admin/products"><img src="/images/shop-banner.jpg" /></a>
              </div>
            </div>
          </section>
            <nav class="navbar navbar-bottom">
              <div class="container navbar-container console">
                <div class="wide-only">
                  <a href="/"><img src="/images/pnt-logo.jpg" /></a>
                </div>
                <div id="admin-console">
                  <a href="/admin/products">
                    <h3 class="title">Admin</h3>
                  </a>
                </div>
                <div id="spacer">
                </div>
                <div class="navbar-item">
                  <div class="navbar-buttons">
                    <div class="navbar-item">
                      <a title="Back to Homepage" href="/"></i> View Site</a>
                      <a id="products" title="View all products" href="/admin/products"></i> Products</a>
                      <a title="Sign Out" href="/signout"><i class="fas fa-sign-out-alt"></i></a>
                      <span id="first-name" title="You're currently signed in" style="padding-right:20px"><i class="far fa-user"></i> ${fName}</span>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </header>
          <div class="container">
            ${content}
          </div>
        </body>
      </html>
    `;
};
