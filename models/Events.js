const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const eventsSchema = new Schema({
    title: {
        String,
        require: true
    },
    notes: {
        String
    },
    start: {
        type: Date,
        require: true
    },
    end: {
        type: Date,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

module.exports = model('Events', eventsSchema);