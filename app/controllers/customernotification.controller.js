const db = require("../models");
const CustomerNotification = db.CustomerNotifications;
const Op = db.Sequelize.Op;

// Create and Save a new CustomerNotification
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.username) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // Create a CustomerNotification
    const customerNotification = {
        message: req.body.message,
        detailUrl: req.body.detail_url,
        status: req.body.status,

    };

    // Save CustomerNotification in the database
    CustomerNotification.create(customerNotification)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Customer Notification."
            });
        });
};

// Retrieve all CustomerNotifications from the database.
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

    CustomerNotification.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Customer Notifications."
            });
        });
};

// Find a single CustomerNotification with an id
exports.findOne = (req, res) => {
    let id = req.params.id;

    CustomerNotification.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Customer Notification with id=" + id
            });
        });
};

// Update a CustomerNotification by the id in the request
exports.update = (req, res) => {
    let id = req.params.id;

    CustomerNotification.update(req.body, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customer Notification was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Customer Notification with id=${id}. Maybe Customer Notification was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Customer Notification with id=" + id
            });
        });
};

// Delete a CustomerNotification with the specified id in the request
exports.delete = (req, res) => {
    let id = req.params.id;

    CustomerNotification.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customer Notification was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Customer Notification with id=${id}. Maybe Customer Notification was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Customer Notification with id=" + id
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
                message: `${nums} Customer Notifications were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all customer notifications."
            });
        });
};

// find all published CustomerNotification
// exports.findAllPublished = (req, res) => {
//     CustomerNotification.findAll({
//             where: {
//                 published: true
//             }
//         })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving customer notifications."
//             });
//         });
// };