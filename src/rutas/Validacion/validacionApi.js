const { Router } = require("express");
const { usuariosModel } = require("../../modelos/usuariosModel");
const validacionApi = Router();

validacionApi.post("/validacion", async function (req, res) {
  //   res.send("entró a la ruta validacion");
  try {
    const { cedula } = req.body;
    console.warn("Entro a /validacion")
    console.log(cedula)
    const c = await usuariosModel.findOne({ cedula }); //Busco cedula en servicios
    console.log(c)
    
    console.log("pasó el busqueda------------------------");
    if (c) { //Encuentra una cedula

      if(c.estado === "1"){ //Cedula con contraseña

        return res.status(200).send({
          estado: "OK",
          msg: "Enviando a login...",
          url: "/Login",
          cedula: c.cedula,
          nombre: c.nombre,
          apellido: c.apellido
        })
        
      } else { //Cedula sin contraseña
        
        return res.status(200).send({
          estado: "OK",
          msg: "Enviando a registro...",
          url: "/Signup",
          cedula: c.cedula
        })
      }
      
    } else {
      return res.status(401).send({ 
        estado: "error", 
        msg: "Cedula inexistente",
      });
    }
  } catch (error) {
    return res
      .status(401)
      .send({ estado: "error", msg: "error no hizo el proceso", error });
  }
});

exports.validacionApi = validacionApi;
