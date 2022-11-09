const { response } = require("express");
const { isValidObjectId } = require("mongoose");
const { Usuario, Categoria } = require("../models");
const Producto = require("../models/producto");


const coleccionesPermitidas = [
    "usuarios",
    "categorias",
    "productos",
    "roles"
]

const buscarCategorias = async(termino = "", res= response) => {
    const esMongoID = isValidObjectId(termino) // true or false 

        if(esMongoID) {
            const categoria = await Categoria.findById(termino);
            return res.json({
                results: (categoria) ? [categoria] : []
            }); 
        }
            const regex = new RegExp(termino, "i")
            const categoria = await Categoria.find({
                
                $or: [{nombre: regex}],
                $and: [{estado:true}]
                
            })
            res.json({
                results: categoria
            });
         
}

const buscarUsuarios = async(termino = "", res= response) => {
    const esMongoID = isValidObjectId(termino) // true or false 
        if(esMongoID) {
            const usuario = await Usuario.findById(termino);
            return res.json({
                results: (usuario) ? [usuario] : []
            }); 
        }
            // expresion regular, hace que termino no sea sensible a las 
            /* mayusculas , ni menusculas .... tambien aparecen todos los que tengan dicho name*/
            const regex = new RegExp(termino, "i")
            const usuarios = await Usuario.find({
                /* o que el termino haga match con el correo */
                $or: [{nombre: regex}, {correo: regex}],
                $and: [{estado:true}]
                // solo trae los que tienen estado en true
            })
            res.json({
                results: usuarios
            });
        
}

const buscarProductos = async(termino = "", res= response) => {
    const esMongoID = isValidObjectId(termino) // true or false 

        if(esMongoID) {
            const productos = await Producto.findById(termino);
            return res.json({
                results: (productos) ? [productos] : []
            }); 
        }
            const regex = new RegExp(termino, "i")
            const productos = await Producto.find({
                
                $or: [{nombre: regex}],
                $and: [{estado:true}]
                
            })
            res.json({
                results: productos
            });
         
}

const buscar = (req,res) => {

    const {coleccion,termino} = req.params;

    if(!coleccionesPermitidas.includes(coleccion)) {
        res.status(400).json({
            msg: `Las colecciones permitidas son:${coleccionesPermitidas} `
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino,res)
            break;

        case 'categorias':
            buscarCategorias(termino,res)
            break;

        case 'productos':
            buscarProductos(termino,res)
            break;
    
        default:
            res.status(500).json({
                msg: "se me olvido hacer esta busqueda"
            })
            
    }
    
}


module.exports = {
    buscar
}