const {Router} = require("express");
const { registroModel } = require("../modelos/registroModel");
const serviciosApi = Router();

serviciosApi.post("/servicioRegistro", async function(req, res){
    try{
        
        const data = req.body
        const cedula = data.cedula

        //Mover usuariosModel a registroModel X
        //Nota: Agregar campo 'ID servicio' a registroModel X
        
        //Consulto si ya existe una cedula registrada en registroModel
        const c = await registroModel.findOne({ cedula });
        console.warn(c)

        
        if(c === null) { //No existia la cedula

            console.log("CEDULA NUEVA PRIMER SERVICIO:")

            data.servicio = data.servicio + "-1"
            const registro = new registroModel(data)
            
            registro.save(function(error){
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

        } else {//Ya existia la cedula
            console.warn("NUEVO SERVICIO MISMA CEDULA:")

            //Asignar a variable el valor del ultimo ID servicio concatenado con la nueva suma de su ultimo fragmento
            const ultimoRegistro = await registroModel.find({ cedula }).sort({_id:-1}).limit(1);
            const ultimoServicio = ultimoRegistro[0].servicio.split("-");
            const incrementador = ultimoServicio[0]+"-"+String(parseInt(ultimoServicio[1])+1)

            //Asignar esa variable devuelta a data
            data["servicio"] = incrementador

            //Enviar data a new
            const registro = new registroModel(data)
            
            registro.save(function(error){
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

        }
        
    }catch(error){
        return res
        .status(401)
        .send({ estado: "error", msg: "error no hizo el proceso", error });

    }
})

exports.serviciosApi = serviciosApi;