import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | bills/new', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:bills/new');
    assert.ok(route);
  });
});
