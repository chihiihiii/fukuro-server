module.exports = app => {
    const statistics = require("../controllers/statistic.controller.js");

    var router = require("express").Router();

    // count rental news
    router.get("/rental-news/:time", statistics.countRentalNews);

    // count rental news by date
    router.get("/rental-news", statistics.countRentalNewsByDate);

    // count premium bills
    router.get("/premium-bills/:time", statistics.countPremiumBill);

    // count premium bills by date
    router.get("/premium-bills", statistics.countPremiumBillByDate);

    // count customers
    router.get("/customers/:time", statistics.countCustomer);

    // count customers by date
    router.get("/customers", statistics.countCustomerByDate);
    
    // count comments
    router.get("/comments/:time", statistics.countComment);

    // count comments by date
    router.get("/comments", statistics.countCommentByDate);

    // count rentals
    router.get("/rentals/:time", statistics.countRental);

    // count question by category
    router.get("/question-categories", statistics.countQuestionByCategories);

    // count income by date
    router.get("/income", statistics.countIncomeByDate);

    

    app.use('/api/statistics', router);
};
