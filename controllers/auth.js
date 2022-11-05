const Usuario = require("../models/usuario")
const bcryptjs = require("bcrypt");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async(req,res) => {

    const {correo, password} = req.body;

    try {
        
        // verificar si el email existe
        const usuario = await Usuario.findOne({correo})
        if(!usuario){
           return res.status(400).json({
            msg: "email incorrecto"
           }) 
        }
        // si el usuario existe
        if(usuario.estado == false){
            return res.status(400).json({
             msg: "estado false"
            }) 
         }

        // verificar la contraseña
        const validPassword = bcryptjs.compareSync(password,usuario.password)
         if (!validPassword){
            return res.status(400).json({
                msg: "password invalido"
            })
         }
        // generar el JWT
         const token = await generarJWT(usuario.id)


        res.json({
            usuario,token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "hable con el admin"
        })
        
    }

   

}



module.exports = {
    login
}