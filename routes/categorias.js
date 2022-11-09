const { Router, response } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria,borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const {validarCampos} = require("../middlewares/validar-campos");
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');


const router = Router();

// obtener todas las categorias - publico
router.get('/',obtenerCategorias);

// obtener una categoria por id - publico
router.get('/:id', [
    check("id", "no es un id de mongo valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria);

// crear categoria - privado - cualquier person con token valido
router.post('/',[validarJWT,
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    validarCampos],
    crearCategoria);

// crear actualizar categoria
router.put('/:id',[
    validarJWT,
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("id").custom(existeCategoriaPorId),
    validarCampos
], actualizarCategoria);

//  borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check("id", "no es un id de mongo valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
],borrarCategoria);



module.exports = router