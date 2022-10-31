
const Usuario = require("../models/usuario")
const bcryptjs = require("bcrypt");

const usuariosGet = (req, res ) => {
    /* espress nos parsesa los datos de la url que tiene caracteres */
    /* podemos darle valores por defecto cuando destructuramos */
    const query = req.query;
    res.json({
        msg: "get api - contralador",
        query
    });
}

const usuariosPut = (req, res) => {
    /* /:id   */
    const {id} = req.params;
    res.json({
        msg: "put api",
        id
    });
}

const usuariosPost = async (req, res) => {

    // obtenemos la request
    const {nombre,correo,password,rol} = req.body; /* podempos destructurar para solo obtener las propiedades que queramos { nombre, edad } */
    const usuario = new Usuario({nombre,correo,password,rol});
    //verificar si  el correo existe
    const existeEmail = await Usuario.findOne({correo:correo})
    if (existeEmail){
        return res.status(400).json({
            msg: "ese correo ya se encuentra en uso"
        })
    }
    //encriptar la contraseña 
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);
    // guardarDB
    await usuario.save()

    res.json({
        // nuestras respuestas...
        msg: "post api",
        usuario
    });
}

const usuariosDelete = (req, res) => {
    res.json({
        msg: "delete api"
    });
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: "patch api"
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}