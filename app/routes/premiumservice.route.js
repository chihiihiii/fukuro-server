module.exports = app => {
    const premiumServices = require("../controllers/premiumservice.controller.js");

    var router = require("express").Router();

    // Create a new PremiumService
    router.post("/", premiumServices.create);

    // Retrieve all PremiumServices
    router.get("/", premiumServices.findAll);


    // Retrieve a single PremiumService with id
    router.get("/:id", premiumServices.findOne);

    // Update a PremiumService with id
    router.put("/:id", premiumServices.update);

    // Delete a PremiumService with id
    router.delete("/:id", premiumServices.delete);

    // Delete all PremiumServices
    router.delete("/", premiumServices.deleteAll);

    app.use('/api/premium-services', router);
};