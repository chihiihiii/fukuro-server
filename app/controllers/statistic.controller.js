const db = require("../models");
const RentalNew = db.RentalNews;
const PremiumBill = db.PremiumBills;
const Customer = db.Customers;
const Comment = db.Comments;
const Rental = db.Rentals;
const RentalRoom = db.RentalRooms;
const Renter = db.Renters;
const Op = db.Sequelize.Op;
const Question = db.Questions;
const QuestionCategory = db.QuestionCategories;

// count rental news
exports.countRentalNews = (req, res) => {
    var time = req.params.time;
    var currentTime = new Date();
    var lastDay = new Date(new Date() - 24 * 60 * 60 * 1000);
    var lastWeek = new Date(new Date() - 24 * 60 * 60 * 1000 * 7);
    var lastMonth = new Date(new Date() - 24 * 60 * 60 * 1000 * 30);

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

// count rental news by date
exports.countRentalNewsByDate = (req, res) => {
    var start = req.query.start;
    var end = req.query.end;
    if (start && end) {
        RentalNew.findAndCountAll({
                where: {
                    createdAt: {
                        [Op.lt]: end,
                        [Op.gt]: start
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
    }
    else {
        RentalNew.findAndCountAll()
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

// count premium bills by date
exports.countPremiumBillByDate = (req, res) => {
    var start = req.query.start;
    var end = req.query.end;
    if (start && end) {
        PremiumBill.findAndCountAll({
            where: {
                createdAt: {
                    [Op.lt]: end,
                    [Op.gt]: start
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
    }
    else {
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
                    message: "Đã xảy ra một số lỗi khi truy xuất rental news!",
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

// count customers by date
exports.countCustomerByDate = (req, res) => {
    var start = req.query.start;
    var end = req.query.end;
    if (start && end) {
        Customer.findAndCountAll({
            where: {
                createdAt: {
                    [Op.lt]: end,
                    [Op.gt]: start
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
    }
    else {
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
                    message: "Đã xảy ra một số lỗi khi truy xuất rental news!",
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

// count comments by date
exports.countCommentByDate = (req, res) => {
    var start = req.query.start;
    var end = req.query.end;
    if (start && end) {
        Comment.findAndCountAll({
            where: {
                createdAt: {
                    [Op.lt]: end,
                    [Op.gt]: start
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
    }
    else {
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
                    message: "Đã xảy ra một số lỗi khi truy xuất rental news!",
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

// count comments by date
exports.countQuestionByCategories = (req, res) => {
    var start = req.query.start;
    var end = req.query.end;
    QuestionCategory.findAndCountAll()
        .then(data => {
            count(data['rows']);
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi truy xuất Question Categories!",
                error: err.message
            });
        });
    async function count(obj) {
        var str = [];

        if (start && end) {
            for (let item of obj) {
                await Question.findAndCountAll({
                    where: {
                        question_category_id: item.id,
                        createdAt: {
                            [Op.lt]: end,
                            [Op.gt]: start
                        }
                    }
                })
                    .then(data => {
                        str.push({value: data['count'], name: item.name});
                    })
            }
        }else{
            for (let item of obj){
                await Question.findAndCountAll({
                    where: {
                        question_category_id: item.id,
                    }
                })
                    .then(data => {
                        str.push({value: data['count'], name: item.name});
                    })
            }
        }
        res.status(200).send(str);
    }
};

// count income by date
exports.countIncomeByDate = (req, res) => {
    var start = req.query.start;
    var end = req.query.end;
    if (start && end) {
        PremiumBill.findAndCountAll({
            where: {
                createdAt: {
                    [Op.lt]: end,
                    [Op.gt]: start
                },
            }
        })
            .then(data => {
                count(data['rows']);
            })
            .catch(err => {
                res.status(500).send({
                    message: "Đã xảy ra một số lỗi khi truy xuất Question Categories!",
                    error: err.message
                });
            });
    }
    else{
        PremiumBill.findAndCountAll()
            .then(data => {
                count(data['rows']);
            })
            .catch(err => {
                res.status(500).send({
                    message: "Đã xảy ra một số lỗi khi truy xuất Question Categories!",
                    error: err.message
                });
            });
    }
    async function count(obj) {
        var listDate = [];
        for (let item of obj){
            listDate.push(item.createdAt);
        }
        let uniqueArray = listDate
            .map(function (date) { return date.getTime() })
            .filter(function (date, i, array) {
                return array.indexOf(date) === i;
            })
            .map(function (time) { return new Date(time); });
        count2(uniqueArray);
    }
    async function count2(obj) {
        var arr = [];
        for (let item of obj) {
            await PremiumBill.sum("total_price", {
                where: {
                    created_at: item
                }
            })
                .then(data => {
                    arr.push({date: item, value: data});
                })
        }
        res.status(200).send(arr);
    }
};

