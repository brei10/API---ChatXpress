
const {Categoria} = require("../models");


// OBTENER CATEGORIAS - PAGINADO - TOTAL - POPULATE()
const obtenerCategorias = async (req,res) => {
    const query = { estado: true }
    const [total, Categorias] = await Promise.all([

        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate("usuario", "nombre")
    ]);

    res.json({
        total,
        Categorias

    });
}

// OBTENER CATEGORIA - POPULATE()
const obtenerCategoria = async (req,res) => {
    const {id} = req.params

    const categoria = await Categoria.findById( id ).populate("usuario","nombre")

    res.json({
        msg: categoria
    })
}

const crearCategoria = async (req,res) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre})

    if(categoriaDB) {
        return res.status(400).json({
            msg: `la categoria ${categoriaDB.nombre} ya existe`
        });
    }

    // generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = new Categoria(data);

    // guardar DB 
    await categoria.save();

    res.status(201).json(categoria)
}

// ACTUALIZAR CATEGORIA 
const actualizarCategoria = async (req,res ) => {
    const {id} = req.params
    // excluir esto, por si nos lo llegan a enviar
    const {estado,usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase()

    data.usuario = req.usuario._uid

    const categoria = await Categoria.findByIdAndUpdate(id,data, {new:true})

    res.status(201).json({
        msg: categoria
    })
}

// BORRAR CATEGORIA - a  ESTADO: FALSE
const borrarCategoria = async(req,res) => {
    const {id} =req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {estado:false}, {new:true})
    res.json({
        msg: categoriaBorrada
    })
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}