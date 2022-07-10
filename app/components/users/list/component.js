import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class UserListComponent extends Component {
  @service store;

  constructor() {
    super(...arguments);

    this.store
      .query('user', { where: { username: 'user' } })
      .then((response) => {
        console.log(response);
      });
  }
}
