const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const {validarCampos} = require('../middlewares/validar-campos');

const router = Router();


router.get('/', usuariosGet);

router.put('/:id', [
    check("id", "no es un ID valido..").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos
    
], usuariosPut);

router.post('/',[
    // CHECK CON EXPRESS VALIDATOR
    check("nombre", "el nombre no es valido").not().isEmpty(),
    check("correo", "el correo no es valido").isEmail(),
    check("correo").custom( (email) => emailExiste(email) ),
    check("password", "el password no es valido").isLength({min:6}),
    /* check("rol", "no es ROL valido").isIn(["ADMIN_ROLE", "USER_ROLE"]) */
    check("rol").custom( (rol) => esRolValido(rol)),
    validarCampos
], usuariosPost );

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);


module.exports = router; 