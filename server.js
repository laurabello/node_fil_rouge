const express = require("express");
const bodyParser = require("body-parser");



const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.send( "Hello express!" );
});

// route to get name parameters
// app.get("/user/:name", (req, res) => {
//     res.send(`Hello ${req.params.name} !`);
// });

// app.get("/products/:id", (req, res) => {
//     res.send(`id : ${req.params.id}`);
// });

require("./routes/product.routes.js")(app);

// set port, listen for requests
app.listen(8000, () => {
  console.log("Server is running on port 8000.");
});

