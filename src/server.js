const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const { signupApi } = require("./rutas/Signup/signupApi");
const { validacionApi } = require("./rutas/Validacion/validacionApi");
const { serviciosApi } = require("./rutas/ServiciosRegistro/serviciosApi");
const { usuariosApi } = require("./rutas/ServiciosRegistro/usuariosApi");
const { loginApi } = require("./rutas/Login/loginApi");
const { gestionCedulaApi } = require("./rutas/ServiciosGestion/gestionCedulaApi");
const { gestionServicioApi } = require("./rutas/ServiciosGestion/gestionServicioApi");
const { usuariosGestionApi } = require("./rutas/usuariosGestion/usuariosGestionApi");
const { eliminarApi } = require("./rutas/usuariosGestion/eliminarApi");
const { parametrizacionApi } = require("./rutas/Parametrizacion/parametrizacionApi");
const { gInspeccionApi } = require("./rutas/Inspeccion/gInspeccionApi");
const { updateServicioApi } = require("./rutas/ServiciosGestion/updateServicioApi");
const { medidasApi } = require("./rutas/Medidas/medidasApi");
const { validarMedidaApi } = require("./rutas/Medidas/validarMedidaApi");
const { facServiciosApi } = require("./rutas/Facturacion/facServiciosApi");
const { facDataApi } = require("./rutas/Facturacion/facDataApi")
const { busquedaApi } = require("./rutas/Medidas/busquedaApi");
const { fechaValidarApi } = require("./rutas/Medidas/fechaValidarApi");
const { facInfoApi } = require("./rutas/Facturacion/facInfoApi");
const { validarServicioApi }  = require("./rutas/Inspeccion/validarServicioApi");
const { facLecturasApi } = require("./rutas/Facturacion/facLecturasApi");
const { validarTecnicoApi } = require("./rutas/Inspeccion/validarTecnicoApi")
const { tablaInspeccionApi } = require ("./rutas/Inspeccion/tablaInspeccionApi");
const { facItinerarioApi } = require("./rutas/Facturacion/facItinerarioApi");
const { facProximosApi } = require("./rutas/Facturacion/facProximosApi");

require("dotenv").config();

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
app.use("", loginApi);
app.use("", gestionCedulaApi);
app.use("", gestionServicioApi);
app.use("", usuariosGestionApi);
app.use("", eliminarApi);
app.use("", parametrizacionApi);
app.use("", gInspeccionApi);
app.use("", updateServicioApi);
app.use("", medidasApi);
app.use("", validarMedidaApi);
app.use("", facServiciosApi);
app.use("", busquedaApi);
app.use("", fechaValidarApi);
app.use("", facDataApi);
app.use("", facInfoApi);
app.use("", validarServicioApi);
app.use("", facLecturasApi);
app.use("", validarTecnicoApi);
app.use("", tablaInspeccionApi);
app.use("", facItinerarioApi);
app.use("", facProximosApi);

//conectarnos a mongoDb
mongoose
  .connect(process.env.SERVER_DB_URL)
  .then((res) => console.log("conectado a base de datos Caribe"))
  .catch((err) => console.log("error:", err));

//puerto de conexion
app.listen(8080, function () {
  console.log("Servidor corriendo en el puerto 8080");
});
