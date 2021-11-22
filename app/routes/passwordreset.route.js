module.exports = app => {
    const passwordResets = require("../controllers/passwordreset.controller.js");

    var router = require("express").Router();

    // Create a new PasswordReset
    router.post("/", passwordResets.create);

    // Retrieve all PasswordResets
    router.get("/", passwordResets.findAll);


    // Retrieve a single PasswordReset with id
    router.get("/:id", passwordResets.findOne);

    // Update a PasswordReset with id
    router.put("/:id", passwordResets.update);

    // Delete a PasswordReset with id
    router.delete("/:id", passwordResets.delete);

    // Delete all PasswordResets
    router.delete("/", passwordResets.deleteAll);

    app.use('/api/password-resets', router);
};