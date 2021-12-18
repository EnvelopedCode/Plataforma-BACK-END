const { Router } = require("express");
const { medidasModel } = require("../../modelos/medidasModel")
const { registrosModel } = require("../../modelos/registroModel")
const fechaValidarApi = Router();

fechaValidarApi.post("/fechaValidar", async function(req, res){

    console.log("Entro a REGISTRAR la fecha validar")

    try {
        const data = req.body
        const servicio = data.servicio
        const fecha = data.fecha
        console.log(fecha)

        const f = await medidasModel.find({ servicio, fechaLectura: fecha }) //Buscamos las medidas de hoy
        return res.status(200).send({
            estado: "OK",
            medida: f
        })

    } catch (error) {

    }
})

exports.fechaValidarApi = fechaValidarApi;