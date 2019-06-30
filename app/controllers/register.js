import Controller from '@ember/controller';
import { inject as service } from '@ember/service'
import { set } from '@ember/object';

export default Controller.extend({
    toastr: service('toast'),
    session: service(),

    valid(email, password) {
        if(email === undefined){
            return false
        }
        if (email === "") {
            return false
        }
        if (password === undefined) {
            return false
        }
        if (password === "") {
            return false
        }
        return true
    },

    actions: {
        async register() {
            const val = this.valid(this.model.email, this.model.password);
            if (val) {
                if (this.secondPassword === this.model.password) {
                    try {
                        await this.model.save()
                        let { email, password } = this.model;
                        this.get('session').authenticate('authenticator:oauth2', email, password).catch((reason) => {
                          this.set('errorMessage', reason.error || reason);
                        });
                        this.toastr.success('Successfully added new user', 'Nice!');
                    } catch (error) {
                        console.log(error);
                        this.toastr.error('Please use different Email', 'Email already exists!');
                        set(this.model, 'password', '');
                        set(this, 'secondPassword', '');
                    }

                } else {
                    this.toastr.error('Passwords dont match', 'Error')
                }
            } else {
                this.toastr.error('Please fill in a fields', 'Error');
            }
        }
    }
});
