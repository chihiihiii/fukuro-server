const db = require("../models");
const CustomerPremiumService = db.CustomerPremiumServices;

const Op = db.Sequelize.Op;

// Create and Save a new CustomerPremiumService
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.username) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // Create a CustomerPremiumService
    var customerPremiumService = {
        startDate: req.body.start_date,
        endDate: req.body.end_date,
        status: req.body.status,
        customerId: req.body.customer_id,
        premiumId: req.body.premium_id,

    };

    // Save CustomerPremiumService in the database
    CustomerPremiumService.create(customerPremiumService)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi tạo Customer Premium!",
                error: err.message
            });
        });
};

// Retrieve all CustomerPremiumServices from the database.
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

    CustomerPremiumService.findAndCountAll({
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
                message: "Đã xảy ra một số lỗi khi truy xuất customer premiums!",
                error: err.message
            });
        });
};

// Find a single CustomerPremiumService with an id
exports.findOne = (req, res) => {
    var id = req.params.id;

    CustomerPremiumService.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi truy xuất Customer Premium with id=" + id,
                error: err.message
            });
        });
};

// Update a CustomerPremiumService by the id in the request
exports.update = (req, res) => {
    var id = req.params.id;

    // Update a CustomerPremiumService
    var customerPremiumService = {
        startDate: req.body.start_date,
        endDate: req.body.end_date,
        status: req.body.status,
        customerId: req.body.customer_id,
        premiumId: req.body.premium_id,

    };

    CustomerPremiumService.update(customerPremiumService, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customer Premium được cập nhật thành công!"
                });
            } else {
                res.send({
                    message: `Không thể cập nhật thông tin Customer Premium with id=${id}. Maybe Customer Premium was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi cập nhật Customer Premium with id=" + id,
                error: err.message
            });
        });
};

// Delete a CustomerPremiumService with the specified id in the request
exports.delete = (req, res) => {
    var id = req.params.id;

    CustomerPremiumService.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customer Premium đã được xóa thành công!"
                });
            } else {
                res.send({
                    message: `Không thể xóa Customer Premium with id=${id}. Maybe Customer Premium was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Không thể xóa Customer Premium with id=" + id,
                error: err.message
            });
        });
};

// Delete all CustomerPremiumServices from the database.
exports.deleteAll = (req, res) => {
    CustomerPremiumService.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Customer Premiums đã được xóa thành công!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi xóa tất cả customer premiums!",
                error: err.message
            });
        });
};

exports.checkExpire = (req, res) => {


    var currentTime = new Date();
    // var checkTime = new Date(new Date() + 24 * 60 * 60 * 1000 * 7);
    var checkTime = new Date(new Date() - (-24 * 60 * 60 * 1000 * 7));

    console.log(checkTime);
    console.log(currentTime);

    CustomerPremiumService.findAndCountAll({
            where: {
                [Op.and]: [{
                        endDate: {
                            [Op.between]: [currentTime, checkTime]
                        }
                    },
                    {
                        status: 1
                    }
                ]

            },
            raw: true,
            nest: true,
        })
        .then(data => {
            res.send(data);
            
        })
        .catch(err => {
            // console.log(err.toJSON());
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi truy xuất Customer Premium Service!",
                error: err.message
                // error: err
            });
        });


};