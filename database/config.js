const mongoose = require('mongoose');

const dbConnection = async () => {
    try {

        await mongoose.connect(process.env.DBCONN);

        console.log('estamos conectados');

    } catch (error) {

        console.log('no estamos conectados');

        throw new Error('error en conexion db');
    }
}

module.exports = {
    dbConnection
}