
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async(req,res,next) => {
    const token = req.header("x-token");

    if(!token){
        return res.status(401).json({
            msg: "no hay token en la peticion"
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        // leer el usuario que corresponde al uid de mongo
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            res.json({
                msg: "usuario no exixtente en la db"
            })
        }

        /* if(!usuario.estado){
            return res.json({
                msg: "estado false, no se puede eliminar"
            })
        } */
       
        req.usuario = usuario;
        next();

    } catch (error) {

        res.status(401).json({
            msg: "Token no valido"
        })
    }

}


module.exports = {
    validarJWT
}