/*
rutas de auth
corresponde a ./api/auth
*/

const express = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, renovarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validarJWT');
const { validarCampos } = require('../middlewares/validarCampos');
const router = express.Router();
// router.post('/auth', loginUsuario);

//INFO: puedo pasar el middleware para validar por jeempo entre []
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({ min: 6 }),
    validarCampos
], loginUsuario);

router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({ min: 6 }),
    validarCampos
], crearUsuario);

router.get('/renew', [
    validarJWT
], renovarToken);

module.exports = router;