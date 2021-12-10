const { Router } = require("express");
const { usuariosModel } = require("../modelos/usuariosModel");
const validacionApi = Router();

validacionApi.post("/validacion", async function (req, res) {
  //   res.send("entró a la ruta validacion");
  try {
    const { cedula } = req.body;
    console.warn("Entro a /validacion")
    const c = await usuariosModel.findOne({ cedula });
    console.log("pasó el busqueda------------------------");
    if (c) {
      return res.status(200).send({ estado: "ok", msg: "cedula encontrada" });
    } else {
      return res.status(401).send({ estado: "error", msg: "no encontrado" });
    }
  } catch (error) {
    return res
      .status(401)
      .send({ estado: "error", msg: "error no hizo el proceso", error });
  }
});

exports.validacionApi = validacionApi;
