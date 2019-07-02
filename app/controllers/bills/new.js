import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Controller.extend({
    session: service(),
    toastr: service('toast'),

    valid(name, total) {
        if(name === undefined){
            return false
        }
        if (name === "") {
            return false
        }
        if (total === undefined) {
            return false
        }
        if (total === "") {
            return false
        }
        if (total <= 0) {
            return false
        }
        return true
    },
    
    actions: {
        async new() {
            try {
                if(this.valid(this.model.name, this.model.total)){
                    let d = new Date();
                    let currDate = d.toISOString();
                    if(currDate < this.model.due || this.model.due === undefined) {
                        await this.model.save();
                        this.toastr.success('Added new Bill', 'Success!');
                        set(this, 'confirm', true);
                        this.transitionToRoute('/bills');
                    } else {
                        this.toastr.error('Date is in the past' ,'Please use future')
                    }
                } else {
                    this.toastr.error('Please fill in correct values', 'Warning!')
                }
            } catch (error) {
                console.log(error);
            }
        }
    }    
});
