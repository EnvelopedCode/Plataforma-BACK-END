const { Router } = require("express");
const { usuariosModel } = require("../../modelos/usuariosModel");
const loginApi = Router();

loginApi.post("/login", function (req, res){
    const data = req.body
    console.log("Llego a backend /login")
    console.log(data.cedula)
    //Ya todo esta listo, validar contraseña
})

exports.loginApi = loginApi;