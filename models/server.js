
const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {
    constructor() {
        
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        // conectar a base de datos
        this.conectarDb();


        // middlewars
        this.middlewars();
        // rutas de mi aplicacion
        this.routes();
    }

    async conectarDb(){
        await dbConection()
    }

    middlewars() {
        // cors 
        this.app.use(cors())

        //parseo ylectura del body
        this.app.use(express.json());
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