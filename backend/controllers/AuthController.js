const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const AuthController = {
  register: async (req, res) => {
    const { name, username, email, password, address, isAdmin, isSeller } = req.body;

    try {
      // Create user in the database and default admin as false
      User.create(name, username, email, password, address, 0, isSeller, (err, userId) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        // Create a JWT token upon successful registration
        const token = jwt.sign({ userId, isAdmin, isSeller }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        res.status(201).json({ message: "User registered successfully", token, userId });
      });
    } catch (error) {
      res.status(500).json({ error: "Error during registration" });
    }
  },

  login: (req, res) => {
    const { username, password } = req.body;

    User.findByUsername(username, async (err, user) => {
      if (err || !user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, isAdmin: user.isAdmin, isSeller: user.isSeller },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      // Return token
      res
        .status(200)
        .json({ token, userId: user.id, isAdmin: user.isAdmin, isSeller: user.isSeller });
    });
  },

  logout: (req, res) => {
    res.status(200).json({ message: "Logout successful" });
  },

  verify: (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(500).json({ error: "Failed to authenticate token" });
      }

      req.userId = decoded.userId;
      req.isAdmin = decoded.isAdmin;
      req.isSeller = decoded.isSeller;
      next();
    });
  },
};

module.exports = AuthController;
