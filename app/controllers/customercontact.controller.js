const db = require("../models");
const CustomerContact = db.CustomerContacts;
const Op = db.Sequelize.Op;

// Create and Save a new CustomerContact
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.username) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // Create a CustomerContact
    const customerContact = {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message,
        status: req.body.status,

    };

    // Save CustomerContact in the database
    CustomerContact.create(customerContact)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Customer Contact."
            });
        });
};

// Retrieve all CustomerContacts from the database.
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
                message: err.message || "Some error occurred while retrieving Customer Contacts."
            });
        });
};

// Find a single CustomerContact with an id
exports.findOne = (req, res) => {
    let id = req.params.id;

    CustomerContact.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Customer Contact with id=" + id
            });
        });
};

// Update a CustomerContact by the id in the request
exports.update = (req, res) => {
    let id = req.params.id;

    CustomerContact.update(req.body, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customer Contact was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Customer Contact with id=${id}. Maybe Customer Contact was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Customer Contact with id=" + id
            });
        });
};

// Delete a CustomerContact with the specified id in the request
exports.delete = (req, res) => {
    let id = req.params.id;

    CustomerContact.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customer Contact was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Customer Contact with id=${id}. Maybe CustomerContact was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Customer Contact with id=" + id
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
                message: `${nums} Customer Contacts were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all customer contacts."
            });
        });
};

// find all published CustomerContact
// exports.findAllPublished = (req, res) => {
//     CustomerContact.findAll({
//             where: {
//                 published: true
//             }
//         })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving customer contacts."
//             });
//         });
// };