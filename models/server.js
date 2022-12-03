
const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');
const fileUpload = require('express-fileupload')

class Server {
    constructor() {
        
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.categorias = "/api/categorias";
        this.productos = "/api/productos";
        this.buscar = "/api/buscar"
        this.uploads = "/api/uploads"
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
        this.app.use(express.static('public'));
        // file upload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }
    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
        this.app.use(this.categorias, require('../routes/categorias'))
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.productos, require('../routes/productos'))
        this.app.use(this.buscar, require('../routes/buscar'))
        this.app.use(this.uploads, require('../routes/uploads'))
        
        
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor creado en el puerto ${process.env.PORT}; `)
        })
    }
}

module.exports = Server;