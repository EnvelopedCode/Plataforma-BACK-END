const { Router } = require("express");
const { medidasModel } = require("../../modelos/medidasModel")
const { registroModel } = require("../../modelos/registroModel");
const validarMedidaApi = Router();

validarMedidaApi.post("/validarMedida", async function(req, res){

    console.log("Entro a VALIDAR si la medicion ingresada es anomala")

    try {

        const { servicio } = req.body

        const s = await medidasModel.find({ servicio })
        const f = await registroModel.findOne({ servicio })
        if(s.length > 0 && f){
            return res.status(200).send({
                estado: "OK",
                busqueda: s,
                fecha: f.fecha
            })
        } else {
            return res.status(400).send({
                estado: "error"
            })
        }
        

    } catch (error) {

    }
})

exports.validarMedidaApi = validarMedidaApi;