const Usuario = require("../models/usuario")
const bcryptjs = require("bcrypt");

const usuariosGet = async(req, res ) => {
    const {limite=5, desde=1} = req.query
          const usuarios = await Usuario.find()
            .limit(Number(limite))
            .skip(Number(desde))
        res.json({
            usuarios
        });
}

const usuariosPut = async(req, res) => {
    const {id} = req.params;
    const { _id, password, google, correo, ...resto} = req.body;

    // Todo validar contra la base de datos
    if (password) {
         //encriptar la contraseña 
         const salt = bcryptjs.genSaltSync(10);
         resto.password = bcryptjs.hashSync(password, salt);
    }       // busca el usuario y se puede actualizar
         const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json({
        msg: "put api",
        usuario
    })
}

const usuariosPost = async (req, res) => {

    // obtenemos la request
    const {nombre,correo,password,rol} = req.body; /* podempos destructurar para solo obtener las propiedades que queramos { nombre, edad } */
    const usuario = new Usuario({nombre,correo,password,rol});
    
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