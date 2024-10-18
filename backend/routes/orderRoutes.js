const express = require("express");
const OrderController = require("../controllers/OrderController");

const router = express.Router();

router.post("/orders", OrderController.createOrder);

router.get("/orders/seller/:id", OrderController.getOrdersBySellerId);

router.get("/transactions/:id", OrderController.getOrdersByTransactionId);

router.get("/transactions/buyer/:id", OrderController.getTransactionsByBuyerId);

module.exports = router;
