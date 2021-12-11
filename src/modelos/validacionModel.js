const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cedulaSchema = new Schema({
  cedula: {
    type: "string",
    required: true,
  },
});

const Model = mongoose.model("buscar", cedulaSchema);
exports.validacionModel = Model;
