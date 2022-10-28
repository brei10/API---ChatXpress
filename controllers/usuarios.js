const { response } = require('express');

const usuariosGet = (req, res = response) => {
    res.json({
        msg: "get api - contralador"
    });
}

const usuariosPut = (req, res) => {
    res.json({
        msg: "put api"
    });
}

const usuariosPost = (req, res) => {
    res.status(201).json({
        msg: "post api"
    });
}

const usuariosDelete = (req, res) => {
    res.json({
        msg: "delete api"
    });
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: "patch api"
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}