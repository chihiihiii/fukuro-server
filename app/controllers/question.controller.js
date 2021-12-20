const db = require("../models");
const Question = db.Questions;
const AdminNotification = db.AdminNotifications;

const Op = db.Sequelize.Op;

// Create and Save a new Question
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title || !req.body.question_category_id || !req.body.customer_id) {
        res.status(400).send({
            message: "Không để trống tựa câu hỏi, mã danh mục câu hỏi và mã khách hàng!"
        });
        return;
    }

    if (!req.body.detail_url) {
        res.status(400).send({
            message: "Không để trống đường dẫn chi tiết của thông báo!"
        });
        return;
    }

    var detailUrl = req.body.detail_url;

    // Create a Question
    var question = {
        title: req.body.title,
        content: req.body.content,
        status: req.body.status,
        questionCategoryId: req.body.question_category_id,
        customerId: req.body.customer_id
    };
    // console.log(question);

    // Save Question in the database
    Question.create(question)
        .then(data => {
            // res.send(data);

            if (data) {

                detailUrl += data.dataValues.id;

                var message = 'Bạn có một câu hỏi mới!'
                var adminNotification = {
                    message: message,
                    detailUrl: detailUrl,

                };

                // Save CustomerNotification in the database
                AdminNotification.create(adminNotification)
                    .then(dataNotification => {
                        res.send({
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
                message: "Đã xảy ra một số lỗi khi tạo Question!",
                error: err.message
            });
        });





};

// Retrieve all Questions from the database.
exports.findAll = (req, res) => {

    var status = req.query.status;
    console.log(status);
    var condition = {};
    if (status == 0 || status == 1) {
        condition.status = status
    } else if (status == 'both') {} else {
        condition.status = 1
    }

    var page = +req.query.page;
    var limit = +req.query.limit;
    limit = limit ? limit : 6;
    var offset = (page > 0) ? (page - 1) * limit : null;

    Question.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi truy xuất Questions!",
                error: err.message
            });
        });
};

// Find a single Question with an id
exports.findOne = (req, res) => {
    var id = req.params.id;

    Question.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi truy xuất Question with id=" + id,
                error: err.message
            });
        });
};

// Update a Question by the id in the request
exports.update = (req, res) => {
    var id = req.params.id;


    // Update a Question
    var question = {
        title: req.body.title,
        content: req.body.content,
        status: req.body.status,
        questionCategoryId: req.body.question_category_id,
        customerId: req.body.customer_id
    };

    Question.update(question, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Question được cập nhật thành công!"
                });
            } else {
                res.send({
                    message: `Không thể cập nhật thông tin Question with id=${id}. Maybe Question was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi cập nhật Question with id=" + id,
                error: err.message
            });
        });





};

// Delete a Question with the specified id in the request
exports.delete = (req, res) => {
    var id = req.params.id;

    Question.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Question đã được xóa thành công!"
                });
            } else {
                res.send({
                    message: `Không thể xóa Question with id=${id}. Maybe Question was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Không thể xóa Question with id=" + id,
                error: err.message
            });
        });
};

// Delete all Questions from the database.
exports.deleteAll = (req, res) => {
    Question.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Questions đã được xóa thành công!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi xóa tất cả questions!",
                error: err.message
            });
        });
};

// Retrieve Questions latest from the database.
exports.findLatest = (req, res) => {

    var status = req.query.status;
    var condition = {};
    if (status == 0 || status == 1) {
        condition.status = status
    } else if (status == 'both') {} else {
        condition.status = 1
    }

    var page = +req.query.page;
    var limit = +req.query.limit;
    limit = limit ? limit : 6;
    var offset = (page > 0) ? (page - 1) * limit : null;

    Question.findAndCountAll({
            where: condition,
            order: [
                ['created_at', 'DESC']
            ],
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi truy xuất Questions!",
                error: err.message
            });
        });


};

// Retrieve Questions by category from the database.
exports.findByCategoryId = (req, res) => {
    var id = req.params.id;

    var status = req.query.status;
    var condition = {
        question_category_id: id,
    };
    if (status == 0 || status == 1) {
        condition.status = status
    } else if (status == 'both') {} else {
        condition.status = 1
    }
    var page = +req.query.page;
    var limit = +req.query.limit;
    limit = limit ? limit : 6;
    var offset = (page > 0) ? (page - 1) * limit : null;

    Question.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi truy xuất Questions!",
                error: err.message
            });
        });


};