const express = require("express");
const bodyParser = require("body-parser");
// const path = require('path');

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.sendFile( "index.html", {root: 'views/'} );
});

app.use(express.static(__dirname + '/views'))

require("./routes/product.routes.js")(app);

// set port, listen for requests
app.listen(8000, () => {
  console.log("Server is running on port 8000.");
});

