module.exports = ({ content, cartItemsExist, templateCss, pageTitle }) => {
   const renderCartLink =
      cartItemsExist === true
         ? `<div class="navbar-item">
              <a id="cart" href="/cart"><i class="fa fa-shopping-cart"></i> Cart</a>
            </div>`
         : '';

   return `
      <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${pageTitle ? pageTitle : ''}Plants 'n Things</title>
        
          <link rel="icon" type="image/png" href="/favicon.ico"/>
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
          <link href="/css/main.css" rel="stylesheet">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"></link>
          
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
          <link rel="manifest" href="/site.webmanifest">
        </head>
  
        <body>
        <div id="user-template">
          <header>
            <nav class="navbar navbar-top">
              <div class="container navbar-container">
                <div>
                  <ul class="social">
                  <li>
                  <a href="tel:1300 555 987">
	                  <button class="nav-button">
		                  <i class="fa fa-phone"></i> 1300 555 987
	                  </button>
                  </a>  
                  </li>
                  <li>
                  <a href="/contact">
	                  <button id="contact" class="nav-button">
                      <i class="fa fa-envelope"></i> Email Us</a>
	                  </button>
                  </a> 
                  </li>
                  </ul>
                </div>
                <div>
                  <ul class="social icons">
                    <li><a href="#"><i class="fab fa-facebook"></i></a></li>
                    <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                    <li><a href="/admin/products"><i class="fas fa-lock"></i></a></li>                    
                  </ul>
                </div>
              </div>
            </nav>
            <section class="banner">
              <div class="container">
                <div class="columns is-centered">
                  <a href="/"><img src="/images/shop-banner.jpg" /></a>
                </div>
              </div>
            </section>
            <nav class="navbar navbar-bottom">
              <div class="container navbar-container">
                <div class="mob-social-links">
                  <div class="navbar-item">
                    <a href="#"><i class="fab fa-facebook"></i></a>
                  </div>
                  <div class="navbar-item">
                    <a href="#"><i class="fab fa-instagram"></i></a>
                  </div>
                  <div class="navbar-item">
                    <a href="/admin/products"><i class="fas fa-lock"></i></a>
                  </div>
                </div>
                <div class="navbar-item">
                  <div class="navbar-buttons">
                    <div class="navbar-item wide-only">
                      <a id="home" href="/"> Home</a>
                    </div>
                    <div class="navbar-item wide-only">
                      <a id="contact" href="/contact"> Email Us</a>
                    </div>
                    ${renderCartLink}
                  </div>
                </div>
              </div>
            </nav>
          </header>
  
          ${content}
          <footer class="footer">
            <div class="content has-text-centered">
              <p>
                <a id="EALink" href="https://eadigital.com.au" target="_blank">©2021 EA Digital</a>
              </p>
            </div>
          </footer>
        </body>
        </div>
      </html>
      <style>
        ${templateCss};
      </style>
    `;
};
