const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registroSchema = new Schema({
  cedula:{
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
  departamento: {
    type: "string",
    required: true
  },
  municipio: {
    type: "string",
    required: true
  },
  direccion: {
    type: "string",
    required: true
  },
  barrio: {
    type: "string",
    required: true
  },
  estrato: {
    type: "string",
    required: true
  },
  fecha: {
    type: "string",
    required: true
  },
  servicio: {
    type: "string",
    required: true,
    unique: true
  }

});

const Model = mongoose.model("servicio", registroSchema);
exports.registroModel = Model;
