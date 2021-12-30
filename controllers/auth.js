const bcrypt = require('bcryptjs/dist/bcrypt');
const express = require('express');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/Usuario');

const crearUsuario = async (req, res = express.response) => {

    const { name, email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json(
                {
                    "ok": false,
                    "msg": "Usuario con ese mail ya existe"
                }
            );

        }

        usuario = new Usuario(req.body);

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const token = await generarJWT(usuario._id, usuario.name);

        res.status(201).json(
            {
                "ok": true,
                "msg": "Usuario creado exitosamente",
                "uid": usuario._id,
                "name": usuario.name,
                token
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

const loginUsuario = async (req, res = express.response) => {

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json(
                {
                    "ok": false,
                    "msg": "Usuario ya existe"
                }
            );
        }

        const validarUsuario = bcrypt.compareSync(password, usuario.password);

        if (!validarUsuario) {
            return res.status(400).json(
                {
                    "ok": false,
                    "msg": "Usuario o contraseña invalida"
                }
            );
        }

        const token = await generarJWT(usuario._id, usuario.name);

        res.status(200).json(
            {
                "ok": true,
                "msg": "Usuario logeado exitosamente",
                "uid": usuario._id,
                "name": usuario.name,
                token
            }
        );

    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                "ok": false,
                "msg": "Error al logear usuario comuniquese con el admin"
            }
        );
    }

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

