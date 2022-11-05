
const jwt = require("jsonwebtoken")

const validarJWT = (req,res,next) => {
    const token = req.header("x-token");

    if(!token){
        return res.status(401).json({
            msg: "token invalido"
        })
    }
    console.log(token);
    next();
}


module.exports = {
    validarJWT
}