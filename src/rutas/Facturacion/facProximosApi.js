const { Router } = require("express");
const { medidasModel } = require("../../modelos/medidasModel");
const { registroModel } = require("../../modelos/registroModel");
const facProximosApi = Router();

facProximosApi.post("/facProximos", async function(req, res){

    console.log("ENTRO FAC PROXIMOS")

    try {
        //Realizar Fetch a cada servicio y traer fecha de factura
        const s = await registroModel.find({})
        const servicios = []

        for(let indice in s){

            //NOTA DISEÑO: el coje la ultima lectura tomada (la fecha) de ese servicio y le suma un mes y calcula la diferencia que hay entre esa proxima lectura y la fecha de hoy, si la diferencia es menor que 7 la medida se muestra
            const m = await medidasModel.find({ servicio: s[indice].servicio }).sort({_id:-1}).limit(1)
            //Traerse la ultima lectura y sumarle 1 al mes, esa sera la FechaFactura
            let fechaFactura = m[0].fechaLectura
            let fechaPrototipo = new Date(fechaFactura)
            let mes = fechaPrototipo.getMonth()+1
            let dia = fechaPrototipo.getDate()+1
            let year = fechaPrototipo.getFullYear()

            if(mes == "13"){
                mes = "01"
                year = parseInt(year)+1
                year = year.toString()
            }

            let fechaProximaS = mes + "-" + dia + "-" + year
            let fechaProximaD = new Date(fechaProximaS)


            //Calcular si el dia de hoy puedo mostrar
            const fechaActual = new Date()
            const resultado = Math.floor((fechaProximaD - fechaActual) / (1000*60*60*24))
            console.log(fechaProximaD)
            console.log(fechaActual)
            console.log(resultado)


            if(resultado < 7){
                //Armar medida y pushearla a la lista principal

                let medida = {
                    "servicio": s[indice].servicio,
                    "cedula": s[indice].cedula,
                    "nombre": s[indice].nombre,
                    "direccion": s[indice].direccion,
                }

                servicios.push(medida)

            }
            
        }

        return res.status(200).send({
            proximas: servicios
        })


    } catch (error) {
        
    }
})

exports.facProximosApi = facProximosApi;