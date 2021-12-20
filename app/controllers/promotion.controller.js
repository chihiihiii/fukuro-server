const db = require("../models");
const Promotion = db.Promotions;
const Op = db.Sequelize.Op;

// Create and Save a new Promotion
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.username) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // Create a Promotion
    var promotion = {
        name: req.body.name,
        price: req.body.price,
        discount: req.body.discount,
        startDate: req.body.start_date,
        endDate: req.body.end_date,
        status: req.body.status,

    };

    // Save Promotion in the database
    Promotion.create(promotion)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi tạo Promotion!",
                error: err.message
            });
        });
};

// Retrieve all Promotions from the database.
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

    Promotion.findAndCountAll({
            where: condition,
            order: order,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi truy xuất promotions!",
                error: err.message
            });
        });
};

// Find a single Promotion with an id
exports.findOne = (req, res) => {
    var id = req.params.id;

    Promotion.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi truy xuất Promotion with id=" + id,
                error: err.message
            });
        });
};

// Update a Promotion by the id in the request
exports.update = (req, res) => {
    var id = req.params.id;
    // Update a Promotion
    var promotion = {
        name: req.body.name,
        price: req.body.price,
        discount: req.body.discount,
        startDate: req.body.start_date,
        endDate: req.body.end_date,
        status: req.body.status,

    };
    Promotion.update(promotion, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Promotion được cập nhật thành công!"
                });
            } else {
                res.send({
                    message: `Không thể cập nhật thông tin Promotion with id=${id}. Maybe Promotion was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi cập nhật Promotion with id=" + id,
                error: err.message
            });
        });
};

// Delete a Promotion with the specified id in the request
exports.delete = (req, res) => {
    var id = req.params.id;

    Promotion.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Promotion đã được xóa thành công!"
                });
            } else {
                res.send({
                    message: `Không thể xóa Promotion with id=${id}. Maybe Promotion was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Không thể xóa Promotion with id=" + id,
                error: err.message
            });
        });
};

// Delete all Promotions from the database.
exports.deleteAll = (req, res) => {
    Promotion.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Promotions đã được xóa thành công!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi xóa tất cả promotions!",
                error: err.message
            });
        });
};