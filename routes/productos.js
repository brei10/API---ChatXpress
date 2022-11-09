const { Router, response } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, actualizarProducto,borrarProducto,obtenerProducto } = require('../controllers/productos');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');
const {validarCampos} = require("../middlewares/validar-campos");
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');


const router = Router();

// obtener todas las categorias - publico
router.get('/',obtenerProductos);

// obtener una categoria por id - publico
router.get('/:id', [
    check("id", "no es un id de mongo valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos
], obtenerProducto);

// crear categoria - privado - cualquier person con token valido
router.post('/',[validarJWT,
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("categoria", "no es un id de Mongo").isMongoId(),
    check("categoria").custom(existeCategoriaPorId),
    validarCampos],
    crearProducto);

// crear actualizar categoria
router.put('/:id',[
    validarJWT,
   /*  check("categoria", "no es un id de Mongo").isMongoId(), */
    check("id").custom(existeProductoPorId),
    validarCampos
], actualizarProducto);

//  borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check("id", "no es un id de mongo valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
],borrarProducto);



module.exports = router