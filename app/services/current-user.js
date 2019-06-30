import Service from '@ember/service';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Service.extend({
    session: service(),
    store: service(),

    load() {
      console.log(this.get('session.isAuthenticated'));
      if (this.get('session.isAuthenticated')) {
        return this.get('store').queryRecord('user', { me: true }).then((user) => {
          console.log('user: ', user );
          this.set('user', user);
        });
      } else {
        return RSVP.resolve();
      }
    }
});
