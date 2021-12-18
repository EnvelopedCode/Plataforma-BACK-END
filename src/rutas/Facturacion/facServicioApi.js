const { Router } = require("express");
const { registroModel } = require("../../modelos/registroModel");
const facServicioApi = Router();

facServicioApi.post("/facServicio", async function(req, res){

    console.log("ENTRO FAC SERVICIO")

    try {
        const data = req.body;
        const servicio = data.servicio;
        const c = await registroModel.find({ servicio }).sort({_id:1}).limit(1);
        console.log(c)
        if(c){
            return res.status(200).send({
                estado: "OK",
                fecha: c[0].fecha
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

exports.facServicioApi = facServicioApi;