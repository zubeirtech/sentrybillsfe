import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    media: service(),
    session: service(),
    deleteConfirm: false, 
    toastr: service('toast'),

    actions: {
        invalidateSession() {
            this.get('session').invalidate();
        },
        async confirmDelete() {
            try {
                let id =  this.session.data.authenticated.access_token;
                let user = await this.store.queryRecord('user', { id });
                await user.destroyRecord();
                this.get('session').invalidate();
                this.toastr.info('Account is successfully deleted', 'Info')
            } catch (error) {
                console.log(error);
            }
        }
    }
});
