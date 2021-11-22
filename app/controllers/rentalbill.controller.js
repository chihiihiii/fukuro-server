const db = require("../models");
const RentalBill = db.RentalBills;
const Op = db.Sequelize.Op;

// Create and Save a new RentalBill
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.username) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // Create a RentalBill
    const rentalBill = {
        name: req.body.name,
        price: req.body.price,
        electricityFee: req.body.electricity_fee,
        waterFee: req.body.water_fee,
        internetFee: req.body.internet_fee,
        otherFee: req.body.other_fee,
        feeDesc: req.body.fee_desc,
        prepay: req.body.prepay,
        discountPrice: req.body.discount_price,
        totalPrice: req.body.total_price,
        note: req.body.note,
        status: req.body.status,

    };

    // Save RentalBill in the database
    RentalBill.create(rentalBill)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Rental Bill."
            });
        });
};

// Retrieve all RentalBills from the database.
exports.findAll = (req, res) => {
    // const username = req.query.username;
    // var condition = username ? {
    //     username: {
    //         [Op.like]: `%${username}%`
    //     }
    // } : null;
    var condition = null;

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
                message: err.message || "Some error occurred while retrieving rental bills."
            });
        });
};

// Find a single RentalBill with an id
exports.findOne = (req, res) => {
    let id = req.params.id;

    RentalBill.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Rental Bill with id=" + id
            });
        });
};

// Update a RentalBill by the id in the request
exports.update = (req, res) => {
    let id = req.params.id;

    RentalBill.update(req.body, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Rental Bill was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Rental Bill with id=${id}. Maybe Rental Bill was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Rental Bill with id=" + id
            });
        });
};

// Delete a RentalBill with the specified id in the request
exports.delete = (req, res) => {
    let id = req.params.id;

    RentalBill.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Rental Bill was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Rental Bill with id=${id}. Maybe Rental Bill was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Rental Bill with id=" + id
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
                message: `${nums} Rental Bills were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all rental bills."
            });
        });
};

// find all published RentalBill
// exports.findAllPublished = (req, res) => {
//     RentalBill.findAll({
//             where: {
//                 published: true
//             }
//         })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving rental bills."
//             });
//         });
// };