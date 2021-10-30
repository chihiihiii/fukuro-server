const db = require("../models");
const PremiumBill = db.PremiumBills;
const Op = db.Sequelize.Op;

// Create and Save a new Admin
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.username) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // Create a Admin
    const premiumBill = {
        name: req.body.name,
        price: req.body.price,
        expire: req.body.expire,
        totalPrice: req.body.total_price,
        paymentStatus: req.body.payment_status,
        status: req.body.status,
        
    };

    // Save Admin in the database
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

// Retrieve all Admins from the database.
exports.findAll = (req, res) => {
    // const username = req.query.username;
    // var condition = username ? {
    //     username: {
    //         [Op.like]: `%${username}%`
    //     }
    // } : null;
    var condition=null;

    PremiumBill.findAll({
            where: condition
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

// Find a single Admin with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

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

// Update a Admin by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

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

// Delete a Admin with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

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

// Delete all Admins from the database.
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

// find all published Admin
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