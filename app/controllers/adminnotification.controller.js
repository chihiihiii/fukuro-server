const db = require("../models");
const AdminNotification = db.AdminNotifications;
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
    const adminNotification = {
        message: req.body.message,
        detailUrl: req.body.detail_url,
        status: req.body.status
    };

    // Save Admin in the database
    AdminNotification.create(adminNotification)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Admin Notification."
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

    var page = +req.query.page;
    var limit = +req.query.limit;
    limit=limit?limit:6;
    var offset = (page > 0) ? (page - 1) * limit : null;

    AdminNotification.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Admin Notification."
            });
        });
};

// Find a single Admin with an id
exports.findOne = (req, res) => {
    let id = req.params.id;

    AdminNotification.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Admin Notification with id=" + id
            });
        });
};

// Update a Admin by the id in the request
exports.update = (req, res) => {
    let id = req.params.id;

    AdminNotification.update(req.body, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Admin Notification was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Admin Notification with id=${id}. Maybe Admin Notification was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Admin Notification with id=" + id
            });
        });
};

// Delete a Admin with the specified id in the request
exports.delete = (req, res) => {
    let id = req.params.id;

    AdminNotification.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Admin Notification was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Admin Notification with id=${id}. Maybe Admin Notification was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Admin Notification with id=" + id
            });
        });
};

// Delete all Admins from the database.
exports.deleteAll = (req, res) => {
    AdminNotification.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Admin Notification were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all admin notifications."
            });
        });
};

// find all published Admin
// exports.findAllPublished = (req, res) => {
//     AdminNotification.findAll({
//             where: {
//                 published: true
//             }
//         })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving notifications."
//             });
//         });
// };