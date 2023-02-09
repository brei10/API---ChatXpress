const { Socket } = require("socket.io");
const { validateJWT } = require('../helpers/generar-jwt');
const ChatMensajes = require("../models/chat-mensaje");

const chatMensajes = new ChatMensajes();
const socketController = async( socket = new Socket(), io  ) => {

    const usuario = await 
    validateJWT(socket.handshake.headers['x-token']);

    if(!usuario) return socket.disconnect();


    // Agregar al usuario conectado
    chatMensajes.conectarUsuario( usuario );
    io.emit('usuarios-activos', chatMensajes.usuariosArr);
    // apenas se conecte alguien le mandamos los ultimos sms
    socket.emit('recibir-mensaje', chatMensajes.ultimos10);

    // conectar a un usuario a una sala especial 
    socket.join( usuario.id ); // global , socket.id // usuario.id

    // limpiar cuando alguien se desconecta
    socket.on('disconnect', () => {
        chatMensajes.desconectarUsuario( usuario.id );
        // cambia los usuarios activos NOW!!
        io.emit('usuarios-activos', chatMensajes.usuariosArr);
    });

    socket.on('enviar-mensaje', (  { message, uid } ) => {
        if( uid ){
            // mensaje privado 
            socket.to( uid ).emit( 'mensaje-privado',{ de: usuario.nombre , message } )
        }
        else {
            chatMensajes.enviarMensaje(usuario.id, usuario.nombre, message);
            io.emit('recibir-mensajes', chatMensajes.ultimos10 );
        }
        
    })
}


module.exports = {
    socketController
}