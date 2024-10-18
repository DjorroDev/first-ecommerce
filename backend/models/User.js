const db = require("../database/db");
const bcrypt = require("bcrypt");

class User {
  static async create(name, username, email, password, address, isAdmin, isSeller, callback) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
          INSERT INTO users (name, username, email, password, address, isAdmin, isSeller) 
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
    db.run(
      query,
      [name, username, email, hashedPassword, address, isAdmin, isSeller],
      function (err) {
        callback(err, this.lastID); // Returns the last inserted user ID
      }
    );
  }

  static findByUsername(username, callback) {
    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
      callback(err, row);
    });
  }

  static findById(userId, callback) {
    db.get(`SELECT * FROM users WHERE id = ?`, [userId], (err, row) => {
      callback(err, row);
    });
  }

  static update(id, name, email, password, isAdmin, isSeller, address, username, callback) {
    const query = `UPDATE users 
                   SET name = ?, email = ?, password = ?, isAdmin = ?, isSeller = ?, address = ?, username = ? 
                   WHERE id = ?`;
    db.run(
      query,
      [name, email, password, isAdmin, isSeller, address, username, id],
      function (err) {
        callback(err, this.changes); // Returns number of rows affected
      }
    );
  }

  static delete(id, callback) {
    const query = `DELETE FROM users WHERE id = ?`;
    db.run(query, [id], function (err) {
      callback(err, this.changes);
    });
  }

  static getAll(callback) {
    const query = `SELECT * FROM users`;
    db.all(query, [], (err, rows) => {
      callback(err, rows);
    });
  }
}

module.exports = User;
