const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inspeccionSchema = new Schema({
    servicio: {
        type: "string",
        required: true
    },
    tecnico: {
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

const Model = mongoose.model("inspeccione", inspeccionSchema);
exports.inspeccionModel = Model;