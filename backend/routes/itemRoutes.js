const express = require("express");
const ItemController = require("../controllers/ItemController");

const router = express.Router();

router.post("/items", ItemController.createItem);
router.get("/items", ItemController.getAllItems);

router.get("/items/:id", ItemController.getItemById);
router.put("/items/:id", ItemController.updateItem);
router.delete("/items/:id", ItemController.deleteItem);

module.exports = router;
