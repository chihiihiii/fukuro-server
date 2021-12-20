const db = require("../models");
const PremiumService = db.PremiumServices;
const Promotion = db.Promotions;
const Op = db.Sequelize.Op;

// Create and Save a new PremiumService
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.username) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // Create a PremiumService
    var premiumService = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        status: req.body.status,
        promotionId: req.body.promotion_id,

    };

    // Save PremiumService in the database
    PremiumService.create(premiumService)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi tạo PremiumService!",
                error: err.message
            });
        });
};

// Retrieve all PremiumServices from the database.
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

    PremiumService.findAndCountAll({
            where: condition,
            order: order,
            offset: offset,
            limit: limit,
            include: [{
                model: Promotion,
                where: {
                    status: 1
                },
                required: false
            }],
            raw: true,
            nest: true
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi truy xuất premium services!",
                error: err.message
            });
        });
};

// Find a single PremiumService with an id
exports.findOne = (req, res) => {
    var id = req.params.id;

    PremiumService.findAndCountAll({
        where: {
            id: id
        },
        include: [{
            model: Promotion,
            where: {
                status: 1
            },
            required: false
        }],
        raw: true,
        nest: true
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi truy xuất PremiumService with id=" + id,
                error: err.message
            });
        });
};

// Update a PremiumService by the id in the request
exports.update = (req, res) => {
    var id = req.params.id;

    // Update a PremiumService
    var premiumService = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        status: req.body.status,
        promotionId: req.body.promotion_id,

    };

    PremiumService.update(premiumService, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "PremiumService được cập nhật thành công!"
                });
            } else {
                res.send({
                    message: `Không thể cập nhật thông tin PremiumService with id=${id}. Maybe PremiumService was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi cập nhật PremiumService with id=" + id,
                error: err.message
            });
        });
};

// Delete a PremiumService with the specified id in the request
exports.delete = (req, res) => {
    var id = req.params.id;

    PremiumService.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "PremiumService đã được xóa thành công!"
                });
            } else {
                res.send({
                    message: `Không thể xóa PremiumService with id=${id}. Maybe PremiumService was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Không thể xóa PremiumService with id=" + id,
                error: err.message
            });
        });
};

// Delete all PremiumServices from the database.
exports.deleteAll = (req, res) => {
    PremiumService.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} PremiumServices đã được xóa thành công!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi xóa tất cả premiumservices!",
                error: err.message
            });
        });
};