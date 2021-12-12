const { Router } = require("express");
const { registroModel } = require("../../modelos/registroModel");
const gestionServicioApi = Router();

gestionServicioApi.post("/gestionServicio", async function(req, res){
    try {
        const data = req.body;
        const cedula = data.cedula;
        const c = await registroModel.find({ cedula });
        console.log(c)
        if(c){
            return res.status(200).send({
                estado: "OK",
                servicios: c
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

exports.gestionServicioApi = gestionServicioApi;