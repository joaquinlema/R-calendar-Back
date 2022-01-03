const express = require('express');

const createEvent = (req, res = express.response) => {

    res.json({
        "ok": true,
        "msg": 'Evento creado'
    });
}

const updateEvent = (req, res = express.response) => {

    res.json({
        "ok": true,
        "msg": 'Evento actualizado'
    });
}

const deleteEvent = (req, res = express.response) => {

    res.json({
        "ok": true,
        "msg": 'Evento eliminado'
    });
}

const getEvents = (req, res = express.response) => {

    res.json({
        "ok": true,
        "msg": 'Eventos retornados'
    });
}

module.exports = {
    createEvent,
    updateEvent,
    deleteEvent,
    getEvents
}