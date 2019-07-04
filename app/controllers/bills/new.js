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
                        if (this.model.addToCal) {
                                let result = await Notification.requestPermission();
                                if (result === 'denied') {
                                    this.toastr.info('Notification is disabled', 'Info');
                                    await this.model.save();
                                    this.toastr.success('Added new Bill', 'Success!');
                                    set(this, 'confirm', true);
                                    this.transitionToRoute('/bills');
                                }
                                if ( result === 'default') {
                                    await this.model.save();
                                    this.toastr.success('Added new Bill', 'Success!');
                                    set(this, 'confirm', true);
                                    this.transitionToRoute('/bills');
                                }
                                if (result === 'granted') {
                                    let options = {
                                        body: `${this.model.name} Bill is due. The total is ${this.model.total}`,
                                        timestamp: this.model.due,
                                        //ICON
                                    }
                                    
                                    let d = Date.parse(this.model.due);
                                    let n = Date.now();
                                    let ms = d - n;
                                    setTimeout(() => {
                                        new Notification(`New Bill ${this.model.name} - Sentrybills Notification`, options);
                                    }, ms);
                                    await this.model.save();
                                    this.toastr.success('Added new Bill', 'Success!');
                                    set(this, 'confirm', true);
                                    this.transitionToRoute('/bills');
                                }
                                await this.model.save();
                                this.toastr.success('Added new Bill', 'Success!');
                                set(this, 'confirm', true);
                                this.transitionToRoute('/bills');
                        }
                        await this.model.save();
                        this.toastr.success('Added new Bill', 'Success!');
                        set(this, 'confirm', true);
                        this.transitionToRoute('/bills');
                    } else {
                        this.toastr.warning('Date is in the past or undefined' ,'Warning')
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
