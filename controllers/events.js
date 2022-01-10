const express = require('express');
const Events = require('../models/Events');

const createEvent = async (req, res = express.response) => {

    const eventNew = new Events(req.body);

    try {

        eventNew.user = req.uid;

        let eventSave = await eventNew.save();
        eventSave = await Events.populate(eventSave, { path: "user" });

        res.json({
            "ok": true,
            "msg": 'Evento creado',
            eventSave
        });

    } catch (error) {
        res.status(500).json({
            "ok": false,
            "msg": `Error al crear ${error}`
        });
    }

}

const updateEvent = async (req, res = express.response) => {

    const eventId = req.params.id;
    const uid = req.uid;
    try {
        const evento = await Events.findById(eventId);

        if (!evento) {
            res.status(404).json({
                "ok": false,
                "msg": "No existe el evento a actualizar"
            });
        }

        if (evento.user.toString() !== uid) {
            res.status(401).json({
                "ok": false,
                "msg": "No tiene acceso suficiente"
            });
        }

        const eventoNuevo = { ...req.body, user: uid }

        const eventoActualizado = await Events.findByIdAndUpdate(eventId, eventoNuevo, { new: true });

        res.json({
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
}

const deleteEvent = async (req, res = express.response) => {

    const eventId = req.params.id;
    const uid = req.uid;
    try {
        const evento = await Events.findById(eventId);

        if (!evento) {
            return res.status(404).json({
                "ok": false,
                "msg": "No existe el evento a eliminar o ha sido eliminado"
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                "ok": false,
                "msg": "No tiene acceso suficiente"
            });
        }

        const eventoEliminado = await Events.findByIdAndDelete(eventId);

        res.json({
            "ok": true,
            "msg": "Elemento eliminado",
            eventoEliminado
        });

    } catch (error) {
        res.status(500).json({
            "ok": false,
            "msg": "Error al actualizar"
        });
    }
}

const getEvents = async (req, res = express.response) => {

    try {
        const eventsAll = await Events.find().populate('user', 'name _id');

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