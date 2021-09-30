const layout = require('./auth-layout');
const { getError } = require('../../helpers');

module.exports = ({ req, errors }) => {
   return layout({
      pageTitle: 'Sign Up',
      content: `
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-one-quarter">
            <form method="POST">
              <h1 class="title">Sign Up</h1>
              <div class="field">
                <label class="label">First Name</label>
                <input required class="input" placeholder="first name" name="fName" />
                <p class="help is-danger">${getError(errors, 'fName')}</p>
              </div>
              <div class="field">
                <label class="label">Email</label>
                <input required class="input" placeholder="Email" name="email" />
                <p class="help is-danger">${getError(errors, 'email')}</p>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <input required class="input" placeholder="Password" name="password" type="password" />
                <p class="help is-danger">${getError(errors, 'password')}</p>
              </div>
              <div class="field">
                <label class="label">Password Confirmation</label>
                <input required class="input" placeholder="Password Confirmation" name="passwordConfirmation" type="password" />
                <p class="help is-danger">${getError(
                   errors,
                   'passwordConfirmation'
                )}</p>
              </div>
              <div class="register"><br>
                <button class="button is-primary">Register</button>
              </div>
            </form>
            <div class="msg"><br>
              <a href="/signin">Have an account? Sign In</a>
            </div>
          </div>
        </div>
      </div>
    `
   });
};
