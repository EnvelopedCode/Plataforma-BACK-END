const {Router} = require("express");
const usuariosGestionApi = Router();
const {usuariosModel} = require("../../modelos/usuariosModel")

usuariosGestionApi.post("/usuariosGestion", async function(req, res){
    
    try{
        console.log("USUARIOS GESTION")
        var { cedula } = req.body
        var { rol } = req.body
        const c = await usuariosModel.findOne({ cedula });


        if(c){ //Esta cedula ya contaba con una cuenta en la plataforma

            if(c.rol !== rol){ //La cuenta ingresada tiene un rol nuevo

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
    
            } else if(c.rol === rol){ //La cuenta ingresada tiene un rol que ya tenia
    
                return res.status(200).send({
                    estado:"error",
                    msg: "Usuario interno ya registrado en plataforma"
                })
    
            }

        }else { //Esta cedula esta registrandose por primera vez como usuario interno

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