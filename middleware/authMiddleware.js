const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user in MySQL using Sequelize
      const user = await User.findByPk(decoded.id, {
        attributes: { exclude: ["password"] }, // exclude password
      });

      if (!user) {
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "No token, authorization denied" });
  }
};

module.exports = { protect };
