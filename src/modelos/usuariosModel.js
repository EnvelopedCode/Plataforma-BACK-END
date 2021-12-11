//Aqui van usuarios en plataforma
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    cedula: {
        type: "string",
        required: true
    },
    nombre: {
        type: "string",
        required: true
    },
    apellido: {
        type: "string",
        required: true
    },
    contrasena: {
        type: "string",
        required: false
    },
    rol: {
        type: "string",
        required: true
    },
    estado: {
        type: "string",
        required: true
    }
});

const Model = mongoose.model("usuario", usuarioSchema);
exports.usuariosModel = Model;
