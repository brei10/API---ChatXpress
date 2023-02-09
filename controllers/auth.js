const Usuario = require("../models/usuario")
const bcryptjs = require("bcrypt");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");
const { response } = require("express");

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
         const token = await generarJWT(usuario.id);


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

const googleSignIn = async ( req,res ) => {

    const {id_token} = req.body;

    try {

        const {correo,nombre,img} = await googleVerify(id_token);
        let usuario = await Usuario.findOne({correo})

        if (!usuario) {
            // tengo que crearlo
            const data = {
                nombre,
                correo,
                password: ":p",
                img,
                google: true
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        // si el usuario en db esta borrado
        if (!usuario.estado){
            return  res.status(401).json({
                msg: "hable con el admin, usuario bloqueado"
            })
        }

        const token = await generarJWT(usuario.id)
        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: "el token no se pudo verificar"
        })
    }

   
}


const renovarToken = async( req, res=response ) => {

    const { usuario } = req;

    // Generar el jwt
    const token = await generarJWT( usuario.id );
    res.json({
        usuario,
        token
    });
}



module.exports = {
    login,
    googleSignIn,
    renovarToken
}