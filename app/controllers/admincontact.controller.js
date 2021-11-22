const db = require("../models");
const AdminContact = db.AdminContacts;
const Op = db.Sequelize.Op;

// Create and Save a new AdminContact
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.username) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // Create a AdminContact
    const adminContact = {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        subject: req.body.subject,
        message: req.body.message,
        status: req.body.status,

    };

    // Save AdminContact in the database
    AdminContact.create(adminContact)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the AdminContact."
            });
        });
};

// Retrieve all AdminContacts from the database.
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
    limit=limit?limit:6;
    var offset = (page > 0) ? (page - 1) * limit : null;

    AdminContact.findAndCountAll({
            where: condition,
            offset: offset,
            limit: limit
        })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving AdminContact."
            });
        });
};

// Find a single AdminContact with an id
exports.findOne = (req, res) => {
    let id = req.params.id;

    AdminContact.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving AdminContact with id=" + id
            });
        });
};

// Update a AdminContact by the id in the request
exports.update = (req, res) => {
    let id = req.params.id;

    AdminContact.update(req.body, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "AdminContact was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update AdminContact with id=${id}. Maybe AdminContact was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating AdminContact with id=" + id
            });
        });
};

// Delete a AdminContact with the specified id in the request
exports.delete = (req, res) => {
    let id = req.params.id;

    AdminContact.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "AdminContact was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete AdminContact with id=${id}. Maybe AdminContact was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete AdminContact with id=" + id
            });
        });
};

// Delete all AdminContacts from the database.
exports.deleteAll = (req, res) => {
    AdminContact.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} AdminContacts were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all admincontacts."
            });
        });
};

// find all published AdminContact
// exports.findAllPublished = (req, res) => {
//     AdminContact.findAll({
//             where: {
//                 published: true
//             }
//         })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving admincontacts."
//             });
//         });
// };