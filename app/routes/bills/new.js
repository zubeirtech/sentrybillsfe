import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    session: service(),
    toastr: service('toast'),

    model() {
        let userId = this.session.data.authenticated.access_token;
        return this.store.createRecord('bill', {
            userId
        })
    },
});
