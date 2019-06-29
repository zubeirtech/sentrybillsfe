import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    media: service(),
    session: service(),

    actions: {
        invalidateSession() {
            this.get('session').invalidate();
        }
    }
});
