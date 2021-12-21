const { Router } = require("express");
const { registroModel } = require("../../modelos/registroModel");
const { medidasModel } = require("../../modelos/medidasModel");
const facPagarApi = Router();

facPagarApi.post("/facPagar", async function(req, res){

    console.log("ENTRO FAC PAGAR")

    try {
        const data = req.body

        for(let indice in data.servicios){

            let servicio = data.servicios[indice][0]
            let fechaLectura = data.servicios[indice][4]

            const m = await medidasModel.findOne({ servicio, fechaLectura })
            console.log(m)
            ////////////////////////////////////////////

            const mCobrado = {
                "servicio": m.servicio,
                "lectura": m.lectura,
                "fechaLectura": m.fechaLectura,
                "consumo": m.consumo,
                "unidad": m.unidad,
                "anomalia": m.anomalia,
                "estado": "PAGADA",
                "valor": m.valor
            }
            console.log("Cobrado:")
            console.log(mCobrado)
            const nuevo = Object.assign(m, mCobrado);

            nuevo.save(function(error){
                console.log("entró a error de usuarios model")
            });

        }
        
        return res.status(200).send({
            estado: "OK"
        })

    } catch (error) {

        console.log("se fue para el catch")
        console.log(error)
        return res.status(400).send({
            estado: "error"
        })
        
    }
})

exports.facPagarApi = facPagarApi;