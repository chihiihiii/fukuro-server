module.exports = app => {
    const admins = require("../controllers/admin.controller.js");

    var router = require("express").Router();

    // Create a new Admin
    router.post("/", admins.create);

    // Retrieve all Admins
    router.get("/", admins.findAll);


    // Admin Login
    router.post("/login", admins.login);

    
    // Retrieve a single Admin with id
    router.get("/:id", admins.findOne);

    // Update a Admin with id
    router.put("/:id", admins.update);

    // Delete a Admin with id
    router.delete("/:id", admins.delete);

    // Delete all Admins
    router.delete("/", admins.deleteAll);


    app.use('/api/admins', router);
};
