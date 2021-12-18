const { Router } = require("express");
const { registroModel } = require("../../modelos/registroModel");
const busquedaApi = Router();

busquedaApi.post("/busquedaServicio", async function(req, res){

    console.log("Entro a /busquedaServicio")

    try {
        const data = req.body;
        const servicio = data.servicio;
        const c = await registroModel.findOne({ servicio });
        console.log(c)
        if(c){
            return res.status(200).send({
                estado: "OK",
                servicio: c
            })

        } else {
            return res.status(400).send({
                estado: "error",
                msg: "No hay servicios asignados"
            })
        }


    } catch (error) {
        
    }
})

exports.busquedaApi = busquedaApi;