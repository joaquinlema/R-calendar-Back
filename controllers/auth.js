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

    res.json({
        "ok": true
    });
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

