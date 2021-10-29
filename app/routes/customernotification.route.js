module.exports = app => {
    const customerNotifications = require("../controllers/customernotification.controller.js");

    var router = require("express").Router();

    // Create a new CustomerNotification
    router.post("/", customerNotifications.create);

    // Retrieve all CustomerNotifications
    router.get("/", customerNotifications.findAll);


    // Retrieve a single CustomerNotification with id
    router.get("/:id", customerNotifications.findOne);

    // Update a CustomerNotification with id
    router.put("/:id", customerNotifications.update);

    // Delete a CustomerNotification with id
    router.delete("/:id", customerNotifications.delete);

    // Delete all CustomerNotifications
    router.delete("/", customerNotifications.deleteAll);

    app.use('/api/customer-notifications', router);
};