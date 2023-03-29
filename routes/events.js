const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEvents, crearEvento, actualizarEvento, eliminarEvento } = require ('../controllers/events');

const router = Router();

router.use( validarJWT );

router.get('/', validarJWT, getEvents);

router.post('/', [
     check('title', 'El titulo es obligatorio').not().isEmpty(),
     check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
     check('end', 'Fecha de inicio es obligatoria').custom( isDate ),
     validarCampos
], crearEvento);

router.put('/:id', validarJWT, actualizarEvento);

router.delete('/:id', validarJWT, eliminarEvento);

module.exports = router;