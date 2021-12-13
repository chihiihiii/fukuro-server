module.exports = app => {
    const rentalRooms = require("../controllers/rentalroom.controller.js");

    var router = require("express").Router();

    // Create a new RentalRoom
    router.post("/", rentalRooms.create);

    // Retrieve all RentalRooms
    router.get("/", rentalRooms.findAll);

    // Retrieve a single RentalRoom with id
    router.get("/:id", rentalRooms.findOne);

    // Update a RentalRoom with id
    router.put("/:id", rentalRooms.update);

    // Delete a RentalRoom with id
    router.delete("/:id", rentalRooms.delete);

    // Delete all RentalRooms
    router.delete("/", rentalRooms.deleteAll);

    app.use('/api/rental-rooms', router);
};