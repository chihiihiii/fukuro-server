module.exports = app => {
    const promotions = require("../controllers/promotion.controller.js");

    var router = require("express").Router();

    // Create a new Promotion
    router.post("/", promotions.create);

    // Retrieve all Promotions
    router.get("/", promotions.findAll);


    // Retrieve a single Promotion with id
    router.get("/:id", promotions.findOne);

    // Update a Promotion with id
    router.put("/:id", promotions.update);

    // Delete a Promotion with id
    router.delete("/:id", promotions.delete);

    // Delete all Promotions
    router.delete("/", promotions.deleteAll);

    app.use('/api/promotions', router);
};