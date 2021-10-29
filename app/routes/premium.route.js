module.exports = app => {
    const premiums = require("../controllers/premium.controller.js");

    var router = require("express").Router();

    // Create a new Premium
    router.post("/", premiums.create);

    // Retrieve all Premiums
    router.get("/", premiums.findAll);


    // Retrieve a single Premium with id
    router.get("/:id", premiums.findOne);

    // Update a Premium with id
    router.put("/:id", premiums.update);

    // Delete a Premium with id
    router.delete("/:id", premiums.delete);

    // Delete all Premiums
    router.delete("/", premiums.deleteAll);

    app.use('/api/premiums', router);
};