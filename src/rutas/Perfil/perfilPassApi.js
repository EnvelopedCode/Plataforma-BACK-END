const { Router } =require("express");
const perfilPassApi = Router();
const { usuariosModel } = require("../../modelos/usuariosModel");

perfilPassApi.post("/perfilPass", async function(req, res){
    console.log("entró a perfilPass")
    try{
        const data = req.body;
        const { cedula } = req.body;
        const c = await usuariosModel.findOne({ cedula })
      
        const dataN = {
            cedula : c.cedula,
            nombre : c.nombre,
            apellido : c.apellido,
            contrasena : data.nueva,
            estado : c.estado

        }

        const nuevo = Object.assign(c, dataN); //Posible error: data y C tienen JSONS de estructura diferente, hay que armar data de forma que tenga los mismo campos que C y luego hacer el update, recordar: los campos deben llamarse igual

        nuevo.save(function(error){
            console.log("entró a error de usuarios model")
        });
        
        return res.status(200).send({
            estado: "OK"
        })

    }catch(error){
        return res.status(501).send({
            estado:"error",
            msg: "error en el servidor"
        })
    }

})

exports.perfilPassApi = perfilPassApi;