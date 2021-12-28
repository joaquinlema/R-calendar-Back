const express = require('express');
require('dotenv').config();

console.log(process.env);

//INFO: crear servidor express
const app = express();

//INFO: directiorio publico
// use vendria a ser un middleware para cada consulta
app.use(express.static('public'));

//INFO: lectura y parseo del body
app.use(express.json());

//INFO: rutas
app.use('/api/auth', require('./routes/auth'));
// app.get('/', (req,res) => {
//     console.log('se requiere el /');

//     //INFO: forma de devolver ante esta ruta
//     res.json({
//         "ok": true
//     });
// });

//INFO: escuchar peticiones
app.listen(process.env.PORT , () => {
    console.log(`SErvidor corriendo en puerto ${process.env.PORT}`)
})