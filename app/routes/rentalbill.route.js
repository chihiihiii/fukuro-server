module.exports = app => {
    const rentalBills = require("../controllers/rentalbill.controller.js");

    var router = require("express").Router();

    // Create a new RentalBill
    router.post("/", rentalBills.create);

    // Retrieve all RentalBills
    router.get("/", rentalBills.findAll);


    // Retrieve a single RentalBill with id
    router.get("/:id", rentalBills.findOne);

    // Update a RentalBill with id
    router.put("/:id", rentalBills.update);

    // Delete a RentalBill with id
    router.delete("/:id", rentalBills.delete);

    // Delete all RentalBills
    router.delete("/", rentalBills.deleteAll);

    app.use('/api/rental-bills', router);
};