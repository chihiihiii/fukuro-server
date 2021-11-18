const db = require("../models");
const PasswordReset = db.PasswordResets;
const Op = db.Sequelize.Op;

// Create and Save a new PasswordReset
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.username) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // Create a PasswordReset
    const passwordReset = {
        email: req.body.email,
        token: req.body.token,
    };

    // Save PasswordReset in the database
    PasswordReset.create(passwordReset)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Password Reset."
            });
        });
};

// Retrieve all PasswordResets from the database.
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

    PasswordReset.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving password resets."
            });
        });
};

// Find a single PasswordReset with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    PasswordReset.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Password Reset with id=" + id
            });
        });
};

// Update a PasswordReset by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    PasswordReset.update(req.body, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Password Reset was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Password Reset with id=${id}. Maybe Password Reset was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating PasswordReset with id=" + id
            });
        });
};

// Delete a PasswordReset with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    PasswordReset.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Password Reset was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Password Reset with id=${id}. Maybe Password Reset was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Password Reset with id=" + id
            });
        });
};

// Delete all PasswordResets from the database.
exports.deleteAll = (req, res) => {
    PasswordReset.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Password Reset were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all password resets."
            });
        });
};

// find all published PasswordReset
// exports.findAllPublished = (req, res) => {
//     PasswordReset.findAll({
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