module.exports = app => {
  const products = require("../controllers/product.controller.js");

  // Retrieve all Products
  app.get("/products", products.findAll);

  // Retrieve a specific product
  app.get("/products/:id", products.findOne);

   // Create a new Product
   app.post("/products", products.create);

   // Update a product
   app.put("/products/:id", products.update);

   // Delete a specific product
   app.delete("/products/:id", products.deleteOne);

   // Delete all the products
   app.delete("/products", products.deleteAll);
};