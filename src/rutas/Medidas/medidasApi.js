const { Router } = require("express");
const { medidasModel } = require("../../modelos/medidasModel")
const medidasApi = Router();

medidasApi.post("/medidasServicio", async function(req, res){

    console.log("Entro a REGISTRAR la medida")

    try {
        const data = req.body

        const servicio = data.servicio

        const c = await medidasModel.find({ servicio, estado: "PAGADA" }).sort({_id:-1}).limit(1);

        console.log(c)

        console.log("Lectura actual:")
        console.log(data.lectura)
        console.log("Lectura anterior:")
        console.log(c[0].lectura)

        const conResultado = parseInt(data.lectura)-parseInt(c[0].lectura)
        console.log("Resultado:")
        console.log(conResultado)

        const dataM = {     
            servicio: data.servicio,
            lectura: data.lectura,
            fechaLectura: data.fechaLectura,
            consumo: conResultado,  //Esto se calcula
            unidad: data.unidad,
            anomalia: data.anomalia
        }

        const m = new medidasModel(dataM);
        m.save(function(error){
            console.log("entró a error de Medidas model")
        });

        return res.status(200).send({
            estado: "OK",
            msg: "Registro exitoso"
        });


    } catch (error) {


    }
})

exports.medidasApi = medidasApi;