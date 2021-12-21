const { verify } = require("jsonwebtoken");

const authorizationApi = (req, res, next) => {
  const authorization = req.headers.authorization;
  console.warn(authorization);
  if (!authorization) {
    return res.status(403).json({ estado: "error", msg: "NO AUTORIZADO no trajo autorizacion" });
  }
  try {
    const token = authorization.split(" ")[1];
    payload = verify(token, process.env.JWT_SECRET_KEY);

    if (!payload.rol === "Analista" ) {
      return res.status(403).json({ estado: "error", msg: "no autorizado, por no ser analista" });
    }
  } catch (error) {
    return res.status(403).json({ estado: "error", msg: "NO AUTORIZADO por error" });
  }
  return next();
};

exports.authorizationApi = authorizationApi;