const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const { signupApi } = require("./rutas/Signup/signupApi");
const { validacionApi } = require("./rutas/Validacion/validacionApi");
const { serviciosApi } = require("./rutas/ServiciosRegistro/serviciosApi");
const { usuariosApi } = require("./rutas/ServiciosRegistro/usuariosApi");

app.use(cors()); //Middleware cors
app.use(express.json()); //Middleware json()

//api de prueba...
app.use("/hola", function (req, res) {
  res.send("Hola mundo!");
});

app.use("", validacionApi);
app.use("", serviciosApi); //Registro
app.use("", usuariosApi); //Busqueda cedula
app.use("", signupApi);

//conectarnos a mongoDb
mongoose
  .connect("mongodb://localhost:27017/caribe")
  .then((res) => console.log("conectado a base de datos Caribe"))
  .catch((err) => console.log("error:", err));

//puerto de conexion
app.listen(8080, function () {
  console.log("Servidor corriendo en el puerto 8080");
});