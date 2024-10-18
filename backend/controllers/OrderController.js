const Order = require("../models/Order");

const OrderController = {
  createOrder: (req, res) => {
    const { buyerId, payment, cartItems } = req.body;

    Order.create(buyerId, payment, cartItems, (err, transactionId) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: "Transactions suceed", transactionId });
    });
  },

  getOrdersBySellerId: (req, res) => {
    const sellerId = req.params.id;
    Order.getOrderBySellerId(sellerId, (err, orders) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: "orders", orders });
    });
  },

  // using post prevent other users
  getTransactionsByBuyerId: (req, res) => {
    const id = req.params.id;
    Order.getTransactionByBuyerId(id, (err, transactions) => {
      if (err) return res.status(500).json({ error: "Failed to retrieve items" });
      res.status(200).json(transactions);
    });
  },

  getOrdersByTransactionId: (req, res) => {
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
