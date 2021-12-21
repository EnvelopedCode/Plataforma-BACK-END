const { Router } = require("express");
const { registroModel } = require("../../modelos/registroModel");
const { medidasModel } = require("../../modelos/medidasModel");
const facPagadasApi = Router();

facPagadasApi.post("/facPagadas", async function(req, res){

    console.log("ENTRO FAC PAGADAS")

    try {

        const m = await medidasModel.find({ estado: "PAGADA" })
        console.log(m)

        var servicios = []

        for(let indice in m){

            if(m[indice].valor != "$0"){ //Evalua que no se ingrese la primera factura de un servicio

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

                servicios.unshift(facturaActual)
            }

        }

        console.log(servicios)

        return res.status(200).send({
            pagadas: servicios
        })

    } catch (error) {

        console.log("se fue para el catch")
        console.log(error)
        return res.status(400).send({
            estado: "error"
        })
        
    }
})

exports.facPagadasApi = facPagadasApi;