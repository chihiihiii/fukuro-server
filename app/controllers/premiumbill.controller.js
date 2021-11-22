const db = require("../models");
const PremiumBill = db.PremiumBills;
const Op = db.Sequelize.Op;

// Create and Save a new PremiumBill
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.username) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // Create a PremiumBill
    const premiumBill = {
        name: req.body.name,
        price: req.body.price,
        expire: req.body.expire,
        totalPrice: req.body.total_price,
        paymentStatus: req.body.payment_status,
        status: req.body.status,

    };

    // Save PremiumBill in the database
    PremiumBill.create(premiumBill)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Premium Bill."
            });
        });
};

// Retrieve all PremiumBills from the database.
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

    PremiumBill.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving premium bills."
            });
        });
};

// Find a single PremiumBill with an id
exports.findOne = (req, res) => {
    let id = req.params.id;

    PremiumBill.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Premium Bill with id=" + id
            });
        });
};

// Update a PremiumBill by the id in the request
exports.update = (req, res) => {
    let id = req.params.id;

    PremiumBill.update(req.body, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Premium Bill was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Premium Bill with id=${id}. Maybe Premium Bill was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Premium Bill with id=" + id
            });
        });
};

// Delete a PremiumBill with the specified id in the request
exports.delete = (req, res) => {
    let id = req.params.id;

    PremiumBill.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Premium Bill was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Premium Bill with id=${id}. Maybe Premium Bill was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Premium Bill with id=" + id
            });
        });
};

// Delete all PremiumBills from the database.
exports.deleteAll = (req, res) => {
    PremiumBill.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Premium Bills were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all premium bills."
            });
        });
};

// find all published PremiumBill
// exports.findAllPublished = (req, res) => {
//     PremiumBill.findAll({
//             where: {
//                 published: true
//             }
//         })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving premium bills."
//             });
//         });
// };