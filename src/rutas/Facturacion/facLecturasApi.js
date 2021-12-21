const { Router } = require("express");
const { medidasModel } = require("../../modelos/medidasModel");
const facLecturasApi = Router();

facLecturasApi.post("/facLecturas", async function(req, res){

    console.log("ENTRO FAC LECTURAS")

    try {

        const data = req.body
        const servicio = data.servicio
        const c = await medidasModel.find({ servicio })
        console.log(c)
        let lecturas = []

        for(let indice in c){

            if(c[indice].lectura != "0"){

                let lectura = []
                lectura.push(c[indice].servicio); //0
                lectura.push(c[indice].lectura); //1
                lectura.push(c[indice].fechaLectura); //2
                lectura.push(c[indice].consumo); //3
                lectura.push(c[indice].unidad); //4
                lectura.push(c[indice].anomalia); //5
                lectura.push(c[indice].estado); //6
                lectura.push(c[indice].valor) //7
                lecturas.push(lectura);

            }

        }

        return res.status(200).send({
            "lectura": lecturas
        })

    } catch (error) {
        
    }
})

exports.facLecturasApi = facLecturasApi;