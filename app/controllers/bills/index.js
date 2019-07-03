import Controller from '@ember/controller';
import { set } from '@ember/object';
// import nearest from 'nearest-date';
import { inject as service } from '@ember/service';

export default Controller.extend({
    toastr: service('toast'),
    session: service(),
    totalNum: 0,
    setProgressAndFinished(model) {
        let inc = 0;
        model.forEach(element => {
            if(element.balanced) {
                inc++;
            }
        });
        const num = inc / model.length * 100;
        set(this, 'percentage', num);
        set(this, 'balanced', inc);
    },

    setup(model) {

        if (model.length === 0) {
            this.toastr.info('No bills are existing, add new', 'Clear!')
        }
        if (model.balanced) {
            set(this, 'color', 'green');
        } else {
            set(this, 'color', 'green');
        }
        // progress
        this.setProgressAndFinished(model);

        //total
        let sum = 0;
        model.forEach(bill => {
            sum += bill.total;
        });

        set(this, 'totalNum', sum);

        //next due
        // let datesArr = [];
        // model.forEach(doc => {
        //     console.log
        //     datesArr.pushObject(doc.due);
        // });
        // let closestIndex = nearest(datesArr, Date.now());
        // console.log(closestIndex);
    },

    actions: {

        async setToBalanced(model) {
            try {
                set(model, 'balanced', true);
                model.save();
                this.setProgressAndFinished(this.model);
                this.toastr.success('Bill is balanced', 'Nice!')
            } catch (error) {
                console.log(error);
            }    
        },
        async deleteBill(bill) {
            try {
                await bill.destroyRecord();
                this.setProgressAndFinished(this.model);
                this.toastr.success('Bill is deleted', 'Nice!')
            } catch (error) {
                console.log(error);
            }
        },
        async query() {
            try {
                let bills = await this.store.query('bill', { name: this.params, userId: this.session.data.authenticated.access_token });
                set(this, 'model', bills);
            } catch (error) {
                console.log(error);
            }
        }
    }
});
