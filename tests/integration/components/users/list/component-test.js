import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | users/list', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it renders', async function (assert) {
    const users = this.server.createList('user', 20);
    this.set('users', users);
    await render(hbs`<Users::List @users={{this.users}}/>`);

    users.map((user, index) => {
      assert.dom(`[data-test-id="${index}"]`).hasText(user.id);
      assert.dom(`[data-test-username="${index}"]`).hasText(user.username);
      assert.dom(`[data-test-email="${index}"]`).hasText(user.email);
      assert.dom(`[data-test-password="${index}"]`).hasText(user.password);
    });
  });
});
