module.exports = app => {
    const customers = require("../controllers/customer.controller.js");

    var router = require("express").Router();

    // Create a new Customer
    router.post("/", customers.create);

    // Retrieve all Customers
    router.get("/", customers.findAll);

    
    // Customer Login
    router.post("/login", customers.login);
    
    // Customer Login with Google
    router.post("/login-with-google", customers.loginWithGoogle);

    // Customer change password 
    router.post("/change-password", customers.changePassword);

    // Customer forgot password 
    router.post("/forgot-password", customers.forgotPassword);


    // Retrieve a single Customer with id
    router.get("/:id", customers.findOne);

    // Update a Customer with id
    router.put("/:id", customers.update);

    // Delete a Customer with id
    router.delete("/:id", customers.delete);

    // Delete all Customers
    router.delete("/", customers.deleteAll);


    app.use('/api/customers', router);
};
