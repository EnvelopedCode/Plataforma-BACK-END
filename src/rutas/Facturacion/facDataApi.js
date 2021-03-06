const { Router } = require("express");
const { registroModel } = require("../../modelos/registroModel");
const { usuariosModel } = require("../../modelos/usuariosModel");
const facDataApi = Router();

facDataApi.post("/facData", async function(req, res){

    console.log("ENTRO FAC SERVICIO")

    try {
        const data = req.body;
        const cedula = data.cedula;
        console.log(cedula)
        const c = await usuariosModel.findOne({ cedula });
        console.log(c)
        if(c){
            return res.status(200).send({
                estado: "OK",
                nombre: c.nombre,
                apellido: c.apellido
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

exports.facDataApi = facDataApi;