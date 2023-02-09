
const {Schema, model} = require('mongoose');


const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true,"el nombre es requerido"]

    },
    correo: {
        type: String,
        required: [true,"el correo es requerido"],
        unique: true
    },
    password: {
        type: String,
        required: [true,"el password es requerido"],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        emun: ["ADMIN_ROLE","USER_ROLE"]
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
});

UsuarioSchema.methods.toJSON = function () {
    /* sacamos a pass y __v y lo demas lo asignamos a usuario */
    const {__v, password, ...usuario} = this.toObject();
    usuario.uid = usuario._id;
    delete usuario._id;
    
    return usuario;
}


module.exports = model('Usuario', UsuarioSchema)
