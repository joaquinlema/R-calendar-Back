const { response } = require('express');
const jwt = require('jsonwebtoken');

const renovarJWT = (req, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'NO existe el token'
        });
    }

    try {

        const { uid, name } = jwt.verify(
            token,
            process.env.WEBSECRETKEY
        );

        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token invalido'
        });
    }

    next();
}

module.exports = {
    renovarJWT
}