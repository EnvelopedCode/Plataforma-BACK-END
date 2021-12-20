const { Router } = require("express");
const { inspeccionModel } = require("../../modelos/inspeccionModel");
const { registroModel } = require("../../modelos/registroModel")
const tablaInspeccionApi = Router();

tablaInspeccionApi.post("/tablaInspeccion", async function(req, res){
  console.log("entró a generacion inspeccion")
  try{
    const { cedula } = req.body; 
    console.warn(cedula)
    const c = await inspeccionModel.find({ tecnico: cedula });
    let inspeccion = []
    for(let i in c){
      let arreglo = []
      arreglo.push(c[i].servicio)
      arreglo.push(c[i].tecnico)
      arreglo.push(c[i].fecha)

      console.log("luego del primer arreglo")
      let servicio = c[i].servicio
      const d = await registroModel.findOne({servicio})
      console.log(d)
      arreglo.push(d.nombre)
      arreglo.push(d.direccion)
      inspeccion.push(arreglo)
    }

    console.warn(inspeccion)

    return res.status(200).send({
      estado : "ok",
      msg: "satsifactorio",
      inspeccion: inspeccion

    })
  }catch (error) {
      return res.status(401).send({ estado: "error", msg: "no valido", error });
    
  }
})


exports.tablaInspeccionApi = tablaInspeccionApi;