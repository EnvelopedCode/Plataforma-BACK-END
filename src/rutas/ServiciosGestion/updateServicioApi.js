const { Router } = require("express");
const { registroModel } = require("../../modelos/registroModel")
const updateServicioApi = Router();

updateServicioApi.post("/updateServicio", async function(req, res){
    console.log("updateServicioApi")
    try {
        const data = req.body
        const { servicio } = req.body;
        const c = await registroModel.findOne({ servicio });
    
        const nuevo = Object.assign(c, data);
;
        nuevo.save(function(error){
          if(error){
            return res.status(500).send({ estado: "error", msg: "No se pudo actualizar el servicio" });
          }
            return res.status(200).send({ estado: "ok", msg: "servicio actualizado" });
        })
    } catch (error) {
        return res.status(400).send({
            msg: "Error del servidor"
        })
    }
})

exports.updateServicioApi = updateServicioApi;