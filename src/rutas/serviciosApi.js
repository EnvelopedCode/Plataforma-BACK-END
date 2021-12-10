const {Router} = require("express");
const { usuariosModel } = require("../modelos/usuariosModel");
const serviciosApi = Router();

serviciosApi.post("/servicioRegistro", function(req, res){
    try{
        // const { cedula, nombre, apellido, departamento, municipio, direccion, barrio, estrato, fecha } = req.body;
        const data = req.body
        console.warn("ENTRO A DATA")
        console.log(data)

        //Nota: Agregar campo 'ID servicio' a registroModel

        //Consulto si ya existe una cedula registrada
        //si existe me traigo la ID del servicio
        // si NO existe LE CREO una ID de servicio con la misma cedula
        //Si no existe la cedula en registroModel no le sumo nada a la ID
        
        const registro = new usuariosModel(data)
        console.log("transformó datos al modelo")

        registro.save(function(error){
            console.log("entró a save")
            if(error){
                return res.status(500).send({
                    estado: "error",
                    msg: "usuario No guardado"
                })
            } 
            return res.status(200).send({
                estado: "error",
                msg: "usuario guardado"
            })
        })
        console.log("-----------------------------");
    }catch(error){
        return res
        .status(401)
        .send({ estado: "error", msg: "error no hizo el proceso", error });

    }
})

exports.serviciosApi = serviciosApi;