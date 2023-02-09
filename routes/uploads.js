

const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, updateImg } = require('../controllers/uploads');
const {validarCampos} = require("../middlewares/validar-campos");

const router = Router();

router.post( "/", cargarArchivo)
router.put('/:coleccion/:id',updateImg)


module.exports = router;