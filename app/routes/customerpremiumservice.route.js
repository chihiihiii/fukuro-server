module.exports = app => {
    const customerPremiumServices = require("../controllers/customerpremiumservice.controller.js");

    var router = require("express").Router();

    // Create a new CustomerPremiumService
    router.post("/", customerPremiumServices.create);

    // Retrieve all CustomerPremiumServices
    router.get("/", customerPremiumServices.findAll);

    // Check expire all CustomerPremiumServices
    router.get("/check-expire", customerPremiumServices.checkExpire);

    // Check premium all CustomerPremiumServices
    router.get("/check-premium/:id", customerPremiumServices.checkPremiumByCustomerId);
    
    // Retrieve all CustomerPremiumServices by customer id
    router.get("/customer/:id", customerPremiumServices.findByCustomerId);


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