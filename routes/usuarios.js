const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const {validarCampos} = require('../middlewares/validar-campos');

const router = Router();


router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/',[
    check("nombre", "el nombre no es valido").not().isEmpty(),
    check("correo", "el correo no es valido").isEmail(),
    check("password", "el password no es valido").isLength({min:6}),
    check("rol", "no es correo no es valido").isEmail()
],validarCampos,usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);


module.exports = router; 