const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const eventsSchema = new Schema({
    title: {
        String,
    },
    notes: {
        String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

eventsSchema.method('toJSON', function () {
    const { __v, _id, ...rest } = this.toObject();
    rest.id = _id;
    return rest;
})

module.exports = model('Events', eventsSchema);