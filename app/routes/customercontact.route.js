module.exports = app => {
    const customerContacts = require("../controllers/customercontact.controller.js");

    var router = require("express").Router();

    // Create a new CustomerContact
    router.post("/", customerContacts.create);

    // Retrieve all CustomerContacts
    router.get("/", customerContacts.findAll);

    // Customer request contact form to customer by Customer contact id
    router.post("/request-contact/:id", customerContacts.requestContact);

    // Retrieve PremiumBills by customer
    router.get("/customer/:id", customerContacts.findByCustomerId);

    // Retrieve a single CustomerContact with id
    router.get("/:id", customerContacts.findOne);

    // Update a CustomerContact with id
    router.put("/:id", customerContacts.update);

    // Delete a CustomerContact with id
    router.delete("/:id", customerContacts.delete);

    // Delete all CustomerContacts
    router.delete("/", customerContacts.deleteAll);

    app.use('/api/customer-contacts', router);
};
