/*
rutas de events
corresponde a ./api/events
*/

const express = require('express');
const { check } = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/IsDate');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');
const { events } = require('../models/Usuario');
const router = express.Router();

//indicamos que necesita validar el token en las peticiones
router.use(validarJWT);

router.get('/', getEvents);

router.post('/',
    check('title', 'El campo title es obligatorio').notEmpty(),
    check('start', 'El campo start debe ser fecha').custom(isDate),
    check('end', 'El campo end debe ser fecha').custom(isDate),
    validarCampos
    , createEvent);

router.put('/:id',
    check('title', 'El campo title es obligatorio').notEmpty(),
    check('start', 'El campo start debe ser fecha').custom(isDate),
    check('end', 'El campo end debe ser fecha').custom(isDate),
    validarCampos,
    updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;