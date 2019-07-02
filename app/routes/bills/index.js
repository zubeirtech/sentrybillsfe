import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
    session: service(),
    toastr: service('toast'),
    totalNum: 0,

    model() {
        try {
            return this.store.query('bill', { userId: this.session.data.authenticated.access_token });
        } catch (error) {
            console.log(error);
        }
    },
});