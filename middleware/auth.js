const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // Check if token is in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get the token from header
      token = req.headers.authorization.split(" ")[1];

      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID and add to the request object
      req.user = await User.findById(decoded.id).select("-password"); // Don't send back the password
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
