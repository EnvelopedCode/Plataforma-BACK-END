const { Router } =require("express");
const perfilDataApi = Router();
const { usuariosModel } = require("../../modelos/usuariosModel");

perfilDataApi.post("/perfilData", async function(req, res){
    console.log("entró a perfilData")

    try{

        const data = req.body
        const cedula = data.cedula
        const datos = await usuariosModel.findOne({ cedula })

        console.log(datos)
        
        return res.status(200).send({
            datos: datos
        })


    }catch(error){
        return res.status(500).send({
            estado: "algo sucedio en el servidor"
        })
    }

})

exports.perfilDataApi = perfilDataApi;