import Controller from '@ember/controller';
import { set } from '@ember/object';
import nearest from 'nearest-date';

export default Controller.extend({
    totalNum: 0,

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
        let inc = 0;
        model.forEach(element => {
            if(element.balanced) {
                set(this, 'inc', inc+1);
            }
        });
        const num = inc / model.length * 100;
        set(this, 'percentage', num);
        set(this, 'balanced', inc);

        let sum = 0;
        model.forEach(bill => {
            sum += bill.total;
        });

        set(this, 'totalNum', sum);

        //next due
        let datesArr = [];
        model.forEach(doc => {
            console.log
            datesArr.pushObject(doc.due);
        });
        let closestIndex = nearest(datesArr, Date.now());
        console.log(closestIndex);
    },

    actions: {

        async setToBalanced(model) {
            try {
                set(model, 'balanced', true);
                model.save();
            } catch (error) {
                console.log(error);
            }    
        }
    }
});
