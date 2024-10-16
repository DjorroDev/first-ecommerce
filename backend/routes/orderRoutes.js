const express = require("express");
const OrderController = require("../controllers/OrderController");

const router = express.Router();

router.post("/orders", OrderController.createOrder);

router.get("/orders/seller/:sellerId");

router.get("/transactions/:id", OrderController.findByTransactionId);

module.exports = router;
