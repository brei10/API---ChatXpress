
const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {
    constructor() {
        
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.categorias = "/api/categorias";
        this.productos = "/api/productos";
        this.buscar = "/api/buscar"
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
        this.app.use(this.categorias, require('../routes/categorias'))
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.productos, require('../routes/productos'))
        this.app.use(this.buscar, require('../routes/buscar'))
        
        
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor creado en el puerto ${process.env.PORT}; `)
        })
    }
}

module.exports = Server;