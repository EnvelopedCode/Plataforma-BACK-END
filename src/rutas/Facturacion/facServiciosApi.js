const { Router } = require("express");
const { registroModel } = require("../../modelos/registroModel");
const facServiciosApi = Router();

facServiciosApi.post("/facServicio", async function(req, res){

    console.log("ENTRO FAC SERVICIO")

    try {
        const data = req.body;
        const cedula = data.cedula;
        const c = await registroModel.find({ cedula });
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

exports.facServiciosApi = facServiciosApi;