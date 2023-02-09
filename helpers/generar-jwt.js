const jwt =  require("jsonwebtoken");
const Usuario = require('../models/usuario')


const generarJWT = (uid="") => {
    return new Promise( (resolve,reject) => {
        const payload = { uid };
        jwt.sign(payload,process.env.SECRETORPRIVATEKEY, {
            expiresIn: "4h"
        },(err,token) => {
            if(err) reject("no se pudo generar el token")

            else resolve(token)
        });
    })
};

const validateJWT = async( token = '' ) => {
    try {
        if( token.length < 10 ) return null;
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        // search user in db
        const user = await Usuario.findById( uid );
        if(!user) return null;
        return user;
    } catch (err) {
        return null;
    }
} 




module.exports = {
    generarJWT,
    validateJWT
}