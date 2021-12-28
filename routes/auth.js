/*
rutas de auth
corresponde a ./api/auth
*/

const express = require('express');
const { crearUsuario, loginUsuario, renovarToken } = require('../controllers/auth');
const router = express.Router();

router.get('/', loginUsuario);

router.post('/new', crearUsuario);

// router.post('/auth', loginUsuario);
  
router.get('/renew', renovarToken);

module.exports = router;