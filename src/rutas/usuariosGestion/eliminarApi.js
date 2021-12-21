const {Router} = require("express");
const eliminarApi = Router();
const { usuariosModel } = require("../../modelos/usuariosModel");

eliminarApi.post("/eliminar", async function(req, res){
    console.log("entró a eliminar")
    try{
        const { cedula } = req.body
        const { validar } = req.body
        const c = await usuariosModel.findOne({ cedula })   
        console.log(cedula)
        console.log(validar)
        if(c){

            if(c.rol != "cliente"){

                if(validar != cedula){

                    console.log("entró a verificar el estado");
                    console.log(cedula)
                    console.log(c.rol)
                    const d = await usuariosModel.deleteOne({ cedula })
                    console.log(d)
                    return res.status(200).send({
                        estado: "ok",
                        msg: "Usuario Eliminado"
                    })//se puede eliminar

                }else{
                    return res.status(200).send({
                        estado: "igual"
                    })

                }
               
            }else{
                return res.status(500).send({
                    estado: "error",
                    msg: "No se pueden eliminar clientes"
                })    
                //no se puede eliminar
            }

        } else if(!c){

            return res.status(500).send({
                estado: "error",
                msg: "cedula no encontrada en plataforma"
            })
            //no se encontró el base de datos al cedula

        }
    } catch(error){
        return res.status(501).send({
            estado: "error",
            msg:"error en el servidor"
        })

    }


})

exports.eliminarApi = eliminarApi;