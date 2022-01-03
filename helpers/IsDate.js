const moment = require('moment');

const isDate = (value) => {

    if (!value) {
        return false;
    }

    let fecha = moment(value);

    if (fecha.isValid()) {
        return true
    }

    return false;
}

module.exports = { isDate }