const { Router } =require("express");
const perfilEliminarApi = Router();
const { usuariosModel } = require("../../modelos/usuariosModel");

perfilEliminarApi.post("/perfilEliminar", async function(req, res){
    console.log("entró a perfilEliminar")

    try{

        const data = req.body
        const cedula = data.cedula
        const contrasena = ""
        const estado = "0"
        const rol = "cliente"

        await usuariosModel.updateOne({ cedula }, {$set: {contrasena, estado, rol}});

        return res.status("200").send({
            estado: "ok",
        })


    }catch(error){
        return res.status(500).send({
            estado: "algo sucedio en el servidor"
        })
    }

})

exports.perfilEliminarApi = perfilEliminarApi;