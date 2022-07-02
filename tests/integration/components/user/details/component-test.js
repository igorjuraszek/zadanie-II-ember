import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { faker } from '@faker-js/faker';

module('Integration | Component | user/details', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    faker.setLocale('pl');
    const user = {
      id: '1',
      username: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      photoURL: faker.image.avatar(),
    };
    this.set('user', user);
    await render(hbs`<User::Details @user={{this.user}}/>`);

    assert.dom('[data-test-id]').hasText(user.id);
    assert.dom('[data-test-username]').hasText(user.username);
    assert.dom('[data-test-email]').hasText(user.email);
    assert.dom('[data-test-password]').hasText(user.password);
  });
});
