const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const eventsSchema = new Schema({
    title: {
        type: String,
    },
    notes: {
        type: String
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
    const { __v: version, _id: idEvent, ...rest } = this.toObject();
    rest.id = idEvent;

    const { __v: versionUser, _id: idUser, password, email, ...other } = rest.user;
    rest.user = other;
    rest.user.id = idUser;

    return rest;
})

module.exports = model('Events', eventsSchema);