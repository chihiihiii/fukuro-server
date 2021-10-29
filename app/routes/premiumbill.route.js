module.exports = app => {
    const premiumBills = require("../controllers/premiumbill.controller.js");

    var router = require("express").Router();

    // Create a new PremiumBill
    router.post("/", premiumBills.create);

    // Retrieve all PremiumBills
    router.get("/", premiumBills.findAll);


    // Retrieve a single PremiumBill with id
    router.get("/:id", premiumBills.findOne);

    // Update a PremiumBill with id
    router.put("/:id", premiumBills.update);

    // Delete a PremiumBill with id
    router.delete("/:id", premiumBills.delete);

    // Delete all PremiumBills
    router.delete("/", premiumBills.deleteAll);

    app.use('/api/premium-bills', router);
};