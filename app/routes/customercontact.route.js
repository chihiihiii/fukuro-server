module.exports = app => {
    const customerContacts = require("../controllers/customercontact.controller.js");

    var router = require("express").Router();

    // Create a new CustomerContact
    router.post("/", customerContacts.create);

    // Retrieve all CustomerContacts
    router.get("/", customerContacts.findAll);


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