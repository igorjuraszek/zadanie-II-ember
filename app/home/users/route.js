import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class UsersRoute extends Route {
  @service store;

  async model() {
    console.log('start');
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log('dupa');
        resolve();
      }, 2000);
    });
    const users = this.store.findAll('user');
    return users;
  }
}
