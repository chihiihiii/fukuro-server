module.exports = app => {
    const customerPremiumServices = require("../controllers/customerpremiumservice.controller.js");

    var router = require("express").Router();

    // Create a new CustomerPremiumService
    router.post("/", customerPremiumServices.create);

    // Retrieve all CustomerPremiumServices
    router.get("/", customerPremiumServices.findAll);


    // Retrieve a single CustomerPremiumService with id
    router.get("/:id", customerPremiumServices.findOne);

    // Update a CustomerPremiumService with id
    router.put("/:id", customerPremiumServices.update);

    // Delete a CustomerPremiumService with id
    router.delete("/:id", customerPremiumServices.delete);

    // Delete all CustomerPremiumServices
    router.delete("/", customerPremiumServices.deleteAll);

    app.use('/api/customer-premium-services', router);
};