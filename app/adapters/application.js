import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
    host: 'http://sentrybillsapi.herokuapp.com',
    // urlForQueryRecord(query) {
    //     if (query.me) {
    //       delete query.me;
    //       return `${this._super(...arguments)}/me`;
    //     }
    //     return this._super(...arguments);

    // }
});
