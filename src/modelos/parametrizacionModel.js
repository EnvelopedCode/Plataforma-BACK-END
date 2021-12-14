const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parametrizacionSchema = new Schema({
  estrato: {
    type: "string",
    required: true,
  },
  valorUnidad: {
    type: "string",
    required: true,
  },
  impuesto: {
    type: "string",
    required: true,
  },
  subsidio: {
    type: "string",
    required: false,
  },
});

const parametrizacionModel = mongoose.model(
  "parametrizacions",
  parametrizacionSchema
);
exports.parametrizacionModel = parametrizacionModel;