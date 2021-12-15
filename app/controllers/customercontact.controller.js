const db = require("../models");
const CustomerContact = db.CustomerContacts;
const Op = db.Sequelize.Op;

// Create and Save a new CustomerContact
exports.create = (req, res) => {
    // Validate request
    if (!req.body.first_name || !req.body.first_name) {
        res.status(400).send({
            message: "Không để trống tên!"
        });
        return;
    }

    // Create a CustomerContact
    var customerContact = {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message,
        status: req.body.status,
        customerId: req.body.customer_id,
        rentalNewsId: req.body.rental_news_id,

    };

    // Save CustomerContact in the database
    CustomerContact.create(customerContact)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi tạo Customer Contact!",
                error: err.message
            });
        });
};

// Retrieve all CustomerContacts from the database.
exports.findAll = (req, res) => {
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

    CustomerContact.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi truy xuất Customer Contacts!",
                error: err.message
            });
        });
};

// Find a single CustomerContact with an id
exports.findOne = (req, res) => {
    var id = req.params.id;

    CustomerContact.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi truy xuất Customer Contact with id=" + id,
                error: err.message
            });
        });
};

// Update a CustomerContact by the id in the request
exports.update = (req, res) => {
    var id = req.params.id;


    // Update a CustomerContact
    var customerContact = {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message,
        status: req.body.status,
        customerId: req.body.customer_id,
        rentalNewsId: req.body.rental_news_id,

    };

    CustomerContact.update(customerContact, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customer Contact được cập nhật thành công!"
                });
            } else {
                res.send({
                    message: `Không thể cập nhật thông tin Customer Contact with id=${id}. Maybe Customer Contact was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi cập nhật Customer Contact with id=" + id,
                error: err.message
            });
        });
};

// Delete a CustomerContact with the specified id in the request
exports.delete = (req, res) => {
    var id = req.params.id;

    CustomerContact.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customer Contact đã được xóa thành công!"
                });
            } else {
                res.send({
                    message: `Không thể xóa Customer Contact with id=${id}. Maybe CustomerContact was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Không thể xóa Customer Contact with id=" + id,
                error: err.message
            });
        });
};

// Delete all CustomerContacts from the database.
exports.deleteAll = (req, res) => {
    CustomerContact.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Customer Contacts đã được xóa thành công!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi xóa tất cả customer contacts!",
                error: err.message
            });
        });
};