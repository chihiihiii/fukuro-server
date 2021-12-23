const db = require("../models");
const Answer = db.Answers;
const Customer = db.Customers;
const CustomerNotification = db.CustomerNotifications;
const Question = db.Questions;

const Op = db.Sequelize.Op;

// Create and Save a new Answer
exports.create = (req, res) => {
    // Validate request
    if (!req.body.content || !req.body.question_id) {
        res.status(400).send({
            message: "Không để trống nội dung trả lời và mã câu hỏi!"
        });
        return;
    }

    if (!req.body.detail_url) {
        res.status(400).send({
            message: "Không để trống đường dẫn chi tiết của thông báo!"
        });
        return;
    }
    if (!req.body.customer_id && !req.body.admin_id) {
        res.status(400).send({
            message: "Không để trống mã tài khoản trả lời!"
        });
        return;
    }
    if (req.body.customer_id && req.body.admin_id) {
        res.status(400).send({
            message: "Chỉ thêm một mã tài khoản trả lời!"
        });
        return;
    }
    var detailUrl = req.body.detail_url;
    var customerId = req.body.customer_id;

    var questionId = req.body.question_id;

    // Create a Answer
    var answer = {
        content: req.body.content,
        like: req.body.like,
        dislike: req.body.dislike,
        status: req.body.status,
        customerId: customerId,
        adminId: req.body.admin_id,
        questionId: questionId,

    };

    // Save Answer in the database
    Answer.create(answer)
        .then(data => {
            // res.send(data);

            if (data) {

                if (customerId) {
                    Question.findOne({
                            where: {
                                id: questionId,
                                customerId: customerId,

                            },
                            raw: true,
                            nest: true
                        }).then(dataQuestions => {

                            if (dataQuestions) {
                                console.log(dataQuestions);
                                res.send(data);

                            } else {
                                console.log(dataQuestions);

                                detailUrl += data.dataValues.id;

                                var message = 'Bạn có một câu trả lời mới!'
                                var customerNotification = {
                                    message: message,
                                    detailUrl: detailUrl,
                                    customerId: customerId,

                                };

                                // Save CustomerNotification in the database
                                CustomerNotification.create(customerNotification)
                                    .then(dataNotification => {
                                        res.status(200).send({
                                            data: data,
                                            dataNotification: dataNotification
                                        });
                                    })
                                    .catch(err => {
                                        res.status(500).send({
                                            message: "Đã xảy ra một số lỗi khi tạo Customer Notification!",
                                            error: err.message
                                        });
                                    });


                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Lỗi khi truy xuất Answer với customer id=" + customerId,
                                error: err.message

                            });
                        });

                } else {
                    res.send(data);
                }

            } else {
                res.send(data);

            }

        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi tạo Answer!"
            });
        });
};

// Retrieve all Answers from the database.
exports.findAll = (req, res) => {
    var status = req.query.status;
    var condition = {};
    if (status == 0 || status == 1) {
        condition.status = status
    } else if (status == 'both') {} else {
        condition.status = 1
    }
    var orderby = req.query.orderby;
    var order = [];
    if (orderby == 'desc') {
        order = [
            ['created_at', 'DESC']
        ];
    }


    var page = +req.query.page;
    var limit = +req.query.limit;
    limit = limit ? limit : 6;
    var offset = (page > 0) ? (page - 1) * limit : null;

    Answer.findAndCountAll({
            where: condition,
            order: order,
            offset: offset,
            limit: limit,
            include: [{
                model: Customer,
                attributes: ['username', 'first_name', 'last_name', 'email', 'avatar']
            }, {
                model: Question
            }],
            raw: true,
            nest: true
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi truy xuất Answers!",
                error: err.message

            });
        });
};

// Find a single Answer with an id
exports.findOne = (req, res) => {
    var id = req.params.id;

    Answer.findOne({
            where: {
                id: id
            },
            include: [{
                model: Customer,
                attributes: ['username', 'first_name', 'last_name', 'email', 'avatar']
            }, {
                model: Question
            }],
            raw: true,
            nest: true
        })
        .then(data => {
            if (data) {

                var like = data.like;
                var dislike = data.dislike;
                if (like) {
                    var likeArray = like.split(',');
                    var likeNumber = likeArray.length;
                    data.count_like = likeNumber;
                } else {
                    data.count_like = 0;
                }
                if (dislike) {
                    var dislikeArray = dislike.split(',');
                    var dislikeNumber = dislikeArray.length;
                    data.count_dislike = dislikeNumber;

                } else {
                    data.count_dislike = 0;

                }

                res.send(data);

            } else {
                res.send(data);

            }

        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi truy xuất Answer with id=" + id,
                error: err.message

            });
        });
};

// Update a Answer by the id in the request
exports.update = (req, res) => {
    var id = req.params.id;

    // Update a Answer
    var answer = {
        content: req.body.content,
        like: req.body.like,
        dislike: req.body.dislike,
        status: req.body.status,
        customerId: req.body.customer_id,
        adminId: req.body.admin_id,
        questionId: req.body.question_id,

    };

    Answer.update(answer, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Answer được cập nhật thành công!"
                });
            } else {
                res.send({
                    message: `Không thể cập nhật thông tin Answer with id=${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi cập nhật Answer with id=" + id,
                error: err.message

            });
        });
};

// Delete a Answer with the specified id in the request
exports.delete = (req, res) => {
    var id = req.params.id;

    Answer.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Answer đã được xóa thành công!"
                });
            } else {
                res.send({
                    message: `Không thể xóa Answer with id=${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Không thể xóa Answer with id=" + id,
                error: err.message

            });
        });
};

