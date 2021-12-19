const { Router } = require("express");
const { registroModel } = require("../../modelos/registroModel");
const facInfoApi = Router();

facInfoApi.post("/facInfo", async function(req, res){
    try {
        const data = req.body;
        const servicio = data.servicio;
        const c = await registroModel.findOne({ servicio });
        console.log(c)

        /*CALCULAR PROXIMA FACTURACION*/
        var dia = c["fecha"]
        var diaArreglo = dia.split("-")
        dia = diaArreglo[2]
        var mes = new Date().toLocaleDateString()
        console.log(mes)
        console.log(dia)

        var mesArreglo = mes.split("/")
        mes = parseInt(mesArreglo[0])+1
        año = parseInt(mesArreglo[2])
        mes = mes.toString()
        if(mes == "13"){
            mes = "01"
            año = año+1
            año.toString()
        }
        if(parseInt(mes) < 10 && mes.length === 1){
            mes = "0"+mes
        }

        c["fecha"] = año + "-" + mes + "-" + dia
        console.log(c)
        /*CALCULAR PROXIMA FACTURACION*/

        if(c){
            return res.status(200).send({
                estado: "OK",
                servicio: c
            })

        } else {
            return res.status(400).send({
                estado: "error",
                msg: "No hay servicios asignados"
            })
        }


    } catch (error) {
        
    }
})

exports.facInfoApi = facInfoApi;