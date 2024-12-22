const jsonwebtoken = require("jsonwebtoken");

const auth = (req, res, next) => {
  const accessToken = req.headers.authorization.replace("Bearer ", "");
  try {
    const jwt_payload = jsonwebtoken.verify(accessToken, process.env.jws);
    req.user = jwt_payload;
  } catch (e) {
    res.status(401).json({
      status: "failed",
      message: "unauthorized user",
    });

    return;
  }

  next();
};

module.exports = auth;
