const { Router } =require("express");
const perfilConfirmarApi = Router();
const { usuariosModel } = require("../../modelos/usuariosModel");
const { compare } = require("bcrypt");
require("dotenv").config();

perfilConfirmarApi.post("/perfilConfirmar", async function(req, res){
    console.log("entró a perfilConfirmar")

    try{
        const data = req.body
        const cedula = data.cedula;
        const confirmar = data.confirmar;
        console.log(cedula)
        console.log(confirmar)
        const usuario = await usuariosModel.findOne({ cedula });
        const passOK = await compare(confirmar, usuario.contrasena);
        console.log(passOK)
        console.log(usuario)
        if(passOK){
            return res.status(200).send({
                estado: "OK"
            })

        }else{
            return res.status(200).send({
                estado: "error"
            })

        }

    }catch(error){
        return res.status(500).send({
            estado: "algo sucedio en el servidor"
        })
    }

})

exports.perfilConfirmarApi = perfilConfirmarApi;