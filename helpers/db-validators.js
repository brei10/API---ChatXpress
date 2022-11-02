

const Role = require("../models/role")
const Usuario = require("../models/usuario")

const esRolValido =  async(rol="") => {
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error(`el ${rol} no esta registrado`)
    }
}

const emailExiste = async( correo  ="" ) => {
          //verificar si  el correo existe
    const existeEmail = await Usuario.findOne({correo:correo})
    if (existeEmail){
        throw new Error(`el correo: ${correo} se encuentra ya registrado`)
    }
}

const existeUsuarioPorId  = async( id ) => {
    //verificar si  el correo existe
const existeUsuario = await Usuario.findById(id);
if (!existeUsuario){
  throw new Error(`el id: ${id} no existe`)
}
}


module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}