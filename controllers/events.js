const express = require('express');
const Events = require('../models/Events');

const createEvent = async (req, res = express.response) => {

    const eventNew = new Events(req.body);

    try {

        eventNew.user = req.uid;

        const eventSave = await eventNew.save();

        res.json({
            "ok": true,
            "msg": 'Evento creado',
            eventSave
        });

    } catch (error) {
        res.status(500).json({
            "ok": false,
            "msg": 'Error al crear'
        });
    }

}

const updateEvent = async (req, res = express.response) => {

    const eventId = req.params.id;
    const uid = req.uid;
    try {
        const evento = await Events.findById(eventId);

        if (!evento) {
            return res.status(404).json({
                "ok": false,
                "msg": "No existe el evento a actualizar"
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                "ok": false,
                "msg": "No tiene acceso suficiente"
            });
        }

        const eventoNuevo = { ...req.body, user: uid }

        const eventoActualizado = await Events.findByIdAndUpdate(eventId, eventoNuevo, { new: true });

        return res.json({
            "ok": true,
            "msg": "Elemento actualizado 2",
            eventoActualizado
        });

    } catch (error) {
        res.status(500).json({
            "ok": false,
            "msg": "Error al actualizar"
        });
    }

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

const getEvents = async (req, res = express.response) => {

    try {
        const eventsAll = await Events.find().populate('user');

        return res.json({
            "ok": true,
            "msg": 'Eventos retornados',
            eventsAll
        });

    } catch (error) {

        return res.status(500).json({
            "ok": false,
            "msg": 'Error Eventos retornados'
        });
    }
}

module.exports = {
    createEvent,
    updateEvent,
    deleteEvent,
    getEvents
}