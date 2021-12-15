module.exports = app => {
    const renters = require("../controllers/renter.controller.js");

    var router = require("express").Router();

    // Create a new Renter
    router.post("/", renters.create);

    // Retrieve all Renters
    router.get("/", renters.findAll);

    // Retrieve a single Renter with id
    router.get("/:id", renters.findOne);

    // Retrieve Renter by rental
    router.get("/rental/:id", renters.findByRentalId);

    // Update a Renter with id
    router.put("/:id", renters.update);

    // Delete a Renter with id
    router.delete("/:id", renters.delete);

    // Delete all Renters
    router.delete("/", renters.deleteAll);

    app.use('/api/renters', router);
};
