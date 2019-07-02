import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('bills', function() {
    this.route('new');
    this.route('edit', { path: ':bills_id/edit'});
  });
  this.route('login');
  this.route('register');
  this.route('terms-and-condition');
});

export default Router;
