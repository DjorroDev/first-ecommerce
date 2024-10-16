const Item = require("../models/Item");

//Creating Controller methods
const ItemController = {
  createItem: (req, res) => {
    const { sellerId, title, store, price, stock } = req.body;

    Item.create(sellerId, title, store, price, stock, (err, itemId) => {
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
    const { sellerId, title, store, price, stock } = req.body;

    Item.update(id, sellerId, title, store, price, stock, (err, changes) => {
      if (err) return res.status(500).json({ error: "Failed to update item" });
      if (changes === 0) return res.status(404).json({ error: "Item not found" });
      res.status(200).json({ message: "Item updated successfully" });
    });
  },

  deleteItem: (req, res) => {
    const { id } = req.params;

    Item.delete(id, (err, changes) => {
      if (err) return res.status(500).json({ error: "Failed to delete item" });
      if (changes === 0) return res.status(404).json({ error: "Item not found" });
      res.status(200).json({ message: "Item deleted successfully" });
    });
  },
};

module.exports = ItemController;
