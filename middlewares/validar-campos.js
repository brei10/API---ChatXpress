
const { validationResult } = require("express-validator");


const express = require('express');



const validarCampos = (req,res,next) => {
    /* const errors = validationResult(req)
    if( !error1.isEmpty() ) {
        return res.status(400).res(errors)
    } */

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
    
}



module.exports = { 
    validarCampos
}