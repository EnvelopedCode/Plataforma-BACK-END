const {Router} = require("express");
const usuariosGestionApi = Router();
const {usuariosModel} = require("../../modelos/usuariosModel")

usuariosGestionApi.post("/usuariosGestion", async function(req, res){
    console.log("entró a usuariosGestionApi");
    try{
        console.log("USUARIOS GESTION")
        const { cedula } = req.body
        const c = await usuariosModel.findOne({cedula});
        console.log(c)

        if(c){
            return res.status(200).send({
                estado:"error",
                msg: "Usuario ya registrado en plataforma"
            })
        } else if(!c){

            const data = req.body
            const dataNew = {
                cedula: data.cedula,
                nombre: data.nombre,
                apellido: data.apellido,
                contrasena: data.contrasena,
                rol: data.rol,
                estado: "1"
            }
            const u = await new usuariosModel(dataNew);
            u.save(function(error){
                if(error){
                return res.status(500).send({
                    estado: "error",
                    msg: "ERROR: usuario NO guardado"}) 
                }
                return res.status(200).send({
                    estado: "ok", 
                    msg:"usuario Guardado"})
            })
        }

    }catch(error){
        return res.status(501).send({
            estado:"error",
            msg: "error en el servidor"
        })

    }

})

exports.usuariosGestionApi = usuariosGestionApi;