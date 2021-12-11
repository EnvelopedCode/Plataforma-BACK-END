const { Router } = require("express");
const { registroModel } = require("../../modelos/registroModel");
const { usuariosModel } = require("../../modelos/usuariosModel");
const validacionApi = Router();

validacionApi.post("/validacion", async function (req, res) {
  //   res.send("entró a la ruta validacion");
  try {
    const { cedula } = req.body;
    console.warn("Entro a /validacion")
    console.log(cedula)
    const c = await registroModel.findOne({ cedula }); //Busco cedula en servicios
    console.log(c)
    
    console.log("pasó el busqueda------------------------");
    // if (c) {
    //   //
    //   const s = await usuariosModel.findOne({ cedula });
    //   if(s){
    //     //redireccionamiento para login
    //     return res.status(200).send({estado:"ok", msg:"cedula encontrada en usuariosModel" })
    //   } else{
    //     //redireccionamiento para el signup
    //     console.log("no encontró la cedula en signup");
    //     return res.status(200).send({estado:"error", msg:"cedula NO encontrada en usuariosModel" })
    //   } 
    // } else {
    //   return res.status(401).send({ estado: "error", msg: "no encontrado en servicios" });
    // }
  } catch (error) {
    return res
      .status(401)
      .send({ estado: "error", msg: "error no hizo el proceso", error });
  }
});

exports.validacionApi = validacionApi;
