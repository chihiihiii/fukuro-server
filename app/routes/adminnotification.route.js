module.exports = app => {
    const adminNotifications = require("../controllers/adminnotification.controller.js");

    var router = require("express").Router();

    // Create a new AdminNotification
    router.post("/", adminNotifications.create);

    // Retrieve all AdminNotifications
    router.get("/", adminNotifications.findAll);


    // Retrieve a single AdminNotification with id
    router.get("/:id", adminNotifications.findOne);

    // Update a AdminNotification with id
    router.put("/:id", adminNotifications.update);

    // Delete a AdminNotification with id
    router.delete("/:id", adminNotifications.delete);

    // Delete all AdminNotifications
    router.delete("/", adminNotifications.deleteAll);

    app.use('/api/admin-notifications', router);
};