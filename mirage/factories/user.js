import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
    email() {
        return 'some@mail.com'
    },
    password() {
        return 'fun'
    }
});
