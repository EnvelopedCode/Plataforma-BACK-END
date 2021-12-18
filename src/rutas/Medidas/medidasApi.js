const { Router } = require("express");
const { medidasModel } = require("../../modelos/medidasModel")
const medidasApi = Router();

medidasApi.post("/medidasServicio", async function(req, res){


    //NOTA DE DISEÑO: Al ingresarse una medida no habra que preocuparse por la fecha, la fecha del registro de medida y la validacion del estado del servicio deben de estar en sincronia con el dia de HOY para poder funcionar correctamente, puesto que; si la fecha de hoy es modificada de forma que coincida con una fecha de ingreso de medida PERO la fecha configurada en el registro de la medida es la de hoy: el sistema en dicho caso no hara validacion de una segunda insercion el mismo dia


    console.log("Entro a REGISTRAR la medida")// Creamos medida de un servicio ya existente

    try {

        const dataM = req.body;
        const servicio = dataM.servicio

        const c = await medidasModel.find({ servicio, estado: "PAGADA" }).sort({_id:-1}).limit(1);
        const conResultado = parseInt(dataM.lectura)-parseInt(c[0].lectura)
        var nuevaResultado = conResultado.toString()

        const medida = {
            "servicio": dataM.servicio,
            "lectura": dataM.lectura,
            "fechaLectura": dataM.fechaLectura,
            "consumo": nuevaResultado,
            "unidad": dataM.unidad,
            "anomalia": dataM.anomalia
        }

        //CAMBIAR ESTADO
        const e = await medidasModel.find({ servicio, estado: "SIN PAGAR" })
        console.log(e)

        for(let medida in e){
            let resultado = e[medida].estado = "ACUMULADO"
            const nuevo = Object.assign(e[medida], resultado); //IZQUIERDA: documento viejo, DERECHA: documento nuevo
  
            nuevo.save(function(error){
                console.log(error)
            })
        }

        console.log("DESPUES")
        console.log(e)
        //CAMBIAR ESTADO
        console.log("MEDIDA ENVIADA:")
        console.log(medida)
        const m = new medidasModel(medida)
        m.save(function(error){
            console.log(error)
        });

        return res.status(200).send({
            estado: "OK",
            msg: "Registro exitoso"
        });


    } catch (error) {

        return res.status(200).send({
            estado: "error",
            msg: "Algo sucedio"
        });

    }
})

exports.medidasApi = medidasApi;