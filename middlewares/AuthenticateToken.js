const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) return res.json({ error: "User not logged in hehehe!" });

  jwt.verify(token, process.env.SECRET_LOGIN_KEY, async (err, decoded) => {
    if (decoded) {
      return next();
    } else if (err) {
      return res.json({ error: err });
    }
  });
};

module.exports = authenticateToken;
