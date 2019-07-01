import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    total: DS.attr('number', { defaultValue: 0 }),
    due: DS.attr('string'),
    note: DS.attr('string'),
    addToCal: DS.attr('boolean', { defaultValue: false }),
    balanced: DS.attr('boolean', { defaultValue: false }),
    userId: DS.attr('string'),
});
