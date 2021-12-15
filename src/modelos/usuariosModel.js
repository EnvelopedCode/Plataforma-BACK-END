//Aqui van usuarios en plataforma
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { genSalt, hash } = require("bcrypt");

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


usuarioSchema.pre("save", async function (next) {
  const salt = await genSalt(10);
  this.contrasena = await hash(this.contrasena, salt);
  next();
});

const Model = mongoose.model("usuario", usuarioSchema);
exports.usuariosModel = Model;
