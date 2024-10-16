// models/item.js
const db = require("../database/db");

class Item {
  static create(sellerId, title, store, price, stock, callback) {
    const query = `INSERT INTO items (sellerId, title, store, price, stock) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [sellerId, title, store, price, stock], function (err) {
      callback(err, this.lastID);
    });
  }

  static getAll(callback) {
    const query = `SELECT * FROM items`;
    db.all(query, [], (err, rows) => {
      callback(err, rows);
    });
  }

  static getById(id, callback) {
    const query = `SELECT * FROM items WHERE id = ?`;
    db.get(query, [id], (err, row) => {
      callback(err, row);
    });
  }

  static update(id, sellerId, title, store, price, stock, callback) {
    const query = `UPDATE items SET sellerId = ?, title = ?, store = ?, price = ?, stock = ? WHERE id = ?`;
    db.run(query, [sellerId, title, store, price, stock, id], function (err) {
      callback(err, this.changes);
    });
  }

  static delete(id, callback) {
    const query = `DELETE FROM items WHERE id = ?`;
    db.run(query, [id], function (err) {
      callback(err, this.changes);
    });
  }
}

module.exports = Item;
