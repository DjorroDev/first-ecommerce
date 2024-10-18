const bcrypt = require("bcrypt");
const faker = require("@faker-js/faker").faker;
const db = require("./db"); // Assuming you have an SQLite connection setup

const NUM_RANDOM_USERS = 5; // Number of random users to generate
const NUM_ITEMS_PER_SELLER = 10; // Number of items per seller
const NUM_ORDERS_PER_USER = 3; // Number of orders per buyer

function dropAndRecreateTables() {
  console.log("Dropping table and reset it...");
  db.serialize(() => {
    db.run("DROP TABLE IF EXISTS users");
    db.run("DROP TABLE IF EXISTS items");
    db.run("DROP TABLE IF EXISTS orders");
    db.run("DROP TABLE IF EXISTS order_items");
    db.run("DROP TABLE IF EXISTS transactions");

    // Create the tables again
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        address TEXT NOT NULL,
        isAdmin BOOLEAN DEFAULT 0,
        isSeller BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

    // Create items table
    db.run(`CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sellerId INTEGER,
        title TEXT,
        desc TEXT,
        store Text,
        price REAL,
        stock INTEGER,
        image TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sellerId) REFERENCES users(id)
      )`);

    // Create orders table
    db.run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        buyerId INTEGER,
        sellerId INTEGER,
        quantity INTEGER,
        transactionId INTEGER,
        total REAL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (buyerId) REFERENCES users(id),
        FOREIGN KEY (sellerId) REFERENCES users(id)
      )`);

    // Create order item table (List of item in order)
    db.run(`CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      orderId INTEGER,
      itemId INTEGER,
      quantity INTEGER,
      price REAL,
      subTotal REAL,
      FOREIGN KEY (orderId) REFERENCES orders(id),
      FOREIGN KEY (itemId) REFERENCES items(id)
    );`);

    // A table for buyer invoices especially with multiple store order
    db.run(`CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      buyerId INTEGER,
      payment TEXT,
      total REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (buyerId) REFERENCES users(id)
    );`);
  });
}

async function createUser(name, email, username, password, isAdmin, isSeller, address) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `INSERT INTO users (name, email, username, password, isAdmin, isSeller, address) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.run(
    query,
    [name, email, username, hashedPassword, isAdmin, isSeller, address],
    function (err) {
      if (err) {
        console.error(`Error inserting user ${name}:`, err);
      } else {
        console.log(`User ${username} added with ID ${this.lastID}`);
      }
    }
  );
}

function createItem(sellerId) {
  const title = faker.commerce.productName();
  const store = faker.company.buzzVerb();
  const price = parseFloat(faker.commerce.price());
  const stock = faker.number.int({ max: 200 });
  const desc = faker.food.description();
  const image = "nopic.jpg";
  const query = `INSERT INTO items (sellerId, title, store, price, stock, desc, image)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.run(query, [sellerId, title, store, price, stock, desc, image], (err) => {
    if (err) console.error(`Error creating item for seller ${sellerId}:`, err);
  });
}

function createTransaction(buyerId, callback) {
  const query = `INSERT INTO transactions (buyerId, payment, total)
                 VALUES (?, ?, ?)`;
  db.run(query, [buyerId, "Magic Card", 100], function (err) {
    if (err) return console.error(`Error creating transaction for buyer ${buyerId}:`, err);
    const transactionId = this.lastID;
    callback(transactionId);
  });
}

function createOrder(transactionId, buyerId, sellerId, items) {
  const totalOrderPrice = items.reduce((total, item) => total + item.quantity * item.price, 0);
  const query = `INSERT INTO orders (buyerId, sellerId, total, transactionId)
                 VALUES (?, ?, ?, ?)`;
  db.run(query, [buyerId, sellerId, totalOrderPrice, transactionId], function (err) {
    if (err) return console.error(`Error creating order for buyer ${buyerId}:`, err);
    const orderId = this.lastID;

    items.forEach((item) => {
      const itemQuery = `INSERT INTO order_items (orderId, itemId, quantity, price, subTotal)
                         VALUES (?, ?, ?, ?, ?)`;
      const totalPrice = item.quantity * item.price;
      db.run(itemQuery, [orderId, item.id, item.quantity, item.price, totalPrice], (err) => {
        if (err) console.error(`Error creating order_item:`, err);
      });
    });
  });
}

function createRandomOrdersAndItems() {
  // Get all sellers to create items
  db.all("SELECT * FROM users WHERE isSeller = 1", (err, sellers) => {
    if (err) return console.error("Error fetching sellers:", err);

    sellers.forEach((seller) => {
      // Create items for each seller
      for (let i = 0; i < NUM_ITEMS_PER_SELLER; i++) {
        createItem(seller.id);
      }
    });

    // Get all buyers to create orders
    db.all("SELECT * FROM users WHERE isSeller = 0", (err, buyers) => {
      if (err) return console.error("Error fetching buyers:", err);

      buyers.forEach((buyer) => {
        // Each buyer makes multiple orders
        for (let i = 0; i < NUM_ORDERS_PER_USER; i++) {
          createTransaction(buyer.id, (transactionId) => {
            const randomItems = sellers.map((seller) => ({
              id: faker.number.int({ min: 1, max: 10 }), // Random item id
              price: faker.commerce.price(),
              quantity: faker.number.int({ min: 1, max: 5 }),
            }));
            createOrder(transactionId, buyer.id, sellers[0].id, randomItems);
          });
        }
      });
    });
  });
}

// Seed the database
async function seedDatabase() {
  console.log("Seeding database...");

  // First user is Admin
  await createUser(
    "Admin",
    "admin@example.com",
    "admin",
    "admin",
    1,
    1,
    faker.location.streetAddress()
  );

  // Second user is Djorro
  await createUser(
    "Djorro",
    "Djorro@example.com",
    "Djorro",
    "pass",
    0,
    1,
    faker.location.streetAddress()
  );

  // Random Users
  for (let i = 0; i < NUM_RANDOM_USERS; i++) {
    const name = faker.company.name();
    const email = faker.internet.email();
    const username = faker.internet.userName();
    const password = "userpass"; // Randomize password or use a default one
    const isSeller = faker.datatype.boolean(); // Randomly assign seller role
    await createUser(name, email, username, password, 0, isSeller, faker.location.streetAddress());
  }

  createRandomOrdersAndItems();
}

// Comment this if dont want wipe the db every run
dropAndRecreateTables();

seedDatabase();
