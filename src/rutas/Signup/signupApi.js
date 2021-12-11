const { Router } = require("express");
const signupApi = Router();
const { usuariosModel } = require("../../modelos/usuariosModel");

signupApi.post("/signup", function (req, res) {
  console.log("entró a signup");
  try {
    const data = req.body;
    const registro = new usuariosModel(data);
    console.log(registro);
    registro.save(function(error){
        if(error){
            return res.status(500).send({
                estado:"error",
                msg:"usuario No registrado"
            })
        }
        return res.status(200).send({
            estado: "error",
            msg: "usuario registrado"
        })
    })
  } catch (error) {
    return res.status(401).send({
      estado: "error",
      msg: "error, no hizo el proceso",
      error,
    });
  }
});

exports.signupApi = signupApi;
