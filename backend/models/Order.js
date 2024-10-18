const db = require("../database/db");

class Order {
  static create(buyerId, payment, cartItems, callback) {
    // Create transaction to track all the order in one place
    const createTransaction = `INSERT INTO transactions (buyerId, payment, total)
                                   VALUES (?, ?, ?)`;

    const groupedItems = groupItemsBySeller(cartItems); // Group items by seller

    let totalTransaction = 0;
    db.run(createTransaction, [buyerId, payment, totalTransaction], function (err) {
      if (err) return callback(err);

      const transactionId = this.lastID;

      // Iterate over each seller and create an order
      groupedItems.forEach(({ sellerId, items }, index) => {
        const totalOrderPrice = items.reduce(
          (total, item) => total + item.quantity * item.price,
          0
        );
        const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
        totalTransaction += totalOrderPrice;

        const insertOrder = `INSERT INTO orders (buyerId, sellerId, quantity, total, transactionId)
                                     VALUES (?, ?, ?, ?, ?)`;
        db.run(
          insertOrder,
          [buyerId, sellerId, totalQuantity, totalOrderPrice, transactionId],
          function (err) {
            if (err) return callback(err);

            const orderId = this.lastID;
            const insertOrderItem = `INSERT INTO order_items (orderId, itemId, quantity, price, subTotal)
                                             VALUES (?, ?, ?, ?, ?)`;
            items.forEach((item) => {
              const totalPrice = item.quantity * item.price;
              db.run(
                insertOrderItem,
                [orderId, item.id, item.quantity, item.price, totalPrice],
                (err) => {
                  if (err) return callback(err);
                }
              );
            });

            // If last seller, finalize
            if (index === groupedItems.length - 1) {
              db.run(
                `UPDATE transactions SET total = ? WHERE id = ?`,
                [totalTransaction, transactionId],
                (err) => {
                  callback(err, transactionId);
                }
              );
            }
          }
        );
      });
    });
  }

  static getOrderBySellerId(sellerId, callback) {
    db.all("SELECT * FROM orders WHERE sellerId = ?", [sellerId], (err, orders) => {
      if (err) return callback(err);

      // Fetch items for each order
      const ordersWithItems = orders.map((order) => {
        return new Promise((resolve, reject) => {
          db.all("SELECT * FROM order_items WHERE orderId = ?", [order.id], (err, items) => {
            if (err) reject(err);
            resolve({ ...order, items });
          });
        });
      });

      Promise.all(ordersWithItems)
        .then((results) => callback(null, results))
        .catch(callback);
    });
  }

  static getTransactionByBuyerId(buyerId, callback) {
    const query = `SELECT * FROM transactions WHERE buyerId = ?`;
    db.all(query, [buyerId], (err, rows) => {
      callback(err, rows);
    });
  }

  static findByTransactionId(transactionId, callback) {
    db.all("SELECT * FROM orders WHERE transactionId = ?", [transactionId], (err, orders) => {
      if (err) return callback(err);

      // Fetch items for each order
      const ordersWithItems = orders.map((order) => {
        return new Promise((resolve, reject) => {
          db.all("SELECT * FROM order_items WHERE orderId = ?", [order.id], (err, items) => {
            if (err) reject(err);
            resolve({ ...order, items });
          });
        });
      });

      Promise.all(ordersWithItems)
        .then((results) => callback(null, results))
        .catch(callback);
    });
  }
}

module.exports = Order;

// Helper function to group items by seller
function groupItemsBySeller(cartItems) {
  const grouped = {};

  cartItems.forEach((item) => {
    if (!grouped[item.sellerId]) {
      grouped[item.sellerId] = [];
    }
    grouped[item.sellerId].push(item);
  });

  return Object.keys(grouped).map((sellerId) => ({
    sellerId: Number(sellerId),
    items: grouped[sellerId],
  }));
}
