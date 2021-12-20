const { Router } = require("express");
const { medidasModel } = require("../../modelos/medidasModel");
const { registroModel } = require("../../modelos/registroModel");
const facItinerarioApi = Router();

facItinerarioApi.post("/facItinerario", async function(req, res){

    console.log("ENTRO FAC LECTURAS")

    try {

        const data = req.body
        const fechaHoy = new Date().toLocaleDateString()
        const fechaArreglo = fechaHoy.split("/")
        const dia = fechaArreglo[1]
        const mes = fechaArreglo[0]
        const year = fechaArreglo[2]
        const fechaNueva = year + "-" + mes + "-" + dia

        const s = await registroModel.find({})

        var factura = []

        for(let indice in s){

            let fechaFac = s[indice].fecha
            let fechaFacD = new Date(fechaFac)
            let fechaDia = fechaFacD.getDate()+1;

            console.log(fechaDia)
            console.log(dia)

            if(fechaDia == dia){ //Si el dia de facturacion de este servicio coincide con hoy
                console.log(true)

                const facturaActual = {
                    "servicio": s[indice].servicio,
                    "cedula": s[indice].cedula,
                    "nombre": s[indice].nombre,
                    "direccion": s[indice].direccion,
                }

                factura.push(facturaActual)

            }

        }


        return res.status(200).send({
            estado: "OK",
            lecturas: factura
        })

    } catch (error) {
        
    }
})

exports.facItinerarioApi = facItinerarioApi;