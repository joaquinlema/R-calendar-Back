const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const usuarioSchema = new Schema({
    name: {
        type: String,
        require: true
    }, // String is shorthand for {type: String}
    email: {
        type: String,
        require: true,
        unique: true
    }, // String is shorthand for {type: String}
    password: {
        type: String,
        require: true
    }, // String is shorthand for {type: String}
});

module.exports = model('Usuario', usuarioSchema);