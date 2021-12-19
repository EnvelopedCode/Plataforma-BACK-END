const { Router } = require("express");
const { registroModel } = require("../../modelos/registroModel");
const facServiciosApi = Router();

facServiciosApi.post("/facServicios", async function(req, res){

    console.log("ENTRO FAC SERVICIO")

    try {
        const data = req.body;
        const cedula = data.cedula
        const s = await registroModel.find({ cedula })
        console.log(s)
        if(s){
            return res.status(200).send({
                estado: "OK",
                servicios: s
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

exports.facServiciosApi = facServiciosApi;