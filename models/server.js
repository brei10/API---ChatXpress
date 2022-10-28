
const express = require('express');
const cors = require('cors')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'

        // middlewars
        this.middlewars();
        // rutas de mi aplicacion
        this.routes();
    }

    middlewars() {
        // cors 
        this.app.use(cors())
        // directorio publico 
        this.app.use(express.static('public'))
    }
    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor creado en el puerto ${process.env.PORT}; `)
        })
    }
}


module.exports = Server;