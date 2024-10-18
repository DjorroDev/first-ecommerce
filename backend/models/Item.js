// models/item.js
const db = require("../database/db");

class Item {
  static create(sellerId, title, desc, store, price, stock, image, callback) {
    const query = `INSERT INTO items (sellerId, title, desc, store, price, stock, image) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.run(query, [sellerId, title, desc, store, price, stock, image], function (err) {
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

  static getBySellerId(id, callback) {
    const query = `SELECT * FROM items WHERE sellerId = ?`;
    db.all(query, [id], (err, rows) => {
      callback(err, rows);
    });
  }

  static update(id, sellerId, title, desc, store, price, stock, image, callback) {
    const query = `UPDATE items SET sellerId = ?, title = ?, desc = ?, store = ?, price = ?, stock = ?, image = ? WHERE id = ?`;
    db.run(query, [sellerId, title, desc, store, price, stock, image, id], function (err) {
      // console.log(this.c)
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
