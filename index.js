const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

//INFO: crear servidor express
const app = express();

//INFO: conectamos a la base de mongo
dbConnection();

//INFO: cors connection
app.use(cors());

//INFO: directiorio publico
// use vendria a ser un middleware para cada consulta
app.use(express.static('public'));

//INFO: lectura y parseo del body
app.use(express.json());

//INFO: rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//INFO: escuchar peticiones
app.listen(process.env.PORT , () => {
    console.log(`SErvidor corriendo en puerto ${process.env.PORT}`)
})