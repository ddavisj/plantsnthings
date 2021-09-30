// Contact Us Template

const layout = require('../layout');

// const send = require('./send');

const { getError } = require('../helpers');

module.exports = ({ cartItemsExist, errors, confMsg }) => {
   let formContent;
   if (!confMsg) {
      formContent = `
        <div id="page-content">
        <p>Fill in your details and send us a message and we'll get back to you as soon as possible<br><br></p>
        <form method="POST">
            <div class="field">
                <label class="label">Name</label>
                <input class="input" placeholder="Name" name="name">
                <p class="help is-danger">${getError(errors, 'name')}</p>
            </div>
            <div class="field">
                <label class="label">Phone Number</label>
                <input class="input" placeholder="Phone Number" name="phone">
                <p class="help is-danger">${getError(errors, 'phone')}</p>
            </div>
            <div class="field">
                <label class="label">Message</label>
                <input type="text" class="input" placeholder="Message" name="message">
                <p class="help is-danger">${getError(errors, 'message')}</p>
            </div>
            <button class="button is-primary">Send</button>
        </form>
      </div>
      `;
   } else {
      formContent = confMsg;
   }

   const baseTemplate = `
   <div id="contact-us">
        <section>
        <div class="container">
        <div class="columns">
        <div class="column "></div>
        <div class="column is-four-fifths">
        <div>
        <h2 class="title text-center">Email Us</h2>
        ${formContent}

                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
    <style>/*.footer {bottom: 0;position: fixed;width: 100%;}*/
    .footer {display:none}      
    
    button#contact {
      background-color: black;
    }
    #contact a {
      color: white !important;
    }
    a#contact {color: black}
    </style>
        `;

   //    console.log(baseTemplate);

   return layout({
      pageTitle: 'Email Us | ',
      cartItemsExist,
      content: baseTemplate
   });
};
