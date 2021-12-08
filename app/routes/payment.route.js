module.exports = app => {
    const payment = require("../controllers/payment.controller.js");

    var router = require("express").Router();

    // Api payment
    router.post("/", payment.payment);

    // Api result
    router.get("/result", payment.result);

    app.use('/api/payment', router);
};
