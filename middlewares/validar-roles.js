


const esAdminRole = ( req, res , next) => {

    if(!req.usuario) {
        return res.status(500).json({
            msg: "se quire verificar el role sin validar token"
        });
    }
    
    const {rol,nombre} = req.usuario;

    if(rol !== "ADMIN_ROLE") {
        return res.status(401).json({
            msg: `${nombre} no es administrador`
        });
    }

    next();

}

const tieneRole = (...roles) => {

    return (req,res,next) => {
    
    if(!req.usuario) {
        return res.status(500).json({
            msg: "se quiere verificar el token sin validar"
        });
    }

    if(!roles.includes(req.usuario.rol)) {
        return res.status(401).json({
            msg: `el servicio requiere de estos roles: ${roles}`
        });
    }
        next();
    }
}
module.exports = {
    esAdminRole,
    tieneRole
}