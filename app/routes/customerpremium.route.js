module.exports = app => {
    const customerPremiums = require("../controllers/customerpremium.controller.js");

    var router = require("express").Router();

    // Create a new CustomerPremium
    router.post("/", customerPremiums.create);

    // Retrieve all CustomerPremiums
    router.get("/", customerPremiums.findAll);


    // Retrieve a single CustomerPremium with id
    router.get("/:id", customerPremiums.findOne);

    // Update a CustomerPremium with id
    router.put("/:id", customerPremiums.update);

    // Delete a CustomerPremium with id
    router.delete("/:id", customerPremiums.delete);

    // Delete all CustomerPremiums
    router.delete("/", customerPremiums.deleteAll);

    app.use('/api/customer-premiums', router);
};