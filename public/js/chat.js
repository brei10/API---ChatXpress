
let usuario = null;
let socket = null;

// REFERENCIAS HTML
const txtUid = document.querySelector('#txtUid');
const txtMensaje = document.querySelector('#txtMensaje');
const ulMensajes = document.querySelector('#ulMensajes');
const btnSalir = document.querySelector('#btnSalir');
const ulUsuarios = document.querySelector('#ulUsuarios');



const validarJWT = async() => {
    const token = localStorage.getItem('token') || '';

    if(token.length < 10) throw new Error('no hay token valido');
    const resp = await fetch('http://localhost:8080/api/auth/check-token', {
        headers: { 'x-token': token}
    });
    const { usuario: userDB, token: tokenDB } = await resp.json();
    localStorage.setItem('token', tokenDB);
    document.title = userDB.nombre || 'Indefinido';
    
    await conectarSocket();
    
}


const conectarSocket = async() => {
        socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect', () => {

    });

    socket.on('disconnect', () => {

    });

    socket.on('recibir-mensaje', (message) => {
        dibujarMensajes(message);
    });

    socket.on('recibir-mensajes', (message) => {

        dibujarMensajes(message);
    });

    socket.on('usuarios-activos', (arrayUser = '') => {
        dibujarUsuarios(arrayUser);
    });

    socket.on('mensaje-privado', ({ de, message }) => {
        console.log('mensaje privado de: ', de,' , fecha :', getDateNow(), '  mensaje : ', message );
    });
}


const dibujarMensajes = ( mensajes = [] ) => {
    
    let mensajesHTML = '';
    mensajes.forEach( ( { nombre, mensaje } ) => {
        mensajesHTML += `
            <li>
                <p>
                    <span class="text-primary"> ${ nombre }: </span>
                    <span>${ mensaje } </span>
                </p>
            </li>
        `
    });
 
    ulMensajes.innerHTML = mensajesHTML;
}

const dibujarUsuarios = (arr) => {
    let usersHtml = '';
    
    arr.forEach( u => {
        usersHtml += `
                <li> 
                    <p> 
                        <h5 class='text-success'> ${u.nombre} </h5>
                        <span clas='fs-6 text-muted'> ${u.uid} </span>
                    </p>
                </li> `
    } );
    ulUsuarios.innerHTML = usersHtml;
}

txtMensaje.addEventListener('keyup', ( { keyCode} ) => {
    const message = txtMensaje.value;
    const uid     = txtUid.value;

    if( keyCode !== 13 ){ return };
    if( message.length === 0 ){ return };
    console.log('emite');
    socket.emit('enviar-mensaje', { message, uid } );
    txtMensaje.value = '';
})
const getDateNow = () => {
    return new Date().toLocaleString();
}
;( async ( ) =>{
    validarJWT();
})();


