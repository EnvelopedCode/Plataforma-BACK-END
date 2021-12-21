const { Router } = require("express");
const signupApi = Router();
const { usuariosModel } = require("../../modelos/usuariosModel");

signupApi.post("/signup", async function (req, res) {
  console.log("entró a signup");
  // const estado = "1";
  try {
    // const { cedula, contrasena } = req.body;
    const data = req.body;
    console.log("EVALUAR")
    console.log(data);

    const { cedula } = req.body;
    const c = await usuariosModel.findOne({ cedula });

    console.log(c)
    console.log("EVALUAR")

    const nuevo = Object.assign(c, data);
    console.log("esto es el nuevo")
    console.warn(nuevo);
    nuevo.save(function(error){
      if(error){
        return res.status(500).send({ estado: "error", msg: "usuario No registrado" });
      }
        return res.status(200).send({ estado: "ok", msg: "usuario registrado" });
    })
    console.log("pasó");

  } catch (error) {
    return res.status(401).send({
      estado: "error",
      msg: "error, no hizo el proceso",
      error,
    });
  }
});

exports.signupApi = signupApi;


// const { Router } = require("express");
// const signupApi = Router();
// const { usuariosModel } = require("../../modelos/usuariosModel");

// signupApi.post("/signup",  async function (req, res) {
//   console.log("entró a signup");
//   const estado = "1";
//   try {
//     const { cedula, contrasena } = req.body;
//     const resultado =  await usuariosModel.updateOne({ cedula }, {$set: { contrasena, estado }})
//     if(resultado.acknowledged === true){
//       return res.status("200").send({
//         estado: "ok",
//         msg: "Registrado correctamente"
//       })
//     } else if(resultado.acknowledged === false){
//       return res.status("400").send({
//         estado: "error",
//         msg: "Algo ha fallado en el registro"
//       })
//     }
    
//   } catch (error) {
//     return res.status(401).send({
//       estado: "error",
//       msg: "error, no hizo el proceso",
//       error,
//     });
//   }
// });

// exports.signupApi = signupApi;
