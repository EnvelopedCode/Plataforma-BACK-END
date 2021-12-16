const { Router } = require("express");
const { registroModel } = require("../../modelos/registroModel");
const gInspeccionApi = Router();

gInspeccionApi.post("/BuscarInspeccion", async function (req, res) {

  //Aqui busca el servicio nada mas

  try {

    const data = req.body;
    const servicio = data.servicio;
    const s = await registroModel.find({ servicio });

    if (s.length > 0) {
      return res.status(200).send({
        estado: "ok",
        msg: "servicio listo para asignar",
      });

    } else if(s.length < 1){  
      return res.status(400).send({
        estado: "error",
        msg: "servicio no encontrado",
      });
    }

  } catch (error) {
    
  }
});

exports.gInspeccionApi = gInspeccionApi;