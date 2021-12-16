const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inspeccionSchema = new Schema({
    tecnico: {
        type: "string",
        required: true
    },
    servicio: {
        type: "string",
        required: true
    },
    cedula: {
        type: "string",
        required: true
    },
    nombre: {
        type: "string",
        required: true
    },
    direccion: {
        type: "string",
        required: true
    },
    fecha: {
        type: "string",
        required: true
    },
    hora: {
        type: "string",
        required: true
    }
});

const Model = mongoose.model("inspeccion", inspeccionSchema);
exports.inspeccionModel = Model;