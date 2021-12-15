const db = require("../models");
const RentalNew = db.RentalNews;
const PremiumBill = db.PremiumBills;
const Customer = db.Customers;
const Comment = db.Comments;
const Rental = db.Rentals;
const RentalRoom = db.RentalRooms;
const Renter = db.Renters;
const Op = db.Sequelize.Op;



// count rental news
exports.countRentalNews = (req, res) => {
    var time = req.params.time;
    var currentTime = new Date();
    var lastDay = new Date(new Date() - 24 * 60 * 60 * 1000);
    var lastWeek = new Date(new Date() - 24 * 60 * 60 * 1000 * 7);
    var lastMonth = new Date(new Date() - 24 * 60 * 60 * 1000 * 30);

    console.log(currentTime);
    // console.log(demo);
    if (time == 'day') {
        RentalNew.findAndCountAll({
                where: {
                    createdAt: {
                        [Op.lt]: currentTime,
                        [Op.gt]: lastDay
                    }
                }
            })
            .then(function (count) {
                res.status(200).send(count);

            })
            .catch(err => {
                res.status(500).send({
                    message: "Đã xảy ra một số lỗi khi truy xuất rental news!",
                    error: err.message
                });
            });
    } else if (time == 'week') {
        RentalNew.findAndCountAll({
                where: {
                    createdAt: {
                        [Op.lt]: currentTime,
                        [Op.gt]: lastWeek
                    }
                }
            })
            .then(function (count) {
                res.status(200).send(count);

            })
            .catch(err => {
                res.status(500).send({
                    message: "Đã xảy ra một số lỗi khi truy xuất rental news!",
                    error: err.message
                });
            });
    } else if (time == 'month') {
        RentalNew.findAndCountAll({
                where: {
                    createdAt: {
                        [Op.lt]: currentTime,
                        [Op.gt]: lastMonth
                    }
                }
            })
            .then(function (count) {
                res.status(200).send(count);

            })
            .catch(err => {
                res.status(500).send({
                    message: "Đã xảy ra một số lỗi khi truy xuất rental news!",
                    error: err.message
                });
            });
    } else {
        RentalNew.findAndCountAll({
                where: {
                    // createdAt: {
                    //     [Op.lt]: currentTime,
                    //     [Op.gt]: lastMonth
                    // }
                }
            })
            .then(function (count) {
                res.status(200).send(count);

            })
            .catch(err => {
                res.status(500).send({
                    message: "Đã xảy ra một số lỗi khi truy xuất rental news!",
                    error: err.message
                });
            });
    }


};

// count premium bills
exports.countPremiumBill = (req, res) => {
    var time = req.params.time;
    var currentTime = new Date();
    var lastDay = new Date(new Date() - 24 * 60 * 60 * 1000);
    var lastWeek = new Date(new Date() - 24 * 60 * 60 * 1000 * 7);
    var lastMonth = new Date(new Date() - 24 * 60 * 60 * 1000 * 30);

    console.log(currentTime);
    // console.log(demo);
    if (time == 'day') {
        PremiumBill.findAndCountAll({
                where: {
                    createdAt: {
                        [Op.lt]: currentTime,
                        [Op.gt]: lastDay
                    }
                }
            })
            .then(function (count) {
                res.status(200).send(count);

            })
            .catch(err => {
                res.status(500).send({
                    message: "Đã xảy ra một số lỗi khi truy xuất premium bills!",
                    error: err.message
                });
            });
    } else if (time == 'week') {
        PremiumBill.findAndCountAll({
                where: {
                    createdAt: {
                        [Op.lt]: currentTime,
                        [Op.gt]: lastWeek
                    }
                }
            })
            .then(function (count) {
                res.status(200).send(count);

            })
            .catch(err => {
                res.status(500).send({
                    message: "Đã xảy ra một số lỗi khi truy xuất premium bills!",
                    error: err.message
                });
            });
    } else if (time == 'month') {
        PremiumBill.findAndCountAll({
                where: {
                    createdAt: {
                        [Op.lt]: currentTime,
                        [Op.gt]: lastMonth
                    }
                }
            })
            .then(function (count) {
                res.status(200).send(count);

            })
            .catch(err => {
                res.status(500).send({
                    message: "Đã xảy ra một số lỗi khi truy xuất premium bills!",
                    error: err.message
                });
            });
    } else {
        PremiumBill.findAndCountAll({
                where: {
                    // createdAt: {
                    //     [Op.lt]: currentTime,
                    //     [Op.gt]: lastMonth
                    // }
                }
            })
            .then(function (count) {
                res.status(200).send(count);

            })
            .catch(err => {
                res.status(500).send({
                    message: "Đã xảy ra một số lỗi khi truy xuất premium bills!",
                    error: err.message
                });
            });
    }


};

