const sql = require("./db.js");

// constructor
const Product = function (product) {
  this.name = product.name;
  this.price = product.price;
  this.quantity = product.quantity;
  this.category = product.category;
};

// get a list of all the products
Product.getAll = result => {
  sql.query("SELECT * FROM T_products")
  .then(rows => {
      result(null, rows);
    })
    .catch(err => {
      console.log("error: ", err);
      result(null, err);
    })
}

// get one specific product
Product.getOne = (productId, result) => {
  sql.query(`SELECT * FROM T_products WHERE id = ${productId}`)
  .then(res => {
    result(null, res);
  })
  .catch(err => {
    console.log("error: ", err);
    result(null, err)
  })
}

// create a new product
Product.create = (newProduct, result) => {
  sql.query(`INSERT INTO T_products (name, price, quantity, category_id) VALUES ('${newProduct.name}', ${newProduct.price}, ${newProduct.quantity}, ${newProduct.category})`)
  .then(res => {
    console.log("created product: ", { id: res.insertId, ...newProduct });
    result(null, { id: res.insertId, ...newProduct });
  })
  .catch(err => {
    console.log("error: ", err);
    result(err, null)
  })
}

Product.update = (productId, product, result) => {
  sql.query(`UPDATE T_products SET name = '${product.name}', price = ${product.price}, quantity = ${product.quantity}, category_id = ${product.category} WHERE id = ${productId}`)
  .then(res => {
    console.log("updated product: ", {id: productId, ...product});
    result(null, {id: productId, ...product});
  })
  .catch(err => {
    console.log("error: ", err);
    result(err, null)
  })
}

// Delete a specific product
Product.deleteOne = (productId, result) => {
  sql.query(`DELETE FROM T_products WHERE id = ${productId}`)
  .then(res => {
    console.log(`deleted product with id : ${productId}`);
    result(null, res);
  })
  .catch(err => {
    console.log("error: ", err);
    result(err, null)
  })
}

// Delete all products
Product.deleteAll = (result) => {
  sql.query("TRUNCATE TABLE T_products")
  .then(res => {
    console.log("All products deleted.")
    result(null, res);
  })
  .catch(err => {
    console.log("error: " + err);
    result(err, null)
  })
}

module.exports = Product;