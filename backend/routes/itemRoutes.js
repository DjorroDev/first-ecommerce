const express = require("express");
const { ItemController, upload } = require("../controllers/ItemController");

const router = express.Router();

router.post("/items", upload.single("image"), ItemController.createItem);
router.get("/items", ItemController.getAllItems);

router.get("/items/:id", ItemController.getItemById);
router.get("/items/seller/:id", ItemController.getItemBySellerId);
router.put("/items/:id", upload.single("image"), ItemController.updateItem);
router.delete("/items/:id", ItemController.deleteItem);

module.exports = router;
