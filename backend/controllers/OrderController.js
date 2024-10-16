const Order = require("../models/Order");

const OrderController = {
  createOrder: (req, res) => {
    const { buyerId, cartItems } = req.body;

    Order.create(buyerId, cartItems, (err, transactionId) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: "Transactions suceed", transactionId });
    });
  },

  findByTransactionId: (req, res) => {
    const transactionId = req.params.id;
    Order.findByTransactionId(transactionId, (err, orders) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: "orders", orders });
    });
  },
};

module.exports = OrderController;
