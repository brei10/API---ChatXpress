
const mongoose = require("mongoose")

const dbConection = async () => {

    try {
             await mongoose.connect(process.env.MONGODB_CNN);

             console.log("base de datos online");
        
    } catch (error) {
        console.log(error)
        throw new Error("error en la hora de inicializar en la base de datos")
    }
}



module.exports = {
    dbConection
}