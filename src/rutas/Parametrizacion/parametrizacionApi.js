const { Router } = require("express");
const { parametrizacionModel } = require("../../modelos/parametrizacionModel");
const parametrizacionApi = Router();

parametrizacionApi.post("/parametrizacion", async function (req, res) {

  console.log("entró a parametrizacion");
  try {
    const data = req.body;
    console.log(data);
    const { estrato, valorUnidad, impuesto, subsidio } = req.body;
    console.log(estrato);
    if (estrato == "1") {
      console.log("entró a estrato 1");
      await parametrizacionModel.updateOne(
        { estrato },
        { $set: { valorUnidad, impuesto, subsidio } }
      );
      return res.status("200").send({
        estado: "ok",
        msg: " actualizado correctamente",
      });
    } else if (estrato == "2") {
      console.log("entró a estrato 2");
      await parametrizacionModel.updateOne(
        { estrato },
        { $set: { valorUnidad, impuesto, subsidio } }
      );
      return res.status("200").send({
        estado: "ok",
        msg: " actualizado correctamente",
      });
    } else if (estrato == "3") {
      console.log("entró a estrato 3");
      await parametrizacionModel.updateOne(
        { estrato },
        { $set: { valorUnidad, impuesto, subsidio } }
      );
      return res.status("200").send({
        estado: "ok",
        msg: " actualizado correctamente",
      });
    } else if (estrato == "4") {
      console.log("entró a estrato 3");
      await parametrizacionModel.updateOne(
        { estrato },
        { $set: { valorUnidad, impuesto, subsidio } }
      );
      return res.status("200").send({
        estado: "ok",
        msg: " actualizado correctamente",
      });
    } else if (estrato == "5") {
      console.log("entró a estrato 5");
      await parametrizacionModel.updateOne(
        { estrato },
        { $set: { valorUnidad, impuesto, subsidio } }
      );
      return res.status("200").send({
        estado: "ok",
        msg: " actualizado correctamente",
      });
    } else {
      return res.status("200").send({
        estado: "error",
        msg: "no actulizó los parametros",
      });
    }
  } catch (error) {
    return res.status(500).send({
      estado: "error",
      msg: "Error por parte del servidor",
    });
  }
});

exports.parametrizacionApi = parametrizacionApi;
