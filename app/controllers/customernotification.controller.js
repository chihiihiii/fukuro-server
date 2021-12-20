const db = require("../models");
const CustomerNotification = db.CustomerNotifications;
const Op = db.Sequelize.Op;

// Create and Save a new CustomerNotification
exports.create = (req, res) => {
    // Validate request
    if (!req.body.message || !req.body.detail_url) {
        res.status(400).send({
            message: "Không được để trống nội dung thông báo hoặc chi tiết url!"
        });
        return;
    }

    // Create a CustomerNotification
    var customerNotification = {
        message: req.body.message,
        detailUrl: req.body.detail_url,
        status: req.body.status,
        customerId: req.body.customer_id,

    };


    // Save CustomerNotification in the database
    CustomerNotification.create(customerNotification)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi tạo Customer Notification!",
                error: err.message
            });
        });
};

// Retrieve all CustomerNotifications from the database.
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

    CustomerNotification.findAndCountAll({
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
                message: "Đã xảy ra một số lỗi khi truy xuất Customer Notifications!",
                error: err.message
            });
        });
};

// Find a single CustomerNotification with an id
exports.findOne = (req, res) => {
    var id = req.params.id;

    CustomerNotification.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi truy xuất Customer Notification with id=" + id,
                error: err.message
            });
        });
};

// Update a CustomerNotification by the id in the request
exports.update = (req, res) => {
    var id = req.params.id;

    // Update a CustomerNotification
    var customerNotification = {
        message: req.body.message,
        detailUrl: req.body.detail_url,
        status: req.body.status,
        customerId: req.body.customer_id,
        rentalNewsId: req.body.rental_news_id,

    };

    CustomerNotification.update(customerNotification, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customer Notification được cập nhật thành công!"
                });
            } else {
                res.send({
                    message: `Không thể cập nhật thông tinCustomer Notification with id=${id}. Maybe Customer Notification was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi cập nhật Customer Notification with id=" + id,
                error: err.message
            });
        });
};

// Delete a CustomerNotification with the specified id in the request
exports.delete = (req, res) => {
    var id = req.params.id;

    CustomerNotification.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customer Notification đã được xóa thành công!"
                });
            } else {
                res.send({
                    message: `Không thể xóa Customer Notification with id=${id}. Maybe Customer Notification was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Không thể xóa Customer Notification with id=" + id,
                error: err.message
            });
        });
};

// Delete all CustomerNotifications from the database.
exports.deleteAll = (req, res) => {
    CustomerNotification.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Customer Notifications đã được xóa thành công!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi xóa tất cả customer notifications!",
                error: err.message
            });
        });
};
