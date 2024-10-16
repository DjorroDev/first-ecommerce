const User = require("../models/User");

const UserController = {
  createUser: (req, res) => {
    const { name, username, email, password, address, isAdmin, isSeller } = req.body;
    User.create(name, username, email, password, address, isAdmin, isSeller, (err, userId) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: "User created", userId });
    });
  },

  getUser: (req, res) => {
    const userId = req.params.id;
    User.findById(userId, (err, user) => {
      if (err || !user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    });
  },

  getUserAll: (req, res) => {
    User.getAll((err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: "All user", rows });
    });
  },

  updateUser: (req, res) => {
    const { name, username, email, password, address, isAdmin, isSeller } = req.body;
    User.create(name, username, email, password, address, isAdmin, isSeller, (err, userId) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: "User created", userId });
    });
  },

  deleteUser: (req, res) => {
    const userId = req.params.id;
    User.delete(userId, (err, user) => {
      if (err || !user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    });
  },
};
module.exports = UserController;
