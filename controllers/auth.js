const express = require('express');

const crearUsuario = (req,res = express.response) => {

    const {name, email, password} = req.body;

    res.json(
        {
            "ok":true,
            name,
            email,
            password
        }
    );
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

