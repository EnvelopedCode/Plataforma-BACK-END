const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medidasSchema = new Schema({
    servicio: {
        type: "string",
        required: true
    },
    lectura: {
        type: "string",
        required: true
    },
    fechaLectura: {
        type: "string",
        required: true
    },
    consumo: { 
        type: "string",
        required: true
    },
    unidad: {
        type: "string",
        required: true
    },
    anomalia: {
        type: "string",
        required: true
    },
    estado: {
        type: "string",
        default: "SIN PAGAR",
        required: true
    },
    valor: {
        type: "string",
        default: "$0",
        required: true
    }
});

const Model = mongoose.model("medidas", medidasSchema);
exports.medidasModel = Model;