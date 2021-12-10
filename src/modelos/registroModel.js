const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registroModel = new Schema({
  nombre: {
    type: "string",
    required: true,
  },
  apellido: {
    type: "string",
    required: true,
  },
  contraseña: {
    type: "string",
    required: true,
  },
});

module.exports = mongoose.model("registro", registroModel);
