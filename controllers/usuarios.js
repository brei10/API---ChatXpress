
const usuariosGet = (req, res ) => {
    /* espress nos parsesa los datos de la url que tiene caracteres */
    /* podemos darle valores por defecto cuando destructuramos */
    const query = req.query;
    res.json({
        msg: "get api - contralador",
        query
    });
}

const usuariosPut = (req, res) => {
    /* /:id   */
    const {id} = req.params;
    res.json({
        msg: "put api",
        id
    });
}

const usuariosPost = (req, res) => {
    // obtenemos la request
    const body = req.body; /* podempos destructurar para solo obtener las propiedades que queramos { nombre, edad } */
    res.json({
        // nuestras respuestas...
        msg: "post api",
        body
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