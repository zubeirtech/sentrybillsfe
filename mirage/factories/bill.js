import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
    name() {
        return faker.company.companyName();
    },
    total() {
        return faker.commerce.price();
    },
    due() {
        return faker.date.future();
    },
    addToCal(){
        return false;
    },
    balanced() {
        return faker.random.boolean()
    }
});
