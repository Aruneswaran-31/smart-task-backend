const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json("No token, authorization denied");
  }

  try {
    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, "jwtSecretKey");
    req.user = decoded; // 🔥 user id comes from token
    next();
  } catch (err) {
    res.status(401).json("Token is not valid");
  }
};
