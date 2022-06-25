import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class SharedUserSelectorComponent extends Component {
  @service store;

  constructor() {
    super(...arguments);
    this.options = this.args.options || this.store.findAll('user');
  }
}
