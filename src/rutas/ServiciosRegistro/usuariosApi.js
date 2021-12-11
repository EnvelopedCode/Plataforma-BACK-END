const {Router} = require("express");
const { usuariosModel } = require("../../modelos/usuariosModel");
const usuariosApi = Router();

usuariosApi.post("/usuariosBusqueda", async function(req, res){
    console.log("--------------------------")
    console.log("entró a servicioBusqueda")
    try {
        console.log("SERVICIO BUSQUEDA")
        const { cedula } = req.body;
        const c = await usuariosModel.findOne({ cedula });
        console.log(c)
        console.log(c.nombre)
        if(c){
            return res.status(200).send({
                estado: "OK",
                msg: "cedula encontrada en usuariosModel",
                nombre: c.nombre,
                apellido: c.apellido
             })
        }else{
            return res.status(401).send({ 
                estado: "error", 
                msg: "no encontrado en servicios" 
            });
        }  
    } catch (error) {
        return res.status(501).send({
            estado: "error",
            msg: "Error en el servidor"
        })
    }
});

exports.usuariosApi = usuariosApi;
