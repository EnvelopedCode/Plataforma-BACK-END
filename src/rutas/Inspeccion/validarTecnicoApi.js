const { Router } = require("express");
const { usuariosModel } = require("../../modelos/usuariosModel");
const validarTecnicoApi = Router();

validarTecnicoApi.post("/validarTecnico", async function (req, res) {
  try {
    console.log("entró a validar tecnico");
    const data = req.body;
    const {cedula} = req.body;
    const s = await usuariosModel.find({ cedula });
    if (s) {
      return res.status(200).send({
        estado: "ok",
        msg: "tecnico encontrado",
      });
    } else if (!s) {
      return res.status(400).send({
        estado: "error",
        msg: "tecnico No encontrado",
      });
    }
  } catch (error) {
    return res.status(401).send({ estado: "error", msg: "no valido", error });
  }
});

exports.validarTecnicoApi = validarTecnicoApi;