// count customers
exports.countCustomer = (req, res) => {
    var time = req.params.time;
    var currentTime = new Date();
    var lastDay = new Date(new Date() - 24 * 60 * 60 * 1000);
    var lastWeek = new Date(new Date() - 24 * 60 * 60 * 1000 * 7);
    var lastMonth = new Date(new Date() - 24 * 60 * 60 * 1000 * 30);

    console.log(currentTime);
    // console.log(demo);
    if (time == 'day') {
        Customer.findAndCountAll({
                where: {
                    createdAt: {
                        [Op.lt]: currentTime,
                        [Op.gt]: lastDay
                    }
                }
            })
            .then(function (count) {
                res.status(200).send(count);

            })
            .catch(err => {
                res.status(500).send({
                    message: "Đã xảy ra một số lỗi khi truy xuất Customers!",
                    error: err.message
                });
            });
    } else if (time == 'week') {
        Customer.findAndCountAll({
                where: {
                    createdAt: {
                        [Op.lt]: currentTime,
                        [Op.gt]: lastWeek
                    }
                }
            })
            .then(function (count) {
                res.status(200).send(count);

            })
            .catch(err => {
                res.status(500).send({
                    message: "Đã xảy ra một số lỗi khi truy xuất Customers!",
                    error: err.message
                });
            });
    } else if (time == 'month') {
        Customer.findAndCountAll({
                where: {
                    createdAt: {
                        [Op.lt]: currentTime,
                        [Op.gt]: lastMonth
                    }
                }
            })
            .then(function (count) {
                res.status(200).send(count);

            })
            .catch(err => {
                res.status(500).send({
                    message: "Đã xảy ra một số lỗi khi truy xuất Customers!",
                    error: err.message
                });
            });
    } else {
        Customer.findAndCountAll({
                where: {
                    // createdAt: {
                    //     [Op.lt]: currentTime,
                    //     [Op.gt]: lastMonth
                    // }
                }
            })
            .then(function (count) {
                res.status(200).send(count);

            })
            .catch(err => {
                res.status(500).send({
                    message: "Đã xảy ra một số lỗi khi truy xuất premium bills!",
                    error: err.message
                });
            });
    }


};

// count comments
exports.countComment = (req, res) => {
    var time = req.params.time;
    var currentTime = new Date();
    var lastDay = new Date(new Date() - 24 * 60 * 60 * 1000);
    var lastWeek = new Date(new Date() - 24 * 60 * 60 * 1000 * 7);
    var lastMonth = new Date(new Date() - 24 * 60 * 60 * 1000 * 30);

    console.log(currentTime);
    // console.log(demo);
    if (time == 'day') {
        Comment.findAndCountAll({
                where: {
                    createdAt: {
                        [Op.lt]: currentTime,
                        [Op.gt]: lastDay
                    }
                }
            })
            .then(function (count) {
                res.status(200).send(count);

            })
            .catch(err => {
                res.status(500).send({
                    message: "Đã xảy ra một số lỗi khi truy xuất Comments!",
                    error: err.message
                });
            });
    } else if (time == 'week') {
        Comment.findAndCountAll({
                where: {
                    createdAt: {
                        [Op.lt]: currentTime,
                        [Op.gt]: lastWeek
                    }
                }
            })
            .then(function (count) {
                res.status(200).send(count);

            })
            .catch(err => {
                res.status(500).send({
                    message: "Đã xảy ra một số lỗi khi truy xuất Comments!",
                    error: err.message
                });
            });
    } else if (time == 'month') {
        Comment.findAndCountAll({
                where: {
                    createdAt: {
                        [Op.lt]: currentTime,
                        [Op.gt]: lastMonth
                    }
                }
            })
            .then(function (count) {
                res.status(200).send(count);

            })
            .catch(err => {
                res.status(500).send({
                    message: "Đã xảy ra một số lỗi khi truy xuất Comments!",
                    error: err.message
                });
            });
    } else {
        Comment.findAndCountAll({
                where: {
                    // createdAt: {
                    //     [Op.lt]: currentTime,
                    //     [Op.gt]: lastMonth
                    // }
                }
            })
            .then(function (count) {
                res.status(200).send(count);

            })
            .catch(err => {
                res.status(500).send({
                    message: "Đã xảy ra một số lỗi khi truy xuất Comments!",
                    error: err.message
                });
            });
    }


};

// count rentals
exports.countRental = (req, res) => {
    var time = req.params.time;
    var currentTime = new Date();
    var lastDay = new Date(new Date() - 24 * 60 * 60 * 1000);
    var lastWeek = new Date(new Date() - 24 * 60 * 60 * 1000 * 7);
    var lastMonth = new Date(new Date() - 24 * 60 * 60 * 1000 * 30);

    console.log(currentTime);
    // console.log(demo);
    if (time == 'day') {
        Rental.findAndCountAll({
                where: {
                    createdAt: {
                        [Op.lt]: currentTime,
                        [Op.gt]: lastDay
                    }
                }
            })
            .then(function (count) {
                res.status(200).send(count);

            })
            .catch(err => {
                res.status(500).send({
                    message: "Đã xảy ra một số lỗi khi truy xuất Rentals!",
                    error: err.message
                });
            });
    } else if (time == 'week') {
        Rental.findAndCountAll({
                where: {
                    createdAt: {
                        [Op.lt]: currentTime,
                        [Op.gt]: lastWeek
                    }
                }
            })
            .then(function (count) {
                res.status(200).send(count);

            })
            .catch(err => {
                res.status(500).send({
                    message: "Đã xảy ra một số lỗi khi truy xuất Rentals!",
                    error: err.message
                });
            });
    } else if (time == 'month') {
        Rental.findAndCountAll({
                where: {
                    createdAt: {
                        [Op.lt]: currentTime,
                        [Op.gt]: lastMonth
                    }
                }
            })
            .then(function (count) {
                res.status(200).send(count);

            })
            .catch(err => {
                res.status(500).send({
                    message: "Đã xảy ra một số lỗi khi truy xuất Rentals!",
                    error: err.message
                });
            });
    } else {
        Rental.findAndCountAll({
                where: {
                    // createdAt: {
                    //     [Op.lt]: currentTime,
                    //     [Op.gt]: lastMonth
                    // }
                }
            })
            .then(function (count) {
                res.status(200).send(count);

            })
            .catch(err => {
                res.status(500).send({
                    message: "Đã xảy ra một số lỗi khi truy xuất Rentals!",
                    error: err.message
                });
            });
    }


};