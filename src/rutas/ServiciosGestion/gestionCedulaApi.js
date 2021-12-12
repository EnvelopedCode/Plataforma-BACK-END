const { Router } = require("express");
const { usuariosModel } = require("../../modelos/usuariosModel");
const gestionCedulaApi = Router();

gestionCedulaApi.post("/gestionCedula", async function(req, res){
    try {
        console.log("ENTRO A GESTION CEDULA")
        const data = req.body;
        const cedula = data.cedula;
        const c = await usuariosModel.findOne({ cedula });
        console.log(c)
        if(c){
            return res.status(200).send({
                cedula: cedula
            })
        } else{
            return res.status(500).send({
                estado: "error",
                msg: "Cedula no encontrada"
            })
        }
        
    } catch (error) {
        return res.status(500).send({
            estado: "error",
            msg: "Error por parte del servidor"
        })
    }
})

exports.gestionCedulaApi = gestionCedulaApi;