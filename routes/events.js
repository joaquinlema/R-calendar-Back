/*
rutas de events
corresponde a ./api/events
*/

const express = require('express');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validarJWT');
const { events } = require('../models/Usuario');
const router = express.Router();

//indicamos que necesita validar el token en las peticiones
router.use(validarJWT);

router.get('/', getEvents);

router.post('/', createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;