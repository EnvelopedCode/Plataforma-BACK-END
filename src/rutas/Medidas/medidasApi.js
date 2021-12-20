const { Router } = require("express");
const { medidasModel } = require("../../modelos/medidasModel")
const { parametrizacionModel } = require("../../modelos/parametrizacionModel");
const { registroModel } = require("../../modelos/registroModel")
const medidasApi = Router();

medidasApi.post("/medidasServicio", async function(req, res){

    //NOTA DE DISEÑO: Al ingresarse una medida no habra que preocuparse por la fecha, la fecha del registro de medida y la validacion del estado del servicio deben de estar en sincronia con el dia de HOY para poder funcionar correctamente, puesto que; si la fecha de hoy es modificada de forma que coincida con una fecha de ingreso de medida PERO la fecha configurada en el registro de la medida es la de hoy: el sistema en dicho caso no hara validacion de una segunda insercion el mismo dia


    console.log("Entro a REGISTRAR la medida")// Creamos medida de un servicio ya existente

    try {

        const dataM = req.body;
        const servicio = dataM.servicio

        const c = await medidasModel.find({ servicio, estado: "PAGADA" }).sort({_id:-1}).limit(1);

        //CONVERSION
        const operando1 = parseFloat(dataM.lectura) //Lectura nueva
        const operando2 = parseFloat(c[0].lectura) //Ultima lectura
        const conResultado = (operando1-operando2).toFixed(2)
        var nuevaResultado = conResultado.toString()
        //CONVERSION

        //CALCULAR VALOR

        //DATOS DE ENTRADA: Parametrizaciones y Medicion
        //DATOS DE SALIDA: variable llamada valor con el resultado de los calculos
        //REQUERIMIENTOS: Hacer Fetch y usar condicionales para subsidios negativos
        var valor = 0;

        const sP = await registroModel.findOne({ servicio }); //Me traigo el servicio para sacar el estrato
        const estrato = sP.estrato
        const p = await parametrizacionModel.findOne({ estrato }); //Le paso el estrato
        console.log("Datos de entrada:")
        console.log(p.valorUnidad)
        console.log(dataM.lectura)
        //Calculo el valor por metro cubico
        const valorUnidad = p.valorUnidad
        var m3 = valorUnidad*dataM.lectura
        console.log("Coste M3:")
        console.log(m3)

        //Calculo el impuesto (valor a sumarle a M3)
        const valorImpuesto = p.impuesto
        const m3impuesto = valorImpuesto/100*m3
        console.log("a M3 se le debe sumar en impuestos:")
        console.log(m3impuesto)

        //Calcular el subsidio (valor al cual hay que validar si se le resta o se le suma a M3 (si es positivo o negativo))
        const valorSubsidio = parseInt(p.subsidio)
        console.log("Subsidio de M3:")
        console.log(valorSubsidio)
        var m3subsidio = 0;

        if(valorSubsidio<0){
            let subsidioPositivo = Math.abs(valorSubsidio)  
            m3subsidio = subsidioPositivo/100*m3
            console.log("a M3 se le debe sumar por subsidio:")
            console.log(m3subsidio)
            //Aqui se hace la suma de m3(valorUnidad) + m3impuesto + m3subsidio
            valor = (m3 + m3impuesto + m3subsidio + 0.00).toFixed(2)
            valor = valor.toString()
            valor = "$"+valor

        } else{
            //Aqui se hace la resta de m3(valorUnidad) + m3impuesto - m3subsidio
            m3subsidio = valorSubsidio/100*m3
            console.log("a M3 se le debe restar por subsidio:")
            valor = (m3 + m3impuesto-m3subsidio).toFixed(2)
            valor = valor.toString()
            valor = "$"+valor
            console.log(valor)
        }
         
        //CALCULAR VALOR
        

        const medida = {
            "servicio": dataM.servicio,
            "lectura": dataM.lectura,
            "fechaLectura": dataM.fechaLectura,
            "consumo": nuevaResultado,
            "unidad": dataM.unidad,
            "anomalia": dataM.anomalia,
            "valor": valor
        }

        //CAMBIAR ESTADO
        const e = await medidasModel.find({ servicio, estado: "SIN PAGAR" })
        console.log(e)

        for(let medida in e){
            let resultado = e[medida].estado = "ACUMULADO"
            const nuevo = Object.assign(e[medida], resultado); //IZQUIERDA: documento viejo, DERECHA: documento nuevo
  
            nuevo.save(function(error){
                console.log(error)
            })
        }

        console.log("DESPUES")
        console.log(e)
        //CAMBIAR ESTADO
        console.log("MEDIDA ENVIADA:")
        console.log(medida)
        const m = new medidasModel(medida)
        m.save(function(error){
            console.log(error)
        });

        console.warn("EVALUAR:")
        console.log(m)

        return res.status(200).send({
            estado: "OK",
            msg: "Registro exitoso"
        });


    } catch (error) {

        return res.status(200).send({
            estado: "error",
            msg: "Algo sucedio"
        });

    }
})

exports.medidasApi = medidasApi;