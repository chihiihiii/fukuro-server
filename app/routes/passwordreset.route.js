module.exports = app => {
    const passwordResets = require("../controllers/passwordreset.controller.js");

    var router = require("express").Router();

    // Update pass for customer
    router.post("/customer/", passwordResets.customerPasswordReset);

    // Update pass for admin
    router.post("/admin/", passwordResets.adminPasswordReset);


    // Delete all Password Resets
    router.delete("/", passwordResets.deleteAll);

    app.use('/api/password-resets', router);
};