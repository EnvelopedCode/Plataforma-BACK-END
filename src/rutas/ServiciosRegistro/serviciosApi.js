const {Router} = require("express");
const { registroModel } = require("../../modelos/registroModel");
const { usuariosModel } = require("../../modelos/usuariosModel");
const { medidasModel } = require("../../modelos/medidasModel");

const serviciosApi = Router();


serviciosApi.post("/servicioRegistro", async function(req, res){
    try{
        console.log("------------------")
        console.log("SERVICIO REGISTRO")
        const { cedula } = req.body
        //Consulto si ya existe una cedula registrada en registroModel
        const c = await usuariosModel.findOne({ cedula });
        
        if(c === null) { //No existia la cedula

            //VOy a registrar un servicio y un usuario nuevo SIN contraseña y con estado 0 y rol cliente
            const dataS = req.body;
            dataS["servicio"] = dataS["cedula"]+"-"+"1"

            const dataU = {     
                cedula: dataS.cedula,
                nombre: dataS.nombre,
                apellido: dataS.apellido,
                contrasena: "",
                rol: "cliente",
                estado: "0"      
            }

            const dataM = { //Primera medida para primer servicio de cedula nueva
                servicio: dataS["servicio"],
                lectura: "0",
                fechaLectura: req.body.fecha,
                consumo: "0",
                unidad: "mc",
                anomalia: "Sin anomalias",
                estado: "PAGADA"
            }
             
            try {

                const s = new registroModel(dataS);
                s.save(function(error){
                    console.log("entro a error de servicio model")
                });
    
                const u = new usuariosModel(dataU);
                u.save(function(error){
                    console.log("entró a error de usuarios model")
                });

                const m = new medidasModel(dataM);
                m.save(function(error){
                    console.log("entro a error de medidas model")
                })


                return res.status(200).send({
                    estado: "OK",
                    msg: "Registro exitoso"
                });
                
            } catch (error) {
                
                return res.status(501).send({
                    estatus: "error",
                    msg: "Error del servidor"
                })
            }

        } else {//Ya existia la cedula
            console.warn("NUEVO SERVICIO MISMA CEDULA")

            //Asignar a variable el valor del ultimo ID servicio concatenado con la nueva suma de su ultimo fragmento
            const ultimoRegistro = await registroModel.find({ cedula }).sort({_id:-1}).limit(1);
            const ultimoServicio = ultimoRegistro[0].servicio.split("-"); // ["1000403193", "1"]
            const incrementador = ultimoServicio[0]+"-"+String(parseInt(ultimoServicio[1])+1)

            //Asignar esa variable devuelta a data
            const dataS = req.body
            dataS["servicio"] = incrementador
            
            //Enviar data a new
            const dataM = { //Primera medida para primer servicio de una cedula ya existente

                servicio: dataS["servicio"],
                lectura: "0",
                fechaLectura: req.body.fecha,
                consumo: "0",
                unidad: "mc",
                anomalia: "Sin anomalias",
                estado: "PAGADA"
            }

            const m = new medidasModel(dataM);
            m.save(function(error){
                console.log("entro a error de medidas model")
            })

            const registro = await new registroModel(dataS)
            
            registro.save(function(error){
                if(error){
                    return res.status(500).send({
                        estado: "error",
                        msg: "usuario No guardado"
                    })
                } 
                return res.status(200).send({
                    estado: "OK",
                    msg: "usuario guardado"
                })
            })

        }
        
    }catch(error){
        console.log("SERVICIO REGISTRO ERROR")
        return res
        .status(401)
        .send({ estado: "error", msg: "error no hizo el proceso", error });
    }
})

exports.serviciosApi = serviciosApi;