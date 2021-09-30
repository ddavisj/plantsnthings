module.exports = ({ content, pageTitle }) => {
   return `
       <!DOCTYPE html>
         <html lang="en">
         <head>
           <meta charset="utf-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <title>${pageTitle} | Plants 'n Things</title>
           <link href="/css/main.css" rel="stylesheet"></link>
           <link href="/css/all.min.css" rel="stylesheet">
           <!-- <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet"> -->
           <link href="/css/bulma.min.css" rel="stylesheet">
           <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"></link> -->
           <style>
           .navbar-item a {
             padding-right: 20px;
           }
           </style>
         </head>
   
         <body class="admin">
           <header>
             <section id="admin-logo">
              <div>
                <img src="/images/pnt-logo.jpg" />
              </div>
             </section>
             <nav class="navbar navbar-bottom">
               <div class="container navbar-container">
                 <div>
                   <a href="/admin/products">
                     <h3 class="title"><i class="fas fa-lock"></i></h3>
                   </a>
                 </div>
                 <div class="navbar-item">
                   <div class="navbar-buttons">
                     <div class="navbar-item">
                       <a href="/"> Home</a>
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
