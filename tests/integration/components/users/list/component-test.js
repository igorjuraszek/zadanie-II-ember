import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | users/list', function (hooks) {
  setupRenderingTest(hooks);

  test.skip('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Users::List />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <Users::List>
        template block text
      </Users::List>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