// Delete all Answers from the database.
exports.deleteAll = (req, res) => {
    Answer.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Answers đã được xóa thành công!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi xóa tất cả answers!",
                error: err.message

            });
        });
};

// Retrieve Answers by category from the database.
exports.findByQuestionId = (req, res) => {
    var id = req.params.id;
    var status = req.query.status;
    var condition = {
        question_id: id,
    };
    if (status == 0 || status == 1) {
        condition.status = status
    } else if (status == 'both') {} else {
        condition.status = 1
    }

    var orderby = req.query.orderby;
    var order = [];
    if (orderby == 'desc') {
        order = [
            ['created_at', 'DESC']
        ];
    }

    var page = +req.query.page;
    var limit = +req.query.limit;
    limit = limit ? limit : 6;
    var offset = (page > 0) ? (page - 1) * limit : null;

    Answer.findAndCountAll({
            where: condition,
            order: order,
            offset: offset,
            limit: limit,
            include: [{
                model: Customer,
                attributes: ['username', 'first_name', 'last_name', 'email', 'avatar']
            }, {
                model: Question
            }],
            raw: true,
            nest: true
        })
        .then(data => {

            // res.send(data)
            // console.log(data);

            for (var i = 0; i < data.rows.length; i++) {
                var like = data.rows[i].like;
                var dislike = data.rows[i].dislike;
                if (like) {
                    var likeArray = like.split(',');
                    var likeNumber = likeArray.length;
                    data.rows[i].count_like = likeNumber;
                } else {
                    data.rows[i].count_like = 0;
                }
                if (dislike) {
                    var dislikeArray = dislike.split(',');
                    var dislikeNumber = dislikeArray.length;
                    data.rows[i].count_dislike = dislikeNumber;

                } else {
                    data.rows[i].count_dislike = 0;

                }
            }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi truy xuất Answers!",
                error: err.message

            });
        });


};


// Update like in answer
exports.updateLikeById = (req, res) => {
    var id = req.params.id;
    var likeCustomerId = req.body.customer_id;
    if (!req.body.customer_id) {
        res.status(400).send({
            message: "Vui lòng đăng nhập!"
        });
        return;
    }

    Answer.findOne({
            where: {
                id: id,
            },
            raw: true,
            nest: true
        })
        .then(data => {
            if (data) {

                var like = data.like;
                var dislike = data.dislike;
                console.log(like);
                console.log(dislike);
                if (like) {
                    var likeArray = like.split(',');
                    if (likeArray.includes(likeCustomerId)) {
                        var index = likeArray.indexOf(likeCustomerId);
                        likeArray.splice(index, 1);
                    } else {
                        likeArray.push(likeCustomerId);

                    }

                    var likeNumber = likeArray.length;
                    var like = likeArray.toString();

                } else {
                    var likeNumber = 1;
                    var like = likeCustomerId;
                    console.log('like');

                }


                if (dislike) {
                    var dislikeArray = dislike.split(',');
                    if (dislikeArray.includes(likeCustomerId)) {
                        var index = dislikeArray.indexOf(likeCustomerId);
                        dislikeArray.splice(index, 1);
                    }
                    var dislikeNumber = dislikeArray.length;
                    console.log('dis'+dislikeNumber);

                } else {
                    var dislikeNumber = 0;
                    console.log('dis');
                }

                var answer = {
                    like: like,
                    dislike: dislike
                };
                Answer.update(answer, {
                        where: {
                            id: id
                        }
                    })
                    .then(num => {
                        if (num == 1) {
                            res.send({
                                message: "Answer cập nhật like thành công!",
                                count_like: likeNumber,
                                count_dislike: dislikeNumber,
                            });
                        } else {
                            res.send({
                                message: `Không thể cập nhật like Answer with id=${id}!`
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Lỗi khi cập nhật Answer with id=" + id,
                            error: err.message

                        });
                    });


            }


        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi truy xuất Answer with id=" + id,
                error: err.message

            });
        });
};

// Update like in answer
exports.updateDislikeById = (req, res) => {
    var id = req.params.id;
    var dislikeCustomerId = req.body.customer_id;


    Answer.findByPk(id)
        .then(data => {
            if (data) {

                var like = data.dataValues.like;
                var dislike = data.dataValues.dislike;
                if (dislike) {
                    var dislikeArray = dislike.split(',');
                    if (dislikeArray.includes(dislikeCustomerId)) {
                        var index = dislikeArray.indexOf(dislikeCustomerId);
                        dislikeArray.splice(index, 1);
                    } else {
                        dislikeArray.push(dislikeCustomerId);

                    }
                    var dislikeNumber = dislikeArray.length;
                    var dislike = dislikeArray.toString();


                } else {
                    var dislikeNumber = 1;
                    var dislike = dislikeCustomerId
                }

                if (like) {
                    var likeArray = like.split(',');
                    if (likeArray.includes(dislikeCustomerId)) {
                        var index = likeArray.indexOf(dislikeCustomerId);
                        likeArray.splice(index, 1);
                    }

                    var likeNumber = likeArray.length;
                } else {
                    var likeNumber = 0;
                }


                var answer = {
                    like: like,
                    dislike: dislike
                };

                Answer.update(answer, {
                        where: {
                            id: id
                        }
                    })
                    .then(num => {
                        if (num == 1) {
                            res.send({
                                message: "Answer was updated dislike successfully!",
                                count_like: likeNumber,
                                count_dislike: dislikeNumber,
                            });
                        } else {
                            res.send({
                                message: `Không thể cập nhật dislike Answer with id=${id}. Maybe Answer was not found or req.body is empty!`
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Lỗi khi cập nhật Answer with id=" + id
                        });
                    });

            }

        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi truy xuất Answer with id=" + id,
                error: err.message

            });
        });
};
