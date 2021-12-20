const { Router } = require("express");
const { registroModel } = require("../../modelos/registroModel");
const { inspeccionModel } = require("../../modelos/inspeccionModel")
const gInspeccionApi = Router();

gInspeccionApi.post("/generacionInspeccion", async function (req, res) {
  console.log(" entró a generacion de Inspeccion")
  try {
    const data = req.body;
    console.warn(data)
    const r =  await new inspeccionModel(data)
    console.warn(r)
    r.save(function(error){
      if(error){
        res.send({estado: "error", msg: "ERROR: producto NO guardado" })
        return false
      }
      res.send({estado: "ok", msg: "guardado satisfactoriamente"})
    })
  } catch (error) {
      return res.status(401).send({ estado: "error", msg: "no valido", error });
    
  }
});

exports.gInspeccionApi = gInspeccionApi;