require("dotenv").config();
const Server = require('./models/server')

const server = new Server();




server.listen();


// nueva instancia


/* const server2 = new Server();
server2.usuariosPath = "/arroz"
server2.port = 300;
console.log("entra al servidor 2")
server2.listen()
 */


