import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { set } from '@ember/object';

export default Route.extend(AuthenticatedRouteMixin, {
    session: service(),
    toastr: service('toast'),

    model() {
        try {
            return this.store.query('bill', { userId: this.session.data.authenticated.access_token });
        } catch (error) {
            console.log(error);
        }
    },

    afterModel(model) {
        if (model.length === 0) {
            this.toastr.info('No bills are existing, add new', 'Clear!')
        }
        if (model.balanced) {
            set(this, 'color', 'green');
        } else {
            set(this, 'color', 'green');
        }
        // progress
        const filteredBalanced = model.filter(bill => bill.balanced);
        const num = filteredBalanced.length / model.length * 100;
        set(this, 'percentage', num);

        // total
        let sum = 0;
        model.forEach(bill => {
            sum += bill.total;
        });

        set(this, 'total', sum);

        //next due 
        const dates = model.filter(bill => bill.due);
        dates.sort((a, b) => a - b);
        let cDate = dates[0];
        let cBill = model.find(element => {
            return cDate === element.due;
        })
        set(this, 'closestBill', cBill);
    }
});