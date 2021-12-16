const { Router } = require("express");
const { medidasModel } = require("../../modelos/medidasModel")
const validarMedidaApi = Router();

validarMedidaApi.post("/validarMedida", async function(req, res){

    console.log("Entro a VALIDAR si la medicion ingresada es anomala")

    try {

        const { servicio } = req.body

        const s = await medidasModel.find({ servicio })
        if(s.length > 0){
            return res.status(200).send({
                estado: "OK",
                busqueda: s
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