module.exports = app => {
    const adminContacts = require("../controllers/admincontact.controller.js");

    var router = require("express").Router();

    // Create a new AdminContact
    router.post("/", adminContacts.create);

    // Retrieve all AdminContacts
    router.get("/", adminContacts.findAll);


    // Retrieve a single AdminContact with id
    router.get("/:id", adminContacts.findOne);

    // Update a AdminContact with id
    router.put("/:id", adminContacts.update);

    // Delete a AdminContact with id
    router.delete("/:id", adminContacts.delete);

    // Delete all AdminContacts
    router.delete("/", adminContacts.deleteAll);

    app.use('/api/admin-contacts', router);
};