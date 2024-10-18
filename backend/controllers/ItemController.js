const Item = require("../models/Item");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp to avoid conflicts
  },
});

const upload = multer({ storage: storage });

//Creating Controller methods
const ItemController = {
  createItem: (req, res) => {
    const { sellerId, title, desc, store, price, stock } = req.body;
    const image = req.file ? req.file.filename : "nopic.jpg";

    Item.create(sellerId, title, desc, store, price, stock, image, (err, itemId) => {
      if (err) return res.status(500).json({ error: "Failed to create item" });
      res.status(201).json({ message: "Item created successfully", itemId });
    });
  },

  getAllItems: (req, res) => {
    Item.getAll((err, items) => {
      if (err) return res.status(500).json({ error: "Failed to retrieve items" });
      res.status(200).json(items);
    });
  },

  getItemBySellerId: (req, res) => {
    const { id } = req.params;
    Item.getBySellerId(id, (err, items) => {
      if (err) return res.status(500).json({ error: "Failed to retrieve items" });
      res.status(200).json(items);
    });
  },

  getItemById: (req, res) => {
    const { id } = req.params;

    Item.getById(id, (err, item) => {
      if (err) return res.status(500).json({ error: "Failed to retrieve item" });
      if (!item) return res.status(404).json({ error: "Item not found" });
      res.status(200).json(item);
    });
  },

  updateItem: (req, res) => {
    const { id } = req.params;
    const { sellerId, title, desc, store, price, stock } = req.body;
    const image = req.file ? req.file.filename : null;

    Item.getById(id, (err, item) => {
      if (err) return res.status(500).json({ error: "Failed to retrieve item" });
      if (!item) return res.status(404).json({ error: "Item not found 1" });

      const oldImage = item.image;

      // If a new image is uploaded and an old image exists, delete the old image
      // and make sure it's not the placeholder picture
      if (image && oldImage) {
        if (oldImage !== "nopic.jpg") {
          const oldImagePath = path.join(__dirname, "..", "uploads", oldImage);
          fs.unlink(oldImagePath, (err) => {
            if (err) console.error("Failed to delete old image:", err);
          });
        }
      }

      // Use the new image if uploaded, otherwise keep the old image
      const imageToUpdate = image || oldImage;

      Item.update(id, sellerId, title, desc, store, price, stock, imageToUpdate, (err, changes) => {
        if (err) return res.status(500).json({ error: "Failed to update item" });
        if (changes === 0) {
          console.log("No rows affected. Data may be the same as existing data.");
          return res
            .status(200)
            .json({ message: "No changes made. Data is the same as existing data." });
        }

        res.status(200).json({ message: "Item updated successfully" });
      });
    });
  },

  deleteItem: (req, res) => {
    const { id } = req.params;

    Item.getById(id, (err, item) => {
      if (err) return res.status(500).json({ error: "Failed to retrieve item" });
      if (!item) return res.status(404).json({ error: "Item not found" });

      if (item.image && item.image !== "nopic.jpg") {
        const imagePath = path.join(__dirname, "..", "uploads", item.image);
        fs.unlink(imagePath, (err) => {
          if (err) console.error("Failed to delete image:", err);
        });
      }

      Item.delete(id, (err, changes) => {
        if (err) return res.status(500).json({ error: "Failed to delete item" });
        if (changes === 0) return res.status(404).json({ error: "Item not found" });
        res.status(200).json({ message: "Item deleted successfully" });
      });
    });
  },
};

module.exports = { ItemController, upload };
