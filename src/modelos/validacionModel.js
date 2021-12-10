const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cedulaSchema = new Schema({
  cedula: {
    type: "string",
    required: true,
  },
});

const validacionModel = mongoose.model("buscar", cedulaSchema);
exports.validacionModel = validacionModel;
