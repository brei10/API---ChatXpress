
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
        emun: ["ADMIN_ROLE","USER_ROLE"]
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    }
})


module.exports = model('Usuario', UsuarioSchema)
