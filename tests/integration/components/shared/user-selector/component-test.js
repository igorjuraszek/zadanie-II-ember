import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, findAll } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | shared/user-selector', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    this.set('selectedAuthors', [{ username: 'Jacek' }]);
    this.set('options', [{ username: 'Jacek' }, { username: 'Przemek' }]);
    this.set('chooseAuthors', () => {});
  });

  test('it renders', async function (assert) {
    await render(hbs`
    <Shared::UserSelector
      @options={{this.options}}
      @multipleType={{true}}
      @selected={{this.selectedAuthors}}
      @onChange={{this.chooseAuthors}}
    />`);

    assert.dom('.ember-power-select-multiple-option').exists();
  });

  test('display initial user', async function (assert) {
    await render(hbs`
    <Shared::UserSelector
      @options={{this.options}}
      @multipleType={{true}}
      @selected={{this.selectedAuthors}}
      @onChange={{this.chooseAuthors}}
    />`);

    assert.dom('.ember-power-select-multiple-option').includesText('Jacek');
  });

  test('display initial options', async function (assert) {
    await render(hbs`
    <Shared::UserSelector
      @options={{this.options}}
      @multipleType={{true}}
      @selected={{this.selectedAuthors}}
      @onChange={{this.chooseAuthors}}
    />`);

    await click('.ember-basic-dropdown-trigger');

    const optionElements = findAll('.ember-power-select-options li');
    assert.dom(optionElements[0]).hasText('Jacek');
    assert.dom(optionElements[1]).hasText('Przemek');
  });
});
