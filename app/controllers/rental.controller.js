const db = require("../models");
const Rental = db.Rentals;
const Op = db.Sequelize.Op;

// Create and Save a new Rental
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Không để trống tên trọ!"
        });
        return;
    }


    // Create a Rental
    var rental = {
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        type: req.body.type,
        address: req.body.address,
        note: req.body.note,
        status: req.body.status,
        customerId: req.body.customer_id,
    };

    // Save Rental in the database
    Rental.create(rental)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi tạo Rental!",
                error: err.message
            });
        });
};

// Retrieve all Rentals from the database.
exports.findAll = (req, res) => {
    var status = req.query.status;
    console.log(status);
    var condition = {};
    if (status == 0 || status == 1) {
        condition.status = status
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

    Rental.findAndCountAll({
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
                message: "Đã xảy ra một số lỗi khi truy xuất rentals!",
                error: err.message
            });
        });
};

// Find a single Rental with an id
exports.findOne = (req, res) => {
    var id = req.params.id;

    Rental.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi truy xuất Rental with id=" + id,
                error: err.message
            });
        });
};


// Retrieve Rental by customer from the database.
exports.findByCustomerId = (req, res) => {
    var id = req.params.id;
    var status = req.query.status;
    var condition = {
        customerId: id,
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

    Rental.findAndCountAll({
        where: condition,
        offset: offset,
        limit: limit
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:  "Đã xảy ra một số lỗi khi truy xuất Rental News!",
                error: err
            });
        });


};

// Update a Rental by the id in the request
exports.update = (req, res) => {
    var id = req.params.id;

    // Update a Rental
    var rental = {
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        type: req.body.type,
        address: req.body.address,
        note: req.body.note,
        status: req.body.status,
    };

    Rental.update(rental, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Rental được cập nhật thành công!"
                });
            } else {
                res.send({
                    message: `Không thể cập nhật thông tin Rental with id=${id}. Maybe Rental was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi cập nhật Rental with id=" + id,
                error: err.message
            });
        });
};

// Delete a Rental with the specified id in the request
exports.delete = (req, res) => {
    var id = req.params.id;

    Rental.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Rental đã được xóa thành công!"
                });
            } else {
                res.send({
                    message: `Không thể xóa Rental with id=${id}. Maybe Rental was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Không thể xóa Rental with id=" + id,
                error: err.message
            });
        });
};

// Delete all Rentals from the database.
exports.deleteAll = (req, res) => {
    Rental.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Rentals đã được xóa thành công!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi xóa tất cả rentals!",
                error: err.message
            });
        });
};
