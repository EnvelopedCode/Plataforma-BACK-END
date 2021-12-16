const { Router } = require("express");
const { inspeccionModel } = require("../../modelos/inspeccionModel");
const generarInspApi = Router();

generarInspApi.post("/GeneracionInspeccion", async function (req, res) {

    //Aqui genera la inspeccion
    //Envia la inspeccion a la coleccion

  try {
    const data = req.body;
    const servicio = data.servicio;
    const i = {
        //Crear objeto a salvar con todos los datos del front
    }

  } catch (error) {

  }

});

exports.generarInspApi = generarInspApi;