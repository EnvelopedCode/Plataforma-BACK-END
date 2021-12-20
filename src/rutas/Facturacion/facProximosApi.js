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

            //NOTA DISEÑO: el coje el dia de facturacion y coje el dia de hoy, se restan para tomar sus diferencias, si el resultado es negativo significa que el dia de facturacion ya paso y hay que esperar a que el dia de Hoy este por debajo de el dia de facturacion
            
            //Traerse la ultima lectura y sumarle 1 al mes, esa sera la FechaFactura
            let fechaFactura = s[indice].fecha
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
            let proximaDia = fechaProximaD.getDate();


            //Calcular si el dia de hoy puedo mostrar
            const fechaActual = new Date()
            const diaActual = fechaActual.getDate();

            // const resultado = Math.floor((proximaDia - diaActual) / (1000*60*60*24))
            const resultado = proximaDia - diaActual 


            if(resultado >= 0 && resultado < 7){
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