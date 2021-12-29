const express = require('express');
const Usuario = require('../models/Usuario');

const crearUsuario = async (req, res = express.response) => {

    // const {name, email, password} = req.body;

    try {

        const usuario = new Usuario(req.body);

        await usuario.save();

        res.status(201).json(
            {
                "ok": true,
                "msg": "Usuario creado exitosamente"
            }
        );

    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                "ok": false,
                "msg": "Error al cargar usuario comuniquese con el admin"
            }
        );
    }

};

const loginUsuario = (req, res = express.response) => {

    const { email, password } = req.body;

    //TIP: se reemplaza por el middleware de validacion
    // //errores
    // const errores = validationResult(req);

    // if (!errores.isEmpty()) {
    //     return res.status(400).json({
    //         ok: false,
    //         errors: errores.mapped()
    //     })
    // }

    res.json(
        {
            "ok": true,
            email,
            password
        }
    );
}

const renovarToken = (req,res = express.response) => {

    res.json({
        "ok": true
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    renovarToken
}

