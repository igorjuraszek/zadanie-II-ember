import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Auth0Lock from 'auth0-lock';

const clientId = 'SyIKLli34MuM6SOOEdXx6ipBpZhB7QFj';
const domain = 'dev-fgbg5m7x.us.auth0.com';

export default class LoginController extends Controller {
  @service session;
  @service store;
  @tracked loginValue;
  @tracked passwordValue;

  @action
  onLoginChange(event) {
    this.loginValue = event.target.value;
  }

  @action
  onPasswordChange(event) {
    this.passwordValue = event.target.value;
  }

  @action
  async onSubmit(event) {
    event.preventDefault();
    const { loginValue, passwordValue } = this;
    await this.session.loginUser(loginValue, passwordValue);
  }

  @action
  async on0AuthLoginOrRegister() {
    console.log('logowanie');
    const options = { auth: { redirect: false } };
    const lock = new Auth0Lock(clientId, domain, options);
    lock.show({ allowedConnections: ['google-oauth2'] });

    lock.on('authenticated', (authResult) => {
      lock.getUserInfo(authResult.accessToken, async (error, profileResult) => {
        if (error) {
          console.log('error', error);
          return;
        }

        const accessToken = authResult.accessToken;
        const profile = profileResult;

        console.log('success', accessToken, profile);

        await this.session.loginOrRegisterBy0auth(profile);
      });
    });
  }
}
