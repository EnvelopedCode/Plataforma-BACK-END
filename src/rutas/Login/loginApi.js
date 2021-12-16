const { compare } = require("bcrypt");
const { Router } = require("express");
const { usuariosModel } = require("../../modelos/usuariosModel");
const loginApi = Router();
const { sign } = require("jsonwebtoken");
require("dotenv").config();

loginApi.post("/login", async function (req, res){
    try{
        console.log("Llego a backend /login");
        const data = req.body;
        const cedula = data.cedula;
        const contrasena = data.contrasena;
        const usuario = await usuariosModel.findOne({ cedula });
        const passOK = await compare(contrasena, usuario.contrasena);
        if (passOK) {
            var url = "";
            const token = sign(
                {
                    cedula: usuario.cedula,
                    rol: usuario.rol
                },
                process.env.JWT_SECRET_KEY
            )

            if(usuario.rol === "cliente"){
                url = "/ServiciosRegistro"

            } else if(usuario.rol === "Analista"){
                url ="/ServiciosRegistro"
                
            } else if(usuario.rol === "Tecnico"){
                url="/ServiciosRegistro"
            }
            
            return res.status(200).send({
                estado: "ok",
                msg: "logueado",
                token,
                rol: usuario.rol,
                url: url
            });
        } else{
            return res.status(500).send({
            estado: "error",
            msg: "Credenciales no validas",
            });

        }
    }catch(error){
        return res.status(401).send({ estado: "error", msg: "Credenciales no válidas", error });
    }
   

    //Ya todo esta listo, validar contraseña
})

exports.loginApi = loginApi;




// const { compare } = require("bcrypt");
// const { Router } = require("express");
// const { usuariosModel } = require("../../modelos/usuariosModel");
// const loginApi = Router();
// const { sign } = require("jsonwebtoken");

// loginApi.post("/login", async function (req, res){
//     try{
//         console.log("Llego a backend /login");
//         const data = req.body;
//         const cedula = data.cedula;
//         const contrasena = data.contrasena;
//         const usuario = await usuariosModel.findOne({ cedula });
//         const passOK = await compare(contrasena, usuario.contrasena);
//         console.warn(usuario);
//         console.warn(cedula);
//         console.warn(usuario.rol)
//         console.warn(passOK)
//         if (passOK) {
//         return res.status(200).send({
//             estado: "ok",
//             msg: "logueado",
//             rol: usuario.rol
//         });
//         } else{
//             return res.status(500).send({
//             estado: "error",
//             msg: "Credenciales no validas",
//             });

//         }
//     }catch(error){
//         return res.status(401).send({ estado: "error", msg: "Credenciales no válidas", error });
//     }
   

//     //Ya todo esta listo, validar contraseña
// })

// exports.loginApi = loginApi;