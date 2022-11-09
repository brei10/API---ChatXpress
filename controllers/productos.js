
const { response } = require("express");
const Producto = require("../models/producto");


const obtenerProductos = async (req,res=response) => {
 const { limite = 5, desde = 0 } = req.query
    const query = { estado: true }; 
    
    const [total, Productos] = await Promise.all([
        Producto.countDocuments(),
        Producto.find()
        .populate("usuario", "nombre")
        .populate("categoria", "nombre")
            .limit(Number(limite))
            .skip(Number(desde))
    ]);
    res.json({
        total,
        Productos

    });
}

// OBTENER CATEGORIA - POPULATE()
const obtenerProducto = async (req,res) => {
    const {id} = req.params

    const producto = await Producto.findById( id )
        .populate("usuario","nombre")
        .populate("categoria","nombre")

    res.json({
        msg: producto
    })
}

const crearProducto = async (req,res) => {

    const {estado,usuario, ...body} = req.body;
    const productoDB = await Producto.findOne({nombre: body.nombre})

    if(productoDB) {
        return res.status(400).json({
            msg: `el producto ${productoDB.nombre} ya existe`
        });
    }

    // generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }
    const producto = new Producto(data);

    // guardar DB 
    await producto.save();

    res.status(201).json(producto)
}

// ACTUALIZAR CATEGORIA 
const actualizarProducto = async (req,res ) => {
    const {id} = req.params
    // excluir esto, por si nos lo llegan a enviar
    const {estado,usuario, ...data} = req.body;

    if(data.nombre){
        data.nombre = data.nombre.toUpperCase()
    }

    data.usuario = req.usuario._uid

    const producto = await Producto.findByIdAndUpdate(id,data, {new:true})

    res.status(201).json({
        msg: producto
    })
}

// BORRAR CATEGORIA - a  ESTADO: FALSE
const borrarProducto = async(req,res) => {
    const {id} =req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, {estado:false}, {new:true})
    res.json({
        msg: productoBorrado
    })
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}