module.exports = app => {
    const statistics = require("../controllers/statistic.controller.js");

    var router = require("express").Router();

    // count rental news
    router.get("/rental-news/:time", statistics.countRentalNews);

    // count premium bills
    router.get("/premium-bills/:time", statistics.countPremiumBill);

    // count customers
    router.get("/customers/:time", statistics.countCustomer);
    
    // count comments
    router.get("/comments/:time", statistics.countComment);

    

    app.use('/api/statistics', router);
};