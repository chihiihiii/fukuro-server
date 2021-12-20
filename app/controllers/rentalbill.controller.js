const db = require("../models");
const RentalBill = db.RentalBills;
const Op = db.Sequelize.Op;

// Create and Save a new RentalBill
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a RentalBill
    var rentalBill = {
        name: req.body.name,
        price: req.body.price,
        electricityQuantity: req.body.electricity_quantity,
        electricityPrice: req.body.electricity_price,
        waterQuantity: req.body.water_quantity,
        waterPrice: req.body.water_price,
        internetFee: req.body.internet_fee,
        otherFee: req.body.other_fee,
        feeDesc: req.body.fee_desc,
        prepay: req.body.prepay,
        discountPrice: req.body.discount_price,
        totalPrice: req.body.total_price,
        note: req.body.note,
        status: req.body.status,
        rentalId: req.body.rental_id,
        rentalRoomId: req.body.rental_room_id,
        customerId: req.body.customer_id,

    };

    // Save RentalBill in the database
    RentalBill.create(rentalBill)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi tạo Rental Bill!",
                error: err.message
            });
        });
};

// Retrieve all RentalBills from the database.
exports.findAll = (req, res) => {
    var status = req.query.status;
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

    RentalBill.findAndCountAll({
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
                message: "Đã xảy ra một số lỗi khi truy xuất rental bills!",
                error: err.message
            });
        });
};

// Find a single RentalBill with an id
exports.findOne = (req, res) => {
    var id = req.params.id;

    RentalBill.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi truy xuất Rental Bill with id=" + id,
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

    RentalBill.findAndCountAll({
        where: condition,
        offset: offset,
        limit: limit
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi truy xuất Rental News!",
                error: err
            });
        });


};

// Update a RentalBill by the id in the request
exports.update = (req, res) => {
    var id = req.params.id;

    RentalBill.update(req.body, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Rental Bill được cập nhật thành công!"
                });
            } else {
                res.send({
                    message: `Không thể cập nhật thông tin Rental Bill with id=${id}. Maybe Rental Bill was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Lỗi khi cập nhật Rental Bill with id=" + id,
                error: err.message
            });
        });
};

// Delete a RentalBill with the specified id in the request
exports.delete = (req, res) => {
    var id = req.params.id;

    RentalBill.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Rental Bill đã được xóa thành công!"
                });
            } else {
                res.send({
                    message: `Không thể xóa Rental Bill with id=${id}. Maybe Rental Bill was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Không thể xóa Rental Bill with id=" + id,
                error: err.message
            });
        });
};

// Delete all RentalBills from the database.
exports.deleteAll = (req, res) => {
    RentalBill.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Rental Bills đã được xóa thành công!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Đã xảy ra một số lỗi khi xóa tất cả rental bills!",
                error: err.message
            });
        });
};
