import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('user-dropdown', 'Integration | Component | user dropdown', {
  integration: true
});

const stubUser = Ember.Object.extend({
  id: 1,
  username: 'tester',
  photoThumbUrl: '/assets/images/twitter.png',

  atUsername: Ember.computed('username', function() {
    return `@${this.get('username')}`;
  }),

  twitterUrl: Ember.computed('twitter', function() {
    return `https://twitter.com/${this.get('twitter')}`;
  })
}).create();

test('it renders', function(assert) {
  assert.expect(1);
  this.set('user', stubUser);
  this.render(hbs`{{user-dropdown user=user}}`);

  assert.equal(this.$('.dropdown-menu').length, 1, 'The component renders');
});

test('it triggers the hide action when clicked', function(assert) {
  assert.expect(1);

  this.set('user', stubUser);
  this.on('hide', function() {
    assert.ok(true, 'It triggers the hide action when clicked');
  });
  this.render(hbs`{{user-dropdown user=user action='hide'}}`);
  this.$('.dropdown-menu').click();
});