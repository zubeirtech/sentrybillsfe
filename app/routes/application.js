import Route from '@ember/routing/route';
// import { inject as service } from '@ember/service'
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin,{
  // currentUser: service('current-user'),
  // session: service(),

  //   beforeModel() {
  //       return this._loadCurrentUser();
  //   },
  
  //   sessionAuthenticated() {
  //     this._super(...arguments);
  //     this._loadCurrentUser();
  //   },
  
  //   _loadCurrentUser() {
  //     return this.get('currentUser').load().catch(() => this.get('session').invalidate());
  //   },
});
