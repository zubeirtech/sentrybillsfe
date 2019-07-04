import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Controller.extend({
    session: service(),
    toastr: service('toast'),
    loader: false,

  actions: {
    authenticate() {
      set(this, 'loader', true);
      let { identification, password } = this.getProperties('identification', 'password');
      this.get('session').authenticate('authenticator:oauth2', identification, password).catch((reason) => {
        this.set('errorMessage', reason.error || reason);
        this.toastr.error('Password or email is wrong', 'Try again!');
        set(this, 'loader', false)
      });
    }
  }
});
