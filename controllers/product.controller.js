const Product = require("../models/product.model.js");

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
    Product.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving products."
            });
        else res.send(data);
    });
};

// Retrieve a specific product from the db
exports.findOne = (req, res) => {
    Product.getOne(req.params.id, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the product."
            });
        else res.send(data);
    })
}

// Add a product
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Save Product in the database
    Product.create(new Product(req.body), (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the product."
            });
        else
            res.send(data);
    });
};

// Update a specific product
exports.update = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Saving the product in db
    Product.update(req.params.id, new Product(req.body), (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while updating the product."
            });
        else
            res.send(data);
    })
}

// Delete a specific product
exports.deleteOne = (req, res) => {
    Product.deleteOne(req.params.id, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while deleting the product."
            });
        else
            res.send(data);
    })
}

// Delete all products
exports.deleteAll = (req, res) => {
    Product.deleteAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occured while deleting all products."
            })
        else
            res.send(data);
    })
}