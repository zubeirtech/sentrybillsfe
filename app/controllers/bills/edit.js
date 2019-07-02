import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    toastr: service('toast'),

    actions: {

        editBill() {
            this.model.save();
            this.transitionToRoute('/bills');
            this.toastr.success('Successfully edited Bill', 'Nice!')
        }
    }

});
