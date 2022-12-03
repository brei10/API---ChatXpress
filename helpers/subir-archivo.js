const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = ( files, carpeta = "") => {

    return new Promise(( resolve, reject) => {
        const { archivo } = files;

        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];
    
        // validar extension
        const validExtensiones = ['png','jpg','jpeg','gif'];
        if( !validExtensiones.includes(extension) ) {
            return  reject("not valid extension");
        }
    
        // cambiar name file 
        const nombreTemp = uuidv4() + '.' + extension
        // a donde quiero llevar ese archivo 
        const uploadPath = path.join( __dirname,'../uploads/',carpeta, nombreTemp );
    
        archivo.mv(uploadPath, (err) => {
            if (err) {
              return reject(err);
            }
        
            resolve(uploadPath);
      
      })

    }) 

}

module.exports = {
    subirArchivo
}