import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
    host: 'http://localhost:3000',
    // urlForQueryRecord(query) {
    //     if (query.me) {
    //       delete query.me;
    //       return `${this._super(...arguments)}/me`;
    //     }
    //     return this._super(...arguments);

    // }
});
