import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    session: service(),
    toastr: service('toast'),
    userHasEnteredData: true,

    model() {
        let userId = this.session.data.authenticated.access_token;
        return this.store.createRecord('bill', {
            userId
        })
    },

    actions: {
        willTransition(transition) {
          if (this.userHasEnteredData && !window.confirm('By leaving the form you are deleting changes, are you sure?')) {
            transition.abort();
          } else {
            this.toastr.warning('Deleted form date', 'Warning!');
            window.location.href = '/bills';
            return true;
          }
        }
    }
});
