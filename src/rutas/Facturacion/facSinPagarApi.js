const { Router } = require("express");
const { registroModel } = require("../../modelos/registroModel");
const { medidasModel } = require("../../modelos/medidasModel");
const facSinPagarApi = Router();

facSinPagarApi.post("/facSinPagar", async function(req, res){

    console.log("ENTRO FAC SIN PAGAR")

    try {
        const data = req.body;
        const m = await medidasModel.find({ estado: "SIN PAGAR" })
        console.log(m)

        var servicios = []

        for(let indice in m){

            let s = await registroModel.findOne({ servicio: m[indice].servicio })
            console.log("SERVICIO")
            console.log(s)

            const facturaActual = {
                "servicio": s.servicio,
                "cedula": s.cedula,
                "nombre": s.nombre,
                "direccion": s.direccion,
                "fechaLectura": m[indice].fechaLectura,
                "consumo": m[indice].consumo,
                "valor": m[indice].valor
            }

            servicios.push(facturaActual)

        }

        console.log(servicios)

        return res.status(200).send({
            sinPagar: servicios
        })


    } catch (error) {

        console.log("se fue para el catch")
        console.log(error)
        return res.status(400).send({
            estado: "error"
        })
        
    }
})

exports.facSinPagarApi = facSinPagarApi;