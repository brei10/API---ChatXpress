
const mongoose = require("mongoose")
const Usuario = require("../models/usuario")

const dbConection = async () => {

    try {
             await mongoose.connect(process.env.MONGODB_CNN);

             console.log("base de datos online");
        
    } catch (error) {
        console.log(error)
        throw new Error("error en la hora de inicializar en la base de datos")
    }
    const act = await Usuario.updateMany({},{$unset:{"nuevo3":true,"nuevo2":true,"nuevo":true}})
    console.log(act)
}



module.exports = {
    dbConection
}