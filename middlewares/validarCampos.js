const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {

    //errores
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        })
    }
    //INFO: lo llamamos cuando sale todo ok !!!
    next();
}

module.exports = {
    validarCampos
}