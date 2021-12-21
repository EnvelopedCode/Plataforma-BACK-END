const { Router } =require("express");
const perfilGestionApi = Router();
const { usuariosModel } = require("../../modelos/usuariosModel");

perfilGestionApi.post("/perfilNombre", async function(req, res){
    console.log("entró a perfilGestion")
    try{
        // const data = req.body;
        const { cedula, nombre, apellido } = req.body   
        await usuariosModel.updateOne({ cedula }, {$set: {nombre, apellido}});
        return res.status("200").send({
            estado: "ok",
            msg: " nombre y apellido actualizado correctamente"
        })

    }catch(error){
        return res.status(501).send({
            estado:"error",
            msg: "error en el servidor"
        })
    }

})

exports.perfilGestionApi = perfilGestionApi;